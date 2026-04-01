---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
last_updated: "2026-03-31T18:40:53Z"
progress:
  total_phases: 17
  completed_phases: 15
  total_plans: 21
  completed_plans: 17
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Konvertere turister og bedrifter til å booke Wannado-opplevelser
**Current focus:** Fase 17 (Deploy) er aktiv. Fase 15 (Blogg + CMS) er utsatt til post-launch som siste fase.

**Execution override (2026-03-31):** Sanity/CMS flyttes bak deploy. Vi prioriterer preview/produksjonssetting først, og tar blogg/CMS etter at domenet er live.

## Completed Phases

| # | Phase | Hva ble gjort |
|---|-------|--------------|
| 1 | Mappestruktur | Next.js 16 flyttet fra web/ til root, npm install, build OK |
| 2 | Innhenting | 10 sider scraped, 131 bilder lastet ned, SVG-logo og Havsul-bilde |
| 3 | Navigasjon | Navbar med ekte SVG-logo, 5 nav-lenker, Footer, ServiceCard, SectionHeader, ContactForm |
| 4 | Sidebygging | /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt, /api/contact |
| 5 | SEO-grunnlag | sitemap.xml, robots.txt, JSON-LD LocalBusiness, meta, 301-redirects |
| 6 | Forside | Alle 6 forsidekomponenter bruker next/image med ekte scraped-bilder, hero LCP optimalisert |
| 7 | Seilturer | 6-bilders galleri, JSON-LD TouristTrip schema, CTA-routing til kontaktskjema med pre-seleksjon |
| 10 | Foredrag | Ekte bilder (JTI + Gronland) og JSON-LD Event schema for begge foredrag |
| 13 | Utleie | Redesignet fra raa dump til polert serviceside med hero, utstyrskort, praktisk info og CTA |
| 8 | Kajakkturer | 10 ekte bilder, JSON-LD Product schema for 6 kurs, TouristTrip for guidede turer, CTA til /kontakt?tjeneste=Kajakktur |
| 14 | Referanser | 29 bedrifter i rutenett, 2 testimonials, TV-opptredener, TripAdvisor-lenke, CTA |
| 11 | Om oss | Redesignet /om-oss med bedriftshistorie, teamprofiler (Tone Pernille + Roar), sertifiseringsbadger, verdier, CTA, /menneskene 301-redirect |
| 12 | Kontakt | Resend e-post-integrasjon, Google Maps iframe, case-insensitive ?tjeneste= pre-seleksjon, CTA-routing fra alle tjenestesider |
| 9 | Teambuilding | 6 ekte arrangementsbilder, JSON-LD Product schema, referansegrid, CTA til /kontakt?tjeneste=Teambuilding |
| 16 | SEO-polering | JSON-LD Product schema på teambuilding, OG-bilder på alle sider, GDPR personvern, praktisk info redesign, Vercel Analytics |

## Pending Phases (en per nettside-seksjon)

| # | Phase | Mål |
|---|-------|-----|
| 7 | ~~Seilturer~~ | Fullfort: galleri, JSON-LD TouristTrip, CTA-routing |
| 8 | ~~Kajakkturer~~ | Fullfort: 10 ekte bilder, JSON-LD Product + TouristTrip, CTA-routing |
| 9 | ~~Teambuilding~~ | Fullfort: 6 arrangementsbilder, JSON-LD Product schema, referansegrid, CTA-routing |
| 10 | ~~Foredrag~~ | Fullfort: ekte bilder, JSON-LD Event schema |
| 11 | ~~Om oss~~ | Fullfort: bedriftshistorie, teamprofiler, sertifiseringer, verdier, /menneskene redirect |
| 12 | ~~Kontakt~~ | Fullfort: Resend e-post, Google Maps, ?tjeneste= CTA-routing |
| 13 | ~~Utleie~~ | Fullfort: hero, utstyrskort, praktisk info, CTA, SEO-metadata |
| 14 | ~~Referanser~~ | Fullfort: 29 bedrifter, testimonials, TV-opptredener, TripAdvisor |
| 17 | Deploy | Vercel, domene, DNS |
| 15 | Blogg + CMS | Utsatt til siste fase etter deploy: Sanity, /blog, /blog/[slug] |
| 16 | ~~SEO-polering~~ | Fullfort: JSON-LD, OG-bilder, GDPR personvern, praktisk info, Vercel Analytics |

## Current Build State

**Build:** `npm run build` OK, 22 routes (inkl. sitemap.xml, robots.txt)
**Sider med design:** /, /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt, /utleie, /referanser, /om-oss, /personvern, /praktisk-informasjon
**Sider med rå innholdsdump:** /booking, /kurs, /samarbeidspartnere

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

## Decisions (Phase 7)

- Brukte useSearchParams i ContactForm for aa lese ?tjeneste= fra URL, med Suspense boundary i kontakt/page.tsx
- Valgte 6 unike bilder fra scraped/sailing/, hoppet over duplikater (hav-1-2-1, hav-1-2-2)
- JSON-LD TouristTrip med to Offer-objekter for per-person og charter-pris

## Decisions (Phase 13)

- Brukte "Ta kontakt" som prisplassholder for alle tre utleiekategorier (enkel kajakk, dobbel kajakk, kano) med TODO-kommentar
- Fulgte seilturer-sidens grid-layout (3+2 kolonne) for innhold og priskort
- La til kajakkutleie-spesifikt bilde i innholdsseksjonen for visuell tyngde

## Decisions (Phase 14)

- Brukte as const arrays med TypeScript-typer for typesikker referansedata i src/lib/data/
- 29 bedrifter etter filtrering: fjernet TV-show-oppforinger, generiske oppforinger og lenker fra radata
- Anonym forfatter for pangstart-testimonial da kilden ikke navngis i scraped innhold

## Decisions (Phase 8)

- Gjenbrukte ContactForm useSearchParams-stotte fra fase 7, ingen endringer i ContactForm.tsx
- Brukte ItemList-wrapper rundt Product-schemas for bedre sokeresultatvisning av kurskatalog
- Handmatchet hvert kursbilde til ferdighetsniva: rolig vann for intro, strandoppsett for grunnkurs, dramatisk surf for avansert

## Decisions (Phase 11)

- Beholdt PeopleSection.tsx fordi forsiden (src/app/page.tsx) bruker den; fjernet kun fra om-oss
- Brukte blockquote-element for "Hva er DIN lek?" pullquote med font-dm italic
- Begge profiler inkluderer telefonnummer og e-post for bedre kontakttilgjengelighet
- Sertifiseringsbadger som inline-block bg-teal/10 text-teal rounded-full spans

## Decisions (Phase 12)

- Lazy Resend-initialisering: SDK instansieres kun inni handler nar RESEND_API_KEY finnes, unngaar build-feil
- Case-insensitive URL-parametermatch med Array.find + toLowerCase for robusthet
- .gitignore-unntak: la til !.env.local.example saa eksempelfilen spores i git
- Seilturer, kajakkturer, teambuilding hadde allerede ?tjeneste= fra tidligere faser (7, 8, 9)

## Decisions (Phase 9)

- Gjenbrukte ContactForm useSearchParams-stotte fra fase 7, ingen endringer i ContactForm.tsx
- Dynamisk JSON-LD generert fra products-array med schemaPrices Record-oppslag, ikke duplisert statisk schema
- Referanseseksjon som grid-kort (2 kolonner mobil, 3 kolonner tablet+) med lenke til /referanser

## Decisions (Phase 16)

- Seilturer, kajakkturer og foredrag hadde allerede JSON-LD fra fase 7, 8, 10; kun teambuilding trengte ny schema
- Dynamisk JSON-LD generert fra products-array med schemaPrices Record-oppslag
- 6 Lucide-ikoner for praktisk informasjon: MapPin, Shirt, Users, Calendar, Shield, CreditCard
- Personvern-siden sier eksplisitt ingen tredjepartssporing, cookiefri Vercel Analytics
- @vercel/analytics v2.0.1 importert fra '@vercel/analytics/next' i root layout

---
*Last updated: 2026-03-31 after reprioritizing phase 17 ahead of phase 15*
