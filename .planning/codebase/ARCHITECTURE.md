# Architecture

> Analysis date: 2026-04-01

## Pattern Overview

Static-first Next.js 16 App Router site. All pages are React Server Components with inline content (no CMS, no database). Client interactivity is isolated to specific components via `"use client"` directives. A single API route handles the contact form via Resend email service.

The codebase follows a **page-centric** pattern: each route file contains its own metadata, JSON-LD schema markup, and full page layout (including Navbar/Footer). There is no shared page wrapper or template component; layout composition is repeated per page.

## Layers

### 1. Pages (`src/app/**/page.tsx`)

18 route segments total. Each page is a Server Component that exports `metadata` and a default component. Pages fall into four categories:

**Polished service pages** (full custom layout, hero, pricing, CTA):
- `src/app/page.tsx` (homepage, composes 8+ section components)
- `src/app/seilturer/page.tsx` (sailing tours)
- `src/app/kajakkturer/page.tsx` (kayak courses and tours)
- `src/app/teambuilding/page.tsx` (corporate teambuilding)
- `src/app/foredrag/page.tsx` (lectures/JTI)
- `src/app/opplevelser/page.tsx` (experience overview)
- `src/app/om-oss/page.tsx` (about page with team profiles)
- `src/app/kontakt/page.tsx` (contact form + info sidebar)
- `src/app/utleie/page.tsx` (equipment rental)
- `src/app/referanser/page.tsx` (references/testimonials)
- `src/app/praktisk-informasjon/page.tsx` (practical info)
- `src/app/personvern/page.tsx` (privacy policy)

**Stub/placeholder pages** (scraped content, minimal styling):
- `src/app/booking/page.tsx`
- `src/app/kurs/page.tsx`
- `src/app/samarbeidspartnere/page.tsx`
- `src/app/kulturvandring-med-sjarmerende-treskoyte/page.tsx`

### 2. Sections (`src/components/sections/`)

Reusable homepage section components, all `"use client"` for Framer Motion animations:

| Component | Purpose | Key deps |
|---|---|---|
| `HeroSection.tsx` | Full-screen hero with video (desktop) / image (mobile), rotating text | framer-motion, next/image |
| `CarouselSection.tsx` | Horizontal scroll card carousel for featured experiences | framer-motion, next/image |
| `ScrollVideoSection.tsx` | Scroll-driven frame-by-frame video playback using canvas | framer-motion, canvas API |
| `BentoGridSection.tsx` | 5-item bento grid with hover blur effects | framer-motion, next/image |
| `FeatureSection.tsx` | Two-column teambuilding feature with overlapping images | framer-motion, next/image |
| `PeopleSection.tsx` | Team member profiles with video cards | framer-motion, PersonVideoCard |
| `TestimonialsSection.tsx` | Marquee text banner + rotating quote carousel | framer-motion |
| `WaterDividerSection.tsx` | Simple looping video divider | none (unused currently) |

### 3. Layout (`src/components/layout/`)

| Component | Purpose | Client? |
|---|---|---|
| `Navbar.tsx` | Fixed navbar with scroll hide/show, mobile drawer | Yes (framer-motion, lucide-react) |
| `Footer.tsx` | 4-column footer with links, contacts, social | No (Server Component) |

### 4. UI Components (`src/components/ui/`)

| Component | Purpose | Client? |
|---|---|---|
| `ContactForm.tsx` | Form with service select, posts to `/api/contact` | Yes (useSearchParams, useState) |
| `PersonVideoCard.tsx` | Image-to-video reveal card with IntersectionObserver autoplay | Yes |
| `VideoBanner.tsx` | Configurable video banner with overlay options | Yes |
| `SectionHeader.tsx` | Reusable eyebrow + title + description header | No |
| `ServiceCard.tsx` | Product/service card with price, badge, CTA | Yes (framer-motion) |

### 5. API Routes (`src/app/api/`)

Single route: `src/app/api/contact/route.ts`
- Accepts POST with `{ name, email, phone, service, message }`
- Validates required fields (name, email, message)
- Sends HTML email via Resend to `mail@wannado.no`
- Falls back to console.log when `RESEND_API_KEY` is missing (dev mode)
- Returns JSON `{ success, message }`

### 6. Data Layer (`src/lib/data/`)

Single file: `src/lib/data/references.ts`
- Exports typed constants: `COMPANIES`, `TESTIMONIALS`, `TV_APPEARANCES`
- Uses `as const` for type narrowing
- Consumed by `src/app/referanser/page.tsx`

## Data Flow

### Static Content
All page content is hardcoded in TSX files. No CMS, no dynamic data fetching, no database. Service prices, descriptions, course details, team bios are all inline constants within page files.

### Contact Form Flow
```
ContactForm (client) -> POST /api/contact -> Resend API -> mail@wannado.no
                                          -> (fallback: console.log in dev)
```
The form reads `?tjeneste=` from URL search params to pre-select a service.

### Video/Media
- Hero: MP4 video on desktop, static JPG fallback on mobile (detected via `matchMedia`)
- Scroll video: 52 JPEG frames loaded in batches and rendered to canvas, driven by scroll position
- Video banners: Autoplay looping MP4s with configurable overlay
- Interview videos: Click-to-play with IntersectionObserver autoplay/pause

## Entry Points

- `src/app/layout.tsx` - Root layout, loads fonts (Inter, Space Grotesk, DM Serif Display), sets `lang="nb"`, includes Vercel Analytics
- `src/app/page.tsx` - Homepage, composes all major sections
- `src/app/api/contact/route.ts` - Only API endpoint

## Key Abstractions

### Font System
Three Google Fonts loaded in `layout.tsx` via `next/font/google`, exposed as CSS variables:
- `--font-inter` (Inter) - Body text
- `--font-space` (Space Grotesk) - Headings
- `--font-dm` (DM Serif Display, italic) - Accent/decorative text

### Color System
Custom color tokens defined as CSS custom properties in `src/app/globals.css`:
- `brown` palette: `#48382B` (primary), `brown-mid`, `brown-muted`, `brown-light`
- `teal`: `#00838f` (accent/CTA)
- `sand`: `#fdd79a` (highlight/selection)
- `cream`: `#faf8f4` (page background)
- `warm-white`: `#f5f2ed` (section background alt)
- `border`: `#e4ddd3`

Colors are mapped to Tailwind v4 via `@theme` directive in globals.css.

### Animation Pattern
All animations use Framer Motion with consistent patterns:
- `whileInView` with `viewport={{ once: true }}` for scroll-triggered reveals
- `AnimatePresence` for enter/exit transitions (hero text, testimonials, mobile menu)
- `useScroll` + `useTransform` for scroll-linked effects (navbar, scroll video)

## Error Handling

- **API route**: try/catch with generic 500 JSON response and `console.error`
- **Contact form**: client-side status state (`idle | pending | success | error`) with inline error message and phone number fallback
- **No error.tsx or not-found.tsx files exist** - relies on Next.js defaults
- **No global error boundary**

## Cross-Cutting Concerns

### SEO
- Per-page `Metadata` exports with title template (`%s | Wannado`), description, OpenGraph
- JSON-LD structured data on service pages (TouristTrip, Product, Event, ItemList, TouristAttraction)
- `src/app/sitemap.ts` - Static sitemap with 12 URLs
- `src/app/robots.ts` - Allows all, disallows `/api/` and `/studio/`
- `metadataBase` set to `https://wannado.no`

### Redirects
Four permanent redirects in `next.config.ts` mapping old WordPress URLs to new routes:
- `/kulturvandring-med-sjarmerende-treskoyte` -> `/seilturer`
- `/kajakk-turer-og-ekspedisjoner` -> `/kajakkturer`
- `/kurs/kajakkurs` -> `/kajakkturer`
- `/menneskene` -> `/om-oss`

### Security Headers
`vercel.json` adds: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`. Image paths get 1-year immutable cache.

### Analytics
Vercel Analytics (`@vercel/analytics/next`) in root layout. Cookieless, no third-party tracking.

### Accessibility
- `lang="nb"` on html element
- Navbar has `aria-label` for mobile toggle
- Contact form has proper `label`/`htmlFor`/`id` associations
- No skip-to-content link
- No ARIA landmarks beyond semantic HTML

### i18n
Single-language site (Norwegian Bokmal). `lang="nb"` set in root layout. No i18n framework.

### Logging
Console logging only: `console.error` in API route, `console.log` for dev fallback. No structured logging or monitoring beyond Vercel Analytics.

### Remote Images
`next.config.ts` allows remote images from `cdn.sanity.io` (prepared for future Sanity CMS integration, not currently used).
