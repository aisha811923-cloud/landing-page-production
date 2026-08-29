import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/context/WaitlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReferralModal from "@/components/shared/ReferralModal";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EMULSION • The Analog Social Club & Shared Camera Rolls",
  description:
    "The anti-instant camera. Shoot blind 35mm film rolls, delay development, swap shared rolls with friends, and compile authentic contact sheets.",
  keywords: [
    "analog camera",
    "35mm film",
    "disposable camera app",
    "shared camera roll",
    "roll swap",
    "contact sheet",
    "slow social media",
    "retro photography",
  ],
  openGraph: {
    title: "EMULSION • The Anti-Instant Camera Club",
    description:
      "Shoot blind. Develop later. Share the anticipation. Claim your founding pass in the first 100 member cohort.",
    url: "https://emulsion.club",
    siteName: "EMULSION",
    locale: "en_US",
    type: "website",
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
      className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable} overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#1A1815] antialiased selection:bg-[#C86428] selection:text-white overflow-x-hidden w-full max-w-full relative">
        <WaitlistProvider>
          <Navbar />
          <main className="flex-1 pt-32 sm:pt-40 overflow-x-hidden w-full max-w-full">{children}</main>
          <Footer />
          <ReferralModal />
        </WaitlistProvider>
      </body>
    </html>
  );
}
