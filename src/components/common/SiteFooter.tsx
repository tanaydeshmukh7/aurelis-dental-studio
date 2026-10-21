import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { TREATMENTS } from "@/data/treatments";
import { CLINIC_CONTACT } from "@/data/studio";
import { SITE_METADATA } from "@/data/site";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#24221F] text-[#F0E9DF] pt-24 pb-14 border-t border-[#514A41] relative overflow-hidden">
      {/* Decorative hairline graphic with sage and champagne subtle accent */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sage/40 to-transparent mb-16" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-[#514A41]">
          
          {/* Brand & Editorial Statement (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <BrandLogo variant="light" showMark={true} />
              </div>

              <p className="font-serif italic text-lg text-sage-light mb-3">
                &ldquo;{SITE_METADATA.tagline}&rdquo;
              </p>

              <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm">
                A boutique dental studio in Koregaon Park dedicated to thoughtful oral
                health, biomimetic tooth preservation, and a calm, elevated patient
                experience.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#514A41] space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-white/80">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>
                  {CLINIC_CONTACT.address.line1}, {CLINIC_CONTACT.address.line2},{" "}
                  {CLINIC_CONTACT.address.state}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a href={`tel:${SITE_METADATA.phoneRaw}`} className="hover:text-sage transition-colors">
                  {SITE_METADATA.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a href={`mailto:${SITE_METADATA.email}`} className="hover:text-sage transition-colors">
                  {SITE_METADATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Treatments Navigation (Col 6-8) */}
          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold mb-6">
              Clinical Disciplines
            </p>
            <ul className="space-y-3 text-xs uppercase tracking-[0.15em] text-white/70 font-normal">
              {TREATMENTS.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{t.title}</span>
                    <span className="font-serif text-xs text-champagne opacity-70 group-hover:opacity-100">
                      {t.number}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/treatments"
                  className="text-sage hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <span>All Treatments Overview</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Multipage Directory (Col 9-10) */}
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold mb-6">
              The Studio
            </p>
            <ul className="space-y-3 text-xs uppercase tracking-[0.15em] text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-white transition-colors">
                  Our Team (10 Roles)
                </Link>
              </li>
              <li>
                <Link href="/patient-guide" className="hover:text-white transition-colors">
                  Patient Guide
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Studio Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews & Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sage hover:text-white transition-colors font-medium">
                  The Journal (Blog)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Map
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Action & Concierge (Col 11-12) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-sage font-semibold mb-6">
                Consultations
              </p>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Private, unhurried appointments in Koregaon Park.
              </p>
              <Link
                href="/book-appointment"
                className="w-full py-3 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium text-center block transition-colors shadow-sage"
              >
                Schedule Visit
              </Link>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                WhatsApp Concierge
              </span>
              <a
                href={`https://wa.me/${SITE_METADATA.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sage hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Demo Disclaimer, and Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/50">
          <div className="space-y-1">
            <p>
              © {currentYear} AURELIS Dental Studio. All rights reserved. Koregaon Park, Pune, Maharashtra.
            </p>
            <p className="text-[11px] text-white/40">
              High-end design agency concept for AURELIS Dental Studio. Demonstration clinic portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.18em] text-white/60">
            <Link href="/privacy" className="hover:text-sage transition-colors">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/terms" className="hover:text-sage transition-colors">
              Terms & Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/contact" className="hover:text-sage transition-colors">
              Valet & Access
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
