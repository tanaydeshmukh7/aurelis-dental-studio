"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Edit,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Save,
  FileText,
} from "lucide-react";

const SYSTEM_PAGES = [
  { slug: "home", title: "Homepage", route: "/", desc: "Main hero, studio philosophy, signature treatments, and booking section" },
  { slug: "about", title: "About the Studio", route: "/about", desc: "Biophilic architectural sanctuary, acoustics, and clinical vision" },
  { slug: "patient-guide", title: "Patient Guide", route: "/patient-guide", desc: "Consultation roadmap, amenities, and anxiety-free dentistry" },
  { slug: "contact", title: "Studio Concierge & Contact", route: "/contact", desc: "Studio hours, Koregaon Park location, valet parking, and directions" },
  { slug: "privacy", title: "Privacy Policy", route: "/privacy", desc: "Patient medical data confidentiality and encryption protocols" },
  { slug: "terms", title: "Terms of Care", route: "/terms", desc: "Informed consent standards, cancellation policies, and clinical terms" },
];

export default function AdminPagesCMSPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string>("home");
  const [pageForm, setPageForm] = useState({
    title: "",
    headline: "",
    subheadline: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const d = await res.json();
        setPages(d.pages || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    const existing = pages.find((p) => p.slug === selectedSlug);
    const system = SYSTEM_PAGES.find((p) => p.slug === selectedSlug);

    if (existing) {
      setPageForm({
        title: existing.title,
        headline: existing.headline || "",
        subheadline: existing.subheadline || "",
        metaTitle: existing.metaTitle || "",
        metaDescription: existing.metaDescription || "",
        isPublished: existing.isPublished ?? true,
      });
    } else {
      setPageForm({
        title: system?.title || "Page Title",
        headline: "Confidence Looks Good on You.",
        subheadline: "Thoughtful dental care, modern techniques, and a more personal approach to your smile.",
        metaTitle: `${system?.title} | AURELIS Dental Studio`,
        metaDescription: "Bespoke dental care in Koregaon Park, Pune.",
        isPublished: true,
      });
    }
  }, [selectedSlug, pages]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setActionError(null);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedSlug,
          ...pageForm,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setActionError(err.error || "Failed to save page");
        return;
      }

      setActionSuccess(`Content updated for ${selectedSlug.toUpperCase()} page.`);
      fetchPages();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving page content");
    } finally {
      setSaving(false);
    }
  };

  const activeSystem = SYSTEM_PAGES.find((p) => p.slug === selectedSlug);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Website Pages & SEO Management
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage live headlines, subheadings, and OpenGraph search meta tags without editing code
          </p>
        </div>

        {activeSystem && (
          <Link
            href={activeSystem.route}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9E2D7] text-[#28231F] text-xs font-semibold rounded-lg hover:border-[#86A58C] shadow-sm transition-colors"
          >
            <span>Preview Live Route ({activeSystem.route})</span>
            <ExternalLink size={13} />
          </Link>
        )}
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Main Grid: Page Selector on Left, Editor on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Page List */}
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm p-4 space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#82786E] px-2 pb-2 border-b border-[#E9E2D7]">
            Select Page to Configure
          </div>
          {SYSTEM_PAGES.map((p) => {
            const isSelected = p.slug === selectedSlug;
            return (
              <button
                key={p.slug}
                onClick={() => setSelectedSlug(p.slug)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-[#86A58C] text-white shadow-sm"
                    : "hover:bg-[#F7F5F0] text-[#28231F]"
                }`}
              >
                <div className="font-semibold text-xs flex items-center justify-between">
                  <span>{p.title}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-white/80" : "text-[#82786E]"}`}>
                    {p.route}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? "text-white/90" : "text-[#82786E]"}`}>
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Editor Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#E9E2D7] shadow-sm p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="border-b border-[#E9E2D7] pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Editing: {activeSystem?.title}</h3>
                <p className="text-[11px] text-[#82786E]">Route: {activeSystem?.route}</p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white font-semibold rounded-lg shadow-sm"
              >
                <Save size={14} />
                <span>{saving ? "Publishing..." : "Save Page Content"}</span>
              </button>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Page Title *</label>
              <input
                type="text"
                required
                value={pageForm.title}
                onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Primary Hero Headline</label>
              <input
                type="text"
                value={pageForm.headline}
                onChange={(e) => setPageForm({ ...pageForm, headline: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">Supporting Subheading / Philosophy</label>
              <textarea
                rows={3}
                value={pageForm.subheadline}
                onChange={(e) => setPageForm({ ...pageForm, subheadline: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
              />
            </div>

            {/* SEO Metadata Box */}
            <div className="p-4 rounded-xl border border-[#E9E2D7] bg-[#F7F5F0]/40 space-y-3">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[#82786E] block">
                Search Engine Optimization (SEO & Social Sharing)
              </span>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[11px]">Meta Title</label>
                <input
                  type="text"
                  value={pageForm.metaTitle}
                  onChange={(e) => setPageForm({ ...pageForm, metaTitle: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E9E2D7] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[11px]">Meta Description</label>
                <textarea
                  rows={2}
                  value={pageForm.metaDescription}
                  onChange={(e) => setPageForm({ ...pageForm, metaDescription: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#E9E2D7] rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pageForm.isPublished}
                  onChange={(e) => setPageForm({ ...pageForm, isPublished: e.target.checked })}
                  className="rounded text-[#86A58C] focus:ring-0"
                />
                <span className="font-semibold text-[#28231F]">Page Route Active & Published</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
