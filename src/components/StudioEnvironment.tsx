"use client";

import { useState } from "react";
import Image from "next/image";
import { STUDIO_SPACES } from "@/data/studio";

export default function StudioEnvironment() {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const activeSpace = STUDIO_SPACES[activeSpaceIdx];

  return (
    <section id="studio" className="py-24 sm:py-32 bg-[#24221F] text-[#F0E9DF] relative overflow-hidden border-t border-[#514A41]">
      
      {/* Subtle texture / grain overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F0E9DF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1.5px] bg-sage" />
            <span className="text-[11px] tracking-[0.25em] text-sage uppercase font-semibold">
              THE STUDIO ENVIRONMENT · KOREGAON PARK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F0E9DF] font-normal tracking-tight leading-[1.12]">
            Modern dentistry. <br />
            <span className="italic font-light text-sage-light">
              A more thoughtful experience.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#C6BCAE] font-normal leading-relaxed max-w-2xl">
            Designed around clarity, comfort, and care at every step. We curated an
            architectural sanctuary using fluted stone, warm oak, and acoustic damping to
            dispel dental apprehension before you even take a seat.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 border-b border-[#514A41] pb-4">
          {STUDIO_SPACES.map((space, idx) => (
            <button
              key={space.title}
              onClick={() => setActiveSpaceIdx(idx)}
              className={`text-xs uppercase tracking-[0.2em] py-2 px-3 transition-all duration-300 relative ${
                activeSpaceIdx === idx
                  ? "text-sage-light font-medium"
                  : "text-[#C6BCAE] hover:text-[#F0E9DF]"
              }`}
            >
              <span>{space.title}</span>
              {activeSpaceIdx === idx && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sage" />
              )}
            </button>
          ))}
        </div>

        {/* Cinematic Main Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Visual Image Frame */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#1C1A17] overflow-hidden border border-[#514A41] shadow-2xl group">
            <Image
              key={activeSpace.image}
              src={activeSpace.image}
              alt={activeSpace.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover transition-all duration-700 filter brightness-95 contrast-105 group-hover:scale-105"
            />

            {/* Gradient vignette for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#24221F]/90 via-[#24221F]/30 to-transparent pointer-events-none" />

            {/* Text Overlay inside Image */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-light block mb-1">
                {activeSpace.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {activeSpace.title}
              </h3>
            </div>
          </div>

          {/* Descriptive Side Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-[#C6BCAE] leading-relaxed font-light">
                {activeSpace.description}
              </p>

              <div className="pt-4 border-t border-[#514A41] space-y-3">
                <span className="text-[10px] uppercase tracking-[0.22em] text-sage-light block font-semibold">
                  Architectural Specifications
                </span>
                {activeSpace.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/50">
              <p>
                Aurelis Dental Studio · Koregaon Park, Pune.
                <br />
                Equipped with hospital-grade clean air standards.
              </p>
            </div>
          </div>

        </div>

        {/* Ambient Interior Highlights Strip */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-xl text-white font-normal">Acoustic Serenity</h4>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Engineered sound-dampening wall panels and discreet background soundscapes keep clinical noises muffled.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl text-white font-normal">Natural Illumination</h4>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Filtered diffuse daylight paired with 5000K true-color shade-matching lights ensures true aesthetic fidelity.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl text-white font-normal">Biophilic Materials</h4>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Warm teakwood accents, sandstone masonry, and botanical elements instill immediate physical calm.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
