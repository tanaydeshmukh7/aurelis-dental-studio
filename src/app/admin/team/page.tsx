"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCheck,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function AdminTeamCMSPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const d = await res.json();
        setTeam(d.team || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleTogglePublished = async (member: any) => {
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !member.isPublished }),
      });
      if (res.ok) {
        setActionSuccess(`Visibility updated for ${member.name}`);
        fetchTeam();
        setTimeout(() => setActionSuccess(null), 3500);
      }
    } catch {
      setActionError("Failed to update visibility");
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const isNew = !editingMember.id;
      const url = isNew ? "/api/admin/team" : `/api/admin/team/${editingMember.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });

      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to save profile");
        return;
      }

      setActionSuccess(`Team profile for ${editingMember.name} saved successfully.`);
      setIsEditOpen(false);
      fetchTeam();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving profile");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Public Team Profiles CMS
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage verified qualifications, roles, portraits, and biographies displayed on `/our-team`
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMember({
              name: "",
              slug: "",
              role: "Cosmetic Dentist",
              bio: "",
              qualifications: "BDS, MDS",
              image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85",
              isPublished: true,
            });
            setIsEditOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Plus size={15} />
          <span>Add Team Member</span>
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
          <p className="text-xs text-[#82786E] mt-3">Loading team profiles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {team.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-[#E9E2D7]">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        m.isPublished ? "bg-emerald-500 text-white" : "bg-stone-500 text-white"
                      }`}
                    >
                      {m.isPublished ? "Published" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif text-base font-semibold text-[#28231F] leading-tight">
                    {m.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#86A58C]">{m.role}</p>
                  <p className="text-[10px] text-[#82786E] font-mono line-clamp-1">{m.qualifications}</p>
                  <p className="text-xs text-[#82786E] line-clamp-2 pt-1">{m.bio}</p>
                </div>
              </div>

              <div className="p-3 bg-[#F7F5F0]/60 border-t border-[#E9E2D7] flex items-center justify-between">
                <Link
                  href={`/our-team/${m.slug}`}
                  target="_blank"
                  className="text-[11px] text-[#82786E] hover:text-[#28231F] flex items-center gap-1"
                >
                  <span>Profile Page</span>
                  <ExternalLink size={11} />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublished(m)}
                    className="p-1.5 rounded text-stone-500 hover:text-stone-800 hover:bg-white"
                    title={m.isPublished ? "Unpublish profile" : "Publish profile"}
                  >
                    {m.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingMember({ ...m });
                      setIsEditOpen(true);
                    }}
                    className="p-1.5 rounded text-stone-600 hover:text-stone-900 hover:bg-white"
                    title="Edit profile"
                  >
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">
                  {editingMember.id ? "Edit Team Profile" : "Add Public Team Member"}
                </h3>
                <p className="text-[#82786E] text-[11px]">Displays on `/our-team` and `/our-team/{editingMember.slug}`</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSaveMember} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Public Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.slug}
                    onChange={(e) => setEditingMember({ ...editingMember, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Public Professional Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Dentist & Clinical Director"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Verified Qualifications</label>
                <input
                  type="text"
                  placeholder="e.g. BDS, MDS (Prosthodontics)"
                  value={editingMember.qualifications || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, qualifications: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Portrait Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingMember.image}
                  onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Professional Biography</label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMember.isPublished}
                    onChange={(e) => setEditingMember({ ...editingMember, isPublished: e.target.checked })}
                    className="rounded text-[#86A58C] focus:ring-0"
                  />
                  <span className="font-semibold text-[#28231F]">Published & Visible on Website</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
