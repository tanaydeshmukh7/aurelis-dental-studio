import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only DENTIST or SUPER_ADMIN can create clinical notes
    const session = await requireAuth(["SUPER_ADMIN", "DENTIST"]);
    const body = await request.json();

    const {
      appointmentId,
      toothNumber,
      chiefComplaint,
      clinicalFindings,
      diagnosis,
      procedureConducted,
      materialsUsed,
      followUpDate,
      isRestricted = false,
    } = body;

    if (!chiefComplaint || !diagnosis || !procedureConducted) {
      return NextResponse.json(
        { error: "Chief complaint, diagnosis, and procedure conducted are required clinical fields." },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      select: { id: true, fullName: true, referenceId: true },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const note = await prisma.clinicalNote.create({
      data: {
        patientId: patient.id,
        dentistId: session.userId,
        appointmentId: appointmentId || null,
        toothNumber: toothNumber || null,
        chiefComplaint: chiefComplaint.trim(),
        clinicalFindings: clinicalFindings?.trim() || "",
        diagnosis: diagnosis.trim(),
        procedureConducted: procedureConducted.trim(),
        materialsUsed: materialsUsed?.trim() || null,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        isRestricted: Boolean(isRestricted),
      },
      include: {
        dentist: { select: { fullName: true } },
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_CLINICAL_NOTE",
      entityType: "ClinicalNote",
      entityId: note.id,
      details: {
        patientReference: patient.referenceId,
        patientName: patient.fullName,
        toothNumber: note.toothNumber,
        diagnosis: note.diagnosis,
      },
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("POST clinical note error:", error);
    return NextResponse.json({ error: "Failed to create clinical note" }, { status: 500 });
  }
}
