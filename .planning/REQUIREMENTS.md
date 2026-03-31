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
- [ ] **CONT-04**: Scraped bilder integrert på alle sider

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

### SEO

- [ ] **SEO-01**: Sitemap.xml tilgjengelig
- [ ] **SEO-02**: Robots.txt
- [ ] **SEO-03**: JSON-LD LocalBusiness på forside
- [x] **SEO-04**: Title-tags og meta descriptions på alle sider
- [ ] **SEO-05**: 301-redirect fra gamle WordPress-URLer

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
| STRUCT-01 til STRUCT-02 | Fase 1 | Complete |
| CONT-01 til CONT-03 | Fase 2 | Complete |
| PAGE-01 til PAGE-07, FORM-01 til FORM-02, NAV-01 til NAV-04 | Fase 4 | Complete |
| SEO-01 til SEO-05 | Fase 5 | In Progress |
| CMS-01 til CMS-04 | Fase 6 | Pending |
| PAGE-08 til PAGE-09, FORM-03, CONT-04 | Fase 6 | Pending |

---
*Requirements defined: 2026-03-31*
