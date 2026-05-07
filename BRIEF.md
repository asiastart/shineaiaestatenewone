# Shine Asia Estate — Visual & Editorial Brief

> Source of truth for every UI decision. Read this before writing a single line of UI code.

---

## Direction

**Dark luxury editorial.** Black-dominant background, warm-white text, single gold accent. Big serif italics for emotion, clean sans-serif for utility. Generous space. Sharp angles. Cinematic photography.

Reference vibe: Aman Resorts × Forbes & Partners, but darker and more sensorial.

We **do NOT** copy Forbes — we surpass them by going darker, more cinematic, and more sensorial.

---

## Palette (locked)

```
--color-black:  #0A0A0A   /* dominant background */
--color-white:  #F8F5F0   /* warm white, never pure */
--color-gold:   #C9A96E   /* unique accent, used sparingly */
--color-stone:  #2A2420   /* card surfaces */
--color-muted:  #6B5E54   /* secondary text */
--color-border: #3A3128   /* subtle dividers */
```

No other colors. Period.

---

## Typography

- **Headlines / hero / section titles**: Cormorant Garamond italic 400. Always italic for emotion. Tight tracking.
- **Body, UI, labels, prices**: DM Sans 400/500. Wide tracking on uppercase eyebrows (0.16em).
- **Numbers in stats/prices**: DM Sans 500 — never serif (would feel pretentious).

---

## Brand voice

The agency calls itself **a house** — never "an agency" or "a firm".
First-person plural: "we work with...", "we have walked the site...".
Avoid: *luxury, world-class, exclusive, dream home, paradise, stunning, breathtaking, nestled, boasts, land of smiles, lifestyle*.
Prefer: *sanctuary* (only when architecturally true), *placed quietly into careful hands*, sensory specifics (frangipani, lateritic stone, southwest wind, the hour after rain).

### Tagline (chosen)
> **The Thailand we keep for ourselves.**

### Hero (chosen)
> *Where the silence between waves becomes home.*
> Properties chosen with care across Koh Samui and the Thai islands.

---

## Animation rules (Framer Motion)

- **Hero title**: stagger 0.08s per word, fadeUp from y:30, duration 0.6s, ease expo-out `[0.16, 1, 0.3, 1]`
- **Section reveals**: `useInView({ once: true, margin: '-80px' })`, fadeUp 0.6s
- **Property cards hover**: `y: -6` (NEVER scale), shadow grows, gold underline appears
- **Counters**: `useSpring({ stiffness: 60, damping: 20 })` on inView
- **Page transitions**: `AnimatePresence mode="wait"`, opacity + 12px x-shift, 250ms
- **Parallax hero**: `useScroll` + `useTransform([0, 1], ['0%', '30%'])`
- **NEVER** animate: `width`, `height`, `border-radius`, `margin`, `padding`
- **ALWAYS** respect `useReducedMotion`

---

## Layout rules

- Section vertical padding: `var(--space-section)` = clamp(5rem, 4rem + 5vw, 10rem)
- Container max-width: 1440px
- Border-radius: never above 4px (sharp = luxury)
- Shadow: subtle, warm, never pure black
- Grid: prefer asymmetric / editorial (60/40, 70/30) over uniform 3-col

---

## Page structure (homepage)

1. **Hero** — full-viewport, single image or video, title in Cormorant italic stagger
2. **Stats bar** — "120+ Properties · 12 Years · Koh Samui · THB / USD / EUR / SGD"
3. **Featured property** — 70/30 asymmetric, photo dominant, minimal overlay
4. **Destinations grid** — 6 cards (Koh Samui · Phuket · Bangkok · Koh Phangan · Chiang Mai · Pattaya)
5. **Properties grid** — filterable, multi-currency, hover quick-view
6. **Editorial story** — "The Hour After Rain", text + image parallax
7. **Testimonials** — circular photos, 3 visible at once
8. **Blog cards** — 3 latest articles, editorial style
9. **Footer** — logo, tagline, contact, WhatsApp, language switcher

### Pages to build
- `/` (home)
- `/properties` (full grid + filters)
- `/property/[slug]` (detail + gallery + map + form)
- `/destinations/[city]` (per-destination)
- `/about` (story + team + values)
- `/contact` (form + WhatsApp + map)
- `/blog`, `/blog/[slug]`

---

## Data sources

- `data/properties.json` — 40+ properties (more can be scraped later)
- `data/team.json` — Mr. Oussama Zakaria (CEO), Pinki, Enzo Day
- `data/blog.json` — 6 articles ready

---

## What surpasses Forbes & Partners

1. **Dark mode primary** (Forbes is white) — more immersive, more cinematic
2. **Serif italic on hero** (Forbes uses sans) — more elegant, more emotional
3. **Quick-view on hover** — no obligatory click, faster browsing
4. **Multi-currency persistent toggle** — THB / USD / EUR / SGD with localStorage
5. **WhatsApp floating button** — Asian market reality, immediate contact
6. **Sensorial copy** — Forbes is restrained, we go further with sensory specifics

---

## Ban list

- Border-radius > 4px
- Any color outside palette
- Drop shadows that look "Material Design"
- Stock-style photography
- Words: luxury, world-class, exclusive, dream home, paradise
- Emojis in copy or UI
- "Click here", "Learn more"
- Animating width/height/margin

---

## CTAs (chosen)

| Surface | Copy |
|---|---|
| Hero | Walk the portfolio |
| Card hover | Walk through |
| Property page primary | Arrange a viewing |
| Property page secondary | Ask about this house |
| Form submit | Send the note |
| Newsletter | Subscribe to the letter |
| WhatsApp | Open conversation |
| 404 | Return to the island |

---

*Brief locked 2026-05-08. Mr. Oussama Zakaria, CEO. Editorial direction: dark luxury, place-aware, sensorial restraint.*
