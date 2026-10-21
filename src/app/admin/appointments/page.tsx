"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlayCircle,
  CalendarDays,
  List,
  User,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export default function AdminAppointmentsPage() {
  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  const [appointments, setAppointments] = useState<any[]>([]);
  const [dentists, setDentists] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [viewMode, setViewMode] = useState<"list" | "day" | "week">("list");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Modals & Action States
  const [isCreateOpen, setIsCreateOpen] = useState(shouldOpenCreate);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // New Appointment Form Data
  const [formData, setFormData] = useState({
    patientId: "",
    dentistId: "",
    treatmentId: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:30",
    durationMinutes: 60,
    notes: "",
    bookingSource: "Reception",
    status: "Confirmed",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedDentist !== "ALL") params.append("dentistId", selectedDentist);
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      if (selectedDate) params.append("date", selectedDate);

      const [apptRes, dentistRes, treatRes, patRes] = await Promise.all([
        fetch(`/api/admin/appointments?${params.toString()}`),
        fetch("/api/admin/schedule"),
        fetch("/api/admin/treatments"),
        fetch("/api/admin/patients?limit=50"),
      ]);

      if (apptRes.ok) {
        const d = await apptRes.json();
        setAppointments(d.appointments || []);
      }
      if (dentistRes.ok) {
        const d = await dentistRes.json();
        setDentists(d.dentists || []);
      }
      if (treatRes.ok) {
        const d = await treatRes.json();
        setTreatments(d.treatments || []);
      }
      if (patRes.ok) {
        const d = await patRes.json();
        setPatients(d.patients || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, selectedDentist, selectedStatus, selectedDate]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setActionError(null);
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to update appointment status");
        return;
      }
      setActionSuccess(`Appointment status changed to ${newStatus}`);
      fetchData();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while updating status");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Failed to create appointment");
        return;
      }
      setActionSuccess(`Appointment ${data.appointment.referenceId} scheduled successfully!`);
      setIsCreateOpen(false);
      fetchData();
      setTimeout(() => setActionSuccess(null), 4000);
    } catch {
      setActionError("Unexpected network failure during appointment booking.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Appointment Management
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Real-time operatory scheduling, patient check-ins, and conflict-protected bookings
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-[#E9E2D7] rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded flex items-center gap-1 ${
                viewMode === "list" ? "bg-[#86A58C] text-white" : "text-[#82786E]"
              }`}
              title="List View"
            >
              <List size={14} />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => {
                setViewMode("day");
                if (!selectedDate) setSelectedDate(new Date().toISOString().split("T")[0]);
              }}
              className={`p-1.5 rounded flex items-center gap-1 ${
                viewMode === "day" ? "bg-[#86A58C] text-white" : "text-[#82786E]"
              }`}
              title="Day Calendar"
            >
              <Calendar size={14} />
              <span className="hidden sm:inline">Day</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsCreateOpen(true);
              setActionError(null);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus size={15} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Notifications / Alerts */}
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

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82786E]" />
          <input
            type="text"
            placeholder="Search by Patient name, phone or Ref ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedDentist}
            onChange={(e) => setSelectedDentist(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Clinicians</option>
            {dentists.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Statuses</option>
            <option value="Requested">Requested (Pending)</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked In">Checked In</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          />

          {selectedDate && (
            <button
              onClick={() => setSelectedDate("")}
              className="px-2 py-1.5 text-stone-500 hover:text-stone-800 text-[11px]"
            >
              Clear Date
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Table or Day View */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading studio appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <Calendar size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Appointments Found</h3>
          <p className="text-xs text-[#82786E] max-w-sm mx-auto">
            No appointment records match the selected date and filter criteria. You can create a new booking above.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Ref ID</th>
                  <th className="py-3.5 px-4 font-semibold">Patient</th>
                  <th className="py-3.5 px-4 font-semibold">Clinician</th>
                  <th className="py-3.5 px-4 font-semibold">Treatment</th>
                  <th className="py-3.5 px-4 font-semibold">Scheduled Date & Time</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E2D7]/60">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#28231F]">
                      {a.referenceId}
                      <span className="block text-[10px] text-[#82786E] font-sans font-normal">
                        Via {a.bookingSource}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/patients/${a.patient.id}`}
                        className="font-semibold text-[#28231F] hover:text-[#86A58C] hover:underline"
                      >
                        {a.patient.fullName}
                      </Link>
                      <div className="text-[11px] text-[#82786E]">{a.patient.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#28231F]">
                      {a.dentist.fullName}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#28231F]">{a.treatment.title}</div>
                      <div className="text-[10px] text-[#82786E]">{a.durationMinutes} mins</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#28231F]">
                        {new Date(a.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                      <div className="text-[11px] text-[#82786E]">
                        {a.startTime} – {a.endTime}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          a.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : a.status === "In Progress"
                            ? "bg-amber-100 text-amber-800"
                            : a.status === "Checked In"
                            ? "bg-sky-100 text-sky-800"
                            : a.status === "Confirmed"
                            ? "bg-[#86A58C]/20 text-[#425d48]"
                            : a.status === "Requested"
                            ? "bg-purple-100 text-purple-800"
                            : a.status === "Cancelled"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {a.status === "Requested" && (
                        <button
                          onClick={() => handleStatusChange(a.id, "Confirmed")}
                          className="px-2 py-1 bg-[#86A58C] hover:bg-[#75957b] text-white rounded text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {a.status === "Confirmed" && (
                        <button
                          onClick={() => handleStatusChange(a.id, "Checked In")}
                          className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Check In
                        </button>
                      )}
                      {a.status === "Checked In" && (
                        <button
                          onClick={() => handleStatusChange(a.id, "In Progress")}
                          className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {a.status === "In Progress" && (
                        <button
                          onClick={() => handleStatusChange(a.id, "Completed")}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {["Requested", "Confirmed"].includes(a.status) && (
                        <button
                          onClick={() => handleStatusChange(a.id, "Cancelled")}
                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE APPOINTMENT MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-[#E9E2D7] flex items-center justify-between bg-[#F7F5F0]/40">
              <div>
                <h3 className="text-base font-semibold text-[#28231F]">Schedule New Appointment</h3>
                <p className="text-xs text-[#82786E]">Conflict checks and clinician availability applied automatically</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              {actionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              {/* Patient Selection */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                  Patient *
                </label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                >
                  <option value="">Select an enrolled patient...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.referenceId} — {p.fullName} ({p.phone})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#82786E] mt-1">
                  Need a new patient? Register them first under{" "}
                  <Link href="/admin/patients?register=true" className="text-[#86A58C] underline">
                    Patients Directory
                  </Link>.
                </p>
              </div>

              {/* Clinician Selection */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                  Treating Clinician *
                </label>
                <select
                  required
                  value={formData.dentistId}
                  onChange={(e) => setFormData({ ...formData, dentistId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                >
                  <option value="">Assign treating doctor...</option>
                  {dentists.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName} ({d.specialization || "Dentist"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Treatment Selection */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                  Treatment / Service *
                </label>
                <select
                  required
                  value={formData.treatmentId}
                  onChange={(e) => {
                    const sel = treatments.find((t) => t.id === e.target.value);
                    setFormData({
                      ...formData,
                      treatmentId: e.target.value,
                      durationMinutes: sel?.durationMinutes || 60,
                    });
                  }}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                >
                  <option value="">Choose clinical service...</option>
                  {treatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} (₹{t.price?.toLocaleString()} · {t.durationMinutes} mins)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date, Time, Duration */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-2 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-2 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    step={15}
                    min={15}
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full px-2 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#28231F] mb-1">
                  Clinical / Front-Desk Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Stage 02 trial mock-up review, requires operatory 1"
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-[#E9E2D7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-[#E9E2D7] rounded-lg text-[#82786E] hover:text-[#28231F] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Confirm & Lock Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
