import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);

    const staff = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        avatar: true,
        specialization: true,
        licenseNumber: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        _count: {
          select: {
            dentistAppointments: true,
            clinicalNotes: true,
          },
        },
      },
    });

    return NextResponse.json({ staff });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const body = await request.json();

    const {
      fullName,
      email,
      password,
      role = "DENTIST",
      phone,
      specialization,
      licenseNumber,
      avatar,
    } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email address, and initial password are required." },
        { status: 400 }
      );
    }

    // Role safety: CLINIC_ADMIN cannot create a SUPER_ADMIN
    if (role === "SUPER_ADMIN" && session.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only Super Admin can provision another Super Admin account." },
        { status: 403 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { error: "A staff account with this email already exists." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: cleanEmail,
        passwordHash,
        role,
        phone: phone?.trim() || null,
        specialization: specialization?.trim() || null,
        licenseNumber: licenseNumber?.trim() || null,
        avatar: avatar || null,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        specialization: true,
        isActive: true,
        createdAt: true,
      },
    });

    // If role is DENTIST or SUPER_ADMIN, provision default Mon-Sat working schedule
    if (role === "DENTIST" || role === "SUPER_ADMIN") {
      const workingDays = [1, 2, 3, 4, 5, 6];
      for (let day = 0; day <= 6; day++) {
        await prisma.dentistSchedule.create({
          data: {
            dentistId: user.id,
            dayOfWeek: day,
            startTime: "09:30",
            endTime: "19:30",
            breakStart: "13:30",
            breakEnd: "14:30",
            isWorkingDay: workingDays.includes(day),
          },
        });
      }
    }

    await createAuditLog({
      actor: session,
      action: "PROVISION_STAFF_MEMBER",
      entityType: "User",
      entityId: user.id,
      details: { fullName: user.fullName, email: user.email, role: user.role },
    });

    return NextResponse.json({ success: true, staff: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const body = await request.json();
    const { id, role, isActive, fullName, phone, specialization, licenseNumber, password } = body;

    if (!id) {
      return NextResponse.json({ error: "Staff user ID is required" }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    // Role safety: CLINIC_ADMIN cannot modify SUPER_ADMIN
    if (targetUser.role === "SUPER_ADMIN" && session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Cannot modify Super Admin accounts" }, { status: 403 });
    }

    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (specialization !== undefined) updateData.specialization = specialization.trim();
    if (licenseNumber !== undefined) updateData.licenseNumber = licenseNumber.trim();
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    if (role !== undefined) {
      if (role === "SUPER_ADMIN" && session.role !== "SUPER_ADMIN") {
        return NextResponse.json({ error: "Cannot elevate to Super Admin" }, { status: 403 });
      }
      updateData.role = role;
    }

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password.trim(), salt);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        specialization: true,
        isActive: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_STAFF_MEMBER",
      entityType: "User",
      entityId: updated.id,
      details: { fullName: updated.fullName, email: updated.email, updates: Object.keys(updateData) },
    });

    return NextResponse.json({ success: true, staff: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
