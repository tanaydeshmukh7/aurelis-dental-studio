import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    const where: any = {};
    if (category && category !== "ALL" && category !== "All Spaces") {
      where.category = category;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ items });
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
      category = "The Studio",
      image,
      caption,
      altText,
      displayOrder,
      isPublished = true,
    } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
    }

    const count = await prisma.galleryItem.count();

    const item = await prisma.galleryItem.create({
      data: {
        title: title.trim(),
        category,
        image,
        caption: caption?.trim() || null,
        altText: altText?.trim() || title.trim(),
        displayOrder: Number(displayOrder) || count + 1,
        isPublished: Boolean(isPublished),
      },
    });

    await createAuditLog({
      actor: session,
      action: "ADD_GALLERY_IMAGE",
      entityType: "GalleryItem",
      entityId: item.id,
      details: { title: item.title, category: item.category },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();
    const { id, title, category, image, caption, altText, displayOrder, isPublished } = body;

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (caption !== undefined) updateData.caption = caption?.trim() || null;
    if (altText !== undefined) updateData.altText = altText?.trim();
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_GALLERY_IMAGE",
      entityType: "GalleryItem",
      entityId: updated.id,
      details: { title: updated.title, updates: updateData },
    });

    return NextResponse.json({ success: true, item: updated });
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

    await prisma.galleryItem.delete({ where: { id } });

    await createAuditLog({
      actor: session,
      action: "DELETE_GALLERY_IMAGE",
      entityType: "GalleryItem",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "Gallery image deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
