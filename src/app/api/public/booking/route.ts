import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      treatment: treatmentInput,
      preferredDate,
      preferredTime = "Morning (10:00 AM – 01:00 PM)",
      message,
      privacyConsent,
    } = body;

    if (!fullName || !phone || !preferredDate) {
      return NextResponse.json(
        { error: "Please provide your full name, phone number, and preferred date." },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "Please confirm your consent for consultation scheduling." },
        { status: 400 }
      );
    }

    // Clean inputs
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email?.trim() || null;
    const cleanDate = new Date(preferredDate);

    // Find treatment service
    let treatment = await prisma.treatmentService.findFirst({
      where: {
        OR: [
          { title: { contains: treatmentInput || "Smile Design" } },
          { slug: treatmentInput || "smile-design" },
        ],
      },
    });

    if (!treatment) {
      treatment = await prisma.treatmentService.findFirst({
        where: { isActive: true },
      });
    }

    if (!treatment) {
      return NextResponse.json({ error: "No active treatments available." }, { status: 400 });
    }

    // Find or create patient record
    let patient = await prisma.patient.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          ...(cleanEmail ? [{ email: cleanEmail }] : []),
        ],
      },
    });

    if (!patient) {
      const pCount = await prisma.patient.count();
      const pRef = `AUR-P-${String(pCount + 1001).padStart(4, "0")}`;
      patient = await prisma.patient.create({
        data: {
          referenceId: pRef,
          fullName: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          status: "Active",
          notes: `Registered via public website booking request for ${treatment.title}`,
        },
      });
    }

    // Assign default clinician (Lead Clinician or first active dentist)
    let dentist = await prisma.user.findFirst({
      where: { role: "DENTIST", isActive: true },
    });
    if (!dentist) {
      dentist = await prisma.user.findFirst({
        where: { role: "SUPER_ADMIN" },
      });
    }

    if (!dentist) {
      return NextResponse.json({ error: "No available clinicians configured." }, { status: 500 });
    }

    // Determine requested time slot
    let slotStart = "10:30";
    let slotEnd = "11:30";
    if (preferredTime.includes("Afternoon")) {
      slotStart = "14:30";
      slotEnd = "15:30";
    } else if (preferredTime.includes("Evening")) {
      slotStart = "16:30";
      slotEnd = "17:30";
    }

    // Create Appointment in "Requested" status
    const aCount = await prisma.appointment.count();
    const aptRef = `APT-${new Date().getFullYear()}-${String(aCount + 1001).padStart(4, "0")}`;

    const appointment = await prisma.appointment.create({
      data: {
        referenceId: aptRef,
        patientId: patient.id,
        dentistId: dentist.id,
        treatmentId: treatment.id,
        date: cleanDate,
        startTime: slotStart,
        endTime: slotEnd,
        durationMinutes: treatment.durationMinutes,
        status: "Requested",
        bookingSource: "Website",
        notes: `Client preference: ${preferredTime}. Patient note: ${message || "None provided."}`,
      },
    });

    // Create central Lead Enquiry
    const lCount = await prisma.leadEnquiry.count();
    const leadRef = `LEAD-${new Date().getFullYear()}-${String(lCount + 101).padStart(4, "0")}`;

    const lead = await prisma.leadEnquiry.create({
      data: {
        referenceId: leadRef,
        type: "Booking Request",
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        requestedTreatment: treatment.title,
        preferredDate: preferredDate,
        preferredTime: preferredTime,
        message: message?.trim() || null,
        sourcePage: "/book-appointment",
        status: "New",
      },
    });

    // Create in-app notification for clinic staff
    await prisma.notification.create({
      data: {
        title: "New Public Booking Request",
        message: `${cleanName} requested a consultation for ${treatment.title} (${aptRef}).`,
        type: "info",
        link: "/admin/appointments",
      },
    });

    // Audit log
    await createAuditLog({
      action: "PUBLIC_BOOKING_REQUEST",
      entityType: "Appointment",
      entityId: appointment.id,
      details: {
        appointmentReference: aptRef,
        leadReference: leadRef,
        patientName: cleanName,
        treatment: treatment.title,
        preferredDate,
        preferredTime,
      },
      ipAddress: request.headers.get("x-forwarded-for") || "public-web",
    });

    return NextResponse.json({
      success: true,
      message: "Consultation reservation request received successfully.",
      referenceId: aptRef,
      leadReference: leadRef,
      treatment: treatment.title,
      scheduledWindow: `${preferredDate} · ${preferredTime}`,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Public booking error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking. Please call reception." },
      { status: 500 }
    );
  }
}
