"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Calendar,
} from "lucide-react";

export default function AdminBlogPage() {
  const searchParams = useSearchParams();
  const shouldOpenNew = searchParams.get("new") === "true";

  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(shouldOpenNew);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);

      const res = await fetch(`/api/admin/blog?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setArticles(d.articles || []);
        setCategories(d.categories || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [statusFilter, categoryFilter]);

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const isNew = !editingArticle.id;
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${editingArticle.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to save article");
        return;
      }

      setActionSuccess(`Article "${editingArticle.title}" saved as ${editingArticle.status}!`);
      setIsEditorOpen(false);
      setEditingArticle(null);
      fetchArticles();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving article");
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setActionSuccess(`Article deleted.`);
        fetchArticles();
        setTimeout(() => setActionSuccess(null), 3500);
      }
    } catch {
      setActionError("Failed to delete article");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            The Aurelis Journal · Blog CMS
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Publish clinical insights, patient education guides, and editorial articles to `/blog`
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArticle({
              title: "",
              slug: "",
              excerpt: "",
              content: "### Introduction\n\nWrite thoughtful patient education advice here...",
              coverImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
              categorySlug: "oral-health",
              authorName: "Clinical Contributor",
              readTime: "5 min read",
              status: "Published",
            });
            setIsEditorOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Write New Article</span>
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
        >
          <option value="ALL">All Statuses</option>
          <option value="Published">Published (Public)</option>
          <option value="Draft">Drafts</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading journal articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full bg-[#E9E2D7]">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    {art.category?.name}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        art.status === "Published"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#28231F] leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#82786E] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                  <div className="text-[10px] text-[#82786E] pt-2 flex items-center justify-between">
                    <span>By {art.authorName}</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F7F5F0]/60 border-t border-[#E9E2D7] flex items-center justify-between">
                <Link
                  href={`/blog/${art.slug}`}
                  target="_blank"
                  className="text-[11px] text-[#82786E] hover:text-[#28231F] flex items-center gap-1"
                >
                  <span>Public Route</span>
                  <ExternalLink size={11} />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingArticle({ ...art });
                      setIsEditorOpen(true);
                    }}
                    className="p-1.5 rounded text-stone-600 hover:text-stone-900 hover:bg-white"
                    title="Edit article"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(art.id, art.title)}
                    className="p-1.5 rounded text-rose-500 hover:text-rose-700 hover:bg-white"
                    title="Delete article"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ARTICLE EDITOR MODAL */}
      {isEditorOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">
                  {editingArticle.id ? "Edit Journal Article" : "Write Journal Article"}
                </h3>
                <p className="text-[#82786E] text-[11px]">Updates immediately appear on `/blog` when status is Published</p>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-3">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{actionError}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold uppercase mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Category *</label>
                  <select
                    value={editingArticle.categorySlug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, categorySlug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Author Attribution</label>
                  <input
                    type="text"
                    value={editingArticle.authorName}
                    onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Publish Status *</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-semibold"
                  >
                    <option value="Published">Published (Public)</option>
                    <option value="Draft">Draft (Internal)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingArticle.coverImage}
                  onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Editorial Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Article Body Content *</label>
                <textarea
                  rows={8}
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditorOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Save & Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
