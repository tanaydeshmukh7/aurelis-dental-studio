"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  IndianRupee,
  Shield,
  Building,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Form dictionary
  const [formMap, setFormMap] = useState<Record<string, string>>({});

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const d = await res.json();
        setSettings(d.settings || []);
        const map: Record<string, string> = {};
        d.settings?.forEach((s: any) => {
          map[s.key] = s.value;
        });
        setFormMap(map);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, val: string) => {
    setFormMap((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setActionError(null);
    try {
      const payload = Object.entries(formMap).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload }),
      });

      if (!res.ok) {
        const err = await res.json();
        setActionError(err.error || "Failed to save settings");
        return;
      }

      setActionSuccess("Clinic operational settings saved successfully!");
      fetchSettings();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Studio Global Configuration & Policy Rules
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Manage clinic identity, Indian GST tax schedules, timezone localization, and appointment rules
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm"
        >
          <Save size={14} />
          <span>{saving ? "Updating..." : "Save All Settings"}</span>
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

      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading studio configuration...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* General & Contact Section */}
          <div className="bg-white p-6 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2 flex items-center gap-2">
              <Building size={16} className="text-[#86A58C]" />
              <span>Studio Identity & Public Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={formMap["clinic_name"] || ""}
                  onChange={(e) => handleChange("clinic_name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={formMap["tagline"] || ""}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Physical Address</label>
                <input
                  type="text"
                  value={formMap["address"] || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={formMap["hours"] || ""}
                  onChange={(e) => handleChange("hours", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Reception Telephone</label>
                <input
                  type="text"
                  value={formMap["phone"] || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">WhatsApp Concierge</label>
                <input
                  type="text"
                  value={formMap["whatsapp"] || ""}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Public Concierge Email</label>
                <input
                  type="email"
                  value={formMap["email"] || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Localization & Taxation */}
          <div className="bg-white p-6 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2 flex items-center gap-2">
              <IndianRupee size={16} className="text-[#86A58C]" />
              <span>Localization, Currency & Taxation Schedules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold uppercase mb-1">Base Currency</label>
                <input
                  type="text"
                  value={formMap["currency"] || "INR"}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Clinic Timezone</label>
                <input
                  type="text"
                  value={formMap["timezone"] || "Asia/Kolkata"}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Default GST Tax Rate (%)</label>
                <input
                  type="number"
                  value={formMap["tax_rate"] || "18"}
                  onChange={(e) => handleChange("tax_rate", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          {/* Scheduling Rules */}
          <div className="bg-white p-6 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2 flex items-center gap-2">
              <Clock size={16} className="text-[#86A58C]" />
              <span>Clinical Scheduling & Cancellation Rules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase mb-1">Default Slot Length (Minutes)</label>
                <input
                  type="number"
                  step={15}
                  value={formMap["default_appointment_duration"] || "60"}
                  onChange={(e) => handleChange("default_appointment_duration", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Cancellation Notice Required (Hours)</label>
                <input
                  type="number"
                  value={formMap["cancellation_notice_hours"] || "24"}
                  onChange={(e) => handleChange("cancellation_notice_hours", e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#86A58C] hover:bg-[#75957b] text-white font-semibold rounded-lg shadow-sm"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
