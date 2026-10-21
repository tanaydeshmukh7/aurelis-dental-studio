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
    const article = await prisma.blogArticle.findUnique({
      where: { id: params.id },
      include: { category: true },
    });
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json({ article });
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

    const existing = await prisma.blogArticle.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt.trim();
    if (body.content !== undefined) {
      updateData.content = typeof body.content === "object" ? JSON.stringify(body.content) : body.content;
    }
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;
    if (body.categorySlug !== undefined) updateData.categorySlug = body.categorySlug;
    if (body.authorName !== undefined) updateData.authorName = body.authorName;
    if (body.readTime !== undefined) updateData.readTime = body.readTime;
    if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription;
    if (body.tags !== undefined) updateData.tagsJson = JSON.stringify(body.tags);

    if (body.status !== undefined) {
      updateData.status = body.status;
      if (body.status === "Published" && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updated = await prisma.blogArticle.update({
      where: { id: params.id },
      data: updateData,
      include: { category: true },
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_BLOG_ARTICLE",
      entityType: "BlogArticle",
      entityId: updated.id,
      details: { title: updated.title, slug: updated.slug, status: updated.status },
    });

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const existing = await prisma.blogArticle.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    await prisma.blogArticle.delete({ where: { id: params.id } });

    await createAuditLog({
      actor: session,
      action: "DELETE_BLOG_ARTICLE",
      entityType: "BlogArticle",
      entityId: params.id,
      details: { title: existing.title, slug: existing.slug },
    });

    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
