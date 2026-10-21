"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  Receipt,
  FileCheck,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const searchParams = useSearchParams();
  const defaultInvoiceId = searchParams.get("invoiceId") || "";
  const defaultAmount = searchParams.get("amount") || "";

  const [payments, setPayments] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Modals
  const [isRecordOpen, setIsRecordOpen] = useState(Boolean(defaultInvoiceId));
  const [isReverseOpen, setIsReverseOpen] = useState<any | null>(null);
  const [reverseReason, setReverseReason] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    invoiceId: defaultInvoiceId,
    amount: defaultAmount,
    paymentMethod: "Card",
    transactionReference: "",
    notes: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (methodFilter !== "ALL") params.append("method", methodFilter);

      const [payRes, invRes] = await Promise.all([
        fetch(`/api/admin/payments?${params.toString()}`),
        fetch("/api/admin/billing?status=Issued"),
      ]);

      if (payRes.ok) {
        const d = await payRes.json();
        setPayments(d.payments || []);
      }
      if (invRes.ok) {
        const d = await invRes.json();
        setInvoices(d.invoices || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [methodFilter]);

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to record payment");
        return;
      }

      setActionSuccess(`Payment ${data.payment.paymentReference} of ₹${data.payment.amount} recorded!`);
      setIsRecordOpen(false);
      setFormData({
        invoiceId: "",
        amount: "",
        paymentMethod: "Card",
        transactionReference: "",
        notes: "",
      });
      fetchData();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Network error while recording payment");
    }
  };

  const handleReversePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReverseOpen) return;
    try {
      const res = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: isReverseOpen.id,
          reverseReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to reverse payment");
        return;
      }

      setActionSuccess(`Payment ${isReverseOpen.paymentReference} reversed and ledger updated.`);
      setIsReverseOpen(null);
      setReverseReason("");
      fetchData();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Network error while reversing payment");
    }
  };

  const filteredPayments = payments.filter((p) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      p.paymentReference.toLowerCase().includes(s) ||
      p.patient.fullName.toLowerCase().includes(s) ||
      p.invoice.invoiceNumber.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Payment Receipts & Collections
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Verified cash, UPI, POS card terminals, and electronic bank settlement ledger
          </p>
        </div>

        <button
          onClick={() => {
            setIsRecordOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Record New Payment</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82786E]" />
          <input
            type="text"
            placeholder="Search payment reference or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          />
        </div>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
        >
          <option value="ALL">All Payment Methods</option>
          <option value="Card">Credit / Debit Card</option>
          <option value="UPI">UPI QR / NetBanking</option>
          <option value="Cash">Cash at Desk</option>
          <option value="Bank Transfer">NEFT / RTGS Wire</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading payment transactions...</p>
        </div>
      ) : filteredPayments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <CreditCard size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Payments Found</h3>
          <p className="text-xs text-[#82786E]">Record a verified payment from the button above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Payment Ref</th>
                <th className="py-3.5 px-4 font-semibold">Patient</th>
                <th className="py-3.5 px-4 font-semibold">Invoice #</th>
                <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                <th className="py-3.5 px-4 font-semibold">Method</th>
                <th className="py-3.5 px-4 font-semibold">Amount (₹)</th>
                <th className="py-3.5 px-4 font-semibold">Recorded By</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">
                    {p.paymentReference}
                    {p.transactionReference && (
                      <div className="text-[10px] text-[#82786E] truncate max-w-[120px]">
                        Ref: {p.transactionReference}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#28231F]">
                    <Link href={`/admin/patients/${p.patient.id}`} className="hover:text-[#86A58C] hover:underline">
                      {p.patient.fullName}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#82786E]">
                    {p.invoice.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {new Date(p.paymentDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#28231F]">{p.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 text-sm">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {p.recordedBy.fullName}
                  </td>
                  <td className="py-3.5 px-4">
                    {p.isReversed ? (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">
                        Reversed / Refunded
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        Settled
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {!p.isReversed && (
                      <button
                        onClick={() => setIsReverseOpen(p)}
                        className="px-2 py-1 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded text-[11px] font-medium"
                      >
                        Reverse
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RECORD PAYMENT MODAL */}
      {isRecordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Record Received Payment</h3>
                <p className="text-[#82786E] text-[11px]">Directly reduces outstanding invoice balance</p>
              </div>
              <button onClick={() => setIsRecordOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-5 space-y-3">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{actionError}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold uppercase mb-1">Target Invoice *</label>
                <select
                  required
                  value={formData.invoiceId}
                  onChange={(e) => {
                    const inv = invoices.find((i) => i.id === e.target.value);
                    setFormData({
                      ...formData,
                      invoiceId: e.target.value,
                      amount: inv ? String(inv.balanceDue) : formData.amount,
                    });
                  }}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                >
                  <option value="">Choose an open invoice...</option>
                  {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoiceNumber} — {inv.patient.fullName} (Bal: ₹{inv.balanceDue?.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Payment Method *</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  >
                    <option value="Card">Credit / Debit Card (POS)</option>
                    <option value="UPI">UPI Dynamic QR</option>
                    <option value="Cash">Cash at Desk</option>
                    <option value="Bank Transfer">NEFT / RTGS Wire</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Amount Paid (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">POS / UPI Transaction Reference</label>
                <input
                  type="text"
                  placeholder="e.g. HDFC-POS-9912 or UPI-488219"
                  value={formData.transactionReference}
                  onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Reception Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Stage 01 advance deposit"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsRecordOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Record Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVERSE PAYMENT MODAL */}
      {isReverseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-rose-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-rose-800">Reverse Financial Transaction</h3>
                <p className="text-[11px] text-rose-600">{isReverseOpen.paymentReference} (₹{isReverseOpen.amount})</p>
              </div>
              <button onClick={() => setIsReverseOpen(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>
            <form onSubmit={handleReversePayment} className="p-5 space-y-3">
              <p className="text-[#82786E]">
                Reversing this transaction will restore the unpaid balance of ₹{isReverseOpen.amount} to Invoice {isReverseOpen.invoice.invoiceNumber} and record a permanent audit trail entry.
              </p>
              <div>
                <label className="block font-semibold uppercase mb-1">Reversal Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Card chargeback, duplicate entry, patient refund"
                  value={reverseReason}
                  onChange={(e) => setReverseReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsReverseOpen(null)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg">
                  Confirm Reversal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
