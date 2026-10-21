import Link from "next/link";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | AURELIS Dental Studio Pune",
  description:
    "How AURELIS Dental Studio protects, collects, and respects your medical and personal privacy in Koregaon Park, Pune.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Lock,
      title: "1. Medical Confidentiality & Health Records",
      content:
        "All patient clinical records, digital radiographs, intraoral 3D scans, and treatment plans are securely stored in compliance with Indian medical data protection standards and ethical healthcare regulations. Clinical data is accessible solely by your designated dental team for the express purpose of providing continuity of oral care.",
    },
    {
      icon: Eye,
      title: "2. Personal Contact Information",
      content:
        "When you schedule a consultation or submit an inquiry through our digital concierge, we collect your name, phone number, email address, and visit preferences. This data is exclusively used to coordinate appointments, send reminders, and provide post-care check-ins. We never sell, lease, or monetize your contact information.",
    },
    {
      icon: ShieldCheck,
      title: "3. Digital Security & Encryption",
      content:
        "Our digital infrastructure utilizes industry-standard TLS encryption for all data in transit. Consultation reservation forms and communication liaisons adhere to stringent security protocols to safeguard your inquiries against unauthorized access.",
    },
    {
      icon: FileText,
      title: "4. Your Data Rights & Communication Preferences",
      content:
        "You retain complete autonomy over your communication preferences. You may request copies of your dental charts and imaging records or opt out of non-essential clinical follow-ups at any time by speaking with our clinic concierge or emailing concierge@aurelisdental.in.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="LEGAL & TRANSPARENCY"
          title="Patient Privacy &"
          italicTitle="Data Protection"
          description="At AURELIS Dental Studio, patient trust is paramount. We hold your personal health information to the most rigorous ethical and clinical confidentiality standards."
          breadcrumbs={[{ label: "Privacy Policy" }]}
          image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
          imageAlt="Aurelis Studio patient privacy and consultation space in Pune"
        />

        <section className="py-20 lg:py-28 max-w-4xl mx-auto px-5 sm:px-8">
          <div className="space-y-12">
            <div className="border-b border-[#B8ADA0] pb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#66866D] font-medium">
                Effective Date: October 2026
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#28231F] font-light mt-2">
                Our Commitment to Discretion & Security
              </h2>
              <p className="text-sm sm:text-base text-[#514A42] leading-relaxed mt-4">
                This policy outlines our procedures regarding the collection, use, and protection
                of health records and inquiries collected through our Koregaon Park clinic and website.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <div key={idx} className="bg-[#CFC5B7]/60 border border-[#B8ADA0] p-6 sm:p-8 space-y-4 shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#66866D]/15 rounded-full flex items-center justify-center text-[#66866D] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#28231F] font-light">
                        {sec.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#514A42] leading-relaxed pl-12">
                      {sec.content}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#CFC5B7]/80 p-8 border border-[#B8ADA0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-card">
              <div>
                <h4 className="font-serif text-xl text-[#28231F] font-light">
                  Questions regarding your privacy?
                </h4>
                <p className="text-xs sm:text-sm text-[#514A42] mt-1">
                  Our studio director is available to answer any questions about clinical records.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#66866D] hover:bg-[#86A58C] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shrink-0 shadow-sm"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
