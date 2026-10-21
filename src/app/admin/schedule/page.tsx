"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, CheckCircle2, AlertCircle, Plus, User, ShieldCheck } from "lucide-react";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminSchedulePage() {
  const [dentists, setDentists] = useState<any[]>([]);
  const [selectedDentistId, setSelectedDentistId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Leave modal
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    reason: "Clinical conference / Academic symposium",
  });

  const fetchDentists = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/schedule");
      if (res.ok) {
        const d = await res.json();
        setDentists(d.dentists || []);
        if (d.dentists?.length > 0 && !selectedDentistId) {
          setSelectedDentistId(d.dentists[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDentists();
  }, []);

  const activeDentist = dentists.find((d) => d.id === selectedDentistId) || dentists[0];

  // Local schedule state for editing
  const [editableSchedule, setEditableSchedule] = useState<any[]>([]);

  useEffect(() => {
    if (activeDentist?.dentistSchedules) {
      // Map 0..6
      const scheduleMap: any[] = [];
      for (let day = 0; day <= 6; day++) {
        const found = activeDentist.dentistSchedules.find((s: any) => s.dayOfWeek === day);
        scheduleMap.push(
          found || {
            dayOfWeek: day,
            startTime: "09:30",
            endTime: "19:30",
            breakStart: "13:30",
            breakEnd: "14:30",
            isWorkingDay: day !== 0,
          }
        );
      }
      setEditableSchedule(scheduleMap);
    }
  }, [activeDentist]);

  const handleDayChange = (dayIndex: number, field: string, value: any) => {
    setEditableSchedule((prev) => {
      const next = [...prev];
      next[dayIndex] = { ...next[dayIndex], [field]: value };
      return next;
    });
  };

  const handleSaveSchedule = async () => {
    try {
      setSaving(true);
      setActionError(null);
      const res = await fetch("/api/admin/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dentistId: activeDentist.id,
          schedules: editableSchedule,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to update schedule");
        return;
      }
      setActionSuccess(`Weekly roster updated for ${activeDentist.fullName}`);
      fetchDentists();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving schedule");
    } finally {
      setSaving(false);
    }
  };

  const handleRecordLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dentistId: activeDentist.id,
          ...leaveForm,
        }),
      });
      if (res.ok) {
        setActionSuccess(`Leave scheduled for ${activeDentist.fullName}`);
        setIsLeaveOpen(false);
        fetchDentists();
        setTimeout(() => setActionSuccess(null), 3500);
      }
    } catch {
      setActionError("Failed to record leave");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Clinician Availability & Operating Hours
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Configure weekly operatory shifts, midday lunch intervals, and sanctioned leave dates
          </p>
        </div>

        <button
          onClick={() => setIsLeaveOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9E2D7] hover:border-[#86A58C] text-[#28231F] text-xs font-semibold rounded-lg shadow-sm"
        >
          <Calendar size={14} className="text-[#86A58C]" />
          <span>Record Clinician Leave</span>
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

      {/* Clinician Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {dentists.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDentistId(d.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeDentist?.id === d.id
                ? "bg-[#86A58C] text-white border-[#86A58C] shadow-sm"
                : "bg-white text-[#28231F] border-[#E9E2D7] hover:bg-[#F7F5F0]"
            }`}
          >
            <User size={14} />
            <span>{d.fullName}</span>
            <span className="text-[10px] opacity-75">({d.specialization || "Doctor"})</span>
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
        <div className="p-5 border-b border-[#E9E2D7] flex items-center justify-between bg-[#F7F5F0]/30">
          <div>
            <h3 className="font-semibold text-sm text-[#28231F]">
              Weekly Working Roster — {activeDentist?.fullName}
            </h3>
            <p className="text-[11px] text-[#82786E]">
              Appointments cannot be booked outside these hours or during break periods.
            </p>
          </div>
          <button
            onClick={handleSaveSchedule}
            disabled={saving}
            className="px-4 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white font-semibold rounded-lg shadow-sm transition-colors"
          >
            {saving ? "Saving Shifts..." : "Save Working Hours"}
          </button>
        </div>

        <div className="divide-y divide-[#E9E2D7]/60">
          {editableSchedule.map((s, idx) => (
            <div
              key={s.dayOfWeek}
              className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                s.isWorkingDay ? "hover:bg-[#F7F5F0]/30" : "bg-stone-50/70 opacity-60"
              }`}
            >
              {/* Day & Working Toggle */}
              <div className="flex items-center gap-4 min-w-[160px]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.isWorkingDay}
                    onChange={(e) => handleDayChange(idx, "isWorkingDay", e.target.checked)}
                    className="rounded text-[#86A58C] focus:ring-0 w-4 h-4"
                  />
                  <span className="font-semibold text-xs text-[#28231F]">
                    {DAYS_OF_WEEK[s.dayOfWeek]}
                  </span>
                </label>
              </div>

              {/* Working Hours */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#82786E] text-[11px]">Shift:</span>
                  <input
                    type="time"
                    disabled={!s.isWorkingDay}
                    value={s.startTime}
                    onChange={(e) => handleDayChange(idx, "startTime", e.target.value)}
                    className="px-2 py-1 bg-[#F7F5F0] border border-[#E9E2D7] rounded text-xs focus:outline-none focus:border-[#86A58C]"
                  />
                  <span className="text-[#82786E]">to</span>
                  <input
                    type="time"
                    disabled={!s.isWorkingDay}
                    value={s.endTime}
                    onChange={(e) => handleDayChange(idx, "endTime", e.target.value)}
                    className="px-2 py-1 bg-[#F7F5F0] border border-[#E9E2D7] rounded text-xs focus:outline-none focus:border-[#86A58C]"
                  />
                </div>

                {/* Lunch / Break */}
                <div className="flex items-center gap-2 pl-4 border-l border-[#E9E2D7]">
                  <span className="text-[#82786E] text-[11px]">Break Interval:</span>
                  <input
                    type="time"
                    disabled={!s.isWorkingDay}
                    value={s.breakStart || ""}
                    onChange={(e) => handleDayChange(idx, "breakStart", e.target.value)}
                    className="px-2 py-1 bg-[#F7F5F0] border border-[#E9E2D7] rounded text-xs focus:outline-none focus:border-[#86A58C]"
                  />
                  <span className="text-[#82786E]">to</span>
                  <input
                    type="time"
                    disabled={!s.isWorkingDay}
                    value={s.breakEnd || ""}
                    onChange={(e) => handleDayChange(idx, "breakEnd", e.target.value)}
                    className="px-2 py-1 bg-[#F7F5F0] border border-[#E9E2D7] rounded text-xs focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Leave Records */}
      <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm text-xs space-y-3">
        <h3 className="font-semibold text-sm text-[#28231F]">Scheduled Clinician Leave</h3>
        {(!activeDentist?.dentistLeaves || activeDentist.dentistLeaves.length === 0) ? (
          <p className="text-[#82786E]">No active leave periods booked for this doctor.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeDentist.dentistLeaves.map((l: any) => (
              <div key={l.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-[#28231F]">{l.reason}</div>
                  <div className="text-[11px] text-[#82786E] mt-0.5">
                    {new Date(l.startDate).toLocaleDateString("en-IN")} — {new Date(l.endDate).toLocaleDateString("en-IN")}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold uppercase">
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LEAVE MODAL */}
      {isLeaveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in text-xs">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Record Clinician Leave</h3>
                <p className="text-[#82786E] text-[11px]">{activeDentist?.fullName}</p>
              </div>
              <button onClick={() => setIsLeaveOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>
            <form onSubmit={handleRecordLeave} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E9E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E9E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Reason / Purpose</label>
                <input
                  type="text"
                  required
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#E9E2D7] rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button type="button" onClick={() => setIsLeaveOpen(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg">
                  Confirm Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
