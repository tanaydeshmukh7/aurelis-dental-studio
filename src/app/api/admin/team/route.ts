import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth();
    const team = await prisma.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ team });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const {
      name,
      slug,
      role,
      bio,
      qualifications,
      clinicalInterests = [],
      image,
      email,
      phone,
      isPublished = true,
    } = body;

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existing = await prisma.teamMember.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: "A team profile with this URL slug already exists" }, { status: 400 });
    }

    const count = await prisma.teamMember.count();

    const member = await prisma.teamMember.create({
      data: {
        slug: cleanSlug,
        name: name.trim(),
        role: role.trim(),
        bio: bio?.trim() || "",
        qualifications: qualifications?.trim() || "",
        clinicalInterestsJson: JSON.stringify(clinicalInterests),
        image: image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85",
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        displayOrder: count + 1,
        isPublished: Boolean(isPublished),
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_TEAM_MEMBER",
      entityType: "TeamMember",
      entityId: member.id,
      details: { name: member.name, role: member.role, slug: member.slug },
    });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
