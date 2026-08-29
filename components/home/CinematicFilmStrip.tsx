"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MoveHorizontal,
  Flame,
} from "lucide-react";
import { VIEWFINDER_SCENES } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";

interface CinematicFilmStripProps {
  onReset: () => void;
}

export default function CinematicFilmStrip({ onReset }: CinematicFilmStripProps) {
  const { openModal, vipData } = useWaitlist();
  const containerRef = useRef<HTMLDivElement>(null);

  const FRAMES = [
    {
      scene: VIEWFINDER_SCENES[0],
      frameNumber: "01",
      subFrame: "01A",
      edgeCode: "KODAK VISION3 500T • 5219",
      barcode: "||| | || |||| |",
      iso: "500T",
      latentCode: "5219 042 1892",
    },
    {
      scene: VIEWFINDER_SCENES[1],
      frameNumber: "02",
      subFrame: "02A",
      edgeCode: "KODAK VISION3 500T • 5219",
      barcode: "|| ||| | ||| ||",
      iso: "500T",
      latentCode: "5219 042 1893",
    },
    {
      scene: VIEWFINDER_SCENES[2],
      frameNumber: "03",
      subFrame: "03A",
      edgeCode: "SAFETY FILM • EMULSION",
      barcode: "|||| | || ||| |",
      iso: "500T",
      latentCode: "5219 042 1894",
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#0D0D0F] p-2 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Light Table Header Controls */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pb-2 sm:pb-2.5 border-b border-[#2A2724] font-mono-mechanical text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 text-[#D97736]">
          <Flame className="w-3.5 h-3.5 text-[#D97736] animate-pulse" />
          <span className="font-bold tracking-wider text-[#F9F6F0]">
            KODAK VISION3 500T (5219)
          </span>
          <span className="hidden sm:inline text-[#6E675F]">•</span>
          <span className="hidden sm:inline text-[#D6CCA8]">35MM MOTION PICTURE LIGHT TABLE</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1815] border border-[#3D3833] text-[9px] text-[#9C9488]">
            <MoveHorizontal className="w-3 h-3 text-[#D97736]" />
            <span>DRAG FILM REEL ◄►</span>
          </div>

          <span className="text-[#15803D] flex items-center gap-1 font-bold text-[10px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" /> DEVELOPED & BAKED
          </span>
        </div>
      </div>

      {/* 2. Backlit Light Table with Halation Glow & Continuous Film Ribbon */}
      <div
        ref={containerRef}
        className="relative my-auto py-3 sm:py-5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing rounded-2xl bg-gradient-to-b from-[#141316] via-[#1A181C] to-[#141316] border border-[#2E2B30] shadow-[0_0_35px_rgba(217,119,54,0.15)]"
      >
        {/* Warm Amber Halation Backlight Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/15 via-orange-950/5 to-transparent pointer-events-none" />

        {/* Continuous Draggable Celluloid Film Ribbon */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.12}
          initial={{ x: 50 }}
          animate={{ x: [50, -10, 0] }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-flex flex-col bg-[#0D0D0F] border-y border-[#262428] shadow-2xl px-4 sm:px-8 py-2 min-w-max"
        >
          {/* Translucent Glossy Celluloid Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/50 pointer-events-none" />

          {/* ──────────────── TOP SPROCKET RAIL & KEYCODE TRACK ──────────────── */}
          <div className="relative flex items-center justify-between gap-6 pb-2 border-b border-[#1E1C20] font-mono-mechanical text-[9px] sm:text-[10px] text-[#D97736] tracking-widest uppercase select-none">
            {FRAMES.map((f, i) => (
              <div key={`top-${i}`} className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* 4 Sprocket Perforations */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                </div>

                {/* Glowing Amber Rebate Keycodes & Optical Barcodes */}
                <div className="flex items-center gap-2 px-1 text-[#D97736]">
                  <span className="font-bold">{f.edgeCode}</span>
                  <span className="text-[#8C4A1E] font-mono text-[8px] tracking-normal">{f.barcode}</span>
                  <span className="text-[#A65B28] text-[8px] font-bold">▲ {f.frameNumber}</span>
                </div>

                {/* 2 Sprockets for Frame Spacing */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                </div>
              </div>
            ))}
          </div>

          {/* ──────────────── MIDDLE 3:2 FILM GATE FRAMES ──────────────── */}
          <div className="relative py-2.5 sm:py-3 flex items-center gap-3">
            {FRAMES.map((f, idx) => (
              <div
                key={`gate-${idx}`}
                className="group relative w-[220px] sm:w-[280px] md:w-[320px] aspect-[3/2] shrink-0 bg-[#000000] rounded-[2px] overflow-hidden border border-[#262322] shadow-tactile transition-transform duration-300"
              >
                {/* Clean 35mm Motion Picture Frame (Zero Clunky Overlay Badges) */}
                <img
                  src={f.scene.imageUrl}
                  alt={f.scene.title}
                  className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-103 transition-transform duration-500"
                  draggable={false}
                />

                {/* 35mm Frame Gate Edge Line */}
                <div className="absolute inset-0 border border-black/80 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
              </div>
            ))}

            {/* Trailing Unexposed Celluloid Leader */}
            <div className="w-16 sm:w-24 aspect-[3/2] shrink-0 bg-[#0A090C] border border-[#262322] flex items-center justify-center font-mono-mechanical text-[8px] text-[#4A443E] uppercase tracking-widest rounded-[2px]">
              LEAD ──►
            </div>
          </div>

          {/* ──────────────── BOTTOM SPROCKET RAIL & KEYCODE TRACK ──────────────── */}
          <div className="relative flex items-center justify-between gap-6 pt-2 border-t border-[#1E1C20] font-mono-mechanical text-[9px] sm:text-[10px] text-[#D97736] tracking-widest uppercase select-none">
            {FRAMES.map((f, i) => (
              <div key={`bottom-${i}`} className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* 4 Sprocket Perforations */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                </div>

                {/* Glowing Frame Numbering & Arrow Rebates */}
                <div className="flex items-center gap-2 sm:gap-3 px-1 text-[#D97736]">
                  <span className="font-bold text-[#E5894E]">{f.frameNumber} ──► {f.subFrame}</span>
                  <span className="text-[#8C4A1E] text-[8px] font-mono">{f.barcode}</span>
                  <span className="text-[#C5A870] font-bold text-[8px] sm:text-[9px]">ISO {f.iso}</span>
                </div>

                {/* 2 Sprockets for Frame Spacing */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                  <div className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-[2px] bg-[#050506] border border-white/10 shadow-inner" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. Light Table Bottom Action Bar */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 sm:pt-2.5 border-t border-[#2A2724]">
        <div className="text-left font-mono-mechanical text-xs text-[#F9F6F0]">
          <span className="text-[#C5A870] font-bold">35mm Negative Developed on Light Table.</span>
          <span className="hidden sm:inline text-[#9C9488] ml-1">
            Drag the ribbon to inspect each frame.
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={onReset}
            className="p-2 sm:p-2.5 rounded-xl bg-[#1F1D1B] hover:bg-[#2E2A27] text-[#D6CCA8] border border-[#3D3833] transition-colors cursor-pointer"
            title="Reset test roll to shoot again"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={openModal}
            className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-amber-glow transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F9F6F0]" />
            <span>{vipData?.success ? "View My Pass" : "Reserve VIP Handle"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
