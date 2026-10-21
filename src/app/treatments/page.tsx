import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TREATMENTS, Treatment } from "@/data/treatments";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Clinical Disciplines & Treatments | AURELIS Dental Studio Pune",
  description:
    "Explore our five signature restorative and cosmetic dental treatments in Koregaon Park, Pune. Precision aesthetics rooted in biological tooth preservation.",
};

async function getTreatments(): Promise<Treatment[]> {
  try {
    const list = await prisma.treatmentService.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    if (list && list.length > 0) {
      return list.map((t) => ({
        id: t.id,
        slug: t.slug,
        number: t.number,
        title: t.title,
        tagline: t.tagline,
        shortDesc: t.shortDesc,
        fullDesc: t.fullDesc,
        image: t.image,
        imageAlt: t.imageAlt,
        heroImage: t.heroImage,
        supportingImages: JSON.parse(t.supportingImagesJson || "[]") as string[],
        suitability: JSON.parse(t.suitabilityJson || "[]") as string[],
        benefits: JSON.parse(t.benefitsJson || "[]") as string[],
        timeline: t.timeline,
        approach: JSON.parse(t.approachJson || "[]") as string[],
        procedureStages: JSON.parse(t.procedureStagesJson || "[]") as { stage: string; title: string; description: string }[],
        idealFor: t.idealFor,
        faqs: JSON.parse(t.faqsJson || "[]") as { question: string; answer: string }[],
      }));
    }
  } catch {}
  return TREATMENTS;
}

export default async function TreatmentsOverviewPage() {
  const treatments = await getTreatments();
  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        {/* Page Hero */}
        <PageHero
          eyebrow="CLINICAL DISCIPLINES"
          title="Considered care."
          italicTitle="Confident smiles."
          description="Every clinical intervention is measured against biological longevity, enamel preservation, and your personal facial aesthetics. Explore our signature treatments below."
          breadcrumbs={[{ label: "Treatments" }]}
          image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
          imageAlt="Aurelis Dental Studio Treatment Suite in Koregaon Park"
          badge="KOREGAON PARK · PUNE"
        />

        {/* Treatment Philosophy Strip */}
        <section className="py-12 bg-sand/30 border-b border-espresso/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-dark block mb-1">
                Biomimetic Philosophy
              </span>
              <p className="font-serif text-lg text-espresso">Preserving Natural Enamel</p>
              <p className="text-xs text-taupe mt-1">
                We prioritize conservative adhesion over aggressive tooth preparation whenever clinically viable.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-dark block mb-1">
                Digital Precision
              </span>
              <p className="font-serif text-lg text-espresso">Sub-Millimeter 3D Mapping</p>
              <p className="text-xs text-taupe mt-1">
                High-definition optical impressions replace messy impression clays for unparalleled fit.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-dark block mb-1">
                Unhurried Cadence
              </span>
              <p className="font-serif text-lg text-espresso">No Overlapping Bookings</p>
              <p className="text-xs text-taupe mt-1">
                Each appointment is dedicated exclusively to you with zero rush and complete clinical focus.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed 5 Signature Treatments Stack */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
            {treatments.map((treatment, idx) => (
              <div
                key={treatment.id}
                id={treatment.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Column */}
                <div
                  className={`lg:col-span-6 relative ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-sand overflow-hidden shadow-card border border-espresso/8 group">
                    <Image
                      src={treatment.image}
                      alt={treatment.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                    />
                    <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm px-3.5 py-1 text-[11px] font-serif italic text-espresso border border-espresso/10">
                      Protocol {treatment.number}
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-serif text-3xl text-champagne font-light">
                        {treatment.number}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold">
                        {treatment.tagline}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                      {treatment.title}
                    </h2>

                    <p className="mt-4 text-base text-taupe leading-relaxed">
                      {treatment.fullDesc}
                    </p>

                    {/* Key Benefits Bulletpoints */}
                    <div className="mt-6 space-y-2">
                      {treatment.benefits.slice(0, 3).map((benefit, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-espresso/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-espresso/10 flex items-center justify-between text-xs text-taupe">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sage" />
                        <span>{treatment.timeline}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="px-6 py-3 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2 shadow-sage"
                    >
                      <span>Explore Full Protocol</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/book-appointment"
                      className="px-5 py-3 border border-espresso/20 hover:border-sage text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso transition-colors"
                    >
                      Consult for this Treatment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Callout */}
        <section className="py-20 bg-charcoal text-ivory text-center">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sage-light font-semibold block">
              INDIVIDUAL ASSESSMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Not sure which treatment is right for you?
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Every smile is unique. Our comprehensive initial consultation is dedicated
              to understanding your goals and presenting clear, biologically sound options.
            </p>
            <div className="pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sage hover:bg-sage-dark text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors shadow-sage"
              >
                <span>Reserve a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
