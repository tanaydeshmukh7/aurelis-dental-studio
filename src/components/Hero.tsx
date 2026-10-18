"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 flex flex-col justify-between overflow-hidden bg-ivory">
      {/* Subtle architectural background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sand/30" />
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-sand/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small uppercase eyebrow with sage accent */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2.5 mb-4 sm:mb-6"
            >
              <span className="w-6 h-[1.5px] bg-sage" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-taupe uppercase">
                CONTEMPORARY DENTISTRY · PUNE
              </span>
            </motion.div>

            {/* Large Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-espresso leading-[1.06] tracking-tight font-normal"
            >
              Confidence <br />
              <span className="italic font-light text-espresso/90">Looks Good</span> on You.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-taupe font-normal max-w-xl leading-relaxed"
            >
              Thoughtful dental care, modern techniques, and a more personal
              approach to your smile.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-8"
            >
              <button
                onClick={onOpenBooking}
                className="px-7 sm:px-9 py-4 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sage hover:shadow-card"
              >
                Book Your Visit
              </button>

              <a
                href="#studio"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors py-2"
              >
                <span>Discover the Studio</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Subtle Location & Ambience Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 sm:mt-16 pt-8 border-t border-espresso/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Location
                </p>
                <p className="mt-1 font-serif text-sm sm:text-base text-espresso">
                  Koregaon Park, Pune
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Philosophy
                </p>
                <p className="mt-1 font-serif text-sm sm:text-base text-espresso">
                  Biomimetic Health
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Consultation
                </p>
                <p className="mt-1 font-serif text-sm sm:text-base text-espresso">
                  Unhurried & Private
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait with Asymmetrical Overlap */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
            
            {/* Background Decorative Accent Box */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border border-champagne/35 pointer-events-none hidden sm:block" />

            {/* Main Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] bg-sand overflow-hidden shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85"
                alt="Natural, confident smile representing AURELIS Dental Studio"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                className="object-cover object-center filter saturate-[0.92] contrast-[1.02] hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

              {/* Subtle top badge inside image */}
              <div className="absolute top-4 right-4 bg-ivory/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-espresso font-medium border border-espresso/10 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>KOREGAON PARK · PUNE</span>
              </div>
            </motion.div>

            {/* Small Floating Information Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-ivory p-5 sm:p-6 shadow-float border border-espresso/8 max-w-[240px] sm:max-w-[280px]"
            >
              <div className="flex items-center gap-2 mb-1.5 text-sage">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-taupe">
                  Aurelis Approach
                </span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-espresso italic leading-snug">
                &ldquo;Your smile, considered.&rdquo;
              </p>
              <p className="text-[11px] text-taupe mt-1">
                Precision aesthetics rooted in healthy biological balance.
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-10 flex items-center justify-between text-xs text-taupe"
      >
        <a
          href="#trust"
          className="group inline-flex items-center gap-2.5 hover:text-espresso transition-colors"
          aria-label="Scroll to trust and introduction"
        >
          <span className="w-7 h-7 rounded-full border border-espresso/20 flex items-center justify-center group-hover:border-sage transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-taupe group-hover:text-sage transition-colors animate-bounce" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
            Explore Experience
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-taupe/80">
          <span>By Appointment Only</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          <span>Private Patient Suites</span>
        </div>
      </motion.div>
    </section>
  );
}
