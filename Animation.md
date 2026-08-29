``markdown
# Animation & Micro-Interactions Specification
**Engine:** Framer Motion (React) + Tailwind CSS Keyframes[cite: 5]
**Default Curve:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth Apple-grade decelerate curve)[cite: 5]

---

## 1. Core Landing Page Micro-Interactions

### 1.1 Mechanical Shutter Press & Viewfinder Flash
- **Trigger:** Shutter button click on the interactive viewfinder[cite: 5].
- **Motion Sequence:**
  1. Shutter button depresses (`scale: 0.92`, `translateY: 2px`, duration: `60ms`).
  2. Aperture blades snap shut (`scale: 0.96`, duration: `80ms`).
  3. Safe-light amber flash illuminates viewport (`opacity: 0.75 -> 0`, duration: `180ms`).
  4. Frame counter rolls vertically like an analog mechanical tally wheel (`y: [100%, 0%]`, duration: `220ms`).

### 1.2 Simulated 3-Second Darkroom Development
- **Trigger:** Completing 3 test shots in the hero viewfinder[cite: 5].
- **Motion Sequence:**
  1. Viewport transitions to sealed state with amber pulse: `box-shadow: 0 0 25px rgba(200, 100, 40, 0.45)`.
  2. Film grain and exposure emerge smoothly:
     - `filter: blur(14px) brightness(0.3) saturate(20%)` -> `filter: blur(0px) brightness(1.0) saturate(100%)` over `2.4s`.
  3. Diagonal warm amber shimmer sweeps across the developed contact sheet[cite: 5].

### 1.3 3D Magnetic Parallax Tilt
- **Target:** Hero contact sheets and scrapbook Polaroid cards[cite: 5].
- **Implementation:**
  ```ts
  const rotateX = useTransform(mouseY, [-250, 250], [8, -8]);
  const rotateY = useTransform(mouseX, [-250, 250], [-8, 8]);
1.4 Dynamic Aperture Slider Snap
Target: 4 to 24 roll selector dial.

Motion: Spring-snapped slider (stiffness: 400, damping: 28) that triggers a micro-haptic bounce on every number change.

1.5 VIP Golden Ticket Unboxing (Waitlist Success)
Trigger: Successful Supabase handle reservation.

Motion:

Form collapses into a golden ticket card that flips 180° along the Y-axis.

Displays engraved @handle and position badge (#142 in line).

Triggers unbleached gold and amber confetti burst via canvas-confetti.