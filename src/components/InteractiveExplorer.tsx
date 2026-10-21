"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

interface InteractiveExplorerProps {
  onOpenBooking: () => void;
  onExploreDetail: (treatmentId: string) => void;
}

export default function InteractiveExplorer({
  onOpenBooking,
  onExploreDetail,
}: InteractiveExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TREATMENTS[activeIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#CFC5B7] border-t border-[#B8ADA0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
              INTERACTIVE SMILE ATELIER
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
            Your smile has its own story.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-taupe leading-relaxed">
            Select a care area below to understand how our restorative and cosmetic
            disciplines harmonize aesthetics, bite biomechanics, and long-term oral vitality.
          </p>
        </div>

        {/* Interactive Studio Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#DCD4C8] p-6 sm:p-10 lg:p-12 shadow-card border border-[#B8ADA0]">
          
          {/* Left / Side 1: Large Visual Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-stone-dark overflow-hidden border border-[#B8ADA0]">
              <Image
                key={current.id}
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-opacity duration-500 filter saturate-[0.96] brightness-[0.95]"
              />

              {/* Inset Badge */}
              <div className="absolute top-4 left-4 bg-[#DCD4C8]/95 backdrop-blur-sm px-3.5 py-1 text-[11px] font-serif text-espresso border border-[#B8ADA0]">
                Aurelis Focus: {current.title}
              </div>

              {/* Bottom Inset Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-espresso/85 backdrop-blur-md p-4 text-white text-xs">
                <p className="font-serif italic text-sage-light">
                  {current.tagline}
                </p>
              </div>
            </div>

            {/* Quick stats / timeline indicator */}
            <div className="mt-4 flex items-center justify-between text-xs text-taupe px-1">
              <span>Estimated timeline:</span>
              <span className="font-medium text-espresso">{current.timeline}</span>
            </div>
          </div>

          {/* Right / Side 2: Selectable Interactive Menu & Detail Content */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Category Selector Tabs with Sage Green Active State */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-[#B8ADA0] mb-6" role="tablist">
              {TREATMENTS.map((item, idx) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={activeIndex === idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 sm:px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-200 border ${
                    activeIndex === idx
                      ? "bg-sage text-white border-sage shadow-sage font-medium"
                      : "bg-transparent text-taupe border-[#B8ADA0] hover:border-sage hover:text-espresso"
                  }`}
                >
                  <span className="font-serif mr-1.5 opacity-80">{item.number}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {/* Selected Treatment Information Display */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-sage-dark font-semibold block mb-1">
                  Selected Discipline
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-taupe leading-relaxed">
                  {current.fullDesc}
                </p>
              </div>

              {/* Treatment Suitability Points */}
              <div className="bg-[#CFC5B7]/60 p-4 sm:p-5 border-l-2 border-sage border-y border-r border-[#B8ADA0]/60">
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-espresso mb-2">
                  Common Considerations:
                </p>
                <div className="space-y-1.5">
                  {current.suitability.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-espresso/90">
                      <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sage flex items-center gap-2"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onExploreDetail(current.id)}
                  className="px-5 py-3 text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso border border-[#B8ADA0] hover:border-sage transition-colors bg-stone-dark/20"
                >
                  View Clinical Protocol
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
