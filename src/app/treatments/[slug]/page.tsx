import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Sparkles, HelpCircle } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TREATMENTS, Treatment } from "@/data/treatments";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    slug: string;
  };
}

async function getTreatment(slug: string): Promise<Treatment | null> {
  const staticTreatment = TREATMENTS.find((t) => t.slug === slug);
  if (staticTreatment) return staticTreatment;

  try {
    const dbTreatment = await prisma.treatmentService.findUnique({
      where: { slug },
    });
    if (dbTreatment) {
      return {
        id: dbTreatment.id,
        slug: dbTreatment.slug,
        number: dbTreatment.number,
        title: dbTreatment.title,
        tagline: dbTreatment.tagline,
        shortDesc: dbTreatment.shortDesc,
        fullDesc: dbTreatment.fullDesc,
        image: dbTreatment.image,
        imageAlt: dbTreatment.imageAlt,
        heroImage: dbTreatment.heroImage,
        supportingImages: JSON.parse(dbTreatment.supportingImagesJson || "[]") as string[],
        suitability: JSON.parse(dbTreatment.suitabilityJson || "[]") as string[],
        benefits: JSON.parse(dbTreatment.benefitsJson || "[]") as string[],
        timeline: dbTreatment.timeline,
        approach: JSON.parse(dbTreatment.approachJson || "[]") as string[],
        procedureStages: JSON.parse(dbTreatment.procedureStagesJson || "[]") as { stage: string; title: string; description: string }[],
        idealFor: dbTreatment.idealFor,
        faqs: JSON.parse(dbTreatment.faqsJson || "[]") as { question: string; answer: string }[],
      };
    }
  } catch {}
  return null;
}

export async function generateStaticParams() {
  return TREATMENTS.map((treatment) => ({
    slug: treatment.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const treatment = await getTreatment(params.slug);
  if (!treatment) return { title: "Treatment Not Found | AURELIS Dental Studio" };

  return {
    title: `${treatment.title} Protocol | AURELIS Dental Studio Koregaon Park, Pune`,
    description: treatment.shortDesc,
    openGraph: {
      title: `${treatment.title} — AURELIS Dental Studio Pune`,
      description: treatment.fullDesc,
      images: [treatment.image],
    },
  };
}

export default async function SingleTreatmentProtocolPage({ params }: Props) {
  const treatment = await getTreatment(params.slug);
  if (!treatment) notFound();

  const otherTreatments = TREATMENTS.filter((t) => t.slug !== treatment.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb Navigation & Header */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Treatments", href: "/treatments" },
              { label: treatment.title },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Header Details */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif text-[#66866D] text-2xl font-light">
                  {treatment.number}
                </span>
                <span className="text-[11px] tracking-[0.25em] text-[#514A42] uppercase font-semibold">
                  TREATMENT PROTOCOL
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] text-[#28231F] font-normal tracking-tight leading-[1.08]">
                {treatment.title}
              </h1>

              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#66866D] font-medium">
                {treatment.tagline}
              </p>

              <p className="mt-6 text-base sm:text-lg text-[#514A42] leading-relaxed max-w-xl">
                {treatment.fullDesc}
              </p>

              {/* Quick Spec Highlights */}
              <div className="mt-8 pt-6 border-t border-[#B8ADA0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#514A42]">
                <div>
                  <span className="font-semibold text-[#28231F] block mb-0.5">
                    Estimated Cadence:
                  </span>
                  <span>{treatment.timeline}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#28231F] block mb-0.5">
                    Ideal Candidate:
                  </span>
                  <span>{treatment.idealFor}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/book-appointment"
                  className="px-8 py-4 bg-[#66866D] hover:bg-[#86A58C] active:bg-[#66866D] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage inline-flex items-center gap-2"
                >
                  <span>Book Consultation for {treatment.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/treatments"
                  className="px-5 py-3.5 border border-[#B8ADA0] text-xs uppercase tracking-[0.18em] text-[#514A42] hover:text-[#28231F] hover:border-[#66866D] transition-colors"
                >
                  All Treatments
                </Link>
              </div>
            </div>

            {/* Dedicated Hero Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-[#CFC5B7] overflow-hidden shadow-card border border-[#B8ADA0]">
                <Image
                  src={treatment.heroImage}
                  alt={treatment.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover filter contrast-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#24221F]/90 backdrop-blur-md p-3.5 text-[#F0E9DF] text-xs font-serif italic border border-[#514A41]">
                  AURELIS · {treatment.title} Clinical Standard
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Benefits & Suitability Grid */}
        <section className="mt-20 py-16 bg-[#CFC5B7]/60 border-y border-[#B8ADA0]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Benefits */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#66866D] font-semibold block mb-2">
                  CLINICAL ADVANTAGES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#28231F] font-normal mb-6">
                  Why patients choose this approach.
                </h2>
                <div className="space-y-3.5">
                  {treatment.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#28231F]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#66866D] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitability Checklist */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#66866D] font-semibold block mb-2">
                  INDICATIONS & SUITABILITY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#28231F] font-normal mb-6">
                  Common considerations.
                </h2>
                <div className="space-y-3.5">
                  {treatment.suitability.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#28231F]/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#66866D] mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-[#DCD4C8] border border-[#B8ADA0] text-xs text-[#514A42] border-l-2 border-l-[#66866D]">
                  * Note: Exact suitability is determined during a full 3D diagnostic scan and private clinical examination at our Koregaon Park studio.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Multi-Stage Clinical Procedure Roadmap */}
        <section className="py-20 sm:py-28 bg-[#DCD4C8]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#514A42] font-semibold block mb-2">
                THE CLINICAL PROTOCOL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#28231F] font-normal">
                How we deliver {treatment.title}.
              </h2>
              <p className="mt-3 text-sm text-[#514A42] leading-relaxed">
                Step-by-step clarity with zero ambiguity about what to expect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {treatment.procedureStages.map((st) => (
                <div
                  key={st.stage}
                  className="bg-[#CFC5B7]/60 border border-[#B8ADA0] p-6 flex flex-col justify-between hover:border-[#66866D]/50 transition-colors shadow-subtle"
                >
                  <div>
                    <span className="font-serif text-xs text-[#66866D] font-medium block mb-2">
                      {st.stage}
                    </span>
                    <h3 className="font-serif text-xl text-[#28231F] font-normal mb-3">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#514A42] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supporting Photographic Section */}
        {treatment.supportingImages.length > 0 && (
          <section className="py-16 bg-[#CFC5B7]/40 border-t border-[#B8ADA0]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {treatment.supportingImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] w-full bg-[#CFC5B7] overflow-hidden shadow-subtle border border-[#B8ADA0]"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${treatment.title} clinical interior environment`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover filter contrast-[1.02]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Clinical FAQs for this Treatment */}
        {treatment.faqs.length > 0 && (
          <section className="py-20 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
            <div className="max-w-4xl mx-auto px-5 sm:px-8">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#86A58C] font-semibold block mb-2">
                  FREQUENT QUESTIONS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F0E9DF] font-normal">
                  Common inquiries about {treatment.title}.
                </h2>
              </div>

              <div className="space-y-6">
                {treatment.faqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-[#24221F] border border-[#514A41] border-l-2 border-l-[#86A58C]">
                    <h3 className="font-serif text-xl text-[#F0E9DF] font-normal flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#86A58C] shrink-0 mt-1" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="mt-3 text-sm text-[#C6BCAE] leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Treatments Navigation */}
        <section className="py-20 bg-[#CFC5B7]/50 border-t border-[#B8ADA0]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-[#28231F] font-normal">
                Other Signature Disciplines
              </h3>
              <Link
                href="/treatments"
                className="text-xs uppercase tracking-[0.18em] text-[#28231F] hover:text-[#66866D] transition-colors"
              >
                View All Treatments ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherTreatments.map((ot) => (
                <div
                  key={ot.slug}
                  className="bg-[#DCD4C8] border border-[#B8ADA0] p-6 flex flex-col justify-between group hover:border-[#66866D] transition-all shadow-card"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#CFC5B7] mb-4">
                      <Image
                        src={ot.image}
                        alt={ot.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="font-serif text-xs text-[#66866D] font-light">
                      Protocol {ot.number}
                    </span>
                    <h4 className="font-serif text-xl text-[#28231F] font-normal group-hover:text-[#66866D] transition-colors mt-1">
                      <Link href={`/treatments/${ot.slug}`}>{ot.title}</Link>
                    </h4>
                    <p className="mt-2 text-xs text-[#514A42] line-clamp-2">
                      {ot.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#B8ADA0]/60">
                    <Link
                      href={`/treatments/${ot.slug}`}
                      className="text-xs uppercase tracking-[0.18em] font-medium text-[#28231F] group-hover:text-[#66866D] inline-flex items-center gap-1"
                    >
                      <span>Explore Treatment</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#66866D]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
