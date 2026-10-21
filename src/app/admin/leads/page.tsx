"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Sparkles,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [activeLead, setActiveLead] = useState<any | null>(null);
  const [notes, setNotes] = useState("");
  const [newStatus, setNewStatus] = useState("Contacted");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (typeFilter !== "ALL") params.append("type", typeFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setLeads(d.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, typeFilter]);

  const handleUpdateStatus = async (leadId: string, status: string, leadNotes?: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          status,
          notes: leadNotes !== undefined ? leadNotes : notes,
        }),
      });

      if (res.ok) {
        setActionSuccess(`Enquiry status updated to ${status}`);
        setActiveLead(null);
        fetchLeads();
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionError("Failed to update lead");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Central Leads & Public Enquiries
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Incoming consultations, booking requests, and concierge inquiries submitted through website forms
          </p>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Inquiry Channels</option>
            <option value="Booking Request">Online Booking Requests</option>
            <option value="Contact Form">Contact Page Inquiries</option>
            <option value="Concierge Inquiry">Concierge Requests</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Follow-up States</option>
            <option value="New">New (Uncontacted)</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up Required">Follow-up Required</option>
            <option value="Converted">Converted to Appointment</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <span className="text-[#82786E]">{leads.length} Enquiries Tracked</span>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading inquiries...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <Inbox size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Inquiries Found</h3>
          <p className="text-xs text-[#82786E]">Inquiries submitted from the public booking and contact forms appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Prospective Patient</th>
                <th className="py-3.5 px-4">Type / Source</th>
                <th className="py-3.5 px-4">Requested Service</th>
                <th className="py-3.5 px-4">Preferred Slot</th>
                <th className="py-3.5 px-4">Received At</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">{l.referenceId}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#28231F]">{l.name}</div>
                    <div className="text-[11px] text-[#82786E]">{l.phone}</div>
                    {l.email && <div className="text-[10px] text-[#82786E]">{l.email}</div>}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#28231F]">{l.type}</span>
                    <div className="text-[10px] text-[#82786E]">{l.sourcePage}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#28231F]">
                    {l.requestedTreatment || "General Enquiry"}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {l.preferredDate ? (
                      <div>
                        <div>{l.preferredDate}</div>
                        <div className="text-[10px] text-[#86A58C]">{l.preferredTime}</div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {new Date(l.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        l.status === "New"
                          ? "bg-purple-100 text-purple-900"
                          : l.status === "Contacted"
                          ? "bg-blue-100 text-blue-900"
                          : l.status === "Converted"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setActiveLead(l);
                        setNotes(l.notes || "");
                        setNewStatus(l.status);
                      }}
                      className="px-2.5 py-1 bg-white border border-[#E9E2D7] hover:border-[#86A58C] rounded text-[11px] font-medium text-[#28231F]"
                    >
                      Follow Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FOLLOW UP MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Lead Workflow & Follow-Up</h3>
                <p className="text-[#82786E] text-[11px]">{activeLead.name} ({activeLead.referenceId})</p>
              </div>
              <button onClick={() => setActiveLead(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <div className="p-5 space-y-3">
              <div className="p-3 bg-[#F7F5F0]/60 rounded-xl border border-[#E9E2D7] space-y-1.5">
                <div className="font-semibold text-[#28231F]">Message / Inquiry:</div>
                <p className="text-[#82786E] italic">&ldquo;{activeLead.message || "No additional text provided."}&rdquo;</p>
                <div className="pt-2 text-[11px] text-[#28231F] flex items-center gap-3">
                  <a href={`tel:${activeLead.phone}`} className="text-[#86A58C] underline font-medium">
                    Call {activeLead.phone}
                  </a>
                  {activeLead.email && (
                    <a href={`mailto:${activeLead.email}`} className="text-[#86A58C] underline font-medium">
                      Email
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Converted">Converted to Appointment</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Concierge Follow-Up Notes</label>
                <textarea
                  rows={3}
                  placeholder="Record callback date, discussion points, or proposed appointment date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setActiveLead(null)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(activeLead.id, newStatus, notes)}
                  className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Status Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
