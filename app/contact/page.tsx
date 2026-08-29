"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Send,
  Loader2,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { submitContactAction, ContactActionResult } from "@/app/actions/contact";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Founding Pass / Handle Support");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("alpha.hamza87@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);

      const res = await submitContactAction(null, formData);
      if (res.success) {
        setResult(res);
        setErrorMsg("");
      } else {
        setErrorMsg(res.message || "Failed to deliver message. Please try again.");
      }
    });
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setResult(null);
    setErrorMsg("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 text-[#1A1815]">
      {/* Top Breadcrumb & Return Nav */}
      <div className="flex items-center justify-between border-b border-[#E8E1D3] pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono-mechanical text-[#6E675F] hover:text-[#1A1815] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-[10px] font-mono-mechanical text-[#C86428] uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>DIRECT DISPATCH DESK</span>
        </div>
      </div>

      {/* Page Header */}
      <header className="space-y-3">
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1815]">
          Get in Touch with the Club
        </h1>
        <p className="text-base sm:text-lg text-[#6E675F] leading-relaxed max-w-2xl">
          Have questions about your founding pass, partnerships, or early beta testing? Send us a message below.
        </p>
      </header>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Form or Success Screen */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result?.success ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#E8E1D3] shadow-gold-pass space-y-6"
              >
                <div className="border-b border-[#E8E1D3] pb-4">
                  <h2 className="font-serif-display text-xl font-bold text-[#1A1815]">
                    Archival Dispatch Form
                  </h2>
                  <p className="text-xs font-mono-mechanical text-[#6E675F] pt-1">
                    Direct communication with the EMULSION founding collective.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-mono-mechanical text-[#B91C1C] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all cursor-pointer"
                    >
                      <option value="Founding Pass / Handle Support">
                        Founding Pass / Handle Support
                      </option>
                      <option value="Brand Partnerships">
                        Brand Partnerships & Pop-ups
                      </option>
                      <option value="General Inquiry">
                        General Inquiry & Early Beta
                      </option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-mechanical uppercase tracking-wider text-[#1A1815] font-semibold">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] text-sm font-mono-mechanical text-[#1A1815] placeholder:text-[#9C9488] focus:outline-none focus:border-[#C86428] focus:bg-[#FFFFFF] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-2xl bg-[#C86428] hover:bg-[#A73812] text-[#F9F6F0] text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-amber-glow disabled:opacity-50"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Dispatch...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono-mechanical text-[#6E675F] text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>Confidential dispatch. We respond within 24-48 hours.</span>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Success Confirmation Screen */
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border-2 border-[#C5A870] shadow-gold-pass text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#86EFAC] text-[#15803D] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE1] text-[10px] font-mono-mechanical text-[#C5A870] font-semibold">
                    <span>REFERENCE ID: {result.referenceId}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1815]">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#6E675F] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your message has been safely logged in our archival queue. Our founding team will respond to <strong>{email}</strong> within 24–48 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#F9F6F0] hover:bg-[#F3ECE1] text-xs font-mono-mechanical text-[#1A1815] border border-[#E8E1D3] transition-all cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#1A1815] hover:bg-[#332F2A] text-xs font-mono-mechanical text-[#F9F6F0] transition-all text-center"
                  >
                    RETURN TO HOME
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Support Alias & Fast FAQs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Support Card */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-base text-[#1A1815]">
                  Direct Support Desk
                </h3>
                <p className="text-[11px] font-mono-mechanical text-[#6E675F]">
                  Official team inbox
                </p>
              </div>
            </div>

            <p className="text-xs text-[#6E675F] leading-relaxed">
              Prefer to email us directly from your client? Use our centralized support alias:
            </p>

            <div className="p-3 rounded-2xl bg-[#F9F6F0] border border-[#E8E1D3] flex items-center justify-between gap-2">
              <span className="font-mono-mechanical text-xs text-[#1A1815] font-semibold truncate select-all">
                alpha.hamza87@gmail.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE1] border border-[#E8E1D3] text-[#6E675F] hover:text-[#1A1815] transition-all cursor-pointer shrink-0"
                title="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="text-[10px] font-mono-mechanical text-[#9C9488]">
              Average response time: &lt; 24 hours
            </div>
          </div>

          {/* FAQ Fast Reference */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-mechanical text-[#C5A870] font-semibold">
              <HelpCircle className="w-4 h-4 text-[#C86428]" />
              <span>FREQUENTLY ASKED INQUIRIES</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-1">
                <h4 className="font-serif-display font-bold text-[#1A1815]">
                  How do I know if I&apos;m in the first 100?
                </h4>
                <p className="text-[#6E675F] leading-relaxed">
                  Your VIP Pass will clearly state &ldquo;#X / 100 Founding Member&rdquo; and display a golden holographic pass ticket.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-1">
                <h4 className="font-serif-display font-bold text-[#1A1815]">
                  Can I change my reserved @handle?
                </h4>
                <p className="text-[#6E675F] leading-relaxed">
                  Drop us a message with your registered email and your desired new handle; if available, we will update your reservation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E8E1D3] space-y-1">
                <h4 className="font-serif-display font-bold text-[#1A1815]">
                  When does the iOS / Android beta drop?
                </h4>
                <p className="text-[#6E675F] leading-relaxed">
                  Batch #01 invites roll out immediately upon closing the 100-member founding cohort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
