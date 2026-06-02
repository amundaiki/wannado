# Technology Stack

**Analysis Date:** 2026-04-01

## Languages

**Primary:**
- TypeScript 5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- TSX - React components and pages

**Secondary:**
- CSS - Global styles via Tailwind v4 (`src/app/globals.css`)

## Runtime

**Environment:**
- Node.js (no version pinned; no `.nvmrc` or `.node-version`)

**Package Manager:**
- npm (lockfile v3 format)
- Lockfile: `package-lock.json`

## Frameworks

**Core:**
- Next.js 16.2.1 - Full-stack React framework, App Router
- React 19.2.4 - UI library
- React DOM 19.2.4 - DOM rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework (v4 with `@theme` directive)
- `@tailwindcss/postcss` 4.x - PostCSS integration for Tailwind v4

**Animation:**
- Framer Motion 12.38.0 - Scroll animations, page transitions, carousel, marquee, hero text cycling

**Icons:**
- Lucide React 1.7.0 - Icon library (Anchor, ChevronRight, ChevronLeft, Menu, X, etc.)

**Testing:**
- None configured. No test runner, no test files.

**Build/Dev:**
- ESLint 9.x - Linting with flat config (`eslint.config.mjs`)
- `eslint-config-next` 16.2.1 - Next.js-specific ESLint rules (core-web-vitals + TypeScript)

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.1 | App Router, RSC, SSR/SSG |
| `react` / `react-dom` | 19.2.4 | UI rendering (React 19) |
| `framer-motion` | ^12.38.0 | Animation in every interactive component |
| `lucide-react` | ^1.7.0 | Icon system |
| `resend` | ^6.10.0 | Transactional email (contact form) |
| `@vercel/analytics` | ^2.0.1 | Cookieless web analytics |
| `tailwindcss` | ^4 | Styling framework (v4 `@theme` syntax) |
| `typescript` | ^5 | Type checking |

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Incremental compilation enabled

**Next.js (`next.config.ts`):**
- App Router (no `pages/` directory)
- 4 permanent redirects from old WordPress URLs to new routes
- Remote image patterns: `cdn.sanity.io` (configured for future Sanity CMS)
- No custom webpack config, no `output: 'standalone'`

**Vercel (`vercel.json`):**
- Framework: `nextjs`
- Security headers on all routes: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Cache headers on `/images/*`: 1 year immutable

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `@tailwindcss/postcss`

**ESLint (`eslint.config.mjs`):**
- Flat config format (ESLint 9)
- Extends: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`

## Fonts

All loaded via `next/font/google` in `src/app/layout.tsx`:

| Font | CSS Variable | Usage | Weights |
|---|---|---|---|
| Inter | `--font-inter` | Body text (default) | All (variable) |
| Space Grotesk | `--font-space` | Headings (h1-h4) | 500, 600, 700 |
| DM Serif Display | `--font-dm` | Accent italic text | 400 italic |

## Color Palette

Defined as CSS custom properties in `src/app/globals.css`, registered in Tailwind `@theme`:

| Token | Hex | Usage |
|---|---|---|
| `--brown` | `#48382B` | Primary text color |
| `--brown-mid` | `#6B5744` | Secondary text |
| `--brown-muted` | `#8B7355` | Muted text |
| `--brown-light` | `#b8a48e` | Light accents |
| `--teal` | `#00838f` | CTA / accent color |
| `--sand` | `#fdd79a` | Highlights, selection |
| `--cream` | `#faf8f4` | Page background |
| `--warm-white` | `#f5f2ed` | Section backgrounds |
| `--border` | `#e4ddd3` | Border color |
| `--card-bg` | `#ffffff` | Card backgrounds |

## Platform Requirements

**Development:**
- Node.js 18+ (Next.js 16 minimum)
- npm (lockfile v3)
- `npm run dev` from project root

**Production:**
- Deployed on Vercel (project linked via `.vercel/project.json`)
- Domain: wannado.no
- No `.github/workflows/` or CI pipeline; Vercel handles CI/CD via git push

**Scripts (`package.json`):**
- `dev` - `next dev`
- `build` - `next build`
- `start` - `next start`
- `lint` - `eslint`

## Static Assets

- 210 files in `public/`
- 143 image files in `public/images/` (scraped from old WordPress site + new photos)
- 10 video files in `public/videos/` (Havsul sailing clips, hero video, interview videos)
- Favicon at `public/images/scraped/logo/favicon.ico`

---

*Stack analysis: 2026-04-01*
