import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, setSessionCookie } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      await createAuditLog({
        action: "LOGIN_FAILED",
        entityType: "User",
        details: { email: cleanEmail, reason: "User not found" },
        ipAddress: request.headers.get("x-forwarded-for") || "local",
      });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      await createAuditLog({
        actor: { userId: user.id, email: user.email, fullName: user.fullName, role: user.role as any },
        action: "LOGIN_FAILED",
        entityType: "User",
        entityId: user.id,
        details: { email: cleanEmail, reason: "Account deactivated" },
      });
      return NextResponse.json(
        { error: "This staff account has been deactivated. Contact Super Admin." },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      await createAuditLog({
        actor: { userId: user.id, email: user.email, fullName: user.fullName, role: user.role as any },
        action: "LOGIN_FAILED",
        entityType: "User",
        entityId: user.id,
        details: { email: cleanEmail, reason: "Incorrect password" },
      });
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session token
    const token = await signSession({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as any,
      avatar: user.avatar,
    });

    // Audit log
    await createAuditLog({
      actor: { userId: user.id, email: user.email, fullName: user.fullName, role: user.role as any },
      action: "LOGIN_SUCCESS",
      entityType: "User",
      entityId: user.id,
      details: { role: user.role, email: user.email },
      ipAddress: request.headers.get("x-forwarded-for") || "local",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during login." },
      { status: 500 }
    );
  }
}
