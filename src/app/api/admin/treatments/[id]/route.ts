import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const treatment = await prisma.treatmentService.findUnique({
      where: { id: params.id },
    });
    if (!treatment) {
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }
    return NextResponse.json({ treatment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const existing = await prisma.treatmentService.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }

    const updateData: any = {};
    const directFields = [
      "title",
      "number",
      "tagline",
      "shortDesc",
      "fullDesc",
      "timeline",
      "idealFor",
      "image",
      "imageAlt",
      "heroImage",
      "bookingVisibility",
      "isActive",
      "displayOrder",
      "seoTitle",
      "seoDescription",
    ];

    for (const f of directFields) {
      if (body[f] !== undefined) updateData[f] = body[f];
    }

    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.deposit !== undefined) updateData.deposit = Number(body.deposit);
    if (body.durationMinutes !== undefined) updateData.durationMinutes = Number(body.durationMinutes);

    // JSON fields
    if (body.supportingImages !== undefined) {
      updateData.supportingImagesJson = typeof body.supportingImages === "string" ? body.supportingImages : JSON.stringify(body.supportingImages);
    }
    if (body.suitability !== undefined) {
      updateData.suitabilityJson = typeof body.suitability === "string" ? body.suitability : JSON.stringify(body.suitability);
    }
    if (body.benefits !== undefined) {
      updateData.benefitsJson = typeof body.benefits === "string" ? body.benefits : JSON.stringify(body.benefits);
    }
    if (body.approach !== undefined) {
      updateData.approachJson = typeof body.approach === "string" ? body.approach : JSON.stringify(body.approach);
    }
    if (body.procedureStages !== undefined) {
      updateData.procedureStagesJson = typeof body.procedureStages === "string" ? body.procedureStages : JSON.stringify(body.procedureStages);
    }
    if (body.faqs !== undefined) {
      updateData.faqsJson = typeof body.faqs === "string" ? body.faqs : JSON.stringify(body.faqs);
    }

    const updated = await prisma.treatmentService.update({
      where: { id: params.id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_TREATMENT_SERVICE",
      entityType: "TreatmentService",
      entityId: updated.id,
      details: { title: updated.title, updates: updateData },
    });

    return NextResponse.json({ success: true, treatment: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const existing = await prisma.treatmentService.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }

    // Toggle active status / archive
    const updated = await prisma.treatmentService.update({
      where: { id: params.id },
      data: { isActive: false, bookingVisibility: false },
    });

    await createAuditLog({
      actor: session,
      action: "ARCHIVE_TREATMENT_SERVICE",
      entityType: "TreatmentService",
      entityId: updated.id,
      details: { title: updated.title, slug: updated.slug },
    });

    return NextResponse.json({ success: true, message: "Treatment archived successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
