"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowUpRight, Phone, MapPin, X } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { MAIN_NAV_ITEMS, SITE_METADATA } from "@/data/site";
import { TREATMENTS } from "@/data/treatments";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal?: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenBookingModal }: MobileMenuProps) {
  const pathname = usePathname();
  const [treatmentsExpanded, setTreatmentsExpanded] = useState(false);

  // Lock body scroll only when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  // If not open, completely unmount from DOM so it NEVER blocks clicks on elements underneath
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Overlay"
      className="fixed inset-0 z-[60] bg-stone flex flex-col justify-between overflow-y-auto animate-fade-in text-espresso"
    >
      {/* Top Header Bar inside Drawer */}
      <div className="sticky top-0 bg-stone/95 backdrop-blur-md z-20 px-6 sm:px-8 py-4 sm:py-5 border-b border-stone-border flex items-center justify-between">
        <BrandLogo variant="dark" showMark={true} onClick={onClose} />

        {/* Close Button with generous touch target */}
        <button
          onClick={onClose}
          className="w-11 h-11 border border-stone-border flex items-center justify-center text-espresso hover:bg-espresso hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* Main Drawer Scrollable Content */}
      <div className="px-6 sm:px-8 py-6 flex-1 flex flex-col justify-between max-w-xl mx-auto w-full">
        {/* Navigation Link Stack */}
        <nav className="space-y-2 sm:space-y-3" aria-label="Mobile Directory">
          <div className="border-b border-stone-border pb-3 mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-taupe font-semibold">
            <span>Studio Directory</span>
            <span className="text-sage font-medium">Pune, India</span>
          </div>

          <div className="divide-y divide-stone-border/60">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isTreatments = item.hasSubmenu;

              return (
                <div key={item.number} className="py-2">
                  {isTreatments ? (
                    <div>
                      <button
                        onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}
                        className="w-full flex items-baseline justify-between text-left group py-1"
                        aria-expanded={treatmentsExpanded}
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-serif text-xs text-champagne font-light">
                            {item.number}
                          </span>
                          <span
                            className={`font-serif text-2xl sm:text-3xl font-light transition-colors ${
                              pathname.startsWith("/treatments")
                                ? "text-sage-dark font-normal italic"
                                : "text-espresso group-hover:text-sage"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-taupe transition-transform duration-300 ${
                            treatmentsExpanded ? "rotate-180 text-sage" : ""
                          }`}
                        />
                      </button>

                      {/* Expandable Treatments Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out pl-6 pr-2 ${
                          treatmentsExpanded ? "max-h-80 opacity-100 pt-2 pb-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="space-y-2 border-l-2 border-sage/40 pl-4">
                          <Link
                            href="/treatments"
                            onClick={onClose}
                            className="block text-xs uppercase tracking-[0.16em] text-espresso/90 font-semibold hover:text-sage py-1"
                          >
                            All Treatments Overview ↗
                          </Link>
                          {TREATMENTS.map((treatment) => (
                            <Link
                              key={treatment.id}
                              href={`/treatments/${treatment.slug}`}
                              onClick={onClose}
                              className={`block text-xs py-1 transition-colors ${
                                pathname === `/treatments/${treatment.slug}`
                                  ? "text-sage-dark font-medium"
                                  : "text-taupe hover:text-espresso"
                              }`}
                            >
                              <span className="font-serif mr-1.5 text-champagne">
                                {treatment.number}.
                              </span>
                              <span>{treatment.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between group py-1"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-xs text-champagne font-light">
                          {item.number}
                        </span>
                        <span
                          className={`font-serif text-2xl sm:text-3xl font-light transition-colors ${
                            isActive
                              ? "text-sage-dark font-normal italic"
                              : "text-espresso group-hover:text-sage"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-taupe/40 group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Editorial Photo & Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-stone-border">
          <div className="relative aspect-[16/9] w-full bg-stone-dark overflow-hidden shadow-subtle mb-5 border border-stone-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Aurelis Studio Lounge in Koregaon Park Pune"
              fill
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-cover filter contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-serif italic">
              &ldquo;{SITE_METADATA.secondaryLine}&rdquo; · Koregaon Park, Pune
            </div>
          </div>

          {/* Primary Sage Action Button */}
          <div className="space-y-3">
            <Link
              href="/book-appointment"
              onClick={onClose}
              className="w-full py-4 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center block shadow-sage"
            >
              Book an Appointment
            </Link>

            {onOpenBookingModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal();
                }}
                className="w-full py-2.5 text-[11px] uppercase tracking-[0.16em] text-taupe hover:text-espresso border border-stone-border transition-colors bg-stone-dark/30"
              >
                Instant Reservation Modal
              </button>
            )}
          </div>

          {/* Footer Contact Shortcut */}
          <div className="mt-6 pt-4 border-t border-stone-border grid grid-cols-2 gap-4 text-xs text-taupe">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso flex items-center gap-1 mb-0.5">
                <MapPin className="w-3 h-3 text-sage" />
                <span>Location</span>
              </span>
              <p className="text-[11px]">Lane 7, Koregaon Park</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso flex items-center gap-1 mb-0.5">
                <Phone className="w-3 h-3 text-sage" />
                <span>Concierge</span>
              </span>
              <a
                href={`tel:${SITE_METADATA.phoneRaw}`}
                className="text-[11px] hover:text-espresso font-medium"
              >
                (020) 2615-AURELIS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
