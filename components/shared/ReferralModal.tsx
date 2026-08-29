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
  Users,
} from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";
import { formatHandle, formatPosition, getReferralUrl } from "@/lib/utils";

export default function ReferralModal() {
  const { isModalOpen, closeModal, vipData, triggerConfetti } = useWaitlist();
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isModalOpen) return null;

  const position = vipData?.position || 1;
  const isFounding =
    (vipData?.isFoundingMember !== false && position <= 100) ||
    Boolean(vipData?.handle && position <= 100);
  const handle = vipData?.handle || "founding_member";
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
      isFounding
        ? `I just claimed my founding pass ${formatPosition(position)}/100 on @emulsion_club — the anti-instant 35mm camera club. Shoot blind, develop together.\n\nJoin the waitlist before batch #02 fills up: ${referralUrl}`
        : `I'm #${position} in line for @emulsion_club — the anti-instant 35mm camera club. Shoot blind, develop together.\n\nJoin the waitlist: ${referralUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      isFounding
        ? `Hey! I just reserved my handle ${formatHandle(handle)} on EMULSION (the 35mm shared camera roll club). Claim your spot in the first 100 founding members: ${referralUrl}`
        : `Hey! I just joined the waitlist for EMULSION (the 35mm shared camera roll club). Join the queue with my invite: ${referralUrl}`
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
            {isFounding ? "[VIP PASS // COHORT 01]" : "[QUEUE TICKET // BATCH 02]"}
          </div>
          <div className="absolute top-3 right-12 font-mono-mechanical text-[9px] text-[#C5A870] tracking-widest font-semibold">
            {isFounding ? `#${position} / 100 FOUNDING PASS` : `${formatPosition(position)} IN QUEUE`}
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F3ECE1] hover:bg-[#E8E1D3] text-[#1A1815] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center pt-4 pb-6 space-y-1.5">
            {isFounding ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#C5A870]/60 text-xs font-mono-mechanical text-[#1A1815] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
                  <span>VIP FOUNDING PASS RESERVED • #{position}/100</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1815]">
                  Welcome to the Club, {formatHandle(handle)}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E675F]">
                  Your handle is locked permanently. Every friend who joins with your link hops you <strong>5 spots ahead</strong> in line.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#1A1815] mb-2">
                  <Users className="w-3.5 h-3.5 text-[#C86428]" />
                  <span>GENERAL WAITLIST QUEUE</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1815]">
                  You&apos;re in Line for Batch #02
                </h3>
                <p className="text-xs sm:text-sm text-[#6E675F]">
                  Position <strong>#{position}</strong> in queue. Invite friends with your referral link to skip <strong>5 spots ahead</strong> per friend.
                </p>
              </>
            )}
          </div>

          {/* Pass Card Component */}
          {isFounding ? (
            /* 3D Golden VIP Card (Flip on Click) */
            <div
              className="relative perspective-1000 mb-6 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
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
                            FOUNDING PASS #{position} / 100
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono-mechanical text-sm sm:text-base font-bold text-[#1A1815] bg-[#FFFFFF]/70 px-2.5 py-1 rounded-lg border border-[#C5A870]/50 shadow-inner">
                          #{position} / 100
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
                      <li>• Guaranteed lifetime handle ownership</li>
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
          ) : (
            /* Standard General Waitlist Queue Card */
            <div className="relative mb-6">
              <div className="relative w-full h-48 rounded-2xl p-6 bg-gradient-to-br from-[#FFFFFF] to-[#F3ECE1] border border-[#E8E1D3] shadow-tactile flex flex-col justify-between overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1A1815] text-[#F9F6F0] flex items-center justify-center shadow-xs">
                      <Aperture className="w-4 h-4 text-[#C5A870]" />
                    </div>
                    <div>
                      <div className="font-serif-display font-bold text-sm tracking-wider text-[#1A1815]">
                        EMULSION
                      </div>
                      <div className="font-mono-mechanical text-[8px] tracking-widest text-[#6E675F]">
                        PUBLIC QUEUE TICKET
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-mechanical text-lg font-bold text-[#C86428] bg-[#FFFFFF] px-3 py-1 rounded-lg border border-[#E8E1D3] shadow-inner">
                      #{position}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono-mechanical text-[#6E675F] uppercase tracking-wider">
                    CURRENT QUEUE STATUS
                  </div>
                  <div className="font-mono-mechanical text-lg font-bold text-[#1A1815]">
                    Position #{position} in Line
                  </div>
                  <div className="text-xs text-[#6E675F] font-mono-mechanical">
                    Invite code active: <strong>{refCode}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-mechanical text-[#6E675F] pt-2 border-t border-[#E8E1D3]">
                  <span>ROLL PREF: <strong className="text-[#1A1815]">{rollPref} EXP</strong></span>
                  <span className="text-[#15803D] font-bold">READY FOR BATCH #02</span>
                </div>
              </div>
            </div>
          )}

          {/* Queue Hopping Meter */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono-mechanical font-semibold text-[#1A1815]">
                <ArrowUp className="w-3.5 h-3.5 text-[#15803D]" />
                <span>QUEUE HOPPING ENGINE</span>
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
                <Sparkles className="w-3.5 h-3.5 mx-auto mb-1 text-[#C86428]" />
                5 Friends: Instant Release #1
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
              <span>Share on X</span>
            </button>
            <button
              onClick={shareToWhatsApp}
              className="py-2.5 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E8E1D3] text-xs font-semibold text-[#1A1815] flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Share on WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
