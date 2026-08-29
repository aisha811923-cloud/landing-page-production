"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Clock, Users, ChevronRight } from "lucide-react";
import { ROLL_TIERS } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";

export default function RollDial() {
  const { openModal, vipData } = useWaitlist();
  const [selectedExp, setSelectedExp] = useState<number>(12);

  const activeTier =
    ROLL_TIERS.find((t) => t.exposures === selectedExp) || ROLL_TIERS[2];

  const handleSelectTier = () => {
    if (vipData?.success) {
      openModal();
    } else {
      const formEl = document.getElementById("waitlist-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#waitlist-form";
      }
    }
  };

  return (
    <section id="roll-selector-section" className="pt-24 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-10 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto px-4 text-center mt-6 mb-8 space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]">
          <Film className="w-3.5 h-3.5 text-[#C86428]" />
          <span>FLEXIBLE ROLL ARCHITECTURE (4 TO 24 EXPOSURES)</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
          Roll Sizes Tailored to <br />
          <span className="italic font-normal text-[#C86428]">The Exact Moment</span>
        </h2>
        <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
          Not every memory needs 24 shots. Dial your roll capacity depending on whether you are stepping out for a 15-minute coffee or embarking on a month-long journey.
        </p>
      </motion.div>

      {/* The Stepped Aperture Dial Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-6"
      >
        <div className="flex items-center justify-between text-xs font-mono-mechanical text-[#6E675F] pb-2 border-b border-[#E8E1D3]">
          <span>SELECT ROLL CAPACITY</span>
          <span className="text-[#C86428] font-bold">
            {activeTier.exposures} EXPOSURES SELECTED
          </span>
        </div>

        {/* Responsive Mobile Swipeable Carousel / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-5 overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-3 no-scrollbar pb-2 -mx-1 px-1">
          {ROLL_TIERS.map((tier) => {
            const isSelected = selectedExp === tier.exposures;
            return (
              <motion.button
                key={tier.exposures}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedExp(tier.exposures)}
                id={`roll-tier-btn-${tier.exposures}`}
                className={`relative py-3.5 sm:py-4 px-4 sm:px-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 snap-center shrink-0 min-w-[80px] sm:min-w-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#1A1815] text-[#F9F6F0] shadow-tactile-lg scale-102 border-2 border-[#C5A870]"
                    : "bg-[#F3ECE1] hover:bg-[#E8E1D3] text-[#1A1815] border border-[#E8E1D3]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-dial-indicator"
                    className="absolute -top-1.5 w-3 h-3 rounded-full bg-[#C86428] shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="font-mono-mechanical text-xl sm:text-2xl font-bold">
                  {tier.exposures}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono-mechanical uppercase tracking-wider text-[#9C9488]">
                  EXP
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Tier Specification Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.exposures}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-8 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Left: Simulated 35mm Metallic Canister */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ rotate: 2, scale: 1.03 }}
                className="relative w-32 sm:w-36 h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-[#2E2A27] via-[#1A1815] to-[#121110] p-4 text-[#F9F6F0] flex flex-col justify-between border-2 border-[#C5A870] shadow-tactile-lg overflow-hidden cursor-default"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-t-md bg-[#C5A870] border border-black" />

                <div className="flex justify-between items-start pt-1">
                  <span className="font-mono-mechanical text-[9px] text-[#C5A870] font-bold">
                    EMULSION
                  </span>
                  <span className="font-mono-mechanical text-[9px] text-[#9C9488]">
                    ISO 400
                  </span>
                </div>

                <div className="text-center py-2">
                  <div className="font-serif-display text-3xl font-bold text-[#F9F6F0]">
                    {activeTier.exposures}
                  </div>
                  <div className="font-mono-mechanical text-[8px] tracking-widest text-[#D4AF37] uppercase">
                    {activeTier.name}
                  </div>
                </div>

                <div className="border-t border-white/20 pt-1 text-center font-mono-mechanical text-[8px] text-[#9C9488]">
                  {activeTier.canisterCode}
                </div>
              </motion.div>
            </div>

            {/* Right: Tier Details & Specs */}
            <div className="md:col-span-8 w-full min-w-0 flex flex-col justify-between space-y-6">
              {/* Header & Description */}
              <div className="space-y-2 min-w-0">
                <span className="font-mono-mechanical text-xs uppercase tracking-widest text-[#C86428] font-semibold">
                  {activeTier.badge}
                </span>
                <h3 className="font-serif-display text-2xl lg:text-3xl font-normal text-[#1A1815] leading-tight break-words">
                  {activeTier.name} — {activeTier.subtitle}
                </h3>
                <p className="text-sm lg:text-base text-[#6E675F] leading-relaxed break-words whitespace-normal max-w-xl">
                  {activeTier.description}
                </p>
              </div>

              {/* Metadata Badges Grid (Pacing & Best For) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
                {/* Pacing Card */}
                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E1D3] min-w-0 shadow-xs">
                  <div className="shrink-0 mt-0.5 text-[#C86428]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#9C9488] mb-0.5">
                      PACING
                    </span>
                    <p className="font-mono text-xs lg:text-sm font-medium text-[#1A1815] leading-snug break-words whitespace-normal">
                      {activeTier.duration}
                    </p>
                  </div>
                </div>

                {/* Best For Card */}
                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E1D3] min-w-0 shadow-xs">
                  <div className="shrink-0 mt-0.5 text-[#C86428]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#9C9488] mb-0.5">
                      BEST FOR
                    </span>
                    <p className="font-mono text-xs lg:text-sm font-medium text-[#1A1815] leading-snug break-words whitespace-normal">
                      {activeTier.idealFor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Subtext & Select Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E8E1D3]/60 min-w-0">
                <p className="font-mono text-xs text-[#9C9488] break-words whitespace-normal max-w-sm">
                  Supports 1-person solo rolls or 2-person Roll Swaps.
                </p>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSelectTier}
                  className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1A1815] text-[#F9F6F0] font-mono text-xs tracking-wider uppercase hover:bg-[#C86428] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>SELECT {activeTier.exposures} EXP →</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}


