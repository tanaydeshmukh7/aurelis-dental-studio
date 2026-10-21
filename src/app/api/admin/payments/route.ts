import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST", "ACCOUNTANT"]);
    const url = new URL(request.url);

    const invoiceId = url.searchParams.get("invoiceId");
    const patientId = url.searchParams.get("patientId");
    const method = url.searchParams.get("method");

    const where: any = {};
    if (invoiceId) where.invoiceId = invoiceId;
    if (patientId) where.patientId = patientId;
    if (method && method !== "ALL") where.paymentMethod = method;

    const payments = await prisma.payment.findMany({
      where,
      orderBy: { paymentDate: "desc" },
      include: {
        patient: { select: { id: true, referenceId: true, fullName: true, phone: true } },
        invoice: { select: { id: true, invoiceNumber: true, totalAmount: true, balanceDue: true } },
        recordedBy: { select: { id: true, fullName: true, role: true } },
      },
    });

    return NextResponse.json({ payments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST", "ACCOUNTANT"]);
    const body = await request.json();

    const {
      invoiceId,
      amount,
      paymentMethod = "Card",
      transactionReference,
      notes,
    } = body;

    const numAmount = Math.max(0, Number(amount) || 0);
    if (!invoiceId || numAmount <= 0) {
      return NextResponse.json({ error: "Invoice ID and a valid payment amount are required." }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { patient: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (numAmount > invoice.balanceDue) {
      return NextResponse.json(
        { error: `Payment amount (₹${numAmount}) exceeds the outstanding balance (₹${invoice.balanceDue}).` },
        { status: 400 }
      );
    }

    const count = await prisma.payment.count();
    const paymentReference = `PAY-${new Date().getFullYear()}-${String(count + 101).padStart(4, "0")}`;

    // Transactional payment record & invoice balance adjustment
    const [payment, updatedInvoice] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          paymentReference,
          invoiceId: invoice.id,
          patientId: invoice.patientId,
          amount: numAmount,
          paymentMethod,
          transactionReference: transactionReference?.trim() || null,
          recordedById: session.userId,
          notes: notes?.trim() || null,
        },
        include: {
          patient: true,
          recordedBy: true,
        },
      }),
      prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          amountPaid: { increment: numAmount },
          balanceDue: { decrement: numAmount },
          status: invoice.balanceDue - numAmount <= 0 ? "Paid" : "Partially Paid",
        },
      }),
    ]);

    await createAuditLog({
      actor: session,
      action: "RECORD_PAYMENT",
      entityType: "Payment",
      entityId: payment.id,
      details: {
        paymentReference,
        invoiceNumber: invoice.invoiceNumber,
        patient: invoice.patient.fullName,
        amount: numAmount,
        method: paymentMethod,
        transactionRef: transactionReference,
      },
    });

    return NextResponse.json({ success: true, payment, invoice: updatedInvoice }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/payments error:", error);
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Reversal / refund endpoint
    const session = await requireAuth(["SUPER_ADMIN", "ACCOUNTANT"]);
    const body = await request.json();
    const { paymentId, reverseReason } = body;

    if (!paymentId || !reverseReason) {
      return NextResponse.json({ error: "Payment ID and reversal reason are required." }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { invoice: true, patient: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.isReversed) {
      return NextResponse.json({ error: "Payment has already been reversed." }, { status: 400 });
    }

    const [updatedPayment, updatedInvoice] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: paymentId },
        data: {
          isReversed: true,
          reverseReason: reverseReason.trim(),
        },
      }),
      prisma.invoice.update({
        where: { id: payment.invoiceId },
        data: {
          amountPaid: { decrement: payment.amount },
          balanceDue: { increment: payment.amount },
          status: "Issued", // Restore open status
        },
      }),
    ]);

    await createAuditLog({
      actor: session,
      action: "REVERSE_PAYMENT",
      entityType: "Payment",
      entityId: payment.id,
      details: {
        paymentReference: payment.paymentReference,
        amount: payment.amount,
        reason: reverseReason,
      },
    });

    return NextResponse.json({ success: true, payment: updatedPayment, invoice: updatedInvoice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
