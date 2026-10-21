import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth();
    const pages = await prisma.publicPage.findMany({
      orderBy: { slug: "asc" },
    });
    return NextResponse.json({ pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const { slug, title, headline, subheadline, content, metaTitle, metaDescription, isPublished = true } = body;
    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
    }

    const page = await prisma.publicPage.upsert({
      where: { slug },
      update: {
        title,
        headline,
        subheadline,
        contentJson: typeof content === "object" ? JSON.stringify(content) : content || "{}",
        metaTitle,
        metaDescription,
        isPublished: Boolean(isPublished),
      },
      create: {
        slug,
        title,
        headline,
        subheadline,
        contentJson: typeof content === "object" ? JSON.stringify(content) : content || "{}",
        metaTitle,
        metaDescription,
        isPublished: Boolean(isPublished),
      },
    });

    await createAuditLog({
      actor: session,
      action: "SAVE_PUBLIC_PAGE",
      entityType: "PublicPage",
      entityId: page.id,
      details: { slug: page.slug, title: page.title },
    });

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
