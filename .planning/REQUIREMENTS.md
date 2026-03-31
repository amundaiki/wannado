# Requirements: Wannado nettside

**Defined:** 2026-03-31
**Core Value:** Konvertere turister og bedrifter til å booke Wannado-opplevelser via en vakker, rask nettside som rangerer topp 3

## v1 Requirements

### Struktur og deploy

- [x] **STRUCT-01**: Next.js 16 app kjører fra root-mappe
- [x] **STRUCT-02**: Klar for Vercel-deploy
- [ ] **STRUCT-03**: Domene wannado.no peker på Vercel

### Innhold og bilder

- [x] **CONT-01**: Innhold fra wannado.no er hentet og lagret
- [x] **CONT-02**: Bilder er lastet ned fra wannado.no
- [x] **CONT-03**: SVG-logo og Havsul-bilde er tilgjengelig
- [x] **CONT-04**: Scraped bilder integrert på alle sider

### Sider

- [x] **PAGE-01**: Forside med hero, carousel, bento-grid, teambuilding, people, testimonials
- [x] **PAGE-02**: Seilturer (/seilturer) med priser og bookingCTA
- [x] **PAGE-03**: Kajakkturer og kurs (/kajakkturer) med kursoversikt
- [x] **PAGE-04**: Teambuilding (/teambuilding) med 6 produktkort
- [x] **PAGE-05**: Foredrag (/foredrag) med JTI og Grønlandsekspedisjon
- [x] **PAGE-06**: Opplevelser hub (/opplevelser) med kategorier
- [x] **PAGE-07**: Kontakt (/kontakt) med skjema og kontaktinfo
- [ ] **PAGE-08**: Blogg listeside (/blog) for SEO
- [ ] **PAGE-09**: Bloggartikkel (/blog/[slug])

### Kontaktskjema

- [x] **FORM-01**: Kontaktskjema med felt for navn, e-post, telefon, tjeneste, melding
- [x] **FORM-02**: API-route som tar imot forespørsel
- [ ] **FORM-03**: E-postutsendelse via Resend til mail@wannado.no

### Navigasjon

- [x] **NAV-01**: Navbar med ekte Wannado SVG-logo
- [x] **NAV-02**: 5 navigasjonspunkter: Opplevelser, Seilturer, Kajakk, Teambuilding, Foredrag
- [x] **NAV-03**: "Bestill tur" CTA-knapp
- [x] **NAV-04**: Footer med kontaktinfo og lenker

### Sekundære sider

- [ ] **PAGE-10**: Om oss / Menneskene (/om-oss) med team-profiler og bedriftshistorie
- [ ] **PAGE-11**: Utleie (/utleie) med priser og utstyroversikt for kajakk og kano
- [ ] **PAGE-12**: Referanser (/referanser) med kundeoversikt og testimonials
- [ ] **PAGE-13**: Personvern (/personvern) med GDPR-info
- [ ] **PAGE-14**: Praktisk informasjon (/praktisk-informasjon) med møtesteder og utstyrsliste

### SEO

- [x] **SEO-01**: Sitemap.xml tilgjengelig
- [x] **SEO-02**: Robots.txt
- [x] **SEO-03**: JSON-LD LocalBusiness på forside
- [x] **SEO-04**: Title-tags og meta descriptions på alle sider
- [x] **SEO-05**: 301-redirect fra gamle WordPress-URLer
- [ ] **SEO-06**: JSON-LD TouristTrip/Product schema på tjenestesider
- [ ] **SEO-07**: Vercel Analytics integrert
- [ ] **SEO-08**: OG-bilder for alle sider

### CMS

- [ ] **CMS-01**: Sanity CMS satt opp med prosjekt-ID
- [ ] **CMS-02**: Innholdsskjema for bloggposter
- [ ] **CMS-03**: Innholdsskjema for tjenester
- [ ] **CMS-04**: Sanity Studio tilgjengelig på /studio

## v2 Requirements

- Hesteopplevelser-side (/hest)
- Gavekort-side
- Automatisk e-post-bekreftelse til bruker ved booking
- Flerspråklig (norsk + engelsk)
- Google Analytics / Vercel Analytics

## Out of Scope

| Feature | Reason |
|---------|--------|
| Booking-API | Wannado bruker manuell kontaktflyt |
| Betalingsintegrasjon | Ikke nødvendig for nåværende modell |
| Brukerkontoer | For komplekst for v1 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRUCT-01, STRUCT-02 | Fase 1: Mappestruktur | Complete |
| CONT-01, CONT-02, CONT-03 | Fase 2: Innhenting | Complete |
| NAV-01 til NAV-04 | Fase 3: Navigasjon | Complete |
| PAGE-01 | Fase 6: Forside | Complete |
| PAGE-02, CONT-04 (seil) | Fase 7: Seilturer | Complete |
| PAGE-03, CONT-04 (kajakk) | Fase 8: Kajakkturer | Pending |
| PAGE-04, CONT-04 (team) | Fase 9: Teambuilding | Pending |
| PAGE-05 | Fase 10: Foredrag | Pending |
| PAGE-10 | Fase 11: Om oss | Pending |
| PAGE-07, FORM-01, FORM-02, FORM-03 | Fase 12: Kontakt | Pending |
| PAGE-11 | Fase 13: Utleie | Pending |
| PAGE-12 | Fase 14: Referanser | Pending |
| CMS-01 til CMS-04, PAGE-08, PAGE-09 | Fase 15: Blogg + CMS | Pending |
| SEO-06 til SEO-08, PAGE-13, PAGE-14 | Fase 16: SEO-polering | Pending |
| STRUCT-03, SEO-07 | Fase 17: Deploy | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after roadmap restructuring*
