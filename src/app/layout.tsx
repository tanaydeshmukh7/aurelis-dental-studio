import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F7F5F0",
};

export const metadata: Metadata = {
  title: "AURELIS Dental Studio | Confident Smiles. A Healthier You. · Pune",
  description:
    "A more thoughtful approach to dentistry. Bespoke smile design, modern restorative care, and a calm, elevated patient experience in Koregaon Park, Pune.",
  keywords: [
    "Aurelis Dental Studio",
    "Dentist Pune",
    "Koregaon Park dental clinic",
    "Cosmetic dentistry Pune",
    "Smile design Pune",
    "Teeth whitening Koregaon Park",
    "Clear aligners Pune",
    "Dental implants Pune",
  ],
  openGraph: {
    title: "AURELIS Dental Studio | Confident Smiles. A Healthier You.",
    description:
      "A more thoughtful approach to dentistry. Bespoke smile design and modern restorative care in Koregaon Park, Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "AURELIS Dental Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="font-sans bg-ivory text-espresso antialiased selection:bg-sage selection:text-white">
        {children}
      </body>
    </html>
  );
}
