"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote, Star, ArrowUpRight } from "lucide-react";
import { DEMO_TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? DEMO_TESTIMONIALS.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === DEMO_TESTIMONIALS.length - 1 ? 0 : prevIdx + 1
    );
  };

  const item = DEMO_TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-ivory border-t border-espresso/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-espresso/10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                PATIENT EXPERIENCES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso font-normal tracking-tight">
              In their own words.
            </h2>
          </div>

          {/* Development Demo Notice Badge */}
          <div className="mt-4 sm:mt-0 bg-sand/50 px-3.5 py-1.5 border border-espresso/10 text-[10px] text-taupe uppercase tracking-[0.18em] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>Demo Review Showcase · Koregaon Park</span>
          </div>
        </div>

        {/* Testimonial Stage */}
        <div className="relative max-w-4xl mx-auto bg-sand/20 border border-espresso/10 p-8 sm:p-14 lg:p-16 shadow-subtle">
          
          <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-sage/40 mb-6" />

          {/* Stars in Champagne / Warm Gold Accent */}
          <div className="flex items-center gap-1 mb-6 text-champagne" aria-label="5 stars rating">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-champagne stroke-champagne" />
            ))}
          </div>

          {/* Big Editorial Quote */}
          <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl text-espresso font-light leading-snug tracking-tight min-h-[140px] sm:min-h-[120px] transition-opacity duration-300">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          {/* Author Details and Navigation Controls */}
          <div className="mt-10 pt-8 border-t border-espresso/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-lg sm:text-xl text-espresso font-normal">
                {item.author}
              </p>
              <div className="flex items-center gap-3 text-xs text-taupe mt-1">
                <span>{item.treatment}</span>
                <span className="w-1 h-1 rounded-full bg-sage" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous patient story"
                className="w-11 h-11 border border-espresso/20 flex items-center justify-center text-espresso hover:border-sage hover:text-sage transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Indicator */}
              <div className="text-xs uppercase tracking-[0.2em] font-serif text-taupe px-2">
                <span>{currentIndex + 1}</span>
                <span className="mx-1 opacity-50">/</span>
                <span>{DEMO_TESTIMONIALS.length}</span>
              </div>

              <button
                onClick={next}
                aria-label="Next patient story"
                className="w-11 h-11 border border-espresso/20 flex items-center justify-center text-espresso hover:border-sage hover:text-sage transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Link to Full Reviews Page */}
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors border-b border-espresso/20 pb-1"
          >
            <span>Read All Patient Stories & Submit Review</span>
            <ArrowUpRight className="w-4 h-4 text-sage" />
          </Link>
        </div>

      </div>
    </section>
  );
}
