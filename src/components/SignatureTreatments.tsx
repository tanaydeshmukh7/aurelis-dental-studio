"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TREATMENTS, Treatment } from "@/data/treatments";
import TreatmentDetailModal from "./TreatmentDetailModal";

interface SignatureTreatmentsProps {
  onSelectTreatmentForBooking: (treatmentTitle: string) => void;
}

export default function SignatureTreatments({
  onSelectTreatmentForBooking,
}: SignatureTreatmentsProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const t1 = TREATMENTS[0]; // Smile Design (Featured)
  const t2 = TREATMENTS[1]; // Whitening
  const t3 = TREATMENTS[2]; // Clear Aligners
  const t4 = TREATMENTS[3]; // Implants
  const t5 = TREATMENTS[4]; // Preventive

  return (
    <section id="treatments" className="py-24 sm:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-espresso/10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                WHAT WE DO
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
              Considered care. <br className="hidden sm:block" />
              <span className="italic font-light">Confident smiles.</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-3">
            <p className="text-sm sm:text-base text-taupe max-w-md font-normal leading-relaxed md:text-right">
              Every clinical intervention is measured against biological longevity,
              enamel preservation, and your personal facial aesthetics.
            </p>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors border-b border-espresso/20 pb-0.5"
            >
              <span>Explore All 5 Protocols</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sage" />
            </Link>
          </div>
        </div>

        {/* Layout 1: Featured Hero Showcase (01 - Smile Design) */}
        <div className="mb-14 sm:mb-20 bg-sand/30 border border-espresso/8 overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
              <Image
                src={t1.image}
                alt={t1.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[0.95]"
              />
              <div className="absolute top-5 left-5 bg-ivory/95 backdrop-blur-sm px-3.5 py-1 text-[11px] font-serif italic text-espresso border border-espresso/10">
                Signature Aesthetic Care
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-champagne font-light block mb-2">
                  {t1.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-espresso font-normal mb-4">
                  {t1.title}
                </h3>
                <p className="text-sm sm:text-base text-taupe leading-relaxed mb-6">
                  {t1.shortDesc}
                </p>
                <div className="space-y-2 mb-8 text-xs text-espresso/80">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span>3D intraoral facial analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span>Custom porcelain trial mock-up</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTreatment(t1)}
                className="group/btn inline-flex items-center justify-between w-full pt-4 border-t border-espresso/10 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
              >
                <span>Explore Treatment</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout 2: Asymmetric 2-Column Staggered Pair (02 Teeth Whitening & 03 Clear Aligners) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-14 sm:mb-20">
          
          {/* 02 Teeth Whitening */}
          <div className="bg-sand/20 border border-espresso/8 p-6 sm:p-8 flex flex-col justify-between group hover:border-sage/40 transition-colors">
            <div>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-sand mb-6">
                <Image
                  src={t2.image}
                  alt={t2.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                  {t2.title}
                </h3>
                <span className="font-serif text-2xl text-champagne font-light">
                  {t2.number}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-sage-dark font-medium mb-3">
                {t2.tagline}
              </p>
              <p className="text-sm text-taupe leading-relaxed mb-6">
                {t2.shortDesc}
              </p>
            </div>

            <button
              onClick={() => setSelectedTreatment(t2)}
              className="group/btn inline-flex items-center justify-between w-full pt-4 border-t border-espresso/10 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors"
            >
              <span>Explore Treatment</span>
              <ArrowUpRight className="w-4 h-4 text-sage group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* 03 Clear Aligners */}
          <div className="bg-sand/20 border border-espresso/8 p-6 sm:p-8 flex flex-col justify-between group hover:border-sage/40 transition-colors md:mt-8">
            <div>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-sand mb-6">
                <Image
                  src={t3.image}
                  alt={t3.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                  {t3.title}
                </h3>
                <span className="font-serif text-2xl text-champagne font-light">
                  {t3.number}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-sage-dark font-medium mb-3">
                {t3.tagline}
              </p>
              <p className="text-sm text-taupe leading-relaxed mb-6">
                {t3.shortDesc}
              </p>
            </div>

            <button
              onClick={() => setSelectedTreatment(t3)}
              className="group/btn inline-flex items-center justify-between w-full pt-4 border-t border-espresso/10 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors"
            >
              <span>Explore Treatment</span>
              <ArrowUpRight className="w-4 h-4 text-sage group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Layout 3: Alternating Rows with Rich Context (04 Implants & 05 Preventive) */}
        <div className="space-y-8 sm:space-y-10">
          
          {/* 04 Dental Implants */}
          <div className="border-t border-b border-espresso/10 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 font-serif text-4xl sm:text-5xl text-champagne font-light">
              {t4.number}
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                {t4.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-taupe mt-1">
                {t4.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 text-sm text-taupe leading-relaxed">
              {t4.shortDesc}
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-end">
              <button
                onClick={() => setSelectedTreatment(t4)}
                className="group/btn inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors px-4 py-2 border border-espresso/20 hover:border-sage"
              >
                <span>Explore ↗</span>
              </button>
            </div>
          </div>

          {/* 05 Preventive Dentistry */}
          <div className="border-b border-espresso/10 pb-8 sm:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 font-serif text-4xl sm:text-5xl text-champagne font-light">
              {t5.number}
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                {t5.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-taupe mt-1">
                {t5.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 text-sm text-taupe leading-relaxed">
              {t5.shortDesc}
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-end">
              <button
                onClick={() => setSelectedTreatment(t5)}
                className="group/btn inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors px-4 py-2 border border-espresso/20 hover:border-sage"
              >
                <span>Explore ↗</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modal for full treatment exploration */}
      <TreatmentDetailModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBookTreatment={onSelectTreatmentForBooking}
      />
    </section>
  );
}
