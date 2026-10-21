import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

    const url = new URL(request.url);
    const range = url.searchParams.get("range") || "30d"; // today, 7d, 30d, all

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    let startDate: Date;
    if (range === "today") {
      startDate = todayStart;
    } else if (range === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === "90d") {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (range === "all") {
      startDate = new Date(2020, 0, 1);
    } else {
      // 30d default
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Today's appointments count
    const todayAppointments = await prisma.appointment.count({
      where: {
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // Upcoming appointments count (from tomorrow onwards)
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        date: {
          gt: todayEnd,
        },
        status: { in: ["Confirmed", "Requested"] },
      },
    });

    // Status counts
    const completedAppointments = await prisma.appointment.count({
      where: { status: "Completed" },
    });

    const cancelledAppointments = await prisma.appointment.count({
      where: { status: "Cancelled" },
    });

    const pendingRequests = await prisma.appointment.count({
      where: { status: "Requested" },
    });

    // New patient registrations in selected range
    const newPatients = await prisma.patient.count({
      where: {
        createdAt: { gte: startDate },
      },
    });

    const totalPatients = await prisma.patient.count();

    // Financial queries: real verified payments recorded
    const payments = await prisma.payment.findMany({
      where: {
        paymentDate: { gte: startDate },
        isReversed: false,
      },
      select: { amount: true, paymentMethod: true, paymentDate: true },
    });

    const revenueCollected = payments.reduce((acc, p) => acc + p.amount, 0);

    // Outstanding balances from open invoices
    const openInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ["Issued", "Partially Paid", "Overdue"] },
      },
      select: { balanceDue: true, totalAmount: true },
    });

    const outstandingBalance = openInvoices.reduce((acc, inv) => acc + inv.balanceDue, 0);

    // Total expenses in range
    const expenses = await prisma.expense.findMany({
      where: {
        date: { gte: startDate },
      },
      select: { amount: true, category: true },
    });

    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);

    // Inventory items below reorder threshold
    const lowStockItems = await prisma.inventoryItem.findMany({
      where: {
        isActive: true,
      },
      include: { supplier: { select: { name: true } } },
    });
    const lowStockCount = lowStockItems.filter(
      (item) => item.quantityAvailable <= item.reorderThreshold
    ).length;

    // Recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      take: 7,
      orderBy: { date: "asc" },
      include: {
        patient: { select: { id: true, referenceId: true, fullName: true, phone: true } },
        dentist: { select: { fullName: true } },
        treatment: { select: { title: true } },
      },
    });

    // Status distribution
    const statusCounts = await prisma.appointment.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // Recent activity (Audit logs)
    const recentActivity = await prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    // Upcoming clinical follow-ups
    const upcomingFollowUps = await prisma.clinicalNote.findMany({
      where: {
        followUpDate: { gte: todayStart },
      },
      take: 5,
      orderBy: { followUpDate: "asc" },
      include: {
        patient: { select: { fullName: true, phone: true } },
        dentist: { select: { fullName: true } },
      },
    });

    return NextResponse.json({
      metrics: {
        todayAppointments,
        upcomingAppointments,
        completedAppointments,
        cancelledAppointments,
        pendingRequests,
        newPatients,
        totalPatients,
        revenueCollected,
        outstandingBalance,
        totalExpenses,
        lowStockCount,
      },
      statusDistribution: statusCounts.map((s) => ({
        status: s.status,
        count: s._count.status,
      })),
      recentAppointments,
      recentActivity,
      upcomingFollowUps,
      range,
    });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
