import Link from "next/link";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { Clock, CheckCircle2, AlertCircle, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Terms of Care & Clinical Policies | AURELIS Dental Studio Pune",
  description:
    "Patient care agreement, consultation protocols, and appointment guidelines at AURELIS Dental Studio in Koregaon Park, Pune.",
};

export default function TermsPage() {
  const termsList = [
    {
      icon: Clock,
      title: "1. Dedicated Appointment Time",
      desc: "Each consultation suite is reserved exclusively for one patient at a time to ensure unhurried, thorough care. We request 24 hours advance notice if you need to reschedule or alter your consultation reservation.",
    },
    {
      icon: CheckCircle2,
      title: "2. Comprehensive Diagnosis & Informed Consent",
      desc: "Before any clinical procedure is undertaken, our dentists provide a detailed discussion of treatment alternatives, clinical benefits, and transparent itemized fee schedules. No treatment proceeds without your explicit informed consent.",
    },
    {
      icon: HeartHandshake,
      title: "3. Preventative Post-Care & Guarantees",
      desc: "High-grade restorative work (including ceramic veneers, crowns, and clear aligners) is crafted with world-class dental laboratories. Routine 6-month preventive check-ups support optimal longevity and restoration integrity.",
    },
    {
      icon: AlertCircle,
      title: "4. Demo Portfolio Notice",
      desc: "This website serves as a contemporary design agency concept demonstrating the digital identity and architectural presentation of AURELIS Dental Studio. Clinical biographies and demo case studies represent exemplary portfolio standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="STANDARDS OF PRACTICE"
          title="Terms of Care &"
          italicTitle="Clinical Guidelines"
          description="Clear standards designed to respect your time, ensure medical excellence, and cultivate a serene clinical relationship."
          breadcrumbs={[{ label: "Terms of Care" }]}
          image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Aurelis Studio patient reception and clinical guidelines in Pune"
        />

        <section className="py-20 lg:py-28 max-w-4xl mx-auto px-5 sm:px-8">
          <div className="space-y-12">
            <div className="border-b border-[#B8ADA0] pb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#66866D] font-medium">
                Clinical Practice Guidelines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#28231F] font-light mt-2">
                Mutual Respect & Excellence in Care
              </h2>
              <p className="text-sm sm:text-base text-[#514A42] leading-relaxed mt-4">
                Our philosophy prioritizes patient autonomy, comfort, and transparent medical communication.
                The following standards ensure each visit meets our studio&apos;s high benchmarks.
              </p>
            </div>

            <div className="space-y-8">
              {termsList.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-[#CFC5B7]/60 border border-[#B8ADA0] p-6 sm:p-8 space-y-3 shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#66866D]/15 rounded-full flex items-center justify-center text-[#66866D] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#28231F] font-light">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#514A42] leading-relaxed pl-12">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#CFC5B7]/80 p-8 border border-[#B8ADA0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-card">
              <div>
                <h4 className="font-serif text-xl text-[#28231F] font-light">
                  Ready to experience our approach?
                </h4>
                <p className="text-xs sm:text-sm text-[#514A42] mt-1">
                  Schedule your comprehensive 45-minute clinical evaluation in Koregaon Park.
                </p>
              </div>
              <Link
                href="/book-appointment"
                className="px-6 py-3 bg-[#66866D] hover:bg-[#86A58C] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shrink-0 shadow-sm"
              >
                Book Your Visit
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
