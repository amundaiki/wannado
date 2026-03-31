# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Konvertere turister og bedrifter til å booke Wannado-opplevelser
**Current focus:** Klar for fase 6 (Forside) eller valgfri fase

## Completed Phases

| # | Phase | Hva ble gjort |
|---|-------|--------------|
| 1 | Mappestruktur | Next.js 16 flyttet fra web/ til root, npm install, build OK |
| 2 | Innhenting | 10 sider scraped, 131 bilder lastet ned, SVG-logo og Havsul-bilde |
| 3 | Navigasjon | Navbar med ekte SVG-logo, 5 nav-lenker, Footer, ServiceCard, SectionHeader, ContactForm |
| 4 | Sidebygging | /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt, /api/contact |
| 5 | SEO-grunnlag | sitemap.xml, robots.txt, JSON-LD LocalBusiness, meta, 301-redirects |

## Pending Phases (en per nettside-seksjon)

| # | Phase | Mål |
|---|-------|-----|
| 6 | Forside | Ekte bilder, Lighthouse 90+ |
| 7 | Seilturer | Havsul-bilder, JSON-LD TouristTrip |
| 8 | Kajakkturer | 56 kajakkbilder, kursbilder, Product schema |
| 9 | Teambuilding | Arrangementsbilder, Product schema |
| 10 | Foredrag | Grønlandsbilder, Event schema |
| 11 | Om oss | Redesign fra raw dump, team-profiler |
| 12 | Kontakt | Resend e-post, Google Maps |
| 13 | Utleie | Redesign med priser |
| 14 | Referanser | 49+ bedrifter, testimonials |
| 15 | Blogg + CMS | Sanity, /blog, /blog/[slug] |
| 16 | SEO-polering | Schema per side, OG-bilder, analytics |
| 17 | Deploy | Vercel, domene, DNS |

## Current Build State

**Build:** `npm run build` OK, 23 routes (inkl. sitemap.xml, robots.txt)
**Sider med design:** /, /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt
**Sider med rå innholdsdump:** /booking, /kurs, /menneskene, /om-oss, /personvern, /praktisk-informasjon, /referanser, /samarbeidspartnere, /utleie

## Scraped Assets

| Type | Antall | Plassering |
|------|--------|-----------|
| Tekst (markdown) | 10 filer | content/scraped/ |
| Kajakkbilder | 56 | public/images/scraped/kayak/ |
| Landskapsbilder | 25 | public/images/scraped/landscape/ |
| Seilbilder | 9 | public/images/scraped/sailing/ |
| Teambuildingbilder | 6 | public/images/scraped/teambuilding/ |
| Aktivitetsbilder | 8 | public/images/scraped/activities/ |
| Ikoner | 17 | public/images/scraped/icons/ |
| Logoer | 5 | public/images/scraped/logo/ |
| Diverse | 5 | public/images/scraped/misc/ |
| SVG-logo (wordmark) | 1 | public/images/wannado-logo.svg |
| Havsul-bilde | 1 | public/images/havsul.jpg |

---
*Last updated: 2026-03-31 after roadmap restructuring*
