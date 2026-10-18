"use client";

import SiteNavbar from "./navigation/SiteNavbar";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  return <SiteNavbar onOpenBookingModal={onOpenBooking} />;
}
