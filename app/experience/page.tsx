"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  EyeOff,
  Film,
  Users,
  Layers,
  Pin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Sparkle,
} from "lucide-react";
import { ROLL_TIERS } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";

export default function ExperiencePage() {
  const { openModal, vipData } = useWaitlist();

  const handleCtaClick = () => {
    if (vipData?.success) {
      openModal();
    } else {
      window.location.href = "/#waitlist-form";
    }
  };

  // Interactive Roll Swap State
  const [userShots, setUserShots] = useState(3);
  const [friendShots, setFriendShots] = useState(4);
  const totalSwapRoll = 12;
  const isSwapComplete = userShots + friendShots >= totalSwapRoll;

  // Interactive Blind Viewfinder Simulation
  const [isLensLocked, setIsLensLocked] = useState(false);
  const [capturedCount, setCapturedCount] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <div className="pt-2 pb-20 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-20 sm:space-y-28 overflow-hidden">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
          <span>SYSTEM ARCHITECTURE & PRODUCT MECHANICS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1A1815] break-words"
        >
          The Tactile <br />
          <span className="italic font-normal text-[#C86428]">Experience.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#6E675F] max-w-2xl mx-auto px-4 font-normal leading-relaxed break-words"
        >
          No infinite retakes. No algorithmic feeds. Just the genuine magic of 35mm analog film, re-engineered for the modern era.
        </motion.p>
      </div>

      {/* 2. Module 1: The Blind Viewfinder Engine */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-xs font-mono-mechanical text-[#C86428]">
            <EyeOff className="w-3.5 h-3.5" />
            <span>MODULE 01 • ZERO PREVIEWS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1815] break-words">
            The Blind Viewfinder Engine
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] leading-relaxed break-words">
            Modern phone cameras force you to look at the screen twice: once to take the shot, and five more times to judge, edit, and retake it. EMULSION locks the exposure the moment you click the shutter.
          </p>
          <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-2 text-xs font-mono-mechanical text-[#1A1815]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>No preview screen or photo review carousel</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>No delete or redo button</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>Bake color LUT profile & 35mm grain directly to local sandbox</span>
            </div>
          </div>
        </div>

        {/* Interactive Blind Viewfinder Simulation Widget */}
        <div className="lg:col-span-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1A1815] border-2 border-[#332F2B] text-[#F9F6F0] space-y-4 shadow-tactile-lg">
            <div className="flex items-center justify-between text-xs font-mono-mechanical text-[#D6CCA8] border-b border-[#332F2B] pb-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C86428]" />
                BLIND EXPOSURE LOCK
              </span>
              <span>EMULSION LUT V4</span>
            </div>

            <div className="relative aspect-[4/3] rounded-xl bg-[#0D0C0B] overflow-hidden border border-[#3D3833] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                alt="Blind viewfinder moment"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isLensLocked ? "filter blur-sm brightness-40" : "filter brightness-95"
                }`}
              />

              {isLensLocked ? (
                <div className="absolute inset-0 bg-[#121110]/85 flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#C86428]/20 border border-[#C86428] flex items-center justify-center text-[#C86428]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <span className="font-mono-mechanical text-xs text-[#C5A870] font-bold">
                    EXPOSURE LOCKED & ENCRYPTED
                  </span>
                  <p className="text-[11px] font-mono-mechanical text-[#9C9488]">
                    Frame committed to roll. Phone put away. Developing in 6 hours.
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                  <div className="text-[10px] font-mono-mechanical text-[#F9F6F0] bg-black/60 px-2 py-0.5 rounded self-start">
                    LIVE OPTICAL VIEW
                  </div>
                  <div className="text-[10px] font-mono-mechanical text-[#F9F6F0] bg-black/60 px-2 py-0.5 rounded self-end">
                    ƒ/2.8 • 1/250s
                  </div>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLensLocked(!isLensLocked)}
              className="w-full py-3 rounded-xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-mono-mechanical font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              {isLensLocked ? "Reset Viewfinder Simulation" : "Click to Lock Exposure Blind"}
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* 3. Module 2: Flexible Roll Architecture (4 to 24 Exposures) */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-xs font-mono-mechanical text-[#C86428]">
            <Film className="w-3.5 h-3.5" />
            <span>MODULE 02 • CAPACITY FREEDOM</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1815] break-words">
            Flexible Roll Architecture
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            Choose the exact number of exposures that fits your event.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {ROLL_TIERS.map((tier) => (
            <motion.div
              key={tier.exposures}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
              whileTap={{ scale: 0.98 }}
              className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile flex flex-col justify-between space-y-4 hover:border-[#C5A870] transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono-mechanical text-[10px] text-[#9C9488]">
                  <span>{tier.canisterCode}</span>
                  <span className="font-bold text-[#C86428]">{tier.duration}</span>
                </div>
                <div className="font-serif-display text-3xl font-bold text-[#1A1815]">
                  {tier.exposures}{" "}
                  <span className="text-xs font-mono-mechanical text-[#6E675F] font-normal">
                    EXP
                  </span>
                </div>
                <h3 className="font-serif-display font-bold text-base text-[#1A1815] break-words">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#6E675F] leading-relaxed break-words">
                  {tier.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8E1D3] text-[10px] font-mono-mechanical text-[#1A1815]">
                <span className="text-[#9C9488] block">IDEAL FOR:</span>
                <strong className="break-words block">{tier.idealFor}</strong>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Module 3: The Roll Swap (Shared Rolls) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#F3ECE1] border border-[#E8E1D3] space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] text-xs font-mono-mechanical text-[#C86428]">
            <Users className="w-3.5 h-3.5" />
            <span>MODULE 03 • SHARED ROLLS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1815] break-words">
            The Roll Swap (Co-Shooting)
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] leading-relaxed break-words">
            Start a shared roll with a friend. If you choose a 12-shot roll, you get 6 shots and they get 6 shots. Both shoot completely blind until the full roll is completed and developed together.
          </p>
        </div>

        {/* Interactive Roll Swap Simulation */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E8E1D3] gap-2">
            <div className="space-y-1">
              <span className="font-mono-mechanical text-xs font-bold text-[#1A1815]">
                ACTIVE ROLL SWAP: &ldquo;WEEKEND ROAD TRIP&rdquo;
              </span>
              <span className="block font-mono-mechanical text-xs text-[#6E675F]">
                Co-shooters: @you (Hamza) + @maya
              </span>
            </div>
            <div className="font-mono-mechanical text-xs font-bold px-3 py-1 rounded-full bg-[#F3ECE1] text-[#C86428]">
              {userShots + friendShots} / {totalSwapRoll} FRAMES FILLED
            </div>
          </div>

          {/* Dual Frame Counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Shooter */}
            <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-mechanical">
                <span className="font-bold text-[#1A1815]">YOUR CAMERA (@you)</span>
                <span className="text-[#C86428] font-bold">{userShots} / 6 Shots Taken</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded-md flex items-center justify-center font-mono-mechanical text-[10px] ${
                      i < userShots
                        ? "bg-[#1A1815] text-[#D4AF37] font-bold border border-[#C5A870]"
                        : "bg-[#FFFFFF] border border-[#E8E1D3] text-[#9C9488]"
                    }`}
                  >
                    {i < userShots ? "FILM" : i + 1}
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setUserShots((prev) => Math.min(6, prev + 1))}
                disabled={userShots >= 6}
                className="w-full py-2.5 rounded-lg bg-[#1A1815] hover:bg-[#332F2B] text-[#F9F6F0] text-xs font-mono-mechanical font-semibold transition-colors disabled:opacity-40 cursor-pointer"
              >
                {userShots >= 6 ? "Your 6 Shots Completed" : "Take Blind Shot (+1)"}
              </motion.button>
            </div>

            {/* Friend Shooter */}
            <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-mechanical">
                <span className="font-bold text-[#1A1815]">FRIEND&apos;S CAMERA (@maya)</span>
                <span className="text-[#C86428] font-bold">{friendShots} / 6 Shots Taken</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded-md flex items-center justify-center font-mono-mechanical text-[10px] ${
                      i < friendShots
                        ? "bg-[#C86428] text-white font-bold border border-[#A73812]"
                        : "bg-[#FFFFFF] border border-[#E8E1D3] text-[#9C9488]"
                    }`}
                  >
                    {i < friendShots ? "FILM" : i + 1}
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFriendShots((prev) => Math.min(6, prev + 1))}
                disabled={friendShots >= 6}
                className="w-full py-2.5 rounded-lg bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-mono-mechanical font-semibold transition-colors disabled:opacity-40 cursor-pointer"
              >
                {friendShots >= 6 ? "Maya's 6 Shots Completed" : "Simulate Maya Shooting (+1)"}
              </motion.button>
            </div>
          </div>

          {/* Development Status Banner */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E8E1D3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-mechanical">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isSwapComplete ? "bg-[#15803D]" : "bg-[#F59E0B] animate-pulse"
                }`}
              />
              <span className="text-[#1A1815]">
                {isSwapComplete
                  ? "Both co-shooters finished! Roll is now developing together in the shared darkroom."
                  : "Both users shoot blind without seeing the other's photos until the 12th shot is taken."}
              </span>
            </div>
            {isSwapComplete && (
              <button
                onClick={() => {
                  setUserShots(0);
                  setFriendShots(0);
                }}
                className="text-xs text-[#C86428] underline hover:text-[#A73812]"
              >
                Reset Swap Demo
              </button>
            )}
          </div>
        </div>
      </motion.section>

      {/* 5. Module 4 & 5 Grid: Contact Sheets & Scrapbooks */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* Module 4: 4x6 Contact Sheet */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
          className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-xs font-mono-mechanical text-[#C86428]">
            <Layers className="w-3.5 h-3.5" />
            <span>MODULE 04 • VIRAL FORMAT</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1815] break-words">
            The 4×6 Contact Sheet
          </h2>
          <p className="text-sm text-[#6E675F] leading-relaxed break-words">
            When your roll finishes developing, EMULSION automatically composites all your exposures into a stylized, high-resolution darkroom contact sheet. Bordered with authentic film rebate markings (KODAK PORTRA 400, frame markers, and timestamp), it is ready for 1-tap export directly to your Instagram Story.
          </p>
          <div className="p-3.5 rounded-xl bg-[#121110] text-[#D4AF37] font-mono-mechanical text-xs flex items-center justify-between border border-[#332F2B]">
            <span>KODAK PORTRA 400 • 1-TAP IG STORY</span>
            <Sparkle className="w-4 h-4 text-[#C5A870]" />
          </div>
        </motion.div>

        {/* Module 5: Collaborative Scrapboard */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
          className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-xs font-mono-mechanical text-[#C86428]">
            <Pin className="w-3.5 h-3.5" />
            <span>MODULE 05 • SACRED SPACES</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1815] break-words">
            Collaborative Scrapbooks
          </h2>
          <p className="text-sm text-[#6E675F] leading-relaxed break-words">
            A shared visual space where you and your close circle can pin developed prints, polaroids, and full contact strips. Organize memories by season, trip, or friend group without public metrics, likes, or follower counts.
          </p>
          <div className="p-3.5 rounded-xl bg-[#F9F6F0] text-[#1A1815] font-mono-mechanical text-xs flex items-center justify-between border border-[#E8E1D3]">
            <span>NO LIKES • NO FOLLOWER COUNTS • PRIVATE ONLY</span>
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
          </div>
        </motion.div>
      </motion.div>

      {/* 6. Bottom Reservation CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#1A1815] text-[#F9F6F0] border-2 border-[#C5A870] shadow-tactile-lg flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-mono-mechanical text-xs text-[#C5A870] uppercase tracking-widest">
            JOIN THE 100 FOUNDING COHORT
          </span>
          <h3 className="font-serif-display text-2xl sm:text-4xl font-bold break-words">
            Experience 35mm Analog Anticipation
          </h3>
          <p className="text-xs sm:text-sm text-[#9C9488] break-words">
            Lock your handle today and get priority access when roll swaps drop.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCtaClick}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-amber-glow transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{vipData?.success ? "View My VIP Pass" : "Claim VIP Founding Pass"}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.section>
    </div>
  );
}
