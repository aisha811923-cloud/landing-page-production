"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Share2,
  Sparkles,
  ArrowUp,
  Aperture,
  ShieldCheck,
  Gift,
  Film,
} from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";
import { formatHandle, formatPosition, getReferralUrl } from "@/lib/utils";

export default function ReferralModal() {
  const { isModalOpen, closeModal, vipData, triggerConfetti } = useWaitlist();
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isModalOpen) return null;

  const handle = vipData?.handle || "founding_member";
  const position = vipData?.position || 683;
  const refCode = vipData?.referralCode || "VIP35MM";
  const refCount = vipData?.referralCount || 0;
  const rollPref = vipData?.rollPreference || 24;

  const referralUrl = getReferralUrl(refCode);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `I just claimed my founding pass ${formatPosition(position)} on @emulsion_club — the anti-instant 35mm camera club. Shoot blind, develop together.\n\nReserve your handle before the 1,000 cohort fills up: ${referralUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just reserved my handle ${formatHandle(handle)} on EMULSION (the 35mm shared camera roll club). Claim your spot in the first 1,000 members: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-[#1A1815]/75 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#F9F6F0] rounded-3xl border border-[#E8E1D3] shadow-tactile-lg p-6 sm:p-8 z-10 my-8 overflow-hidden text-[#1A1815]"
        >
          {/* Decorative Corner Film Marks */}
          <div className="absolute top-3 left-4 font-mono-mechanical text-[9px] text-[#9C9488] tracking-widest">
            [VIP PASS // COHORT 01]
          </div>
          <div className="absolute top-3 right-12 font-mono-mechanical text-[9px] text-[#C5A870] tracking-widest font-semibold">
            {formatPosition(position)} IN QUEUE
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F3ECE1] hover:bg-[#E8E1D3] text-[#1A1815] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center pt-4 pb-6 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#C5A870]/60 text-xs font-mono-mechanical text-[#1A1815] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
              VIP EARLY ACCESS RESERVED
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1815]">
              Welcome to the Club, {formatHandle(handle)}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E675F]">
              Your handle is locked. Every friend who joins with your link hops you <strong>5 spots ahead</strong> in line.
            </p>
          </div>

          {/* 3D Golden VIP Card (Flip on Click) */}
          <div className="relative perspective-1000 mb-6 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-56 rounded-2xl p-6 bg-gradient-to-br from-[#E2D4B7] via-[#F4EBD8] to-[#C5A870] border border-[#C5A870] shadow-gold-pass flex flex-col justify-between overflow-hidden"
            >
              {/* Holographic Shimmer Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

              {!isFlipped ? (
                /* Card Front */
                <>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1A1815] text-[#C5A870] flex items-center justify-center shadow-md">
                        <Aperture className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif-display font-bold text-sm tracking-wider text-[#1A1815]">
                          EMULSION
                        </div>
                        <div className="font-mono-mechanical text-[8px] tracking-widest text-[#6E675F]">
                          FOUNDING PASS #1000
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono-mechanical text-lg font-bold text-[#1A1815] bg-[#FFFFFF]/60 px-2.5 py-1 rounded-lg border border-[#C5A870]/50 shadow-inner">
                        {formatPosition(position)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="text-[10px] font-mono-mechanical text-[#6E675F] tracking-widest uppercase">
                      RESERVED VIP HANDLE
                    </div>
                    <div className="font-mono-mechanical text-xl sm:text-2xl font-bold tracking-tight text-[#1A1815] drop-shadow-xs">
                      {formatHandle(handle)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-mechanical text-[#1A1815] pt-2 border-t border-[#C5A870]/40 relative z-10">
                    <div>
                      <span className="text-[#6E675F]">ROLL PREF:</span>{" "}
                      <strong className="text-[#C86428] font-bold">{rollPref} EXP</strong>
                    </div>
                    <div>
                      <span className="text-[#6E675F]">REF CODE:</span>{" "}
                      <strong>{refCode}</strong>
                    </div>
                    <div className="text-[#6E675F] text-[8px]">
                      (Click to flip)
                    </div>
                  </div>
                </>
              ) : (
                /* Card Back */
                <div style={{ transform: "rotateY(180deg)" }} className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#C5A870]/40 pb-2">
                    <span className="font-mono-mechanical text-xs font-bold text-[#1A1815]">
                      FOUNDING COHORT PRIVILEGES
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                  </div>
                  <ul className="text-xs space-y-1 text-[#1A1815]/90 font-mono-mechanical">
                    <li>• Guaranteed handle ownership forever</li>
                    <li>• Free physical 4x6 print voucher on launch</li>
                    <li>• Direct access to private darkroom builds</li>
                    <li>• Priority development pipeline bypass</li>
                  </ul>
                  <div className="text-[9px] font-mono-mechanical text-[#6E675F] text-center pt-2">
                    EMULSION 35MM CLUB • CLICK TO FLIP BACK
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Queue Hopping Meter */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono-mechanical font-semibold text-[#1A1815]">
                <ArrowUp className="w-3.5 h-3.5 text-[#15803D]" />
                QUEUE HOPPING ENGINE
              </div>
              <span className="text-xs font-mono-mechanical text-[#C86428] font-bold">
                +{refCount * 5} SPOTS GAINED
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#F3ECE1] h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (refCount / 5) * 100 || 15)}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#C86428] to-[#C5A870] rounded-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-mechanical text-[#6E675F] pt-1 text-center">
              <div className={`p-1.5 rounded-lg border ${refCount >= 1 ? 'bg-[#F3ECE1] border-[#C5A870] text-[#1A1815]' : 'border-[#E8E1D3]'}`}>
                <Gift className="w-3 h-3 mx-auto mb-1 text-[#C86428]" />
                1 Friend: +5 Spots
              </div>
              <div className={`p-1.5 rounded-lg border ${refCount >= 3 ? 'bg-[#F3ECE1] border-[#C5A870] text-[#1A1815]' : 'border-[#E8E1D3]'}`}>
                <Film className="w-3 h-3 mx-auto mb-1 text-[#C86428]" />
                3 Friends: Gold Canister
              </div>
              <div className={`p-1.5 rounded-lg border ${refCount >= 5 ? 'bg-[#F3ECE1] border-[#C5A870] text-[#1A1815]' : 'border-[#E8E1D3]'}`}>
                <Sparkles className="w-3 h-3 mx-auto mb-1 text-[#C86428]" />
                5 Friends: Instant Pass #1
              </div>
            </div>
          </div>

          {/* 1-Click Referral Link Copy Box */}
          <div className="space-y-2 mb-6">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#6E675F]">
              Your Personal Invite Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="flex-1 bg-[#FFFFFF] border border-[#E8E1D3] rounded-xl px-3.5 py-2.5 text-xs font-mono-mechanical text-[#1A1815] focus:outline-none focus:border-[#C5A870] selection:bg-[#C86428] selection:text-white"
              />
              <button
                onClick={copyToClipboard}
                id="modal-copy-link-btn"
                className="px-4 py-2.5 rounded-xl bg-[#1A1815] hover:bg-[#332F2B] text-[#F9F6F0] text-xs font-mono-mechanical font-semibold flex items-center gap-1.5 transition-colors shadow-xs active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C5A870]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareToTwitter}
              className="py-2.5 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-semibold text-[#1A1815] flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#1DA1F2]" />
              Share on X / Twitter
            </button>
            <button
              onClick={shareToWhatsApp}
              className="py-2.5 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-semibold text-[#1A1815] flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
              Share on WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
