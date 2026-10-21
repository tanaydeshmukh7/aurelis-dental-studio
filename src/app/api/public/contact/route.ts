import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, requestedTreatment, message } = body;

    if (!name || (!email && !phone) || !message) {
      return NextResponse.json(
        { error: "Please provide your name, contact phone or email, and inquiry message." },
        { status: 400 }
      );
    }

    const count = await prisma.leadEnquiry.count();
    const referenceId = `LEAD-${new Date().getFullYear()}-${String(count + 101).padStart(4, "0")}`;

    const lead = await prisma.leadEnquiry.create({
      data: {
        referenceId,
        type: "Contact Form",
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || "Not provided",
        requestedTreatment: requestedTreatment || "General Enquiry",
        message: message.trim(),
        sourcePage: "/contact",
        status: "New",
      },
    });

    // Notify clinic team
    await prisma.notification.create({
      data: {
        title: "New Website Enquiry",
        message: `${lead.name} sent a message via /contact (${referenceId}).`,
        type: "info",
        link: "/admin/leads",
      },
    });

    await createAuditLog({
      action: "PUBLIC_CONTACT_ENQUIRY",
      entityType: "LeadEnquiry",
      entityId: lead.id,
      details: { referenceId, name: lead.name, email: lead.email, phone: lead.phone },
      ipAddress: request.headers.get("x-forwarded-for") || "public-web",
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received by our studio concierge. We will reply promptly.",
      referenceId,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Public contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please reach out directly on WhatsApp or call our desk." },
      { status: 500 }
    );
  }
}
