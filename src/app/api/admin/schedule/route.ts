import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const url = new URL(request.url);
    const dentistId = url.searchParams.get("dentistId") || (session.role === "DENTIST" ? session.userId : undefined);

    const dentists = await prisma.user.findMany({
      where: {
        role: { in: ["DENTIST", "SUPER_ADMIN"] },
        isActive: true,
      },
      select: {
        id: true,
        fullName: true,
        specialization: true,
        avatar: true,
        dentistSchedules: {
          orderBy: { dayOfWeek: "asc" },
        },
        dentistLeaves: {
          orderBy: { startDate: "desc" },
          take: 10,
        },
      },
    });

    return NextResponse.json({ dentists });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST"]);
    const body = await request.json();

    const { dentistId, schedules } = body;
    // Dentists can only update their own schedule unless admin
    if (session.role === "DENTIST" && session.userId !== dentistId) {
      return NextResponse.json({ error: "Dentists can only manage their own availability" }, { status: 403 });
    }

    if (!dentistId || !Array.isArray(schedules)) {
      return NextResponse.json({ error: "Invalid schedule payload" }, { status: 400 });
    }

    // Upsert each day's schedule
    for (const s of schedules) {
      await prisma.dentistSchedule.upsert({
        where: {
          dentistId_dayOfWeek: {
            dentistId,
            dayOfWeek: Number(s.dayOfWeek),
          },
        },
        update: {
          startTime: s.startTime,
          endTime: s.endTime,
          breakStart: s.breakStart || null,
          breakEnd: s.breakEnd || null,
          isWorkingDay: Boolean(s.isWorkingDay),
        },
        create: {
          dentistId,
          dayOfWeek: Number(s.dayOfWeek),
          startTime: s.startTime,
          endTime: s.endTime,
          breakStart: s.breakStart || null,
          breakEnd: s.breakEnd || null,
          isWorkingDay: Boolean(s.isWorkingDay),
        },
      });
    }

    await createAuditLog({
      actor: session,
      action: "UPDATE_CLINICIAN_SCHEDULE",
      entityType: "DentistSchedule",
      entityId: dentistId,
      details: { dentistId, dayCount: schedules.length },
    });

    return NextResponse.json({ success: true, message: "Schedule updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Record clinician leave
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST"]);
    const body = await request.json();

    const { dentistId, startDate, endDate, reason } = body;

    if (!dentistId || !startDate || !endDate || !reason) {
      return NextResponse.json({ error: "Missing leave fields" }, { status: 400 });
    }

    const leave = await prisma.dentistLeave.create({
      data: {
        dentistId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason: reason.trim(),
        status: "Approved",
      },
    });

    await createAuditLog({
      actor: session,
      action: "RECORD_CLINICIAN_LEAVE",
      entityType: "DentistLeave",
      entityId: leave.id,
      details: { dentistId, startDate, endDate, reason },
    });

    return NextResponse.json({ success: true, leave }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
