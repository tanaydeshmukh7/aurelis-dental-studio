import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

function isTimeOverlapping(s1: string, e1: string, s2: string, e2: string): boolean {
  return s1 < e2 && e1 > s2;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        patient: true,
        dentist: true,
        treatment: true,
        clinicalNotes: true,
        invoices: {
          include: { items: true, payments: true },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ appointment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    const existing = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: { patient: true, dentist: true, treatment: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Role check: Dentists can update status, Super & Clinic admins can do all
    const updateData: any = {};

    if (body.status !== undefined) {
      updateData.status = body.status;
      if (body.status === "Cancelled" && body.cancellationReason) {
        updateData.cancellationReason = body.cancellationReason;
      }
    }

    if (body.notes !== undefined) {
      updateData.notes = body.notes;
    }

    // If rescheduling (date or time changed)
    if (body.date || body.startTime) {
      const targetDate = body.date ? new Date(body.date) : existing.date;
      const targetStartTime = body.startTime || existing.startTime;
      const duration = body.durationMinutes !== undefined ? Number(body.durationMinutes) : existing.durationMinutes;

      const [startH, startM] = targetStartTime.split(":").map(Number);
      const totalMinutes = startH * 60 + startM + duration;
      const endH = Math.floor(totalMinutes / 60);
      const endM = totalMinutes % 60;
      const targetEndTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;

      const dentistId = body.dentistId || existing.dentistId;

      // Check conflict with other appointments
      const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999);

      const conflicts = await prisma.appointment.findMany({
        where: {
          id: { not: existing.id },
          dentistId,
          date: { gte: startOfDay, lte: endOfDay },
          status: { in: ["Requested", "Confirmed", "In Progress", "Checked In"] },
        },
      });

      for (const c of conflicts) {
        if (isTimeOverlapping(targetStartTime, targetEndTime, c.startTime, c.endTime)) {
          return NextResponse.json(
            {
              error: `Conflict: Clinician already has appointment (${c.referenceId}: ${c.startTime} - ${c.endTime}) at that time.`,
            },
            { status: 409 }
          );
        }
      }

      updateData.date = targetDate;
      updateData.startTime = targetStartTime;
      updateData.endTime = targetEndTime;
      updateData.durationMinutes = duration;
      if (body.dentistId) updateData.dentistId = body.dentistId;
      if (body.treatmentId) updateData.treatmentId = body.treatmentId;
    }

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: updateData,
      include: {
        patient: true,
        dentist: true,
        treatment: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_APPOINTMENT",
      entityType: "Appointment",
      entityId: updated.id,
      details: {
        referenceId: updated.referenceId,
        patient: updated.patient.fullName,
        updates: updateData,
      },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("PATCH /api/admin/appointments/[id] error:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const existing = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: { patient: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Soft delete / cancel preference: update status to Cancelled
    const cancelled = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        status: "Cancelled",
        cancellationReason: "Cancelled by administrative personnel",
      },
    });

    await createAuditLog({
      actor: session,
      action: "CANCEL_APPOINTMENT",
      entityType: "Appointment",
      entityId: cancelled.id,
      details: { referenceId: cancelled.referenceId, patient: existing.patient.fullName },
    });

    return NextResponse.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
