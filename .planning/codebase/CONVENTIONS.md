# Coding Conventions

**Analysis Date:** 2026-03-31

## Naming Patterns

**Files:**
- Page components: `page.tsx` (Next.js App Router convention)
- Layout files: `layout.tsx` (Next.js App Router convention)
- Section components: PascalCase with `Section` suffix, e.g. `HeroSection.tsx`, `CarouselSection.tsx`
- Layout components: PascalCase matching purpose, e.g. `Navbar.tsx`, `Footer.tsx`
- CSS files: lowercase, e.g. `globals.css`
- Route directories: lowercase Norwegian kebab-case matching the URL slug, e.g. `om-oss/`, `praktisk-informasjon/`, `kulturvandring-med-sjarmerende-treskoyte/`

**Functions:**
- Components use PascalCase: `HeroSection`, `CarouselSection`, `BentoGridSection`
- Event handlers use camelCase with descriptive names: `scrollLeft`, `scrollRight`
- Page components on sub-routes use generic `Page` as function name (not a unique name)
- The homepage uses `Home` as function name (`web/src/app/page.tsx`)
- The om-oss page uniquely uses `OmOss` as function name (`web/src/app/om-oss/page.tsx`)

**Variables:**
- Constants use UPPER_SNAKE_CASE: `CAROUSEL_DATA`, `BENTO_DATA`, `PEOPLE`, `QUOTES`, `MARQUEE_ITEMS`
- State variables use camelCase: `isScrolled`, `isHidden`, `index`
- Refs use camelCase with `Ref` suffix: `scrollRef`

**Types:**
- No custom TypeScript types or interfaces defined yet. The codebase relies on inferred types and React built-in types.
- `Metadata` from `next` is the only explicitly imported type (`web/src/app/layout.tsx`)

## Code Style

**Formatting:**
- No Prettier config detected. Relies on default editor formatting.
- 2-space indentation throughout all `.tsx` files
- Double quotes for JSX attribute values and import strings
- Semicolons at end of statements
- Trailing commas in arrays and objects

**Linting:**
- ESLint 9 with flat config: `web/eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- `@next/next/no-img-element` warnings are suppressed with inline `eslint-disable-next-line` comments (used extensively in section components)
- Run linting: `npm run lint` (from `web/`)

## Import Organization

**Order:**
1. React/framework imports: `"use client"` directive first, then `react`, `next/*`, `framer-motion`
2. Third-party libraries: `lucide-react`
3. Local components: `@/components/*`
4. Local styles: `./globals.css` (only in layout)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `web/tsconfig.json`)
- All local imports use the `@/` alias: `@/components/layout/Navbar`, `@/components/sections/HeroSection`

**Pattern example from `web/src/app/page.tsx`:**
```typescript
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
```

## Component Patterns

**Client vs Server Components:**
- All section components (`web/src/components/sections/*.tsx`) use `"use client"` directive because they depend on `framer-motion` for animations
- Layout components: `Navbar.tsx` uses `"use client"` (scroll state + framer-motion); `Footer.tsx` is a Server Component (no directive)
- Sub-route pages (`web/src/app/*/page.tsx`) are Server Components (no directive, no hooks)
- The homepage (`web/src/app/page.tsx`) is a Server Component that composes client section components

**Default exports only:**
- Every component file exports a single default export. No named exports are used anywhere.
- No barrel files (`index.ts`) exist.

**Data co-location:**
- Static data arrays (carousel items, people, quotes) are defined as module-level constants in the same file as the component that uses them.
- Example: `CAROUSEL_DATA` is defined at the top of `web/src/components/sections/CarouselSection.tsx`

**Page layout pattern for sub-routes:**
Every sub-route page follows an identical template structure:
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Page Title</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
          {/* Content paragraphs */}
        </div>
      </div>
      <Footer />
    </main>
  );
}
```

**Exception:** `web/src/app/om-oss/page.tsx` uses `PeopleSection` component instead of raw paragraph content.

## Styling Patterns

**Framework:** Tailwind CSS v4 via `@tailwindcss/postcss` plugin

**CSS custom properties:** Defined in `web/src/app/globals.css` using `:root` block with brand colors:
- `--brown`, `--brown-mid`, `--brown-muted`, `--brown-light`
- `--teal`, `--sand`, `--cream`, `--warm-white`
- `--border`, `--card-bg`

**Tailwind theme mapping:** Custom colors bridged in `@theme` block in `globals.css` so Tailwind utilities like `bg-cream`, `text-brown`, `border-border` work.

**Font system:** Three Google Fonts loaded in `web/src/app/layout.tsx` as CSS variables:
- `--font-inter` (Inter) for body text. Use class `font-inter`.
- `--font-space` (Space Grotesk) for headings. Use class `font-space`.
- `--font-dm` (DM Serif Display, italic) for decorative/accent text. Use class `font-dm`.

**Responsive approach:**
- Mobile-first with `md:` and `lg:` breakpoint modifiers
- Common pattern: `text-3xl md:text-5xl`, `py-16 md:py-24`, `px-4 md:px-10`
- Container widths use `max-w-[1320px]`, `max-w-[1200px]`, `max-w-[1000px]`, `max-w-[900px]` depending on section

**Animation pattern:** Framer Motion is used pervasively:
- Scroll-triggered entrance animations with `whileInView` + `viewport={{ once: true }}`
- Standard fade-up: `initial={{ opacity: 0, y: 20 }}` / `whileInView={{ opacity: 1, y: 0 }}`
- Staggered delays via `delay: idx * 0.1` or `delay: idx * 0.2`
- Transition ease: `"easeOut"` for entrances, custom cubic bezier for hero text

## Error Handling

**Patterns:**
- No error boundaries (`error.tsx`), loading states (`loading.tsx`), or not-found pages (`not-found.tsx`) exist
- No try/catch blocks anywhere in the codebase
- No form validation or error states implemented
- Null checks on refs use optional chaining: `if (scrollRef.current) { ... }` in `web/src/components/sections/CarouselSection.tsx`

## Logging

**Framework:** None. No console.log, no logging utilities, no error tracking.

## Comments

**When to Comment:**
- Inline comments explain design decisions: `// Using Lucide icon as temporary logo`
- Section labels in JSX: `{/* Background Image */}`, `{/* Content */}`, `{/* Desktop Links */}`
- Comments explain workarounds: `{/* eslint-disable-next-line @next/next/no-img-element */}`
- One multi-line comment in `web/src/app/layout.tsx` explains a porting decision

**JSDoc/TSDoc:**
- Not used anywhere in the codebase

## Function Design

**Size:** Components range from 21 to 140 lines. Largest is `CarouselSection.tsx` (140 lines).

**Parameters:** Components accept no props (except `RootLayout` which accepts `children`). Data is co-located as module constants.

**Return Values:** All components return JSX. No utility functions or hooks are defined.

## Module Design

**Exports:** Single default export per file. No named exports.

**Barrel Files:** None. All imports reference the specific file path.

## Language Conventions

**Norwegian content:** All user-facing text is in Norwegian (Bokmal). Route slugs use Norwegian words: `/opplevelser`, `/teambuilding`, `/menneskene`, `/foredrag`, etc.

**HTML lang attribute:** Set to `"nb"` (Norwegian Bokmal) in `web/src/app/layout.tsx`.

---

*Convention analysis: 2026-03-31*
