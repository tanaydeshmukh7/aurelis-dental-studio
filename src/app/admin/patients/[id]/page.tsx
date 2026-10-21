"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Calendar,
  FileText,
  Receipt,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
  Plus,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
} from "lucide-react";

export default function AdminPatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "clinical" | "plans" | "billing">("overview");

  // Modals for adding clinical note & treatment plan
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Form states
  const [noteForm, setNoteForm] = useState({
    toothNumber: "",
    chiefComplaint: "",
    clinicalFindings: "",
    diagnosis: "",
    procedureConducted: "",
    materialsUsed: "",
    followUpDate: "",
  });

  const [planForm, setPlanForm] = useState({
    title: "",
    estimatedCost: "",
    stages: [{ stage: "1", title: "", cost: 0 }],
    notes: "",
  });

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/patients/${id}`);
      if (!res.ok) {
        if (res.status === 404) router.push("/admin/patients");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPatient();
  }, [id]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/patients/${id}/clinical-notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteForm),
      });
      const resData = await res.json();
      if (!res.ok) {
        setActionError(resData.error || "Failed to save note");
        return;
      }
      setActionSuccess("Clinical note recorded in medical chart");
      setIsAddNoteOpen(false);
      setNoteForm({
        toothNumber: "",
        chiefComplaint: "",
        clinicalFindings: "",
        diagnosis: "",
        procedureConducted: "",
        materialsUsed: "",
        followUpDate: "",
      });
      fetchPatient();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while recording note");
    }
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/patients/${id}/treatment-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planForm),
      });
      const resData = await res.json();
      if (!res.ok) {
        setActionError(resData.error || "Failed to save treatment plan");
        return;
      }
      setActionSuccess("Comprehensive treatment plan formulated");
      setIsAddPlanOpen(false);
      fetchPatient();
      setTimeout(() => setActionSuccess(null), 3500);
    } catch {
      setActionError("Network error while saving plan");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center animate-pulse">
        <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#82786E] mt-3">Loading confidential patient record...</p>
      </div>
    );
  }

  const patient = data?.patient;
  const canSeeClinical = data?.canSeeClinical ?? false;

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div>
        <Link
          href="/admin/patients"
          className="inline-flex items-center gap-1.5 text-xs text-[#82786E] hover:text-[#28231F] mb-3 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Patient Directory</span>
        </Link>

        <div className="bg-white p-6 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#86A58C]/15 text-[#86A58C] flex items-center justify-center font-serif text-2xl font-bold shadow-inner">
              {patient.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-semibold text-[#28231F]">
                  {patient.fullName}
                </h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E9E2D7] text-[#82786E]">
                  {patient.referenceId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {patient.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#82786E] mt-1.5">
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-[#86A58C]" />
                  {patient.phone}
                </span>
                {patient.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={12} className="text-[#86A58C]" />
                    {patient.email}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#86A58C]" />
                  {patient.city || "Pune"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/appointments?create=true&patientId=${patient.id}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Critical Medical Alert Strip */}
      {patient.medicalAlerts && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 shadow-sm">
          <AlertTriangle size={18} className="text-rose-600 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] mr-2">
              Clinical Medical Alert:
            </span>
            <span className="font-medium">{patient.medicalAlerts}</span>
          </div>
        </div>
      )}

      {/* Action Messages */}
      {actionSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-[#E9E2D7] text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "overview"
              ? "border-[#86A58C] text-[#28231F]"
              : "border-transparent text-[#82786E] hover:text-[#28231F]"
          }`}
        >
          <Users size={14} />
          <span>Profile Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "appointments"
              ? "border-[#86A58C] text-[#28231F]"
              : "border-transparent text-[#82786E] hover:text-[#28231F]"
          }`}
        >
          <Calendar size={14} />
          <span>Appointments ({patient.appointments?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("clinical")}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "clinical"
              ? "border-[#86A58C] text-[#28231F]"
              : "border-transparent text-[#82786E] hover:text-[#28231F]"
          }`}
        >
          <HeartPulse size={14} />
          <span>Clinical Notes {!canSeeClinical && "(Protected)"}</span>
        </button>

        <button
          onClick={() => setActiveTab("plans")}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "plans"
              ? "border-[#86A58C] text-[#28231F]"
              : "border-transparent text-[#82786E] hover:text-[#28231F]"
          }`}
        >
          <Sparkles size={14} />
          <span>Treatment Plans</span>
        </button>

        <button
          onClick={() => setActiveTab("billing")}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "billing"
              ? "border-[#86A58C] text-[#28231F]"
              : "border-transparent text-[#82786E] hover:text-[#28231F]"
          }`}
        >
          <Receipt size={14} />
          <span>Invoices & Payments</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Demographics Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2">
              Personal Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-[#82786E]">Date of Birth:</span>
                <span className="font-medium text-[#28231F] ml-2">
                  {patient.dateOfBirth
                    ? new Date(patient.dateOfBirth).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not recorded"}
                </span>
              </div>
              <div>
                <span className="text-[#82786E]">Gender:</span>
                <span className="font-medium text-[#28231F] ml-2">{patient.gender || "—"}</span>
              </div>
              <div>
                <span className="text-[#82786E]">Blood Group:</span>
                <span className="font-medium text-[#28231F] ml-2">{patient.bloodGroup || "—"}</span>
              </div>
              <div>
                <span className="text-[#82786E]">Residential Address:</span>
                <p className="font-medium text-[#28231F] mt-0.5">{patient.address || "None specified"}</p>
              </div>
              <div>
                <span className="text-[#82786E]">Registration Date:</span>
                <span className="font-medium text-[#28231F] ml-2">
                  {new Date(patient.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2">
              Emergency Contact & Safety
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-[#82786E]">Contact Name:</span>
                <span className="font-medium text-[#28231F] ml-2">
                  {patient.emergencyContactName || "Not assigned"}
                </span>
              </div>
              <div>
                <span className="text-[#82786E]">Contact Phone:</span>
                <span className="font-medium text-[#28231F] ml-2">
                  {patient.emergencyContactPhone || "—"}
                </span>
              </div>
              <div>
                <span className="text-[#82786E]">Recorded Allergies:</span>
                <span className="font-medium text-[#28231F] ml-2">
                  {patient.allergies || "None declared"}
                </span>
              </div>
            </div>
          </div>

          {/* Account & Notes */}
          <div className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-[#28231F] border-b border-[#E9E2D7] pb-2">
              General Notes & Preferences
            </h3>
            <p className="text-[#82786E] leading-relaxed">
              {patient.notes || "No operational notes recorded."}
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENTS */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <div className="p-4 border-b border-[#E9E2D7] flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#28231F]">Treatment Visit History</h3>
            <Link
              href={`/admin/appointments?create=true&patientId=${patient.id}`}
              className="px-3 py-1.5 bg-[#86A58C] text-white rounded-lg font-semibold text-[11px]"
            >
              Add Visit
            </Link>
          </div>
          {patient.appointments?.length === 0 ? (
            <div className="p-8 text-center text-[#82786E]">No appointments found for this patient.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#F7F5F0]/60 text-[10px] text-[#82786E] uppercase border-b border-[#E9E2D7]">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Treatment</th>
                  <th className="p-3">Dentist</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E2D7]/60">
                {patient.appointments.map((a: any) => (
                  <tr key={a.id} className="hover:bg-[#F7F5F0]/30">
                    <td className="p-3 font-mono font-medium">{a.referenceId}</td>
                    <td className="p-3 font-medium text-[#28231F]">{a.treatment.title}</td>
                    <td className="p-3 text-[#82786E]">{a.dentist.fullName}</td>
                    <td className="p-3">
                      <div>{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                      <div className="text-[10px] text-[#82786E]">{a.startTime} – {a.endTime}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-[#86A58C]/15 text-[#425d48]">
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#82786E] max-w-xs truncate">{a.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 3: CLINICAL NOTES (RBAC PROTECTED) */}
      {activeTab === "clinical" && (
        <div className="space-y-4">
          {!canSeeClinical ? (
            <div className="bg-white p-8 rounded-2xl border border-amber-200 text-center space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Lock size={20} />
              </div>
              <h3 className="font-semibold text-sm text-[#28231F]">Clinical Documentation Restricted</h3>
              <p className="text-xs text-[#82786E] max-w-md mx-auto">
                In compliance with clinical privacy governance, private medical chart notes, intraoral diagnoses, and procedures conducted are accessible exclusively by treating dentists and clinical directors.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[#28231F]">Confidential Clinical Chart</h3>
                  <p className="text-xs text-[#82786E]">Documented diagnoses, procedures, and materials used</p>
                </div>
                <button
                  onClick={() => setIsAddNoteOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#86A58C] hover:bg-[#75957b] text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} />
                  <span>Record Clinical Note</span>
                </button>
              </div>

              {(!patient.clinicalNotes || patient.clinicalNotes.length === 0) ? (
                <div className="bg-white p-8 rounded-2xl border border-[#E9E2D7] text-center text-xs text-[#82786E]">
                  No clinical notes recorded yet for this patient.
                </div>
              ) : (
                <div className="space-y-3">
                  {patient.clinicalNotes.map((note: any) => (
                    <div key={note.id} className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm text-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-[#E9E2D7] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#28231F]">
                            {note.dentist?.fullName || "Treating Doctor"}
                          </span>
                          {note.toothNumber && (
                            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                              Tooth #{note.toothNumber}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#82786E]">
                          {new Date(note.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold text-[#82786E] uppercase text-[10px]">Chief Complaint</span>
                          <p className="text-[#28231F] mt-0.5">{note.chiefComplaint}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-[#82786E] uppercase text-[10px]">Diagnosis</span>
                          <p className="text-[#28231F] mt-0.5">{note.diagnosis}</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-[#82786E] uppercase text-[10px]">Procedure Conducted</span>
                        <p className="text-[#28231F] mt-0.5 bg-[#F7F5F0]/60 p-2.5 rounded-lg border border-[#E9E2D7]">
                          {note.procedureConducted}
                        </p>
                      </div>

                      {note.materialsUsed && (
                        <div>
                          <span className="font-semibold text-[#82786E] uppercase text-[10px]">Materials Applied</span>
                          <p className="text-[#28231F] mt-0.5">{note.materialsUsed}</p>
                        </div>
                      )}

                      {note.followUpDate && (
                        <div className="pt-2 text-[11px] text-[#86A58C] font-semibold flex items-center gap-1">
                          <Clock size={12} />
                          <span>Recommended Follow-up: {new Date(note.followUpDate).toLocaleDateString("en-IN")}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TREATMENT PLANS */}
      {activeTab === "plans" && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-[#28231F]">Structured Treatment Plans</h3>
              <p className="text-xs text-[#82786E]">Multi-stage biomimetic roadmaps and cost estimations</p>
            </div>
            {canSeeClinical && (
              <button
                onClick={() => setIsAddPlanOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#86A58C] hover:bg-[#75957b] text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                <Plus size={14} />
                <span>Formulate New Plan</span>
              </button>
            )}
          </div>

          {(!patient.treatmentPlans || patient.treatmentPlans.length === 0) ? (
            <div className="bg-white p-8 rounded-2xl border border-[#E9E2D7] text-center text-[#82786E]">
              No staged treatment plans formulated yet.
            </div>
          ) : (
            <div className="space-y-4">
              {patient.treatmentPlans.map((plan: any) => {
                let stages: any[] = [];
                try {
                  stages = JSON.parse(plan.stagesJson);
                } catch {}

                return (
                  <div key={plan.id} className="bg-white p-5 rounded-2xl border border-[#E9E2D7] shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E9E2D7] pb-3">
                      <div>
                        <h4 className="font-serif text-base font-semibold text-[#28231F]">{plan.title}</h4>
                        <p className="text-[#82786E] text-[11px]">Proposed by {plan.dentist?.fullName}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-sm text-[#28231F]">
                          ₹{plan.estimatedCost?.toLocaleString("en-IN")}
                        </span>
                        <div className="text-[10px] uppercase font-bold text-[#86A58C]">{plan.status}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-semibold text-[10px] uppercase tracking-wider text-[#82786E]">
                        Roadmap Stages ({stages.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stages.map((st: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-lg border border-[#E9E2D7] bg-[#F7F5F0]/50 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-bold text-[#86A58C] uppercase">Stage {st.stage || idx + 1}</span>
                              <div className="font-medium text-[#28231F]">{st.title}</div>
                            </div>
                            <span className="font-semibold text-[#28231F]">₹{Number(st.cost || 0).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: BILLING & INVOICES */}
      {activeTab === "billing" && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#28231F]">Patient Invoices & Settlement</h3>
            <Link
              href={`/admin/billing?create=true&patientId=${patient.id}`}
              className="px-3 py-1.5 bg-[#86A58C] text-white rounded-lg font-semibold"
            >
              Generate New Invoice
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden">
            {(!patient.invoices || patient.invoices.length === 0) ? (
              <div className="p-8 text-center text-[#82786E]">No invoices issued for this patient.</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F7F5F0]/60 text-[10px] text-[#82786E] uppercase border-b border-[#E9E2D7]">
                  <tr>
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Paid</th>
                    <th className="p-3">Balance Due</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E2D7]/60">
                  {patient.invoices.map((inv: any) => (
                    <tr key={inv.id} className="hover:bg-[#F7F5F0]/30">
                      <td className="p-3 font-mono font-medium text-[#28231F]">{inv.invoiceNumber}</td>
                      <td className="p-3 text-[#82786E]">
                        {new Date(inv.issueDate).toLocaleDateString("en-IN")}
                      </td>
                      <td className="p-3 font-semibold text-[#28231F]">₹{inv.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-emerald-700 font-medium">₹{inv.amountPaid.toLocaleString("en-IN")}</td>
                      <td className="p-3 font-bold text-rose-700">₹{inv.balanceDue.toLocaleString("en-IN")}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ADD CLINICAL NOTE */}
      {isAddNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-2xl w-full max-w-lg overflow-hidden text-xs">
            <div className="p-4 border-b border-[#E9E2D7] bg-[#F7F5F0]/40 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm text-[#28231F]">Record Clinical Medical Chart Note</h3>
                <p className="text-[#82786E] text-[11px]">{patient.fullName} ({patient.referenceId})</p>
              </div>
              <button onClick={() => setIsAddNoteOpen(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddNote} className="p-5 space-y-3">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Tooth Notation / Number</label>
                <input
                  type="text"
                  placeholder="e.g. 11, 21 or Universal 8, 9"
                  value={noteForm.toothNumber}
                  onChange={(e) => setNoteForm({ ...noteForm, toothNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Chief Complaint *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mild sensitivity to cold, desired whitening"
                  value={noteForm.chiefComplaint}
                  onChange={(e) => setNoteForm({ ...noteForm, chiefComplaint: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Clinical Diagnosis *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reversible pulpitis, Class IV composite fracture"
                  value={noteForm.diagnosis}
                  onChange={(e) => setNoteForm({ ...noteForm, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Procedure Conducted *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed treatment steps under rubber dam isolation..."
                  value={noteForm.procedureConducted}
                  onChange={(e) => setNoteForm({ ...noteForm, procedureConducted: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Materials Used</label>
                <input
                  type="text"
                  placeholder="e.g. 3M Filtek A2, Scotchbond Universal, IPS e.max"
                  value={noteForm.materialsUsed}
                  onChange={(e) => setNoteForm({ ...noteForm, materialsUsed: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={noteForm.followUpDate}
                  onChange={(e) => setNoteForm({ ...noteForm, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg focus:outline-none focus:border-[#86A58C]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9E2D7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(false)}
                  className="px-4 py-2 border border-[#E9E2D7] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#86A58C] text-white font-semibold rounded-lg"
                >
                  Save Note to Medical Chart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
