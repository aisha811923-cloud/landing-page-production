"use client";

import React, { Suspense } from "react";
import WaitlistSection from "@/components/home/WaitlistSection";

export function WaitlistForm() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs font-mono-mechanical text-[#6E675F]">Loading waitlist...</div>}>
      <WaitlistSection />
    </Suspense>
  );
}

export default WaitlistForm;
