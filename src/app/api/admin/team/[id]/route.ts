import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
    if (!member) return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    return NextResponse.json({ member });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const existing = await prisma.teamMember.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Team member not found" }, { status: 404 });

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.role !== undefined) updateData.role = body.role.trim();
    if (body.bio !== undefined) updateData.bio = body.bio.trim();
    if (body.qualifications !== undefined) updateData.qualifications = body.qualifications.trim();
    if (body.image !== undefined) updateData.image = body.image;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.displayOrder !== undefined) updateData.displayOrder = Number(body.displayOrder);
    if (body.isPublished !== undefined) updateData.isPublished = Boolean(body.isPublished);
    if (body.clinicalInterests !== undefined) {
      updateData.clinicalInterestsJson = typeof body.clinicalInterests === "string" ? body.clinicalInterests : JSON.stringify(body.clinicalInterests);
    }

    const updated = await prisma.teamMember.update({
      where: { id: params.id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_TEAM_MEMBER",
      entityType: "TeamMember",
      entityId: updated.id,
      details: { name: updated.name, updates: Object.keys(updateData) },
    });

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const existing = await prisma.teamMember.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Team member not found" }, { status: 404 });

    await prisma.teamMember.delete({ where: { id: params.id } });

    await createAuditLog({
      actor: session,
      action: "DELETE_TEAM_MEMBER",
      entityType: "TeamMember",
      entityId: params.id,
      details: { name: existing.name, role: existing.role },
    });

    return NextResponse.json({ success: true, message: "Team member profile deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
