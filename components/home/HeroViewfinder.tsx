"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Lock } from "lucide-react";
import { VIEWFINDER_SCENES } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";
import CinematicFilmStrip from "@/components/home/CinematicFilmStrip";

export default function HeroViewfinder() {
  const { claimedCount } = useWaitlist();
  const [currentShot, setCurrentShot] = useState(0);
  const [isDepressed, setIsDepressed] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [developProgress, setDevelopProgress] = useState(0);
  const [isDeveloped, setIsDeveloped] = useState(false);

  const activeScene = VIEWFINDER_SCENES[Math.min(currentShot, 2)];

  const handleShutterClick = () => {
    if (isDeveloping || isDeveloped) return;

    // 1. Shutter button depression
    setIsDepressed(true);
    setTimeout(() => setIsDepressed(false), 90);

    // 2. Safe-light amber flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 180);

    const nextShot = currentShot + 1;

    if (nextShot >= 3) {
      setCurrentShot(3);
      setIsDeveloping(true);
      setDevelopProgress(0);

      const interval = setInterval(() => {
        setDevelopProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDeveloping(false);
            setIsDeveloped(true);
            return 100;
          }
          return prev + 5;
        });
      }, 130);
    } else {
      setCurrentShot(nextShot);
    }
  };

  const resetViewfinder = () => {
    setCurrentShot(0);
    setIsDeveloping(false);
    setIsDeveloped(false);
    setDevelopProgress(0);
  };

  return (
    <section className="relative pt-2 pb-16 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Top Editorial Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]"
        >
          <span className="w-2 h-2 rounded-full bg-[#C86428] animate-pulse" />
          <span>
            BATCH #01 • {Math.max(0, 100 - claimedCount)} / 100 FOUNDING PASSES REMAINING
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1A1815] leading-[1.08] break-words"
        >
          The Anti-Instant <br />
          <span className="italic font-normal text-[#C86428]">Camera Club.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#6E675F] max-w-2xl mx-auto px-4 font-normal leading-relaxed break-words"
        >
          Shoot blind. Develop later. Swap rolls with friends. Rediscover the genuine anticipation of 35mm film without the social performance anxiety.
        </motion.p>
      </div>

      {/* 35mm Analog Camera Viewfinder Chassis */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto rounded-3xl bg-[#1A1815] p-3 sm:p-5 shadow-tactile-lg border-4 border-[#332F2B]"
      >
        {/* Analog Camera Top Plate & Controls */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#25221F] rounded-2xl mb-3 border border-[#3D3833] text-xs font-mono-mechanical text-[#D6CCA8]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A870] border border-[#1A1815] shadow-xs" />
              <span className="font-bold tracking-widest text-[#F9F6F0]">EMULSION M35</span>
            </div>
            <span className="hidden sm:inline text-[#9C9488]">•</span>
            <span className="hidden sm:inline text-[#9C9488]">LENS: 38mm ƒ/2.8 COATED</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Frame Counter Display */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-[#121110] border border-[#3D3833] text-[#D4AF37] font-bold">
              <span className="text-[9px] sm:text-[10px] text-[#9C9488] uppercase">EXP</span>
              <span className="overflow-hidden inline-block h-4">
                <motion.span
                  key={currentShot}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  0{Math.min(currentShot + 1, 3)} / 03
                </motion.span>
              </span>
            </div>

            {/* Status LED */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDeveloping
                    ? "bg-[#C86428] animate-ping"
                    : isDeveloped
                    ? "bg-[#15803D]"
                    : "bg-[#F59E0B]"
                }`}
              />
              <span className="text-[9px] sm:text-[10px] text-[#D6CCA8] uppercase">
                {isDeveloping
                  ? "DEVELOPING"
                  : isDeveloped
                  ? "LIGHT TABLE"
                  : "READY"}
              </span>
            </div>
          </div>
        </div>

        {/* The Viewfinder Screen Well / Light Table Stage */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl bg-[#0D0C0B] overflow-hidden border-2 border-[#3D3833] select-none">
          {/* Safe-Light Amber Flash Overlay */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 bg-[#C86428] z-40 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Active Viewfinder Scene OR Darkroom Developing Screen OR Cinematic Film Strip Light Table */}
          {!isDeveloping && !isDeveloped ? (
            /* Active Live Viewfinder Scene */
            <div className="relative w-full h-full">
              {/* Background Scene Image */}
              <img
                src={activeScene.imageUrl}
                alt={activeScene.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-all duration-700"
              />

              {/* Optical Framing Reticle Overlay */}
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-6 sm:w-8 h-6 sm:w-8 border-t-2 border-l-2 border-[#F9F6F0]/70" />
                  <div className="w-6 sm:w-8 h-6 sm:w-8 border-t-2 border-r-2 border-[#F9F6F0]/70" />
                </div>

                <div className="self-center flex items-center justify-center">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-[#F9F6F0]/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#C86428]/80 shadow-xs" />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="w-6 sm:w-8 h-6 sm:w-8 border-b-2 border-l-2 border-[#F9F6F0]/70" />
                  <div className="w-6 sm:w-8 h-6 sm:w-8 border-b-2 border-r-2 border-[#F9F6F0]/70" />
                </div>
              </div>

              {/* Live Analog HUD Caption */}
              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-mechanical text-[#F9F6F0] bg-[#121110]/75 backdrop-blur-xs px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[#C5A870] font-bold">{activeScene.filmStock}</span>
                  <span>•</span>
                  <span className="truncate max-w-[120px] sm:max-w-none">{activeScene.location}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span>{activeScene.aperture}</span>
                  <span>{activeScene.shutter}</span>
                  <span className="text-[#F59E0B]">ISO {activeScene.iso}</span>
                </div>
              </div>

              {/* Blind Capture Banner (Top) */}
              <div className="absolute top-3 left-3 sm:left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121110]/80 backdrop-blur-xs text-[9px] sm:text-[10px] font-mono-mechanical text-[#F9F6F0] border border-white/10">
                <Lock className="w-3 h-3 text-[#C86428]" />
                <span>BLIND CAPTURE • NO PREVIEWS</span>
              </div>
            </div>
          ) : isDeveloping ? (
            /* Darkroom Chemical Developing Animation */
            <div className="relative w-full h-full bg-[#0D0C0B] flex flex-col items-center justify-center p-6 text-center shadow-amber-glow">
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <img
                  src={VIEWFINDER_SCENES[0].imageUrl}
                  alt="Developing roll"
                  className="w-full h-full object-cover darkroom-developing"
                />
              </div>

              <div className="relative z-10 space-y-4 max-w-md">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#1A1815] border-2 border-[#C86428] mx-auto flex items-center justify-center shadow-amber-glow animate-pulse">
                  <Camera className="w-7 sm:w-8 h-7 sm:h-8 text-[#C86428]" />
                </div>
                <div className="space-y-1">
                  <span className="font-mono-mechanical text-[11px] sm:text-xs uppercase tracking-widest text-[#C5A870]">
                    DARKROOM SIMULATION IN PROGRESS
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F9F6F0]">
                    Developing 35mm Roll...
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono-mechanical text-[#9C9488]">
                    Baking Kodak Vision3 500T motion picture profile & authentic rebate tracks.
                  </p>
                </div>

                <div className="w-48 sm:w-64 mx-auto bg-[#25221F] h-2 rounded-full overflow-hidden border border-[#3D3833]">
                  <div
                    className="h-full bg-gradient-to-r from-[#C86428] to-[#C5A870] transition-all duration-150"
                    style={{ width: `${developProgress}%` }}
                  />
                </div>
                <div className="font-mono-mechanical text-xs text-[#D4AF37]">
                  {developProgress}% PROCESSED
                </div>
              </div>
            </div>
          ) : (
            /* Authentic Continuous Cinematic 35mm Motion Picture Film Strip / Light Table Viewport */
            <CinematicFilmStrip onReset={resetViewfinder} />
          )}
        </div>

        {/* Mechanical Shutter Trigger & Tally Base Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-xs font-mono-mechanical text-[#9C9488] flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#C86428] shrink-0" />
            <span>
              {isDeveloped
                ? "Roll complete! Drag the 35mm film strip above on the light table."
                : currentShot === 0
                ? "Click the Amber Shutter Button to take test shot 1 of 3"
                : `Test shot ${currentShot} of 3 taken. Click for next shot.`}
            </span>
          </div>

          {/* Shutter Button Assembly */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleShutterClick}
              disabled={isDeveloping || isDeveloped}
              id="hero-shutter-btn"
              className={`relative group flex items-center gap-2 px-6 py-3.5 rounded-2xl font-mono-mechanical text-xs font-bold uppercase tracking-widest transition-all duration-100 cursor-pointer ${
                isDepressed
                  ? "scale-90 translate-y-1 bg-[#A73812] shadow-inner"
                  : "bg-gradient-to-b from-[#E07A3B] to-[#C86428] text-[#F9F6F0] hover:brightness-110 shadow-amber-glow active:scale-95"
              } ${isDeveloping || isDeveloped ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="w-3 h-3 rounded-full bg-[#FFFFFF] group-hover:scale-125 transition-transform" />
              <span>
                {isDeveloping
                  ? "Developing..."
                  : isDeveloped
                  ? "Film On Light Table"
                  : `Click Shutter (${3 - currentShot} Left)`}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
