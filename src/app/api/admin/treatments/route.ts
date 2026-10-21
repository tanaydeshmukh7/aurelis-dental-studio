import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get("activeOnly") === "true";

    const treatments = await prisma.treatmentService.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    return NextResponse.json({ treatments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const {
      title,
      slug,
      number,
      tagline,
      shortDesc,
      fullDesc,
      durationMinutes = 60,
      price = 0,
      deposit = 0,
      image,
      imageAlt,
      heroImage,
      supportingImages,
      suitability,
      benefits,
      timeline,
      approach,
      procedureStages,
      idealFor,
      faqs,
      bookingVisibility = true,
      isActive = true,
      seoTitle,
      seoDescription,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const existing = await prisma.treatmentService.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 400 });
    }

    const count = await prisma.treatmentService.count();
    const numStr = number || String(count + 1).padStart(2, "0");

    const treatment = await prisma.treatmentService.create({
      data: {
        slug: cleanSlug,
        number: numStr,
        title: title.trim(),
        tagline: tagline?.trim() || "",
        shortDesc: shortDesc?.trim() || "",
        fullDesc: fullDesc?.trim() || "",
        durationMinutes: Number(durationMinutes),
        price: Number(price),
        deposit: Number(deposit),
        image: image || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
        imageAlt: imageAlt || title,
        heroImage: heroImage || image || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=85",
        supportingImagesJson: JSON.stringify(supportingImages || []),
        suitabilityJson: JSON.stringify(suitability || []),
        benefitsJson: JSON.stringify(benefits || []),
        timeline: timeline || "1 to 2 consultations",
        approachJson: JSON.stringify(approach || []),
        procedureStagesJson: JSON.stringify(procedureStages || []),
        idealFor: idealFor || "Patients seeking refined clinical dentistry",
        faqsJson: JSON.stringify(faqs || []),
        bookingVisibility: Boolean(bookingVisibility),
        isActive: Boolean(isActive),
        displayOrder: count + 1,
        seoTitle: seoTitle || `${title} | AURELIS Dental Studio`,
        seoDescription: seoDescription || shortDesc,
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_TREATMENT_SERVICE",
      entityType: "TreatmentService",
      entityId: treatment.id,
      details: { title: treatment.title, slug: treatment.slug, price: treatment.price },
    });

    return NextResponse.json({ success: true, treatment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
