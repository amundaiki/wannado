# Codebase Concerns

**Analysis Date:** 2026-03-31

## Tech Debt

**All content pages are raw WordPress text dumps:**
- Issue: 12 of 13 sub-pages (`/booking`, `/teambuilding`, `/opplevelser`, `/kontakt`, `/foredrag`, `/utleie`, `/kurs`, `/menneskene`, `/referanser`, `/samarbeidspartnere`, `/personvern`, `/praktisk-informasjon`, `/kulturvandring-med-sjarmerende-treskoyte`) contain unstructured text scraped from the old WordPress site, rendered as consecutive `<p>` tags with no headings, lists, links, images, or semantic HTML.
- Files:
  - `web/src/app/booking/page.tsx`
  - `web/src/app/teambuilding/page.tsx`
  - `web/src/app/opplevelser/page.tsx`
  - `web/src/app/kontakt/page.tsx`
  - `web/src/app/foredrag/page.tsx`
  - `web/src/app/utleie/page.tsx`
  - `web/src/app/kurs/page.tsx`
  - `web/src/app/menneskene/page.tsx`
  - `web/src/app/referanser/page.tsx`
  - `web/src/app/samarbeidspartnere/page.tsx`
  - `web/src/app/personvern/page.tsx`
  - `web/src/app/praktisk-informasjon/page.tsx`
  - `web/src/app/kulturvandring-med-sjarmerende-treskoyte/page.tsx`
- Impact: Unusable for end users. No semantic structure means terrible SEO. No booking forms, no CTAs, no images. The text is sometimes fragmented mid-sentence (e.g., email address split across 4 `<p>` tags in `booking/page.tsx` lines 31-34). Placeholder content like `"Tekst her"` in `samarbeidspartnere/page.tsx` lines 14, 16, 18.
- Fix approach: Rewrite every sub-page with proper semantic HTML, headings, images, CTAs, and structured content. Consider a CMS (Sanity, Contentful) or at minimum extract content into structured data files.

**All images use native `<img>` instead of `next/image`:**
- Issue: Every image in the codebase uses raw `<img>` tags with ESLint rule `@next/next/no-img-element` explicitly disabled via inline comments. This bypasses Next.js image optimization (WebP/AVIF conversion, lazy loading, responsive srcset, blur placeholder).
- Files:
  - `web/src/components/sections/HeroSection.tsx` (line 22)
  - `web/src/components/sections/CarouselSection.tsx` (line 98)
  - `web/src/components/sections/BentoGridSection.tsx` (lines 52, 80, 109)
  - `web/src/components/sections/FeatureSection.tsx` (lines 19, 26)
  - `web/src/components/sections/PeopleSection.tsx` (line 45)
- Impact: Large unoptimized images served to all devices. The hero image `baat-fb.jpg` is 620KB as a JPEG, likely 2-3x larger than needed. Degrades Core Web Vitals (LCP), wastes bandwidth on mobile, and hurts SEO ranking.
- Fix approach: Replace all `<img>` with `next/image`. Set `priority` on the hero image. Add `sizes` attributes. Consider converting images to WebP/AVIF at build time.

**Every homepage section is a client component:**
- Issue: All 7 section components on the homepage have `"use client"` directives, making the entire page a client-side rendered application. Most of these components use Framer Motion for entrance animations, but the content itself is static.
- Files:
  - `web/src/components/sections/HeroSection.tsx`
  - `web/src/components/sections/CarouselSection.tsx`
  - `web/src/components/sections/BentoGridSection.tsx`
  - `web/src/components/sections/FeatureSection.tsx`
  - `web/src/components/sections/PeopleSection.tsx`
  - `web/src/components/sections/TestimonialsSection.tsx`
  - `web/src/components/layout/Navbar.tsx`
- Impact: No server-side rendering benefit for content. Larger JavaScript bundle shipped to client. Search engines may not index content reliably. Contradicts Next.js RSC architecture.
- Fix approach: Extract static content into Server Components. Create thin client wrapper components only for the animation logic. Use CSS animations or `motion` components with server-rendered children where possible.

**Footer uses `<a>` tags instead of Next.js `<Link>`:**
- Issue: All navigation links in the Footer use raw `<a href="...">` instead of `next/link`, causing full page reloads on every click.
- Files: `web/src/components/layout/Footer.tsx` (lines 17-20, 56, 68-69)
- Impact: Slower navigation, no client-side routing benefit, poor UX.
- Fix approach: Replace `<a href>` with `<Link href>` for all internal navigation links.

**No shared page layout or template:**
- Issue: Every sub-page manually imports and renders `<Navbar />` and `<Footer />`, and duplicates the same wrapper `<main>` element with identical className. There is no shared layout beyond `layout.tsx`.
- Files: All 13 page files under `web/src/app/*/page.tsx`
- Impact: Navbar and Footer re-render on every navigation. Layout changes must be applied to 13+ files. Violates DRY.
- Fix approach: Move `<Navbar />` and `<Footer />` into `web/src/app/layout.tsx`. Create a route group layout for sub-pages with the standard hero header pattern.

**All content is hardcoded in components:**
- Issue: Product data (carousel items, bento grid, testimonials, people) is hardcoded as const arrays inside component files. No CMS, no data files, no API calls.
- Files:
  - `web/src/components/sections/CarouselSection.tsx` (CAROUSEL_DATA, lines 7-36)
  - `web/src/components/sections/BentoGridSection.tsx` (BENTO_DATA, lines 5-36)
  - `web/src/components/sections/TestimonialsSection.tsx` (QUOTES, MARQUEE_ITEMS, lines 6-28)
  - `web/src/components/sections/PeopleSection.tsx` (PEOPLE, lines 5-20)
- Impact: Content changes require code deployments. Not scalable for the client who needs to update pricing, add new experiences, etc.
- Fix approach: Extract to data files at minimum. Evaluate CMS integration (Sanity, Contentful, or headless WordPress) for client self-service.

## Known Bugs

**Booking page has fragmented email addresses:**
- Symptoms: The email address `tp@wannado.no` is split across 4 separate `<p>` tags: "tp", "@wannado", ".no" on lines 31-33 of the booking page. Same for `roar@wannado.no`. This was likely a scraping artifact from the WordPress site.
- Files: `web/src/app/booking/page.tsx` (lines 30-34, 38-40)
- Trigger: Simply visiting `/booking`
- Workaround: None. The email addresses are unreadable and unclickable.

**Samarbeidspartnere page has placeholder text:**
- Symptoms: The page shows literal placeholder text "Tekst her" repeated 3 times.
- Files: `web/src/app/samarbeidspartnere/page.tsx` (lines 14, 16, 18)
- Trigger: Visiting `/samarbeidspartnere`
- Workaround: None.

**Spelling error in praktisk-informasjon page:**
- Symptoms: Text reads "skalder" instead of "skader" (injuries) on line 19.
- Files: `web/src/app/praktisk-informasjon/page.tsx` (line 19)
- Trigger: Visiting `/praktisk-informasjon`
- Workaround: None.

**Spelling error in samarbeidspartnere page:**
- Symptoms: "Gjveving" instead of "Gjeving" on line 17.
- Files: `web/src/app/samarbeidspartnere/page.tsx` (line 17)
- Trigger: Visiting `/samarbeidspartnere`
- Workaround: None.

**Kulturvandring page has raw slug as heading:**
- Symptoms: The h1 tag renders `"Kulturvandring-med-sjarmerende-treskoyte"` with hyphens instead of spaces and missing special character ø (should be "skøyte").
- Files: `web/src/app/kulturvandring-med-sjarmerende-treskoyte/page.tsx` (line 9)
- Trigger: Visiting the kulturvandring page
- Workaround: None.

**Praktisk-informasjon page has raw slug as heading:**
- Symptoms: The h1 tag renders `"Praktisk-informasjon"` with a hyphen.
- Files: `web/src/app/praktisk-informasjon/page.tsx` (line 9)
- Trigger: Visiting the page
- Workaround: None.

## Security Considerations

**No Content Security Policy:**
- Risk: The site has no CSP headers configured. XSS attacks could inject scripts.
- Files: `web/next.config.ts` (empty config)
- Current mitigation: None.
- Recommendations: Add security headers (CSP, X-Frame-Options, X-Content-Type-Options) via `next.config.ts` headers configuration or middleware.

**Personvern page references tracking that does not exist:**
- Risk: The privacy policy at `/personvern` mentions "Google og Facebook" tracking codes, but the new site has no analytics, tracking pixels, or cookie consent mechanism implemented.
- Files: `web/src/app/personvern/page.tsx`
- Current mitigation: None. The privacy policy is outdated/inaccurate.
- Recommendations: Either implement the tracking (with proper cookie consent per Norwegian GDPR/ekom regulations) or rewrite the privacy policy to match reality. A cookie consent banner is legally required before setting tracking cookies.

**No GDPR cookie consent mechanism:**
- Risk: If any analytics or tracking is added, Norwegian law (ekomloven / personopplysningsloven) requires explicit consent before placing non-essential cookies.
- Files: Not applicable (nothing implemented yet)
- Current mitigation: None.
- Recommendations: Plan for a cookie consent solution before adding any analytics.

## Performance Bottlenecks

**Unoptimized hero image (620KB):**
- Problem: The hero section loads `baat-fb.jpg` (620KB) as a raw `<img>` tag with no lazy loading, no srcset, no format optimization.
- Files: `web/src/components/sections/HeroSection.tsx` (line 23)
- Cause: Using `<img>` instead of `next/image`. No image optimization pipeline.
- Improvement path: Switch to `next/image` with `priority`, `fill`, and `sizes`. Convert source images to modern formats. Consider responsive breakpoints.

**Framer Motion bundle on every page:**
- Problem: 6 components import `framer-motion`, which adds roughly 30-50KB gzipped to the client bundle. It is loaded on the homepage for entrance animations that play once.
- Files: All section components + `web/src/components/layout/Navbar.tsx`
- Cause: Every section component is `"use client"` and imports framer-motion.
- Improvement path: Evaluate whether CSS animations (`@keyframes` + `IntersectionObserver`) could replace simple fade-in/slide-up animations. Reserve framer-motion for the carousel and marquee where JavaScript control is needed.

**No font subsetting for Norwegian characters:**
- Problem: Google Fonts are loaded with `subsets: ["latin"]` only. Norwegian characters (aeoeaa) are in the Latin subset, but the extended subset may be needed for all glyphs used in content.
- Files: `web/src/app/layout.tsx` (lines 5-21)
- Cause: Default configuration.
- Improvement path: Verify that all Norwegian characters render correctly. Add `"latin-ext"` subset if needed.

## Fragile Areas

**Homepage composition in page.tsx:**
- Files: `web/src/app/page.tsx`
- Why fragile: The homepage is a flat list of 7 section components with no error boundaries. If any section throws, the entire page breaks.
- Safe modification: Add error boundaries around each section. Test each section independently.
- Test coverage: Zero tests exist.

**CSS custom property chain:**
- Files: `web/src/app/globals.css`
- Why fragile: Tailwind theme colors are mapped via a double indirection: `:root` CSS variables -> `@theme` CSS variables -> Tailwind utility classes. If a `:root` variable name changes, the `@theme` mapping breaks silently with no build error.
- Safe modification: Always update both `:root` and `@theme` blocks together. Consider using Tailwind v4's direct theme configuration instead of the indirection.
- Test coverage: None. Visual regression testing would catch this.

## Scaling Limits

**No CMS or data layer:**
- Current capacity: Content supports exactly what is hardcoded. Adding a new experience or changing a price requires a developer.
- Limit: The client cannot self-manage any content.
- Scaling path: Integrate a headless CMS. Sanity or Contentful are good options for this scale. Alternatively, markdown files with frontmatter could work as a simpler approach.

**No booking system:**
- Current capacity: Zero online bookings. The "Bestill tur" button links to `/kontakt` which shows only a postal address.
- Limit: All bookings must happen via phone/email. Major friction for customers.
- Scaling path: Investigate the existing WordPress booking system mentioned in CLAUDE.md. Integrate a booking solution (Cal.com, Bookingkit, or custom forms with email notifications).

## Dependencies at Risk

**Next.js 16.2.1 (pre-release / bleeding edge):**
- Risk: Next.js 16 is very recent (2026). APIs may be unstable or change between minor versions. The project's own `AGENTS.md` warns about breaking changes.
- Impact: Build failures or runtime errors after updates. Community resources and Stack Overflow answers may not cover v16 issues.
- Migration plan: Pin the exact version. Follow Next.js release notes carefully. Consider downgrading to the latest stable 15.x if stability is needed.

**framer-motion ^12.38.0:**
- Risk: Major version 12 is recent. The caret range allows auto-updating to 12.x patches which occasionally introduce breaking changes in framer-motion's history.
- Impact: Animations could break after `npm install` on a different machine/CI.
- Migration plan: Pin exact version in package.json or use a lockfile consistently.

## Missing Critical Features

**No mobile navigation:**
- Problem: The navbar links (`<ul className="hidden md:flex ...">` in `web/src/components/layout/Navbar.tsx` line 54) are hidden on mobile with no hamburger menu or mobile navigation drawer.
- Blocks: Mobile users can only see the "Bestill tur" button. Cannot navigate to any sub-page from mobile.

**No SEO metadata on sub-pages:**
- Problem: Only the root layout has metadata (`web/src/app/layout.tsx` line 23). No sub-page exports its own `metadata` or `generateMetadata`. Every page shows the same title "Wannado - Hva er din lek?" and the same description.
- Blocks: Impossible to rank for page-specific keywords. Critical blocker given the project goal of top-3 SEO ranking.

**No sitemap.xml or robots.txt:**
- Problem: No `sitemap.ts`, `robots.ts` in `web/src/app/`, no static files in `web/public/`.
- Blocks: Search engines cannot discover pages efficiently. Essential for SEO.

**No favicon:**
- Problem: No `favicon.ico` in `web/public/`, no `icon.tsx` or `apple-icon.tsx` in `web/src/app/`.
- Blocks: Professional appearance in browser tabs and bookmarks.

**No error.tsx or not-found.tsx:**
- Problem: No error boundary pages or custom 404 page exist anywhere in the app.
- Blocks: Users who hit a bad URL see the default Next.js 404 page. No brand consistency.

**No structured data / schema markup:**
- Problem: No JSON-LD or schema.org markup for local business, events, or services.
- Blocks: Rich snippets in Google. Critical for SEO goals described in CLAUDE.md.

**No contact form:**
- Problem: The `/kontakt` page shows only a postal address. No form, no email links, no phone numbers on that page.
- Blocks: Customer inquiries.

**Placeholder social media links:**
- Problem: Instagram, Facebook, and LinkedIn links in the Footer all point to `href="#"`.
- Files: `web/src/components/layout/Footer.tsx` (lines 45, 48, 51)
- Blocks: Social proof and social media traffic.

**Personvern and Vilkaar footer links are dead:**
- Problem: Footer "Personvern" and "Vilkaar" links point to `href="#"` instead of `/personvern` and a terms page.
- Files: `web/src/components/layout/Footer.tsx` (lines 68-69)
- Blocks: Legal compliance.

## Test Coverage Gaps

**No tests exist:**
- What's not tested: Everything. Zero test files, no test framework configured, no test runner in package.json scripts.
- Files: Entire `web/src/` directory
- Risk: Any refactoring (such as migrating from `<img>` to `next/image`, restructuring layouts, or adding a CMS) has no safety net. Regressions will go unnoticed until manual review.
- Priority: Medium. The codebase is small enough to manually verify, but tests should be added before any major restructuring.

---

*Concerns audit: 2026-03-31*
