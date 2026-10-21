import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

// Helper: check time overlap between two intervals [start1, end1] and [start2, end2] (strings in "HH:MM")
function isTimeOverlapping(s1: string, e1: string, s2: string, e2: string): boolean {
  return s1 < e2 && e1 > s2;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const url = new URL(request.url);

    const dentistId = url.searchParams.get("dentistId");
    const status = url.searchParams.get("status");
    const treatmentId = url.searchParams.get("treatmentId");
    const dateStr = url.searchParams.get("date");
    const startDateStr = url.searchParams.get("startDate");
    const endDateStr = url.searchParams.get("endDate");
    const search = url.searchParams.get("search");

    const where: any = {};

    // Role-based filtering: If dentist role, only show appointments assigned to them unless super/clinic admin
    if (session.role === "DENTIST") {
      where.dentistId = session.userId;
    } else if (dentistId) {
      where.dentistId = dentistId;
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (treatmentId && treatmentId !== "ALL") {
      where.treatmentId = treatmentId;
    }

    if (dateStr) {
      const d = new Date(dateStr);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
      where.date = { gte: startOfDay, lte: endOfDay };
    } else if (startDateStr && endDateStr) {
      const s = new Date(startDateStr);
      const e = new Date(endDateStr);
      e.setHours(23, 59, 59, 999);
      where.date = { gte: s, lte: e };
    }

    if (search) {
      where.OR = [
        { referenceId: { contains: search } },
        { patient: { fullName: { contains: search } } },
        { patient: { phone: { contains: search } } },
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        patient: {
          select: {
            id: true,
            referenceId: true,
            fullName: true,
            phone: true,
            email: true,
            medicalAlerts: true,
          },
        },
        dentist: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
            specialization: true,
          },
        },
        treatment: {
          select: {
            id: true,
            title: true,
            price: true,
            durationMinutes: true,
          },
        },
      },
    });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("GET /api/admin/appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    const {
      patientId,
      dentistId,
      treatmentId,
      date,
      startTime,
      durationMinutes = 60,
      notes,
      bookingSource = "Reception",
      status = "Confirmed",
    } = body;

    if (!patientId || !dentistId || !treatmentId || !date || !startTime) {
      return NextResponse.json(
        { error: "Missing required appointment fields (patient, dentist, treatment, date, start time)." },
        { status: 400 }
      );
    }

    // Calculate end time
    const [startH, startM] = startTime.split(":").map(Number);
    const totalMinutes = startH * 60 + startM + Number(durationMinutes);
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;

    const apptDate = new Date(date);
    const dayOfWeek = apptDate.getDay();

    // 1. Check Dentist Schedule for working day & hours
    const schedule = await prisma.dentistSchedule.findUnique({
      where: {
        dentistId_dayOfWeek: {
          dentistId,
          dayOfWeek,
        },
      },
    });

    if (schedule && !schedule.isWorkingDay) {
      return NextResponse.json(
        { error: `The selected clinician is not scheduled to work on this day of the week.` },
        { status: 400 }
      );
    }

    if (schedule) {
      if (startTime < schedule.startTime || endTime > schedule.endTime) {
        return NextResponse.json(
          {
            error: `Appointment time (${startTime} - ${endTime}) falls outside clinician working hours (${schedule.startTime} - ${schedule.endTime}).`,
          },
          { status: 400 }
        );
      }

      // Check break overlap
      if (schedule.breakStart && schedule.breakEnd) {
        if (isTimeOverlapping(startTime, endTime, schedule.breakStart, schedule.breakEnd)) {
          return NextResponse.json(
            {
              error: `Selected slot overlaps with the clinician's scheduled break (${schedule.breakStart} - ${schedule.breakEnd}).`,
            },
            { status: 400 }
          );
        }
      }
    }

    // 2. Check Dentist Leave
    const leaveConflict = await prisma.dentistLeave.findFirst({
      where: {
        dentistId,
        status: "Approved",
        startDate: { lte: apptDate },
        endDate: { gte: apptDate },
      },
    });

    if (leaveConflict) {
      return NextResponse.json(
        { error: "The clinician is on approved leave on the selected date." },
        { status: 400 }
      );
    }

    // 3. Check Overlapping Appointments for Dentist on same date
    const startOfDay = new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate());
    const endOfDay = new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate(), 23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        dentistId,
        date: { gte: startOfDay, lte: endOfDay },
        status: { in: ["Requested", "Confirmed", "In Progress", "Checked In"] },
      },
    });

    for (const existing of existingAppointments) {
      if (isTimeOverlapping(startTime, endTime, existing.startTime, existing.endTime)) {
        return NextResponse.json(
          {
            error: `Schedule Conflict: Clinician already has appointment (${existing.referenceId}: ${existing.startTime} - ${existing.endTime}) overlapping this time slot.`,
          },
          { status: 409 }
        );
      }
    }

    // Generate unique reference
    const count = await prisma.appointment.count();
    const referenceId = `APT-${new Date().getFullYear()}-${String(count + 1001).padStart(4, "0")}`;

    const appointment = await prisma.appointment.create({
      data: {
        referenceId,
        patientId,
        dentistId,
        treatmentId,
        date: apptDate,
        startTime,
        endTime,
        durationMinutes: Number(durationMinutes),
        notes,
        bookingSource,
        status,
      },
      include: {
        patient: true,
        dentist: true,
        treatment: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_APPOINTMENT",
      entityType: "Appointment",
      entityId: appointment.id,
      details: {
        referenceId,
        patient: appointment.patient.fullName,
        dentist: appointment.dentist.fullName,
        treatment: appointment.treatment.title,
        date: apptDate.toISOString(),
        time: `${startTime} - ${endTime}`,
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("POST /api/admin/appointments error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
