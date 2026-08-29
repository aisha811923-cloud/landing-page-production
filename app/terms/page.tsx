import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Sparkles, Copyright, AlertTriangle, Scale, ArrowLeft, Shield } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Terms and Conditions • EMULSION Analog Club",
  description:
    "Review the terms, founding member pass allocations, photo intellectual property rights, and community standards for EMULSION.",
};

export default function TermsPage() {
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
          <FileText className="w-3.5 h-3.5" />
          <span>MEMBERSHIP TERMS & GOVERNANCE</span>
        </div>
      </div>

      {/* Page Header */}
      <header className="space-y-4">
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1815]">
          Terms and Conditions
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono-mechanical text-[#6E675F]">
          <span>EFFECTIVE DATE: JANUARY 2025</span>
          <span>•</span>
          <span>LAST REVISED: AUGUST 2025</span>
          <span>•</span>
          <span className="text-[#C5A870] font-semibold">100 FOUNDING PASS COHORT PROTOCOL</span>
        </div>
        <p className="text-base sm:text-lg text-[#6E675F] leading-relaxed pt-2">
          Welcome to <strong>EMULSION</strong>. By accessing our web application, reserving a handle, joining the waitlist, or participating in the early beta cohort, you agree to comply with and be bound by the following terms, conditions, and community standards.
        </p>
      </header>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#C5A870] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">First 100 Passes</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Permanent founding handle reservations capped strictly at the first 100 verified signups.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#15803D] flex items-center justify-center">
            <Copyright className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">100% Photo Ownership</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            You hold total copyright over your original photos and co-shot rolls. Zero platform claim.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#F3ECE1] text-[#C86428] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="font-serif-display font-bold text-base text-[#1A1815]">Safe Community</h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Harassment, explicit imagery, and illegal content result in immediate ban and pass revocation.
          </p>
        </div>
      </div>

      {/* Full Legal Clauses */}
      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#1A1815]/90 border-t border-[#E8E1D3] pt-8">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            1. Founding Member Passes & Waitlist Allocation Rules
          </h2>
          <p className="text-[#6E675F]">
            EMULSION operates an early access cohort system governed by the following strict rules:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#6E675F]">
            <li>
              <strong className="text-[#1A1815]">100 Founding Pass Cap:</strong> Founding Member Passes (#001 through #100) are issued on a strictly verified first-come, first-served basis. Founding passes confer permanent lifetime ownership over the chosen <code className="px-1.5 py-0.5 rounded bg-[#F3ECE1] text-[#1A1815] font-mono-mechanical text-xs">@handle</code> and first-tier access to darkroom beta roll processing.
            </li>
            <li>
              <strong className="text-[#1A1815]">General Waitlist Cohort:</strong> Once all 100 founding passes are claimed, subsequent signups enter the general waitlist queue for public release invitations without guaranteed early handle reservations.
            </li>
            <li>
              <strong className="text-[#1A1815]">Referral Queue Hopping:</strong> Verified invites advance users 5 spots per friend. Any fraudulent practices—including disposable emails, automated script submissions, or proxy manipulation—will result in immediate disqualification and permanent revocation of reserved passes.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            2. Intellectual Property Rights & Photo Ownership
          </h2>
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] space-y-2 text-xs sm:text-sm text-[#14532D]">
            <h4 className="font-mono-mechanical font-bold uppercase tracking-wider text-[#15803D]">
              UNCONDITIONAL USER OWNERSHIP CLAUSE
            </h4>
            <p>
              <strong>You retain 100% of all intellectual property rights, copyright, and ownership in and to all photographs, digital negatives, contact sheets, and scrapbook layouts created using EMULSION.</strong>
            </p>
            <p>
              We claim no ownership, licensing fees, or commercial rights in your original photographs. You grant EMULSION only the limited, technical license strictly necessary to store, render, develop, and transmit your photos to you and your co-shooters.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            3. Community Guidelines & Prohibited Conduct
          </h2>
          <p className="text-[#6E675F]">
            EMULSION is designed for genuine human connection and shared visual storytelling. You agree not to upload, transmit, or share any content that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#6E675F]">
            <li>Contains child sexual abuse material (CSAM), non-consensual imagery, or violence.</li>
            <li>Harasses, bullies, defames, threatens, or infringes upon the privacy or publicity of others.</li>
            <li>Infringes upon copyrights, trademarks, or proprietary rights of any third party.</li>
            <li>Attempts to reverse-engineer, decompile, scrape, or disrupt the darkroom development engine.</li>
            <li>Squats on trademarks or impersonates brand entities without authorization.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            4. Beta Software Disclaimer & Limitation of Liability
          </h2>
          <p className="text-[#6E675F]">
            The EMULSION web experience and upcoming mobile app are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis during early access and beta testing:
          </p>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] space-y-2 text-xs sm:text-sm text-[#6E675F]">
            <p>
              • <strong>Simulations & Previews:</strong> The online 35mm viewfinder and development animations are designed for experiential demonstration. Minor visual variances or timing differences during active development are normal.
            </p>
            <p>
              • <strong>Limitation of Liability:</strong> To the maximum extent permitted by applicable law, EMULSION, its founders, and affiliates shall not be liable for any indirect, punitive, incidental, or consequential damages resulting from the use of or inability to use the service.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            5. Termination & Pass Revocation
          </h2>
          <p className="text-[#6E675F]">
            We reserve the right to suspend or terminate any user account, revoke founding passes, and reassign handles in cases of verified terms violations, unauthorized commercial exploitation, or bot automation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            6. Governing Law & Dispute Resolution
          </h2>
          <p className="text-[#6E675F]">
            These Terms shall be governed by and construed in accordance with standard commercial laws. In the event of any controversy or claim, parties agree to attempt good-faith informal resolution before initiating arbitration.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-bold text-[#1A1815]">
            7. Legal Notices & Contact
          </h2>
          <p className="text-[#6E675F]">
            For formal legal notices, inquiries regarding these Terms, or copyright inquiries (DMCA), reach our team at:
          </p>
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D3] text-xs font-mono-mechanical text-[#1A1815] space-y-1">
            <div><strong>EMULSION CLUB</strong> — Legal & Governance Office</div>
            <div>Direct Contact: <a href="mailto:alpha.hamza87@gmail.com" className="text-[#C86428] hover:underline">alpha.hamza87@gmail.com</a></div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation Link */}
      <div className="border-t border-[#E8E1D3] pt-8 flex items-center justify-between text-xs font-mono-mechanical text-[#6E675F]">
        <Link href="/privacy" className="hover:text-[#1A1815] transition-colors inline-flex items-center gap-1">
          <Shield className="w-3.5 h-3.5" />
          <span>VIEW PRIVACY POLICY →</span>
        </Link>
        <Link href="/contact" className="hover:text-[#1A1815] transition-colors">
          CONTACT SUPPORT
        </Link>
      </div>
    </div>
  );
}
