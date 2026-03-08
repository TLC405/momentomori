

## World-Class Visual Overhaul

This is a comprehensive UI polish pass across every component — header, map HUD, stats bar, realm selector, search filters, mission cards, detail modal, itinerary panel, and footer. The goal: elevate everything to the AAA premium standard demanded by the project's design memory.

### What Changes

**1. AppHeader — Cinematic Top Bar**
- Replace the small circular avatar with a wider cinematic banner crop
- Add a subtle gradient underline that pulses with the primary color
- Typography: larger display font for "Remember You Must Live", shimmer effect on "Must Live"
- Add a subtle animated compass icon next to the status indicator

**2. StatsBar — Premium Stat Cards**
- Add gradient backgrounds (subtle dark-to-darker) with a warm glow border on hover
- Icons get a warm amber glow ring instead of flat bg
- Numbers use `font-orbitron` for a premium tactical feel
- Add a subtle divider line between each stat with a gradient fade

**3. SearchFilter — Refined Controls**
- Search input gets a warm inner glow on focus, subtle icon animation
- Filter panel background uses `glass-premium` style with better depth
- Price buttons get a pressed/embossed 3D effect
- Danger level chips get colored left-border accents instead of full bg when unselected

**4. RealmSelector — Polished Chips**
- Selected realm gets a glowing bottom border + icon scale-up animation
- Unselected realms get subtle hover lift with warm shadow
- Count badges use a pill style with primary gradient when selected
- Add a horizontal gradient divider line below the selector

**5. MissionCard — Premium Card Treatment**
- Add a thin top-edge colored accent line matching danger level
- Image overlay gradient refined for deeper contrast at bottom
- Hover state: subtle warm border glow + card lift shadow enhanced
- Star ratings use filled gradient stars instead of flat fill
- Price text gets a warm glow effect
- "+" button gets a ring animation on hover

**6. MissionDetailModal — Cinematic Detail View**
- Hero image section taller with a vignette overlay effect
- Stats grid: each stat card gets a left-colored border accent
- Description section: add a subtle parchment-like bg texture via CSS gradient
- Rating section: stars animate in sequentially with scale-pop
- CTA button: gradient background (primary to darker), hover ripple effect
- Tags: hover triggers a subtle scale + glow

**7. WarRoomMap HUD — Refined Overlays**
- Title badge: add the mountain icon as an SVG instead of emoji, warmer gradient
- Legend: color dots get a subtle pulse animation, better spacing
- CTA hint: typewriter reveal animation on first load

**8. ItineraryBuilder — Premium Slide Panel**
- Panel header: gradient accent line under title
- Mission items: numbered badges get a warm glow ring
- Summary stats: use `font-orbitron` for values
- "Share Trip Plan" button: gradient bg with hover brightness shift
- FAB button: enhanced shadow depth, subtle bounce on appear

**9. AppFooter — Elevated Footer**
- Add a gradient top border (primary fade)
- Stats grid: cards get warm hover glow
- Brand name: shimmer text effect
- Copyright: add a subtle heartbeat icon next to "Memento Mori"

**10. Global CSS Enhancements**
- Add a new `.warm-glow-border` utility for consistent hover borders
- Add `.stat-value` utility combining orbitron + warm color
- Refine scrollbar to use a gradient thumb
- Add subtle page-level ambient gradient at very top (behind header)

### Files Modified
- `src/index.css` — new utility classes, refined animations
- `src/components/Layout/AppHeader.tsx` — cinematic header
- `src/components/Layout/AppFooter.tsx` — elevated footer
- `src/components/StatsBar/StatsBar.tsx` — premium stat cards
- `src/components/SearchFilter/SearchFilter.tsx` — refined controls
- `src/components/RealmSelector/RealmSelector.tsx` — polished chips
- `src/components/MissionDeck/MissionCard.tsx` — premium card treatment
- `src/components/MissionDeck/MissionDeck.tsx` — section header polish
- `src/components/MissionDeck/MissionDetailModal.tsx` — cinematic modal
- `src/components/WarRoomMap/WarRoomMap.tsx` — refined HUD overlays
- `src/components/ItineraryBuilder/ItineraryBuilder.tsx` — premium panel

No database or backend changes needed. Pure visual/CSS overhaul.

