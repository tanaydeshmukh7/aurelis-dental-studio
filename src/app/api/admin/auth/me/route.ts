import { NextResponse } from "next/server";
import { getSession, ROLE_PERMISSIONS } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      avatar: true,
      specialization: true,
      licenseNumber: true,
      lastLoginAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || {};

  return NextResponse.json({
    user,
    permissions,
  });
}
