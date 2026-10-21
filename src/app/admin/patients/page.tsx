"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  AlertTriangle,
  ArrowRight,
  XCircle,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Receipt,
} from "lucide-react";

export default function AdminPatientsPage() {
  const searchParams = useSearchParams();
  const shouldOpenRegister = searchParams.get("register") === "true";

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  // Modal
  const [isRegisterOpen, setIsRegisterOpen] = useState(shouldOpenRegister);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "Female",
    bloodGroup: "O+",
    address: "",
    city: "Pune",
    medicalAlerts: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    notes: "",
  });

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      params.append("page", String(page));
      params.append("limit", "15");

      const res = await fetch(`/api/admin/patients?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPatients(data.patients || []);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search, statusFilter, page]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to register patient");
        return;
      }
      setActionSuccess(`Patient ${data.patient.referenceId} — ${data.patient.fullName} registered successfully!`);
      setIsRegisterOpen(false);
      fetchPatients();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Network error during registration.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Patient Directory
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Centralized health records, medical alerts, visit history, and contact coordinates
          </p>
        </div>

        <button
          onClick={() => {
            setIsRegisterOpen(true);
            setActionError(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus size={15} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Notifications */}
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
            placeholder="Search by name, phone or Ref ID (e.g. AUR-P-1001)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="Active">Active Records</option>
            <option value="Archived">Archived</option>
            <option value="ALL">All Records</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading patient records...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <Users size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Patient Records Found</h3>
          <p className="text-xs text-[#82786E] max-w-sm mx-auto">
            Try adjusting your search query or register a new patient using the button above.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Ref ID</th>
                  <th className="py-3.5 px-4 font-semibold">Patient Name</th>
                  <th className="py-3.5 px-4 font-semibold">Contact</th>
                  <th className="py-3.5 px-4 font-semibold">Medical Alerts</th>
                  <th className="py-3.5 px-4 font-semibold">Last Visit</th>
                  <th className="py-3.5 px-4 font-semibold">Next Appt</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E2D7]/60">
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">
                      {p.referenceId}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/patients/${p.id}`}
                        className="font-semibold text-[#28231F] hover:text-[#86A58C] hover:underline"
                      >
                        {p.fullName}
                      </Link>
                      <div className="text-[10px] text-[#82786E]">
                        {p.gender || "Patient"} · {p.bloodGroup ? `${p.bloodGroup} Blood` : "Blood N/A"}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-[#28231F] font-medium">{p.phone}</div>
                      {p.email && <div className="text-[10px] text-[#82786E]">{p.email}</div>}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      {p.medicalAlerts ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-medium">
                          <AlertTriangle size={11} className="shrink-0" />
                          <span className="truncate">{p.medicalAlerts}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#82786E]">None noted</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#82786E]">
                      {p.lastVisit
                        ? new Date(p.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-[#28231F]">
                      {p.nextAppointment ? (
                        <span className="font-medium text-[#86A58C]">
                          {new Date(p.nextAppointment).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      ) : (
                        <span className="text-[#82786E]">None scheduled</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/patients/${p.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F5F0] hover:bg-[#86A58C] hover:text-white rounded-lg text-xs font-medium text-[#28231F] transition-colors"
                      >
                        <span>Open Chart</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="p-3 border-t border-[#E9E2D7] bg-[#F7F5F0]/40 flex items-center justify-between text-xs text-[#82786E]">
              <span>
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} patients)
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-2 py-1 bg-white border border-[#E9E2D7] rounded disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-2 py-1 bg-white border border-[#E9E2D7] rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* REGISTER PATIENT MODAL */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-[#E9E2D7] flex items-center justify-between bg-[#F7F5F0]/40">
              <div>
                <h3 className="text-base font-semibold text-[#28231F]">Register New Patient Record</h3>
                <p className="text-xs text-[#82786E]">Auto-generates sequential identifier (AUR-P-XXXX)</p>
              </div>
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 text-xs">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Singhania"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98220 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  >
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-rose-700 mb-1">
                  Medical Alerts & Allergies (Penicillin, Latex, Hypertension etc.)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Allergic to Penicillin; Mild dental anxiety"
                  value={formData.medicalAlerts}
                  onChange={(e) => setFormData({ ...formData, medicalAlerts: e.target.value })}
                  className="w-full px-3 py-2 bg-rose-50/40 border border-rose-200 rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  placeholder="Bungalow / Apartment, Street, Koregaon Park"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-4 border-t border-[#E9E2D7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-4 py-2 border border-[#E9E2D7] rounded-lg text-[#82786E] hover:text-[#28231F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white font-semibold rounded-lg shadow-sm"
                >
                  Create Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
