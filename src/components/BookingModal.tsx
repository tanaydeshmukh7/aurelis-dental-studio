"use client";

import { useEffect, useState } from "react";
import { X, Send, CheckCircle2, Sparkles } from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTreatment?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedTreatment,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    treatment: selectedTreatment || "Smile Design",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM – 01:00 PM)",
    message: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please provide your full name.";
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required for appointment confirmation.";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a preferred consultation date.";
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = "Please check to acknowledge medical scheduling consent.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/public/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Failed to schedule appointment. Please call our concierge.");
        setIsSubmitting(false);
        return;
      }

      setReferenceId(data.referenceId);
      setIsSubmitted(true);
    } catch {
      setServerError("Network error while submitting your consultation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setReferenceId(null);
    setServerError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-xl bg-ivory shadow-2xl z-10 border border-espresso/15 max-h-[92vh] overflow-y-auto p-6 sm:p-10">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-taupe hover:text-espresso hover:bg-sand/50 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-14 h-14 bg-sand/40 mx-auto flex items-center justify-center border border-sage/40 rounded-full">
              <CheckCircle2 className="w-7 h-7 text-sage" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-sage-dark font-semibold block">
              Consultation Requested
            </span>
            <h3 className="font-serif text-3xl text-espresso font-normal">
              Thank you, {formData.fullName}.
            </h3>
            {referenceId && (
              <div className="inline-block px-3 py-1 bg-sage/15 border border-sage/30 text-sage-dark text-xs font-mono font-medium">
                Reference: <span className="font-bold">{referenceId}</span>
              </div>
            )}
            <p className="text-sm text-taupe max-w-sm mx-auto leading-relaxed">
              Your request for a private visit at our Koregaon Park studio has been
              recorded in our appointment queue. Our concierge team will reach out shortly.
            </p>
            <div className="p-4 bg-sand/30 border border-espresso/10 text-xs text-espresso text-left max-w-sm mx-auto space-y-1">
              <p><strong>Treatment:</strong> {formData.treatment}</p>
              <p><strong>Preferred Date:</strong> {formData.preferredDate}</p>
              <p><strong>Window:</strong> {formData.preferredTime}</p>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] transition-colors shadow-sage"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sage" />
                <span className="text-[10px] tracking-[0.22em] text-taupe uppercase font-semibold">
                  AURELIS DENTAL STUDIO · PUNE
                </span>
              </div>
              <h3 id="booking-modal-title" className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                Reserve a Consultation
              </h3>
              <p className="text-xs text-taupe mt-1">
                Unhurried, private evaluation at our Koregaon Park studio.
              </p>
            </div>

            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                  Full Name <span className="text-sage-dark">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                    Phone Number <span className="text-sage-dark">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 XXXXX"
                    className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                    Discipline
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                  >
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                    Preferred Date <span className="text-sage-dark">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDate: e.target.value })
                    }
                    className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                    className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning</option>
                    <option value="Afternoon (01:00 PM – 04:30 PM)">Afternoon</option>
                    <option value="Evening (04:30 PM – 07:30 PM)">Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                  Notes / Inquiries (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any particular questions or clinical history..."
                  className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2 text-sm text-espresso focus:outline-none focus:border-sage"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) =>
                      setFormData({ ...formData, privacyConsent: e.target.checked })
                    }
                    className="mt-0.5 accent-sage"
                  />
                  <span className="text-[11px] text-taupe leading-relaxed">
                    I agree to receive appointment details regarding this inquiry. (Demo Flow)
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-xs text-red-600 mt-1">{errors.privacyConsent}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sage"
                >
                  {isSubmitting ? (
                    <span>Scheduling...</span>
                  ) : (
                    <>
                      <span>Confirm Reservation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
