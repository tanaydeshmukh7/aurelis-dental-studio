import { CLINIC_CONTACT } from "@/data/studio";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${CLINIC_CONTACT.googleMapsQuery}`;
  const whatsappUrl = `https://wa.me/${CLINIC_CONTACT.whatsappNumber}?text=Hello%20Aurelis%20Dental%20Studio,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#DCD4C8] border-t border-[#B8ADA0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1.5px] bg-sage" />
            <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
              THE STUDIO LOCATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
            Koregaon Park, Pune. <br />
            <span className="italic font-light">A peaceful destination.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-taupe leading-relaxed">
            Conveniently positioned in one of Pune&apos;s most verdant and tranquil
            neighbourhoods, designed for effortless arrival and unhurried appointments.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-10 p-4 bg-[#CFC5B7] border border-[#B8ADA0] flex items-center justify-between text-xs text-taupe">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>
              <strong className="text-espresso">Studio Address:</strong> Lane 7, Koregaon Park, Pune. Valet parking provided at reception forecourt.
            </span>
          </span>
        </div>

        {/* Main Grid: Info + Interactive Maps Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Contact & Hours Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#CFC5B7] p-8 sm:p-10 border border-[#B8ADA0] shadow-card">
            
            <div className="space-y-6">
              {/* Address */}
              <div>
                <div className="flex items-center gap-2 text-sage text-xs uppercase tracking-[0.18em] font-semibold mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Studio Address</span>
                </div>
                <p className="font-serif text-lg sm:text-xl text-espresso font-normal leading-snug">
                  {CLINIC_CONTACT.address.line1}
                </p>
                <p className="text-sm text-taupe mt-0.5">
                  {CLINIC_CONTACT.address.line2}, {CLINIC_CONTACT.address.state}
                </p>
                <p className="text-xs text-taupe mt-2 italic leading-relaxed">
                  {CLINIC_CONTACT.address.directionsNote}
                </p>
              </div>

              {/* Clinic Timings */}
              <div className="pt-6 border-t border-[#B8ADA0]">
                <div className="flex items-center gap-2 text-sage text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Studio Hours</span>
                </div>
                <div className="space-y-2">
                  {CLINIC_CONTACT.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-espresso font-medium">{h.days}</span>
                      <span className="text-taupe">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Channels */}
              <div className="pt-6 border-t border-[#B8ADA0] space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-espresso">
                  <Phone className="w-4 h-4 text-sage shrink-0" />
                  <span>{CLINIC_CONTACT.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-espresso">
                  <Mail className="w-4 h-4 text-sage shrink-0" />
                  <span>{CLINIC_CONTACT.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="pt-6 border-t border-[#B8ADA0] flex flex-wrap gap-4">
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
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#B8ADA0] text-espresso hover:border-sage hover:text-sage-dark hover:bg-stone-dark/30 text-xs uppercase tracking-[0.18em] font-medium transition-colors bg-stone/40"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Interactive Map Visual Frame */}
          <div className="lg:col-span-7 bg-[#CFC5B7] border border-[#B8ADA0] p-4 sm:p-6 shadow-card flex flex-col justify-between">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] bg-stone-dark overflow-hidden border border-[#B8ADA0]">
              <iframe
                title="AURELIS Dental Studio Koregaon Park Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15131.644146011409!2d73.88565435000001!3d18.536754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c05763b65555%3A0xa971912f7a08b53e!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale-[0.3] contrast-[1.05]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-[#DCD4C8]/95 backdrop-blur-sm p-3.5 border border-[#B8ADA0] shadow-md max-w-xs">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sage-dark flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  <span>Koregaon Park, Pune</span>
                </p>
                <p className="font-serif text-sm font-medium text-espresso mt-0.5">
                  AURELIS Dental Studio
                </p>
                <p className="text-[11px] text-taupe mt-0.5">
                  Valet parking available at reception gate
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-taupe px-1 pt-2">
              <span>Coordinates: 18.5367° N, 73.8958° E</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-sage-dark"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-sage" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
