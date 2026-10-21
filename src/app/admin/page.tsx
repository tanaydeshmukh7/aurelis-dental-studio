"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  RefreshCw,
  TrendingUp,
  Receipt,
  UserCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [range, setRange] = useState("30d");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async (selectedRange = range) => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/admin/dashboard?range=${selectedRange}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard(range);
  }, [range]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-white/70 rounded-xl w-64 border border-[#E9E2D7]" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-[#E9E2D7]" />
          ))}
        </div>
        <div className="h-80 bg-white rounded-2xl border border-[#E9E2D7]" />
      </div>
    );
  }

  const metrics = data?.metrics || {};

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Studio Operations Overview
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Real-time clinical occupancy, verified financial ledger, and patient workflow
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-[#E9E2D7] rounded-lg p-1 text-xs">
            {["today", "7d", "30d", "90d", "all"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  range === r
                    ? "bg-[#86A58C] text-white shadow-sm"
                    : "text-[#82786E] hover:text-[#28231F]"
                }`}
              >
                {r === "today" ? "Today" : r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : r === "90d" ? "90 Days" : "All Time"}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchDashboard(range)}
            disabled={refreshing}
            className="p-2 bg-white border border-[#E9E2D7] rounded-lg text-[#82786E] hover:text-[#28231F] transition-colors"
            title="Refresh database queries"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#82786E]">
              Today&apos;s Appointments
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#86A58C]/15 text-[#86A58C] flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#28231F]">
              {metrics.todayAppointments ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#82786E]">
              <span className="font-medium text-[#86A58C]">{metrics.upcomingAppointments ?? 0} upcoming</span>
              <span>later this week</span>
            </div>
          </div>
          <Link
            href="/admin/appointments"
            className="mt-4 pt-3 border-t border-[#E9E2D7]/60 text-xs text-[#86A58C] font-medium flex items-center justify-between hover:underline"
          >
            <span>Open Calendar</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 2: Revenue Collected */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#82786E]">
              Revenue Collected ({range})
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#86A58C]/15 text-[#86A58C] flex items-center justify-center">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#28231F]">
              ₹{(metrics.revenueCollected ?? 0).toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#82786E]">
              <span>Verified receipts in database</span>
            </div>
          </div>
          <Link
            href="/admin/payments"
            className="mt-4 pt-3 border-t border-[#E9E2D7]/60 text-xs text-[#86A58C] font-medium flex items-center justify-between hover:underline"
          >
            <span>Payment Ledger</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 3: Outstanding Balance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#82786E]">
              Outstanding Balances
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Receipt size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#28231F]">
              ₹{(metrics.outstandingBalance ?? 0).toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#82786E]">
              <span>From open patient invoices</span>
            </div>
          </div>
          <Link
            href="/admin/billing"
            className="mt-4 pt-3 border-t border-[#E9E2D7]/60 text-xs text-[#86A58C] font-medium flex items-center justify-between hover:underline"
          >
            <span>Review Invoices</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 4: Action Items & Low Stock */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#82786E]">
              Inventory & Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#28231F]">
              {metrics.lowStockCount ?? 0}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#82786E]">
              <span>Items below reorder limit · {metrics.pendingRequests ?? 0} pending requests</span>
            </div>
          </div>
          <Link
            href="/admin/inventory"
            className="mt-4 pt-3 border-t border-[#E9E2D7]/60 text-xs text-[#86A58C] font-medium flex items-center justify-between hover:underline"
          >
            <span>Audit Supplies</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Grid: Recent Appointments + Operational Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#E9E2D7] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#28231F]">Recent & Upcoming Appointments</h2>
              <p className="text-xs text-[#82786E]">Live schedule updates from clinic operatories</p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-medium text-[#86A58C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            {(!data?.recentAppointments || data.recentAppointments.length === 0) ? (
              <div className="p-8 text-center text-xs text-[#82786E]">
                No appointments registered yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F5F0]/60 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
                  <tr>
                    <th className="py-3 px-4">Ref ID</th>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Clinician</th>
                    <th className="py-3 px-4">Treatment</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E2D7]/60">
                  {data.recentAppointments.map((a: any) => (
                    <tr key={a.id} className="hover:bg-[#F7F5F0]/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-[#28231F]">
                        {a.referenceId}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#28231F]">
                        <Link href={`/admin/patients/${a.patient.id}`} className="hover:text-[#86A58C] hover:underline">
                          {a.patient.fullName}
                        </Link>
                        <div className="text-[10px] text-[#82786E]">{a.patient.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-[#28231F]">{a.dentist.fullName}</td>
                      <td className="py-3 px-4 text-[#82786E]">{a.treatment.title}</td>
                      <td className="py-3 px-4 text-[#28231F]">
                        <div>{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                        <div className="text-[10px] text-[#82786E]">{a.startTime}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                            a.status === "Completed"
                              ? "bg-[#86A58C]/20 text-[#4c6751]"
                              : a.status === "In Progress"
                              ? "bg-amber-100 text-amber-800"
                              : a.status === "Confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : a.status === "Requested"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Col: Appointment Status Distribution + Audit Feed */}
        <div className="space-y-6">
          {/* Status Breakdown Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
            <h2 className="text-sm font-semibold text-[#28231F] mb-3">Appointment Status Mix</h2>
            <div className="space-y-2.5">
              {data?.statusDistribution?.map((s: any) => (
                <div key={s.status} className="flex items-center justify-between text-xs">
                  <span className="text-[#82786E] font-medium">{s.status}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#28231F]">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs Box */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#28231F]">Recent Audit Trail</h2>
              <Link href="/admin/audit-logs" className="text-[11px] text-[#86A58C] hover:underline">
                Full Log
              </Link>
            </div>
            <div className="space-y-3">
              {data?.recentActivity?.slice(0, 5).map((log: any) => (
                <div key={log.id} className="text-xs border-l-2 border-[#86A58C] pl-2.5 py-0.5">
                  <div className="font-semibold text-[#28231F]">
                    {log.action.replace(/_/g, " ")}
                  </div>
                  <div className="text-[11px] text-[#82786E]">
                    {log.actorName} ({log.actorRole})
                  </div>
                  <div className="text-[10px] text-[#82786E]/70 mt-0.5">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
