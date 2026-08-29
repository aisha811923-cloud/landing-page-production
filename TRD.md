# Technical Requirements Document (TRD)
**Project:** EMULSION Landing Page & Waitlist Architecture[cite: 8]
**Stack:** Next.js 15 (App Router, React 19, Server Actions), Tailwind CSS v4, Supabase (PostgreSQL 16, RLS)[cite: 8]
**Deployment Target:** Vercel Edge / Google Antigravity Workflow[cite: 8]

---

## 1. System Architecture

[ Client Browser / Mobile Safari ]
│
├── HTTPS Edge Request
▼
[ Next.js 15 App Router (Edge SSR) ]
│
├── Server Action: joinWaitlistAction
▼
[ Supabase PostgreSQL 16 ] ──(DB Triggers)──► [ Sequential Queue Position & Referral Calculation ]
│
└── Post-Insert Hook ──► [ Resend Email API (VIP Pass Confirmation) ]


---

## 2. Complete Supabase Database Schema & DDL

```sql
-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Waitlist Table
CREATE TABLE public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    handle VARCHAR(32) UNIQUE NOT NULL,
    referral_code VARCHAR(16) UNIQUE NOT NULL,
    referred_by_code VARCHAR(16) REFERENCES public.waitlist(referral_code) ON DELETE SET NULL,
    referral_count INT NOT NULL DEFAULT 0,
    position INT NOT NULL,
    roll_capacity_preference INT DEFAULT 24 CHECK (roll_capacity_preference BETWEEN 4 AND 24),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'verified', 'flagged', 'invited')),
    ip_hash VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Position Sequence for Global Queue Tracking
CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START 1;

-- 4. Trigger Function: Generate Handle Position & Referral Code
CREATE OR REPLACE FUNCTION public.handle_new_waitlist_signup()
RETURNS TRIGGER AS $$ DECLARE     new_pos INT; BEGIN     SELECT nextval('waitlist_position_seq') INTO new_pos;     NEW.position := new_pos;     NEW.handle := LOWER(TRIM(NEW.handle));     NEW.email := LOWER(TRIM(NEW.email));     NEW.referral_code := UPPER(SUBSTRING(MD5(NEW.email \vert{}\vert{} CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 8));     RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_waitlist_signup_insert ON public.waitlist;
CREATE TRIGGER on_waitlist_signup_insert
    BEFORE INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_waitlist_signup();

-- 5. Trigger Function: Queue Hopping (Jumping 5 spots per referral)
CREATE OR REPLACE FUNCTION public.handle_referral_rewards()
RETURNS TRIGGER AS $$ BEGIN     IF NEW.referred_by_code IS NOT NULL THEN         UPDATE public.waitlist         SET referral_count = referral_count + 1,             position = GREATEST(1, position - 5),             updated_at = NOW()         WHERE referral_code = NEW.referred_by_code;     END IF;     RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_referral_reward_update ON public.waitlist;
CREATE TRIGGER on_referral_reward_update
    AFTER INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_referral_rewards();

-- 6. High-Performance Indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_handle ON public.waitlist(handle);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON public.waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON public.waitlist(position);

-- 7. Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to waitlist" ON public.waitlist;
CREATE POLICY "Allow public insert to waitlist"
    ON public.waitlist
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read positions and referral codes" ON public.waitlist;
CREATE POLICY "Allow public read positions and referral codes"
    ON public.waitlist
    FOR SELECT
    USING (true);
3. Server Action Specifications
joinWaitlistAction(formData)
Input: { email: string, handle: string, referralCode?: string, rollPreference: number }

Validation:

Standard email regex validation.

Handle validation: ^[a-zA-Z0-9_]{3,20}$ (Disallows reserved prefixes like admin, api, emulsion).

Database Write: Direct Supabase client insert handled server-side.

Return: { success: true, position: number, referralCode: string, handle: string }