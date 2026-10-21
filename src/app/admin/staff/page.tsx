"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  User,
  Power,
  Lock,
} from "lucide-react";

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "DENTIST",
    phone: "",
    specialization: "",
    licenseNumber: "",
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/staff");
      if (res.ok) {
        const d = await res.json();
        setStaff(d.staff || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleToggleStatus = async (user: any) => {
    try {
      setActionError(null);
      const res = await fetch("/api/admin/staff", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to update staff status");
        return;
      }
      setActionSuccess(`Account for ${user.fullName} ${!user.isActive ? "activated" : "deactivated"}.`);
      fetchStaff();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Failed to update account status");
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to provision staff account");
        return;
      }
      setActionSuccess(`Staff member ${data.staff.fullName} provisioned with role ${data.staff.role}!`);
      setIsAddOpen(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "DENTIST",
        phone: "",
        specialization: "",
        licenseNumber: "",
      });
      fetchStaff();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Network error while provisioning staff");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Staff Directory & Role-Based Access
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage authenticated clinical personnel, operational roles, and governance permissions
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
          <span>Provision Staff Member</span>
        </button>
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

      {/* Staff Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading studio staff directory...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Role & Privileges</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Credentials / Reg</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60">
              {staff.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#28231F]">{u.fullName}</div>
                    <div className="text-[10px] text-[#82786E]">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        u.role === "SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-900 border border-purple-200"
                          : u.role === "CLINIC_ADMIN"
                          ? "bg-blue-100 text-blue-900"
                          : u.role === "DENTIST"
                          ? "bg-[#86A58C]/20 text-[#3f5744]"
                          : u.role === "ACCOUNTANT"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      {u.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">{u.phone || "—"}</td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#28231F] font-medium">{u.specialization || "General Staff"}</div>
                    {u.licenseNumber && (
                      <div className="text-[10px] text-[#82786E] font-mono">{u.licenseNumber}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {u.lastLoginAt
                      ? new Date(u.lastLoginAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Never"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.role !== "SUPER_ADMIN" && (
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                          u.isActive
                            ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROVISION STAFF MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Provision Staff Account</h3>
                <p className="text-[#82786E] text-[11px]">Enforces password complexity & server-side RBAC boundaries</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddStaff} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rohan Saxena"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  >
                    <option value="DENTIST">Dentist (Doctor)</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="CLINIC_ADMIN">Clinic Admin / Manager</option>
                    <option value="ACCOUNTANT">Accountant</option>
                    <option value="CONTENT_EDITOR">Website Content Editor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@aurelisdental.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Initial Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98220 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">Clinical Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Endodontics, Oral Surgery"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Dental Council Reg. Number</label>
                <input
                  type="text"
                  placeholder="e.g. MSDC/DENT/2020/9981"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg shadow-sm"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
