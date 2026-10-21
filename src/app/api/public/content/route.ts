import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [treatments, team, blog, gallery, reviews] = await Promise.all([
      prisma.treatmentService.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.teamMember.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.blogArticle.findMany({
        where: { status: "Published" },
        orderBy: { publishedAt: "desc" },
      }),
      prisma.galleryItem.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.testimonial.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);

    const formattedTreatments = treatments.map((t) => ({
      id: t.id,
      slug: t.slug,
      number: t.number,
      title: t.title,
      tagline: t.tagline,
      shortDesc: t.shortDesc,
      fullDesc: t.fullDesc,
      duration: `${t.durationMinutes} mins`,
      price: t.price ? `₹${t.price.toLocaleString("en-IN")}` : "Custom",
      deposit: t.deposit,
      image: t.image,
      imageAlt: t.imageAlt,
      heroImage: t.heroImage,
      supportingImages: JSON.parse(t.supportingImagesJson || "[]"),
      suitability: JSON.parse(t.suitabilityJson || "[]"),
      benefits: JSON.parse(t.benefitsJson || "[]"),
      timeline: t.timeline,
      approach: JSON.parse(t.approachJson || "[]"),
      procedureStages: JSON.parse(t.procedureStagesJson || "[]"),
      idealFor: t.idealFor,
      faqs: JSON.parse(t.faqsJson || "[]"),
    }));

    const formattedTeam = team.map((m) => ({
      id: m.id,
      slug: m.slug,
      name: m.name,
      role: m.role,
      category: "Clinical Leadership",
      credentials: m.qualifications,
      specialty: m.role,
      shortBio: m.bio,
      fullBio: m.bio,
      education: [m.qualifications],
      memberships: [],
      philosophyQuote: m.bio,
      experienceYears: 10,
      portraitImage: m.image,
      portraitAlt: m.name,
    }));

    const formattedBlog = blog.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.categorySlug,
      author: {
        name: a.authorName,
        role: "Clinical Specialist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      },
      readTime: a.readTime,
      publishedDate: a.publishedAt ? a.publishedAt.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      featured: false,
      coverImage: a.coverImage,
      coverAlt: a.title,
      coverImageAlt: a.title,
      tags: JSON.parse(a.tagsJson || "[]"),
    }));

    const formattedGallery = gallery.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      caption: g.caption || "",
      src: g.image,
      alt: g.altText,
      aspectRatio: "aspect-[4/3]",
    }));

    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      author: r.patientName,
      treatment: r.treatmentName,
      rating: r.rating,
      quote: r.quote,
      text: r.quote,
      location: "Koregaon Park, Pune",
      year: r.visitYear,
      featured: r.isFeatured,
    }));

    return NextResponse.json({
      success: true,
      treatments: formattedTreatments,
      team: formattedTeam,
      blog: formattedBlog,
      gallery: formattedGallery,
      reviews: formattedReviews,
    });
  } catch (error: any) {
    console.error("Public content error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve studio content" },
      { status: 500 }
    );
  }
}
