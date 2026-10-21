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
    <div className="bg-[#CFC5B7]/50 border border-[#B8ADA0] p-6 sm:p-8 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-4 h-4 text-[#66866D]" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#66866D] font-semibold">
          DIRECT STUDIO CONCIERGE
        </span>
      </div>
      <h3 className="font-serif text-2xl text-[#28231F] font-normal">
        Send an Unhurried Enquiry
      </h3>
      <p className="text-xs text-[#514A42] mt-1 mb-6">
        Have questions about clinical treatments, private consultations, or scheduling? Our concierge team responds promptly.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-950/20 border border-red-500/40 text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 bg-[#DCD4C8] mx-auto flex items-center justify-center border border-[#66866D]/40 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-[#66866D]" />
          </div>
          <h4 className="font-serif text-xl text-[#28231F]">
            Thank you, {formData.name}
          </h4>
          {referenceId && (
            <div className="inline-block px-3 py-1 bg-[#66866D]/15 border border-[#66866D]/30 text-[#66866D] text-xs font-mono font-medium">
              Reference: <span className="font-bold">{referenceId}</span>
            </div>
          )}
          <p className="text-xs text-[#514A42] max-w-sm mx-auto leading-relaxed">
            Your inquiry has been delivered directly to our front desk and lead coordinator. We look forward to connecting with you.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#66866D] hover:bg-[#86A58C] text-white text-xs uppercase tracking-[0.16em] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1">
              Full Name <span className="text-[#66866D]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rohini Deshmukh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#DCD4C8] border border-[#B8ADA0] px-3.5 py-2.5 text-sm text-[#28231F] placeholder:text-[#514A42]/60 focus:outline-none focus:border-[#66866D]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98220 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#DCD4C8] border border-[#B8ADA0] px-3.5 py-2.5 text-sm text-[#28231F] placeholder:text-[#514A42]/60 focus:outline-none focus:border-[#66866D]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#DCD4C8] border border-[#B8ADA0] px-3.5 py-2.5 text-sm text-[#28231F] placeholder:text-[#514A42]/60 focus:outline-none focus:border-[#66866D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1">
              Area of Interest
            </label>
            <select
              value={formData.requestedTreatment}
              onChange={(e) => setFormData({ ...formData, requestedTreatment: e.target.value })}
              className="w-full bg-[#DCD4C8] border border-[#B8ADA0] px-3.5 py-2.5 text-sm text-[#28231F] focus:outline-none focus:border-[#66866D]"
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
            <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1">
              Your Message <span className="text-[#66866D]">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us what you are looking for, preferred consultation timings, or any specific questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#DCD4C8] border border-[#B8ADA0] px-3.5 py-2.5 text-sm text-[#28231F] placeholder:text-[#514A42]/60 focus:outline-none focus:border-[#66866D]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#66866D] hover:bg-[#86A58C] active:bg-[#66866D] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sage"
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