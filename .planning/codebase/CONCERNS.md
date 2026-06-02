# Codebase Concerns

**Analysis Date:** 2026-04-01
**Codebase:** `src/` (Next.js 16 + React 19 + Tailwind v4 + Framer Motion)

---

## 1. Security

### 1.1 Contact API has no rate limiting or spam protection
- **Severity:** High
- **File:** `src/app/api/contact/route.ts`
- The POST endpoint accepts unlimited requests with no rate limiting, CAPTCHA, or honeypot field. Any bot can spam the endpoint and flood the Resend inbox. In dev mode (no `RESEND_API_KEY`), the endpoint silently succeeds and logs to console, masking the vulnerability.

### 1.2 Contact API is vulnerable to HTML injection in email body
- **Severity:** High
- **File:** `src/app/api/contact/route.ts` (lines 39-64)
- User-submitted fields (`name`, `email`, `phone`, `service`, `message`) are interpolated directly into the HTML email template with no sanitization. An attacker can inject arbitrary HTML/CSS into the outgoing email, enabling phishing attacks against the recipient (mail@wannado.no).

### 1.3 No email format validation on server side
- **Severity:** Medium
- **File:** `src/app/api/contact/route.ts` (lines 6-13)
- The API checks `!email` for presence but does not validate the email format. Malformed `replyTo` addresses will cause silent failures or Resend errors.

### 1.4 dangerouslySetInnerHTML used for JSON-LD (acceptable pattern)
- **Severity:** Low
- **Files:** `src/app/page.tsx`, `src/app/seilturer/page.tsx`, `src/app/teambuilding/page.tsx`, `src/app/foredrag/page.tsx`, `src/app/kajakkturer/page.tsx`
- Used exclusively for `JSON.stringify()` of schema objects. Data is hardcoded, not user-supplied. Low risk, but worth noting.

### 1.5 Google Maps iframe loads without consent mechanism
- **Severity:** Low
- **File:** `src/app/kontakt/page.tsx` (lines 167-174)
- The Google Maps embed loads on page visit with no cookie consent. Depending on GDPR interpretation, this may transmit user data to Google without prior consent.

---

## 2. Tech Debt

### 2.1 Three stub pages with raw WordPress text dumps
- **Severity:** High
- **Files:**
  - `src/app/booking/page.tsx` (55 lines of unstructured `<p>` tags, broken email addresses split across multiple elements, emoji characters)
  - `src/app/kurs/page.tsx` (26 lines, just a list of course names with no real content)
  - `src/app/samarbeidspartnere/page.tsx` (51 lines, placeholder text like `"Tekst her"`)
- These are publicly accessible pages with no metadata, no meaningful content, and damage SEO. The `/booking` page contains broken formatting where email addresses like `tp@wannado.no` are split across four separate `<p>` tags.

### 2.2 Three TODO comments for missing pricing data
- **Severity:** Medium
- **File:** `src/app/utleie/page.tsx` (lines 90, 104, 118)
- Comments: `{/* TODO: Sett inn faktisk pris nar tilgjengelig */}`. All three rental types (single kayak, double kayak, canoe) show "Ta kontakt" instead of actual prices.

### 2.3 Raw `<img>` tag in Navbar instead of next/image
- **Severity:** Medium
- **File:** `src/components/layout/Navbar.tsx` (lines 67-73)
- The logo uses a raw `<img>` element: `<img src="/images/wannado-logo.svg" alt="Wannado" .../>`. This bypasses Next.js image optimization. For SVGs this has minimal performance impact, but it violates the codebase convention of using `next/image` everywhere else.

### 2.4 Footer uses `<a>` tags instead of Next.js `<Link>` for internal navigation
- **Severity:** Low
- **File:** `src/components/layout/Footer.tsx` (lines 17-21, 53, 65)
- Internal links (`/opplevelser`, `/teambuilding`, `/kontakt`, `/personvern`) use raw `<a>` tags instead of `next/link`, causing full page reloads instead of client-side navigation.

### 2.5 Sitemap references non-existent route `/menneskene`
- **Severity:** Medium
- **File:** `src/app/sitemap.ts` (line 15)
- The sitemap includes `https://wannado.no/menneskene` which redirects to `/om-oss` via `next.config.ts`. Sitemap should list canonical URLs, not redirect sources.

### 2.6 BentoGrid items are not linked to any destination
- **Severity:** Low
- **File:** `src/components/sections/BentoGridSection.tsx`
- Grid items have `cursor-pointer` and hover effects but are not wrapped in links. Users see clickable-looking cards that do nothing when clicked.

---

## 3. Performance

### 3.1 111 MB of video files served from public directory
- **Severity:** High
- **Path:** `public/videos/`
- Six video clips (6-25 MB each), two interview videos (~12 MB each), and a hero video (25 MB). These are served as static assets with no CDN-level adaptive bitrate or format optimization. On slow connections, initial page load will be severely impacted.
- `public/videos/havsul-hero.mp4` is 25 MB and not referenced in code (the hero uses `havsul-clip-01-aerial-kystby.mp4` at 6 MB). Dead file.

### 3.2 Scroll video section loads 52 JPEG frames (11 MB total)
- **Severity:** High
- **File:** `src/components/sections/ScrollVideoSection.tsx`
- **Path:** `public/videos/havsul-frames/` (52 files, 11 MB)
- All 52 frames are loaded eagerly via `new Image()` in batches of 10. On mobile or slow networks this is ~11 MB of image downloads for a single section. No lazy loading, no WebP/AVIF format, no responsive sizing. The canvas-based rendering also bypasses Next.js image optimization.

### 3.3 Three autoplay videos on homepage consume bandwidth
- **Severity:** Medium
- **File:** `src/app/page.tsx` via `VideoBanner` component (`src/components/ui/VideoBanner.tsx`)
- Three `<VideoBanner>` instances on the homepage autoplay video clips (fyrtarn 12 MB, merdo-ankomst 17 MB, vanndetalj 5 MB). Combined with the hero video, the homepage potentially loads 40+ MB of video. No `preload="none"` attribute, no intersection observer to delay loading.

### 3.4 HeroSection detects mobile via JavaScript instead of CSS
- **Severity:** Low
- **File:** `src/components/sections/HeroSection.tsx` (lines 13-19)
- Uses `window.matchMedia("(max-width: 767px)")` in useEffect to conditionally render video vs image. This means desktop content flashes briefly on mobile (or vice versa) before the effect runs. A CSS-based approach (`<picture>` or media queries) would avoid the layout shift.

### 3.5 Framer Motion is heavily used across the entire codebase
- **Severity:** Low
- **Files:** 10 components import from `framer-motion`
- Every section component uses Framer Motion for entrance animations (`whileInView`), the navbar uses scroll-based animations, and the testimonials use `AnimatePresence`. The library adds ~30 KB to the client bundle. Currently acceptable, but any additional animation libraries would push bundle size.

---

## 4. Missing Critical Features

### 4.1 No error.tsx, not-found.tsx, loading.tsx, or global-error.tsx
- **Severity:** High
- **Path:** `src/app/`
- Zero error boundary files exist anywhere in the application. If any page throws a runtime error, users see the default Next.js error page with no branding. Missing `not-found.tsx` means 404 responses show the default Next.js 404 page. No `loading.tsx` means no skeleton/loading UI during route transitions.

### 4.2 No Suspense boundaries except on ContactForm
- **Severity:** Medium
- **File:** `src/app/kontakt/page.tsx` (lines 76-82)
- Only one Suspense boundary exists in the entire app, wrapping `ContactForm` (which uses `useSearchParams`). No other pages have loading states or streaming SSR boundaries.

### 4.3 No blog / content section exists
- **Severity:** High
- Per `CLAUDE.md`: "Blogg for SEO er pakrevd." No blog routes, no CMS integration (Sanity is configured in `next.config.ts` for remote images but not used), no content management system. This is a critical gap for the stated SEO strategy.

### 4.4 No hesteridning (horse riding) page
- **Severity:** Medium
- Per `CLAUDE.md`, horse riding is one of the six core services. It is mentioned in text on `/om-oss`, `/kontakt`, and `FeatureSection`, but has no dedicated page. The `/kurs` page mentions "Hestekurs" as a stub line.

### 4.5 No booking integration
- **Severity:** High
- Per `CLAUDE.md`: "Booking-funksjonalitet er kritisk." The `/booking` page is a raw WordPress text dump. All "Bestill" buttons throughout the site link to the contact form. There is no actual booking/reservation system, calendar, or payment flow.

---

## 5. Accessibility

### 5.1 Zero ARIA attributes on page-level components
- **Severity:** High
- **Files:** All page components in `src/app/`
- No `role`, `aria-label`, `aria-live`, or `aria-describedby` attributes on any main content areas, sections, or interactive elements at the page level. The only ARIA usage is:
  - `aria-label` on Navbar hamburger button
  - `aria-label` on carousel prev/next buttons
  - `aria-label` on Footer social links
  - `aria-label` on PersonVideoCard play button
  - `aria-label` on testimonial dots (English text: "Show quote X" on a Norwegian site)

### 5.2 Testimonial dots have English ARIA labels on Norwegian site
- **Severity:** Low
- **File:** `src/components/sections/TestimonialsSection.tsx` (line 119)
- `aria-label={`Show quote ${i + 1}`}` should be Norwegian, e.g. "Vis sitat X".

### 5.3 Carousel has no keyboard navigation
- **Severity:** Medium
- **File:** `src/components/sections/CarouselSection.tsx`
- The horizontal scroll carousel only supports mouse/touch scrolling and button clicks. No keyboard navigation (arrow keys) is implemented. Button labels are in English ("Previous", "Next").

### 5.4 Mobile menu does not trap focus
- **Severity:** Medium
- **File:** `src/components/layout/Navbar.tsx`
- The mobile drawer handles ESC key and locks body scroll, but does not implement focus trapping. Tab key can reach elements behind the drawer overlay.

### 5.5 Auto-rotating testimonials with no pause control
- **Severity:** Medium
- **File:** `src/components/sections/TestimonialsSection.tsx` (lines 36-40)
- The testimonial carousel auto-rotates every 6 seconds with no pause button. WCAG 2.2.2 requires a mechanism to pause, stop, or hide auto-updating content. Clicking a dot does not stop the interval.

---

## 6. Hydration Risks

### 6.1 Footer renders dynamic date in server component
- **Severity:** Medium
- **File:** `src/components/layout/Footer.tsx` (line 62)
- `{new Date().getFullYear()}` renders during build/SSR. If the build happens on December 31 and the page is served on January 1, the year will be stale until rebuild. Not a hydration mismatch risk per se (it is a server component), but the year could be wrong for statically generated pages.

---

## 7. Fragile Areas

### 7.1 Large single-file pages with no component extraction
- **Severity:** Medium
- **Files:**
  - `src/app/seilturer/page.tsx` (591 lines)
  - `src/app/kajakkturer/page.tsx` (513 lines)
  - `src/app/teambuilding/page.tsx` (389 lines)
  - `src/app/om-oss/page.tsx` (383 lines)
- These pages contain all content, layout, and styling inline. No extraction into section components. Modifying one section requires careful editing of a long file. The seilturer page has 100+ lines of inline SVG icons.

### 7.2 Inline SVG icons duplicated across pages
- **Severity:** Low
- **Files:** `src/app/seilturer/page.tsx`, `src/app/utleie/page.tsx`, `src/app/teambuilding/page.tsx`
- Check mark, location pin, clock, phone, and group icons are copy-pasted as full inline SVGs across multiple pages. These should be extracted to shared icon components or use the existing `lucide-react` dependency.

### 7.3 Hardcoded content with no CMS
- **Severity:** Medium
- **Files:** All page files, `src/components/sections/CarouselSection.tsx`, `src/components/sections/PeopleSection.tsx`, `src/components/sections/TestimonialsSection.tsx`
- All prices, descriptions, testimonials, team bios, and contact info are hardcoded in TSX files. Any content change requires a code deployment. The `next.config.ts` configures Sanity CDN as a remote image source, but no Sanity integration exists.

---

## 8. Dependencies

### 8.1 Resend email service has no domain verification
- **Severity:** Medium
- **File:** `src/app/api/contact/route.ts` (line 35)
- Emails are sent from `onboarding@resend.dev` (Resend's default sandbox domain). This means emails likely land in spam. A verified custom domain (e.g., `noreply@wannado.no`) is required for production.

### 8.2 Dependency versions are loose (caret ranges)
- **Severity:** Low
- **File:** `package.json`
- All dependencies use `^` ranges. No lockfile issues observed, but `framer-motion` v12 and `next` v16 are both recent major versions that may receive breaking minor updates.

---

## 9. Test Coverage

### 9.1 Zero test files exist
- **Severity:** High
- No test files, no test configuration, no test dependencies (`jest`, `vitest`, `playwright`, `testing-library`). No `__tests__` directories. No CI pipeline for testing. The contact form submission, API route, and all interactive components (carousel, testimonials, scroll video, mobile nav) are completely untested.

---

## Summary Table

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 0 | 2 | 1 | 2 |
| Tech Debt | 0 | 1 | 2 | 3 |
| Performance | 0 | 2 | 1 | 2 |
| Missing Features | 0 | 3 | 1 | 0 |
| Accessibility | 0 | 1 | 3 | 1 |
| Hydration | 0 | 0 | 1 | 0 |
| Fragile Areas | 0 | 0 | 2 | 1 |
| Dependencies | 0 | 0 | 1 | 1 |
| Testing | 0 | 1 | 0 | 0 |
| **Total** | **0** | **10** | **12** | **10** |
