import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const url = new URL(request.url);

    const status = url.searchParams.get("status");
    const categorySlug = url.searchParams.get("category");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;
    if (categorySlug && categorySlug !== "ALL") where.categorySlug = categorySlug;

    const [articles, categories] = await Promise.all([
      prisma.blogArticle.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
      prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    ]);

    return NextResponse.json({ articles, categories });
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
      excerpt,
      content,
      coverImage,
      categorySlug = "oral-health",
      authorName,
      readTime = "5 min read",
      status = "Draft",
      seoTitle,
      seoDescription,
      tags = [],
    } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Article title, excerpt, and content are required." },
        { status: 400 }
      );
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existing = await prisma.blogArticle.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json(
        { error: "An article with this URL slug already exists. Please choose a unique slug." },
        { status: 400 }
      );
    }

    // Ensure category exists
    let cat = await prisma.blogCategory.findUnique({ where: { slug: categorySlug } });
    if (!cat) {
      cat = await prisma.blogCategory.create({
        data: {
          slug: categorySlug,
          name: categorySlug.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
        },
      });
    }

    const article = await prisma.blogArticle.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        excerpt: excerpt.trim(),
        content: typeof content === "object" ? JSON.stringify(content) : content,
        coverImage: coverImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
        categorySlug: cat.slug,
        authorName: authorName || session.fullName,
        readTime,
        status,
        publishedAt: status === "Published" ? new Date() : null,
        seoTitle: seoTitle || `${title} | The Aurelis Journal`,
        seoDescription: seoDescription || excerpt,
        tagsJson: JSON.stringify(tags),
      },
      include: { category: true },
    });

    await createAuditLog({
      actor: session,
      action: status === "Published" ? "PUBLISH_BLOG_ARTICLE" : "CREATE_BLOG_DRAFT",
      entityType: "BlogArticle",
      entityId: article.id,
      details: { title: article.title, slug: article.slug, status: article.status },
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
