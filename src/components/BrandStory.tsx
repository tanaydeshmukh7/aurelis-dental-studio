import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Eye, Sparkles } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="story" className="py-24 sm:py-32 bg-ivory border-t border-espresso/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Feature Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                THE AURELIS PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal leading-[1.08] tracking-tight">
              Dentistry, with a <br />
              <span className="italic font-light text-espresso/90">little more thought.</span>
            </h2>

            <div className="mt-8 space-y-6 text-taupe text-base sm:text-lg leading-relaxed">
              <p className="text-espresso font-normal text-lg sm:text-xl font-serif italic border-l-2 border-sage/70 pl-5">
                &ldquo;Great dentistry is about more than an intervention. It is about
                listening deeply, understanding your personal facial harmony, and crafting
                outcomes that protect your natural biological balance.&rdquo;
              </p>

              <p>
                Too often, dental visits evoke clinical chill, hurried appointments, and
                opaque treatment recommendations. Aurelis was designed from the ground up as a
                peaceful sanctuary in Koregaon Park where appointments are unhurried, private,
                and measured.
              </p>

              <p>
                From gentle preventive hygiene to complex smile design, every treatment
                protocol is planned collaboratively with high-definition digital 3D scans and zero
                surprises. We dedicate our full clinical focus to one patient at a time.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 py-6 border-y border-espresso/10">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sand/60 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-sage-dark" />
                </span>
                <div>
                  <h4 className="font-serif text-base text-espresso">Personalized Attention</h4>
                  <p className="text-xs text-taupe mt-0.5">Individual consultation rooms without overlapping bookings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sand/60 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-dark" />
                </span>
                <div>
                  <h4 className="font-serif text-base text-espresso">Preventive Preservation</h4>
                  <p className="text-xs text-taupe mt-0.5">Biomimetic techniques that prioritize natural enamel longevity.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors border-b border-espresso/20 pb-1"
              >
                <span>Read Our Full Story</span>
                <ArrowUpRight className="w-4 h-4 text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/patient-guide"
                className="text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso transition-colors"
              >
                What to Expect on Your First Visit
              </Link>
            </div>
          </div>

          {/* Right Column: Serene Architectural Interior */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto bg-sand overflow-hidden shadow-card border border-espresso/8 group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural interior of AURELIS consultation lounge in Koregaon Park"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Vertical Editorial Caption Along Image Edge */}
              <div className="hidden sm:block absolute bottom-6 -right-1 origin-bottom-right rotate-90 translate-x-full text-[9px] uppercase tracking-[0.3em] text-taupe bg-white/95 backdrop-blur-sm px-3 py-1 border border-espresso/10">
                Koregaon Park Studio Lounge · Pune
              </div>
            </div>

            {/* Architectural detail footnote */}
            <div className="mt-4 sm:mt-6 flex items-center justify-between text-xs text-taupe px-2">
              <span className="font-serif italic text-espresso">
                Acoustic isolation · Natural timber &amp; warm lighting
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-medium">
                Serene Healthcare Space
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
