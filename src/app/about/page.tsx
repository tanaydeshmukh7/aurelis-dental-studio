import Image from "next/image";
import Link from "next/link";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";

export const metadata = {
  title: "About the Studio | AURELIS Dental Studio Koregaon Park, Pune",
  description:
    "Learn about our design-led dental practice in Koregaon Park, Pune. Built around acoustic calm, biophilic materials, and biomimetic tooth preservation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="ABOUT AURELIS"
          title="Dentistry conceived as a"
          italicTitle="calm architectural sanctuary."
          description="Founded in Koregaon Park, Pune, Aurelis was designed to replace the clinical chill and rushed pace of traditional healthcare with unhurried listening, natural illumination, and biomimetic precision."
          breadcrumbs={[{ label: "About the Studio" }]}
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
          imageAlt="Aurelis Studio architectural lounge in Koregaon Park"
          badge="EST. PUNE, INDIA"
        />

        {/* The Architectural Vision Section */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-[1.5px] bg-sage" />
                  <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                    THE ARCHITECTURAL SPACE
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-espresso font-normal leading-tight">
                  Calm by design.
                </h2>
                <p className="text-base sm:text-lg text-taupe leading-relaxed">
                  Most dental anxiety originates before a patient even enters an operatory.
                  The harsh fluorescent lighting, the chemical scent of disinfectants, and the
                  high-pitched whine of air turbines trigger fight-or-flight stress.
                </p>
                <p className="text-base sm:text-lg text-taupe leading-relaxed">
                  We engineered Aurelis to eliminate those sensory triggers. We selected
                  fluted natural sandstone from Rajasthan, solid teak accents, acoustic wall
                  damping, and natural daylighting. Our consultation lounge feels like a private
                  library rather than a clinic waiting room.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-6 border-t border-espresso/10">
                  <div>
                    <h3 className="font-serif text-xl text-espresso">Acoustic Isolation</h3>
                    <p className="text-xs text-taupe mt-1">
                      Engineered wall dampening muffle procedural sounds completely.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-espresso">Hospital Clean Air</h3>
                    <p className="text-xs text-taupe mt-1">
                      Continuous laminar HEPA airflow filtration for total purity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] w-full bg-sand overflow-hidden shadow-card border border-espresso/8">
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                    alt="Biophilic warm stone and wood textures at Aurelis reception"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
                <p className="text-right text-[11px] text-taupe mt-2 italic font-serif">
                  Natural stone and warm oak reception · Koregaon Park
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* The Biomimetic Principle */}
        <section className="py-20 bg-sand/30 border-y border-espresso/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block mb-2">
                CLINICAL PRINCIPLES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                Biomimetic dentistry: Nature is the blueprint.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-taupe leading-relaxed">
                Biomimetic dentistry means &ldquo;mimicking nature.&rdquo; Traditional dentistry
                frequently removed healthy tooth structure to create mechanical retention for
                bulky crowns. Our philosophy is the reverse: we rebuild teeth using adhesive
                resins and ceramics that match the elasticity, flex, and strength of natural dentin and enamel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-ivory p-8 border border-espresso/10 shadow-subtle border-t-2 border-t-sage">
                <span className="font-serif text-3xl text-sage font-light block mb-3">01</span>
                <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                  Enamel Preservation
                </h3>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                  We treat natural enamel as non-renewable biological treasure. Every preparation is minimal-prep or no-prep whenever viable.
                </p>
              </div>

              <div className="bg-ivory p-8 border border-espresso/10 shadow-subtle border-t-2 border-t-sage">
                <span className="font-serif text-3xl text-sage font-light block mb-3">02</span>
                <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                  Adhesive Stress Absorption
                </h3>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                  Advanced multi-layer bonding agents absorb bite stress evenly, preventing catastrophic root fractures down the road.
                </p>
              </div>

              <div className="bg-ivory p-8 border border-espresso/10 shadow-subtle border-t-2 border-t-sage">
                <span className="font-serif text-3xl text-sage font-light block mb-3">03</span>
                <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                  Pulp Vitality Safeguards
                </h3>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                  By avoiding unnecessary tooth cutting and controlling thermal heat, we protect nerve vitality and avoid unnecessary root canals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Koregaon Park Neighborhood Section */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full bg-sand overflow-hidden shadow-card border border-espresso/10">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85"
                  alt="Tranquil lane setting in Koregaon Park Pune"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block">
                THE NEIGHBOURHOOD
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                Rooted in the calm of Koregaon Park.
              </h2>
              <p className="text-base text-taupe leading-relaxed">
                We chose Koregaon Park for its mature banyan canopies, heritage residential
                charm, and serene retreat from Pune&apos;s urban bustle. Visiting the studio
                feels like visiting a private sanctuary.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
                >
                  View Location & Directions
                </Link>
                <Link
                  href="/our-team"
                  className="px-6 py-3 border border-espresso/20 text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso hover:border-sage transition-colors"
                >
                  Meet Our Clinicians
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
