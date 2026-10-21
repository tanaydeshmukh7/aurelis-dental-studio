import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "ACCOUNTANT"]);
    const url = new URL(request.url);

    const range = url.searchParams.get("range") || "30d";
    const exportCsv = url.searchParams.get("export") === "csv";

    const now = new Date();
    let startDate: Date;

    if (range === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === "90d") {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (range === "365d") {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    } else {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // 1. Appointments Data
    const appointments = await prisma.appointment.findMany({
      where: { date: { gte: startDate } },
      include: {
        treatment: { select: { title: true } },
        patient: { select: { fullName: true } },
        dentist: { select: { fullName: true } },
      },
    });

    const statusCounts: Record<string, number> = {};
    const treatmentCounts: Record<string, number> = {};
    const dentistCounts: Record<string, number> = {};

    for (const a of appointments) {
      statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
      const tTitle = a.treatment?.title || "Other";
      treatmentCounts[tTitle] = (treatmentCounts[tTitle] || 0) + 1;
      const dName = a.dentist?.fullName || "Unassigned";
      dentistCounts[dName] = (dentistCounts[dName] || 0) + 1;
    }

    // 2. Financial Metrics: Real Payments
    const payments = await prisma.payment.findMany({
      where: {
        paymentDate: { gte: startDate },
        isReversed: false,
      },
      include: {
        patient: { select: { fullName: true } },
        invoice: { select: { invoiceNumber: true } },
      },
    });

    let totalRevenue = 0;
    const paymentMethods: Record<string, number> = {};
    for (const p of payments) {
      totalRevenue += p.amount;
      paymentMethods[p.paymentMethod] = (paymentMethods[p.paymentMethod] || 0) + p.amount;
    }

    // 3. Expenses
    const expenses = await prisma.expense.findMany({
      where: { date: { gte: startDate } },
      include: { supplier: { select: { name: true } } },
    });

    let totalExpenses = 0;
    const expenseCategories: Record<string, number> = {};
    for (const e of expenses) {
      totalExpenses += e.amount;
      expenseCategories[e.category] = (expenseCategories[e.category] || 0) + e.amount;
    }

    // 4. Invoices & Balances
    const openInvoices = await prisma.invoice.findMany({
      where: { status: { in: ["Issued", "Partially Paid", "Overdue"] } },
      select: { balanceDue: true, totalAmount: true },
    });
    const totalOutstanding = openInvoices.reduce((acc, i) => acc + i.balanceDue, 0);

    // 5. Patients
    const newPatients = await prisma.patient.count({
      where: { createdAt: { gte: startDate } },
    });
    const totalPatients = await prisma.patient.count();

    // 6. CSV Export if requested
    if (exportCsv) {
      let csv = "AURELIS DENTAL STUDIO - FINANCIAL & OPERATIONAL REPORT\n";
      csv += `Reporting Period: Last ${range} (From ${startDate.toISOString().split("T")[0]} to ${now.toISOString().split("T")[0]})\n\n`;

      csv += "1. SUMMARY METRICS\n";
      csv += `Total Revenue Collected (INR),${totalRevenue}\n`;
      csv += `Total Expenses (INR),${totalExpenses}\n`;
      csv += `Net Operating Income (INR),${totalRevenue - totalExpenses}\n`;
      csv += `Outstanding Balances (INR),${totalOutstanding}\n`;
      csv += `Total Appointments,${appointments.length}\n`;
      csv += `New Patients Registered,${newPatients}\n\n`;

      csv += "2. REVENUE TRANSACTIONS\n";
      csv += "Reference,Date,Patient,Invoice,Method,Amount (INR)\n";
      for (const p of payments) {
        csv += `"${p.paymentReference}","${p.paymentDate.toISOString().split("T")[0]}","${p.patient.fullName}","${p.invoice.invoiceNumber}","${p.paymentMethod}",${p.amount}\n`;
      }
      csv += "\n3. EXPENSES\n";
      csv += "Number,Date,Category,Description,Supplier,Amount (INR)\n";
      for (const e of expenses) {
        csv += `"${e.expenseNumber}","${e.date.toISOString().split("T")[0]}","${e.category}","${e.description}","${e.supplier?.name || "N/A"}",${e.amount}\n`;
      }

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename=aurelis-report-${range}.csv`,
        },
      });
    }

    return NextResponse.json({
      summary: {
        totalRevenue,
        totalExpenses,
        netIncome: totalRevenue - totalExpenses,
        totalOutstanding,
        appointmentCount: appointments.length,
        newPatients,
        totalPatients,
      },
      statusDistribution: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
      treatmentBookings: Object.entries(treatmentCounts).map(([treatment, count]) => ({ treatment, count })),
      dentistUtilisation: Object.entries(dentistCounts).map(([dentist, count]) => ({ dentist, count })),
      paymentMethodBreakdown: Object.entries(paymentMethods).map(([method, amount]) => ({ method, amount })),
      expenseCategoryBreakdown: Object.entries(expenseCategories).map(([category, amount]) => ({ category, amount })),
      range,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
