System Architecture & Information Pipeline
**Project:** EMULSION Ecosystem Architecture[cite: 7]

---

## 1. Multi-Route Application Structure

app/
├── layout.tsx                # Global Shell (Warm Canvas, Navbar, Footer, Fonts)
├── page.tsx                  # Route 1: Home (Viewfinder Hero, 4-24 Dial, Waitlist)
├── experience/
│   └── page.tsx              # Route 2: The Experience (Deep Feature Walkthrough)
├── our-story/
│   └── page.tsx              # Route 3: Our Story (Reddit Origin, Manifesto, Team Grid)
├── api/
│   └── waitlist/route.ts     # Supabase Waitlist API Handler
└── globals.css               # Tailwind CSS v4 Luxury Linen Theme Tokens


---

## 2. Dynamic Queue Hopping Calculation

Let $P_{initial}$ be the initial sequence number generated upon registration[cite: 7].  
Let $R$ be the number of referred friends who successfully sign up via the unique invite link[cite: 7].  
The dynamic live queue position $P_{live}$ is calculated in PostgreSQL as[cite: 7]:
$$P_{live} = \max\left(1, P_{initial} - (R \times 5)\right)$$[cite: 7]

---

## 3. Future Mobile App Processing Pipeline

[ In-App Camera Viewport ]
│
├── GPU Shaders (Metal / Skia) bake LUT color profile & 35mm grain directly
▼
[ Encrypted Local Sandbox ] ──(Roll fills: 4 to 24 shots)──► [ Upload to Private Bucket ]
│
▼
[ 6-Hour Delayed Timer ]
│
▼
[ Node.js Sharp Worker ]
- Stitch 4x6 Contact Sheet
- Stamp rebate borders & codes
- Generate IG Story asset