"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PearlescentToothScene from "./hero/PearlescentToothScene";
import BotanicalMeadow from "./hero/BotanicalMeadow";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[95vh] lg:min-h-screen pt-28 sm:pt-32 pb-24 lg:pb-32 flex flex-col justify-between overflow-hidden bg-ivory">
      {/* Soft Atmospheric Sky & Golden Hour Ambient Illumination */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft morning sun gradient in upper right behind the tooth */}
        <div className="absolute top-0 right-0 w-3/4 sm:w-1/2 h-full bg-gradient-to-b from-[#FFFDF9] via-sand/20 to-transparent" />
        <div className="absolute top-16 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-champagne/15 via-sage/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-sand/30 blur-3xl opacity-60" />
      </div>

      {/* Main Two-Sided Asymmetric Content Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2.5 mb-4 sm:mb-6"
            >
              <span className="w-6 h-[1.5px] bg-sage" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-taupe uppercase">
                AURELIS DENTAL STUDIO · PUNE
              </span>
            </motion.div>

            {/* Oversized Signature Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] text-espresso leading-[0.98] tracking-tight font-normal uppercase"
            >
              CONFIDENCE <br />
              <span className="italic font-light text-espresso/90 lowercase">begins with</span> <br />
              YOUR SMILE.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-taupe font-normal max-w-xl leading-relaxed"
            >
              Thoughtful dentistry. Beautifully natural results. Directing aesthetic
              rehabilitation and comprehensive health amidst the serene greenery of Koregaon Park.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <button
                onClick={onOpenBooking}
                className="px-8 sm:px-10 py-4 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sage hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                Book an Appointment
              </button>

              <Link
                href="/treatments"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors py-3.5 px-4 border border-espresso/15 hover:border-sage bg-white/50 backdrop-blur-sm"
              >
                <span>Explore Treatments</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Supporting Brand Editorial Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 sm:mt-14 pt-6 border-t border-espresso/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Location
                </p>
                <p className="mt-0.5 font-serif text-sm sm:text-base text-espresso">
                  Koregaon Park, Pune
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Philosophy
                </p>
                <p className="mt-0.5 font-serif text-sm sm:text-base text-espresso">
                  Biomimetic Health
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
                  Cadence
                </p>
                <p className="mt-0.5 font-serif text-sm sm:text-base text-espresso">
                  Unhurried &amp; Private
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Signature 3D Pearlescent Tooth Experience */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-radial from-champagne/15 via-sand/20 to-transparent rounded-full filter blur-3xl pointer-events-none" />

            {/* Interactive 3D Pearlescent Enamel Tooth */}
            <PearlescentToothScene />

            {/* Floating Editorial Narrative Plaque */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 sm:bottom-4 left-0 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 border border-espresso/10 shadow-float max-w-[240px] sm:max-w-[270px] z-20 pointer-events-none"
            >
              <div className="flex items-center gap-1.5 text-sage mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-taupe">
                  Aurelis Signature
                </span>
              </div>
              <p className="font-serif text-base sm:text-lg text-espresso italic leading-snug">
                &ldquo;A more thoughtful approach to dentistry.&rdquo;
              </p>
              <p className="text-[10px] text-taupe mt-1">
                Preserving biological enamel with sub-millimeter digital mapping.
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Natural Landscape: Botanical Wildflowers, Grass Blades & Fluttering Butterflies */}
      <BotanicalMeadow />

      {/* Bottom Exploration Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-6 relative z-30 flex items-center justify-between text-xs text-taupe"
      >
        <a
          href="#story"
          className="group inline-flex items-center gap-2.5 hover:text-espresso transition-colors"
          aria-label="Scroll to introduction and philosophy"
        >
          <span className="w-7 h-7 rounded-full border border-espresso/20 flex items-center justify-center group-hover:border-sage transition-colors bg-white/60 backdrop-blur-sm">
            <ArrowDown className="w-3.5 h-3.5 text-taupe group-hover:text-sage transition-colors animate-bounce" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
            Discover Studio Cadence
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-taupe/80 bg-white/40 px-3 py-1 border border-espresso/5 backdrop-blur-sm">
          <span>By Appointment Only</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          <span>Private Consultation Suites</span>
        </div>
      </motion.div>
    </section>
  );
}
