export interface NavItem {
  number: string;
  name: string;
  href: string;
  hasSubmenu?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { number: "01", name: "Home", href: "/" },
  { number: "02", name: "About the Studio", href: "/about" },
  { number: "03", name: "Treatments", href: "/treatments", hasSubmenu: true },
  { number: "04", name: "Our Team", href: "/our-team" },
  { number: "05", name: "Patient Guide", href: "/patient-guide" },
  { number: "06", name: "Gallery", href: "/gallery" },
  { number: "07", name: "Reviews", href: "/reviews" },
  { number: "08", name: "The Journal", href: "/blog" },
  { number: "09", name: "Contact", href: "/contact" },
];

export const SITE_METADATA = {
  name: "AURELIS Dental Studio",
  shortName: "AURELIS",
  tagline: "Confident Smiles. A Healthier You.",
  secondaryLine: "A more thoughtful approach to dentistry.",
  heroHeadline: "Confidence Looks Good on You.",
  heroSubhead:
    "Thoughtful dental care, modern techniques, and a more personal approach to your smile.",
  description:
    "A more thoughtful approach to dentistry. Bespoke smile design, biomimetic restoration, and a calm, elevated patient experience in Koregaon Park, Pune.",
  location: "Lane 7, Koregaon Park, Pune, Maharashtra 411001, India",
  phone: "+91 (020) 2615-AURELIS",
  phoneRaw: "+912026150000",
  whatsapp: "+91 98765 43210",
  whatsappRaw: "+919876543210",
  email: "concierge@aurelisdental.in",
  hours: "Mon – Sat: 09:30 AM – 07:30 PM | Sunday: By Prior Private Appointment",
};
