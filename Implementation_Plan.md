# Implementation Plan & Sprint Roadmap
**Project:** EMULSION Waitlist Landing Page[cite: 3]
**Target:** Production Build with Next.js 15, Tailwind CSS v4, and Supabase[cite: 3]

---

## Phase 1: Environment & Database Setup
- [x] Configure `.env.local` with Supabase project URL, Anon Key, and Service Role Key[cite: 3].
- [x] Execute SQL schema in Supabase SQL Editor to establish `waitlist` table, sequences, and queue-hopping triggers[cite: 3].

## Phase 2: Design Tokens & Layout Architecture
- [x] Implement "Warm Archival Linen & Amber Gold" CSS variable tokens in `globals.css`.
- [x] Build shared global layout shell with floating frosted pill navigation and real-time member counter badge[cite: 3].

## Phase 3: Route & Component Implementation
- [x] **Route 1 (`/`):**
  - `HeroViewfinder.tsx`: 3-shot interactive test camera with mechanical shutter press and 3-second develop reveal[cite: 3].
  - `RollDial.tsx`: 4 to 24 photo stepped aperture slider[cite: 3].
  - `ContactSheet3D.tsx`: 3D tilt contact sheet with film rebate marks[cite: 3].
  - `WaitlistForm.tsx`: Supabase-connected handle and email reservation form[cite: 3].
  - `ReferralModal.tsx`: VIP golden ticket flip card, 1-click link copy, and queue hopping tracker with confetti burst[cite: 3].
- [x] **Route 2 (`/experience`):**
  - Implement 5 interactive feature walkthrough modules based on `experience-and-story.md`.
- [x] **Route 3 (`/our-story`):**
  - Implement Reddit discovery origin story, 3-pillar vision manifesto, and Founding Team grid based on `experience-and-story.md`.

## Phase 4: Production Audit & Launch
- [x] Verify 60fps kinetic animations across mobile and desktop.
- [x] Verify Supabase RLS security policies and referral calculation accuracy[cite: 3].
- [x] Deploy to production domain and initiate the 1,000 founding member validation campaign[cite: 3].