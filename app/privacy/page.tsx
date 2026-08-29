import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, Trash2, Mail, ArrowLeft, FileText } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Privacy Policy • EMULSION Analog Club",
  description:
    "Learn how EMULSION protects your privacy, enforces zero data mining, zero generative AI training, and safely stores your 35mm analog memories.",
};

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LEGAL // ARCHIVAL COMPLIANCE</span>
        </div>
      </div>

      {/* Page Header */}
      <header className="space-y-4">
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1815]">
          Privacy Policy
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono-mechanical text-[#6E675F]">
          <span>EFFECTIVE DATE: JANUARY 2025</span>
          <span>•</span>
          <span>LAST REVISED: AUGUST 2025</span>
          <span>•</span>
          <span className="text-[#15803D] font-semibold">APP STORE & PLAY STORE COMPLIANT</span>
        </div>
        <p className="text-base sm:text-lg text-[#6E675F] leading-relaxed pt-2">
          At <strong>EMULSION</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Club&rdquo;), we treat visual memories as intimate archival heirlooms, not algorithm fodder. This Privacy Policy details the exact data we collect, why we collect it, how it is safeguarded, and our unwavering commitment to zero generative AI data mining.
        </p>
      </header>

      {/* Highlights / Privacy Highlights Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">Zero AI Data Mining</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Your photos are never fed into generative AI models, training weights, or sold to third-party brokers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#15803D] flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">Row-Level Security</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Encrypted with TLS 1.3 in transit and AES-256 at rest. Backed by Supabase PostgreSQL RLS policies.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#C5A870] flex items-center justify-center">
            <Trash2 className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">Complete Deletion Rights</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Request unconditional deletion of your handle, email, and records anytime with one simple email.
          </p>
        </div>
      </div>

      {/* Long-Form Policy Sections */}
      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#1A1815]/90 border-t border-[#E8E1D3] pt-8">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            1. Information We Collect
          </h2>
          <p className="text-[#6E675F]">
            We strictly limit data collection to the minimum required to provide our analog waitlist, queue progression, and camera roll emulation services:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#6E675F]">
            <li>
              <strong className="text-[#1A1815]">Account & Waitlist Information:</strong> Your chosen permanent <code className="px-1.5 py-0.5 rounded bg-[#F3ECE1] text-[#1A1815] font-mono-mechanical text-xs">@handle</code>, verified email address, roll exposure preferences (4, 8, 12, 16, or 24 EXP), and sequential queue timestamp.
            </li>
            <li>
              <strong className="text-[#1A1815]">Referral Program Data:</strong> Unique 8-character referral tokens, referral counts, and queue position adjustments (+5 spots gained per verified signup).
            </li>
            <li>
              <strong className="text-[#1A1815]">Camera Permissions:</strong> When using the mobile application, we request access to your device camera strictly for real-time 35mm optical viewport display and image capture. We never access your camera in the background or scan biometric facial geometry.
            </li>
            <li>
              <strong className="text-[#1A1815]">Technical Diagnostics:</strong> Anonymized browser metadata, IP hash (for rate limiting and fraud prevention), and error crash reports.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            2. Strict Commitment: Zero Generative AI & Zero Data Mining
          </h2>
          <p className="text-[#6E675F]">
            Unlike traditional ad-supported social platforms, EMULSION operates on a privacy-first model:
          </p>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] space-y-2 text-xs sm:text-sm text-[#1A1815]">
            <p>
              • <strong>No Model Training:</strong> Your photographs, contact sheets, and co-shot rolls are <em>never</em> used to train machine learning models, neural networks, or generative AI image models.
            </p>
            <p>
              • <strong>No Data Brokering:</strong> We do not sell, license, rent, or trade your personal data or visual media to advertisers, brokers, or external entities under any circumstances.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            3. How We Use Your Information
          </h2>
          <p className="text-[#6E675F]">
            We process your information exclusively for the following legitimate purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#6E675F]">
            <li>Reserving and guaranteeing your lifetime founding <code className="px-1.5 py-0.5 rounded bg-[#F3ECE1] text-[#1A1815] font-mono-mechanical text-xs">@handle</code>.</li>
            <li>Tracking your sequential queue position and calculating referral queue hops.</li>
            <li>Delivering batch #01 / batch #02 beta onboarding notifications and VIP pass confirmation tickets.</li>
            <li>Rendering simulated optical film grains, halation, and authentic contact sheets upon roll development.</li>
            <li>Protecting the community against automated bot attacks, spam handle squats, and malicious exploits.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            4. Security Architecture & Storage
          </h2>
          <p className="text-[#6E675F]">
            Your data is stored in dedicated Supabase PostgreSQL databases with automated daily backups. Security measures include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#6E675F]">
            <li><strong>Transport Encryption:</strong> All client-to-server traffic is encrypted via HTTPS with TLS 1.3.</li>
            <li><strong>Database Protection:</strong> Row Level Security (RLS) ensures records can only be queried through authenticated procedures.</li>
            <li><strong>Infrastructure Isolation:</strong> Hosted in world-class, SOC 2 Type II certified cloud data centers with encrypted volumes (AES-256).</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            5. Your Data Rights & Deletion Requests
          </h2>
          <p className="text-[#6E675F]">
            In compliance with GDPR, CCPA, and App Store guidelines, you hold full sovereignty over your data:
          </p>
          <div className="p-5 rounded-2xl bg-[#F3ECE1] border border-[#E8E1D3] space-y-3">
            <h4 className="font-mono-mechanical text-xs uppercase font-bold text-[#1A1815] tracking-wider">
              HOW TO REQUEST FULL ACCOUNT & DATA DELETION:
            </h4>
            <p className="text-xs sm:text-sm text-[#6E675F]">
              To permanently erase your waitlist entry, reserved handle, email, and associated activity from our servers, send an email from your registered address to:
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#C5A870] font-mono-mechanical text-xs text-[#1A1815] font-semibold">
              <Mail className="w-3.5 h-3.5 text-[#C86428]" />
              <span>alpha.hamza87@gmail.com</span>
            </div>
            <p className="text-[11px] font-mono-mechanical text-[#6E675F]">
              Subject: <em>&ldquo;Account Deletion Request - [Your Handle]&rdquo;</em>. We process all verified deletion requests within 30 business days with zero data remnants.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            6. Children&apos;s Privacy
          </h2>
          <p className="text-[#6E675F]">
            EMULSION is not directed to children under the age of 13 (or under 16 in certain European jurisdictions). We do not knowingly collect personal information from children. If we discover that a child has provided us with personal data, we promptly delete such records.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            7. Privacy Contact Officer
          </h2>
          <p className="text-[#6E675F]">
            If you have questions, regulatory compliance notices, or feedback regarding our privacy practices, please contact our Data Protection Officer directly:
          </p>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#1A1815] space-y-1">
            <div><strong>EMULSION CLUB</strong> — Privacy & Compliance Division</div>
            <div>Official Privacy Inquiries: <a href="mailto:alpha.hamza87@gmail.com" className="text-[#C86428] hover:underline">alpha.hamza87@gmail.com</a></div>
            <div className="text-[#6E675F]">Physical Darkroom Collective: San Francisco / London</div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation Link */}
      <div className="border-t border-[#E8E1D3] pt-8 flex items-center justify-between text-xs font-mono-mechanical text-[#6E675F]">
        <Link href="/terms" className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          <span>VIEW TERMS AND CONDITIONS →</span>
        </Link>
        <Link href="/contact" className="hover:text-[#1A1815] transition-colors">
          CONTACT SUPPORT
        </Link>
      </div>
    </div>
  );
}
