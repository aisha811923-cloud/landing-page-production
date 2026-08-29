"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Pin, Users, HeartOff, Sparkles } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const PINNED_MEMORIES = [
  {
    id: 1,
    title: "Summer Cabin Trip",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80",
    contributor: "hamza",
    note: "The sunrise when we forgot the coffee pot.",
    rotation: "md:-rotate-3",
    tapeColor: "bg-[#E8C488]/70",
  },
  {
    id: 2,
    title: "Vintage Market Find",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=600&q=80",
    contributor: "aditir",
    note: "Found an original Olympus OM-1 for $40!",
    rotation: "md:rotate-2",
    tapeColor: "bg-[#D6CCA8]/70",
  },
  {
    id: 3,
    title: "Late Night Diner Run",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    contributor: "vinay",
    note: "Pancakes at 2:30 AM after the gallery opening.",
    rotation: "md:-rotate-1",
    tapeColor: "bg-[#C86428]/30",
  },
];

export default function ScrapbookPreview() {
  const { openModal } = useWaitlist();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F3ECE1]/70 border-t border-[#E8E1D3] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#6E675F]">
            <Pin className="w-3.5 h-3.5 text-[#C86428]" />
            <span>SHARED TACTILE PINBOARDS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
            Collaborative Scrapbooks <br />
            <span className="italic font-normal text-[#C86428]">Zero Likes. Zero Algorithms.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            A shared tactile space where you and your close circle pin developed prints, polaroids, and full contact strips. Kept private for the people who were actually there.
          </p>
        </motion.div>

        {/* Tactile Pinboard Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-5 sm:p-12 rounded-3xl bg-[#EFE9DC] border border-[#E0D7C5] shadow-tactile-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-film-grain opacity-40 pointer-events-none" />

          {/* Board Header Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#D6CCA8] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#C86428] shrink-0" />
              <div>
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1A1815] break-words">
                  Board: &ldquo;Lisbon & Beyond — Summer 35mm&rdquo;
                </h3>
                <span className="font-mono-mechanical text-xs text-[#6E675F]">
                  4 Friends • 48 Exposures Developed • Private Room
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D6CCA8] text-xs font-mono-mechanical text-[#6E675F]">
                <HeartOff className="w-3.5 h-3.5 text-[#9C9488]" />
                No Public Metrics
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D6CCA8] text-xs font-mono-mechanical text-[#15803D]">
                <Users className="w-3.5 h-3.5" />
                Invite Only
              </span>
            </div>
          </div>

          {/* Pinned Polaroids Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {PINNED_MEMORIES.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-4 pb-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-tactile-lg transition-all duration-300 hover:z-20 ${item.rotation}`}
              >
                {/* Washi Tape Accent */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${item.tapeColor} backdrop-blur-xs rounded-sm shadow-xs -rotate-1`}
                />

                {/* Polaroid Photo Frame */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#1A1815] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 font-mono-mechanical text-[9px] text-[#D4AF37]">
                    @{item.contributor}
                  </div>
                </div>

                {/* Handwritten Note Area */}
                <div className="space-y-1 text-left">
                  <h4 className="font-serif-display font-bold text-base text-[#1A1815] break-words">
                    {item.title}
                  </h4>
                  <p className="font-serif-display italic text-xs text-[#6E675F] leading-relaxed break-words">
                    &ldquo;{item.note}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Board Action */}
          <div className="relative z-10 mt-10 pt-6 border-t border-[#D6CCA8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono-mechanical text-[#6E675F] text-center sm:text-left">
              Scrapbooks automatically unlock for all co-shooters when a shared roll develops.
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={openModal}
              className="px-5 py-2.5 rounded-xl bg-[#1A1815] hover:bg-[#332F2B] text-[#F9F6F0] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A870]" />
              <span>Join Waitlist for Scrapbook Access</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
