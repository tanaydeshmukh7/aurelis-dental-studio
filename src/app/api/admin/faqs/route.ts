import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth();
    const faqs = await prisma.fAQItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ faqs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();

    const { question, answer, category = "General", isPublished = true } = body;
    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const count = await prisma.fAQItem.count();

    const faq = await prisma.fAQItem.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        category,
        displayOrder: count + 1,
        isPublished: Boolean(isPublished),
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_FAQ",
      entityType: "FAQItem",
      entityId: faq.id,
      details: { question: faq.question },
    });

    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "CONTENT_EDITOR"]);
    const body = await request.json();
    const { id, question, answer, category, displayOrder, isPublished } = body;

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updateData: any = {};
    if (question !== undefined) updateData.question = question.trim();
    if (answer !== undefined) updateData.answer = answer.trim();
    if (category !== undefined) updateData.category = category;
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);

    const updated = await prisma.fAQItem.update({
      where: { id },
      data: updateData,
    });

    await createAuditLog({
      actor: session,
      action: "UPDATE_FAQ",
      entityType: "FAQItem",
      entityId: updated.id,
      details: { question: updated.question },
    });

    return NextResponse.json({ success: true, faq: updated });
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

    await prisma.fAQItem.delete({ where: { id } });

    await createAuditLog({
      actor: session,
      action: "DELETE_FAQ",
      entityType: "FAQItem",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
