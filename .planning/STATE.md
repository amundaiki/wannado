# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Konvertere turister og bedrifter til å booke Wannado-opplevelser
**Current focus:** Fase 5 - SEO og teknisk grunnlag

## Current Phase: 5 - SEO og infrastruktur

**Goal:** Legge til sitemap, robots.txt, JSON-LD og redirects

## Completed Phases

### Fase 1: Mappestruktur
- ✓ Next.js 16 app flyttet fra web/ til root
- ✓ npm install kjørt, next build OK (21 routes)

### Fase 2: Innhentning
- ✓ 10 sider scraped fra wannado.no til content/scraped/
- ✓ 131 bilder lastet ned til public/images/scraped/
- ✓ SVG-logo lastet ned til public/images/wannado-logo.svg
- ✓ Havsul-bilde til public/images/havsul.jpg

### Fase 4: Sidebygging
- ✓ Navbar: ekte SVG-logo, 5 nav-lenker
- ✓ UI: ServiceCard, SectionHeader, ContactForm komponenter
- ✓ /seilturer: hero, priser, feature-cards, CTA
- ✓ /kajakkturer: kursoversikt, guide-profil, CTA
- ✓ /opplevelser: 4 kategorikort, kontakt CTA
- ✓ /teambuilding: 6 produktkort, JTI-seksjon, referanser
- ✓ /foredrag: JTI + Grønlandsekspedisjon
- ✓ /kontakt: skjema + kontaktinfo
- ✓ /api/contact: Route Handler

## Next Steps

### Fase 5 (pågår): SEO
- Sitemap.ts
- Robots.ts
- JSON-LD LocalBusiness
- Redirects fra gamle URLer

### Fase 6 (neste): CMS og polering
1. Brukeren kjører: `npx sanity@latest init` i rotmappen
2. Blogg (/blog og /blog/[slug])
3. Resend e-postintegrasjon for kontaktskjema
4. Bilder fra scraped/ integrert på sider
5. Vercel deploy
