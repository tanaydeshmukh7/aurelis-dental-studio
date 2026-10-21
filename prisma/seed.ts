import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { TREATMENTS } from "../src/data/treatments";
import { CLINIC_TEAM } from "../src/data/team";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "../src/data/blog";
import { GALLERY_ITEMS } from "../src/data/gallery";
import { DEMO_TESTIMONIALS } from "../src/data/testimonials";
import { FAQS } from "../src/data/faqs";
import { SITE_METADATA } from "../src/data/site";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AURELIS Dental Studio database seed...");

  // 1. CLEAR EXISTING DATA (In relational order)
  await prisma.auditLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.leadEnquiry.deleteMany({});
  await prisma.stockMovement.deleteMany({});
  await prisma.inventoryItem.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.invoiceItem.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.prescription.deleteMany({});
  await prisma.clinicalNote.deleteMany({});
  await prisma.treatmentPlan.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.dentistLeave.deleteMany({});
  await prisma.dentistSchedule.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.treatmentService.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.blogArticle.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.galleryItem.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.fAQItem.deleteMany({});
  await prisma.publicPage.deleteMany({});
  await prisma.clinicSetting.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✓ Cleared existing records");

  // 2. CREATE STAFF USERS (Bcrypt hashed passwords)
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash("Aurelis@2026!", salt);
  const managerPasswordHash = await bcrypt.hash("Manager@2026!", salt);
  const dentistPasswordHash = await bcrypt.hash("Dentist@2026!", salt);
  const receptionPasswordHash = await bcrypt.hash("Reception@2026!", salt);
  const accountsPasswordHash = await bcrypt.hash("Accounts@2026!", salt);
  const editorPasswordHash = await bcrypt.hash("Editor@2026!", salt);

  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@aurelisdental.in",
      passwordHash: adminPasswordHash,
      fullName: "Dr. Vikramaditya Rathore",
      role: "SUPER_ADMIN",
      phone: "+91 98220 10001",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      specialization: "Clinical Director & Prosthodontist",
      licenseNumber: "MSDC/PROS/2012/8891",
      isActive: true,
    },
  });

  const clinicAdmin = await prisma.user.create({
    data: {
      email: "manager@aurelisdental.in",
      passwordHash: managerPasswordHash,
      fullName: "Neha Deshmukh",
      role: "CLINIC_ADMIN",
      phone: "+91 98220 10002",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      specialization: "Healthcare Administration",
      isActive: true,
    },
  });

  const leadDentist = await prisma.user.create({
    data: {
      email: "dr.ananya@aurelisdental.in",
      passwordHash: dentistPasswordHash,
      fullName: "Dr. Ananya Roy",
      role: "DENTIST",
      phone: "+91 98220 10003",
      avatar: "https://images.unsplash.com/photo-1594824813570-802524d77ee2?auto=format&fit=crop&w=600&q=80",
      specialization: "Aesthetic Rehabilitation & Biomimetic Restorations",
      licenseNumber: "MSDC/DENT/2015/4589",
      isActive: true,
    },
  });

  const orthoDentist = await prisma.user.create({
    data: {
      email: "dr.kabir@aurelisdental.in",
      passwordHash: dentistPasswordHash,
      fullName: "Dr. Kabir Sharma",
      role: "DENTIST",
      phone: "+91 98220 10004",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      specialization: "Orthodontics & Clear Aligner Therapy",
      licenseNumber: "MSDC/ORTHO/2016/5120",
      isActive: true,
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      email: "reception@aurelisdental.in",
      passwordHash: receptionPasswordHash,
      fullName: "Aarav Kulkarni",
      role: "RECEPTIONIST",
      phone: "+91 98220 10005",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      isActive: true,
    },
  });

  const accountant = await prisma.user.create({
    data: {
      email: "accounts@aurelisdental.in",
      passwordHash: accountsPasswordHash,
      fullName: "Rajesh Varma",
      role: "ACCOUNTANT",
      phone: "+91 98220 10006",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      isActive: true,
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: "editor@aurelisdental.in",
      passwordHash: editorPasswordHash,
      fullName: "Pooja Sengupta",
      role: "CONTENT_EDITOR",
      phone: "+91 98220 10007",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      isActive: true,
    },
  });

  console.log("✓ Created 7 staff personnel with distinct RBAC roles");

  // 3. DENTIST SCHEDULES (Monday - Saturday, 9:30 AM to 7:30 PM, Lunch break 1:30 PM - 2:30 PM)
  const workingDays = [1, 2, 3, 4, 5, 6]; // Mon - Sat
  for (const dentist of [superAdmin, leadDentist, orthoDentist]) {
    for (let day = 0; day <= 6; day++) {
      await prisma.dentistSchedule.create({
        data: {
          dentistId: dentist.id,
          dayOfWeek: day,
          startTime: "09:30",
          endTime: "19:30",
          breakStart: "13:30",
          breakEnd: "14:30",
          isWorkingDay: workingDays.includes(day),
        },
      });
    }
  }
  console.log("✓ Provisioned weekly dentist working hours and lunch intervals");

  // 4. SEED CLINIC SETTINGS
  const settingsData = [
    { key: "clinic_name", value: SITE_METADATA.name, category: "branding", description: "Studio public name" },
    { key: "tagline", value: SITE_METADATA.tagline, category: "branding", description: "Brand motto" },
    { key: "address", value: SITE_METADATA.location, category: "general", description: "Physical studio address" },
    { key: "phone", value: SITE_METADATA.phone, category: "general", description: "Reception contact telephone" },
    { key: "whatsapp", value: SITE_METADATA.whatsapp, category: "general", description: "Patient concierge WhatsApp" },
    { key: "email", value: SITE_METADATA.email, category: "general", description: "Clinic concierge email" },
    { key: "hours", value: SITE_METADATA.hours, category: "general", description: "Standard operating hours" },
    { key: "currency", value: "INR", category: "billing", description: "Base financial currency" },
    { key: "tax_rate", value: "18", category: "billing", description: "Applicable GST percentage" },
    { key: "default_appointment_duration", value: "60", category: "booking", description: "Default slot length in minutes" },
    { key: "cancellation_notice_hours", value: "24", category: "booking", description: "Required advance notice for cancellations" },
    { key: "timezone", value: "Asia/Kolkata", category: "general", description: "Clinic standard timezone" },
  ];
  for (const s of settingsData) {
    await prisma.clinicSetting.create({ data: s });
  }
  console.log("✓ Seeded clinic configuration settings");

  // 5. SEED TREATMENT SERVICES (From treatments.ts)
  const treatmentPrices: Record<string, { price: number; deposit: number; duration: number }> = {
    "smile-design": { price: 85000, deposit: 15000, duration: 90 },
    "teeth-whitening": { price: 18000, deposit: 5000, duration: 60 },
    "clear-aligners": { price: 175000, deposit: 25000, duration: 45 },
    "dental-implants": { price: 65000, deposit: 20000, duration: 90 },
    "preventive-dentistry": { price: 8500, deposit: 2000, duration: 60 },
  };

  const createdTreatments: Record<string, string> = {};

  for (let idx = 0; idx < TREATMENTS.length; idx++) {
    const t = TREATMENTS[idx];
    const pricing = treatmentPrices[t.slug] || { price: 25000, deposit: 5000, duration: 60 };
    const record = await prisma.treatmentService.create({
      data: {
        slug: t.slug,
        number: t.number,
        title: t.title,
        tagline: t.tagline,
        shortDesc: t.shortDesc,
        fullDesc: t.fullDesc,
        durationMinutes: pricing.duration,
        price: pricing.price,
        deposit: pricing.deposit,
        image: t.image,
        imageAlt: t.imageAlt,
        heroImage: t.heroImage,
        supportingImagesJson: JSON.stringify(t.supportingImages),
        suitabilityJson: JSON.stringify(t.suitability),
        benefitsJson: JSON.stringify(t.benefits),
        timeline: t.timeline,
        approachJson: JSON.stringify(t.approach),
        procedureStagesJson: JSON.stringify(t.procedureStages),
        idealFor: t.idealFor,
        faqsJson: JSON.stringify(t.faqs),
        bookingVisibility: true,
        isActive: true,
        displayOrder: idx + 1,
        seoTitle: `${t.title} in Koregaon Park, Pune | AURELIS Dental Studio`,
        seoDescription: t.shortDesc,
      },
    });
    createdTreatments[t.slug] = record.id;
  }
  console.log(`✓ Seeded ${TREATMENTS.length} treatment services`);

  // 6. SEED TEAM MEMBERS (From team.ts)
  for (let idx = 0; idx < CLINIC_TEAM.length; idx++) {
    const tm = CLINIC_TEAM[idx];
    await prisma.teamMember.create({
      data: {
        slug: tm.slug,
        name: tm.name,
        role: tm.role,
        bio: tm.shortBio,
        qualifications: tm.qualificationsPlaceholder,
        clinicalInterestsJson: JSON.stringify(tm.responsibilities),
        image: tm.portraitImage,
        email: `concierge@aurelisdental.in`,
        phone: `+91 (020) 2615-AURELIS`,
        displayOrder: idx + 1,
        isPublished: true,
      },
    });
  }
  console.log(`✓ Seeded ${CLINIC_TEAM.length} team members`);

  // 7. SEED BLOG CATEGORIES & ARTICLES
  for (const catName of BLOG_CATEGORIES) {
    if (catName === "All Articles") continue;
    const catSlug = catName.toLowerCase().replace(/\s+/g, "-");
    await prisma.blogCategory.create({
      data: {
        name: catName,
        slug: catSlug,
        description: `Articles and patient advisories focusing on ${catName}.`,
      },
    });
  }

  for (const article of BLOG_ARTICLES) {
    const catSlug = article.category.toLowerCase().replace(/\s+/g, "-");
    await prisma.blogArticle.create({
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: JSON.stringify(article.content),
        coverImage: article.coverImage,
        categorySlug: catSlug,
        authorName: article.author.name,
        readTime: article.readTime,
        status: "Published",
        publishedAt: new Date(),
        seoTitle: `${article.title} | The Aurelis Journal`,
        seoDescription: article.excerpt,
        tagsJson: JSON.stringify([article.category, "Dental Health", "Aurelis Studio"]),
      },
    });
  }
  console.log(`✓ Seeded blog categories and ${BLOG_ARTICLES.length} published journal articles`);

  // 8. SEED GALLERY ITEMS
  for (let idx = 0; idx < GALLERY_ITEMS.length; idx++) {
    const g = GALLERY_ITEMS[idx];
    await prisma.galleryItem.create({
      data: {
        title: g.title,
        category: g.category,
        image: g.image,
        caption: g.caption,
        altText: g.alt || g.title,
        displayOrder: idx + 1,
        isPublished: true,
      },
    });
  }
  console.log(`✓ Seeded ${GALLERY_ITEMS.length} studio gallery photographs`);

  // 9. SEED TESTIMONIALS & FAQS
  for (let idx = 0; idx < DEMO_TESTIMONIALS.length; idx++) {
    const t = DEMO_TESTIMONIALS[idx];
    await prisma.testimonial.create({
      data: {
        patientName: t.author,
        quote: t.quote,
        treatmentName: t.treatment,
        rating: t.rating || 5,
        visitYear: t.year || "2024",
        isFeatured: idx < 3,
        isPublished: true,
        displayOrder: idx + 1,
      },
    });
  }

  for (let idx = 0; idx < FAQS.length; idx++) {
    const f = FAQS[idx];
    await prisma.fAQItem.create({
      data: {
        question: f.question,
        answer: f.answer,
        category: "General",
        displayOrder: idx + 1,
        isPublished: true,
      },
    });
  }
  console.log("✓ Seeded authentic patient testimonials and FAQ repository");

  // 10. SEED SUPPLIERS & INVENTORY
  const supplier1 = await prisma.supplier.create({
    data: {
      name: "Dentsply Sirona India Pvt Ltd",
      contactPerson: "Vikram Sen",
      email: "orders.west@dentsplysirona.com",
      phone: "+91 22 6150 9900",
      address: "Andheri East, Mumbai, Maharashtra 400069",
      categoriesJson: JSON.stringify(["Biomaterials", "Instruments", "Implants"]),
      notes: "Primary supplier for Astra Tech implant fixtures and ceramic blanks",
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: "3M Oral Care Solutions India",
      contactPerson: "Rohit Deshmukh",
      email: "pune.healthcare@3m.com",
      phone: "+91 20 6680 1200",
      address: "Senapati Bapat Road, Pune, Maharashtra 411016",
      categoriesJson: JSON.stringify(["Consumables", "Restorative", "PPE"]),
      notes: "Filtek composite resins, Single Bond adhesives, nitrile gloves",
    },
  });

  const supplier3 = await prisma.supplier.create({
    data: {
      name: "Ivoclar Vivadent Marketing India",
      contactPerson: "Kavita Shah",
      email: "clinical.support@ivoclar.com",
      phone: "+91 22 4002 7788",
      address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      categoriesJson: JSON.stringify(["Biomaterials", "Restorative"]),
      notes: "IPS e.max CAD blocks, Variolink aesthetic resin cement",
    },
  });

  const inventoryItems = [
    {
      sku: "INV-COMP-FILTEK",
      name: "3M Filtek Supreme Universal Restorative (Body A2)",
      category: "Restorative",
      unit: "pack",
      quantityAvailable: 14,
      reorderThreshold: 5,
      supplierId: supplier2.id,
      purchaseCost: 2850,
      expiryDate: new Date("2027-05-31"),
      batchNumber: "3M-2025-08A",
    },
    {
      sku: "INV-EMAX-BLKS",
      name: "IPS e.max CAD HT Bleach BL2 Aesthetic Ceramic Blocks",
      category: "Biomaterials",
      unit: "box",
      quantityAvailable: 4, // Below threshold!
      reorderThreshold: 6,
      supplierId: supplier3.id,
      purchaseCost: 11200,
      expiryDate: new Date("2028-12-31"),
      batchNumber: "IVC-99812",
    },
    {
      sku: "INV-IMPL-ASTRA",
      name: "Astra Tech EV Implant Fixture Ø 4.2mm x 11mm",
      category: "Biomaterials",
      unit: "piece",
      quantityAvailable: 8,
      reorderThreshold: 4,
      supplierId: supplier1.id,
      purchaseCost: 19500,
      expiryDate: new Date("2028-06-30"),
      batchNumber: "DS-EV42-101",
    },
    {
      sku: "INV-PPE-GLOVE-M",
      name: "Hospital-Grade Powder-Free Nitrile Examination Gloves (M)",
      category: "PPE",
      unit: "box",
      quantityAvailable: 22,
      reorderThreshold: 10,
      supplierId: supplier2.id,
      purchaseCost: 650,
      expiryDate: new Date("2029-01-01"),
      batchNumber: "NIT-2025-M",
    },
    {
      sku: "INV-STER-POUCH",
      name: "Self-Sealing Class 4 Indicator Autoclave Sterilisation Pouches",
      category: "Sterilisation",
      unit: "pack",
      quantityAvailable: 3, // Low stock alert!
      reorderThreshold: 8,
      supplierId: supplier2.id,
      purchaseCost: 1200,
      expiryDate: new Date("2029-12-31"),
      batchNumber: "STER-POU-55",
    },
  ];

  for (const item of inventoryItems) {
    const createdItem = await prisma.inventoryItem.create({ data: item });
    // Record initial stock receipt
    await prisma.stockMovement.create({
      data: {
        inventoryItemId: createdItem.id,
        movementType: "Purchase",
        quantity: item.quantityAvailable,
        reason: "Initial clinic stock intake",
        recordedById: clinicAdmin.id,
      },
    });
  }
  console.log("✓ Seeded 3 medical suppliers, clinical inventory items, and stock movement ledger");

  // 11. SEED PATIENTS (Synthetic realistic profiles)
  const patient1 = await prisma.patient.create({
    data: {
      referenceId: "AUR-P-1001",
      fullName: "Meera Singhania",
      phone: "+91 98220 11223",
      email: "meera.singhania@example.com",
      dateOfBirth: new Date("1989-06-15"),
      gender: "Female",
      bloodGroup: "O+",
      address: "Bunglow 14, Lane 5, Koregaon Park",
      city: "Pune",
      medicalAlerts: "Mild dental anxiety; prefers topical pre-numbing spray",
      allergies: "None reported",
      emergencyContactName: "Kabir Singhania",
      emergencyContactPhone: "+91 98220 99887",
      status: "Active",
      notes: "Seeking bespoke smile design for upcoming family wedding.",
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      referenceId: "AUR-P-1002",
      fullName: "Rohan Malhotra",
      phone: "+91 98220 44556",
      email: "rohan.m@example.com",
      dateOfBirth: new Date("1992-11-20"),
      gender: "Male",
      bloodGroup: "B+",
      address: "Flat 402, Marvel Cerise, Kalyani Nagar",
      city: "Pune",
      medicalAlerts: "CRITICAL: Severe allergy to Penicillin / Beta-lactams",
      allergies: "Penicillin",
      emergencyContactName: "Tara Malhotra",
      emergencyContactPhone: "+91 98220 33441",
      status: "Active",
      notes: "Undergoing clear aligner therapy. Track alignment every 6 weeks.",
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      referenceId: "AUR-P-1003",
      fullName: "Priya Venkataraman",
      phone: "+91 98220 77889",
      email: "priya.v@example.com",
      dateOfBirth: new Date("1985-03-10"),
      gender: "Female",
      bloodGroup: "A+",
      address: "Plot 88, Viman Nagar",
      city: "Pune",
      medicalAlerts: "Nocturnal bruxism with enamel micro-cracks on molars",
      allergies: "None",
      emergencyContactName: "Sanjay Venkat",
      emergencyContactPhone: "+91 98220 55662",
      status: "Active",
      notes: "Teeth whitening completed. Nightguard fabrication scheduled.",
    },
  });

  const patient4 = await prisma.patient.create({
    data: {
      referenceId: "AUR-P-1004",
      fullName: "Arjun Kapoor",
      phone: "+91 98220 99001",
      email: "arjun.k@example.com",
      dateOfBirth: new Date("1995-08-25"),
      gender: "Male",
      bloodGroup: "AB+",
      address: "12 Riverside Terraces, Boat Club Road",
      city: "Pune",
      medicalAlerts: "Frequent international traveler; coordinate appointment clusters",
      allergies: "None",
      status: "Active",
      notes: "Interested in dental implants for lower right molar (#46).",
    },
  });

  const patient5 = await prisma.patient.create({
    data: {
      referenceId: "AUR-P-1005",
      fullName: "Sunita Deshpande",
      phone: "+91 98220 33445",
      email: "sunita.d@example.com",
      dateOfBirth: new Date("1971-02-18"),
      gender: "Female",
      bloodGroup: "O-",
      address: "Gulmohar Park, Model Colony, Shivajinagar",
      city: "Pune",
      medicalAlerts: "Hypertension (Amlodipine 5mg daily, well-managed)",
      allergies: "Sulfa drugs",
      emergencyContactName: "Dr. Avinash Deshpande",
      emergencyContactPhone: "+91 98220 22339",
      status: "Active",
      notes: "Routine bi-annual biomimetic preventive examination and scaling.",
    },
  });
  console.log("✓ Seeded 5 comprehensive patient records with medical alerts and contact history");

  // 12. SEED APPOINTMENTS
  const today = new Date();
  const todayDateStr = today.toISOString().split("T")[0];

  const apt1 = await prisma.appointment.create({
    data: {
      referenceId: "APT-2026-1001",
      patientId: patient1.id,
      dentistId: leadDentist.id,
      treatmentId: createdTreatments["smile-design"],
      date: new Date(todayDateStr),
      startTime: "10:00",
      endTime: "11:30",
      durationMinutes: 90,
      status: "Completed",
      bookingSource: "Reception",
      notes: "Stage 02 Trial Smile mock-up preview in operatory 1. Patient approved aesthetics.",
    },
  });

  const apt2 = await prisma.appointment.create({
    data: {
      referenceId: "APT-2026-1002",
      patientId: patient2.id,
      dentistId: orthoDentist.id,
      treatmentId: createdTreatments["clear-aligners"],
      date: new Date(todayDateStr),
      startTime: "11:45",
      endTime: "12:30",
      durationMinutes: 45,
      status: "In Progress",
      bookingSource: "Website",
      notes: "Tray #8 progress inspection and attachment placement on tooth 13 & 23.",
    },
  });

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateStr = tomorrow.toISOString().split("T")[0];

  const apt3 = await prisma.appointment.create({
    data: {
      referenceId: "APT-2026-1003",
      patientId: patient3.id,
      dentistId: leadDentist.id,
      treatmentId: createdTreatments["teeth-whitening"],
      date: new Date(tomorrowDateStr),
      startTime: "14:30",
      endTime: "15:30",
      durationMinutes: 60,
      status: "Confirmed",
      bookingSource: "Phone",
      notes: "In-chair Philips Zoom laser session with potassium nitrate desensitising protocol.",
    },
  });

  const apt4 = await prisma.appointment.create({
    data: {
      referenceId: "APT-2026-1004",
      patientId: patient4.id,
      dentistId: superAdmin.id,
      treatmentId: createdTreatments["dental-implants"],
      date: new Date(tomorrowDateStr),
      startTime: "16:00",
      endTime: "17:30",
      durationMinutes: 90,
      status: "Requested",
      bookingSource: "Website",
      notes: "New booking request from online portal. Awaiting phone confirmation by reception.",
    },
  });

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 4);

  const apt5 = await prisma.appointment.create({
    data: {
      referenceId: "APT-2026-1005",
      patientId: patient5.id,
      dentistId: leadDentist.id,
      treatmentId: createdTreatments["preventive-dentistry"],
      date: new Date(nextWeek.toISOString().split("T")[0]),
      startTime: "10:30",
      endTime: "11:30",
      durationMinutes: 60,
      status: "Confirmed",
      bookingSource: "Reception",
      notes: "Biomimetic preventive cleaning, fluoride varnish, and digital bitewing review.",
    },
  });
  console.log("✓ Seeded realistic appointment calendar entries across various operational statuses");

  // 13. SEED CLINICAL NOTES & TREATMENT PLANS
  await prisma.clinicalNote.create({
    data: {
      patientId: patient1.id,
      dentistId: leadDentist.id,
      appointmentId: apt1.id,
      toothNumber: "11, 12, 21, 22",
      chiefComplaint: "Desires enhanced smile symmetry and restoration of chipped lateral incisor edge.",
      clinicalFindings: "Micro-fracture on disto-incisal corner of 12. Moderate shade variation A3 to A1 across arch.",
      diagnosis: "Enamel micro-fracture #12, aesthetic disharmony of anterior sextant.",
      procedureConducted: "Composite mock-up trial smile placed direct intraorally without etching. Patient reviewed in natural daylight and approved golden proportion ratios.",
      materialsUsed: "Protemp 4 temporisation material (A1), Luxatemp glaze.",
      followUpDate: new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000),
      isRestricted: false,
    },
  });

  await prisma.treatmentPlan.create({
    data: {
      patientId: patient1.id,
      dentistId: leadDentist.id,
      title: "Bespoke Ceramic Smile Design (6 Upper Anterior Units)",
      estimatedCost: 85000,
      status: "In Progress",
      stagesJson: JSON.stringify([
        { stage: "1", title: "Digital 3D Intraoral Mapping & Facial Analysis", cost: 10000, status: "Completed" },
        { stage: "2", title: "Intraoral Trial Smile Mock-Up Preview", cost: 15000, status: "Completed" },
        { stage: "3", title: "Biomimetic Minimal Enamel Preparation", cost: 30000, status: "Pending" },
        { stage: "4", title: "Definitive Adhesive Cementation under Rubber Dam", cost: 30000, status: "Pending" },
      ]),
      notes: "Patient signed digital informed consent form on 2026-10-18.",
    },
  });
  console.log("✓ Seeded clinical notes, diagnosis, and staged treatment plans");

  // 14. SEED INVOICES & PAYMENTS
  const inv1 = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-001",
      patientId: patient1.id,
      appointmentId: apt1.id,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      subtotal: 25000,
      discount: 0,
      taxRate: 18,
      taxAmount: 4500,
      totalAmount: 29500,
      amountPaid: 29500,
      balanceDue: 0,
      status: "Paid",
      notes: "Stage 01 & 02 consultation, 3D optical scan, and intraoral trial mock-up.",
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv1.id,
      treatmentId: createdTreatments["smile-design"],
      description: "Smile Design Diagnostic 3D Mapping & Trial Mock-up",
      quantity: 1,
      unitPrice: 25000,
      amount: 25000,
    },
  });

  await prisma.payment.create({
    data: {
      paymentReference: "PAY-2026-001",
      invoiceId: inv1.id,
      patientId: patient1.id,
      amount: 29500,
      paymentMethod: "Card",
      transactionReference: "HDFC-POS-8891244",
      recordedById: receptionist.id,
      notes: "Settled via HDFC Visa Infinite terminal at reception desk.",
    },
  });

  const inv2 = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-002",
      patientId: patient2.id,
      appointmentId: apt2.id,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      subtotal: 175000,
      discount: 5000,
      taxRate: 18,
      taxAmount: 30600,
      totalAmount: 200600,
      amountPaid: 60000,
      balanceDue: 140600,
      status: "Partially Paid",
      notes: "Comprehensive Clear Aligner package (Trays 1–24 + retainers). Initial tranche paid.",
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv2.id,
      treatmentId: createdTreatments["clear-aligners"],
      description: "Dual-Arch Clear Aligner System with Digital Monitoring",
      quantity: 1,
      unitPrice: 170000,
      amount: 170000,
    },
  });

  await prisma.payment.create({
    data: {
      paymentReference: "PAY-2026-002",
      invoiceId: inv2.id,
      patientId: patient2.id,
      amount: 60000,
      paymentMethod: "UPI",
      transactionReference: "UPI-429910488219@icici",
      recordedById: receptionist.id,
      notes: "Initial deposit received via UPI QR scan.",
    },
  });
  console.log("✓ Seeded real invoices, tax calculations, and verified payment transactions");

  // 15. SEED CLINICAL EXPENSES
  await prisma.expense.create({
    data: {
      expenseNumber: "EXP-2026-001",
      category: "Lab Fees",
      description: "Premium Ceramic Artistry Lab (Zurich / Mumbai) — 6 Veneer diagnostic wax-up",
      amount: 18500,
      supplierId: supplier3.id,
      paymentStatus: "Paid",
      createdById: accountant.id,
      notes: "Invoice #LAB-4491 cleared via RTGS.",
    },
  });

  await prisma.expense.create({
    data: {
      expenseNumber: "EXP-2026-002",
      category: "Clinical Supplies",
      description: "Monthly autoclave pouches, barrier film, and hospital-grade micro-filters",
      amount: 8400,
      supplierId: supplier2.id,
      paymentStatus: "Paid",
      createdById: clinicAdmin.id,
      notes: "Delivered to studio reception on 2026-10-15.",
    },
  });
  console.log("✓ Seeded operational clinic expenses");

  // 16. SEED LEADS & ENQUIRIES
  await prisma.leadEnquiry.create({
    data: {
      referenceId: "LEAD-2026-001",
      type: "Booking Request",
      name: "Radhika Kirloskar",
      email: "radhika.kirloskar@example.com",
      phone: "+91 98221 44332",
      requestedTreatment: "Smile Design",
      preferredDate: "2026-10-25",
      preferredTime: "Morning (10:00 AM – 01:00 PM)",
      message: "Interested in consulting regarding porcelain veneers to correct uneven smile line.",
      sourcePage: "/book-appointment",
      status: "New",
      notes: "Requires callback to schedule formal 45-min consultation.",
    },
  });

  await prisma.leadEnquiry.create({
    data: {
      referenceId: "LEAD-2026-002",
      type: "Contact Form",
      name: "Sameer Nambiar",
      email: "sameer.n@example.com",
      phone: "+91 98223 88771",
      requestedTreatment: "Dental Implants",
      message: "Do you offer CBCT guided implant placement for single molar replacement?",
      sourcePage: "/contact",
      status: "Contacted",
      notes: "Emailed digital brochure and pricing roadmap on Oct 20.",
    },
  });
  console.log("✓ Seeded central lead and booking request records");

  // 17. SEED NOTIFICATIONS
  await prisma.notification.create({
    data: {
      title: "New Booking Request",
      message: "Radhika Kirloskar submitted a booking request for Smile Design.",
      type: "info",
      link: "/admin/leads",
    },
  });

  await prisma.notification.create({
    data: {
      title: "Low Inventory Alert",
      message: "Autoclave Sterilisation Pouches are down to 3 packs (Reorder threshold: 8).",
      type: "warning",
      link: "/admin/inventory",
    },
  });

  await prisma.notification.create({
    data: {
      title: "Payment Collected",
      message: "₹29,500 collected from Meera Singhania for Invoice INV-2026-001.",
      type: "success",
      link: "/admin/payments",
    },
  });

  // 18. SEED INITIAL AUDIT LOG
  await prisma.auditLog.create({
    data: {
      actorId: superAdmin.id,
      actorName: superAdmin.fullName,
      actorRole: superAdmin.role,
      action: "INITIALIZE_DATABASE",
      entityType: "System",
      detailsJson: JSON.stringify({
        message: "AURELIS Dental Studio database initialized with production-grade schema and seeded records.",
        timestamp: new Date().toISOString(),
      }),
    },
  });
  console.log("✓ Recorded initial system audit trail");

  console.log("\n==================================================");
  console.log("🎉 SEEDING COMPLETE! AURELIS DATABASE IS FULLY ARMED.");
  console.log("==================================================");
  console.log("Admin Logins:");
  console.log("  SUPER ADMIN:   admin@aurelisdental.in   / Aurelis@2026!");
  console.log("  CLINIC ADMIN:  manager@aurelisdental.in / Manager@2026!");
  console.log("  DENTIST:       dr.ananya@aurelisdental.in / Dentist@2026!");
  console.log("  RECEPTIONIST:  reception@aurelisdental.in / Reception@2026!");
  console.log("  ACCOUNTANT:    accounts@aurelisdental.in / Accounts@2026!");
  console.log("  CONTENT EDITOR:editor@aurelisdental.in  / Editor@2026!");
  console.log("==================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
