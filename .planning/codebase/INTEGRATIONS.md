# External Integrations

**Analysis Date:** 2026-03-31

## APIs & External Services

**None currently integrated.**

The codebase has zero external API calls, SDK imports, or third-party service integrations. All content is hardcoded in component files. This is an early-stage project with static content only.

## Data Storage

**Databases:**
- None. No database, ORM, or data layer exists.

**File Storage:**
- Local filesystem only. Static images served from `web/public/images/`.

**Caching:**
- None configured. No Redis, Memcached, or Next.js cache configuration.

## Content Management

**CMS:**
- None. All page content is hardcoded directly in `.tsx` files.
- Subpage content appears to be migrated from the old WordPress site as plain text strings in JSX (`{` backtick strings `}`).
- No headless CMS, Sanity, Contentful, or similar integration exists.

## Authentication & Identity

**Auth Provider:**
- None. No authentication system exists.
- No user accounts, login, or session management.

## Monitoring & Observability

**Error Tracking:**
- None. No Sentry, LogRocket, or similar service.

**Analytics:**
- None currently implemented in the new site.
- The old WordPress site used Google Analytics and Facebook Pixel (mentioned in `web/src/app/personvern/page.tsx` privacy policy text).

**Logs:**
- None configured. Standard Next.js console output only.

## CI/CD & Deployment

**Hosting:**
- Not yet configured for the new site
- Old site runs on Apache with Varnish-cache at wannado.no
- No `vercel.json` or deployment configuration files present

**CI Pipeline:**
- None. No `.github/workflows/`, no CI configuration of any kind.

## Email & Communication

**Contact Methods (hardcoded, not integrated):**
- `mailto:` links to `mail@wannado.no`, `tp@wannado.no`, `roar@wannado.no`
- `tel:` links to phone numbers
- No contact form, no email service (SendGrid, Resend, etc.)

## Social Media

**Linked (placeholder only):**
- Instagram, Facebook, LinkedIn links in `web/src/components/layout/Footer.tsx` - all point to `#` (not connected)
- No social media API integrations
- No Open Graph or social sharing metadata beyond basic `<title>` and `<meta description>`

## Booking & Payments

**Booking System:**
- None integrated. The booking page (`web/src/app/booking/page.tsx`) contains only static text.
- The old WordPress site had booking forms; these have not been ported.
- No payment processing (Stripe, Vipps, etc.)
- CLAUDE.md notes: "Booking-integrasjon: finn eksisterende booking-API på nåværende side før ny løsning velges."

## SEO & Search

**SEO Tools:**
- `squirrel.toml` at project root configures an SEO crawler/auditor (Squirrel)
- Basic metadata set in `web/src/app/layout.tsx` via Next.js `Metadata` export
- No `sitemap.xml` generation
- No `robots.txt`
- No structured data / JSON-LD schema markup
- No `generateMetadata` on individual pages

## Webhooks & Callbacks

**Incoming:**
- None. No API routes exist (`web/src/app/api/` directory does not exist).

**Outgoing:**
- None.

## Environment Configuration

**Required env vars:**
- None. The application has zero environment variable dependencies.

**Secrets location:**
- No secrets exist in the codebase. No `.env` files present.

## Planned / Needed Integrations

Based on CLAUDE.md project requirements, these integrations will be needed:

1. **Booking system** - Critical requirement. Must investigate old site's booking API before choosing solution.
2. **Analytics** - Google Analytics / similar (old site had GA + Facebook Pixel)
3. **CMS or content layer** - Current hardcoded content is not sustainable for a business site with frequent updates
4. **Contact forms** - Currently just mailto links; needs proper form handling
5. **Social media links** - Footer has placeholder `#` links
6. **SEO infrastructure** - sitemap.xml, robots.txt, structured data, per-page metadata
7. **Image optimization** - Currently using raw `<img>` tags instead of `next/image`
8. **Blog/content platform** - Required per CLAUDE.md for SEO strategy

---

*Integration audit: 2026-03-31*
