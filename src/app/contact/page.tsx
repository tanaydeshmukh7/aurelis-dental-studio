import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ExternalLink, Car, Shield } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { CLINIC_CONTACT } from "@/data/studio";
import { SITE_METADATA } from "@/data/site";

export const metadata = {
  title: "Contact & Koregaon Park Studio Location | AURELIS Dental Studio Pune",
  description:
    "Find directions, hours, and concierge contact details for AURELIS Dental Studio in Koregaon Park, Pune. Reserved valet parking available.",
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${CLINIC_CONTACT.googleMapsQuery}`;
  const whatsappUrl = `https://wa.me/${CLINIC_CONTACT.whatsappNumber}?text=Hello%20Aurelis%20Dental%20Studio,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`;

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="STUDIO LOCATION & CONCIERGE"
          title="Koregaon Park, Pune."
          italicTitle="A peaceful destination."
          description="Conveniently situated amidst the heritage greenery of Koregaon Park. Designed for effortless arrival, reserved valet parking, and unhurried appointments."
          breadcrumbs={[{ label: "Contact" }]}
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
          imageAlt="Aurelis Studio reception in Koregaon Park"
          badge="VALET PARKING RESERVED"
        />

        {/* Demo Notice Banner */}
        <section className="bg-sand/40 border-b border-espresso/10 py-3.5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-xs text-taupe flex items-center justify-between flex-wrap gap-2">
            <span>
              <strong>Concept Notice:</strong> Address details and contact lines below are structured demo placeholders ready to be connected to verified clinic coordinates.
            </span>
          </div>
        </section>

        {/* Main Location Grid */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column Information */}
              <div className="lg:col-span-5 space-y-8 bg-sand/20 p-8 sm:p-10 border border-espresso/10 shadow-card">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold block mb-2">
                    STUDIO ADDRESS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-normal leading-snug">
                    {CLINIC_CONTACT.address.line1}
                  </h2>
                  <p className="text-sm text-taupe mt-1">
                    {CLINIC_CONTACT.address.line2}, {CLINIC_CONTACT.address.state}
                  </p>
                  <p className="text-xs text-taupe/90 mt-3 italic leading-relaxed">
                    {CLINIC_CONTACT.address.directionsNote}
                  </p>
                </div>

                <div className="pt-6 border-t border-espresso/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-espresso">
                    <Phone className="w-4 h-4 text-sage shrink-0" />
                    <span>{SITE_METADATA.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-espresso">
                    <Mail className="w-4 h-4 text-sage shrink-0" />
                    <span>{SITE_METADATA.email}</span>
                  </div>
                </div>

                {/* Studio Hours */}
                <div className="pt-6 border-t border-espresso/10">
                  <div className="flex items-center gap-2 text-sage text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Consultation Hours</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {CLINIC_CONTACT.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-espresso font-medium">{h.days}</span>
                        <span className="text-taupe">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Valet & Accessibility */}
                <div className="pt-6 border-t border-espresso/10 space-y-2 text-xs text-taupe">
                  <div className="flex items-center gap-2 font-medium text-espresso">
                    <Car className="w-4 h-4 text-sage" />
                    <span>Complimentary Valet Parking</span>
                  </div>
                  <p className="pl-6">
                    Valet service is available directly at our reception gate on Lane 7.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-espresso/10 flex flex-wrap gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sage"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-espresso text-espresso hover:bg-sand/40 text-xs uppercase tracking-[0.18em] font-medium transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Right Column Map & Arrival Visual */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-ivory border border-espresso/10 p-4 sm:p-6 shadow-card">
                  <div className="relative w-full h-80 sm:h-96 lg:h-[440px] bg-sand overflow-hidden">
                    <iframe
                      title="AURELIS Dental Studio Koregaon Park Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15131.644146011409!2d73.88565435000001!3d18.536754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c05763b65555%3A0xa971912f7a08b53e!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      className="w-full h-full border-0 filter grayscale-[0.25] contrast-[1.05]"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* Floating Map Card */}
                    <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm p-4 border border-espresso/15 shadow-md max-w-xs">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage">
                        Koregaon Park · Lane 7
                      </p>
                      <p className="font-serif text-sm font-medium text-espresso mt-0.5">
                        AURELIS Dental Studio
                      </p>
                      <p className="text-[11px] text-taupe mt-1">
                        Step-free ground level access with reserved parking.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-taupe px-1">
                    <span>Coordinates: 18.5367° N, 73.8958° E</span>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-espresso hover:text-sage font-medium transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Transit & Arrival Notes */}
                <div className="p-6 bg-sand/20 border border-espresso/10 text-xs text-taupe space-y-2">
                  <h3 className="font-serif text-sm font-semibold text-espresso">
                    Nearby Landmarks & Transit
                  </h3>
                  <p>
                    Located minutes from North Main Road, conveniently accessible from Kalyani Nagar (via Kalyani Nagar Bridge), Boat Club Road, and Pune International Airport (15-20 minutes by car).
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
