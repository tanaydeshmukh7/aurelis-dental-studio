"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: "",
    quote: "",
    treatmentName: "Smile Design",
    rating: 5,
    visitYear: "2026",
    isFeatured: true,
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const d = await res.json();
        setReviews(d.reviews || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleTogglePublished = async (review: any) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: review.id, isPublished: !review.isPublished }),
      });
      if (res.ok) {
        setActionSuccess(`Visibility toggled for review by ${review.patientName}`);
        fetchReviews();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionError("Failed to update review visibility");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this patient testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setActionSuccess("Review removed.");
        fetchReviews();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionError("Failed to delete review");
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to add review");
        return;
      }

      setActionSuccess(`Review by ${formData.patientName} added!`);
      setIsAddOpen(false);
      setFormData({
        patientName: "",
        quote: "",
        treatmentName: "Smile Design",
        rating: 5,
        visitYear: "2026",
        isFeatured: true,
      });
      fetchReviews();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while adding testimonial");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Patient Stories & Testimonials CMS
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage verified clinical reviews, star ratings, and treatment badges on `/reviews` and homepage
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
          <span>Add Approved Testimonial</span>
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
          <p className="text-xs text-[#82786E] mt-3">Loading patient stories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: r.rating || 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {r.isPublished ? "Public" : "Hidden"}
                  </span>
                </div>

                <p className="text-xs text-[#28231F] italic leading-relaxed">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="pt-2 border-t border-[#E9E2D7]/60">
                  <div className="font-semibold text-sm text-[#28231F]">{r.patientName}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#86A58C] font-medium">
                    <span>{r.treatmentName}</span>
                    <span>·</span>
                    <span className="text-[#82786E]">Visit {r.visitYear}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex items-center justify-between text-[11px]">
                {r.isFeatured && (
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[9px] uppercase">
                    Featured on Home
                  </span>
                )}
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={() => handleTogglePublished(r)}
                    className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-[#F7F5F0]"
                    title="Toggle Visibility"
                  >
                    {r.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    title="Delete Review"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD REVIEW MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Add Approved Testimonial</h3>
                <p className="text-[#82786E] text-[11px]">Requires verified patient consent before publishing</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddReview} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Patient Attribution *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika K. or Anonymous"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Treatment Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smile Design & Veneers"
                    value={formData.treatmentName}
                    onChange={(e) => setFormData({ ...formData, treatmentName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Rating (1–5 Stars)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Visit Year</label>
                  <input
                    type="text"
                    value={formData.visitYear}
                    onChange={(e) => setFormData({ ...formData, visitYear: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Patient's genuine reflection on the unhurried consultation and outcome..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#86A58C] focus:ring-0"
                  />
                  <span className="font-semibold text-[#28231F]">Feature in Homepage Carousel</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
