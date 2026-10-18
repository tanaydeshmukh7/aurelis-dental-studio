import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { FAQS } from "@/data/faqs";

export const metadata = {
  title: "Patient Guide & First Visit | AURELIS Dental Studio Pune",
  description:
    "Everything you need to know before visiting our dental studio in Koregaon Park, Pune. Unhurried consultations, comfort amenities, and transparent planning.",
};

export default function PatientGuidePage() {
  const preparationTips = [
    {
      title: "Previous Dental Records (If Convenient)",
      description:
        "If you have recent dental radiographs (within the past 12 months) from a previous clinic, email them ahead or bring digital files. If not, our low-dose digital imaging captures everything needed seamlessly.",
    },
    {
      title: "Medical & Sensitivity Notes",
      description:
        "Jot down any medications, allergies, or past dental sensitivities. We take time to discuss these thoroughly before any clinical examination.",
    },
    {
      title: "Arrive 10 Minutes Ahead for Lounge Serenity",
      description:
        "Enjoy a fresh herbal infusion or chilled mineral water in our acoustic lounge to decompress before meeting your clinician.",
    },
    {
      title: "No Judgment, Ever",
      description:
        "Whether it has been six months or ten years since your last dental appointment, our studio is a guilt-free environment dedicated to your future wellness.",
    },
  ];

  const comfortAmenities = [
    { title: "Memory Foam Ergonomic Suites", desc: "Contoured pressure-relief patient seating for zero spinal tension." },
    { title: "Noise-Cancelling Headphones", desc: "Stream your favorite playlists, podcasts, or calming soundscapes." },
    { title: "Warm Herbal Infusions", desc: "Curated organic teas and refreshments served in the consultation lounge." },
    { title: "Ceiling Ambient Illumination", desc: "No blinding glaring lamps pointed straight at your eyes." },
    { title: "Topical Pre-Numbing Gels", desc: "Ensures local anaesthesia delivery is completely imperceptible." },
    { title: "Transparent Live Screen Sharing", desc: "View every scan and photo clearly on high-definition monitors." },
  ];

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="PATIENT GUIDE & COMFORT"
          title="Your visit, designed around"
          italicTitle="complete ease."
          description="We believe that fear of the dentist dissolves when appointments are unhurried, communication is transparent, and every detail honors your comfort."
          breadcrumbs={[{ label: "Patient Guide" }]}
          image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
          imageAlt="Aurelis clinician consulting a patient in a relaxed lounge"
          badge="KOREGAON PARK · PUNE"
        />

        {/* First Visit Roadmap */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-14">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block mb-2">
                THE 45-MINUTE CONSULTATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                What to expect during your first visit.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-taupe leading-relaxed">
                We never rush you directly into an operatory chair with instruments.
                Your appointment is divided into deliberate, respectful stages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-sand/20 border border-espresso/10 p-8 flex flex-col justify-between border-t-2 border-t-sage">
                <div>
                  <span className="font-serif text-3xl text-sage font-light block mb-3">
                    01
                  </span>
                  <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                    Lounge Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    Over a warm drink in our private lounge, we discuss your goals, past dental experiences, and any sensitivities.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-espresso/8 text-[11px] text-taupe">
                  Approx. 15 minutes
                </div>
              </div>

              <div className="bg-sand/20 border border-espresso/10 p-8 flex flex-col justify-between border-t-2 border-t-sage">
                <div>
                  <span className="font-serif text-3xl text-sage font-light block mb-3">
                    02
                  </span>
                  <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                    Gentle 3D Diagnostics
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    Optical intraoral scan, high-definition photography, and gentle periodontal screening with zero discomfort.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-espresso/8 text-[11px] text-taupe">
                  Approx. 15 minutes
                </div>
              </div>

              <div className="bg-sand/20 border border-espresso/10 p-8 flex flex-col justify-between border-t-2 border-t-sage">
                <div>
                  <span className="font-serif text-3xl text-sage font-light block mb-3">
                    03
                  </span>
                  <h3 className="font-serif text-xl text-espresso font-normal mb-2">
                    Review & Written Roadmap
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    We review the scans together on large screens, explaining options, timelines, and exact fees before any procedure begins.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-espresso/8 text-[11px] text-taupe">
                  Approx. 15 minutes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Tips Checklist */}
        <section className="py-20 bg-sand/30 border-y border-espresso/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block mb-2">
                BEFORE YOUR VISIT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                How to prepare.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {preparationTips.map((tip, i) => (
                <div key={i} className="bg-ivory p-6 sm:p-8 border border-espresso/10 shadow-subtle">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-lg text-espresso font-normal">
                        {tip.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-taupe leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comfort Amenities Showcase */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block mb-2">
                STUDIO AMENITIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                Thoughtful details for nervous patients.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {comfortAmenities.map((amenity, i) => (
                <div key={i} className="p-6 bg-sand/20 border border-espresso/8 space-y-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block mb-1" />
                  <h3 className="font-serif text-lg text-espresso font-normal">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-taupe leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Patient FAQs */}
        <section className="py-20 bg-sand/30 border-t border-espresso/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-taupe font-semibold block mb-2">
                COMMON INQUIRIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                First appointment questions.
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.slice(0, 4).map((faq) => (
                <div key={faq.id} className="p-6 bg-ivory border border-espresso/10">
                  <h3 className="font-serif text-lg text-espresso font-normal">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-taupe leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
              >
                <span>Reserve Your First Visit</span>
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
