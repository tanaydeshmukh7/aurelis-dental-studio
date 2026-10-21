import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "ACCOUNTANT"]);
    const url = new URL(request.url);

    const category = url.searchParams.get("category");
    const supplierId = url.searchParams.get("supplierId");
    const status = url.searchParams.get("status");

    const where: any = {};
    if (category && category !== "ALL") where.category = category;
    if (supplierId) where.supplierId = supplierId;
    if (status && status !== "ALL") where.paymentStatus = status;

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        supplier: { select: { id: true, name: true } },
        createdBy: { select: { id: true, fullName: true, role: true } },
      },
    });

    return NextResponse.json({ expenses });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "ACCOUNTANT"]);
    const body = await request.json();

    const {
      category = "Clinical Supplies",
      description,
      amount,
      date,
      supplierId,
      paymentStatus = "Paid",
      notes,
    } = body;

    const numAmount = Math.max(0, Number(amount) || 0);
    if (!description || numAmount <= 0) {
      return NextResponse.json(
        { error: "Description and positive expense amount are required." },
        { status: 400 }
      );
    }

    const count = await prisma.expense.count();
    const expenseNumber = `EXP-${new Date().getFullYear()}-${String(count + 101).padStart(4, "0")}`;

    const expense = await prisma.expense.create({
      data: {
        expenseNumber,
        category,
        description: description.trim(),
        amount: numAmount,
        date: date ? new Date(date) : new Date(),
        supplierId: supplierId || null,
        paymentStatus,
        createdById: session.userId,
        notes: notes?.trim() || null,
      },
      include: {
        supplier: true,
        createdBy: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "RECORD_EXPENSE",
      entityType: "Expense",
      entityId: expense.id,
      details: {
        expenseNumber,
        category,
        amount: numAmount,
        description: expense.description,
      },
    });

    return NextResponse.json({ success: true, expense }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
