# Roadmap — Shine Asia Estate
*Generated: 2026-05-10 | Stage: Active Development → Pre-Deploy | Stack: Next.js 16 + TypeScript + Tailwind v4 + Framer Motion 12*

---

## Auto-Selected Agents (used to produce this roadmap)

| Domain | Agent | Findings |
|--------|-------|----------|
| Code quality | `typescript-reviewer` | 6 HIGH, 6 MEDIUM, 1 LOW |
| Accessibility | `a11y-architect` | 6 CRITICAL, 11 HIGH, 9 MEDIUM |
| SEO | `seo-specialist` | 4 CRITICAL, 9 HIGH, 6 MEDIUM |
| Performance | `performance-optimizer` | 2 CRITICAL, 5 HIGH, 4 MEDIUM |
| Security + Design | `security-reviewer` | 2 CRITICAL, 4 HIGH, 4 MEDIUM + 4 design violations |

---

## Phase 1 — BLOCK: Must fix before any production deploy (this week)

### 1.1 Security Headers — `next.config.ts`
No CSP, HSTS, X-Frame-Options, X-Content-Type-Options configured. Any XSS vector is catastrophic without CSP.
```ts
async headers() {
  return [{ source: '/(.*)', headers: securityHeaders }];
}
```
Add: HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, CSP.

### 1.2 ESLint Build Error — `src/app/sell-your-property/page.tsx:226`
Unescaped `"` in JSX — build-blocking lint error. Change to `&ldquo;`.

### 1.3 Hero Video LCP — `src/components/sections/HeroVideo.tsx`
- `preload="auto"` → `preload="none"` (stops 20-60MB download blocking critical path)
- Replace CSS background-image fallback div with `<Image priority fetchPriority="high" fill sizes="100vw">` (makes poster discoverable by preload scanner)
- Remove `poster` attribute from `<video>` (redundant after Image fix)

### 1.4 Missing Routes — 404 Risk
- `/destinations` directory exists but has NO `page.tsx` — broken internal link from homepage
- Create `src/app/destinations/page.tsx` with metadata + redirect to `/properties`

### 1.5 Form Submissions — Zero Leads Captured
All 3 forms (`contact`, `sell-your-property`, `property/[slug]`) have no `onSubmit`, no `action`, no handler. Data silently discarded on submit.
- Add Next.js Server Actions with server-side validation
- Add rate limiting before launch
- Minimum interim fix: `type="email"` on email fields, `required` attributes

---

## Phase 2 — HIGH: Fix before first user traffic (next week)

### 2.1 Accessibility — Color Contrast Failures (WCAG CRITICAL)
`--color-muted: #6B5E54` on `#0A0A0A` = **2.82:1** — fails AA (needs 4.5:1).
```css
/* src/styles/tokens.css */
--color-muted: #9A8B7E;        /* 5.45:1 on black — WCAG AA */
--color-border-strong: #5A4F45; /* 3.1:1 — for interactive field edges */
```
Also: form input default border `#3A3128` at 1.42:1 — fails 1.4.11.

### 2.2 Accessibility — All Forms Missing `<label>` Associations (WCAG CRITICAL)
Every form input is announced as "edit, blank" by screen readers. Placeholder ≠ label.
```tsx
<label htmlFor="contact-name" className="sr-only">Your name</label>
<input id="contact-name" name="name" type="text" required aria-required="true" ... />
```
Files: `contact/page.tsx`, `sell-your-property/page.tsx`, `property/[slug]/page.tsx`, `properties/page.tsx`

### 2.3 Accessibility — No `useReducedMotion` in JS Animations (WCAG CRITICAL)
CSS `prefers-reduced-motion` does NOT stop Framer Motion's JS-driven animations (parallax, counters, infinite chevron).
Create `src/hooks/useReducedMotion.ts` and gate:
- `CounterStat.tsx` — jump spring to final value instantly
- `Hero.tsx` / `HeroVideo.tsx` — disable parallax + word stagger
- `Editorial.tsx` — disable parallax
- All `RevealOnScroll` wrappers — render statically

### 2.4 Accessibility — Hero Video Has No Pause Control (WCAG CRITICAL)
`autoPlay loop` with no pause button violates WCAG 2.2.2. Add a pause/play toggle button. Auto-pause when `prefersReducedMotion`.

### 2.5 Accessibility — Mobile Nav Focus Management (WCAG CRITICAL)
Toggle has no `aria-expanded`, no `aria-controls`, no Escape close, no focus return on close.
```tsx
<button aria-expanded={open} aria-controls="primary-navigation" aria-label="Open menu">
```

### 2.6 SEO — Missing Sitemap + Robots
Create `src/app/sitemap.ts` (all property slugs + blog slugs + static routes).
Create `src/app/robots.ts`.

### 2.7 SEO — No JSON-LD Structured Data Anywhere
- `layout.tsx` → `RealEstateAgent` / `LocalBusiness` schema
- `property/[slug]/page.tsx` → `RealEstateListing` + `BreadcrumbList`
- `blog/[slug]/page.tsx` → `Article` schema

### 2.8 SEO — /properties Has No Metadata (Client Component)
Split into Server Component wrapper (exports `metadata`) + `PropertiesClient.tsx` (`'use client'`).

### 2.9 SEO — OG Images + Canonicals Missing on All Pages
Root layout: add `metadataBase`, `openGraph.images`, `alternates.canonical`, `title.template`.
Each page: add `alternates.canonical` + `openGraph` with URL.
`property/[slug]`: add `openGraph.images: [property.image]`.

### 2.10 Design — Serif on Numbers (BRIEF Violation)
Numbers in `Stats.tsx:27`, `Featured.tsx:73`, `sell-your-property/page.tsx:80` wrapped in `serif-italic`.
Brief: *"Numbers in stats/prices: DM Sans 500 — never serif"*.
Change wrapper to `font-sans font-medium`.

### 2.11 Design — `group-hover:scale-[1.04]` on PropertyCard Image (BRIEF Violation)
Brief: *"Property cards hover: y:-6 (NEVER scale)"*.
Remove `group-hover:scale-[1.04]` from `PropertyCard.tsx:53`.

### 2.12 Security — `rel="noopener noreferrer"` Missing on 4 External Links
`sell-your-property/page.tsx:63`, `property/[slug]/page.tsx:244`, `about/page.tsx:174`, `Footer.tsx:40`.

---

## Phase 3 — MEDIUM: Quality & polish (this month)

### 3.1 TypeScript — Framer Motion Performance Fixes
- `FaqAccordion.tsx:34–37`: animate `height` → animate `scaleY + opacity` (layout-bound prop)
- `Hero.tsx:137` + `HeroVideo.tsx:125`: `width` CSS transition → `scaleX` (layout-bound)
- `Featured.tsx:78` + `property/[slug]/page.tsx:273`: `hover:gap-5` → `translateX` on arrow icon

### 3.2 TypeScript — `'use client'` Overuse
- `Footer.tsx` → remove `'use client'` entirely (pure HTML, no hooks)
- `PropertyCard.tsx` → remove motion wrapper, use CSS `hover:-translate-y-1.5`
- `Stats.tsx` → Server Component wrapping `CounterStat` client leaf

### 3.3 TypeScript — Type Safety
- Replace `as Property[]` with `satisfies Property[]` in 4 files (compile-time data validation)
- Fix `status: 'for-sale' | 'off-plan' | string` vacuous union → remove `| string`
- Guard `ALL_PROPERTIES[0]` fallback in `page.tsx:18`

### 3.4 Accessibility — Skip-to-Content Link
Add to `layout.tsx` top of body. Add `id="main"` to every `<main>`.

### 3.5 Accessibility — FAQ ARIA Wiring
`FaqAccordion.tsx`: add `aria-expanded`, `aria-controls`, `id` on panel, `role="region"`.

### 3.6 Accessibility — Counter Announces Final Value Once
`CounterStat.tsx`: hide animated span from SR via `aria-hidden="true"`, add `<span className="sr-only">{target}</span>`.

### 3.7 SEO — Homepage h1 Has Zero Target Keywords
`HeroVideo.tsx` TITLE_LINES: lead with "Koh Samui." before the poetic line.
Eyebrow: add "Koh Samui" to "Paris · Cannes · Dubai" sequence.

### 3.8 SEO — Blog Articles Serve Identical Placeholder Body
Add `body: string[]` field to `data/blog.json` per article.
Interim: add `robots: { index: false }` to blog article metadata until real content exists.

### 3.9 Performance — Remove Unused Cormorant Weights
`layout.tsx`: `weight: ['400', '500', '600']` → `weight: ['400']` (500/600 not used anywhere).
Removes 2 font preload requests from critical path.

### 3.10 Performance — Add Bundle Analyzer
```ts
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';
// ANALYZE=true npm run build
```

### 3.11 Security — Extract Phone Number to Single Constant
Create `src/lib/contact.ts` → `export const WHATSAPP_NUMBER = '66658314819'`.
Replace 7 hardcoded occurrences.

### 3.12 Design — Off-Palette Color `#1F1A15`
Used in 4 files. Adopt `#2A2420` (stone) or formally add to palette in BRIEF.md + tokens.css.

### 3.13 Design — Forbidden Words in Data Files
- `data/properties.json`: `"stunning sea views"` → `"panoramic sea views"` or `"unobstructed sea views"`
- `data/blog.json`: `"paradise island"` → `"island of Koh Samui"` | category `"Lifestyle"` → `"Island"`
- `data/sell-content.json`: `"lifestyle outlets"` → `"editorial outlets"`

### 3.14 Accessibility — Contact Intent Radio Group Missing `<fieldset>`
`contact/page.tsx:135–149`: wrap in `<fieldset><legend>`. Add `peer-focus-visible:outline` on styled chips.

### 3.15 Accessibility — Touch Targets Below 24×24px
`Nav.tsx:57–59` language toggle + `Nav.tsx:68–74` mobile icon: add `min-h-[44px] min-w-[44px]`.

---

## Phase 4 — NICE TO HAVE (next month)

- Add `experimental.optimizeCss: true` to `next.config.ts` (critical CSS inlining, FCP improvement)
- Delete Next.js scaffold SVGs from `/public/` (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Verify `Hero.tsx` is dead code (not imported anywhere) → delete
- Add `Article` structured data on blog pages
- `property/[slug]`: convert spec bar `<div>` pairs to `<dl><dt><dd>` for better SR comprehension
- Add `lang="ar" dir="rtl"` on Arabic text in Footer; `lang="fr"` on French terms in Editorial/Destinations
- Review staff personal numbers in `data/team.json` — determine if intentionally public

---

## Missing Coverage (auto-detected)

| Gap | Status |
|-----|--------|
| Tests (unit, integration, E2E) | **None exist** — TDD required before Phase 3 features |
| Form backend / Server Actions | **None** — critical for any lead capture |
| CI/CD pipeline | **Unknown** — no `.github/workflows/` found |
| OG images | **None** — `/public/og-default.jpg` must be created |
| Real blog content | **None** — all 6 articles share identical placeholder body |
| sitemap.xml / robots.txt | **None** — blocks search indexing |

---

## Workflow for This Project

```
/workflow → use for any complex multi-file task
/smart    → use for quick single-file fixes

Review agents to call after each phase:
  Phase 1 fixes → cat-devops (security headers validation)
  Phase 2 fixes → a11y-architect (contrast + ARIA re-check)
  Phase 2 SEO   → seo-specialist (metadata + JSON-LD validation)
  Phase 3 TS    → typescript-reviewer (type safety re-check)
  Any code      → typescript-reviewer (after every component edit)
```
