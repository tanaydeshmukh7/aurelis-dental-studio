"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles, MapPin, ShieldCheck, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import BotanicalMeadow from "./hero/BotanicalMeadow";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked depth animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const headlineY = useTransform(scrollYProgress, [0, 0.75], [0, -35]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[94vh] lg:min-h-screen pt-28 sm:pt-32 pb-24 lg:pb-28 flex flex-col justify-between overflow-hidden bg-stone"
    >
      {/* ------------------------------------------------------------- */}
      {/* CINEMATIC ATMOSPHERIC PHOTOGRAPHIC BACKGROUND WITH PARALLAX   */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Soft, warm atmospheric landscape photography layer */}
        <div className="absolute inset-0 opacity-25 mix-blend-multiply">
          <Image
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=85"
            alt="Misty morning landscape with golden hour light in Koregaon Park"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Muted atmospheric gradient overlay: warm stone & deep taupe vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone via-stone/90 to-stone/95" />
        <div className="absolute top-0 right-0 w-3/4 sm:w-1/2 h-full bg-gradient-to-l from-stone-dark/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-champagne/15 via-sage/10 to-transparent blur-3xl opacity-60" />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN TWO-SIDED ASYMMETRIC EDITORIAL GRID                      */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Signature Editorial Headline & Actions */}
          <motion.div
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow Label with refined Sage accent */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2.5 mb-4 sm:mb-6"
            >
              <span className="w-6 h-[1.5px] bg-sage" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-taupe uppercase">
                AURELIS DENTAL STUDIO · KOREGAON PARK
              </span>
            </motion.div>

            {/* Oversized Signature Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
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
              Thoughtful dentistry. Beautifully natural results. Conceived as a calm
              architectural sanctuary dedicated to conservative enamel preservation and
              unhurried listening.
            </motion.p>

            {/* Action Buttons */}
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
                BOOK AN APPOINTMENT
              </button>

              <Link
                href="/treatments"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-espresso hover:text-sage-dark transition-colors py-3.5 px-5 border border-stone-border hover:border-sage bg-stone-dark/30 backdrop-blur-sm"
              >
                <span>EXPLORE TREATMENTS</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Supporting Brand Editorial Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 sm:mt-14 pt-6 border-t border-stone-border grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg"
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
          </motion.div>

          {/* Right Column: Editorial Photographic Composition with Cinematic Parallax */}
          <motion.div
            style={{ y: foregroundY }}
            className="lg:col-span-5 relative"
          >
            {/* Atmospheric Frame Layer with Soft Shadows and Warm Stone Border */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden border border-stone-border shadow-card bg-stone-dark">
              <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Aurelis Studio warm architectural sanctuary in Koregaon Park"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-center filter contrast-[0.98] brightness-[0.95]"
                />
                {/* Subtle warm stone gradient over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-stone/20" />
              </motion.div>

              {/* In-Frame Editorial Metadata Badge */}
              <div className="absolute top-4 right-4 bg-stone/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-espresso font-medium border border-stone-border shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>SANCTUARY SUITE · KOREGAON PARK</span>
              </div>

              {/* Lower In-Frame Editorial Philosophy Plaque */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-dark/95 backdrop-blur-md p-4 sm:p-5 border border-stone-border text-espresso">
                <div className="flex items-center gap-2 mb-1.5 text-sage">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-taupe">
                    Aurelis Approach
                  </span>
                </div>
                <p className="font-serif text-base sm:text-lg text-espresso italic leading-snug">
                  &ldquo;A more thoughtful approach to dentistry.&rdquo;
                </p>
                <p className="text-[11px] text-taupe mt-1">
                  Acoustic calm, biophilic materials, and sub-millimeter digital mapping.
                </p>
              </div>
            </div>

            {/* Subtle floating stone tag */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-stone p-3.5 border border-stone-border shadow-subtle items-center gap-3 max-w-[210px]">
              <div className="w-8 h-8 rounded-full bg-stone-dark flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-sage" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso">Private Cadence</p>
                <p className="text-[9px] text-taupe">No overlapping consultations</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NATURAL BOTANICAL MEADOW BASE WITH SOFT WILDFLOWERS           */}
      {/* ------------------------------------------------------------- */}
      <BotanicalMeadow />

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM EXPLORATION CUE & STUDIO CADENCE BAR                   */}
      {/* ------------------------------------------------------------- */}
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
          <span className="w-7 h-7 rounded-full border border-stone-border flex items-center justify-center group-hover:border-sage transition-colors bg-stone-dark/40 backdrop-blur-sm">
            <ArrowDown className="w-3.5 h-3.5 text-taupe group-hover:text-sage transition-colors animate-bounce" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
            Discover Studio Cadence
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-taupe/90 bg-stone-dark/50 px-3.5 py-1.5 border border-stone-border backdrop-blur-sm">
          <span>By Appointment Only</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          <span>Private Consultation Suites</span>
        </div>
      </motion.div>
    </section>
  );
}
