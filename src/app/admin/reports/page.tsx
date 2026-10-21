"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Receipt,
  Users,
  PieChart,
} from "lucide-react";

export default function AdminReportsPage() {
  const [range, setRange] = useState("30d");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async (r = range) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/reports?range=${r}`);
      if (res.ok) {
        const d = await res.json();
        setReport(d);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(range);
  }, [range]);

  const handleExportCsv = () => {
    window.open(`/api/admin/reports?range=${range}&export=csv`, "_blank");
  };

  const summary = report?.summary || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Financial & Operational Reports
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Strict ledger-backed metrics derived exclusively from confirmed transactions and clinical logs
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Range Selector */}
          <div className="flex items-center bg-white border border-[#E9E2D7] rounded-lg p-1 text-xs">
            {["7d", "30d", "90d", "365d"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  range === r ? "bg-[#86A58C] text-white shadow-sm" : "text-[#82786E]"
                }`}
              >
                {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : r === "90d" ? "90 Days" : "1 Year"}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9E2D7] hover:border-[#86A58C] text-[#28231F] text-xs font-semibold rounded-lg shadow-sm"
          >
            <Download size={14} className="text-[#86A58C]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Synthesizing verified clinic reports...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Financial Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#82786E] tracking-wider">Revenue Collected</span>
              <div className="text-2xl font-serif font-bold text-emerald-800 mt-2">
                ₹{(summary.totalRevenue || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-[10px] text-[#82786E] mt-1">Verified payment receipts in range</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#82786E] tracking-wider">Total Disbursements</span>
              <div className="text-2xl font-serif font-bold text-[#28231F] mt-2">
                ₹{(summary.totalExpenses || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-[10px] text-[#82786E] mt-1">Lab fees, supplies, utilities</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#82786E] tracking-wider">Net Operating Surplus</span>
              <div className="text-2xl font-serif font-bold text-[#86A58C] mt-2">
                ₹{(summary.netIncome || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-[10px] text-[#82786E] mt-1">Revenue minus operational costs</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-[#82786E] tracking-wider">Open Receivables</span>
              <div className="text-2xl font-serif font-bold text-rose-700 mt-2">
                ₹{(summary.totalOutstanding || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-[10px] text-[#82786E] mt-1">Unsettled invoice balances</p>
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Payment Method Distribution */}
            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-4">
              <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2">
                Payment Channel Distribution
              </h3>
              {(!report?.paymentMethodBreakdown || report.paymentMethodBreakdown.length === 0) ? (
                <p className="text-[#82786E]">No payments collected in this period.</p>
              ) : (
                <div className="space-y-3">
                  {report.paymentMethodBreakdown.map((pm: any) => {
                    const pct = summary.totalRevenue > 0 ? Math.round((pm.amount / summary.totalRevenue) * 100) : 0;
                    return (
                      <div key={pm.method} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#28231F]">{pm.method}</span>
                          <span className="text-[#82786E]">₹{pm.amount.toLocaleString("en-IN")} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-[#F7F5F0] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#86A58C] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Treatment Volume Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-4">
              <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2">
                Clinical Service Demand
              </h3>
              {(!report?.treatmentBookings || report.treatmentBookings.length === 0) ? (
                <p className="text-[#82786E]">No appointments recorded in this period.</p>
              ) : (
                <div className="space-y-3">
                  {report.treatmentBookings.map((tb: any) => {
                    const totalA = summary.appointmentCount || 1;
                    const pct = Math.round((tb.count / totalA) * 100);
                    return (
                      <div key={tb.treatment} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#28231F]">{tb.treatment}</span>
                          <span className="text-[#82786E]">{tb.count} bookings ({pct}%)</span>
                        </div>
                        <div className="w-full bg-[#F7F5F0] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#B69A72] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
