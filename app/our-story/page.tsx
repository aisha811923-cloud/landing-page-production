"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Heart,
  Film,
  Users,
  Compass,
  ArrowRight,
  Quote,
} from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";

export default function OurStoryPage() {
  const { openModal, triggerConfetti } = useWaitlist();
  const [pledgeSigned, setPledgeSigned] = useState(false);

  const handleSignPledge = () => {
    setPledgeSigned(true);
    triggerConfetti();
  };

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
          <Compass className="w-3.5 h-3.5 text-[#C86428]" />
          <span>ORIGIN MANIFESTO & THE COLLECTIVE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1A1815] break-words"
        >
          Why We Built <br />
          <span className="italic font-normal text-[#C86428]">EMULSION.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#6E675F] max-w-2xl mx-auto px-4 font-normal leading-relaxed break-words"
        >
          We got tired of social media feeling like a staged performance. Here is how four friends decided to bring the anticipation of real film back.
        </motion.p>
      </div>

      {/* 2. The Reddit Discovery Origin Narrative */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-8 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-xs font-mono-mechanical text-[#C86428]">
          <Quote className="w-4 h-4" />
          <span>THE ORIGIN STORY</span>
        </div>

        <div className="max-w-3xl space-y-6 text-base sm:text-lg text-[#1A1815] leading-relaxed">
          <p className="font-serif-display text-2xl sm:text-3xl font-bold leading-snug break-words">
            &ldquo;One evening, the four of us were sitting around discussing how exhausting modern social media had become.&rdquo;
          </p>
          <p className="text-[#6E675F] text-sm sm:text-base leading-relaxed break-words">
            Feeds felt less like real memories and more like a staged competition—taking 50 shots just to post one, spending hours editing, and stressing over instant likes. We were physically present with people we loved, yet mentally trapped behind a viewfinder checking if our photos looked perfect.
          </p>
          <p className="text-[#6E675F] text-sm sm:text-base leading-relaxed break-words">
            While researching user discussions and complaints across Reddit photography and Gen-Z communities, we realized millions felt the exact same fatigue. Everyone missed the effortless magic of disposable cameras: shooting without overthinking, not obsessing over previews, and waiting with genuine excitement to see how the roll turned out.
          </p>
          <p className="text-[#1A1815] font-semibold text-sm sm:text-base border-l-4 border-[#C86428] pl-4 py-1 leading-relaxed break-words">
            We decided to bring that feeling back. EMULSION was born to replace screen anxiety with shared anticipation—giving you authentic 35mm film rolls, blind shooting, delayed development, and shared scrapbooks with your closest friends.
          </p>
        </div>
      </motion.section>

      {/* 3. The 3-Pillar Vision Manifesto */}
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
            <span>FOUNDATIONAL BELIEFS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1815] break-words">
            Our Vision Manifesto
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            Three immutable principles that guide every feature we engineer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Pillar 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center font-serif-display text-2xl font-bold">
              01
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1A1815] break-words">
              Blind Capture
            </h3>
            <p className="text-sm text-[#6E675F] leading-relaxed break-words">
              Take the photo and put your phone away. No retakes, no tweaking, no screen fixation. Live the memory first; admire it later.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center font-serif-display text-2xl font-bold">
              02
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1A1815] break-words">
              Delayed Gratification
            </h3>
            <p className="text-sm text-[#6E675F] leading-relaxed break-words">
              Waiting for your roll to develop makes the reveal ten times more meaningful than an instant upload. Anticipation is the lost ingredient of photography.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(200, 100, 40, 0.12)" }}
            className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center font-serif-display text-2xl font-bold">
              03
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1A1815] break-words">
              Shared Keepsakes
            </h3>
            <p className="text-sm text-[#6E675F] leading-relaxed break-words">
              Memories are meant to be kept with the people who were there, not broadcasted to an algorithm. Private rooms, collaborative rolls, and tangible contact prints.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. The Founding Team Bio Grid */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-xs font-mono-mechanical text-[#C86428]">
            <Users className="w-3.5 h-3.5" />
            <span>THE CREATORS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1A1815] break-words">
            The Founding Team
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            Four lifelong friends dedicated to preserving analog intentionality in a digital world.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(197, 168, 112, 0.25)" }}
              className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile space-y-4 hover:border-[#C5A870] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1A1815] break-words">
                    {member.name}
                  </h3>
                  <div className="font-mono-mechanical text-xs text-[#C86428] font-bold">
                    {member.role}
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#F3ECE1] text-[10px] font-mono-mechanical text-[#6E675F]">
                  @{member.handle}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#1A1815]">
                <strong className="text-[#6E675F] block text-[10px] uppercase">
                  RESPONSIBILITY FOCUS:
                </strong>
                <span className="break-words">{member.focus}</span>
              </div>

              <p className="text-sm text-[#6E675F] leading-relaxed break-words">
                {member.bio}
              </p>

              <div className="pt-3 border-t border-[#E8E1D3] flex items-center justify-between text-xs font-mono-mechanical text-[#9C9488]">
                <span>FAVORITE STOCK: <strong className="text-[#1A1815]">{member.favoriteStock}</strong></span>
                <span>{member.iso}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Interactive Anti-Instant Manifesto Pledge */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#F3ECE1] border-2 border-[#D6CCA8] text-center space-y-6 max-w-2xl mx-auto shadow-tactile"
      >
        <div className="w-12 h-12 rounded-full bg-[#FFFFFF] text-[#C86428] mx-auto flex items-center justify-center shadow-xs">
          <Heart className="w-6 h-6 fill-[#C86428]" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1815] break-words">
            Sign the Anti-Instant Pledge
          </h3>
          <p className="text-xs sm:text-sm text-[#6E675F] max-w-md mx-auto leading-relaxed break-words px-2">
            I pledge to shoot blind, put my phone away in the company of friends, and cherish the delayed reveal of our shared memories.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSignPledge}
          className={`px-8 py-3.5 rounded-full text-xs font-mono-mechanical font-bold uppercase tracking-wider transition-all cursor-pointer ${
            pledgeSigned
              ? "bg-[#15803D] text-white shadow-xs"
              : "bg-[#1A1815] hover:bg-[#332F2B] text-[#F9F6F0] shadow-tactile"
          }`}
        >
          {pledgeSigned ? "✓ Manifesto Sealed with Golden Stamp" : "Sign The Pledge"}
        </motion.button>
      </motion.section>

      {/* 6. Bottom Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-12 rounded-3xl bg-[#1A1815] text-[#F9F6F0] border-2 border-[#C5A870] shadow-tactile-lg flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-mono-mechanical text-xs text-[#C5A870] uppercase tracking-widest">
            BE PART OF THE MOVEMENT
          </span>
          <h3 className="font-serif-display text-2xl sm:text-4xl font-bold break-words">
            Claim Your Founding Pass
          </h3>
          <p className="text-xs sm:text-sm text-[#9C9488] break-words">
            Lock your lifetime handle in the first 100 member cohort.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={openModal}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-amber-glow transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Reserve VIP Handle</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.section>
    </div>
  );
}
