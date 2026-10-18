"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Shield, Calendar, Clock, Sparkles } from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

interface AppointmentSectionProps {
  initialTreatment?: string;
}

export default function AppointmentSection({ initialTreatment }: AppointmentSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    treatment: initialTreatment || "Smile Design",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM – 01:00 PM)",
    message: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please provide your full name.";
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "A contact phone number is required so our concierge can reach you.";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = "Please enter a valid email address.";
      }
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a preferred consultation date.";
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = "Please acknowledge consent to receive consultation scheduling details.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      treatment: "Smile Design",
      preferredDate: "",
      preferredTime: "Morning (10:00 AM – 01:00 PM)",
      message: "",
      privacyConsent: false,
    });
    setErrors({});
  };

  return (
    <section id="book" className="py-24 sm:py-32 bg-ivory border-t border-espresso/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Context & Editorial Intro */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[1.5px] bg-sage" />
                <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                  PRIVATE RESERVATIONS
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
                Let&apos;s talk about <br />
                <span className="italic font-light">your smile.</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-taupe leading-relaxed">
                Tell us a little about your needs, and our team can help you
                understand the next step.
              </p>

              {/* Clinic Standards */}
              <div className="mt-10 space-y-4 border-t border-espresso/10 pt-8">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sand/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Unhurried Dedication
                    </h3>
                    <p className="text-xs text-taupe mt-0.5">
                      Each consultation is reserved exclusively for you, with zero double-booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sand/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-sage" />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Bespoke Planning
                    </h3>
                    <p className="text-xs text-taupe mt-0.5">
                      Includes 3D intraoral imagery review and itemised written roadmap.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sand/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-sage" />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Complete Privacy
                    </h3>
                    <p className="text-xs text-taupe mt-0.5">
                      Your personal and diagnostic records remain strictly confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Assistance Card */}
            <div className="mt-12 p-6 bg-sand/30 border border-espresso/10 border-l-2 border-l-sage">
              <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold block mb-1">
                Prefer immediate messaging?
              </span>
              <p className="text-xs text-taupe">
                You can reach our concierge on WhatsApp at{" "}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-espresso underline hover:text-sage-dark"
                >
                  +91 98765 43210
                </a>{" "}
                for rapid scheduling assistance.
              </p>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-ivory p-6 sm:p-10 lg:p-12 border border-espresso/10 shadow-card">
            
            {/* Clear Demo Submission Notice */}
            <div className="mb-6 p-3.5 bg-sand/40 border border-espresso/10 flex items-center justify-between text-xs text-taupe">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>
                  <strong>Interactive Demo Flow:</strong> Validates in-browser without sending unsolicited external messages.
                </span>
              </div>
            </div>

            {isSubmitted && submittedData ? (
              <div className="py-8 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-sand/40 mx-auto flex items-center justify-center border border-sage/40 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-sage" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-sage-dark font-semibold">
                    Request Received (Demo Notice)
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                    Thank you, {submittedData.fullName}.
                  </h3>
                  <p className="text-sm text-taupe max-w-md mx-auto leading-relaxed">
                    This demonstrates the validated client booking flow. In production, this
                    form connects to your clinic WhatsApp Business API, CRM, or backend
                    scheduling webhook.
                  </p>
                </div>

                <div className="p-5 bg-sand/20 border border-espresso/10 text-left text-xs space-y-2 max-w-md mx-auto text-espresso/90">
                  <p><strong>Selected Discipline:</strong> {submittedData.treatment}</p>
                  <p><strong>Preferred Date:</strong> {submittedData.preferredDate}</p>
                  <p><strong>Preferred Window:</strong> {submittedData.preferredTime}</p>
                  <p><strong>Contact Phone:</strong> {submittedData.phone}</p>
                  {submittedData.email && <p><strong>Email:</strong> {submittedData.email}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-espresso text-xs uppercase tracking-[0.2em] text-espresso hover:bg-sage hover:text-white hover:border-sage transition-colors"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Full Name <span className="text-sage-dark">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="e.g. Meera Deshmukh"
                      className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                        errors.fullName
                          ? "border-red-400 focus:border-red-500"
                          : "border-espresso/15 focus:border-sage"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Phone Number <span className="text-sage-dark">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98220 XXXXX"
                      className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-espresso/15 focus:border-sage"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address & Preferred Treatment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Email Address <span className="text-taupe text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="meera@domain.com"
                      className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-espresso/15 focus:border-sage"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="treatment"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Preferred Treatment
                    </label>
                    <select
                      id="treatment"
                      value={formData.treatment}
                      onChange={(e) =>
                        setFormData({ ...formData, treatment: e.target.value })
                      }
                      className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso focus:bg-white focus:border-sage focus:outline-none transition-colors"
                    >
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title} ({t.number})
                        </option>
                      ))}
                      <option value="General Consultation">
                        General Consultation & Oral Wellness
                      </option>
                      <option value="Second Opinion">
                        Second Opinion on Existing Plan
                      </option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Preferred Date <span className="text-sage-dark">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso focus:bg-white focus:outline-none transition-colors ${
                        errors.preferredDate
                          ? "border-red-400 focus:border-red-500"
                          : "border-espresso/15 focus:border-sage"
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Preferred Window
                    </label>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredTime: e.target.value })
                      }
                      className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso focus:bg-white focus:border-sage focus:outline-none transition-colors"
                    >
                      <option value="Morning (10:00 AM – 01:00 PM)">
                        Morning (10:00 AM – 01:00 PM)
                      </option>
                      <option value="Afternoon (01:00 PM – 04:30 PM)">
                        Afternoon (01:00 PM – 04:30 PM)
                      </option>
                      <option value="Evening (04:30 PM – 07:30 PM)">
                        Evening (04:30 PM – 07:30 PM)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                  >
                    Additional Notes or Sensitivities <span className="text-taupe text-[10px] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us if you experience dental apprehension, sensitivity, or have specific goals..."
                    className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:border-sage focus:outline-none transition-colors"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) =>
                        setFormData({ ...formData, privacyConsent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded-none accent-sage focus:ring-sage"
                    />
                    <span className="text-xs text-taupe leading-relaxed">
                      I agree to allow AURELIS Dental Studio to contact me via phone or
                      message regarding my consultation request. Information is handled
                      with strict medical confidentiality.
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.privacyConsent}</span>
                    </p>
                  )}
                </div>

                {/* Sage Primary Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-sage hover:bg-sage-dark active:bg-sage-dark disabled:bg-sage/50 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sage flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {isSubmitting ? (
                      <span>Verifying & Sending...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
