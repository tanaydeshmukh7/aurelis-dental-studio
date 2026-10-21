import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "DENTIST"]);
    const body = await request.json();

    const { title, stages, estimatedCost = 0, notes, status = "Proposed" } = body;

    if (!title) {
      return NextResponse.json({ error: "Treatment plan title is required." }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      select: { id: true, fullName: true, referenceId: true },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const plan = await prisma.treatmentPlan.create({
      data: {
        patientId: patient.id,
        dentistId: session.userId,
        title: title.trim(),
        stagesJson: typeof stages === "string" ? stages : JSON.stringify(stages || []),
        estimatedCost: Number(estimatedCost),
        notes: notes?.trim() || null,
        status,
      },
      include: {
        dentist: { select: { fullName: true } },
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_TREATMENT_PLAN",
      entityType: "TreatmentPlan",
      entityId: plan.id,
      details: {
        patientReference: patient.referenceId,
        patientName: patient.fullName,
        planTitle: plan.title,
        estimatedCost: plan.estimatedCost,
      },
    });

    return NextResponse.json({ success: true, plan }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
