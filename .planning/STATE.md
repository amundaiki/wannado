# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Konvertere turister og bedrifter til å booke Wannado-opplevelser
**Current focus:** Fase 6 (Forside) fullfort, klar for fase 7+ (Seilturer, Kajakkturer, etc.)

## Completed Phases

| # | Phase | Hva ble gjort |
|---|-------|--------------|
| 1 | Mappestruktur | Next.js 16 flyttet fra web/ til root, npm install, build OK |
| 2 | Innhenting | 10 sider scraped, 131 bilder lastet ned, SVG-logo og Havsul-bilde |
| 3 | Navigasjon | Navbar med ekte SVG-logo, 5 nav-lenker, Footer, ServiceCard, SectionHeader, ContactForm |
| 4 | Sidebygging | /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt, /api/contact |
| 5 | SEO-grunnlag | sitemap.xml, robots.txt, JSON-LD LocalBusiness, meta, 301-redirects |
| 6 | Forside | Alle 6 forsidekomponenter bruker next/image med ekte scraped-bilder, hero LCP optimalisert |

## Pending Phases (en per nettside-seksjon)

| # | Phase | Mål |
|---|-------|-----|
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

## Decisions (Phase 6)

- Brukte next/image fill-modus for container-bilder (Hero, BentoGrid, ScrollVideo poster)
- Brukte next/image width/height-modus for CSS-kontrollerte bilder (Carousel, People, Feature)
- Importerte next/image som NextImage i ScrollVideoSection for a unnga konflikt med browser Image constructor
- P7270038.jpg korrigert til 1024x624 (planen antok 1280x960)

---
*Last updated: 2026-03-31 after completing phase 6 plan 01*
