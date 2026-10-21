"use client";

import { useState, useEffect } from "react";
import {
  TrendingDown,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Truck,
  IndianRupee,
} from "lucide-react";

const EXPENSE_CATEGORIES = [
  "Clinical Supplies",
  "Lab Fees",
  "Utilities",
  "Salaries",
  "Rent",
  "Marketing",
  "Maintenance",
  "Other",
];

export default function AdminExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: "Clinical Supplies",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    supplierId: "",
    paymentStatus: "Paid",
    notes: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);

      const [expRes, supRes] = await Promise.all([
        fetch(`/api/admin/expenses?${params.toString()}`),
        fetch("/api/admin/suppliers"),
      ]);

      if (expRes.ok) {
        const d = await expRes.json();
        setExpenses(d.expenses || []);
      }
      if (supRes.ok) {
        const d = await supRes.json();
        setSuppliers(d.suppliers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to record expense");
        return;
      }

      setActionSuccess(`Expense ${data.expense.expenseNumber} of ₹${data.expense.amount} recorded!`);
      setIsAddOpen(false);
      setFormData({
        category: "Clinical Supplies",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        supplierId: "",
        paymentStatus: "Paid",
        notes: "",
      });
      fetchData();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Network error while recording expense");
    }
  };

  const filtered = expenses.filter((e) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      e.description.toLowerCase().includes(s) ||
      e.expenseNumber.toLowerCase().includes(s) ||
      e.supplier?.name?.toLowerCase().includes(s)
    );
  });

  const totalExpenseAmount = filtered.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Clinic Operational Expenses
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Track dental lab fees, sterilization supplies, practice rent, marketing, and utilities
          </p>
        </div>

        <button
          onClick={() => {
            setIsAddOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Record Expense</span>
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
            placeholder="Search description, number, supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Categories</option>
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="text-xs font-semibold text-[#28231F] bg-[#F7F5F0] px-3 py-2 rounded-lg border border-[#E9E2D7]">
            Total: ₹{totalExpenseAmount.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading operational expenses...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <TrendingDown size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Expenses Recorded</h3>
          <p className="text-xs text-[#82786E]">Add clinic disbursements using the button above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Expense #</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Description</th>
                <th className="py-3.5 px-4 font-semibold">Supplier / Vendor</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Amount (₹)</th>
                <th className="py-3.5 px-4 font-semibold">Recorded By</th>
                <th className="py-3.5 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">{e.expenseNumber}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-[#28231F] font-medium text-[10px]">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#28231F] max-w-sm">{e.description}</td>
                  <td className="py-3.5 px-4 text-[#82786E]">{e.supplier?.name || "—"}</td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#28231F]">
                    ₹{e.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">{e.createdBy.fullName}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      e.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {e.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Record Clinic Disbursement</h3>
                <p className="text-[#82786E] text-[11px]">Updates ledger reports and net income analytics</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddExpense} className="p-5 space-y-3">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{actionError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  >
                    {EXPENSE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    placeholder="e.g. 15000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurich Ceramic Lab Veneer Wax-up"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Supplier (Optional)</label>
                  <select
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  >
                    <option value="">None / Direct Vendor</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="Invoice / challan reference"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
