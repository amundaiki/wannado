# Testing Patterns

**Analysis Date:** 2026-03-31

## Test Framework

**Runner:**
- Not configured. No test framework is installed or set up.
- No `jest.config.*`, `vitest.config.*`, `cypress.config.*`, or `playwright.config.*` files exist.
- No test-related dependencies in `web/package.json` (no jest, vitest, testing-library, cypress, playwright).

**Assertion Library:**
- None installed.

**Run Commands:**
```bash
# No test commands exist in package.json scripts
# Only available scripts: dev, build, start, lint
```

## Test File Organization

**Location:**
- No test files exist in the project source. Zero `.test.*` or `.spec.*` files outside `node_modules/`.

**Naming:**
- No convention established yet.

**Structure:**
- No test directory structure exists.

## Test Structure

**Suite Organization:**
- Not established. No examples to draw from.

**Recommended setup when adding tests:**

Given this is a Next.js 16 project with React 19, the recommended test stack:

```bash
# Install test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

**Suggested `vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

**Suggested `src/test/setup.ts`:**
```typescript
import '@testing-library/jest-dom'
```

**Suggested package.json scripts:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Mocking

**Framework:** Not established.

**Patterns:**
- No mocking patterns exist yet.

**What to mock (when tests are added):**
- `framer-motion` - mock `motion` components to render as plain HTML elements, since animations are not testable in jsdom
- `next/font/google` - mock font loading
- `next/link` - may need mocking depending on test environment
- `lucide-react` - icons can be mocked as simple SVG stubs

**Suggested framer-motion mock (`src/test/__mocks__/framer-motion.ts`):**
```typescript
export const motion = new Proxy({}, {
  get: (_target, prop) => {
    // Return a forwardRef component for any motion.element
    return ({ children, ...props }: any) => {
      const Component = prop as string
      return <Component {...props}>{children}</Component>
    }
  },
})

export const AnimatePresence = ({ children }: any) => children
export const useScroll = () => ({ scrollY: { getPrevious: () => 0 } })
export const useMotionValueEvent = () => {}
```

## Fixtures and Factories

**Test Data:**
- No fixtures or factories exist.
- Static data that would serve as fixture sources exists co-located with components:
  - `CAROUSEL_DATA` in `web/src/components/sections/CarouselSection.tsx`
  - `BENTO_DATA` in `web/src/components/sections/BentoGridSection.tsx`
  - `PEOPLE` in `web/src/components/sections/PeopleSection.tsx`
  - `QUOTES` and `MARQUEE_ITEMS` in `web/src/components/sections/TestimonialsSection.tsx`

**Location:**
- Suggest `web/src/test/fixtures/` for shared test data when tests are introduced.

## Coverage

**Requirements:** None enforced. No coverage thresholds configured.

**View Coverage:**
```bash
# Not available yet. When vitest is set up:
npx vitest run --coverage
```

## Test Types

**Unit Tests:**
- Not implemented. Priority areas when adding:
  1. Component rendering (do sections render without crashing)
  2. Interactive behavior in `Navbar.tsx` (scroll state changes)
  3. Carousel scroll behavior in `CarouselSection.tsx`
  4. Testimonial rotation in `TestimonialsSection.tsx`
  5. Hero word cycling in `HeroSection.tsx`

**Integration Tests:**
- Not implemented. Would be useful for:
  1. Full page rendering (homepage composing all sections)
  2. Navigation between routes

**E2E Tests:**
- Not configured. Playwright or Cypress would be appropriate for:
  1. Visual regression of homepage
  2. Mobile responsive behavior
  3. Scroll-based navbar hide/show
  4. Carousel interaction

## Common Patterns

**Async Testing:**
- Not applicable yet. No async data fetching exists (all data is hardcoded).

**Error Testing:**
- Not applicable yet. No error boundaries or error handling logic exists.

## Current State Summary

The codebase has **zero test coverage**. There are no test files, no test framework, no test dependencies, and no test scripts. This is a significant gap, particularly given that:

1. Multiple components have interactive state logic (scroll detection, carousel, rotating testimonials, word cycling)
2. The `"use client"` directive is used on all section components, meaning client-side JavaScript is critical to the user experience
3. No error boundaries exist to catch runtime failures

**Priority for test setup:**
1. Install Vitest + Testing Library
2. Add smoke tests for each page route (renders without error)
3. Add interaction tests for `Navbar`, `CarouselSection`, `HeroSection`, `TestimonialsSection`
4. Add E2E tests for critical user journeys (homepage load, navigation, booking flow)

---

*Testing analysis: 2026-03-31*
