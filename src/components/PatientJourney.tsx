"use client";

import { UserCheck, FileCheck, Sparkles, Heart } from "lucide-react";

export default function PatientJourney() {
  const pillars = [
    {
      number: "01",
      title: "Personal Attention",
      subtitle: "Dedicated, private consultation",
      description:
        "Every visit begins in an unhurried, private consultation suite. We reserve generous appointment windows to listen closely to your goals, oral history, and aesthetic preferences without rushing.",
      icon: UserCheck,
    },
    {
      number: "02",
      title: "Clear Treatment Plans",
      subtitle: "Transparent dialogue & roadmap",
      description:
        "We review digital diagnostics together on high-resolution displays. You receive a structured, written treatment outline detailing clinical priorities, timelines, and options with total transparency.",
      icon: FileCheck,
    },
    {
      number: "03",
      title: "Modern Dental Care",
      subtitle: "Biomimetic tooth preservation",
      description:
        "Our clinical approach focuses on preserving natural enamel structure wherever viable. High-precision digital impressions and restorative materials work in harmony with your natural teeth.",
      icon: Sparkles,
    },
    {
      number: "04",
      title: "Comfort-Focused Visits",
      subtitle: "A serene, calming environment",
      description:
        "From acoustic isolation and natural timber interiors to thoughtful sedation protocols and gentle hands, our studio is engineered to alleviate dental anxiety and make visits genuinely relaxing.",
      icon: Heart,
    },
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-ivory border-t border-espresso/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-espresso/10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                PHILOSOPHY &amp; EXPERIENCE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
              What makes your visit <br className="hidden sm:block" />
              <span className="italic font-light">feel thoughtful.</span>
            </h2>
          </div>

          <p className="mt-4 lg:mt-0 text-base sm:text-lg text-taupe max-w-md font-normal leading-relaxed">
            Care centered entirely around your comfort, biological tooth health, and long-term peace of mind.
          </p>
        </div>

        {/* 4 Concise Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-white/70 border border-espresso/10 p-8 sm:p-10 flex flex-col justify-between shadow-subtle hover:border-sage/50 hover:shadow-card transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl text-champagne font-light">
                      {pillar.number}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-sand/40 flex items-center justify-center text-sage group-hover:bg-sage/15 transition-colors">
                      <Icon className="w-4 h-4 text-sage" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-espresso font-normal mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-sage-dark font-medium mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-espresso/8 flex items-center justify-between text-[11px] text-taupe/80">
                  <span className="font-serif italic">Aurelis Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
