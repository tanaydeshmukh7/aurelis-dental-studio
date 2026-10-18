# AURELIS Dental Studio
### Multipage Luxury Dental Website · Koregaon Park, Pune, Maharashtra, India
*Portfolio-grade digital architecture inspired by Northup Studio & high-end Swiss editorial design.*

---

## ✦ Overview

**AURELIS Dental Studio** is a boutique digital experience designed for contemporary cosmetic and restorative dentistry in Koregaon Park, Pune. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion, it features an unhurried, hospitality-grade patient experience.

---

## ✦ Multipage Site Architecture

### Complete Routes:
- `/` — **Homepage**: Editorial hero split, trust strip, brand narrative, 5 signature treatments, interactive smile atelier explorer, cinematic `#242522` studio environment, patient journey, team highlight, testimonial carousel, FAQ accordion, Journal preview, booking conversion, and Koregaon Park location.
- `/about` — **About the Studio**: Architectural sanctuary, biophilic materials (sandstone, oak, natural lighting), acoustic isolation, hospital clean air, and biomimetic principles.
- `/treatments` — **Treatments Overview**: Complete directory of all 5 signature treatments with clinical philosophy, benefits comparison, and consultation access.
- `/treatments/[slug]` — **Individual Treatment Pages (5 Routes)**:
  - `/treatments/smile-design`
  - `/treatments/teeth-whitening`
  - `/treatments/clear-aligners`
  - `/treatments/dental-implants`
  - `/treatments/preventive-dentistry`
  *Each with 4-stage clinical procedure roadmap, indications, candidate checklists, clinical FAQs, and booking.*
- `/our-team` — **The Clinical Team & Leadership**: 4-column responsive grid featuring all **10 clinic roles**, collaborative care philosophy, and behind-the-scenes photography.
- `/our-team/[slug]` — **Individual Team Member Profile Pages (10 Routes)**:
  - `/our-team/dr-lead-clinician`
  - `/our-team/dr-cosmetic-specialist`
  - `/our-team/dr-orthodontic-specialist`
  - `/our-team/dr-implant-specialist`
  - `/our-team/dr-general-dentist`
  - `/our-team/priya-hygienist`
  - `/our-team/kavita-senior-assistant`
  - `/our-team/rahul-dental-assistant`
  - `/our-team/neha-clinic-manager`
  - `/our-team/aarav-patient-coordinator`
- `/patient-guide` — **Patient Guide & First Visit**: 45-minute consultation roadmap, preparation tips, comfort amenities (memory foam, noise-cancelling headphones, ambient illumination, topical pre-numbing), and anxiety-free protocols.
- `/gallery` — **Studio & Atelier Gallery**: Interactive category filtering (*All Spaces, The Studio, Consultation, Operatories, Technology, Smiles*) with a modal lightbox preview.
- `/reviews` — **Patient Stories & Reviews**: Verified attribution quotes with treatment badges, visit years, and an interactive feedback submission demo.
- `/blog` — **The Aurelis Journal**: Editorial magazine landing page with search input, 5 category filters (*Oral Health, Smile Design, Everyday Care, Modern Dentistry, Patient Guides*), featured article hero, responsive grid, and newsletter subscription UI.
- `/blog/[slug]` — **Individual Blog Articles (8 Routes)**:
  1. `/blog/everyday-habits-healthier-smile`
  2. `/blog/professional-teeth-whitening-guide`
  3. `/blog/clear-aligners-first-time-guide`
  4. `/blog/why-regular-dental-check-ups-matter`
  5. `/blog/understanding-dental-implants-journey`
  6. `/blog/how-to-prepare-first-dental-appointment`
  7. `/blog/what-is-smile-design-who-benefits`
  8. `/blog/choosing-right-toothbrush-routine`
  *Features breadcrumbs, wide cover image, structured sections, pull quotes, key takeaways, working share buttons (Copy Link, WhatsApp, X), related articles, and booking CTA.*
- `/contact` — **Studio Location & Concierge**: Interactive Google Maps embed, Koregaon Park directions, valet parking information, consultation hours, and WhatsApp concierge.
- `/book-appointment` — **Private Reservations**: Comprehensive booking form with client-side validation, treatment selector, preferred dates, time windows, privacy consent, and demo feedback.

- `/privacy` — **Privacy Policy**: Patient medical data confidentiality and encryption protocols.
- `/terms` — **Terms of Care**: Clinical guidelines, informed consent standards, and consultation policies.

---

## ✦ Mobile Hamburger Navigation Experience

- **Custom-designed animated button**: 3 precisely aligned lines transforming smoothly into an X (44×44px touch area, accessible ARIA labels).
- **Full-screen Ivory Overlay (`#F7F5F0`)**:
  - AURELIS brand lockup and close control
  - Numbered navigation directory (01 Home to 09 Contact)
  - Expandable **Treatments Submenu** with smooth accordion transitions
  - High-contrast **Book an Appointment** CTA button
  - Embedded editorial studio photograph
  - Concierge phone shortcut (`+91 (020) 2615-AURELIS`)
  - Body scroll locking while open & ESC key dismiss handler

---

## ✦ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Production Build & Static Generation
```bash
npm run build
npm run start
```
*(All 39 pages are pre-rendered statically with zero TypeScript or ESLint errors).*
