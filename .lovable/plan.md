

# Ultra-Premium 3D Animated Card & App-Wide Visual Upgrade

## What We're Building

A next-gen visual overhaul using advanced CSS 3D transforms, perspective, and micro-animations across every component — no external 3D libraries needed, pure CSS/React for maximum performance.

## Technical Approach

All 3D effects via CSS `perspective`, `transform-style: preserve-3d`, `rotateX/Y`, and GPU-accelerated transitions. Mouse-tracking tilt on cards using `onMouseMove` with `requestAnimationFrame`.

---

## Changes

### 1. MissionCard.tsx — 3D Tilt + Holographic Effects
- Add `useState` for mouse position tracking
- `onMouseMove` calculates tilt angle (±12deg X/Y) relative to card center
- `onMouseLeave` resets to flat with spring transition
- Add holographic light sweep overlay that follows cursor
- Add parallax depth layers: image shifts opposite to tilt, content shifts with tilt
- Add glassmorphism inner border glow that intensifies on hover
- Add animated gradient shine sweep on hover
- Staggered entrance: cards fly in from below with rotation

### 2. FeaturedQuest.tsx — Cinematic Hero Card
- Add 3D perspective container with subtle auto-tilt animation
- Image section: parallax depth shift on hover
- Add animated light streak across image
- Floating stat badges with subtle bounce animation
- CTA button: 3D press effect (translateZ on click)

### 3. MissionDetailModal.tsx — Premium Modal Experience
- Modal entrance: scale from 0.8 + rotateX(10deg) to normal
- Image section: ken-burns slow zoom + pan
- Stats grid: staggered pop-in with scale bounce
- Tags: cascade fade-in from left
- CTA button: 3D depth press with glow burst

### 4. StatsBar.tsx — Counter Animation + 3D Lift
- Add animated number counter (counts up from 0)
- Cards lift on hover with perspective tilt
- Icon rotates 360° on hover
- Subtle floating animation on idle

### 5. RealmSelector.tsx — 3D Chip Buttons
- Buttons tilt slightly on hover with shadow shift
- Selected state: raised with glow underneath
- Icon scales + bounces on selection
- Active indicator slides with spring physics

### 6. SearchFilter.tsx — Glass Panel + Smooth Reveals
- Expanded filters: accordion with 3D unfold effect
- Input focus: subtle lift + glow ring
- Danger level buttons: 3D press on click
- Filter chips: flip animation on toggle

### 7. ItineraryBuilder.tsx — Floating Panel + Item Animations
- Panel slides in with 3D rotation from right edge
- Mission items: swipe-in from right with stagger
- Remove: item shrinks + rotates out
- Summary stats: animated counters
- FAB button: 3D bounce + orbital glow ring

### 8. AppHeader.tsx — Premium Sticky Bar
- Logo image: subtle continuous float animation
- Title: shimmer text effect on load
- "Quests Active" badge: breathing glow pulse
- Bottom border: animated gradient sweep left-to-right

### 9. AppFooter.tsx — Polished Footer
- Stats grid: hover lift with 3D tilt
- Section dividers: animated gradient lines

### 10. index.css — New Animation Keyframes
Add:
- `@keyframes tilt-in` — card entrance with rotation
- `@keyframes shine-sweep` — holographic light sweep
- `@keyframes counter-up` — number counting
- `@keyframes ken-burns` — slow image zoom/pan
- `@keyframes float-gentle` — idle floating
- `@keyframes press-3d` — button click depth
- `@keyframes unfold` — filter panel reveal
- Premium `.card-3d` utility class with perspective setup
- `.holographic-shine` overlay class
- `.glass-premium` glassmorphism utility

### 11. tailwind.config.ts — Extended Animations
Add new keyframes and animation utilities for all the above effects.

---

## File Summary

| File | Action |
|------|--------|
| `src/components/MissionDeck/MissionCard.tsx` | Major — 3D tilt, parallax, holographic shine |
| `src/components/FeaturedQuest/FeaturedQuest.tsx` | Major — cinematic hero, parallax, light streaks |
| `src/components/MissionDeck/MissionDetailModal.tsx` | Major — 3D entrance, ken-burns, staggered reveals |
| `src/components/StatsBar/StatsBar.tsx` | Moderate — animated counters, 3D lift |
| `src/components/RealmSelector/RealmSelector.tsx` | Moderate — 3D chip hover, spring selection |
| `src/components/SearchFilter/SearchFilter.tsx` | Moderate — glass panel, 3D unfold, press effects |
| `src/components/ItineraryBuilder/ItineraryBuilder.tsx` | Moderate — 3D panel slide, item animations |
| `src/components/Layout/AppHeader.tsx` | Light — float, shimmer, gradient sweep |
| `src/components/Layout/AppFooter.tsx` | Light — hover lift, animated lines |
| `src/index.css` | Major — new keyframes, utility classes |
| `tailwind.config.ts` | Moderate — new animation definitions |

All effects are pure CSS + React state — no additional dependencies required. Every interaction feels tactile, premium, and AAA-game quality.

