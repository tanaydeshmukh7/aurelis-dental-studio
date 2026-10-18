"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, Shield, Clock, Calendar, Sparkles, Phone, MessageCircle } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TREATMENTS } from "@/data/treatments";
import { SITE_METADATA } from "@/data/site";

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    treatment: "Smile Design",
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
      errs.phone = "Phone number is required for consultation confirmation.";
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
      errs.privacyConsent = "Please check the box to confirm consultation scheduling consent.";
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
    }, 1200);
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
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Book an Appointment" }]} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-[1px] bg-sage" />
                  <span className="text-[11px] tracking-[0.25em] text-sage uppercase font-semibold">
                    PRIVATE APPOINTMENTS
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight leading-[1.12]">
                  Let&apos;s talk about <br />
                  <span className="italic font-light">your smile.</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-taupe leading-relaxed">
                  Tell us a little about your goals or concerns, and our concierge
                  team will coordinate an unhurried, private visit.
                </p>
              </div>

              {/* Clinic Guarantees */}
              <div className="space-y-4 pt-6 border-t border-espresso/10">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Exclusively Reserved Time
                    </h2>
                    <p className="text-xs text-taupe mt-0.5">
                      We never double-book. Your clinician is focused entirely on you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Transparent Written Roadmap
                    </h2>
                    <p className="text-xs text-taupe mt-0.5">
                      Itemised fee schedule and clinical options provided before proceeding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                      Medical Confidentiality
                    </h2>
                    <p className="text-xs text-taupe mt-0.5">
                      Your photographic and 3D diagnostic records remain strictly confidential.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact Box */}
              <div className="p-6 bg-sand/30 border border-espresso/10 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold block">
                  Prefer direct assistance?
                </span>
                <p className="text-xs text-taupe">
                  Our concierge team is available to assist via WhatsApp or direct phone:
                </p>
                <div className="pt-2 flex flex-col gap-2 text-xs font-medium text-espresso">
                  <a
                    href={`https://wa.me/${SITE_METADATA.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sage hover:text-sage-dark transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: {SITE_METADATA.whatsapp}</span>
                  </a>
                  <a
                    href={`tel:${SITE_METADATA.phoneRaw}`}
                    className="inline-flex items-center gap-2 hover:text-sage transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sage" />
                    <span>Direct: {SITE_METADATA.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7 bg-ivory p-6 sm:p-10 lg:p-12 border border-espresso/10 shadow-card">
              
              {/* Demo Notice */}
              <div className="mb-6 p-3.5 bg-sand/40 border border-espresso/10 flex items-center justify-between text-xs text-taupe">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span>
                    <strong>Interactive Demo Flow:</strong> Validates in-browser without sending unsolicited messages.
                  </span>
                </div>
              </div>

              {isSubmitted && submittedData ? (
                <div className="py-8 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-sage-subtle mx-auto flex items-center justify-center border border-sage/40">
                    <CheckCircle2 className="w-8 h-8 text-sage" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold">
                      Request Registered (Demo Notice)
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                      Thank you, {submittedData.fullName}.
                    </h2>
                    <p className="text-sm text-taupe max-w-md mx-auto leading-relaxed">
                      This confirms the client-side validation flow. In production, this data feeds into your clinic scheduling CRM or WhatsApp webhook.
                    </p>
                  </div>

                  <div className="p-5 bg-sand/20 border border-espresso/10 text-left text-xs space-y-2 max-w-md mx-auto text-espresso/90">
                    <p><strong>Treatment:</strong> {submittedData.treatment}</p>
                    <p><strong>Preferred Date:</strong> {submittedData.preferredDate}</p>
                    <p><strong>Preferred Window:</strong> {submittedData.preferredTime}</p>
                    <p><strong>Phone:</strong> {submittedData.phone}</p>
                    {submittedData.email && <p><strong>Email:</strong> {submittedData.email}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-espresso text-xs uppercase tracking-[0.2em] text-espresso hover:bg-espresso hover:text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  
                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="bookingFullName"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Full Name <span className="text-sage">*</span>
                      </label>
                      <input
                        type="text"
                        id="bookingFullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Anjali Kulkarni"
                        className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                          errors.fullName
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-espresso/15 focus:border-sage focus:ring-1 focus:ring-sage"
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
                        htmlFor="bookingPhone"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Phone Number <span className="text-sage">*</span>
                      </label>
                      <input
                        type="tel"
                        id="bookingPhone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98220 XXXXX"
                        className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                          errors.phone
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-espresso/15 focus:border-sage focus:ring-1 focus:ring-sage"
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

                  {/* Email & Treatment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="bookingEmail"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Email Address <span className="text-taupe text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="bookingEmail"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="anjali@domain.com"
                        className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-espresso/15 focus:border-sage focus:ring-1 focus:ring-sage"
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
                        htmlFor="bookingTreatment"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Clinical Discipline
                      </label>
                      <select
                        id="bookingTreatment"
                        value={formData.treatment}
                        onChange={(e) =>
                          setFormData({ ...formData, treatment: e.target.value })
                        }
                        className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso focus:bg-white focus:border-sage focus:ring-1 focus:ring-sage focus:outline-none transition-colors"
                      >
                        {TREATMENTS.map((t) => (
                          <option key={t.id} value={t.title}>
                            {t.title} ({t.number})
                          </option>
                        ))}
                        <option value="General Consultation">
                          General Oral Wellness Consultation
                        </option>
                        <option value="Second Opinion">
                          Second Opinion on Existing Treatment Plan
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Window */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="bookingDate"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Preferred Date <span className="text-sage">*</span>
                      </label>
                      <input
                        type="date"
                        id="bookingDate"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDate: e.target.value })
                        }
                        className={`w-full bg-sand/20 border px-4 py-3 text-sm text-espresso focus:bg-white focus:outline-none transition-colors ${
                          errors.preferredDate
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-espresso/15 focus:border-sage focus:ring-1 focus:ring-sage"
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
                        htmlFor="bookingTime"
                        className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                      >
                        Preferred Time Window
                      </label>
                      <select
                        id="bookingTime"
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredTime: e.target.value })
                        }
                        className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso focus:bg-white focus:border-sage focus:ring-1 focus:ring-sage focus:outline-none transition-colors"
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

                  {/* Notes / Sensitivities */}
                  <div>
                    <label
                      htmlFor="bookingMessage"
                      className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-2"
                    >
                      Notes or Dental Sensitivities <span className="text-taupe text-[10px] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="bookingMessage"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Let us know if you experience dental apprehension, have sensitive teeth, or specific aesthetic goals..."
                      className="w-full bg-sand/20 border border-espresso/15 px-4 py-3 text-sm text-espresso placeholder:text-taupe/60 focus:bg-white focus:border-sage focus:ring-1 focus:ring-sage focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Consent */}
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
                        I consent to receive consultation scheduling communications from AURELIS Dental Studio. My details will be handled with medical confidentiality.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.privacyConsent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-sage hover:bg-sage-dark active:bg-sage-dark disabled:bg-sage/50 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sage flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    >
                      {isSubmitting ? (
                        <span>Verifying &amp; Registering...</span>
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
      </main>

      <SiteFooter />
    </div>
  );
}
