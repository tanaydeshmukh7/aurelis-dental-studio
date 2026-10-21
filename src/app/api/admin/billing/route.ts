import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST", "ACCOUNTANT"]);
    const url = new URL(request.url);

    const status = url.searchParams.get("status");
    const patientId = url.searchParams.get("patientId");
    const search = url.searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;
    if (patientId) where.patientId = patientId;

    if (search) {
      where.OR = [
        { invoiceNumber: { contains: search } },
        { patient: { fullName: { contains: search } } },
        { patient: { referenceId: { contains: search } } },
      ];
    }

    const invoices = await prisma.invoice.findMany({
      where,
      orderBy: { issueDate: "desc" },
      include: {
        patient: {
          select: { id: true, referenceId: true, fullName: true, phone: true, email: true },
        },
        appointment: {
          select: { id: true, referenceId: true, date: true, treatment: { select: { title: true } } },
        },
        items: true,
        payments: true,
      },
    });

    return NextResponse.json({ invoices });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST", "ACCOUNTANT"]);
    const body = await request.json();

    const {
      patientId,
      appointmentId,
      dueDate,
      items = [],
      discount = 0,
      taxRate = 18,
      notes,
    } = body;

    if (!patientId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Patient and at least one line item are required to generate an invoice." },
        { status: 400 }
      );
    }

    // Server-side calculation
    let subtotal = 0;
    const computedItems = items.map((item: any) => {
      const q = Math.max(1, Number(item.quantity) || 1);
      const unit = Math.max(0, Number(item.unitPrice) || 0);
      const amount = q * unit;
      subtotal += amount;
      return {
        treatmentId: item.treatmentId || null,
        description: item.description?.trim() || "Clinical service",
        quantity: q,
        unitPrice: unit,
        amount,
      };
    });

    const numDiscount = Math.max(0, Number(discount) || 0);
    const taxableAmount = Math.max(0, subtotal - numDiscount);
    const numTaxRate = Math.max(0, Number(taxRate) || 0);
    const taxAmount = (taxableAmount * numTaxRate) / 100;
    const totalAmount = Math.round(taxableAmount + taxAmount);
    const balanceDue = totalAmount;

    // Generate Invoice Number
    const count = await prisma.invoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 101).padStart(4, "0")}`;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        patientId,
        appointmentId: appointmentId || null,
        issueDate: new Date(),
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        subtotal,
        discount: numDiscount,
        taxRate: numTaxRate,
        taxAmount,
        totalAmount,
        amountPaid: 0,
        balanceDue,
        status: "Issued",
        notes: notes?.trim() || null,
        items: {
          create: computedItems,
        },
      },
      include: {
        patient: true,
        items: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "GENERATE_INVOICE",
      entityType: "Invoice",
      entityId: invoice.id,
      details: {
        invoiceNumber,
        patient: invoice.patient.fullName,
        subtotal,
        totalAmount,
      },
    });

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/billing error:", error);
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
