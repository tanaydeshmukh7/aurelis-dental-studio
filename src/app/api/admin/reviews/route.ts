import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth();
    const reviews = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const {
      patientName,
      quote,
      treatmentName,
      rating = 5,
      visitYear = "2026",
      isFeatured = false,
      isPublished = true,
    } = body;

    if (!patientName || !quote || !treatmentName) {
      return NextResponse.json(
        { error: "Patient name, testimonial quote, and treatment name are required." },
        { status: 400 }
      );
    }

    const count = await prisma.testimonial.count();

    const review = await prisma.testimonial.create({
      data: {
        patientName: patientName.trim(),
        quote: quote.trim(),
        treatmentName: treatmentName.trim(),
        rating: Number(rating) || 5,
        visitYear: String(visitYear),
        isFeatured: Boolean(isFeatured),
        isPublished: Boolean(isPublished),
        displayOrder: count + 1,
      },
    });

    await createAuditLog({
      actor: session,
      action: "ADD_TESTIMONIAL",
      entityType: "Testimonial",
      entityId: review.id,
      details: { patientName: review.patientName, treatment: review.treatmentName },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();
    const { id, patientName, quote, treatmentName, rating, visitYear, isFeatured, isPublished, displayOrder } = body;

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updateData: any = {};
    if (patientName !== undefined) updateData.patientName = patientName.trim();
    if (quote !== undefined) updateData.quote = quote.trim();
    if (treatmentName !== undefined) updateData.treatmentName = treatmentName.trim();
    if (rating !== undefined) updateData.rating = Number(rating);
    if (visitYear !== undefined) updateData.visitYear = String(visitYear);
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);

    const updated = await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_TESTIMONIAL",
      entityType: "Testimonial",
      entityId: updated.id,
      details: { patientName: updated.patientName, updates: updateData },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.testimonial.delete({ where: { id } });

    await createAuditLog({
      actor: session,
      action: "DELETE_TESTIMONIAL",
      entityType: "Testimonial",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
