# Design System & Aesthetic Specification
**Aesthetic Theme:** "Warm Archival Linen & Amber Gold" (Tactile Analog Luxury)
**Tone:** Unbleached cotton rag paper, safe-light amber glow, champagne gold accents, deep espresso typography.

---

## 1. Color Palette Tokens

```css
:root {
  /* Canvas & Paper Surfaces */
  --bg-canvas: #F9F6F0;            /* Warm unbleached archival paper base */
  --bg-surface: #FFFFFF;           /* Crisp print card / Polaroid backing */
  --bg-surface-warm: #F3ECE1;      /* Viewport bezel & inset mechanical wells */
  --bg-surface-elevated: #FFFDF9;  /* Raised interactive modal surface */
  
  /* Borders & Separation */
  --border-subtle: #E8E1D3;        /* Fine 1px linen border */
  --border-strong: #D6CCA8;        /* Antique brass frame divider */
  
  /* Warm Analog & Luxury Accents */
  --amber-primary: #C86428;        /* Safe-light amber / Shutter trigger button */
  --amber-glow: #F59E0B;           /* Active exposure indicator glow */
  --champagne-gold: #C5A870;       /* VIP Badge, reserved handles, gold foil trim */
  --terracotta: #A73812;           /* Deep Kodak Portra film undertone */
  --antique-brass: #9E7D3B;        /* Mechanical aperture ring markings */
  
  /* Deep Espresso Typography (Zero Harsh #000) */
  --text-primary: #1A1815;         /* Deep espresso velvet black */
  --text-secondary: #6E675F;       /* Archival sepia-tinted gray */
  --text-muted: #9C9488;           /* Frame counter tick marks & captions */
  --text-inverse: #F9F6F0;         /* Light text on amber buttons */
  
  /* Status Indicators */
  --indicator-live: #15803D;       /* Ready / Active roll */
  --indicator-seal: #B91C1C;       /* Developing / Sealed roll */
}
2. Typography Scale
Display & Editorial Headlines:

Primary: Instrument Serif / Playfair Display (Italics for emotive emphasis).

Usage: Hero titles, manifesto pull-quotes ("Slow down. Shoot blind. Feel the anticipation.").

Body & Micro-Copy:

Primary: Plus Jakarta Sans / Geist Sans.

Usage: Feature explanations, form inputs, team bios.

Mechanical Frame Counters & Badges:

Primary: JetBrains Mono / Space Mono.

Style: Uppercase, tracking-widest.

Usage: [EXP 08/24] • ISO 400 • 35MM EMULSION STOCK.

3. Visual Assets & Tactile UI Components
Floating Frosted Navigation Pill: rgba(249, 246, 240, 0.85) with backdrop-blur-md and 1px var(--border-subtle) border.

35mm Contact Sheet Mockup: High-resolution 4×6 photo grid bordered with authentic film rebate text (KODAK PORTRA 400, frame markers 14A, 15, 15A, and barcode sprockets).

Stepped Aperture Dial: Inset brass-styled notched dial snapping smoothly between 4, 8, 12, 16, and 24 exposures.

VIP Golden Pass Card: Interactive 3D metallic membership card with holographic foil reflection on mouse hover.