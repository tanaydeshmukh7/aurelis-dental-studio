import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth();
    const settings = await prisma.clinicSetting.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN"]);
    const body = await request.json();

    const { settings = [] } = body;
    if (!Array.isArray(settings)) {
      return NextResponse.json({ error: "Invalid settings format" }, { status: 400 });
    }

    for (const item of settings) {
      if (item.key && item.value !== undefined) {
        await prisma.clinicSetting.upsert({
          where: { key: item.key },
          update: { value: String(item.value) },
          create: {
            key: item.key,
            value: String(item.value),
            category: item.category || "general",
            description: item.description || null,
          },
        });
      }
    }

    await createAuditLog({
      actor: session,
      action: "UPDATE_CLINIC_SETTINGS",
      entityType: "ClinicSetting",
      details: { updatedKeys: settings.map((s) => s.key) },
    });

    const updated = await prisma.clinicSetting.findMany();
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
