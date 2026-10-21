"use client";

import { useState, useEffect } from "react";
import {
  Truck,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Package,
} from "lucide-react";

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/suppliers");
      if (res.ok) {
        const d = await res.json();
        setSuppliers(d.suppliers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to create supplier");
        return;
      }

      setActionSuccess(`Supplier ${data.supplier.name} added to clinic vendor directory.`);
      setIsAddOpen(false);
      setFormData({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      });
      fetchSuppliers();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while adding supplier");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Dental Suppliers & Logistics Partners
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Verified vendor directory for implants, ceramics, autoclave pouches, and clinical consumables
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
          <span>Add New Supplier</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading supplier directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {suppliers.map((s) => (
            <div
              key={s.id}
              className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#28231F] leading-tight">
                      {s.name}
                    </h3>
                    <p className="text-[11px] text-[#86A58C] font-medium mt-0.5">
                      Rep: {s.contactPerson || "Clinical Sales Desk"}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#86A58C]/15 text-[#86A58C] flex items-center justify-center">
                    <Truck size={16} />
                  </div>
                </div>

                <div className="space-y-1.5 text-[#82786E]">
                  {s.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-[#86A58C]" />
                      <span>{s.phone}</span>
                    </div>
                  )}
                  {s.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-[#86A58C]" />
                      <span className="truncate">{s.email}</span>
                    </div>
                  )}
                  {s.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#86A58C] shrink-0" />
                      <span className="truncate">{s.address}</span>
                    </div>
                  )}
                </div>

                {s.notes && (
                  <p className="text-[11px] text-[#82786E] bg-[#F7F5F0]/60 p-2.5 rounded-lg border border-[#E9E2D7]">
                    {s.notes}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#E9E2D7]/60 flex items-center justify-between text-[11px] text-[#82786E]">
                <span>{s._count?.inventoryItems || 0} Catalogue Items</span>
                <span>{s._count?.expenses || 0} Disbursement Invoices</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD SUPPLIER MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Add Dental Supplier</h3>
                <p className="text-[#82786E] text-[11px]">Enables inventory linking and expense attribution</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddSupplier} className="p-5 space-y-3">
              <div>
                <label className="block font-semibold uppercase mb-1">Company / Vendor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Straumann India Dental Solutions"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 20 0000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Email</label>
                <input
                  type="email"
                  placeholder="orders@vendor.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Address / Branch</label>
                <input
                  type="text"
                  placeholder="Street / Industrial Area, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Notes / Supplied Lines</label>
                <input
                  type="text"
                  placeholder="e.g. Titanium fixtures, abutments, surgical kits"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
