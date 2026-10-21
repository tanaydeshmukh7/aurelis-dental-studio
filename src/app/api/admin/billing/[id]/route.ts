import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST", "ACCOUNTANT"]);

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        patient: true,
        appointment: {
          include: { dentist: { select: { fullName: true } }, treatment: true },
        },
        items: {
          include: { treatment: true },
        },
        payments: {
          include: { recordedBy: { select: { fullName: true } } },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ invoice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "ACCOUNTANT"]);
    const body = await request.json();

    const existing = await prisma.invoice.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.dueDate) updateData.dueDate = new Date(body.dueDate);

    const updated = await prisma.invoice.update({
      where: { id: params.id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_INVOICE",
      entityType: "Invoice",
      entityId: updated.id,
      details: { invoiceNumber: updated.invoiceNumber, updates: updateData },
    });

    return NextResponse.json({ success: true, invoice: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
