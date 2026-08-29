"use client";

import React, { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AtSign, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { joinWaitlistAction } from "@/app/actions/waitlist";
import { useWaitlist } from "@/context/WaitlistContext";
import { sanitizeHandle } from "@/lib/utils";

export default function WaitlistSection() {
  const searchParams = useSearchParams();
  const { setVipData, claimedCount, vipData } = useWaitlist();

  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [rollPreference, setRollPreference] = useState(24);
  const [referralCode, setReferralCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref.toUpperCase());
    }
  }, [searchParams]);

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = sanitizeHandle(e.target.value);
    setHandle(clean);
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle || !email) {
      setErrorMsg("Please enter both your handle and email.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("handle", handle);
      formData.append("email", email);
      formData.append("rollPreference", rollPreference.toString());
      if (referralCode) {
        formData.append("referralCode", referralCode);
      }

      const result = await joinWaitlistAction(null, formData);
      if (result.success) {
        setVipData(result);
      } else {
        setErrorMsg(result.message || "Failed to reserve handle. Please try again.");
      }
    });
  };

  return (
    <section id="waitlist-section" className="py-20 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-5 sm:p-12 rounded-3xl bg-[#FFFFFF] border-2 border-[#C5A870] shadow-gold-pass space-y-8 overflow-hidden"
      >
        {/* Holographic accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C5A870]/20 via-[#C86428]/10 to-transparent rounded-bl-full pointer-events-none" />

        {/* Form Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#C5A870]/60 text-xs font-mono-mechanical text-[#1A1815]">
            <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
            <span>CLAIM YOUR FOUNDING PASS • 1,000 LIMIT</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
            Lock Your VIP Handle
          </h2>
          <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
            Founding passes grant lifetime handle ownership, first access to the darkroom development engine, and 1 free physical 4×6 print strip on launch.
          </p>

          <div className="pt-1 flex items-center justify-center gap-4 text-xs font-mono-mechanical text-[#1A1815] flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.strong
                  key={claimedCount}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {claimedCount.toLocaleString()}
                </motion.strong>
              </AnimatePresence>
              <span>Passes Claimed</span>
            </span>
            <span>•</span>
            <span className="text-[#C86428] font-bold">
              {Math.max(0, 1000 - claimedCount)} Passes Remaining
            </span>
          </div>
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto relative z-10">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-mono-mechanical text-[#B91C1C] flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {referralCode && (
            <div className="p-3 rounded-xl bg-[#F3ECE1] border border-[#C5A870] text-xs font-mono-mechanical text-[#1A1815] flex items-center justify-between">
              <span>Referred by invite code: <strong>{referralCode}</strong></span>
              <span className="text-[#15803D] font-bold">+5 Queue Boost Active</span>
            </div>
          )}

          {/* Handle Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
              1. Choose Desired @Handle
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C86428]">
                <AtSign className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={handle}
                onChange={handleHandleChange}
                placeholder="yourhandle"
                id="waitlist-handle-input"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono-mechanical text-[#9C9488]">
              <span>Alphanumeric & underscores (3-20 chars)</span>
              <span>emulsion.club/@{handle || "handle"}</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
              2. Your Primary Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C86428]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="name@domain.com"
                id="waitlist-email-input"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all"
              />
            </div>
            <p className="text-[10px] font-mono-mechanical text-[#9C9488]">
              We will send your VIP golden ticket and darkroom onboarding invite here.
            </p>
          </div>

          {/* Roll Capacity Preference */}
          <div className="space-y-2">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
              3. Initial Roll Preference
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[4, 8, 12, 16, 24].map((exp) => (
                <button
                  type="button"
                  key={exp}
                  onClick={() => setRollPreference(exp)}
                  className={`py-2 rounded-xl text-xs font-mono-mechanical font-semibold transition-all ${
                    rollPreference === exp
                      ? "bg-[#1A1815] text-[#F9F6F0] border-2 border-[#C5A870] shadow-xs"
                      : "bg-[#F9F6F0] hover:bg-[#F3ECE1] text-[#6E675F] border border-[#E8E1D3]"
                  }`}
                >
                  {exp} EXP
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            id="waitlist-submit-btn"
            className="w-full py-4 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-amber-glow active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <span>Reserving VIP Pass...</span>
            ) : vipData?.success ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Pass #{vipData.position} Claimed • Open Ticket</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Claim VIP Founding Pass</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono-mechanical text-[#6E675F] text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
            <span>Zero spam. No public metrics. Instant VIP card generation.</span>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
