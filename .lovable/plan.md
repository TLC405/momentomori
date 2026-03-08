

## Plan: Creative Rebrand + Massive UX Overhaul

### Name Change

**New name: "BEFORE YOU GO"**  
Tagline: *"The Bucket List Engine for the Brotherhood"*  
Sub-tagline: *"Life is short. Make it legendary."*

This keeps the Memento Mori philosophy without saying "die" or "must live" — it's punchy, memorable, and works as both a call to action and a nod to mortality. The header gets removed entirely (as requested — "no head") and replaced with something radically different.

---

### The Big Creative Moves

**1. Kill the Header — Replace with a Cinematic Hero Banner**
- Remove `AppHeader` entirely from the page layout
- Replace with a full-bleed cinematic hero section at the top: a massive background video/image collage with the name "BEFORE YOU GO" typeset in enormous display text over it
- Floating nav pills (Map / Adventures / Your Trip) anchored to the top that appear on scroll as a minimal sticky bar
- The hero has a parallax depth effect and a single animated tagline that types out

**2. Floating Minimal Nav (replaces header)**
- On scroll past the hero, a slim frosted-glass bar slides down with: logo mark (a compass icon), the three nav anchors, and the itinerary count badge
- No traditional header — feels like a premium app, not a website

**3. Full-Screen Immersive Map**
- Map becomes THE hero — takes 85vh on desktop, full-screen-capable with an expand button
- Dark-themed map tiles (Stadia Alidade Smooth Dark) instead of terrain — matches the dark UI
- Animated flight paths from HQ to each mission (curved SVG arcs)
- Cluster markers for dense areas
- Bottom sheet on mobile for mission details instead of popups

**4. Mission Cards — Magazine Editorial Layout**
- Replace uniform grid with a masonry/editorial layout: featured missions get 2-column spans, others are standard
- Cards get a "torn paper" bottom edge effect via CSS clip-path
- On hover: the image zooms AND a short video preview plays (if available) or a parallax Ken Burns effect
- Danger level shown as a vertical colored strip on the left edge (not a badge)
- Add a "distance ring" indicator — a tiny radial gauge showing how far from OKC

**5. New "Legendary Picks" Carousel**
- A horizontal auto-scrolling marquee of the highest-rated missions (broRating 5)
- Each item is a wide cinematic card with the image taking 80% and a minimal text overlay
- Clicking pauses the scroll and expands the card inline

**6. Adventure Categories — Visual Grid Instead of Chips**
- Replace the text-chip realm selector with a visual grid of category cards
- Each realm gets a moody background image, the icon overlaid large, and the count
- Selected realm has a glowing border and the image desaturates for unselected ones
- 2 rows on desktop, horizontal scroll on mobile

**7. Interactive Stats — Animated Counters with Context**
- Stats bar becomes a horizontal "ticker tape" with animated counters
- Add new stats: "Total Drive Hours Available", "Avg Group Cost", "Most Dangerous Region"
- Each stat has a micro-chart sparkline next to it

**8. Search — Command Palette Style**
- Replace inline search with a floating command palette (press `/` or click the search icon)
- Shows recent searches, popular tags, and instant results as you type
- Full-screen overlay with blur background

**9. Itinerary — Side Drawer with Route Map**
- Itinerary panel becomes a proper side drawer (right-side sheet)
- Includes a mini-map showing the driving route between saved missions
- Add drag-to-reorder for trip sequence
- "Share Trip" generates a shareable link or exports to PDF

**10. Footer — Replaced with "The Last Word" Section**
- Ditch traditional footer layout
- Replace with a single powerful closing section: a full-width dark panel with a large quote about living fully, the app name, and minimal links
- Animated ember/particle effect floating up from the bottom

---

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Update title and meta to "BEFORE YOU GO" |
| `src/pages/Index.tsx` | Complete layout restructure — hero, floating nav, new section order |
| `src/components/Layout/AppHeader.tsx` | **Delete** — replaced by hero + floating nav |
| `src/components/Layout/AppFooter.tsx` | Rewrite as "The Last Word" closing section |
| `src/components/Layout/FloatingNav.tsx` | **New** — sticky scroll-triggered nav bar |
| `src/components/Layout/HeroBanner.tsx` | **New** — full-bleed cinematic hero |
| `src/components/StatsBar/StatsBar.tsx` | Redesign as horizontal ticker with sparklines |
| `src/components/RealmSelector/RealmSelector.tsx` | Redesign as visual image grid |
| `src/components/MissionDeck/MissionCard.tsx` | Editorial layout with left danger strip, distance gauge |
| `src/components/MissionDeck/MissionDeck.tsx` | Masonry/editorial grid layout |
| `src/components/MissionDeck/MissionDetailModal.tsx` | Full-screen takeover modal |
| `src/components/SearchFilter/SearchFilter.tsx` | Command palette overlay |
| `src/components/WarRoomMap/WarRoomMap.tsx` | Dark tiles, expand button, flight path arcs |
| `src/components/ItineraryBuilder/ItineraryBuilder.tsx` | Side drawer with mini route map |
| `src/components/LegendaryPicks/LegendaryPicks.tsx` | **New** — auto-scroll marquee carousel |
| `src/index.css` | New animations, torn-edge clip-path, ember particles, command palette styles |
| `src/data/realms.ts` | Add `imageUrl` field for visual grid |

No database or backend changes needed.

