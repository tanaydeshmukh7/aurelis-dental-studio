export interface Treatment {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  heroImage: string;
  supportingImages: string[];
  suitability: string[];
  benefits: string[];
  timeline: string;
  approach: string[];
  procedureStages: {
    stage: string;
    title: string;
    description: string;
  }[];
  idealFor: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const TREATMENTS: Treatment[] = [
  {
    id: "smile-design",
    slug: "smile-design",
    number: "01",
    title: "Smile Design",
    tagline: "Harmonising aesthetics, facial structure, and dental health",
    shortDesc:
      "Personalised assessment and digital planning for aesthetic smile improvements that respect your natural facial balance.",
    fullDesc:
      "Bespoke smile design begins with digital facial mapping and high-resolution intraoral imaging. Rather than applying a one-size-fits-all formula, our clinicians study tooth proportion, gum architecture, and lip dynamics to craft subtle porcelain restorations that elevate your natural smile.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Natural, confident smile portrait reflecting bespoke smile design",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=85",
    supportingImages: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    suitability: [
      "Irregular tooth wear, micro-cracks, or chipping",
      "Gaps, mild asymmetries, or uneven tooth sizing",
      "Desire for natural-looking porcelain veneers or composite bonding",
    ],
    benefits: [
      "Custom 3D trial smile preview in your mouth before any permanent bonding",
      "Minimal-prep biomimetic protocols that preserve healthy enamel",
      "Hand-crafted ceramic restorations tailored to your skin tone and lip line",
      "Comprehensive bite analysis to prevent premature chipping or wear",
    ],
    timeline: "2 to 3 consultations including digital mock-up and preview",
    approach: [
      "High-precision 3D facial and intraoral scan",
      "Trial smile preview directly in the mouth",
      "Minimal-prep conservative tooth preservation",
    ],
    procedureStages: [
      {
        stage: "Stage 01",
        title: "Facial Analysis & 3D Scanning",
        description:
          "High-definition digital photography and intraoral optical scans map tooth dimensions, gingival architecture, and lip dynamics.",
      },
      {
        stage: "Stage 02",
        title: "The Trial Smile Preview",
        description:
          "We craft a temporary mock-up placed over your existing teeth, allowing you to preview the aesthetics, speech cadence, and smile line in real time.",
      },
      {
        stage: "Stage 03",
        title: "Micro-Preparation & Artisan Crafting",
        description:
          "Minimal enamel adjustment is performed if required, followed by custom hand-layering of ultra-thin ceramic veneers by master technicians.",
      },
      {
        stage: "Stage 04",
        title: "Definitive Biomimetic Bonding",
        description:
          "Restorations are adhesively bonded using light-cured resin under rubber dam isolation for long-lasting strength and beauty.",
      },
    ],
    idealFor: "Individuals seeking refined, natural aesthetic balance without artificial bulk.",
    faqs: [
      {
        question: "Will my smile design look artificial or overly bright?",
        answer:
          "Never at Aurelis. We deliberately incorporate natural enamel translucency, surface micro-texture, and nuanced warm undertones so your restorations look like exceptional natural teeth rather than artificial veneers.",
      },
      {
        question: "Is tooth shaving always required?",
        answer:
          "No. Whenever clinically viable, we prioritize 'no-prep' or ultra-conservative micro-prep techniques that preserve 90% or more of natural enamel.",
      },
    ],
  },
  {
    id: "teeth-whitening",
    slug: "teeth-whitening",
    number: "02",
    title: "Teeth Whitening",
    tagline: "Safe, enamel-respecting brightening treatments",
    shortDesc:
      "Professional assessment and appropriate whitening options tailored to your enamel sensitivity and tooth tone.",
    fullDesc:
      "Unlike abrasive over-the-counter kits, our in-studio and bespoke home whitening therapies are formulated to protect enamel integrity and minimise thermal sensitivity. We evaluate existing restorations and intrinsic discolouration before recommending custom-fitted trays or gentle in-chair brightening.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Gentle professional dental assessment and whitening care",
    heroImage:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=85",
    supportingImages: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=85",
    ],
    suitability: [
      "Superficial discoloration from coffee, tea, wine, or natural aging",
      "Enamel-safe rejuvenation prior to significant life events",
      "Aesthetic maintenance following orthodontic or restorative care",
    ],
    benefits: [
      "Light-cured gingival barrier shields gums completely from irritation",
      "Desensitizing agents (potassium nitrate & ACP) minimize sensitivity",
      "Custom thermo-formed trays engineered for home touch-ups",
      "Daylight-balanced 5000K shade tracking ensures authentic results",
    ],
    timeline: "Single in-studio session (75 mins) or 10-14 days custom home protocol",
    approach: [
      "Gingival barrier protection to prevent irritation",
      "pH-buffered, desensitising active formulations",
      "Custom thermo-formed precision delivery trays",
    ],
    procedureStages: [
      {
        stage: "Stage 01",
        title: "Enamel Assessment & Baseline Shade",
        description:
          "We examine enamel thickness, identify existing restorations, and photograph baseline shade metrics under balanced lighting.",
      },
      {
        stage: "Stage 02",
        title: "Gingival Shield Isolation",
        description:
          "Liquid resin barrier is applied to seal the gum margins completely, ensuring active agents never contact sensitive soft tissues.",
      },
      {
        stage: "Stage 03",
        title: "Controlled Active Brightening",
        description:
          "pH-neutral whitening formulation is gently layered in 15-minute cycles, breaking up organic chromogens safely.",
      },
      {
        stage: "Stage 04",
        title: "Remineralisation & Take-Home Plan",
        description:
          "Deep remineralising serum is applied to eliminate sensitivity, accompanied by custom trays for long-term maintenance.",
      },
    ],
    idealFor: "Patients desiring a naturally refreshed, luminous tone with zero enamel damage.",
    faqs: [
      {
        question: "Does professional whitening damage tooth enamel?",
        answer:
          "No. Clinical evidence demonstrates that properly buffered professional peroxide treatments only break down organic stain molecules within microscopic enamel pores, leaving structural mineral content unharmed.",
      },
      {
        question: "Will existing dental crowns or fillings become whiter?",
        answer:
          "Porcelain and composite materials do not absorb whitening gel. During your initial consultation, we map existing restorations to ensure a cohesive, harmonious outcome.",
      },
    ],
  },
  {
    id: "clear-aligners",
    slug: "clear-aligners",
    number: "03",
    title: "Clear Aligners",
    tagline: "Discreet orthodontic alignment planned with digital accuracy",
    shortDesc:
      "Consultation and precision treatment planning for suitable orthodontic cases, discreetly guiding alignment.",
    fullDesc:
      "Clear aligner therapy at Aurelis combines continuous 3D tracking with medical-grade transparent splints. We evaluate not just cosmetic front-tooth alignment, but also bite stability, airway dynamics, and periodontal health to ensure lasting comfort and functional harmony.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Modern orthodontic clear aligner technology",
    heroImage:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1600&q=85",
    supportingImages: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    ],
    suitability: [
      "Mild to moderate crowding, rotation, or gap spaces",
      "Relapse after previous adolescent orthodontic treatments",
      "Adult professionals seeking virtually invisible tooth straightening",
    ],
    benefits: [
      "Nearly invisible medical-grade thermoplastic trays",
      "Removable for meals and effortless brushing and flossing",
      "Predictable 3D milestone animation of anticipated tooth movement",
      "Fewer emergency visits with no poking wires or loose brackets",
    ],
    timeline: "Typically 6 to 18 months, evaluated individually",
    approach: [
      "Comprehensive digital bite and joint assessment",
      "Virtual milestone simulations showing projected progress",
      "Regular comfortable check-ins at our Koregaon Park studio",
    ],
    procedureStages: [
      {
        stage: "Stage 01",
        title: "3D Digital Impression & Bite Scan",
        description:
          "Optical scanner captures thousands of data points of your dental arches without messy impression clays.",
      },
      {
        stage: "Stage 02",
        title: "Digital Orthodontic Staging",
        description:
          "Our orthodontic lead simulates gradual tooth shifts, calculating calibrated micro-forces per tray.",
      },
      {
        stage: "Stage 03",
        title: "Tray Delivery & Attachment Placement",
        description:
          "Discreet tooth-colored micro-attachments are placed to provide gentle leverage, and your first series of trays is delivered.",
      },
      {
        stage: "Stage 04",
        title: "Monitoring & Final Retention",
        description:
          "Unhurried check-ins every 6 to 8 weeks track progress, concluding with custom clear retainers to lock in your smile.",
      },
    ],
    idealFor: "Adults seeking discreet, lifestyle-compatible tooth straightening.",
    faqs: [
      {
        question: "How many hours each day must I wear the aligners?",
        answer:
          "For optimal tooth movement, trays should be worn between 20 and 22 hours per day, removing them only to eat and clean your teeth.",
      },
      {
        question: "Will clear aligners affect my speech?",
        answer:
          "Most patients notice a slight adjustment for the first 24 to 48 hours as the tongue adapts to the thin trays, after which speech returns completely to normal.",
      },
    ],
  },
  {
    id: "dental-implants",
    slug: "dental-implants",
    number: "04",
    title: "Dental Implants",
    tagline: "Restoring biological stability and effortless function",
    shortDesc:
      "Assessment and restorative options for missing teeth, engineered to emulate the strength of natural roots.",
    fullDesc:
      "When a tooth is lost, preserving bone density and adjacent tooth stability is critical. We use CBCT guided 3D surgical planning to place titanium or ceramic implant fixtures with sub-millimeter precision, followed by custom-milled zirconia crowns that blend seamlessly with your bite.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Restorative dental precision and implantology",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=85",
    supportingImages: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    ],
    suitability: [
      "Single or multiple missing teeth",
      "Permanent replacement for uncomfortable removable partial dentures",
      "Preservation of surrounding jawbone height and adjacent teeth",
    ],
    benefits: [
      "Preserves facial bone architecture and prevents premature sunken contours",
      "Does not require cutting down or crowning adjacent healthy teeth",
      "Restores 100% natural bite strength for effortless eating",
      "Permanent, long-lasting solution engineered to endure for decades",
    ],
    timeline: "Phased over 3 to 6 months for optimal osseointegration",
    approach: [
      "3D volumetric bone mapping and digital surgical guide",
      "Biocompatible premium titanium / zirconia fixtures",
      "Custom shade-matched monolithic ceramic crown",
    ],
    procedureStages: [
      {
        stage: "Stage 01",
        title: "Low-Dose CBCT 3D Bone Mapping",
        description:
          "High-resolution 3D radiographic mapping analyzes bone density, nerve pathways, and sinus architecture.",
      },
      {
        stage: "Stage 02",
        title: "Computer-Guided Placement",
        description:
          "Using a 3D printed surgical stent, the implant fixture is placed into living bone with sub-millimeter accuracy.",
      },
      {
        stage: "Stage 03",
        title: "Osseointegration Healing Period",
        description:
          "Bone cells integrate securely around the micro-textured implant surface over 8 to 16 weeks, creating an indestructible anchor.",
      },
      {
        stage: "Stage 04",
        title: "Custom Ceramic Crown Delivery",
        description:
          "A monolithic zirconia or lithium disilicate crown is precision-milled and custom-shaded to match your natural smile line.",
      },
    ],
    idealFor: "Permanent, secure restoration of lost teeth with natural feel and appearance.",
    faqs: [
      {
        question: "Is dental implant placement painful?",
        answer:
          "Because 3D surgical stents enable minimal-incision placement under profound local anaesthesia, patients frequently report that implant placement is more comfortable than a routine tooth extraction.",
      },
      {
        question: "How long do dental implants last?",
        answer:
          "With proper oral hygiene, routine cleanings, and healthy gum tissue, dental implants have a clinical success rate exceeding 95% and can last a lifetime.",
      },
    ],
  },
  {
    id: "preventive-dentistry",
    slug: "preventive-dentistry",
    number: "05",
    title: "Preventive Dentistry",
    tagline: "Preserving your oral health with unhurried clinical diligence",
    shortDesc:
      "Routine examinations, gentle ultrasonic cleaning, and personalised oral-health guidance for long-term vitality.",
    fullDesc:
      "Our preventative ethos centers on gentle thoroughness and patient empowerment. We combine air-flow guided biofilm removal, digital cavity detection, and periodontal screening with unhurried discussions to help you maintain vibrant oral health with zero pressure or judgment.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Gentle preventive oral examination and care in studio",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=85",
    supportingImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    suitability: [
      "Semi-annual wellness checks and biofilm removal",
      "Management of early gingival bleeding, sensitivity, or dry mouth",
      "Comprehensive baseline examinations and oral cancer screening",
    ],
    benefits: [
      "Swiss airflow technology gently removes biofilm with zero scraping",
      "Digital intraoral photography gives you full transparency into tooth health",
      "Identifies micro-demineralization before it becomes irreversible decay",
      "Unhurried, non-judgmental environment tailored for anxious patients",
    ],
    timeline: "45 to 60 minute unhurried appointment",
    approach: [
      "High-magnification loupe inspection and intraoral photography",
      "Painless ultrasonic and gentle airflow prophylaxis",
      "Individualised oral microbiome and hygiene guidance",
    ],
    procedureStages: [
      {
        stage: "Stage 01",
        title: "Comfort Intake & Discussion",
        description:
          "We sit down in the lounge to discuss any sensitivities, recent health changes, and your everyday oral routine.",
      },
      {
        stage: "Stage 02",
        title: "High-Magnification Diagnostic Screening",
        description:
          "Clinicians use magnification loupes and optical intraoral cameras to inspect tooth margins, gums, and oral soft tissues.",
      },
      {
        stage: "Stage 03",
        title: "Guided Biofilm Airflow Therapy",
        description:
          "Warm water and micronized erythritol powder gently sweep away plaque and surface stains with exceptional comfort.",
      },
      {
        stage: "Stage 04",
        title: "Enamel Remineralisation & Personalized Coaching",
        description:
          "Bio-active calcium or fluoride therapy strengthens enamel, accompanied by tailored interdental coaching.",
      },
    ],
    idealFor: "Anyone who appreciates thorough, gentle, non-judgmental wellness care.",
    faqs: [
      {
        question: "How often should I schedule preventive cleanings?",
        answer:
          "For most patients, a six-month cadence maintains healthy gums and prevents plaque crystallization into calculus. Patients managing periodontal conditions may benefit from quarterly visits.",
      },
      {
        question: "I experience dental anxiety; how does Aurelis help?",
        answer:
          "Our clinic was specifically engineered with acoustic dampening, ambient lighting, and unhurried appointments. You can pause anytime, listen to music on noise-cancelling headphones, and remain in complete control.",
      },
    ],
  },
];
