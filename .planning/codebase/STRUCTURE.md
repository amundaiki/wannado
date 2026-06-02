# Structure

> Analysis date: 2026-04-01

## Directory Layout

```
src/
  app/                              # Next.js App Router pages
    api/
      contact/
        route.ts                    # POST endpoint for contact form (Resend email)
    booking/
      page.tsx                      # Stub page (scraped content, unfinished)
    foredrag/
      page.tsx                      # JTI lectures and Greenland expedition page
    kajakkturer/
      page.tsx                      # Kayak courses and guided tours page
    kontakt/
      page.tsx                      # Contact page with form + info sidebar
    kulturvandring-med-sjarmerende-treskoyte/
      page.tsx                      # Legacy URL stub (redirected to /seilturer)
    kurs/
      page.tsx                      # Stub page (scraped content, unfinished)
    om-oss/
      page.tsx                      # About page with team profiles and videos
    opplevelser/
      page.tsx                      # Experience overview with category cards
    personvern/
      page.tsx                      # Privacy policy (GDPR compliant)
    praktisk-informasjon/
      page.tsx                      # Practical info (meeting points, gear, safety)
    referanser/
      page.tsx                      # References, testimonials, TV appearances
    samarbeidspartnere/
      page.tsx                      # Stub page (scraped content, unfinished)
    seilturer/
      page.tsx                      # Sailing tours with Havsul page
    teambuilding/
      page.tsx                      # Corporate teambuilding products page
    utleie/
      page.tsx                      # Kayak/canoe rental page
    favicon.ico                     # Site favicon
    globals.css                     # Tailwind v4 config, color tokens, base styles
    layout.tsx                      # Root layout (fonts, metadata, analytics)
    page.tsx                        # Homepage (composes section components)
    robots.ts                       # robots.txt generation
    sitemap.ts                      # XML sitemap generation

  components/
    layout/
      Footer.tsx                    # Site footer (4-column, links, contacts, social)
      Navbar.tsx                    # Fixed navbar with scroll behavior and mobile drawer

    sections/                       # Homepage section components (all "use client")
      BentoGridSection.tsx          # 5-item image grid with hover blur
      CarouselSection.tsx           # Horizontal scrolling experience cards
      FeatureSection.tsx            # Two-column teambuilding feature
      HeroSection.tsx               # Full-screen hero with video/image + rotating text
      PeopleSection.tsx             # Team member profiles with video cards
      ScrollVideoSection.tsx        # Scroll-driven frame-by-frame video (canvas)
      TestimonialsSection.tsx       # Marquee banner + rotating quote carousel
      WaterDividerSection.tsx       # Video divider strip (currently unused)

    ui/                             # Reusable UI components
      ContactForm.tsx               # Contact form with API integration
      PersonVideoCard.tsx           # Image-to-video reveal card
      SectionHeader.tsx             # Reusable section header (eyebrow/title/desc)
      ServiceCard.tsx               # Service/product card with pricing
      VideoBanner.tsx               # Autoplay video banner with overlay options

  lib/
    data/
      references.ts                 # Typed constants: companies, testimonials, TV
```

## Directory Purposes

| Directory | Purpose |
|---|---|
| `src/app/` | Route segments (one `page.tsx` per route), API routes, global layout and styles |
| `src/app/api/` | Server-side API endpoints (currently only contact form) |
| `src/components/layout/` | Structural components used across all pages (Navbar, Footer) |
| `src/components/sections/` | Self-contained homepage sections with animations |
| `src/components/ui/` | Smaller reusable UI building blocks |
| `src/lib/data/` | Static data constants and types |

## Key File Locations

| Need | File |
|---|---|
| Root layout, fonts, metadata | `src/app/layout.tsx` |
| Global CSS, color tokens | `src/app/globals.css` |
| Homepage composition | `src/app/page.tsx` |
| Contact form API | `src/app/api/contact/route.ts` |
| SEO sitemap | `src/app/sitemap.ts` |
| SEO robots | `src/app/robots.ts` |
| Redirects from old site | `next.config.ts` |
| Security headers, caching | `vercel.json` |
| Reference/testimonial data | `src/lib/data/references.ts` |
| TypeScript config | `tsconfig.json` |
| ESLint config | `eslint.config.mjs` |
| PostCSS config | `postcss.config.mjs` |

## Naming Conventions

### Files and Directories
- **Route segments**: lowercase with hyphens (`om-oss`, `praktisk-informasjon`, `kajakkturer`)
- **Components**: PascalCase (`HeroSection.tsx`, `ContactForm.tsx`, `PersonVideoCard.tsx`)
- **Data files**: lowercase (`references.ts`)
- **API routes**: `route.ts` within named directory (`api/contact/route.ts`)

### Component Organization
- `layout/` - Components that appear on every page (Navbar, Footer)
- `sections/` - Large, self-contained homepage sections
- `ui/` - Smaller, potentially reusable components

### Exports
- All components use **default exports**
- Data constants use **named exports** with `as const` assertions
- Types are exported alongside their data (`Company`, `Testimonial`, `TvAppearance`)

### Data Constants
- Uppercase for constant arrays: `CAROUSEL_DATA`, `BENTO_DATA`, `PEOPLE`, `MARQUEE_ITEMS`, `QUOTES`
- Lowercase for page-scoped data: `courses`, `products`, `references`, `categories`, `contacts`
- JSON-LD variables: `jsonLd`, `courseSchema`, `tourSchema`, `productSchema`

### CSS/Styling
- Tailwind v4 utility classes exclusively (no CSS modules, no styled-components)
- Custom colors via CSS custom properties in `:root`, mapped to Tailwind via `@theme`
- Font families referenced as Tailwind classes: `font-inter`, `font-space`, `font-dm`
- Consistent semantic color classes: `text-brown`, `text-brown-mid`, `text-teal`, `bg-cream`, `bg-warm-white`

## Where to Add New Code

### New Page
1. Create directory under `src/app/` with hyphenated name (e.g., `src/app/hesteridning/`)
2. Add `page.tsx` with `Metadata` export and default component
3. Include `<Navbar />` and `<Footer />` in the returned JSX
4. Add JSON-LD structured data if service page
5. Add URL to `src/app/sitemap.ts`
6. Add link to `src/components/layout/Navbar.tsx` `navLinks` array if primary navigation

### New Homepage Section
1. Create component in `src/components/sections/` with PascalCase name
2. Add `"use client"` directive if using Framer Motion or browser APIs
3. Import and place in `src/app/page.tsx` in desired position

### New UI Component
1. Create in `src/components/ui/` with PascalCase name
2. Use default export
3. Add `"use client"` only if component uses hooks or browser APIs

### New API Route
1. Create directory under `src/app/api/` (e.g., `src/app/api/booking/`)
2. Add `route.ts` with named exports for HTTP methods (`GET`, `POST`, etc.)
3. Update `src/app/robots.ts` if the path should be disallowed from crawlers

### New Data/Constants
1. Add to `src/lib/data/` as a new file or extend existing ones
2. Use `as const` assertions for typed constants
3. Export types alongside data

### New Hook or Utility
1. Create `src/lib/hooks/` or `src/lib/utils/` directory (does not exist yet)
2. Use named exports for hooks (`useX`) and utility functions

## External Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.1 | Framework |
| `react` / `react-dom` | 19.2.4 | UI library |
| `framer-motion` | ^12.38.0 | Animations (hero, scroll, carousel, reveals) |
| `lucide-react` | ^1.7.0 | Icons (Menu, X, MapPin, etc.) |
| `resend` | ^6.10.0 | Email sending for contact form |
| `@vercel/analytics` | ^2.0.1 | Cookieless analytics |
| `tailwindcss` | ^4 | CSS framework |

## Static Assets

| Path | Contents |
|---|---|
| `public/images/` | Hero images, team photos, service images (~13 files) |
| `public/images/scraped/` | Images organized by category (sailing, kayak, teambuilding, landscape) |
| `public/videos/` | 6 Havsul video clips (MP4), interview videos |
| `public/videos/havsul-frames/` | 52 JPEG frames for scroll video section |
| `public/images/wannado-logo.svg` | Company logo |
