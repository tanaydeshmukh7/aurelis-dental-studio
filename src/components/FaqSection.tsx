"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";

export default function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0].id]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 sm:py-32 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column Header */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-[#C6BCAE] uppercase font-semibold">
                FREQUENTLY ASKED
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#F0E9DF] font-normal tracking-tight">
              Questions & <br className="hidden sm:block" />
              <span className="italic font-light">Considerations.</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-[#C6BCAE] leading-relaxed">
              We believe thorough answers build trust before you ever sit in our chair.
              If your question is not addressed here, our patient care team is readily available.
            </p>

            <div className="mt-8 p-5 bg-[#24221F] border border-[#514A41] border-l-2 border-l-sage">
              <p className="text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                Direct Patient Line
              </p>
              <p className="font-serif text-lg text-[#F0E9DF] mt-1">
                +91 (020) 2615-AURELIS
              </p>
              <p className="text-xs text-[#C6BCAE] mt-1">
                Available Mon–Sat, 9:30 AM to 7:30 PM IST · Koregaon Park
              </p>
            </div>
          </div>

          {/* Right Column Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#514A41]">
            {FAQS.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div key={faq.id} className="py-6 sm:py-7">
                  <h3>
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left flex items-start justify-between gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage py-1"
                    >
                      <span className="font-serif text-xl sm:text-2xl text-[#F0E9DF] group-hover:text-sage transition-colors font-normal leading-snug">
                        {faq.question}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-[#514A41] bg-[#24221F] shrink-0 flex items-center justify-center text-[#F0E9DF] group-hover:border-sage group-hover:text-sage transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 stroke-[1.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[1.5]" />
                        )}
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="mt-4 pr-10 text-sm sm:text-base text-[#C6BCAE] leading-relaxed animate-fade-in"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
