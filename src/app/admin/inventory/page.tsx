"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  AlertTriangle,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCw,
  History,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function AdminInventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  // Modals
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [adjustItem, setAdjustItem] = useState<any | null>(null);
  const [historyItem, setHistoryItem] = useState<any | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // New Item State
  const [newItemForm, setNewItemForm] = useState({
    sku: "",
    name: "",
    category: "Restorative",
    unit: "pack",
    quantityAvailable: 10,
    reorderThreshold: 5,
    supplierId: "",
    purchaseCost: 2000,
  });

  // Adjust Movement State
  const [adjustForm, setAdjustForm] = useState({
    movementType: "Usage", // "Purchase", "Usage", "Damaged", "Expired", "Adjustment"
    quantity: 1,
    reason: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);
      if (lowStockOnly) params.append("lowStock", "true");
      if (search) params.append("search", search);

      const [invRes, supRes] = await Promise.all([
        fetch(`/api/admin/inventory?${params.toString()}`),
        fetch("/api/admin/suppliers"),
      ]);

      if (invRes.ok) {
        const d = await invRes.json();
        setItems(d.items || []);
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
  }, [categoryFilter, lowStockOnly, search]);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to create item");
        return;
      }
      setActionSuccess(`Inventory SKU ${data.item.sku} added to studio supplies.`);
      setIsAddItemOpen(false);
      fetchData();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while creating item");
    }
  };

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustItem) return;
    setActionError(null);
    try {
      const res = await fetch("/api/admin/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inventoryItemId: adjustItem.id,
          ...adjustForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to adjust stock");
        return;
      }
      setActionSuccess(`Stock movement recorded for ${adjustItem.name}. New quantity: ${data.item.quantityAvailable}`);
      setAdjustItem(null);
      setAdjustForm({ movementType: "Usage", quantity: 1, reason: "" });
      fetchData();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while recording movement");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Clinical Supplies & Materials Inventory
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Audit-trailed stock ledger, batch tracking, threshold alerts, and consumption movements
          </p>
        </div>

        <button
          onClick={() => {
            setIsAddItemOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Add Clinical Item</span>
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
            placeholder="Search SKU or item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Categories</option>
            <option value="PPE">PPE & Protection</option>
            <option value="Biomaterials">Biomaterials & Ceramics</option>
            <option value="Restorative">Restorative Composites</option>
            <option value="Sterilisation">Sterilisation & Pouches</option>
            <option value="Instruments">Instruments</option>
            <option value="Consumables">General Consumables</option>
          </select>

          <label className="flex items-center gap-1.5 cursor-pointer bg-[#F7F5F0] px-3 py-2 rounded-lg border border-[#E9E2D7]">
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
              className="rounded text-[#86A58C] focus:ring-0"
            />
            <span className="font-semibold text-rose-700 flex items-center gap-1">
              <AlertTriangle size={13} />
              <span>Low Stock Alerts Only</span>
            </span>
          </label>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading clinical stock...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <Package size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Inventory Items Match</h3>
          <p className="text-xs text-[#82786E]">Add items or reset filter settings.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">SKU</th>
                <th className="py-3.5 px-4 font-semibold">Item & Category</th>
                <th className="py-3.5 px-4 font-semibold">Available Stock</th>
                <th className="py-3.5 px-4 font-semibold">Threshold</th>
                <th className="py-3.5 px-4 font-semibold">Supplier</th>
                <th className="py-3.5 px-4 font-semibold">Unit Cost (₹)</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Stock Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60">
              {items.map((i) => {
                const isLow = i.quantityAvailable <= i.reorderThreshold;
                return (
                  <tr key={i.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">{i.sku}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#28231F]">{i.name}</div>
                      <div className="text-[10px] text-[#82786E]">{i.category} · In {i.storageLocation || "Storage"}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-sm font-bold ${isLow ? "text-rose-700" : "text-[#28231F]"}`}>
                        {i.quantityAvailable} {i.unit}s
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#82786E]">
                      {i.reorderThreshold} {i.unit}s
                    </td>
                    <td className="py-3.5 px-4 text-[#82786E]">{i.supplier?.name || "Direct Procurement"}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#28231F]">
                      ₹{i.purchaseCost?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">
                          <AlertTriangle size={11} />
                          Reorder Required
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => {
                          setAdjustItem(i);
                          setAdjustForm({ movementType: "Usage", quantity: 1, reason: "Clinical operatory procedure" });
                        }}
                        className="px-2.5 py-1 bg-[#86A58C] hover:bg-[#75957b] text-white rounded text-[11px] font-semibold"
                      >
                        Adjust Stock
                      </button>
                      <button
                        onClick={() => setHistoryItem(i)}
                        className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-[#F7F5F0]"
                        title="View Movement Ledger"
                      >
                        <History size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ADJUST STOCK MODAL */}
      {adjustItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Record Stock Movement</h3>
                <p className="text-[#82786E] text-[11px]">{adjustItem.name} ({adjustItem.sku})</p>
              </div>
              <button onClick={() => setAdjustItem(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAdjustStock} className="p-5 space-y-3">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{actionError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Movement Type *</label>
                  <select
                    value={adjustForm.movementType}
                    onChange={(e) => setAdjustForm({ ...adjustForm, movementType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  >
                    <option value="Usage">Clinical Usage (Deduct)</option>
                    <option value="Purchase">Purchase Delivery (Add)</option>
                    <option value="Damaged">Damaged / Contaminated</option>
                    <option value="Expired">Expired Stock</option>
                    <option value="Adjustment">Audit Count Adjustment</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Quantity ({adjustItem.unit}s) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={adjustForm.quantity}
                    onChange={(e) => setAdjustForm({ ...adjustForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Clinical Reason / Purpose *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operatory 2 veneer preparation session"
                  value={adjustForm.reason}
                  onChange={(e) => setAdjustForm({ ...adjustForm, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setAdjustItem(null)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Commit Ledger Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STOCK MOVEMENT HISTORY MODAL */}
      {historyItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#E9E2D7] pb-3">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Stock Movement Ledger</h3>
                <p className="text-[#82786E] text-[11px]">{historyItem.name} ({historyItem.sku})</p>
              </div>
              <button onClick={() => setHistoryItem(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <div className="space-y-2">
              {historyItem.movements?.length === 0 ? (
                <p className="text-center text-[#82786E] py-4">No logged movements for this item.</p>
              ) : (
                historyItem.movements?.map((m: any) => (
                  <div key={m.id} className="p-3 rounded-xl border border-[#E9E2D7] bg-[#F7F5F0]/50 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-[#28231F] flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.movementType === "Purchase" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {m.movementType}
                        </span>
                        <span>{m.reason}</span>
                      </div>
                      <div className="text-[10px] text-[#82786E] mt-0.5">
                        By {m.recordedBy?.fullName || "Staff"} · {new Date(m.createdAt).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    <span className={`font-mono text-sm font-bold ${m.quantity > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                      {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL */}
      {isAddItemOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Catalogue New Clinical Item</h3>
                <p className="text-[#82786E] text-[11px]">Enters into stock tracking ledger automatically</p>
              </div>
              <button onClick={() => setIsAddItemOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleCreateItem} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">SKU Reference *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MED-BOND-01"
                    value={newItemForm.sku}
                    onChange={(e) => setNewItemForm({ ...newItemForm, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Category *</label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  >
                    <option value="Restorative">Restorative</option>
                    <option value="Biomaterials">Biomaterials</option>
                    <option value="PPE">PPE</option>
                    <option value="Sterilisation">Sterilisation</option>
                    <option value="Instruments">Instruments</option>
                    <option value="Consumables">Consumables</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3M Single Bond Universal Adhesive"
                  value={newItemForm.name}
                  onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Unit</label>
                  <input
                    type="text"
                    value={newItemForm.unit}
                    onChange={(e) => setNewItemForm({ ...newItemForm, unit: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Initial Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={newItemForm.quantityAvailable}
                    onChange={(e) => setNewItemForm({ ...newItemForm, quantityAvailable: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Threshold</label>
                  <input
                    type="number"
                    min={1}
                    value={newItemForm.reorderThreshold}
                    onChange={(e) => setNewItemForm({ ...newItemForm, reorderThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Purchase Cost (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newItemForm.purchaseCost}
                    onChange={(e) => setNewItemForm({ ...newItemForm, purchaseCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Supplier</label>
                  <select
                    value={newItemForm.supplierId}
                    onChange={(e) => setNewItemForm({ ...newItemForm, supplierId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  >
                    <option value="">Direct / None</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddItemOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Add Item to Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
