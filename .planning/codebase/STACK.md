# Technology Stack

**Analysis Date:** 2026-03-31

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code (`web/src/**/*.tsx`)
- TSX - React components and pages

**Secondary:**
- CSS - Global styles via Tailwind v4 (`web/src/app/globals.css`)

## Runtime

**Environment:**
- Node.js v25.8.1

**Package Manager:**
- npm 11.11.0
- Lockfile: `web/package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.2.1 - Full-stack React framework, App Router
- React 19.2.4 - UI library
- React DOM 19.2.4 - DOM rendering

**Styling:**
- Tailwind CSS 4.2.2 - Utility-first CSS framework (v4 with `@theme` directive)
- `@tailwindcss/postcss` 4.2.2 - PostCSS integration for Tailwind v4

**Animation:**
- Framer Motion 12.38.0 - Used heavily across all interactive sections

**Icons:**
- Lucide React 1.7.0 - Icon library (Anchor, ChevronRight, ChevronLeft used)

**Testing:**
- None configured. No test runner, no test files.

**Build/Dev:**
- ESLint 9.39.4 - Linting with flat config (`web/eslint.config.mjs`)
- `eslint-config-next` 16.2.1 - Next.js-specific ESLint rules (core-web-vitals + TypeScript)

## Key Dependencies

**Critical:**
- `next` 16.2.1 - Core framework; App Router with React Server Components
- `react` 19.2.4 - UI rendering (React 19 with new features)
- `framer-motion` 12.38.0 - Used in every interactive component for scroll animations, page transitions, carousel, marquee, and hero text cycling
- `lucide-react` 1.7.0 - Icon system (currently minimal usage: Anchor, ChevronLeft, ChevronRight)

**Infrastructure:**
- `tailwindcss` 4.2.2 - Styling framework (v4 syntax with CSS `@theme` block)
- `typescript` 5.9.3 - Type checking and compilation

## Configuration

**TypeScript:**
- Config: `web/tsconfig.json`
- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Incremental compilation enabled

**Next.js:**
- Config: `web/next.config.ts`
- Minimal configuration (empty config object, no custom settings)
- No custom image domains, redirects, or rewrites configured
- App Router (no `pages/` directory)

**PostCSS:**
- Config: `web/postcss.config.mjs`
- Single plugin: `@tailwindcss/postcss`

**ESLint:**
- Config: `web/eslint.config.mjs`
- Flat config format (ESLint 9)
- Extends: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`

**Environment Variables:**
- No `.env` files present
- No environment variables referenced in any source files
- No secrets or API keys in the codebase

**Fonts (via `next/font/google`):**
- Inter - Body text (`--font-inter`)
- Space Grotesk - Headings (`--font-space`), weights 500/600/700
- DM Serif Display - Accent italic text (`--font-dm`), weight 400 italic

**Custom Color Palette (CSS custom properties in `web/src/app/globals.css`):**
- `--brown: #48382B` (primary text)
- `--brown-mid: #6B5744`
- `--brown-muted: #8B7355`
- `--brown-light: #b8a48e`
- `--teal: #00838f` (accent)
- `--sand: #fdd79a` (highlight)
- `--cream: #faf8f4` (background)
- `--warm-white: #f5f2ed`
- `--border: #e4ddd3`
- `--card-bg: #ffffff`

## Platform Requirements

**Development:**
- Node.js 25+ (based on installed version)
- npm 11+ (lockfile v3 format)
- Run `npm run dev` from `web/` directory for local development

**Production:**
- No deployment target configured yet
- No `vercel.json`, Dockerfile, or CI pipeline present
- No `output: 'standalone'` in Next.js config
- Current hosting of old site: Apache with Varnish-cache (to be replaced)

## Other Project Files

**Root-level (non-web):**
- `squirrel.toml` - SEO crawler/audit tool configuration
- `docs/` - Documentation archive
- `v1/` through `v5/` - Previous design iterations (HTML/static)
- `index.html` - Legacy static file
- `årshjul/`, `markedsføring/`, `meneskene/`, `produktideer/` - Business planning documents

---

*Stack analysis: 2026-03-31*
