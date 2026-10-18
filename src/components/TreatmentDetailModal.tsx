"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Treatment } from "@/data/treatments";

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookTreatment: (treatmentTitle: string) => void;
}

export default function TreatmentDetailModal({
  treatment,
  onClose,
  onBookTreatment,
}: TreatmentDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (treatment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [treatment, onClose]);

  if (!treatment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-espresso/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-ivory shadow-2xl max-h-[92vh] overflow-y-auto z-10 border border-espresso/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-ivory/90 hover:bg-espresso hover:text-white transition-colors duration-200 border border-espresso/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-label="Close treatment details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-64 sm:h-80 bg-sand overflow-hidden">
          <Image
            src={treatment.image}
            alt={treatment.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] uppercase tracking-[0.25em] text-sage-light font-semibold">
              Treatment Protocol {treatment.number}
            </span>
            <h3 id="modal-title" className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
              {treatment.title}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
              {treatment.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Clinical Overview */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-taupe font-semibold mb-2">
              Clinical Overview
            </h4>
            <p className="text-espresso text-base sm:text-lg leading-relaxed font-normal">
              {treatment.fullDesc}
            </p>
          </div>

          {/* Clinical Approach / Steps */}
          <div className="bg-sand/40 p-5 sm:p-6 border-l-2 border-sage">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-taupe font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Aurelis Clinical Approach</span>
            </h4>
            <ul className="space-y-2.5">
              {treatment.approach.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-espresso/90">
                  <span className="font-serif italic text-sage font-semibold mt-0.5">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitability & Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-taupe font-semibold mb-3">
                Suitability Considerations
              </h4>
              <ul className="space-y-2">
                {treatment.suitability.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-espresso/80">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-taupe font-semibold mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sage" />
                  <span>Expected Cadence</span>
                </h4>
                <p className="text-xs sm:text-sm text-espresso/90">{treatment.timeline}</p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-taupe font-semibold mb-1">
                  Ideal Profile
                </h4>
                <p className="text-xs sm:text-sm text-espresso/80">{treatment.idealFor}</p>
              </div>
            </div>
          </div>

          {/* Notice on Medical Responsibility */}
          <div className="pt-4 border-t border-espresso/10 text-xs text-taupe italic">
            * Medical Note: Suitability is determined strictly during a personalized clinical and radiographic examination at our Koregaon Park studio. No outcomes are guaranteed as biological responses vary per patient.
          </div>

          {/* Modal Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-espresso/10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto text-xs uppercase tracking-[0.2em] text-taupe hover:text-espresso py-3 px-4 transition-colors"
            >
              Back to Overview
            </button>

            <button
              onClick={() => {
                onClose();
                onBookTreatment(treatment.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
            >
              <span>Consult for {treatment.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
