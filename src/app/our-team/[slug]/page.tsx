import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Award, Check, Sparkles } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { CLINIC_TEAM, TeamMember } from "@/data/team";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    slug: string;
  };
}

async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const staticMember = CLINIC_TEAM.find((m) => m.slug === slug);
  if (staticMember) return staticMember;

  try {
    const m = await prisma.teamMember.findUnique({
      where: { slug },
    });
    if (m) {
      return {
        slug: m.slug,
        name: m.name,
        role: m.role,
        category: "Clinical Leadership",
        isPlaceholder: false,
        qualificationsPlaceholder: m.qualifications,
        shortBio: m.bio,
        fullBio: [m.bio],
        responsibilities: ["Comprehensive Clinical Consultation", "Advanced Dental Protocol Delivery"],
        philosophy: m.bio,
        portraitImage: m.image,
        portraitAlt: m.name,
        relatedTreatments: [],
      };
    }
  } catch {}
  return null;
}

export async function generateStaticParams() {
  return CLINIC_TEAM.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getTeamMember(params.slug);
  if (!member) return { title: "Team Profile Not Found | AURELIS Dental Studio" };

  return {
    title: `${member.name} — ${member.role} | AURELIS Dental Studio Pune`,
    description: member.shortBio,
  };
}

export default async function SingleTeamMemberPage({ params }: Props) {
  const member = await getTeamMember(params.slug);
  if (!member) notFound();

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Our Team", href: "/our-team" },
              { label: member.name },
            ]}
          />

          {/* Profile Header Grid */}
          <div className="mt-8 bg-ivory border border-espresso/10 p-6 sm:p-10 lg:p-14 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-sand overflow-hidden shadow-card">
                <Image
                  src={member.portraitImage}
                  alt={member.portraitAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover filter contrast-[1.02]"
                />
                <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm px-3.5 py-1 border border-espresso/10 text-[10px] uppercase tracking-[0.2em] text-sage-dark font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  <span>{member.category}</span>
                </div>
              </div>

              {/* Template Verification Notice */}
              <div className="mt-6 p-4 bg-sand/30 border border-espresso/10 text-xs text-taupe leading-relaxed">
                <p>
                  <strong className="text-espresso">Design Demonstration Profile:</strong>{" "}
                  This record is structured as an editable placeholder representing the{" "}
                  <em>{member.role}</em> role. Verified doctor credentials, registration numbers, and formal affiliations will be updated upon final clinic launch.
                </p>
              </div>
            </div>

            {/* Right Column Details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-sage-dark font-semibold block mb-1">
                  Team Profile · Aurelis Dental Studio
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl text-espresso font-normal">
                  {member.name}
                </h1>

                <p className="mt-2 text-base text-taupe font-medium">
                  {member.role}
                </p>

                {/* Qualifications & State Registration Placeholder */}
                <div className="mt-6 p-4 sm:p-5 bg-sand/30 border-l-2 border-sage space-y-2">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-espresso font-medium">
                    <Award className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{member.qualificationsPlaceholder}</span>
                  </div>
                  {member.registrationPlaceholder && (
                    <div className="text-[11px] text-taupe pl-6">
                      {member.registrationPlaceholder}
                    </div>
                  )}
                </div>
              </div>

              {/* Full Biography */}
              <div className="space-y-4 text-base text-taupe leading-relaxed border-t border-espresso/10 pt-6">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-espresso">
                  Clinical Background & Experience
                </h2>
                {member.fullBio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Patient Care Philosophy */}
              <div className="border-t border-espresso/10 pt-6">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-espresso mb-2">
                  Approach to Patient Care
                </h2>
                <blockquote className="font-serif italic text-lg sm:text-xl text-espresso leading-relaxed border-l-2 border-sage pl-4">
                  &ldquo;{member.philosophy}&rdquo;
                </blockquote>
              </div>

              {/* Key Responsibilities / Clinical Focus */}
              <div className="border-t border-espresso/10 pt-6">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-espresso mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sage" />
                  <span>Key Responsibilities & Focus</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-espresso/90">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Treatments */}
              {member.relatedTreatments.length > 0 && (
                <div className="border-t border-espresso/10 pt-6">
                  <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-espresso mb-3">
                    Associated Clinical Disciplines
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {member.relatedTreatments.map((tr) => (
                      <Link
                        key={tr.slug}
                        href={`/treatments/${tr.slug}`}
                        className="px-4 py-2 border border-espresso/15 hover:border-sage text-xs uppercase tracking-[0.16em] text-espresso hover:text-sage-dark transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{tr.title}</span>
                        <ArrowUpRight className="w-3 h-3 text-sage" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-8 border-t border-espresso/10 flex flex-wrap items-center gap-4">
                <Link
                  href="/book-appointment"
                  className="px-8 py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage inline-flex items-center gap-2"
                >
                  <span>Book Consultation With Team</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/our-team"
                  className="px-6 py-3 border border-espresso/20 text-xs uppercase tracking-[0.18em] text-taupe hover:text-espresso hover:border-sage transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Team Members</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
