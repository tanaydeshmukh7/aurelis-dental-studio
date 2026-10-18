export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Consultations" | "Care & Treatments" | "Financials" | "Logistics";
}

export const FAQS: FaqItem[] = [
  {
    id: "booking",
    question: "How do I book a consultation?",
    answer:
      "You can request an appointment using our online booking form on this website, send a direct message on WhatsApp, or call our studio reception during clinic hours. Our patient care coordinator will review your scheduling preferences, discuss any immediate inquiries, and confirm your private reservation.",
    category: "Consultations",
  },
  {
    id: "first-appointment",
    question: "What should I expect at my first appointment?",
    answer:
      "Your initial visit is a relaxed, thorough 45-to-60-minute appointment dedicated entirely to listening and evaluation. We perform high-definition digital imaging, comprehensive gum and joint screening, and gentle diagnostic checks. You will sit down with your clinician in our consultation lounge to view the scans, discuss your oral health goals, and explore treatment directions with no pressure to proceed immediately.",
    category: "Consultations",
  },
  {
    id: "treatment-suitability",
    question: "Which treatments may be suitable for me?",
    answer:
      "Every smile has unique biological and aesthetic considerations. During your clinical assessment, we explain which options—from conservative composite bonding and clear aligners to ceramic restorations—are biologically viable and aligned with your long-term wellness. We always prioritize conservative, tooth-preserving options first.",
    category: "Care & Treatments",
  },
  {
    id: "treatment-costs",
    question: "Can I discuss treatment costs before proceeding?",
    answer:
      "Transparency is fundamental to our practice. Following your initial diagnostic assessment, you will receive an itemised, written treatment outline detailing clinical steps, material options, timelines, and exact fees before any procedure begins. There are no surprise additions or hidden fees.",
    category: "Financials",
  },
  {
    id: "clinic-location",
    question: "How do I reach the clinic?",
    answer:
      "AURELIS Dental Studio is centrally located in the tranquil lane network of Koregaon Park, Pune. The studio features dedicated valet parking and step-free ground floor access. Detailed navigation coordinates and parking assistance are shared upon confirmation of your appointment.",
    category: "Logistics",
  },
  {
    id: "urgent-concerns",
    question: "What should I do if I have an urgent dental concern?",
    answer:
      "If you are experiencing acute discomfort, swelling, or have sustained dental trauma, please contact our emergency liaison line immediately. We reserve daily priority slots for registered and incoming patients requiring immediate palliative relief and assessment.",
    category: "Care & Treatments",
  },
];
