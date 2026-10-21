import { NextRequest, NextResponse } from "next/server";
import { getSession, clearSessionCookie } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (session) {
    await createAuditLog({
      actor: session,
      action: "LOGOUT",
      entityType: "User",
      entityId: session.userId,
    });
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  clearSessionCookie(response);
  return response;
}
