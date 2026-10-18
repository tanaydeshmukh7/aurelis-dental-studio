export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  category: "Clinical Leadership" | "Specialist Doctors" | "Oral Hygiene & Nursing" | "Patient Concierge & Operations";
  isPlaceholder: boolean;
  qualificationsPlaceholder: string;
  registrationPlaceholder?: string;
  shortBio: string;
  fullBio: string[];
  responsibilities: string[];
  philosophy: string;
  portraitImage: string;
  portraitAlt: string;
  relatedTreatments: {
    title: string;
    slug: string;
  }[];
}

// NOTE: All profiles below represent structured clinical role placeholders for design and layout evaluation.
// Real practitioner names, certified degrees, and dental council registration numbers will be verified and connected prior to public launch.
export const CLINIC_TEAM: TeamMember[] = [
  {
    slug: "dr-lead-clinician",
    name: "Dr. [Lead Clinician Name]",
    role: "Lead Dentist & Clinical Director",
    category: "Clinical Leadership",
    isPlaceholder: true,
    qualificationsPlaceholder: "BDS, MDS (Prosthodontics & Aesthetic Rehabilitation — Verified Credentials Placeholder)",
    registrationPlaceholder: "Maharashtra State Dental Council (Reg. No. Pending Clinic Onboarding)",
    shortBio:
      "Directing clinical governance and biomimetic restorative care with an emphasis on unhurried dialogue and tooth-structure preservation.",
    fullBio: [
      "As Clinical Director at Aurelis Dental Studio, our clinical lead guides practice standards around conservative, biomimetic tooth preservation and advanced digital diagnostic imaging.",
      "With specialized clinical interest in complex occlusal rehabilitation and minimally invasive ceramic veneers, every patient plan is crafted as a collaborative dialogue to ensure functional longevity and natural facial balance.",
    ],
    responsibilities: [
      "Clinical governance and standard operating procedure oversight",
      "Digital smile architecture and trial mock-up evaluations",
      "Biomimetic aesthetic porcelain and composite restorations",
      "Complex full-arch rehabilitation planning",
    ],
    philosophy:
      "Dentistry should be an unhurried dialogue. By understanding both your biological foundation and your aesthetic sensibility, we design treatments that feel effortless, restorative, and entirely true to who you are.",
    portraitImage:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Lead Dentist and Clinical Director in contemporary medical attire",
    relatedTreatments: [
      { title: "Smile Design", slug: "smile-design" },
      { title: "Dental Implants", slug: "dental-implants" },
    ],
  },
  {
    slug: "dr-cosmetic-specialist",
    name: "Dr. [Cosmetic Specialist Name]",
    role: "Cosmetic Dentist & Aesthetic Lead",
    category: "Specialist Doctors",
    isPlaceholder: true,
    qualificationsPlaceholder: "BDS, Fellowship in Aesthetic & Restorative Dentistry (Credentials Placeholder)",
    registrationPlaceholder: "Maharashtra State Dental Council (Reg. Pending Verification)",
    shortBio:
      "Dedicated to conservative smile enhancements, composite resin layering, and enamel-preserving brightening protocols.",
    fullBio: [
      "Focusing on the fine intersection of dental art and biomimetic material science, our cosmetic lead specializes in polychromatic composite artistry and ultra-thin ceramic veneers.",
      "Every procedure focuses on preserving natural enamel prisms, utilizing light-cured resin isolation to deliver luminous, natural smile aesthetics.",
    ],
    responsibilities: [
      "Direct composite resin artistic bonding and diastema closure",
      "Digital shade mapping under 5000K true-color illumination",
      "Gingival contouring and aesthetic smile symmetry",
      "Custom in-studio and take-home whitening protocols",
    ],
    philosophy:
      "True aesthetic refinement is never about creating artificial perfection. It is about accentuating your natural character while safeguarding biological tooth integrity.",
    portraitImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Cosmetic Dentistry Specialist in clinic studio",
    relatedTreatments: [
      { title: "Smile Design", slug: "smile-design" },
      { title: "Teeth Whitening", slug: "teeth-whitening" },
    ],
  },
  {
    slug: "dr-orthodontic-specialist",
    name: "Dr. [Orthodontic Specialist Name]",
    role: "Orthodontist & Clear Aligner Specialist",
    category: "Specialist Doctors",
    isPlaceholder: true,
    qualificationsPlaceholder: "BDS, MDS (Orthodontics & Dentofacial Orthopaedics — Verified Credentials Placeholder)",
    registrationPlaceholder: "Maharashtra State Dental Council (Reg. Pending Verification)",
    shortBio:
      "Guiding digital tooth movement, airway-conscious alignment, and bite biomechanics with medical-grade clear aligners.",
    fullBio: [
      "Our orthodontics lead specializes in adult clear aligner therapies and interceptive occlusal management, using dynamic digital staging to align teeth predictably.",
      "Beyond cosmetic straightening, each case is assessed for temporomandibular joint stability, airway patency, and long-term periodontal health.",
    ],
    responsibilities: [
      "3D digital bite modeling and aligner force staging",
      "Adult orthodontic relapse and arch alignment",
      "Occlusal equilibrium and temporomandibular joint assessment",
      "Retention protocol design and ongoing digital monitoring",
    ],
    philosophy:
      "A healthy bite is the foundation of lifelong comfort. We guide teeth into optimal biological balance with minimal disruption to your daily lifestyle.",
    portraitImage:
      "https://images.unsplash.com/photo-1594824813590-789a5b12cca2?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Orthodontic Specialist in contemporary medical practice",
    relatedTreatments: [
      { title: "Clear Aligners", slug: "clear-aligners" },
      { title: "Smile Design", slug: "smile-design" },
    ],
  },
  {
    slug: "dr-implant-specialist",
    name: "Dr. [Implant Surgeon Name]",
    role: "Implant Dentist & Oral Surgeon",
    category: "Specialist Doctors",
    isPlaceholder: true,
    qualificationsPlaceholder: "BDS, MDS (Oral & Maxillofacial Surgery / Implantology — Credentials Placeholder)",
    registrationPlaceholder: "Maharashtra State Dental Council (Reg. Pending Verification)",
    shortBio:
      "Specialising in CBCT-guided surgical implant placement, bone regeneration, and biological tooth replacement.",
    fullBio: [
      "Our surgical implant lead brings extensive experience in computer-guided implantology, ridge preservation, and biocompatible ceramic and titanium fixture placement.",
      "By utilizing custom 3D-printed surgical stents and low-trauma piezoelectric instrumentation, implant surgery at Aurelis is exceptionally gentle and predictable.",
    ],
    responsibilities: [
      "Low-dose CBCT 3D volumetric bone mapping and virtual simulation",
      "Computer-guided single and multi-unit implant placement",
      "Autogenous and xenograft ridge preservation and sinus lifts",
      "Immediate functional temporisation protocols",
    ],
    philosophy:
      "Surgical precision should always feel serene. We replace missing teeth with fixtures that integrate harmoniously into living bone, restoring strength and confidence.",
    portraitImage:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Senior Implant Dentist and Surgeon",
    relatedTreatments: [
      { title: "Dental Implants", slug: "dental-implants" },
      { title: "Preventive Dentistry", slug: "preventive-dentistry" },
    ],
  },
  {
    slug: "dr-general-dentist",
    name: "Dr. [General Practitioner Name]",
    role: "General Dentist & Endodontic Care",
    category: "Specialist Doctors",
    isPlaceholder: true,
    qualificationsPlaceholder: "BDS, Post-Graduate Diploma in Conservative Dentistry (Credentials Placeholder)",
    registrationPlaceholder: "Maharashtra State Dental Council (Reg. Pending Verification)",
    shortBio:
      "Delivering gentle root canal therapies, tooth-colored composite restorations, and urgent palliative care.",
    fullBio: [
      "Focusing on the prompt relief of dental discomfort and the meticulous preservation of natural roots, our general dentist employs high-magnification surgical loupes and rotary nickel-titanium instrumentation.",
      "Known for an exceptionally calm chairside demeanor, patient comfort and anxiety alleviation remain paramount.",
    ],
    responsibilities: [
      "Precision microscopic root canal treatment and retreats",
      "Tooth-colored composite restorations for decay and wear",
      "Urgent dental emergency assessment and pain management",
      "Comprehensive initial patient oral health examinations",
    ],
    philosophy:
      "No patient should ever feel anxious about dental treatment. We take pride in transforming formerly stressful procedures into calm, painless experiences.",
    portraitImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of General Dental Practitioner with warm, approachable expression",
    relatedTreatments: [
      { title: "Preventive Dentistry", slug: "preventive-dentistry" },
      { title: "Smile Design", slug: "smile-design" },
    ],
  },
  {
    slug: "priya-hygienist",
    name: "Priya [Name Placeholder]",
    role: "Dental Hygienist & Preventive Professional",
    category: "Oral Hygiene & Nursing",
    isPlaceholder: true,
    qualificationsPlaceholder: "Diploma in Dental Hygiene & Preventive Oral Health (Verified Credentials Placeholder)",
    shortBio:
      "Leading gentle airflow biofilm therapy, periodontal health screenings, and tailored home care routines.",
    fullBio: [
      "Our dental hygienist is passionate about preventive wellness and patient education, utilizing gentle Swiss airflow prophylaxis to sweep away dental biofilm without mechanical scraping.",
      "She works closely with patients to customize daily oral hygiene rituals that protect both dental enamel and cardiovascular health.",
    ],
    responsibilities: [
      "Guided biofilm therapy (GBT) and gentle ultrasonic prophylaxis",
      "Periodontal pocket charting and soft tissue wellness screening",
      "Individualized home-care technique and interdental coaching",
      "Enamel remineralization and topical fluoride / calcium therapies",
    ],
    philosophy:
      "Prevention is the kindest form of healthcare. When we empower patients with gentle maintenance, healthy teeth can genuinely last a lifetime.",
    portraitImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Dental Hygienist and Preventive Care Specialist",
    relatedTreatments: [
      { title: "Preventive Dentistry", slug: "preventive-dentistry" },
      { title: "Teeth Whitening", slug: "teeth-whitening" },
    ],
  },
  {
    slug: "kavita-senior-assistant",
    name: "Kavita [Name Placeholder]",
    role: "Senior Dental Assistant & Clinical Sterilisation Lead",
    category: "Oral Hygiene & Nursing",
    isPlaceholder: true,
    qualificationsPlaceholder: "Certified Dental Surgery Assistant (CDSA) & Hospital Infection Control Specialist",
    shortBio:
      "Managing class-B vacuum autoclaving, sterile operatory preparation, and reassuring four-handed chairside assistance.",
    fullBio: [
      "Overseeing our rigorous hospital-grade sterilisation protocols, Kavita ensures that every operatory suite operates at uncompromising European standard hygiene levels.",
      "Her gentle presence and attentive care help nervous patients feel grounded throughout their clinical appointments.",
    ],
    responsibilities: [
      "Class-B fractional vacuum sterilization and biological spore monitoring",
      "Chairside four-handed clinical assisting across surgical cases",
      "Operatory disinfection and sterile field maintenance",
      "Patient post-treatment comfort and recovery coordination",
    ],
    philosophy:
      "Meticulous clinical hygiene and gentle empathy are two sides of the same coin. We treat every detail as if caring for our own family.",
    portraitImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Senior Clinical Dental Assistant",
    relatedTreatments: [
      { title: "Preventive Dentistry", slug: "preventive-dentistry" },
      { title: "Dental Implants", slug: "dental-implants" },
    ],
  },
  {
    slug: "rahul-dental-assistant",
    name: "Rahul [Name Placeholder]",
    role: "Dental Assistant & Digital Diagnostics Tech",
    category: "Oral Hygiene & Nursing",
    isPlaceholder: true,
    qualificationsPlaceholder: "Certified Dental Assistant & Digital Imaging Technician (Credentials Placeholder)",
    shortBio:
      "Facilitating 3D intraoral digital impressions, clinical photography, and responsive procedural support.",
    fullBio: [
      "Specialising in digital diagnostic hardware, Rahul coordinates intraoral scanning, photographic capture, and chairside instrumentation support.",
      "His technical acumen ensures smooth appointments where diagnostic scans are captured swiftly and comfortably.",
    ],
    responsibilities: [
      "Intraoral digital optical scanning and 3D file curation",
      "Standardized clinical portraiture and shade photography",
      "Chairside procedural support and material preparation",
      "Operatory turnaround and equipment calibration",
    ],
    philosophy:
      "Modern digital tools take the guesswork out of dentistry, making every appointment smoother, clearer, and faster for our patients.",
    portraitImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Clinical Dental Assistant and Diagnostics Technician",
    relatedTreatments: [
      { title: "Smile Design", slug: "smile-design" },
      { title: "Clear Aligners", slug: "clear-aligners" },
    ],
  },
  {
    slug: "neha-clinic-manager",
    name: "Neha [Name Placeholder]",
    role: "Clinic Operations Director & Practice Manager",
    category: "Patient Concierge & Operations",
    isPlaceholder: true,
    qualificationsPlaceholder: "MBA in Healthcare Management & Quality Administration (Placeholder)",
    shortBio:
      "Orchestrating unhurried clinic scheduling, guest hospitality, transparent financial plans, and studio operations.",
    fullBio: [
      "Neha manages the day-to-day rhythm of Aurelis Dental Studio, ensuring appointments never overlap and that every guest experiences a serene, hospitality-grade visit.",
      "She oversees itemised treatment estimates, patient privacy compliance, and our continuous quality assurance systems.",
    ],
    responsibilities: [
      "Studio operational oversight and private scheduling governance",
      "Transparent financial coordination and flexible phased payment plans",
      "Patient feedback monitoring and concierge quality audits",
      "Supplier relations with certified biomimetic dental laboratories",
    ],
    philosophy:
      "Healthcare should feel as considerate and effortless as five-star hospitality. We build our practice around respect for your schedule and peace of mind.",
    portraitImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Clinic Operations Director in elegant professional attire",
    relatedTreatments: [
      { title: "Smile Design", slug: "smile-design" },
      { title: "Dental Implants", slug: "dental-implants" },
    ],
  },
  {
    slug: "aarav-patient-coordinator",
    name: "Aarav [Name Placeholder]",
    role: "Patient Coordinator & Concierge Lead",
    category: "Patient Concierge & Operations",
    isPlaceholder: true,
    qualificationsPlaceholder: "B.A. Communications & Certified Medical Concierge Specialist (Placeholder)",
    shortBio:
      "Welcoming guests in the consultation lounge, coordinating valet parking, and facilitating follow-up support.",
    fullBio: [
      "As the first and last person you meet at Aurelis, Aarav manages patient arrivals, warm beverage hospitality in our lounge, and seamless WhatsApp concierge inquiries.",
      "He ensures that all logistical details—from medical history collection to post-treatment follow-up check-ins—are handled with utmost discretion.",
    ],
    responsibilities: [
      "Guest reception, valet parking coordination, and lounge hospitality",
      "WhatsApp and digital concierge scheduling communication",
      "Appointment reminders and post-procedure check-in calls",
      "Patient records transfer and digital documentation assistance",
    ],
    philosophy:
      "A dental visit begins the moment you step through our door. A warm greeting, a calm environment, and thoughtful care change everything.",
    portraitImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85",
    portraitAlt: "Portrait of Patient Coordinator and Concierge Lead",
    relatedTreatments: [
      { title: "Preventive Dentistry", slug: "preventive-dentistry" },
      { title: "Clear Aligners", slug: "clear-aligners" },
    ],
  },
];

export const LEAD_DOCTOR = CLINIC_TEAM[0];
