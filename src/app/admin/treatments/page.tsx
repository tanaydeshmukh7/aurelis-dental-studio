"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/treatments");
      if (res.ok) {
        const d = await res.json();
        setTreatments(d.treatments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleToggleVisibility = async (treatment: any) => {
    try {
      const res = await fetch(`/api/admin/treatments/${treatment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingVisibility: !treatment.bookingVisibility }),
      });
      if (res.ok) {
        setActionSuccess(`Booking visibility updated for ${treatment.title}`);
        fetchTreatments();
        setTimeout(() => setActionSuccess(null), 3500);
      }
    } catch {
      setActionError("Failed to update visibility");
    }
  };

  const handleSaveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const isNew = !editingItem.id;
      const url = isNew ? "/api/admin/treatments" : `/api/admin/treatments/${editingItem.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to save treatment service");
        return;
      }

      setActionSuccess(`Service ${editingItem.title} saved successfully.`);
      setIsEditOpen(false);
      setEditingItem(null);
      fetchTreatments();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while updating treatment service");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Treatments & Services Catalogue
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage public website descriptions, pricing tiers, durations, and clinical protocols
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              title: "",
              slug: "",
              number: "06",
              tagline: "",
              shortDesc: "",
              fullDesc: "",
              durationMinutes: 60,
              price: 25000,
              deposit: 5000,
              timeline: "1 to 2 consultations",
              idealFor: "Patients seeking refined dental aesthetics",
              image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
              bookingVisibility: true,
              isActive: true,
            });
            setIsEditOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Add New Service</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Grid of Treatment Cards */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading clinical services...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Header with Number Badge */}
                <div className="relative h-44 w-full bg-[#E9E2D7]">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] tracking-wider">
                    #{t.number}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.bookingVisibility
                          ? "bg-emerald-500 text-white"
                          : "bg-stone-500 text-white"
                      }`}
                    >
                      {t.bookingVisibility ? "Visible on Web" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#28231F] leading-tight">
                      {t.title}
                    </h3>
                    <p className="text-[11px] text-[#86A58C] font-medium mt-0.5">{t.tagline}</p>
                  </div>

                  <p className="text-xs text-[#82786E] line-clamp-3 leading-relaxed">
                    {t.shortDesc}
                  </p>

                  <div className="pt-3 border-t border-[#E9E2D7]/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#82786E] uppercase font-semibold">Configured Fee</span>
                      <div className="font-semibold text-sm text-[#28231F]">
                        ₹{t.price?.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#82786E] uppercase font-semibold">Duration</span>
                      <div className="font-medium text-[#28231F] flex items-center justify-end gap-1">
                        <Clock size={11} className="text-[#86A58C]" />
                        <span>{t.durationMinutes} mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-[#F7F5F0]/60 border-t border-[#E9E2D7] flex items-center justify-between text-xs">
                <Link
                  href={`/treatments/${t.slug}`}
                  target="_blank"
                  className="text-[11px] text-[#82786E] hover:text-[#28231F] flex items-center gap-1"
                >
                  <span>Public Page</span>
                  <ExternalLink size={11} />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVisibility(t)}
                    className="p-1.5 rounded text-stone-500 hover:text-stone-800 hover:bg-white transition-colors"
                    title={t.bookingVisibility ? "Hide from public website" : "Show on public website"}
                  >
                    {t.bookingVisibility ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>

                  <button
                    onClick={() => {
                      setEditingItem({ ...t });
                      setIsEditOpen(true);
                      setActionError(null);
                    }}
                    className="px-3 py-1 bg-white border border-[#E9E2D7] hover:border-[#86A58C] rounded text-xs font-medium text-[#28231F] transition-colors flex items-center gap-1"
                  >
                    <Edit size={12} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT / CREATE MODAL */}
      {isEditOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-semibold text-base text-[#28231F]">
                  {editingItem.id ? `Edit Service: ${editingItem.title}` : "Create New Treatment"}
                </h3>
                <p className="text-xs text-[#82786E]">Updates immediately publish to public `/treatments/{editingItem.slug}`</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSaveTreatment} className="p-6 space-y-4 text-xs">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{actionError}</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold uppercase tracking-wider mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Number (e.g. 01)</label>
                  <input
                    type="text"
                    value={editingItem.number}
                    onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingItem.tagline || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Booking Deposit</label>
                  <input
                    type="number"
                    value={editingItem.deposit}
                    onChange={(e) => setEditingItem({ ...editingItem, deposit: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={editingItem.durationMinutes}
                    onChange={(e) => setEditingItem({ ...editingItem, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Short Description (Cards & Previews)</label>
                <textarea
                  rows={2}
                  value={editingItem.shortDesc || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Full Clinical Narrative (Treatment Page)</label>
                <textarea
                  rows={4}
                  value={editingItem.fullDesc || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Public Image URL</label>
                <input
                  type="url"
                  value={editingItem.image || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.bookingVisibility}
                    onChange={(e) => setEditingItem({ ...editingItem, bookingVisibility: e.target.checked })}
                    className="rounded text-[#86A58C] focus:ring-0"
                  />
                  <span className="font-medium text-[#28231F]">Visible in Public Booking Form & Menus</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-[#E9E2D7] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Service Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
