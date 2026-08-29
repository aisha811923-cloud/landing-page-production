"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Download, Sparkles, Smartphone, Grid, Layers } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const CONTACT_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    frame: "14A",
    title: "Golden Hour Rooftop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    frame: "15",
    title: "Morning Espresso",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    frame: "15A",
    title: "Vinyl Soundcheck",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    frame: "16",
    title: "Saturday Evening",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    frame: "16A",
    title: "Spontaneous Laughter",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    frame: "17",
    title: "Coast Road Trip",
  },
];

export default function ContactSheet3D() {
  const { openModal, triggerConfetti, vipData } = useWaitlist();
  const [isStoryView, setIsStoryView] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCtaClick = () => {
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

  // Mouse tilt parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-250, 250], [7, -7]);
  const rotateY = useTransform(smoothMouseX, [-250, 250], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownloadSimulation = () => {
    setDownloaded(true);
    triggerConfetti();
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]">
          <Layers className="w-3.5 h-3.5 text-[#C86428]" />
          <span>AUTO-GENERATED DARKROOM CONTACT SHEETS</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
          Every Developed Roll Becomes <br />
          <span className="italic font-normal text-[#C86428]">A 4×6 Physical Keepsake</span>
        </h2>
        <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
          Once your roll finishes developing, EMULSION compiles your full exposure strip with authentic Kodak Portra 400 rebate borders and frame codes ready for 1-tap Instagram Story export.
        </p>

        {/* View Toggle */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={() => setIsStoryView(false)}
            className={`px-4 py-2 rounded-full text-xs font-mono-mechanical flex items-center gap-1.5 transition-all ${
              !isStoryView
                ? "bg-[#1A1815] text-[#F9F6F0] shadow-sm font-semibold"
                : "bg-[#FFFFFF] text-[#6E675F] border border-[#E8E1D3] hover:text-[#1A1815]"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>4×6 Darkroom Print</span>
          </button>
          <button
            onClick={() => setIsStoryView(true)}
            className={`px-4 py-2 rounded-full text-xs font-mono-mechanical flex items-center gap-1.5 transition-all ${
              isStoryView
                ? "bg-[#1A1815] text-[#F9F6F0] shadow-sm font-semibold"
                : "bg-[#FFFFFF] text-[#6E675F] border border-[#E8E1D3] hover:text-[#1A1815]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Instagram Story Mode</span>
          </button>
        </div>
      </motion.div>

      {/* 3D Magnetic Parallax Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-3xl mx-auto perspective-1000 py-4"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={`relative mx-auto rounded-3xl bg-[#121110] border-4 border-[#25221F] shadow-tactile-lg transition-all duration-500 overflow-hidden ${
            isStoryView ? "max-w-xs p-4" : "p-4 sm:p-8"
          }`}
        >
          {/* Authentic Kodak Rebate Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#332F2B] font-mono-mechanical text-[9px] sm:text-[10px] text-[#D4AF37] tracking-widest">
            <div className="flex items-center gap-2">
              <span className="font-bold">KODAK PORTRA 400</span>
              <span className="text-[#9C9488] hidden sm:inline">SAFETY FILM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9C9488]">[EXP 01-06]</span>
              <span>EMU-35</span>
            </div>
          </div>

          {/* Contact Sheet Frames Grid */}
          <div
            className={`grid gap-2 sm:gap-4 my-4 ${
              isStoryView ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {CONTACT_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-lg overflow-hidden bg-[#1A1815] border border-[#2E2A27] aspect-[4/3]"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-1 left-1 font-mono-mechanical text-[7px] sm:text-[8px] text-[#D4AF37] bg-black/60 px-1 py-0.5 rounded">
                  ▲ {photo.frame}
                </div>
                <div className="absolute bottom-1 right-1 font-mono-mechanical text-[7px] sm:text-[8px] text-white/80 bg-black/60 px-1 py-0.5 rounded truncate max-w-[85%]">
                  {photo.title}
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Kodak Rebate Footer & Barcode Marks */}
          <div className="flex items-center justify-between pt-3 border-t border-[#332F2B] font-mono-mechanical text-[8px] sm:text-[9px] text-[#9C9488]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <span>|||| || ||| |||||</span>
              <span>DX 35MM-400</span>
            </div>
            <div className="text-right">
              <span>DATE: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Controls Below Sheet */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadSimulation}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E8E1D3] text-[#1A1815] text-xs font-mono-mechanical font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-[#C86428]" />
            <span>{downloaded ? "Contact Sheet Downloaded!" : "Download 4×6 Print Asset"}</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCtaClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-amber-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{vipData?.success ? "View My VIP Pass" : "Reserve Pass to Generate Yours"}</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
