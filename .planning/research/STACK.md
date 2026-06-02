# Stack Research

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|-----------|---------|---------|----------------|
| Next.js | 16.2.1 | Full-stack React framework | App Router, React Server Components, built-in SEO (sitemap, robots, metadata API), Vercel-native deploy |
| React | 19.2.4 | UI rendering | Latest stable, required by Next.js 16 |
| TypeScript | 5.9.3 | Type safety | Strict mode, catch errors at build time |
| Tailwind CSS | 4.2.2 | Utility-first styling | v4 with CSS `@theme` directive, native CSS custom properties |
| Framer Motion | 12.38.0 | Animations | Scroll-triggered animations, page transitions, carousels |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|------------|
| `lucide-react` | 1.7.0 | Icons | Navigation, CTAs, feature lists |
| `@vercel/analytics` | 1.5.0 | Web analytics | Cookieless, GDPR-vennlig, automatisk page views |
| `next/font/google` | built-in | Font loading | Inter (body), Space Grotesk (headings), DM Serif Display (accent) |
| `next/image` | built-in | Image optimization | Alle bilder; automatisk WebP/AVIF, lazy loading, responsive sizes |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint 9 | Linting | Flat config, `core-web-vitals` + `typescript` presets |
| PostCSS | CSS processing | Tailwind v4 via `@tailwindcss/postcss` |
| npm | Package manager | Lockfile v3, Node.js 25+ |

## Installation

```bash
npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir
npm install framer-motion lucide-react @vercel/analytics
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|------------|------------|----------------------|
| Next.js 16 | Astro | Purely static site uten interaktivitet |
| Tailwind v4 | CSS Modules | Når teamet ikke kjenner Tailwind |
| Framer Motion | CSS animations | Enkle hover/fade-effekter uten scroll-triggers |
| Hardcoded content | Sanity CMS | Når klienten skal redigere innhold selv (planlagt fase 15) |
| Vercel | Netlify | Når prosjektet ikke bruker Next.js-spesifikke features |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|------------|
| styled-components | Runtime CSS-in-JS, dårlig med RSC | Tailwind CSS |
| Redux/Zustand | Overkill for statisk markedsføringsside | Lokal `useState` |
| Prisma/Drizzle | Ingen database behov | Hardcoded data, senere Sanity |
| NextAuth | Ingen brukerautentisering | Ikke relevant |
| react-icons | Stor bundlestørrelse | lucide-react (tree-shakeable) |
| jQuery/Bootstrap | Legacy, konflikter med React | Tailwind + Framer Motion |
| Webpack | Eldre bundler | Turbopack (innebygd i Next.js 16) |

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|----------------|-------|
| Next.js 16 | React 19 | Krever React 19, ikke kompatibel med 18 |
| Tailwind v4 | `@tailwindcss/postcss` 4.x | v4 bruker CSS-native `@theme`, ikke `tailwind.config.js` |
| Framer Motion 12 | React 19 | `"use client"` påkrevd i App Router |
| ESLint 9 | Flat config | `eslint.config.mjs`, ikke `.eslintrc` |

## Sources

- Next.js 16 docs: https://nextjs.org/docs
- Tailwind CSS v4: https://tailwindcss.com/docs
- Framer Motion: https://motion.dev/docs
- Vercel Analytics: https://vercel.com/docs/analytics

---
*Research: 2026-03-31*
