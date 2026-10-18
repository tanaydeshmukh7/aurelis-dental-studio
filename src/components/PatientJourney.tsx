"use client";

import { motion } from "framer-motion";
import { MessageSquare, ScanLine, FileText, HeartPulse } from "lucide-react";

export default function PatientJourney() {
  const steps = [
    {
      number: "01",
      title: "Start a conversation",
      description: "Tell us about your concerns and goals in our private consultation lounge.",
      detail: "No examination instruments upfront. An unhurried dialogue about your expectations and dental history.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Understand your options",
      description: "Discuss the examination findings and suitable treatment choices.",
      detail: "View high-definition 3D intraoral scans and photographic records together on our lounge screens.",
      icon: ScanLine,
    },
    {
      number: "03",
      title: "Plan with clarity",
      description: "Review the proposed care plan, fees, and next steps.",
      detail: "Transparent, written itemised roadmap detailing timeline, stages, and fee structures with zero ambiguity.",
      icon: FileText,
    },
    {
      number: "04",
      title: "Continue your care",
      description: "Receive appropriate guidance and follow-up recommendations.",
      detail: "Gentle post-care support, personalised preventive maintenance, and lifelong oral health continuity.",
      icon: HeartPulse,
    },
  ];

  return (
    <section id="journey" className="py-24 sm:py-32 bg-ivory border-t border-espresso/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1.5px] bg-sage" />
            <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
              THE PATIENT EXPERIENCE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
            A journey rooted in respect, <br className="hidden sm:block" />
            <span className="italic font-light">clarity, and ease.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-taupe font-normal leading-relaxed">
            We believe you should feel entirely informed, comfortable, and in control
            at every stage of your dental wellness journey.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[27px] left-8 right-8 h-[1px] bg-espresso/15 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-sand/20 border border-espresso/10 p-6 sm:p-8 flex flex-col justify-between group hover:border-sage/40 transition-all duration-300"
                >
                  <div>
                    {/* Top Step Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-ivory border border-espresso/10 flex items-center justify-center group-hover:border-sage transition-colors">
                        <IconComponent className="w-5 h-5 text-sage" />
                      </div>
                      <span className="font-serif text-2xl font-light text-taupe/70 group-hover:text-sage transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm font-medium text-espresso/90 mb-3">
                      {step.description}
                    </p>

                    <p className="text-xs text-taupe leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-espresso/10 flex items-center justify-between text-[11px] text-taupe">
                    <span className="font-serif italic">Step {step.number}</span>
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-sage">
                      Aurelis Standard
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
