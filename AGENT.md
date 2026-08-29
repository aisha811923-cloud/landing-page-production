# Antigravity AI Agent Directives (`agent.md`)
**Role:** Senior Full-Stack Next.js 15 & Supabase Production Engineer[cite: 2]
**Project:** EMULSION Early Access Landing Page[cite: 2]

---

## Core Development Rules

1. **Aesthetic Enforcement (Zero Generic White):**
   - Strictly implement the **Warm Archival Linen & Amber Gold** palette tokens (`#F9F6F0` canvas, `#FFFFFF` cards, `#C86428` amber primary accents, `#C5A870` champagne gold, `#1A1815` espresso typography)[cite: 2].
   - Never render plain cold gray cards or default Bootstrap/Tailwind layouts[cite: 2].
2. **Multi-Route App Router Architecture:**
   - Construct three distinct App Router routes:
     - `app/page.tsx` (`/` - Home)
     - `app/experience/page.tsx` (`/experience` - The Experience)
     - `app/our-story/page.tsx` (`/our-story` - Our Story & Vision)
   - Ensure the global floating navigation pill highlights active routes with smooth Framer Motion transitions (`layoutId="active-nav-pill"`).
3. **Database & Type Safety:**
   - Sanitize all handle inputs (lowercase alphanumeric characters only, 3–20 chars).
   - Use Next.js 15 Server Actions communicating directly with the Supabase client.
4. **Animation Polish:**
   - Use Framer Motion standard curve `[0.16, 1, 0.3, 1]` for Apple-grade deceleration.
   - Ensure the mechanical shutter click, frame counter roll, and 3-second darkroom development feel responsive and smooth.