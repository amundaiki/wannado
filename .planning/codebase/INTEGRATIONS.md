# External Integrations

**Analysis Date:** 2026-04-01

## APIs & External Services

### Resend (Email)

- **SDK:** `resend` ^6.10.0
- **Used in:** `src/app/api/contact/route.ts`
- **Purpose:** Sends contact form submissions as HTML emails to `mail@wannado.no`
- **Sender:** `Wannado Kontaktskjema <onboarding@resend.dev>` (using Resend's shared domain)
- **Env var:** `RESEND_API_KEY` (required in production; gracefully falls back to console.log when missing)
- **Fields:** name, email, phone (optional), service, message

### Vercel Analytics

- **SDK:** `@vercel/analytics` ^2.0.1
- **Used in:** `src/app/layout.tsx` (renders `<Analytics />` component)
- **Purpose:** Cookieless, privacy-friendly web analytics
- **Configuration:** Zero-config; no env vars needed when deployed on Vercel

### Google Maps (Embed)

- **Used in:** `src/app/kontakt/page.tsx`
- **Method:** Standard `<iframe>` embed (no API key required)
- **URL:** `https://www.google.com/maps?q=Skarestrand+11,+4812+Kongshavn,+Norway&output=embed`
- **Purpose:** Shows business location on contact page

## Data Storage

**Databases:**
- None. No database, ORM, or data layer.

**File Storage:**
- Local filesystem only. Static images/videos served from `public/`.

**Content Data:**
- `src/lib/data/references.ts` - Company references list, testimonials, and TV appearances (typed `as const` exports)
- All other page content is hardcoded in `.tsx` files

**Caching:**
- Vercel edge caching (default Next.js behavior)
- Custom cache headers in `vercel.json`: images get 1-year immutable cache

## Content Management

**CMS:**
- None currently integrated
- `next.config.ts` has `cdn.sanity.io` configured in `images.remotePatterns`, indicating Sanity CMS integration is planned

## Authentication & Identity

- None. No auth system, no user accounts.

## Monitoring & Observability

**Analytics:**
- Vercel Analytics (cookieless, integrated via `@vercel/analytics`)

**Error Tracking:**
- None. No Sentry, LogRocket, or similar.

**Logging:**
- Standard Next.js console output only

## CI/CD & Deployment

**Hosting:**
- Vercel (linked project: `prj_sYmyCkpwjlMg0qGkjgBsQ0QUluxS`, team: `team_Rfl5K62mG3EFZ3WN6Ba3QcFT`)
- Project name on Vercel: `wannado`
- Domain: wannado.no

**CI Pipeline:**
- No `.github/workflows/` or external CI
- Vercel handles build + deploy on git push (default behavior)

**Security Headers (`vercel.json`):**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

## SEO Infrastructure

**Implemented:**
- Dynamic `robots.ts` (`src/app/robots.ts`) - allows all except `/api/` and `/studio/`
- Dynamic `sitemap.ts` (`src/app/sitemap.ts`) - 12 URLs with priorities and change frequencies
- Per-page `metadata` exports on 12 pages (generateMetadata not used; static exports)
- Root metadata in `src/app/layout.tsx`: title template, OpenGraph, Twitter cards
- OpenGraph image: `/images/baat-fb.jpg`
- HTML lang: `nb` (Norwegian Bokmal)
- 4 permanent redirects from old WordPress URLs in `next.config.ts`

**Not implemented:**
- No structured data / JSON-LD schema markup
- No `generateMetadata` (all metadata is static per-page exports)

## Environment Configuration

**Required env vars:**

| Variable | Service | Required | Fallback |
|---|---|---|---|
| `RESEND_API_KEY` | Resend email | Production only | Console.log in dev |

**Env files:**
- `.env` - exists (gitignored)
- `.env.local.example` - template with `RESEND_API_KEY` placeholder

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/contact` | POST | Contact form handler; sends email via Resend |

## Webhooks & Callbacks

- None (incoming or outgoing)

## Social Media

**Linked in Footer (`src/components/layout/Footer.tsx`):**
- Instagram, Facebook, LinkedIn links (check if still `#` placeholders or real URLs)

## Booking & Payments

- None integrated
- Booking page exists (`src/app/booking/page.tsx`) but contains static content only
- No payment processing (Stripe, Vipps, etc.)

## Planned / Needed Integrations

Based on project requirements:

1. **Sanity CMS** - `cdn.sanity.io` already configured in `next.config.ts`; integration not yet built
2. **Booking system** - Critical business requirement; not yet started
3. **Blog platform** - Required for SEO strategy; depends on CMS integration
4. **Structured data** - JSON-LD schema markup for local business, events, reviews

---

*Integration audit: 2026-04-01*
