# Codebase Structure

**Analysis Date:** 2026-03-31

## Directory Layout

```
wannado/
├── web/                          # Next.js application (main codebase)
│   ├── src/
│   │   ├── app/                  # App Router pages and global styles
│   │   │   ├── layout.tsx        # Root layout (fonts, metadata, <html>)
│   │   │   ├── page.tsx          # Homepage (composed of section components)
│   │   │   ├── globals.css       # Tailwind v4 theme, CSS variables, base styles
│   │   │   ├── booking/          # Booking stub page
│   │   │   ├── foredrag/         # Foredrag (lectures) stub page
│   │   │   ├── kontakt/          # Contact stub page
│   │   │   ├── kulturvandring-med-sjarmerende-treskoyte/  # Cultural tour stub page
│   │   │   ├── kurs/             # Courses stub page
│   │   │   ├── menneskene/       # People stub page
│   │   │   ├── om-oss/           # About page (uses PeopleSection component)
│   │   │   ├── opplevelser/      # Experiences stub page
│   │   │   ├── personvern/       # Privacy policy stub page
│   │   │   ├── praktisk-informasjon/  # Practical info stub page
│   │   │   ├── referanser/       # References/testimonials stub page
│   │   │   ├── samarbeidspartnere/    # Partners stub page
│   │   │   ├── teambuilding/     # Teambuilding stub page
│   │   │   └── utleie/           # Equipment rental stub page
│   │   └── components/
│   │       ├── layout/           # Shared structural components
│   │       │   ├── Navbar.tsx    # Fixed navbar with scroll-hide animation
│   │       │   └── Footer.tsx    # Site footer with contact info and links
│   │       ├── sections/         # Homepage section components
│   │       │   ├── HeroSection.tsx
│   │       │   ├── CarouselSection.tsx
│   │       │   ├── BentoGridSection.tsx
│   │       │   ├── FeatureSection.tsx
│   │       │   ├── PeopleSection.tsx
│   │       │   └── TestimonialsSection.tsx
│   │       └── ui/               # Empty, reserved for reusable UI primitives
│   ├── public/
│   │   ├── images/               # Site photographs (JPG)
│   │   ├── file.svg              # Default Next.js SVG assets
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── package.json              # Dependencies and scripts
│   ├── next.config.ts            # Next.js config (empty/default)
│   ├── tsconfig.json             # TypeScript config with @/* path alias
│   ├── eslint.config.mjs         # ESLint with next/core-web-vitals + typescript
│   ├── postcss.config.mjs        # PostCSS with Tailwind v4 plugin
│   ├── AGENTS.md                 # Next.js agent instructions
│   └── CLAUDE.md                 # References AGENTS.md
├── docs/
│   └── arkiv/                    # Historical files from old WordPress site
│       ├── backup/               # Old HTML page backups
│       ├── css/                  # Old CSS files
│       ├── pages/                # Old page content files
│       ├── all info              # Scraped content from old site
│       ├── strategi              # Marketing strategy document
│       └── v1-v5                 # Iterative design versions
├── .planning/
│   └── codebase/                 # Architecture analysis documents (this file)
├── CLAUDE.md                     # Project-level Claude instructions
├── README.md                     # Project overview
├── index.html                    # Old static homepage (197KB, pre-Next.js)
├── squirrel.toml                 # Squirrel config
├── årshjul                       # Annual planning wheel (Norwegian text)
├── markedsføring                 # Marketing plan (Norwegian text)
├── meneskene                     # People descriptions (Norwegian text)
├── produktideer                  # Product ideas (Norwegian text)
└── v1-v5                         # Design iteration documents
```

## Directory Purposes

**`web/src/app/`:**
- Purpose: Next.js App Router file-system routes
- Contains: `page.tsx` files for each route, root `layout.tsx`, `globals.css`
- Key files: `web/src/app/layout.tsx` (root layout), `web/src/app/page.tsx` (homepage), `web/src/app/globals.css` (theme)

**`web/src/components/sections/`:**
- Purpose: Self-contained homepage sections, each with hardcoded data and Framer Motion animations
- Contains: 6 section components, all `"use client"` with default exports
- Key files: `web/src/components/sections/HeroSection.tsx` (hero with word rotation), `web/src/components/sections/CarouselSection.tsx` (experience cards)

**`web/src/components/layout/`:**
- Purpose: Shared structural chrome (navigation and footer)
- Contains: `Navbar.tsx` (client component with scroll tracking), `Footer.tsx` (server component)
- Key files: Both files are imported manually by every page

**`web/src/components/ui/`:**
- Purpose: Reserved for reusable atomic UI components (buttons, cards, inputs, etc.)
- Contains: Nothing yet (empty directory)
- Key files: None

**`web/public/images/`:**
- Purpose: Static photograph assets used across the site
- Contains: 7 JPG files (outdoor activities, kayaking, sailing, lectures)
- Key files: `baat-fb.jpg` (hero background), `gronland-kajakk-3.jpg` (kayak card), `tp-typeteori.jpg` (teambuilding/people)

**`docs/arkiv/`:**
- Purpose: Historical reference material from the old WordPress site and earlier design iterations
- Contains: Old HTML backups, CSS, scraped content, strategy docs, 5 iterative design versions
- Key files: `all info` (full scraped content from old site), `strategi` (marketing strategy)

## Key File Locations

**Entry Points:**
- `web/src/app/layout.tsx`: Root layout, font loading, HTML metadata
- `web/src/app/page.tsx`: Homepage composition

**Configuration:**
- `web/package.json`: Dependencies (Next.js 16, React 19, Framer Motion, Lucide, Tailwind v4)
- `web/next.config.ts`: Next.js configuration (currently empty/default)
- `web/tsconfig.json`: TypeScript with `@/*` path alias mapping to `./src/*`
- `web/eslint.config.mjs`: ESLint with core-web-vitals and TypeScript presets
- `web/postcss.config.mjs`: PostCSS with `@tailwindcss/postcss` plugin

**Styling/Theme:**
- `web/src/app/globals.css`: Complete color palette (10 CSS custom properties), Tailwind v4 `@theme` mapping, base body styles, heading font-family override

**Core Logic:**
- `web/src/components/sections/HeroSection.tsx`: Animated hero with word rotation (useEffect interval)
- `web/src/components/sections/CarouselSection.tsx`: Horizontal scroll carousel with navigation buttons
- `web/src/components/sections/TestimonialsSection.tsx`: Auto-rotating testimonial quotes with marquee banner
- `web/src/components/layout/Navbar.tsx`: Scroll-aware fixed navbar with show/hide animation

**Content Pages:**
- `web/src/app/teambuilding/page.tsx`: Most content-rich stub page (~64 lines of text)
- `web/src/app/referanser/page.tsx`: Client references and testimonials stub
- `web/src/app/booking/page.tsx`: Booking information stub (unstructured)

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention)
- Layout: `layout.tsx` (Next.js convention)
- Section components: `PascalCase` with `Section` suffix: `HeroSection.tsx`, `CarouselSection.tsx`
- Layout components: `PascalCase` descriptive names: `Navbar.tsx`, `Footer.tsx`
- CSS: `globals.css` (single file)

**Directories:**
- Route segments: Norwegian kebab-case: `om-oss/`, `praktisk-informasjon/`, `kulturvandring-med-sjarmerende-treskoyte/`
- Component groups: lowercase singular category: `layout/`, `sections/`, `ui/`

**Exports:**
- All components use `export default function ComponentName()`
- No named exports, no barrel files (no `index.ts` re-exports)

**Data Constants:**
- Module-level `const` arrays in SCREAMING_SNAKE_CASE: `CAROUSEL_DATA`, `BENTO_DATA`, `PEOPLE`, `QUOTES`, `MARQUEE_ITEMS`

## Where to Add New Code

**New Page Route:**
- Create directory: `web/src/app/{route-name-in-norwegian}/`
- Add file: `web/src/app/{route-name-in-norwegian}/page.tsx`
- Import Navbar and Footer manually (no shared layout beyond root)
- Add per-page `metadata` export for SEO

**New Homepage Section:**
- Create: `web/src/components/sections/{Name}Section.tsx`
- Add `"use client"` directive if using Framer Motion or React hooks
- Define data as module-level constants in SCREAMING_SNAKE_CASE
- Import and place in `web/src/app/page.tsx` at desired position

**New Reusable UI Component:**
- Create: `web/src/components/ui/{ComponentName}.tsx`
- Use for atomic elements: buttons, cards, inputs, badges, modals

**New Layout Component:**
- Create: `web/src/components/layout/{ComponentName}.tsx`
- Use for structural elements: sidebars, headers, breadcrumbs

**New Shared Utility/Hook:**
- Create: `web/src/lib/{utilName}.ts` or `web/src/hooks/{useHookName}.ts`
- These directories do not exist yet; create them as needed

**New API Route (when backend is needed):**
- Create: `web/src/app/api/{endpoint}/route.ts`
- No API routes exist yet

**New Global Styles/Theme Changes:**
- Edit: `web/src/app/globals.css`
- Add CSS custom properties to `:root` block
- Map to Tailwind via `@theme` block

## Special Directories

**`web/.next/`:**
- Purpose: Next.js build output and dev server cache
- Generated: Yes (by `next build` and `next dev`)
- Committed: No (in `.gitignore`)

**`web/node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in `.gitignore`)

**`docs/arkiv/`:**
- Purpose: Historical reference from old WordPress site; not used by the application
- Generated: No (manually created/scraped)
- Committed: Yes

**`web/public/`:**
- Purpose: Static assets served at root URL path
- Generated: No
- Committed: Yes
- Note: Contains default Next.js SVG files that should be cleaned up, plus actual site photos in `images/`

**`.planning/codebase/`:**
- Purpose: Architecture analysis and planning documents
- Generated: By analysis tools
- Committed: Yes

---

*Structure analysis: 2026-03-31*
