"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const GALLERY_CATEGORIES = [
  "All Spaces",
  "The Studio",
  "Consultation",
  "Operatories",
  "Technology",
  "Smiles",
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "The Studio",
    image: "",
    caption: "",
    altText: "",
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);

      const res = await fetch(`/api/admin/gallery?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setItems(d.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [categoryFilter]);

  const handleTogglePublished = async (item: any) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isPublished: !item.isPublished }),
      });
      if (res.ok) {
        setActionSuccess(`Visibility toggled for "${item.title}"`);
        fetchGallery();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionError("Failed to update visibility");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photograph from the studio gallery?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setActionSuccess("Image removed from gallery.");
        fetchGallery();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionError("Failed to delete image");
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to add image");
        return;
      }

      setActionSuccess(`Photograph "${formData.title}" added to gallery!`);
      setIsAddOpen(false);
      setFormData({
        title: "",
        category: "The Studio",
        image: "",
        caption: "",
        altText: "",
      });
      fetchGallery();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while adding image");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Studio & Atelier Gallery CMS
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Curate architectural sanctuary photography, operatory amenities, and smile previews on `/gallery`
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
          <span>Upload / Add Photograph</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2D7] shadow-sm flex items-center justify-between text-xs">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
        >
          <option value="ALL">All Gallery Categories</option>
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span className="text-[#82786E]">{items.length} Photographs in Portfolio</span>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading studio photography...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          {items.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-[#E9E2D7]">
                  <img
                    src={img.image}
                    alt={img.altText || img.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px]">
                    {img.category}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        img.isPublished ? "bg-emerald-500 text-white" : "bg-stone-500 text-white"
                      }`}
                    >
                      {img.isPublished ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="font-semibold text-xs text-[#28231F] truncate">{img.title}</h4>
                  <p className="text-[11px] text-[#82786E] line-clamp-2">{img.caption}</p>
                </div>
              </div>

              <div className="p-2.5 bg-[#F7F5F0]/60 border-t border-[#E9E2D7] flex items-center justify-between">
                <span className="text-[10px] text-[#82786E]">Order #{img.displayOrder}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublished(img)}
                    className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-white"
                    title="Toggle Visibility"
                  >
                    {img.isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-white"
                    title="Delete Image"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD IMAGE MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Add Studio Photograph</h3>
                <p className="text-[#82786E] text-[11px]">Published to the interactive lightbox on `/gallery`</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddImage} className="p-5 space-y-3">
              <div>
                <label className="block font-semibold uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Biophilic Operatory Suite"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  >
                    {GALLERY_CATEGORIES.filter((c) => c !== "All Spaces").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Accessibility Alt Text</label>
                  <input
                    type="text"
                    placeholder="Descriptive caption"
                    value={formData.altText}
                    onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">High-Resolution Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Editorial Caption</label>
                <textarea
                  rows={2}
                  placeholder="Acoustically damped consultation lounge designed for unhurried dialogue..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
