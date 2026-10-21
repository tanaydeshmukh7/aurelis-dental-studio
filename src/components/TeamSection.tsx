import Image from "next/image";
import Link from "next/link";
import { LEAD_DOCTOR } from "@/data/team";
import { ShieldCheck, Award, Sparkles } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="team" className="py-24 sm:py-32 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1.5px] bg-sage" />
            <span className="text-[11px] tracking-[0.25em] text-[#C6BCAE] uppercase font-semibold">
              CLINICAL LEADERSHIP
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F0E9DF] font-normal tracking-tight">
            Guided by precision, <br className="hidden sm:block" />
            <span className="italic font-light">grounded in empathy.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#C6BCAE] leading-relaxed">
            Our practice is led by restorative clinicians dedicated to biomimetic tooth
            preservation and minimally invasive aesthetics.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="bg-[#24221F] border border-[#514A41] p-6 sm:p-10 lg:p-14 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-[#1C1A17] overflow-hidden shadow-card border border-[#514A41]">
              <Image
                src={LEAD_DOCTOR.portraitImage}
                alt={LEAD_DOCTOR.portraitAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover filter contrast-[1.02] brightness-[0.95]"
              />

              {/* Verified Placeholder Tag */}
              <div className="absolute top-4 left-4 bg-[#24221F]/95 backdrop-blur-sm px-3.5 py-1 border border-[#514A41] text-[10px] uppercase tracking-[0.2em] text-[#C6BCAE] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>Clinical Director Profile</span>
              </div>
            </div>

            {/* Verification Note for User & Clinic */}
            <div className="mt-4 p-3 bg-[#302D28] border border-[#514A41] text-[11px] text-[#C6BCAE] leading-snug">
              <span className="font-semibold text-[#F0E9DF]">Template Notice:</span>{" "}
              Doctor credentials shown below are structured demonstration placeholders. Verified doctor
              name, state registration number, and university degrees will be linked
              directly upon final clinic onboarding.
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-sage text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Lead Restorative Clinician</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F0E9DF] font-normal">
                {LEAD_DOCTOR.name}
              </h3>

              <p className="mt-2 text-sm text-[#C6BCAE] font-medium">
                {LEAD_DOCTOR.role}
              </p>

              {/* Qualifications & State Registration Placeholder Box */}
              <div className="mt-6 p-4 sm:p-5 bg-[#302D28] border-l-2 border-sage space-y-2 border-y border-r border-[#514A41]">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#F0E9DF] font-medium">
                  <Award className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>{LEAD_DOCTOR.qualificationsPlaceholder}</span>
                </div>
                <div className="text-[11px] text-[#C6BCAE] pl-6">
                  {LEAD_DOCTOR.registrationPlaceholder}
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="border-t border-[#514A41] pt-6">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6BCAE] font-semibold mb-2">
                Clinical Philosophy
              </h4>
              <p className="font-serif italic text-lg sm:text-xl text-[#F0E9DF] leading-relaxed">
                &ldquo;{LEAD_DOCTOR.philosophy}&rdquo;
              </p>
            </div>

            {/* Clinical Focus Areas */}
            <div className="border-t border-[#514A41] pt-6">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6BCAE] font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sage" />
                <span>Areas of Clinical Focus</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#F0E9DF]">
                {LEAD_DOCTOR.responsibilities.map((interest, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links to Our Team and Individual Profile */}
            <div className="border-t border-[#514A41] pt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/our-team/dr-lead-clinician"
                className="px-6 py-3 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
              >
                View Clinical Director Profile ↗
              </Link>
              <Link
                href="/our-team"
                className="px-6 py-3 border border-[#514A41] hover:border-sage text-xs uppercase tracking-[0.18em] text-[#C6BCAE] hover:text-[#F0E9DF] transition-colors bg-[#302D28]"
              >
                Meet All 10 Clinic Specialists ↗
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
