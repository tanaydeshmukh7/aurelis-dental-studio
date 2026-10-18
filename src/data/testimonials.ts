export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  treatment: string;
  location: string;
  year: string;
  rating: number;
}

// NOTE: Clearly labeled as conceptual demo data for template development.
// Real patient testimonials with signed consent will be configured prior to clinic public launch.
export const DEMO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    quote:
      "Aurelis has redefined dental appointments for me. The studio environment is remarkably calm, the clinical team explained every scan with meticulous care, and my smile design felt completely natural—not exaggerated.",
    author: "Ananya S.",
    treatment: "Smile Design & Bonding",
    location: "Koregaon Park, Pune",
    year: "2025",
    rating: 5,
  },
  {
    id: "review-2",
    quote:
      "From the initial digital 3D scans to the completion of my clear aligner sequence, the level of precision and gentleness was unlike any dental clinic I have visited in Mumbai or Pune.",
    author: "Rohan M.",
    treatment: "Clear Aligners",
    location: "Kalyani Nagar, Pune",
    year: "2025",
    rating: 5,
  },
  {
    id: "review-3",
    quote:
      "I used to experience acute dental anxiety. The unhurried pace, warm interior aesthetic, and transparent treatment plan completely put me at ease. The implant procedure was seamlessly executed.",
    author: "Priyanka K.",
    treatment: "Restorative Implantology",
    location: "Boat Club Road, Pune",
    year: "2026",
    rating: 5,
  },
  {
    id: "review-4",
    quote:
      "The preventive cleaning and airflow polish was surprisingly gentle. No harsh vibrations, no rushed atmosphere. Truly feels like a sanctuary dedicated to patient well-being.",
    author: "Vikram D.",
    treatment: "Preventive Care & Whitening",
    location: "Baner, Pune",
    year: "2026",
    rating: 5,
  },
];
