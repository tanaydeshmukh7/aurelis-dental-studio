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
    <section id="treatments" className="py-24 sm:py-32 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#514A41]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-[#C6BCAE] uppercase font-semibold">
                CLINICAL DISCIPLINES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F0E9DF] font-normal tracking-tight">
              Care that fits <br className="hidden sm:block" />
              <span className="italic font-light">your smile.</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-3">
            <p className="text-sm sm:text-base text-[#C6BCAE] max-w-md font-normal leading-relaxed md:text-right">
              Every clinical intervention is measured against biological longevity,
              enamel preservation, and your personal facial aesthetics.
            </p>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-sage transition-colors border-b border-[#514A41] pb-0.5"
            >
              <span>Explore All 5 Disciplines</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sage" />
            </Link>
          </div>
        </div>

        {/* Layout 1: Featured Hero Showcase (01 - Smile Design) */}
        <div className="mb-14 sm:mb-20 bg-[#24221F] border border-[#514A41] overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
              <Image
                src={t1.image}
                alt={t1.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[0.95] brightness-[0.95]"
              />
              <div className="absolute top-5 left-5 bg-[#24221F]/90 backdrop-blur-sm px-3.5 py-1 text-[11px] font-serif italic text-[#F0E9DF] border border-[#514A41]">
                Signature Aesthetic Care
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-champagne font-light block mb-2">
                  {t1.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#F0E9DF] font-normal mb-4">
                  {t1.title}
                </h3>
                <p className="text-sm sm:text-base text-[#C6BCAE] leading-relaxed mb-6">
                  {t1.shortDesc}
                </p>
                <div className="space-y-2 mb-8 text-xs text-[#C6BCAE]">
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

              <div className="flex items-center gap-4 pt-4 border-t border-[#514A41]">
                <Link
                  href={`/treatments/${t1.slug}`}
                  className="px-5 py-2.5 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.18em] transition-colors shadow-sm"
                >
                  View Protocol
                </Link>
                <button
                  onClick={() => setSelectedTreatment(t1)}
                  className="group/btn inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-sage transition-colors"
                >
                  <span>Quick Overview</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sage group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout 2: Asymmetric 2-Column Staggered Pair (02 Teeth Whitening & 03 Clear Aligners) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-14 sm:mb-20">
          
          {/* 02 Teeth Whitening */}
          <div className="bg-[#24221F] border border-[#514A41] p-6 sm:p-8 flex flex-col justify-between group hover:border-sage/40 transition-colors">
            <div>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#302D28] mb-6">
                <Image
                  src={t2.image}
                  alt={t2.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
                  {t2.title}
                </h3>
                <span className="font-serif text-2xl text-champagne font-light">
                  {t2.number}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-sage font-medium mb-3">
                {t2.tagline}
              </p>
              <p className="text-sm text-[#C6BCAE] leading-relaxed mb-6">
                {t2.shortDesc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#514A41]">
              <Link
                href={`/treatments/${t2.slug}`}
                className="text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-sage transition-colors inline-flex items-center gap-1"
              >
                <span>View Protocol</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-sage" />
              </Link>
              <button
                onClick={() => setSelectedTreatment(t2)}
                className="text-xs text-[#C6BCAE] hover:text-[#F0E9DF] underline"
              >
                Preview Details
              </button>
            </div>
          </div>

          {/* 03 Clear Aligners */}
          <div className="bg-[#24221F] border border-[#514A41] p-6 sm:p-8 flex flex-col justify-between group hover:border-sage/40 transition-colors md:mt-8">
            <div>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#302D28] mb-6">
                <Image
                  src={t3.image}
                  alt={t3.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
                  {t3.title}
                </h3>
                <span className="font-serif text-2xl text-champagne font-light">
                  {t3.number}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-sage font-medium mb-3">
                {t3.tagline}
              </p>
              <p className="text-sm text-[#C6BCAE] leading-relaxed mb-6">
                {t3.shortDesc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#514A41]">
              <Link
                href={`/treatments/${t3.slug}`}
                className="text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-sage transition-colors inline-flex items-center gap-1"
              >
                <span>View Protocol</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-sage" />
              </Link>
              <button
                onClick={() => setSelectedTreatment(t3)}
                className="text-xs text-[#C6BCAE] hover:text-[#F0E9DF] underline"
              >
                Preview Details
              </button>
            </div>
          </div>

        </div>

        {/* Layout 3: Alternating Rows with Rich Context (04 Implants & 05 Preventive) */}
        <div className="space-y-8 sm:space-y-10">
          
          {/* 04 Dental Implants */}
          <div className="border-t border-b border-[#514A41] py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 font-serif text-4xl sm:text-5xl text-champagne font-light">
              {t4.number}
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
                {t4.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-[#C6BCAE] mt-1">
                {t4.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 text-sm text-[#C6BCAE] leading-relaxed">
              {t4.shortDesc}
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-end">
              <Link
                href={`/treatments/${t4.slug}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-white hover:bg-sage transition-all px-4 py-2 border border-[#514A41] hover:border-sage bg-[#24221F]"
              >
                <span>View Protocol</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 05 Preventive Dentistry */}
          <div className="border-b border-[#514A41] pb-8 sm:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-2 font-serif text-4xl sm:text-5xl text-champagne font-light">
              {t5.number}
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
                {t5.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-[#C6BCAE] mt-1">
                {t5.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 text-sm text-[#C6BCAE] leading-relaxed">
              {t5.shortDesc}
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-end">
              <Link
                href={`/treatments/${t5.slug}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F0E9DF] hover:text-white hover:bg-sage transition-all px-4 py-2 border border-[#514A41] hover:border-sage bg-[#24221F]"
              >
                <span>View Protocol</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
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
