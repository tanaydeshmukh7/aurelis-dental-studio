"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import MobileMenu from "./MobileMenu";
import BrandLogo from "../common/BrandLogo";
import { TREATMENTS } from "@/data/treatments";
import { SITE_METADATA } from "@/data/site";

interface SiteNavbarProps {
  onOpenBookingModal?: () => void;
}

export default function SiteNavbar({ onOpenBookingModal }: SiteNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Primary curated desktop links
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Treatments", href: "/treatments", hasDropdown: true },
    { name: "Our Team", href: "/our-team" },
    { name: "Patient Guide", href: "/patient-guide" },
    { name: "The Journal", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md border-b border-espresso/10 py-3.5 shadow-subtle"
            : "bg-ivory/90 backdrop-blur-sm border-b border-espresso/8 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Monogram */}
          <BrandLogo variant="dark" showMark={true} />

          {/* Desktop Navigation Links (Visible on xl: 1280px+) */}
          <nav
            className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[11px] 2xl:text-xs uppercase tracking-[0.18em] font-medium text-espresso/85"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-2"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href="/treatments"
                      className={`inline-flex items-center gap-1 transition-colors py-1 ${
                        isActive
                          ? "text-sage-dark font-semibold"
                          : "hover:text-sage-dark"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 text-taupe transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180 text-sage" : ""
                        }`}
                      />
                    </Link>

                    {/* Sage active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-sage" />
                    )}

                    {/* Desktop Dropdown with safe hover bridge */}
                    <div
                      className={`absolute top-full left-0 w-64 pt-2 transition-all duration-200 ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="bg-ivory shadow-float border border-espresso/10 p-3 space-y-1">
                        <div className="px-3 py-1.5 border-b border-espresso/8 mb-1 flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-taupe font-semibold">
                            Clinical Disciplines
                          </span>
                          <span className="text-[9px] text-sage font-serif italic">
                            01–05
                          </span>
                        </div>
                        <Link
                          href="/treatments"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-espresso hover:bg-sand/40 hover:text-sage-dark transition-colors"
                        >
                          All Treatments Overview ↗
                        </Link>
                        {TREATMENTS.map((t) => (
                          <Link
                            key={t.id}
                            href={`/treatments/${t.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-3 py-1.5 text-xs text-taupe hover:text-espresso hover:bg-sand/30 transition-colors"
                          >
                            <span className="font-serif mr-1.5 text-sage">
                              {t.number}.
                            </span>
                            <span>{t.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-sage-dark font-semibold"
                      : "hover:text-sage-dark"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-sage" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Direct Studio Concierge phone */}
            <a
              href={`tel:${SITE_METADATA.phoneRaw}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs text-taupe hover:text-espresso transition-colors pr-2"
              title="Direct Studio Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-sage" />
              <span>(020) 2615-AURELIS</span>
            </a>

            {/* Sage Primary Appointment Button */}
            <Link
              href="/book-appointment"
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] font-medium text-white bg-sage hover:bg-sage-dark active:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage shrink-0"
            >
              Book a Consultation
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 border border-espresso/20 hover:border-sage text-xs uppercase tracking-[0.18em] font-medium text-espresso bg-ivory/80 hover:bg-sand/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-[10px] sm:text-[11px] font-semibold">Menu</span>
              <div className="w-4 flex flex-col gap-1 items-end">
                <span className="w-4 h-[1.5px] bg-espresso" />
                <span className="w-2.5 h-[1.5px] bg-sage" />
                <span className="w-3.5 h-[1.5px] bg-espresso" />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Luxury Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenBookingModal={onOpenBookingModal}
      />
    </>
  );
}
