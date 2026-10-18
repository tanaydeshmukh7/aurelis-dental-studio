import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="approach" className="py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Feature Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                A DIFFERENT KIND OF DENTAL VISIT
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal leading-[1.12] tracking-tight">
              Care that puts you at ease.
            </h2>

            <div className="mt-8 space-y-6 text-taupe text-base sm:text-lg leading-relaxed">
              <p className="text-espresso font-normal text-lg sm:text-xl font-serif italic">
                &ldquo;Great dentistry is about more than a treatment. It is about
                listening, understanding your needs, and helping you make informed
                decisions about your oral health.&rdquo;
              </p>

              <p>
                Too often, dental environments evoke clinical chill, hurried appointments,
                and intimidating jargon. Aurelis was founded to introduce a tranquil,
                design-led sanctuary in Koregaon Park where time is taken to understand
                your aesthetic vision and clinical foundation.
              </p>

              <p>
                From the moment you arrive, you enter a private space calibrated around
                warmth, natural acoustics, and meticulous hygiene. We do not rush.
                Every option is shown on high-definition digital monitors, and every step
                moves at your comfort.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#journey"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors border-b border-espresso/20 pb-1"
              >
                <span>Get to Know Our Approach</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#studio"
                className="text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso transition-colors"
              >
                View The Studio Interior
              </a>
            </div>
          </div>

          {/* Right Column: Premium Clinic Interior with Vertical Caption */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto bg-sand overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural interior of AURELIS consultation lounge in Koregaon Park"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Vertical Editorial Caption Along Image Edge */}
              <div className="hidden sm:block absolute bottom-6 -right-1 origin-bottom-right rotate-90 translate-x-full text-[9px] uppercase tracking-[0.3em] text-taupe bg-ivory/95 backdrop-blur-sm px-3 py-1 border border-espresso/10">
                Koregaon Park Studio Lounge · Pune
              </div>
            </div>

            {/* Architectural detail inset */}
            <div className="mt-4 sm:mt-6 flex items-center justify-between text-xs text-taupe px-2">
              <span className="font-serif italic text-espresso">
                Acoustic isolation · Natural timber & stone
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-medium">
                Fig. 01 — Calm by Design
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
