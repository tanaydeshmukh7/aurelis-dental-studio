"use client";

import { useState } from "react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import BrandStory from "@/components/BrandStory";
import SignatureTreatments from "@/components/SignatureTreatments";
import InteractiveExplorer from "@/components/InteractiveExplorer";
import StudioEnvironment from "@/components/StudioEnvironment";
import PatientJourney from "@/components/PatientJourney";
import TeamSection from "@/components/TeamSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import FaqSection from "@/components/FaqSection";
import JournalPreview from "@/components/home/JournalPreview";
import AppointmentSection from "@/components/AppointmentSection";
import LocationSection from "@/components/LocationSection";
import SiteFooter from "@/components/common/SiteFooter";
import BookingModal from "@/components/BookingModal";
import TreatmentDetailModal from "@/components/TreatmentDetailModal";
import { TREATMENTS, Treatment } from "@/data/treatments";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>("Smile Design");
  const [activeDetailTreatment, setActiveDetailTreatment] = useState<Treatment | null>(null);

  const handleOpenBooking = (treatmentTitle?: string) => {
    if (treatmentTitle) {
      setSelectedTreatmentForBooking(treatmentTitle);
    }
    setIsBookingModalOpen(true);
  };

  const handleExploreDetailById = (treatmentId: string) => {
    const found = TREATMENTS.find((t) => t.id === treatmentId);
    if (found) {
      setActiveDetailTreatment(found);
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-espresso flex flex-col">
      {/* Sticky Editorial Navigation */}
      <SiteNavbar onOpenBookingModal={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Introduction / Brand Story */}
      <BrandStory />

      {/* Signature Treatments with Varied Layouts */}
      <SignatureTreatments
        onSelectTreatmentForBooking={(title) => handleOpenBooking(title)}
      />

      {/* Interactive Signature Treatment Explorer */}
      <InteractiveExplorer
        onOpenBooking={() => handleOpenBooking()}
        onExploreDetail={handleExploreDetailById}
      />

      {/* Cinematic Studio Environment Section */}
      <StudioEnvironment />

      {/* The Patient Journey Timeline */}
      <PatientJourney />

      {/* Dentist & Clinical Leadership Section */}
      <TeamSection />

      {/* Patient Experiences / Testimonial Slider */}
      <TestimonialSlider />

      {/* Medically Responsible FAQ Accordion */}
      <FaqSection />

      {/* The Aurelis Journal / Blog Preview */}
      <JournalPreview />

      {/* Comprehensive Appointment Booking Section */}
      <AppointmentSection initialTreatment={selectedTreatmentForBooking} />

      {/* Location, Studio Hours & Contact in Koregaon Park Pune */}
      <LocationSection />

      {/* Editorial Dark Espresso Multipage Footer */}
      <SiteFooter />

      {/* Rapid Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedTreatment={selectedTreatmentForBooking}
      />

      {/* Detail Modal Triggered from Explorer or Cards */}
      <TreatmentDetailModal
        treatment={activeDetailTreatment}
        onClose={() => setActiveDetailTreatment(null)}
        onBookTreatment={(title) => handleOpenBooking(title)}
      />
    </main>
  );
}
