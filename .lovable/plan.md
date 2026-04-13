

# UI Overhaul: Readability, Professional Pins & Visual Refinement

## Problem
The current theme is too dark — near-black backgrounds (`220 15% 6%`) with dim text (`220 8% 50%`) creates poor contrast and eye strain. Map pins are basic SVG teardrops. The overall feel is oppressive rather than cinematic.

## Design Direction
Shift from "bunker dark" to **"warm editorial dark"** — think luxury travel magazine at night. Raise background lightness, warm up text colors, add subtle surface variation between sections.

---

### 1. Color Palette Rebalance (index.css)
Lift the entire palette to improve readability while keeping the cinematic feel:

| Token | Current | New | Why |
|-------|---------|-----|-----|
| `--background` | `220 15% 6%` | `225 12% 10%` | Warmer, less cave-like |
| `--card` | `220 12% 9%` | `225 10% 13%` | Cards pop off background |
| `--foreground` | `40 20% 90%` | `40 15% 92%` | Brighter, crisper headings |
| `--muted-foreground` | `220 8% 50%` | `220 10% 62%` | Body text actually readable |
| `--border` | `220 10% 16%` | `225 8% 20%` | Subtle but visible dividers |
| `--secondary` | `220 10% 14%` | `225 8% 17%` | Better surface separation |

### 2. World-Class Map Pins (WarRoomMap.tsx)
Replace the basic teardrop SVG with a **3D-effect marker** featuring:
- **Outer glow ring** — animated pulse with difficulty color
- **Glossy shield shape** instead of teardrop — beveled edges, highlight gradient, inner shadow
- **Icon center** — small thematic SVG icon (crosshair for extreme, mountain for moderate) instead of plain dots
- **Conquered state** — golden crown overlay with radial burst
- **Hover animation** — pin lifts with elastic bounce + shadow grows beneath
- Shadow ellipse beneath pin that scales on hover

### 3. Map Popup Upgrade (WarRoomMap.tsx)
Current popups use inline styles and are hard-coded dark. Upgrade:
- Warmer card background matching new `--card` value
- Star rating row with gradient gold stars (SVG, not text)
- Cleaner typography hierarchy (Cormorant for name, Barlow for stats)
- Micro-dividers between sections
- Larger touch target for CTA button

### 4. Section Surface Variation (Index.tsx + index.css)
Add alternating subtle background tints to break monotony:
- Map section: keep darkest
- Stats/Legendary: slight warm tint (`hsl(40 10% 11%)`)
- Search/Realms: neutral
- Mission grid: subtle card-level surface

### 5. Card Readability (MissionCard.tsx)
- Increase body text from `text-xs` → `text-sm` for location/duration
- Add warm `text-foreground/80` instead of `text-muted-foreground` for key info
- Price text larger and bolder
- Star ratings get a subtle amber glow trail

### 6. HeroBanner Polish
- "LEGENDS" title: add subtle `text-shadow` for depth instead of flat color
- Tagline text: bump from `text-lg` to `text-xl` with better line-height
- CTA buttons: slightly larger padding, more pronounced shadow

### 7. StatsBar & Footer Readability
- Stat values: ensure gold text has enough contrast against new card bg
- Footer quote: bump size, add `text-foreground/90` instead of pure foreground
- Muted text throughout footer: use new warmer `--muted-foreground`

---

### Files Modified

| File | Changes |
|------|---------|
| `src/index.css` | Rebalanced color palette, new `.pin-shield` marker styles |
| `src/components/WarRoomMap/WarRoomMap.tsx` | New 3D shield pin SVG, upgraded popup HTML, hover effects |
| `src/components/MissionDeck/MissionCard.tsx` | Text size/contrast bumps |
| `src/components/MissionDeck/MissionDetailModal.tsx` | Warmer backgrounds, better text contrast |
| `src/components/Layout/HeroBanner.tsx` | Title text-shadow, larger tagline |
| `src/components/StatsBar/StatsBar.tsx` | Contrast fixes |
| `src/pages/Index.tsx` | Section background tints |

No database changes. No new dependencies.

