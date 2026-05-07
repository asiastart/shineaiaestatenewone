# Shine Asia Estate

A small, considered portfolio of villas, apartments, and hotels across
Koh Samui, Paris, and the French Riviera. Curated since 2013.

> The Thailand we keep for ourselves.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- next/font/google (Cormorant Garamond + DM Sans)

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
```

## Structure

- `src/app/` — pages (`/`, `/properties`, `/property/[slug]`, `/sell-your-property`, `/about`, `/contact`, `/blog`, `/blog/[slug]`)
- `src/components/sections/` — reusable luxury components (Nav, Hero, PropertyCard, Editorial, Footer…)
- `src/lib/` — utilities (currency conversion, cn helper)
- `src/styles/tokens.css` — design system tokens (palette, typography, spacing, motion)
- `data/` — properties, blog articles, team profiles, sell-page content
- `BRIEF.md` — visual + editorial brief (source of truth)

## Markets

- **Koh Samui** (Thailand) — primary, 12 years, 671+ properties placed
- **Paris** (France) — Haussmannian apartments, hôtels particuliers, hotels
- **Cannes** (French Riviera) — La Croisette villas, Belle Époque mansions, hotels
