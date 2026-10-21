import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const url = new URL(request.url);

    const action = url.searchParams.get("action");
    const entityType = url.searchParams.get("entityType");
    const search = url.searchParams.get("search");

    const where: any = {};
    if (action && action !== "ALL") where.action = action;
    if (entityType && entityType !== "ALL") where.entityType = entityType;

    if (search) {
      where.OR = [
        { actorName: { contains: search } },
        { action: { contains: search } },
        { entityType: { contains: search } },
        { detailsJson: { contains: search } },
      ];
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        actor: { select: { id: true, fullName: true, email: true, role: true } },
      },
    });

    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
