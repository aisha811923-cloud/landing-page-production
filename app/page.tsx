import React, { Suspense } from "react";
import HeroViewfinder from "@/components/home/HeroViewfinder";
import ManifestoStrip from "@/components/home/ManifestoStrip";
import RollDial from "@/components/home/RollDial";
import ContactSheet3D from "@/components/home/ContactSheet3D";
import ScrapbookPreview from "@/components/home/ScrapbookPreview";
import WaitlistSection from "@/components/home/WaitlistSection";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero 35mm Viewfinder with 3 Test Shots & Darkroom Development */}
      <HeroViewfinder />

      {/* 2. The Anti-Performance Manifesto Comparison Strip */}
      <ManifestoStrip />

      {/* 3. Stepped 4-to-24 Aperture Selector Dial */}
      <RollDial />

      {/* 4. 3D Parallax Contact Sheet Showcase */}
      <ContactSheet3D />

      {/* 5. Collaborative Scrapbook Pinboard Sneak Peek */}
      <ScrapbookPreview />

      {/* 6. VIP Waitlist & Handle Reservation Section */}
      <Suspense fallback={<div className="py-24 text-center text-xs font-mono-mechanical text-[#6E675F]">Loading reservation form...</div>}>
        <WaitlistSection />
      </Suspense>
    </div>
  );
}
