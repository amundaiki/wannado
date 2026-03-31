# Architecture

**Analysis Date:** 2026-03-31

## Pattern Overview

**Overall:** Next.js 16 App Router with section-based component composition

**Key Characteristics:**
- Static marketing site with no backend, no API routes, no database
- All content is hardcoded in component files and page files (no CMS, no data fetching)
- Homepage is composed of discrete, self-contained section components
- Sub-pages follow a uniform "stub page" template with raw text content from the old WordPress site
- Client-side interactivity via Framer Motion for animations and scroll-based effects
- No server-side data fetching, no Server Actions, no route handlers

## Layers

**Presentation Layer (Pages):**
- Purpose: Define routes and compose components into full pages
- Location: `web/src/app/`
- Contains: Next.js App Router page files (`page.tsx`) and root layout (`layout.tsx`)
- Depends on: Layout components, Section components
- Used by: Next.js router (file-system routing)

**Section Components:**
- Purpose: Self-contained homepage sections with their own data, markup, and animation logic
- Location: `web/src/components/sections/`
- Contains: `HeroSection.tsx`, `CarouselSection.tsx`, `BentoGridSection.tsx`, `FeatureSection.tsx`, `PeopleSection.tsx`, `TestimonialsSection.tsx`
- Depends on: Framer Motion, Lucide icons
- Used by: `web/src/app/page.tsx` (homepage), `web/src/app/om-oss/page.tsx` (reuses PeopleSection)

**Layout Components:**
- Purpose: Shared navigation and footer used across all pages
- Location: `web/src/components/layout/`
- Contains: `Navbar.tsx`, `Footer.tsx`
- Depends on: Framer Motion (Navbar), Lucide icons (Navbar), Next.js Link
- Used by: Every page file manually imports and renders these

**UI Components:**
- Purpose: Reusable atomic UI primitives
- Location: `web/src/components/ui/`
- Contains: Empty directory, no components exist yet
- Used by: Nothing

**Styling Layer:**
- Purpose: Global CSS variables, Tailwind v4 theme, base styles
- Location: `web/src/app/globals.css`
- Contains: Custom color palette (brown, teal, sand, cream), font family mappings, base body styles
- Used by: All components via Tailwind utility classes

## Data Flow

**Content Rendering (Homepage):**

1. `web/src/app/layout.tsx` loads Google Fonts (Inter, Space Grotesk, DM Serif Display) and sets HTML lang to `nb`
2. `web/src/app/page.tsx` composes all section components in order: Navbar, Hero, Carousel, BentoGrid, Feature, People, Testimonials, Footer
3. Each section component contains its own hardcoded data arrays (e.g., `CAROUSEL_DATA`, `BENTO_DATA`, `PEOPLE`, `QUOTES`) and renders them with Framer Motion animations

**Content Rendering (Sub-pages):**

1. Each sub-page route (e.g., `/opplevelser`, `/teambuilding`) has its own `page.tsx`
2. Every sub-page imports Navbar and Footer, then renders a brown hero header + a white card with raw text paragraphs
3. Content is plain text strings migrated from the old WordPress site, not structured data

**State Management:**
- No global state management (no Context, no Redux, no Zustand)
- Local component state only: `useState` for scroll position tracking (Navbar), word rotation index (HeroSection), testimonial rotation index (TestimonialsSection)
- Scroll-based state via Framer Motion's `useScroll` and `useMotionValueEvent` in Navbar

## Key Abstractions

**Section Component Pattern:**
- Purpose: Encapsulate a homepage section as a self-contained unit with data + UI + animation
- Examples: `web/src/components/sections/HeroSection.tsx`, `web/src/components/sections/CarouselSection.tsx`, `web/src/components/sections/BentoGridSection.tsx`
- Pattern: Each is a `"use client"` component exporting a default function. Data is defined as module-level constants. Animations use Framer Motion's `motion.*` components with `whileInView` viewport triggers.

**Stub Page Pattern:**
- Purpose: Placeholder pages for all routes from the old WordPress site
- Examples: `web/src/app/foredrag/page.tsx`, `web/src/app/kontakt/page.tsx`, `web/src/app/utleie/page.tsx`, `web/src/app/teambuilding/page.tsx`
- Pattern: Every stub page has identical structure: Navbar, brown hero with `<h1>`, white card with `<p>` elements containing raw text. No semantic HTML, no structured content, no images.

**Manual Layout Composition:**
- Purpose: Pages manually include Navbar and Footer rather than using nested layouts
- Examples: All page files import and render `Navbar` + `Footer` directly
- Pattern: No use of `layout.tsx` for shared chrome beyond the root layout. Each page independently wraps its content with `<main>` + Navbar + Footer. This means there is no shared layout at the route-group level.

## Entry Points

**Root Layout:**
- Location: `web/src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Load Google Fonts (Inter, Space Grotesk, DM Serif Display), set `<html lang="nb">`, apply font CSS variables and base classes to `<body>`

**Homepage:**
- Location: `web/src/app/page.tsx`
- Triggers: Navigation to `/`
- Responsibilities: Compose and render all homepage sections in order. This is the only fully designed page.

**Sub-pages (12 routes):**
- Location: `web/src/app/{route}/page.tsx` where route is one of: `booking`, `foredrag`, `kontakt`, `kulturvandring-med-sjarmerende-treskoyte`, `kurs`, `menneskene`, `om-oss`, `opplevelser`, `personvern`, `praktisk-informasjon`, `referanser`, `samarbeidspartnere`, `teambuilding`, `utleie`
- Triggers: Navigation to respective URL path
- Responsibilities: Render placeholder content from old WordPress site. Only `om-oss` reuses a section component (`PeopleSection`); all others are raw text stubs.

## Error Handling

**Strategy:** None implemented

**Patterns:**
- No `error.tsx` boundary files exist
- No `not-found.tsx` custom 404 page exists
- No `loading.tsx` loading states exist
- No `global-error.tsx` exists
- No try/catch blocks anywhere (no data fetching to handle errors for)

## Cross-Cutting Concerns

**Logging:** None. No logging framework, no console.log calls in production code.

**Validation:** None. No forms, no user input handling.

**Authentication:** None. No auth system.

**SEO/Metadata:** Minimal. Only root layout has basic `metadata` export with `title` and `description`. No per-page metadata, no Open Graph tags, no structured data/schema markup. This is a critical gap given the project's SEO goals.

**Internationalization:** Norwegian Bokmal (`lang="nb"`) set on `<html>` element. All content is in Norwegian.

**Accessibility:** Minimal. Some `aria-label` attributes on carousel buttons and social links. No skip-to-content link. No focus management.

---

*Architecture analysis: 2026-03-31*
