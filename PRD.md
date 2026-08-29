# Product Requirements Document (PRD)
**Project Name:** EMULSION (The Analog Social Club & Shared Camera Rolls)[cite: 9]
**Document Version:** 2.0.0  
**Target Milestone:** Early Access Waitlist Landing Page (1,000 Founding Member Validation)[cite: 9]
**Primary Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Supabase (PostgreSQL, Realtime, RLS), Google Antigravity IDE.[cite: 9]

---

## 1. Executive Summary & Core Philosophy

### 1.1 The Problem
- **The Performance Anxiety Trap:** Contemporary social networks (Instagram, BeReal, Snapchat) encourage staging, instant feedback obsession, endless retakes, and heavy editing, turning visual memories into stressful social performance[cite: 9].
- **The Disposable Feed:** Algorithms prioritize engagement metrics over genuine human connections, leaving users with feeds devoid of emotional anticipation[cite: 9].

### 1.2 The EMULSION Solution
EMULSION brings back the intentionality, excitement, and shared anticipation of 35mm disposable film photography[cite: 9]:
- **Blind Shooting:** Authentic film viewfinder with baked-in warm color LUTs and grain. No instant previews, no edits, no retakes[cite: 9].
- **Flexible Roll Length (4 to 24 Exposures):** Pick roll sizes tailored to the exact moment (4 shots for a coffee run, 12 for a road trip, 24 for a full month)[cite: 9].
- **Delayed Development & Contact Sheets:** Once sealed, rolls develop hours later. Upon completion, an auto-generated 4×6 contact sheet is compiled with authentic film borders ready for 1-tap sharing to Instagram Stories[cite: 9].
- **Roll Swapping (Shared Rolls):** Co-shoot a single roll blind with a friend. Neither person sees any pictures until the full roll is completed and developed[cite: 9].
- **Collaborative Scrapbook Boards:** Pin developed prints, polaroids, and full contact strips onto shared, tactile digital pinboards without public likes or follower counts[cite: 9].

---

## 2. Validation Goal: The 1,000-Member Milestone

Before developing the full native iOS/Android binaries, we validate market demand using an interactive, luxury editorial web landing page[cite: 9]:
- **Target KPI:** 1,000 verified email signups with reserved `@handle` passes[cite: 9].
- **Viral Referral Loop:** Every user gets a unique referral link (`emulsion.club/join?ref=HANDLE`) that hops them 5 spots ahead in the queue for every referred friend[cite: 9].

---

## 3. Site Architecture & Multi-Page Navigation

The landing experience is divided into three distinct routes connected by a persistent, floating frosted navigation pill:
1. **`/` (Home):** Interactive 35mm hero viewfinder demo (3 test shots + 3-second rapid development reveal), 4-to-24 shot dynamic selector dial, 3D contact sheet showcase, and inline VIP handle reservation form.
2. **`/experience` (The Experience):** Deep dive into the 5 core mechanics: Blind Viewfinder, Flexible Rolls (4–24), Roll Swapping, Auto-Generated Contact Sheets, and Scrapbook Boards.
3. **`/our-story` (Our Story & Vision):** The Reddit discovery origin story, the 3-pillar manifesto, and founding team profiles.

---

## 4. Feature Specifications

### 4.1 Global Navigation Header
- **Brand Monogram:** `EMULSION` (Swappable project token).
- **Center Nav Tabs:** `Home` (`/`), `The Experience` (`/experience`), `Our Story` (`/our-story`).
- **Live Counter Badge:** Real-time counter showing `X / 1,000 Founding Passes Claimed`.
- **Right CTA:** *"Reserve Handle"* button.

### 4.2 Interactive Hero Viewfinder (`/`)
- Shutter button with tactile mechanical depression and 60fps lens aperture contraction.
- Frame counter incrementing `[EXP 01/03]` on each press.
- Simulated 3-second darkroom development animation revealing a retro contact sheet.

### 4.3 Stepped Roll Selector Dial (4 to 24 Exposures)
Interactive dial updating visual presets dynamically:
- `4 EXP` — **The Moment** (15-min coffee run / quick catchup).
- `8 EXP` — **The Evening** (Dinner party / concert).
- `12 EXP` — **The Weekend** (2-person shared roll swap / getaway).
- `16 EXP` — **The Story** (Multi-day celebration / festival).
- `24 EXP` — **The Classic 35mm** (Full month archive / vacation).

### 4.4 VIP Waitlist & Referral Engine
- Input sanitization (alphanumeric handles, email validation).
- Supabase PostgreSQL trigger assigning sequential queue rank and unique 8-character referral code[cite: 8].
- Real-time queue jumping: $+5$ spots ahead per confirmed referral[cite: 8].
- Post-signup modal showing interactive 3D Golden VIP pass, referral link with 1-click copy, and milestone rewards[cite: 9].

---

## 5. Founding Team & Roles

| Name | Role | Responsibilities |
|---|---|---|
| **Mohammed Hamza** | Founder & CEO | Product architecture, vision, and core execution. |
| **Aritra Jana** | Head of Creative & Research | Vintage film aesthetics, user research, and tactile UX. |
| **Vinay Dama** | Head of Marketing & Brand Outreach | Viral growth loops, marketing campaigns, and partnerships. |
| **Heeransh Ameta** | Founding Member & Community Experience | Community testing, early feedback, and culture grounding. |