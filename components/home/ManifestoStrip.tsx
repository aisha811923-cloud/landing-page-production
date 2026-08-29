"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { XCircle, CheckCircle2, Flame, Sparkles } from "lucide-react";

export default function ManifestoStrip() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F3ECE1] border-y border-[#E8E1D3] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]">
            <Flame className="w-3.5 h-3.5 text-[#C86428]" />
            <span>THE ANTI-PERFORMANCE SHIFT</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1815] break-words">
            Why Modern Social Photos <br />
            <span className="italic text-[#6E675F] font-normal">Feel So Exhausting</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            Every social app turned visual memories into a live audition for strangers. Here is how EMULSION breaks the loop.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Card 1: The Modern Performance Trap */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(185, 28, 28, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-6 relative overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D3]">
              <div className="space-y-1">
                <span className="font-mono-mechanical text-[10px] uppercase tracking-widest text-[#B91C1C]">
                  THE CURRENT STATUS QUO
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#1A1815]">
                  Instant Dopamine Trap
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-4 text-sm text-[#6E675F] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#B91C1C] font-bold mt-0.5">•</span>
                <span className="break-words"><strong>50 Retakes Per Post:</strong> Constant checking of the screen creates anxiety and disrupts real-world conversations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B91C1C] font-bold mt-0.5">•</span>
                <span className="break-words"><strong>Instant Deletion Syndrome:</strong> Imperfect shots get instantly erased before they have a chance to become cherished memories.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B91C1C] font-bold mt-0.5">•</span>
                <span className="break-words"><strong>Staged for the Algorithm:</strong> Photos are curated to please public feeds, follower counts, and engagement metrics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B91C1C] font-bold mt-0.5">•</span>
                <span className="break-words"><strong>Zero Anticipation:</strong> Seeing the photo immediately strips away the mystery and excitement of developing.</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: The EMULSION Analog Way */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 16px 35px -10px rgba(197, 168, 112, 0.25)" }}
            whileTap={{ scale: 0.98 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#C5A870] shadow-tactile-lg space-y-6 relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 px-4 py-1 bg-[#C5A870] text-[#1A1815] font-mono-mechanical text-[9px] uppercase tracking-widest font-bold rounded-bl-xl">
              EMULSION PARADIGM
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D3]">
              <div className="space-y-1">
                <span className="font-mono-mechanical text-[10px] uppercase tracking-widest text-[#15803D]">
                  AUTHENTIC 35MM EXPERIENCE
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#1A1815]">
                  Slow Analog Connection
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-4 text-sm text-[#1A1815] leading-relaxed">
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                <span className="break-words"><strong>Blind Capture:</strong> Click the shutter, lock the exposure, put your phone in your pocket, and stay present.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                <span className="break-words"><strong>Zero Previews, Zero Deletes:</strong> Authentic light leaks, film grain, and candid moments remain untouched and real.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                <span className="break-words"><strong>Co-Shot Roll Swaps:</strong> Share a single roll blind with a best friend. Neither sees anything until the roll develops together.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C86428] shrink-0 mt-0.5" />
                <span className="break-words"><strong>Auto-Generated Contact Sheets:</strong> High-res darkroom contact sheets ready for Instagram Stories or private boards.</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
