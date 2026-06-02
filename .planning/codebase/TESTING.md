# Testing Patterns

**Analysis Date:** 2026-04-01

## Test Framework

**Status: No testing is configured.**

- No test runner installed (no Jest, Vitest, Cypress, or Playwright).
- No test-related dependencies in `package.json`.
- No test configuration files exist (`jest.config.*`, `vitest.config.*`, `playwright.config.*`).
- No test scripts in `package.json`. Available scripts: `dev`, `build`, `start`, `lint`.

## Test File Organization

- Zero test files exist in the project source.
- No `.test.*`, `.spec.*`, or `__tests__/` directories outside `node_modules/`.

## Coverage

- No coverage tooling configured.
- No coverage thresholds enforced.

## What Exists Instead of Tests

### Linting

The only automated code quality check is ESLint:
- `eslint.config.mjs` with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Run via `npm run lint`

### TypeScript Strict Mode

- `tsconfig.json` has `"strict": true` enabled, providing compile-time type safety
- Path alias `@/*` mapped to `./src/*`

### Build Verification

- `npm run build` (Next.js production build) serves as a basic verification that all pages compile and metadata exports are valid
- Deployed to Vercel with automatic preview deployments on push

## Current Codebase Testability Assessment

### Components with testable interactive logic

| Component | Interactive behavior | File |
|---|---|---|
| `Navbar` | Scroll-based hide/show, mobile menu toggle, ESC to close | `src/components/layout/Navbar.tsx` |
| `HeroSection` | Auto-rotating word carousel (3s interval) | `src/components/sections/HeroSection.tsx` |
| `CarouselSection` | Horizontal scroll with left/right buttons | `src/components/sections/CarouselSection.tsx` |
| `TestimonialsSection` | Auto-rotating quotes (6s interval), dot navigation | `src/components/sections/TestimonialsSection.tsx` |
| `ScrollVideoSection` | Scroll-linked canvas frame animation | `src/components/sections/ScrollVideoSection.tsx` |
| `ContactForm` | Form submission with status states (idle/pending/success/error) | `src/components/ui/ContactForm.tsx` |
| `PersonVideoCard` | Click-to-play video, IntersectionObserver autoplay/pause | `src/components/ui/PersonVideoCard.tsx` |

### Server-side logic

| Module | Logic | File |
|---|---|---|
| Contact API | Input validation, Resend email, dev fallback | `src/app/api/contact/route.ts` |
| Sitemap | Static URL generation | `src/app/sitemap.ts` |
| Robots | Robots.txt rules | `src/app/robots.ts` |

### Static/presentational components (lower test priority)

- `Footer.tsx`, `SectionHeader.tsx`, `FeatureSection.tsx`, `BentoGridSection.tsx`, `WaterDividerSection.tsx`, `VideoBanner.tsx`, `ServiceCard.tsx`
- All service page routes (static content, no interactive logic)

---

*Testing analysis: 2026-04-01*
