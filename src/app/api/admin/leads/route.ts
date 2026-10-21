import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST"]);
    const url = new URL(request.url);

    const status = url.searchParams.get("status");
    const type = url.searchParams.get("type");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;
    if (type && type !== "ALL") where.type = type;

    const leads = await prisma.leadEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        assignedTo: { select: { id: true, fullName: true, role: true } },
      },
    });

    return NextResponse.json({ leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST"]);
    const body = await request.json();
    const { id, status, notes, assignedToId } = body;

    if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedToId !== undefined) updateData.assignedToId = assignedToId || null;

    const updated = await prisma.leadEnquiry.update({
      where: { id },
      data: updateData,
      include: { assignedTo: true },
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_LEAD_STATUS",
      entityType: "LeadEnquiry",
      entityId: updated.id,
      details: { referenceId: updated.referenceId, status: updated.status, notes: updated.notes },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
