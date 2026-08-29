"use client";

import React from "react";
import Link from "next/link";
import { Aperture, Sparkles, Film, ArrowUpRight, Heart, Shield, FileText, Mail } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

export default function Footer() {
  const { openModal } = useWaitlist();

  return (
    <footer className="relative bg-[#F3ECE1] border-t border-[#E8E1D3] pt-16 pb-12 px-6 sm:px-12 text-[#1A1815] overflow-hidden">
      {/* Decorative film rebate strip along the top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#121110] flex items-center justify-between px-4 text-[8px] font-mono-mechanical text-[#D4AF37] tracking-widest overflow-hidden opacity-90">
        <span>KODAK PORTRA 400 • 35MM EMULSION STOCK</span>
        <span className="hidden sm:inline">SAFETY FILM • [EXP 24/24] • ISO 400</span>
        <span>14A • 15 • 15A</span>
      </div>

      <div className="max-w-6xl mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8E1D3]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1A1815] text-[#C5A870] flex items-center justify-center shadow-inner">
                <Aperture className="w-4 h-4" />
              </div>
              <span className="font-serif-display text-xl font-bold tracking-wider text-[#1A1815]">
                EMULSION
              </span>
            </div>
            <p className="font-serif-display italic text-base text-[#1A1815] leading-snug">
              &ldquo;The Analog Social Club.&rdquo;
            </p>
            <p className="text-xs text-[#6E675F] max-w-sm leading-relaxed">
              The anti-instant camera for authentic analog social clubs. No previews, no deletes, no staged performance—just the raw magic of 35mm film rolls co-shot with friends.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E1D3] text-[10px] font-mono-mechanical text-[#6E675F]">
                <Film className="w-3 h-3 text-[#C86428]" />
                KODAK 35MM EMULATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E1D3] text-[10px] font-mono-mechanical text-[#6E675F]">
                BATCH #01 COHORT
              </span>
            </div>
          </div>

          {/* Club Navigation Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono-mechanical text-xs uppercase tracking-widest text-[#9C9488]">
              Club
            </h4>
            <ul className="space-y-2 text-xs font-mono-mechanical text-[#6E675F]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1"
                >
                  Home / Viewfinder
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1"
                >
                  The Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1"
                >
                  Our Story & Team
                </Link>
              </li>
              <li>
                <button
                  onClick={openModal}
                  className="hover:text-[#C86428] font-semibold transition-colors inline-flex items-center gap-1 text-[#1A1815] cursor-pointer"
                >
                  Reserve Handle
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono-mechanical text-xs uppercase tracking-widest text-[#9C9488]">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs font-mono-mechanical text-[#6E675F]">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-[#15803D]" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-[#C86428]" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-[#C5A870]" />
                  <span>Contact Support Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Early Access Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono-mechanical text-xs uppercase tracking-widest text-[#9C9488]">
              Connect
            </h4>
            <p className="text-xs text-[#6E675F] leading-relaxed">
              Founding collective: Mohammed Hamza, Aritra Jana, Vinay Dama, and Heeransh Ameta.
            </p>
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-mechanical">
                <span className="text-[#6E675F]">EARLY ACCESS</span>
                <span className="text-[#15803D] font-bold">100 FOUNDING PASSES</span>
              </div>
              <button
                onClick={openModal}
                className="w-full py-2.5 rounded-xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Reserve Early Pass
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C9488] font-mono-mechanical">
          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} EMULSION CLUB INC.</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#6E675F]">
              Built for real human connection <Heart className="w-3 h-3 text-[#C86428] fill-[#C86428]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
