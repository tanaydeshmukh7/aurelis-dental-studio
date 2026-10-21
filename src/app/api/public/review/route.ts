import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, treatment, rating, text, location } = body;

    if (!author || !text) {
      return NextResponse.json(
        { error: "Please provide your name and your review feedback." },
        { status: 400 }
      );
    }

    const count = await prisma.testimonial.count();
    const newReview = await prisma.testimonial.create({
      data: {
        patientName: author.trim(),
        treatmentName: treatment || "Dental Consultation",
        rating: Number(rating) || 5,
        quote: text.trim(),
        visitYear: new Date().getFullYear().toString(),
        isFeatured: false,
        isPublished: false, // Pending moderation by clinic admin
        displayOrder: count + 1,
      },
    });

    // Notify clinic team of new review awaiting moderation
    await prisma.notification.create({
      data: {
        title: "New Patient Review Submitted",
        message: `${newReview.patientName} submitted a ${newReview.rating}-star review for ${newReview.treatmentName}. Awaiting moderation.`,
        type: "info",
        link: "/admin/reviews",
      },
    });

    await createAuditLog({
      action: "PUBLIC_REVIEW_SUBMITTED",
      entityType: "Testimonial",
      entityId: newReview.id,
      details: { patientName: newReview.patientName, rating: newReview.rating, treatmentName: newReview.treatmentName },
      ipAddress: request.headers.get("x-forwarded-for") || "public-web",
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for sharing your experience. Your reflection has been submitted for verification.",
    }, { status: 201 });
  } catch (error: any) {
    console.error("Public review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
