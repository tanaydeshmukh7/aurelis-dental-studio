import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST", "RECEPTIONIST"]);
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "Active";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search.trim()) {
      where.OR = [
        { referenceId: { contains: search } },
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [total, patients] = await Promise.all([
      prisma.patient.count({ where }),
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          appointments: {
            orderBy: { date: "desc" },
            take: 2,
            include: { dentist: { select: { fullName: true } }, treatment: { select: { title: true } } },
          },
          invoices: {
            select: { totalAmount: true, balanceDue: true, status: true },
          },
        },
      }),
    ]);

    // Enhance each patient with lastVisit and nextAppointment
    const now = new Date();
    const formatted = patients.map((p) => {
      const pastAppts = p.appointments.filter((a) => new Date(a.date) <= now && a.status === "Completed");
      const futureAppts = p.appointments.filter((a) => new Date(a.date) >= now && a.status !== "Cancelled");

      const lastVisit = pastAppts[0]?.date || null;
      const nextAppointment = futureAppts[0]?.date || null;

      const totalBilled = p.invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
      const totalOutstanding = p.invoices.reduce((acc, inv) => acc + inv.balanceDue, 0);

      return {
        id: p.id,
        referenceId: p.referenceId,
        fullName: p.fullName,
        phone: p.phone,
        email: p.email,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        city: p.city,
        medicalAlerts: p.medicalAlerts,
        status: p.status,
        createdAt: p.createdAt,
        lastVisit,
        nextAppointment,
        totalBilled,
        totalOutstanding,
      };
    });

    return NextResponse.json({
      patients: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("GET /api/admin/patients error:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST", "RECEPTIONIST"]);
    const body = await request.json();

    const {
      fullName,
      phone,
      email,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      city = "Pune",
      medicalAlerts,
      allergies,
      emergencyContactName,
      emergencyContactPhone,
      notes,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Patient name and contact phone are required." },
        { status: 400 }
      );
    }

    const count = await prisma.patient.count();
    const referenceId = `AUR-P-${String(count + 1001).padStart(4, "0")}`;

    const patient = await prisma.patient.create({
      data: {
        referenceId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender || null,
        bloodGroup: bloodGroup || null,
        address: address?.trim() || null,
        city: city?.trim() || "Pune",
        medicalAlerts: medicalAlerts?.trim() || null,
        allergies: allergies?.trim() || null,
        emergencyContactName: emergencyContactName?.trim() || null,
        emergencyContactPhone: emergencyContactPhone?.trim() || null,
        notes: notes?.trim() || null,
        status: "Active",
      },
    });

    await createAuditLog({
      actor: session,
      action: "REGISTER_PATIENT",
      entityType: "Patient",
      entityId: patient.id,
      details: { referenceId, fullName: patient.fullName, phone: patient.phone },
    });

    return NextResponse.json({ success: true, patient }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("POST /api/admin/patients error:", error);
    return NextResponse.json({ error: "Failed to register patient" }, { status: 500 });
  }
}
