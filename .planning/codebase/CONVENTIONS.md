# Coding Conventions

**Analysis Date:** 2026-04-01

## Naming Patterns

### Files

- **Page components:** `page.tsx` (Next.js App Router convention)
- **Layout files:** `layout.tsx` (Next.js App Router convention)
- **Section components:** PascalCase with `Section` suffix: `HeroSection.tsx`, `CarouselSection.tsx`, `BentoGridSection.tsx`, `FeatureSection.tsx`, `PeopleSection.tsx`, `ScrollVideoSection.tsx`, `TestimonialsSection.tsx`, `WaterDividerSection.tsx`
- **UI components:** PascalCase matching purpose: `ContactForm.tsx`, `SectionHeader.tsx`, `ServiceCard.tsx`, `VideoBanner.tsx`, `PersonVideoCard.tsx`
- **Layout components:** PascalCase matching purpose: `Navbar.tsx`, `Footer.tsx`
- **Data modules:** camelCase: `src/lib/data/references.ts`
- **Route handlers:** `route.ts` inside `api/` directories: `src/app/api/contact/route.ts`
- **SEO files:** lowercase: `robots.ts`, `sitemap.ts`
- **CSS files:** lowercase: `globals.css`
- **Route directories:** lowercase Norwegian kebab-case matching URL slug: `om-oss/`, `praktisk-informasjon/`, `kulturvandring-med-sjarmerende-treskoyte/`, `seilturer/`, `kajakkturer/`

### Functions

- **Components:** PascalCase matching the file name: `HeroSection`, `CarouselSection`, `ContactForm`, `PersonVideoCard`
- **Page components on service routes:** PascalCase with `Page` suffix: `SeilturerPage` (`src/app/seilturer/page.tsx`)
- **Homepage:** Uses `Home` as function name (`src/app/page.tsx`)
- **Event handlers:** camelCase with descriptive prefix: `scrollLeft`, `scrollRight`, `handleSubmit`, `handlePlayClick`
- **Helper functions:** camelCase: `getFrameSrc`, `sizeCanvas`, `drawFrame`, `loadBatch`, `loadAll`

### Variables

- **Data constants:** UPPER_SNAKE_CASE arrays at module scope: `CAROUSEL_DATA`, `PEOPLE`, `QUOTES`, `MARQUEE_ITEMS`, `FRAME_COUNT`, `COMPANIES`, `TESTIMONIALS`, `TV_APPEARANCES`
- **Inline data arrays:** camelCase at module scope: `words` (`HeroSection.tsx`), `navLinks` (`Navbar.tsx`), `galleryImages`, `jsonLd` (`seilturer/page.tsx`), `serviceOptions` (`ContactForm.tsx`)
- **State variables:** camelCase: `isScrolled`, `isHidden`, `mobileOpen`, `index`, `isMobile`, `ready`, `showVideo`, `isInView`
- **Refs:** camelCase with `Ref` suffix: `scrollRef`, `canvasRef`, `ctxRef`, `imagesRef`, `currentFrameRef`, `rafRef`, `containerRef`, `videoRef`

### Types and Interfaces

- **Interface naming:** PascalCase with `Props` suffix for component props: `ContactFormProps`, `SectionHeaderProps`, `ServiceCardProps`, `VideoBannerProps`, `PersonVideoCardProps`
- **Type aliases:** PascalCase: `FormStatus`, `Company`, `Testimonial`, `TvAppearance`
- **Union types:** String literal unions for constrained values: `type FormStatus = "idle" | "pending" | "success" | "error"`
- **`as const` pattern:** Data arrays use `as const` for literal types with derived types: `export const COMPANIES = [...] as const; export type Company = (typeof COMPANIES)[number];` (`src/lib/data/references.ts`)
- **Metadata type:** Imported from `next`: `import type { Metadata } from "next"`

## Code Style

### Formatting

- No Prettier or Biome config exists. Relies on default editor formatting.
- 2-space indentation throughout all `.tsx` and `.ts` files.
- Double quotes for JSX attribute values and import strings.
- Semicolons at end of statements.
- Trailing commas in arrays, objects, and function parameters.
- Template literals used for string interpolation in JSX and HTML email templates.

### Linting

- **ESLint 9** with flat config: `eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- Global ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Run command: `npm run lint`

## Import Organization

### Order (observed across all files)

1. `"use client"` directive (first line, when present)
2. React hooks: `useRef`, `useState`, `useEffect`, `useCallback`
3. Framer Motion: `motion`, `AnimatePresence`, `useScroll`, `useTransform`, `useMotionValueEvent`
4. Next.js modules: `next/image`, `next/link`, `next/font/google`, `next/navigation`, `next/server`
5. Third-party libraries: `lucide-react`, `resend`, `@vercel/analytics`
6. Local components: `@/components/layout/*`, `@/components/sections/*`, `@/components/ui/*`
7. Local styles: `./globals.css` (only in root layout)

### Path Aliases

- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- All local imports use the `@/` alias consistently: `@/components/layout/Navbar`, `@/components/ui/PersonVideoCard`

### Import Style

- **Type-only imports:** Used when only importing types: `import type { Metadata } from "next"`, `import type { NextConfig } from "next"`, `import { type FormEvent } from "react"`
- **Default imports:** Used for components and Next.js modules: `import Image from "next/image"`, `import Link from "next/link"`
- **Named imports:** Used for hooks, icons, and utilities: `import { useState, useEffect } from "react"`, `import { Menu, X } from "lucide-react"`

## Component Patterns

### Client vs Server Components

- **Client components (`"use client"`):** All section components in `src/components/sections/`, all UI components in `src/components/ui/` (except `SectionHeader.tsx`), and `Navbar.tsx`. Used when the component needs React hooks, Framer Motion, browser APIs, or event handlers.
- **Server Components (no directive):** Page routes (`src/app/*/page.tsx`), `Footer.tsx`, `SectionHeader.tsx`, root `layout.tsx`, `robots.ts`, `sitemap.ts`. These have no hooks or browser-side interactivity.
- **Composition pattern:** Server Component pages compose client section components. The homepage (`src/app/page.tsx`) is a Server Component importing 9 client components.

### Export Pattern

- Every component file exports a single `export default function`. No named exports for components.
- Data module `src/lib/data/references.ts` uses named exports for each constant and derived type: `export const COMPANIES = ...`, `export type Company = ...`
- No barrel files (`index.ts`) exist anywhere.

### Data Co-location

Static data arrays are defined as module-level constants in the same file as the consuming component:

- `CAROUSEL_DATA` in `src/components/sections/CarouselSection.tsx`
- `PEOPLE` in `src/components/sections/PeopleSection.tsx`
- `QUOTES`, `MARQUEE_ITEMS` in `src/components/sections/TestimonialsSection.tsx`
- `words` in `src/components/sections/HeroSection.tsx`
- `navLinks` in `src/components/layout/Navbar.tsx`
- `serviceOptions` in `src/components/ui/ContactForm.tsx`
- `galleryImages`, `jsonLd` in `src/app/seilturer/page.tsx`

**Exception:** Shared reference data lives in `src/lib/data/references.ts` (companies, testimonials, TV appearances).

### Page Layout Pattern

Service pages (seilturer, kajakkturer, teambuilding, foredrag) follow a consistent structure:

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { /* page-specific SEO */ };

const jsonLd = { /* structured data */ };

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      {/* Hero with background image */}
      {/* Content sections */}
      {/* CTA section */}
      <Footer />
    </main>
  );
}
```

Simple info pages (personvern, praktisk-informasjon, referanser) use a simpler wrapper:

```tsx
<main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
  <Navbar />
  <div className="pt-40 pb-20 bg-brown text-white text-center">
    <h1>...</h1>
  </div>
  <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
      {/* Prose content */}
    </div>
  </div>
  <Footer />
</main>
```

### Framer Motion Patterns

**Scroll-triggered entrance animations (most common pattern):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

**Scroll-linked values (ScrollVideoSection, Navbar):**
```tsx
const { scrollYProgress } = useScroll({ target: containerRef, offset: [...] });
const opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
```

**AnimatePresence for element swapping (HeroSection, TestimonialsSection, Navbar):**
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
```

**Marquee animation (TestimonialsSection):**
```tsx
<motion.div
  animate={{ x: ["0%", "-50%"] }}
  transition={{ duration: 35, ease: "linear", repeat: Infinity }}
>
```

**Hover lift (ServiceCard):**
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
```

**Navbar hide/show with variants:**
```tsx
<motion.nav
  variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
  animate={isHidden ? "hidden" : "visible"}
  transition={{ duration: 0.35, ease: "easeInOut" }}
>
```

### Image Handling

- `next/image` (`Image` component) used for all optimized images: hero backgrounds, gallery, team photos, carousel cards.
- `sizes` attribute always provided: `"100vw"`, `"(max-width: 768px) 80vw, 33vw"`, etc.
- `priority` used on hero/above-fold images.
- `fill` used for hero background images with `className="object-cover"`.
- Explicit `width`/`height` used for sized images (cards, galleries).
- One instance of raw `<img>` tag for the SVG logo in `Navbar.tsx`.

### Icon Handling

- `lucide-react` used for navigation icons: `ChevronLeft`, `ChevronRight`, `Menu`, `X`
- Inline SVGs used for domain-specific icons (checkmarks, location pins, phone, map, book) in service pages and the footer (social media icons).

## Styling Patterns

### Framework

Tailwind CSS v4 via `@tailwindcss/postcss` plugin. No `tailwind.config.ts` file; theme configuration uses the CSS-based `@theme` directive in `globals.css`.

### Design Tokens

Custom CSS properties defined in `:root` of `src/app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--brown` | `#48382B` | Primary text, dark backgrounds |
| `--brown-mid` | `#6B5744` | Body text on light backgrounds |
| `--brown-muted` | `#8B7355` | Secondary/muted text |
| `--brown-light` | `#b8a48e` | Placeholder text, subtle elements |
| `--teal` | `#00838f` | Accent color, CTAs, links |
| `--sand` | `#fdd79a` | Highlight, selection, warm accents |
| `--cream` | `#faf8f4` | Page background |
| `--warm-white` | `#f5f2ed` | Alternate section background |
| `--border` | `#e4ddd3` | Border color |
| `--card-bg` | `#ffffff` | Card/form backgrounds |

Bridged to Tailwind via `@theme` block, enabling classes like `bg-cream`, `text-brown`, `border-border`, `text-teal`.

### Font System

Three Google Fonts loaded in `src/app/layout.tsx` with CSS variable bindings:

| Font | Variable | Tailwind Class | Usage |
|---|---|---|---|
| Inter | `--font-inter` | `font-inter` | Body text, labels, buttons, metadata |
| Space Grotesk | `--font-space` | `font-space` | Headings (h1-h4), prices, bold text |
| DM Serif Display (italic) | `--font-dm` | `font-dm` | Decorative/accent text, hero word rotation |

### Responsive Approach

- Mobile-first design with `md:` (768px) and `lg:` (1024px) breakpoints.
- Common patterns: `text-3xl md:text-5xl`, `py-16 md:py-24`, `px-6`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Container widths vary by section: `max-w-[1320px]`, `max-w-[1200px]`, `max-w-[1000px]`, `max-w-6xl`, `max-w-5xl`, `max-w-[900px]`, `max-w-[800px]`
- Centering: `mx-auto px-6` pattern used throughout.
- Mobile menu uses `hidden md:flex` for desktop links, `md:hidden` for hamburger button.

### Common Class Compositions

**Section wrapper:** `className="bg-cream py-16 md:py-24 overflow-hidden"` or `className="bg-warm-white py-20 md:py-28"`

**Card:** `className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border p-8"`

**Primary button:** `className="bg-brown text-white font-inter font-semibold py-3.5 rounded-xl hover:bg-[#5a4838] transition-colors"`

**Text link:** `className="font-inter text-sm font-medium text-brown hover:text-teal transition-colors"`

**Eyebrow text:** `className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3"` or `className="font-inter text-xs font-medium uppercase tracking-[4px] text-brown-muted mb-3"`

## Error Handling

### Route Handler (API)

The contact API route (`src/app/api/contact/route.ts`) implements:
- Input validation with early return: `if (!name || !email || !message) return NextResponse.json({...}, { status: 400 })`
- try/catch wrapping the entire handler
- Environment variable fallback: checks `process.env.RESEND_API_KEY`, logs to console if missing
- Error responses return JSON with `{ success: false, message: "..." }` and appropriate HTTP status codes
- Console logging for errors: `console.error("Feil ved sending av e-post:", error)`

### Client-Side Form

The contact form (`src/components/ui/ContactForm.tsx`) implements:
- State machine pattern: `type FormStatus = "idle" | "pending" | "success" | "error"`
- Empty catch block for fetch errors: `catch { setStatus("error") }`
- User-facing error message with phone fallback: directs to call if submission fails
- Button disabled state during submission: `disabled={status === "pending"}`

### Missing Error Handling

- No `error.tsx` boundary files in any route
- No `loading.tsx` suspense boundaries
- No `not-found.tsx` custom 404 page
- No error tracking or monitoring service integration
- Video play errors silently caught: `.play().catch(() => {})` in `PersonVideoCard.tsx`
- Image load errors in ScrollVideoSection silently resolved: `img.onerror = () => resolve()`

## Logging

- `console.log` used in contact API for dev-mode fallback when `RESEND_API_KEY` is missing
- `console.error` used in contact API catch block
- No structured logging, no logging library, no error tracking service

## Comments

### JSX Section Labels

Used extensively to mark visual sections within long JSX returns:
```tsx
{/* Hero Section */}
{/* Desktop Links */}
{/* Mobile drawer */}
{/* Overlapping smaller image */}
```

### Norwegian Comments

Comments are written in Norwegian when explaining domain-specific behavior:
```tsx
// Sett canvas-storrelse (kun ved mount og resize)
// Last frames i batcher (10 om gangen)
{/* Fyrtarn - cinematisk pusterom mellom BentoGrid og Feature */}
```

### Decision Comments

Explain porting decisions or non-obvious choices:
```tsx
{/* We can manage load animation by adding a simple script... */}
```

### JSDoc/TSDoc

Not used anywhere. Component props are documented via TypeScript interfaces only.

## SEO Patterns

### Metadata

- Root layout defines default metadata with template: `title: { default: '...', template: '%s | Wannado' }`
- Service pages export page-specific `metadata` objects with `title`, `description`, and `openGraph`
- `metadataBase` set to `https://wannado.no` in root layout

### Structured Data (JSON-LD)

- Injected via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />`
- Homepage uses `TouristAttraction` schema
- Service pages use `TouristTrip` with `offers` and `itinerary`
- JSON-LD objects defined as module-level constants: `const jsonLd = { ... }`

### Programmatic SEO Files

- `src/app/robots.ts` exports `MetadataRoute.Robots` with allow all, disallow `/api/` and `/studio/`
- `src/app/sitemap.ts` exports `MetadataRoute.Sitemap` with all public routes, priorities, and change frequencies

---

*Convention analysis: 2026-04-01*
