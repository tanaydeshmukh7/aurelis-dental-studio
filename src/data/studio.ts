export interface StudioSpace {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
}

export const STUDIO_SPACES: StudioSpace[] = [
  {
    title: "The Consultation Lounge",
    subtitle: "Conversations before instruments",
    description:
      "A serene, acoustic-dampened space designed for relaxed discussions, digital scan reviews, and treatment planning over warm herbal infusions.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Warm minimalist consultation lounge with architectural wood accents and natural light",
    features: ["Acoustic isolation", "Ergonomic lounge seating", "High-definition diagnostic displays"],
  },
  {
    title: "Surgical & Restorative Operatories",
    subtitle: "Clinical precision in a tranquil setting",
    description:
      "Engineered with hospital-grade laminar HEPA filtration, ceiling ambient visual displays, and ergonomic memory-foam dental suites.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    alt: "Pristine modern dental treatment suite with warm architectural illumination",
    features: ["Ultra-low noise instrumentation", "Memory foam patient suites", "Gentle indirect natural illumination"],
  },
  {
    title: "Digital Diagnostics Lab",
    subtitle: "Real-time 3D smile modeling",
    description:
      "Equipped with ultra-fast intraoral scanners and sub-millimeter 3D imaging, eliminating messy impression clays and lengthy wait times.",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern digital diagnostic and consultation room",
    features: ["Full digital intraoral scanning", "Zero radiation preview photography", "On-site ceramic milling lab"],
  },
];

export const CLINIC_CONTACT = {
  isDemoConcept: true,
  brandName: "AURELIS Dental Studio",
  address: {
    line1: "Lane 7, North Main Road (Demo Placeholder)",
    line2: "Koregaon Park, Pune",
    state: "Maharashtra 411001, India",
    directionsNote: "Conveniently situated amidst the heritage greenery of Koregaon Park, with reserved valet parking and step-free access.",
  },
  phone: "+91 20 2615 XXXX (Demo)",
  phoneDisplay: "+91 (020) 2615-AURELIS",
  whatsappNumber: "+919876543210",
  whatsappDisplay: "+91 98765 43210",
  email: "concierge@aurelisdental.in (Demo)",
  hours: [
    { days: "Monday – Friday", time: "09:30 AM – 07:30 PM" },
    { days: "Saturday", time: "10:00 AM – 06:00 PM" },
    { days: "Sunday", time: "By Prior Private Appointment" },
  ],
  googleMapsQuery: "Koregaon+Park+Pune+Maharashtra",
};
