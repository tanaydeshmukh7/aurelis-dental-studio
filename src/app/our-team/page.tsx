import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { CLINIC_TEAM } from "@/data/team";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "The Clinical Team & Leadership | AURELIS Dental Studio Pune",
  description:
    "Meet our team of dentists, specialists, hygienists, and patient concierges dedicated to thoughtful, unhurried dentistry in Koregaon Park, Pune.",
};

async function getTeamMembers() {
  try {
    const list = await prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (list && list.length > 0) {
      return list.map((m) => ({
        id: m.id,
        slug: m.slug,
        name: m.name,
        role: m.role,
        category: "Clinical Leadership",
        credentials: m.qualifications,
        specialty: m.role,
        shortBio: m.bio,
        fullBio: [m.bio],
        responsibilities: [m.role, "Clinical Precision"],
        philosophy: m.bio,
        portraitImage: m.image,
        portraitAlt: m.name,
      }));
    }
  } catch {}
  return CLINIC_TEAM;
}

export default async function TeamPage() {
  const team = await getTeamMembers();
  return (
    <div className="min-h-screen bg-[#DCD4C8] text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        {/* Team Hero Section */}
        <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#DCD4C8] border-b border-[#B8ADA0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "Our Team" }]} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column Typography */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-5 h-[1.5px] bg-sage" />
                  <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                    THE PEOPLE BEHIND THE CARE
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.75rem] text-espresso font-normal tracking-tight leading-[1.06]">
                  Good care starts with <br />
                  <span className="italic font-light text-espresso/90">
                    good people.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-taupe font-normal leading-relaxed max-w-xl">
                  A thoughtful team, working together to make every visit feel clear,
                  comfortable, and personal.
                </p>

                {/* Team Values Strip */}
                <div className="mt-10 pt-8 border-t border-[#B8ADA0] grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold block">
                      Philosophy
                    </span>
                    <p className="font-serif text-sm sm:text-base text-espresso mt-0.5">
                      Biomimetic Care
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold block">
                      Consultation
                    </span>
                    <p className="font-serif text-sm sm:text-base text-espresso mt-0.5">
                      Unhurried Cadence
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold block">
                      Location
                    </span>
                    <p className="font-serif text-sm sm:text-base text-espresso mt-0.5">
                      Koregaon Park, Pune
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column Team Composed Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-stone-dark overflow-hidden shadow-card border border-[#B8ADA0]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071823991-b9671e9d7f60?auto=format&fit=crop&w=1400&q=85"
                    alt="Aurelis clinical team collaborating in studio consultation space"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover filter contrast-[1.02] brightness-[0.96] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-serif italic text-base">
                      &ldquo;Every discipline unified under one roof for seamless care.&rdquo;
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage-light block mt-1">
                      Aurelis Collaborative Rounds · Koregaon Park
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Development Demo Notice Banner */}
        <section className="bg-[#CFC5B7] border-b border-[#B8ADA0] py-3.5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-xs text-taupe flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
              <span>
                <strong>Demonstration Profiles Notice:</strong> Profiles below represent
                all ten planned clinic roles as structured placeholders for design and layout evaluation. Verified doctor identities and state dental council registration numbers will be linked prior to public launch.
              </span>
            </div>
          </div>
        </section>

        {/* Full Team Grid (10 Roles) */}
        <section className="py-20 sm:py-28 bg-[#DCD4C8]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            
            <div className="max-w-3xl mb-14 sm:mb-16">
              <span className="text-[10px] uppercase tracking-[0.25em] text-taupe font-semibold block mb-2">
                PRACTICE ROSTER
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-espresso font-normal">
                Ten disciplines, one unified standard of care.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-taupe leading-relaxed">
                From restorative specialists to our patient concierges, every team member
                is dedicated to making your visit serene and clinically rigorous.
              </p>
            </div>

            {/* 4-Column Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member: any) => (
                <div
                  key={member.slug}
                  className="bg-[#CFC5B7] border border-[#B8ADA0] flex flex-col justify-between group hover:border-sage shadow-card transition-all duration-300"
                >
                  <div>
                    {/* Portrait Frame */}
                    <div className="relative aspect-[3/4] w-full bg-stone-dark overflow-hidden border-b border-[#B8ADA0]">
                      <Image
                        src={member.portraitImage}
                        alt={member.portraitAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02] brightness-[0.96]"
                      />
                      <div className="absolute top-3 left-3 bg-[#DCD4C8]/95 backdrop-blur-sm px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-sage-dark font-medium border border-[#B8ADA0]">
                        {member.category}
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal group-hover:text-sage-dark transition-colors">
                        <Link href={`/our-team/${member.slug}`}>
                          {member.name}
                        </Link>
                      </h3>

                      <p className="text-xs uppercase tracking-[0.14em] text-sage-dark font-medium mt-1 mb-3">
                        {member.role}
                      </p>

                      <p className="text-xs text-taupe leading-relaxed line-clamp-3">
                        {member.shortBio}
                      </p>

                      {/* Responsibilities Pill Highlights */}
                      <div className="mt-4 pt-3 border-t border-[#B8ADA0] space-y-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-taupe font-semibold block">
                          Key Clinical Focus
                        </span>
                        <p className="text-[11px] text-espresso/90 font-medium line-clamp-1">
                          {member.responsibilities?.[0] || member.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Profile Interaction */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/our-team/${member.slug}`}
                      className="w-full py-2.5 border border-[#B8ADA0] group-hover:border-sage text-xs uppercase tracking-[0.18em] font-medium text-espresso group-hover:bg-sage group-hover:text-white transition-all text-center block shadow-sm bg-stone-dark/30"
                    >
                      View Profile ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* How the Team Works Together Section */}
        <section className="py-20 sm:py-28 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-5 h-[1.5px] bg-sage" />
                  <span className="text-[11px] tracking-[0.25em] text-[#C6BCAE] uppercase font-semibold">
                    COLLABORATIVE MEDICINE
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#F0E9DF] font-normal tracking-tight">
                  How our team works together.
                </h2>
                <p className="mt-4 text-base text-[#C6BCAE] leading-relaxed">
                  Too often in dentistry, patients are referred from office to office,
                  repeating x-rays and retelling their history. At Aurelis, our clinical director,
                  orthodontist, implant surgeon, and hygienist review complex cases collaboratively.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-5 bg-[#24221F] border border-[#514A41] border-l-2 border-l-sage flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-base text-[#F0E9DF] font-normal">
                        Interdisciplinary Case Reviews
                      </h3>
                      <p className="text-xs text-[#C6BCAE] mt-1">
                        Digital 3D scans and facial records are reviewed jointly before complex aesthetic or implant cases begin.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#24221F] border border-[#514A41] border-l-2 border-l-sage flex items-start gap-3">
                    <HeartHandshake className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-base text-[#F0E9DF] font-normal">
                        Dedicated Patient Concierge Liaison
                      </h3>
                      <p className="text-xs text-[#C6BCAE] mt-1">
                        Your patient coordinator stays with you throughout your journey, coordinating schedules, follow-up calls, and financial transparency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] w-full bg-stone-dark overflow-hidden shadow-card border border-[#514A41]">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85"
                    alt="Clinical team in consultation discussion at Aurelis"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover filter contrast-[1.02] brightness-[0.96]"
                  />
                </div>
                <p className="text-right text-[11px] text-[#C6BCAE] mt-2 italic font-serif">
                  Behind the scenes · Aurelis Consultation Suite
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Communication and Patient Comfort Section */}
        <section className="py-20 bg-[#24221F] text-[#F0E9DF] border-t border-[#514A41]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sage font-semibold block">
              OUR CARE PROMISE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F0E9DF] font-normal">
              No rushed procedures. No intimidating jargon.
            </h2>
            <p className="text-base text-[#C6BCAE] max-w-2xl mx-auto leading-relaxed">
              Every appointment is scheduled with generous buffer intervals. We explain
              every step in simple, transparent terms, and we never proceed until you feel
              completely ready.
            </p>
            <div className="pt-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sage hover:bg-sage-dark text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors shadow-sage"
              >
                <span>Schedule a Private Consultation</span>
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
