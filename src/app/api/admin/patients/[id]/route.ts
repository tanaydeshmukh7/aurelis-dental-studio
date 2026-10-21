import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST", "RECEPTIONIST"]);

    // Determine if user can see clinical records
    const canSeeClinical = ["SUPER_ADMIN", "DENTIST"].includes(session.role);

    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        appointments: {
          orderBy: { date: "desc" },
          include: {
            dentist: { select: { fullName: true, specialization: true } },
            treatment: { select: { title: true, price: true } },
          },
        },
        invoices: {
          orderBy: { issueDate: "desc" },
          include: {
            items: true,
            payments: true,
          },
        },
        payments: {
          orderBy: { paymentDate: "desc" },
          include: {
            recordedBy: { select: { fullName: true } },
          },
        },
        treatmentPlans: canSeeClinical
          ? {
              orderBy: { createdAt: "desc" },
              include: { dentist: { select: { fullName: true } } },
            }
          : false,
        clinicalNotes: canSeeClinical
          ? {
              orderBy: { createdAt: "desc" },
              include: { dentist: { select: { fullName: true } } },
            }
          : false,
        prescriptions: canSeeClinical
          ? {
              orderBy: { date: "desc" },
              include: { dentist: { select: { fullName: true } } },
            }
          : false,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Audit log patient record access
    await createAuditLog({
      actor: session,
      action: "VIEW_PATIENT_RECORD",
      entityType: "Patient",
      entityId: patient.id,
      details: { referenceId: patient.referenceId, patientName: patient.fullName },
    });

    return NextResponse.json({
      patient,
      canSeeClinical,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST", "RECEPTIONIST"]);
    const body = await request.json();

    const allowedUpdates = [
      "fullName",
      "phone",
      "email",
      "dateOfBirth",
      "gender",
      "bloodGroup",
      "address",
      "city",
      "medicalAlerts",
      "allergies",
      "emergencyContactName",
      "emergencyContactPhone",
      "notes",
      "status",
    ];

    const data: any = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        if (key === "dateOfBirth") {
          data[key] = body[key] ? new Date(body[key]) : null;
        } else {
          data[key] = body[key];
        }
      }
    }

    const updated = await prisma.patient.update({
      where: { id: params.id },
      data,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_PATIENT",
      entityType: "Patient",
      entityId: updated.id,
      details: { referenceId: updated.referenceId, updates: data },
    });

    return NextResponse.json({ success: true, patient: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
