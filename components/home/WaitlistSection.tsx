"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  AtSign,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Loader2,
  Lock,
  Users,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { joinWaitlistAction } from "@/app/actions/waitlist";
import { RESERVED_HANDLES } from "@/lib/constants";
import { useWaitlist } from "@/context/WaitlistContext";
import { sanitizeHandle } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function WaitlistSection() {
  const searchParams = useSearchParams();
  const { setVipData, claimedCount, vipData } = useWaitlist();

  const isFoundingCapped = claimedCount >= 100;

  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [rollPreference, setRollPreference] = useState(24);
  const [referralInput, setReferralInput] = useState("");
  const [referralState, setReferralState] = useState<{
    status: "idle" | "checking" | "valid" | "invalid";
    message: string;
  }>({ status: "idle", message: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  // Handle availability state: 'idle' | 'checking' | 'available' | 'taken' | 'reserved'
  const [handleStatus, setHandleStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "reserved"
  >("idle");

  // Referral code verification against Supabase
  const verifyReferralCode = useCallback(async (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setReferralState({ status: "idle", message: "" });
      return;
    }

    setReferralState({ status: "checking", message: "Checking invite code..." });

    try {
      const { data } = await supabase
        .from("waitlist")
        .select("handle, referral_code")
        .eq("referral_code", cleanCode)
        .maybeSingle();

      if (data) {
        setReferralState({
          status: "valid",
          message: data.handle
            ? `✓ Valid invite from @${data.handle} (+5 rank boost applied)`
            : `✓ Valid invite code (+5 rank boost applied)`,
        });
      } else {
        setReferralState({
          status: "invalid",
          message: "✕ Code not found (signup will proceed normally without referral boost)",
        });
      }
    } catch (err) {
      console.warn("Referral verification notice:", err);
      setReferralState({
        status: "idle",
        message: "",
      });
    }
  }, []);

  // Auto-fill and verify referral code from URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const cleanRef = ref.trim().toUpperCase();
      setReferralInput(cleanRef);
      verifyReferralCode(cleanRef);
    }
  }, [searchParams, verifyReferralCode]);

  // Debounced referral code check when typed manually
  useEffect(() => {
    if (!referralInput.trim()) {
      setReferralState({ status: "idle", message: "" });
      return;
    }

    const timer = setTimeout(() => {
      verifyReferralCode(referralInput);
    }, 350);

    return () => clearTimeout(timer);
  }, [referralInput, verifyReferralCode]);

  // Debounced real-time handle validation against Supabase
  useEffect(() => {
    if (isFoundingCapped) {
      setHandleStatus("idle");
      return;
    }

    const clean = sanitizeHandle(handle);
    if (!clean || clean.length < 3) {
      setHandleStatus("idle");
      return;
    }

    if (RESERVED_HANDLES.has(clean)) {
      setHandleStatus("reserved");
      return;
    }

    setHandleStatus("checking");

    const timer = setTimeout(async () => {
      try {
        // 1. Direct Supabase query
        const { data, error } = await supabase
          .from("waitlist")
          .select("handle")
          .eq("handle", clean)
          .maybeSingle();

        if (error) {
          // Fallback to API route if direct query has RLS constraint
          const res = await fetch(`/api/waitlist?handle=${encodeURIComponent(clean)}`);
          const apiData = await res.json();
          if (apiData.available === false) {
            setHandleStatus("taken");
          } else {
            setHandleStatus("available");
          }
        } else if (data && data.handle) {
          setHandleStatus("taken");
        } else {
          setHandleStatus("available");
        }
      } catch (err) {
        console.warn("Handle verification catch:", err);
        setHandleStatus("available");
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [handle, isFoundingCapped]);

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = sanitizeHandle(e.target.value);
    setHandle(clean);
    setErrorMsg("");
  };

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setReferralInput(val);
    if (!val.trim()) {
      setReferralState({ status: "idle", message: "" });
    }
  };

  const isSubmitDisabled =
    isPending ||
    (!isFoundingCapped &&
      (!handle ||
        handle.length < 3 ||
        handleStatus === "taken" ||
        handleStatus === "reserved" ||
        handleStatus === "checking")) ||
    !email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFoundingCapped && (!handle || handle.length < 3)) {
      setErrorMsg("Please enter a valid handle (3-20 characters).");
      return;
    }

    if (!isFoundingCapped && (handleStatus === "taken" || handleStatus === "reserved")) {
      setErrorMsg(`@${handle} is already permanently claimed. Please choose another.`);
      return;
    }

    if (!email) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      if (!isFoundingCapped && handle) {
        formData.append("handle", handle);
      }
      formData.append("email", email);
      formData.append("rollPreference", rollPreference.toString());

      // If a valid referral code was verified, pass it; otherwise pass empty
      if (referralState.status === "valid" && referralInput.trim()) {
        formData.append("referralCode", referralInput.trim().toUpperCase());
      }

      const result = await joinWaitlistAction(null, formData);
      if (result.success) {
        setVipData(result);
      } else {
        setErrorMsg(result.message || "Failed to complete reservation. Please try again.");
      }
    });
  };

  return (
    <section
      id="waitlist-form"
      className="scroll-mt-32 py-20 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-5 sm:p-12 rounded-3xl bg-[#FFFFFF] border-2 border-[#C5A870] shadow-gold-pass space-y-8 overflow-hidden"
      >
        {/* Holographic accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C5A870]/20 via-[#C86428]/10 to-transparent rounded-bl-full pointer-events-none" />

        {/* Form Header - Dynamic Switch between < 100 and >= 100 */}
        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
          {!isFoundingCapped ? (
            /* Under 100 Passes State */
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] border border-[#C5A870]/60 text-xs font-mono-mechanical text-[#1A1815]">
                <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
                <span>CLAIM YOUR FOUNDING PASS • 100 LIMIT</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
                Claim Your Founding Pass & Reserve Handle
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
                  {Math.max(0, 100 - claimedCount)} Passes Remaining
                </span>
              </div>
            </>
          ) : (
            /* 100/100 Exhausted General Waitlist State */
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-mono-mechanical text-[#B91C1C]">
                <Lock className="w-3.5 h-3.5" />
                <span>BATCH #01 FOUNDING PASSES (100/100) EXHAUSTED</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1A1815] break-words">
                Founding Passes Claimed (100/100) — Join General Waitlist
              </h2>
              <p className="text-sm sm:text-base text-[#6E675F] max-w-2xl mx-auto px-4 leading-relaxed break-words">
                All 100 founding member passes with handle reservations have been claimed. Enter your email to join the queue for public release.
              </p>

              <div className="pt-1 flex items-center justify-center gap-4 text-xs font-mono-mechanical text-[#1A1815] flex-wrap">
                <span className="flex items-center gap-1.5 text-[#6E675F]">
                  <Users className="w-3.5 h-3.5 text-[#C86428]" />
                  <span>Total Waitlist Queue: <strong>{claimedCount.toLocaleString()}</strong></span>
                </span>
              </div>
            </>
          )}
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

          {/* Handle Input (Shown ONLY when count < 100) */}
          {!isFoundingCapped && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                  1. Choose Desired @Handle
                </label>
                {/* Real-time Status Verification Indicator */}
                <div className="text-xs font-mono-mechanical">
                  {handleStatus === "checking" && (
                    <span className="inline-flex items-center gap-1 text-[#6E675F]">
                      <Loader2 className="w-3 h-3 animate-spin text-[#C86428]" />
                      <span>Checking...</span>
                    </span>
                  )}
                  {handleStatus === "available" && (
                    <span className="inline-flex items-center gap-1 text-[#15803D] font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>[AVAILABLE]</span>
                    </span>
                  )}
                  {(handleStatus === "taken" || handleStatus === "reserved") && (
                    <span className="inline-flex items-center gap-1 text-[#B91C1C] font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>@{handle} is already permanently claimed</span>
                    </span>
                  )}
                </div>
              </div>

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
                  className={`w-full pl-10 pr-10 py-3.5 rounded-2xl bg-[#F9F6F0] border text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none transition-all ${
                    handleStatus === "taken" || handleStatus === "reserved"
                      ? "border-[#B91C1C] bg-[#FEF2F2] focus:border-[#B91C1C]"
                      : handleStatus === "available"
                      ? "border-[#15803D] bg-[#F0FDF4] focus:border-[#15803D]"
                      : "border-[#E8E1D3] focus:border-[#C86428] focus:bg-[#FFFFFF]"
                  }`}
                />
                {/* Right side icon */}
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  {handleStatus === "available" && (
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  )}
                  {(handleStatus === "taken" || handleStatus === "reserved") && (
                    <AlertCircle className="w-4 h-4 text-[#B91C1C]" />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-mono-mechanical text-[#9C9488]">
                <span>Alphanumeric & underscores (3-20 chars)</span>
                <span>emulsion.club/@{handle || "handle"}</span>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
              {!isFoundingCapped ? "2. Your Primary Email" : "1. Your Primary Email"}
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
              {!isFoundingCapped
                ? "We will send your VIP golden ticket and darkroom onboarding invite here."
                : "We will notify you immediately when batch #02 queue invites open."}
            </p>
          </div>

          {/* Invite / Referral Code (Strictly Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                {!isFoundingCapped ? "3. Invite / Referral Code (Optional)" : "2. Invite / Referral Code (Optional)"}
              </label>
              {/* Real-time Status Indicator */}
              <div className="text-xs font-mono-mechanical">
                {referralState.status === "checking" && (
                  <span className="inline-flex items-center gap-1 text-[#6E675F]">
                    <Loader2 className="w-3 h-3 animate-spin text-[#C86428]" />
                    <span>Checking code...</span>
                  </span>
                )}
                {referralState.status === "valid" && (
                  <span className="inline-flex items-center gap-1 text-[#15803D] font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>[VALID INVITE]</span>
                  </span>
                )}
                {referralState.status === "invalid" && (
                  <span className="inline-flex items-center gap-1 text-[#9C9488] font-medium">
                    <span>[NOT FOUND]</span>
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C86428]">
                <Sparkles className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={referralInput}
                onChange={handleReferralChange}
                placeholder="e.g. A1B2C3D4"
                id="waitlist-referral-input"
                className={`w-full pl-10 pr-10 py-3.5 rounded-2xl bg-[#F9F6F0] border text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none transition-all uppercase tracking-wider ${
                  referralState.status === "valid"
                    ? "border-[#15803D] bg-[#F0FDF4] focus:border-[#15803D]"
                    : "border-[#E8E1D3] focus:border-[#C86428] focus:bg-[#FFFFFF]"
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                {referralState.status === "valid" && (
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                )}
              </div>
            </div>

            {referralState.message ? (
              <p
                className={`text-[11px] font-mono-mechanical ${
                  referralState.status === "valid"
                    ? "text-[#15803D] font-semibold"
                    : "text-[#6E675F]"
                }`}
              >
                {referralState.message}
              </p>
            ) : (
              <p className="text-[10px] font-mono-mechanical text-[#9C9488]">
                Have a friend already in the club? Enter their 8-character code to skip 5 queue spots.
              </p>
            )}
          </div>

          {/* Roll Capacity Preference */}
          <div className="space-y-2">
            <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
              {!isFoundingCapped ? "4. Initial Roll Preference" : "3. Initial Roll Preference"}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[4, 8, 12, 16, 24].map((exp) => (
                <button
                  type="button"
                  key={exp}
                  onClick={() => setRollPreference(exp)}
                  className={`py-2 rounded-xl text-xs font-mono-mechanical font-semibold transition-all cursor-pointer ${
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
            whileHover={!isSubmitDisabled ? { y: -2 } : {}}
            whileTap={!isSubmitDisabled ? { scale: 0.98 } : {}}
            type="submit"
            disabled={isSubmitDisabled}
            id="waitlist-submit-btn"
            className={`w-full py-4 rounded-2xl text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-amber-glow ${
              isSubmitDisabled
                ? "bg-[#6E675F]/30 text-[#6E675F] cursor-not-allowed border border-[#E8E1D3]"
                : "bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] cursor-pointer active:scale-98"
            }`}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Reservation...</span>
              </span>
            ) : vipData?.success ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                <span>Pass #{vipData.position} Claimed • Open Ticket</span>
              </>
            ) : !isFoundingCapped ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Claim VIP Founding Pass</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Join General Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono-mechanical text-[#6E675F] text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
            <span>
              {!isFoundingCapped
                ? "Zero spam. Guaranteed lifetime handle ownership. Instant VIP card generation."
                : "Zero spam. Realtime position tracking & queue jumping active."}
            </span>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

