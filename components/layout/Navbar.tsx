"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, Aperture, CheckCircle2 } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "The Experience", href: "/experience" },
  { name: "Our Story", href: "/our-story" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openModal, claimedCount, vipData, isLoadingCount } = useWaitlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className="w-full max-w-6xl pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className="relative flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-full bg-[#F9F6F0]/90 backdrop-blur-md border border-[#E8E1D3] shadow-tactile transition-all duration-300"
        >
          {/* Brand Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-2 py-1 px-1.5 rounded-full hover:opacity-90 transition-opacity shrink-0"
            id="brand-logo-nav"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-[#1A1815] text-[#F9F6F0] flex items-center justify-center shadow-inner group-hover:rotate-45 transition-transform duration-500">
              <Aperture className="w-4 h-4 text-[#C5A870]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-base sm:text-lg tracking-wider font-bold text-[#1A1815] leading-none">
                EMULSION
              </span>
              <span className="font-mono-mechanical text-[8px] sm:text-[9px] text-[#9C9488] tracking-widest leading-tight">
                ANALOG CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Pills */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#F3ECE1]/80 border border-[#E8E1D3]/80">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                    isActive
                      ? "text-[#1A1815] font-semibold"
                      : "text-[#6E675F] hover:text-[#1A1815]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-[#FFFFFF] rounded-full shadow-xs border border-[#E8E1D3]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action & Member Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Realtime Founding Member Counter Badge (Visible on Mobile & Desktop) */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 border border-[#E8E1D3] text-[11px] sm:text-xs font-mono-mechanical text-[#1A1815] shadow-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]"></span>
              </span>
              <span className="text-[#6E675F] font-normal flex items-center gap-1">
                {isLoadingCount ? (
                  <span className="inline-block w-4 h-3 bg-[#E8E1D3] rounded animate-pulse" />
                ) : (
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={claimedCount}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block font-bold text-[#1A1815]"
                    >
                      {claimedCount.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                )}
                <span>/ 1,000 Passes</span>
              </span>
            </div>

            {/* Desktop CTA Button */}
            <button
              onClick={openModal}
              id="nav-reserve-handle-btn"
              className={`hidden md:flex group relative items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-xs active:scale-95 shrink-0 ${
                vipData?.success
                  ? "bg-[#C5A870] text-[#1A1815] hover:bg-[#D6CCA8]"
                  : "bg-[#C86428] text-[#F9F6F0] hover:bg-[#A73812] hover:shadow-amber-glow/40"
              }`}
            >
              {vipData?.success ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pass #{vipData.position}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#F3ECE1] group-hover:rotate-12 transition-transform" />
                  <span>Reserve Handle</span>
                </>
              )}
            </button>

            {/* Mobile Animated Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-full bg-[#F3ECE1] text-[#1A1815] border border-[#E8E1D3] hover:bg-[#E8E1D3] transition-colors focus:outline-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Slide-Down Frosted Glass Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-2 p-5 rounded-3xl bg-[#F9F6F0]/95 backdrop-blur-xl border border-[#E8E1D3] shadow-tactile-lg flex flex-col gap-2.5 z-50"
            >
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-[#E8E1D3] font-mono-mechanical text-[11px] text-[#6E675F]">
                <span>FOUNDING COHORT</span>
                <span className="text-[#C86428] font-bold">
                  {claimedCount} / 1,000 CLAIMED
                </span>
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#FFFFFF] text-[#1A1815] shadow-xs border border-[#E8E1D3] font-semibold"
                        : "text-[#6E675F] hover:bg-[#F3ECE1] hover:text-[#1A1815]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="mt-2 w-full py-3.5 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-amber-glow transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                {vipData?.success ? `View Pass #${vipData.position}` : "Reserve Handle"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
