"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default function ContactInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestedTreatment: "General Enquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setError("Please provide a phone number or email so our concierge can reach you.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your enquiry or question.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit enquiry. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setReferenceId(data.referenceId);
      setIsSubmitted(true);
    } catch {
      setError("Network error while submitting enquiry. Please try again or WhatsApp our desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReferenceId(null);
    setError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      requestedTreatment: "General Enquiry",
      message: "",
    });
  };

  return (
    <div className="bg-sand/20 border border-espresso/10 p-6 sm:p-8 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-4 h-4 text-sage" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold">
          DIRECT STUDIO CONCIERGE
        </span>
      </div>
      <h3 className="font-serif text-2xl text-espresso font-normal">
        Send an Unhurried Enquiry
      </h3>
      <p className="text-xs text-taupe mt-1 mb-6">
        Have questions about clinical treatments, private consultations, or scheduling? Our concierge team responds promptly.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 bg-sand/40 mx-auto flex items-center justify-center border border-sage/40 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-sage" />
          </div>
          <h4 className="font-serif text-xl text-espresso">
            Thank you, {formData.name}
          </h4>
          {referenceId && (
            <div className="inline-block px-3 py-1 bg-sage/15 border border-sage/30 text-sage-dark text-xs font-mono font-medium">
              Reference: <span className="font-bold">{referenceId}</span>
            </div>
          )}
          <p className="text-xs text-taupe max-w-sm mx-auto leading-relaxed">
            Your inquiry has been delivered directly to our front desk and lead coordinator. We look forward to connecting with you.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.16em] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
              Full Name <span className="text-sage-dark">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rohini Deshmukh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-ivory border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98220 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-ivory border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-ivory border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
              Area of Interest
            </label>
            <select
              value={formData.requestedTreatment}
              onChange={(e) => setFormData({ ...formData, requestedTreatment: e.target.value })}
              className="w-full bg-ivory border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
            >
              <option value="General Enquiry">General Studio Enquiry</option>
              <option value="Smile Design">Smile Design & Aesthetic Dentistry</option>
              <option value="Teeth Whitening">Teeth Whitening</option>
              <option value="Clear Aligners">Clear Aligners</option>
              <option value="Dental Implants">Dental Implants</option>
              <option value="Preventive Dentistry">Preventive & Comprehensive Hygiene</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
              Your Message <span className="text-sage-dark">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us what you are looking for, preferred consultation timings, or any specific questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-ivory border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sage"
          >
            {isSubmitting ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <span>Submit Concierge Message</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}