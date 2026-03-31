# Roadmap: Wannado nettside

**Created:** 2026-03-31
**Total Phases:** 17

## Phases

- [x] **Phase 1: Mappestruktur** - Next.js fra root, Vercel-klar
- [x] **Phase 2: Innhenting** - Innhold og bilder fra wannado.no
- [x] **Phase 3: Navigasjon** - Logo, navbar, footer, UI-komponenter
- [x] **Phase 4: Sidebygging** - Grunnleggende sider bygget
- [x] **Phase 5: SEO-grunnlag** - Sitemap, robots, JSON-LD, redirects
- [ ] **Phase 6: Forside** - Polert forside med ekte bilder, Lighthouse 90+
- [ ] **Phase 7: Seilturer** - Ferdig seiltur-side med Havsul-bilder og JSON-LD
- [ ] **Phase 8: Kajakkturer** - Ferdig kajakk-side med kursbilder og Product schema
- [ ] **Phase 9: Teambuilding** - Ferdig teambuilding med arrangementsbilder
- [ ] **Phase 10: Foredrag** - Ferdig foredragside med Grønlandsbilder
- [ ] **Phase 11: Om oss** - Team-profiler, bedriftshistorie, sertifiseringer
- [ ] **Phase 12: Kontakt** - Resend e-postintegrasjon, Google Maps
- [ ] **Phase 13: Utleie** - Utstyrsutleie med priser og bilder
- [ ] **Phase 14: Referanser** - 49+ bedrifter, testimonials, TV-opptredener
- [ ] **Phase 15: Blogg + CMS** - Sanity CMS, /blog, /blog/[slug]
- [ ] **Phase 16: SEO-polering** - Schema per side, OG-bilder, analytics
- [ ] **Phase 17: Deploy** - Vercel deploy, domene, DNS

## Phase Details

### Phase 1: Mappestruktur
**Goal:** Next.js 16 kjører fra root-mappen, klar for Vercel-deploy
**Depends on:** Nothing
**Requirements:** STRUCT-01, STRUCT-02
**Success Criteria** (what must be TRUE):
  1. Next.js bygger fra root med `npm run build`
  2. Alle 15+ ruter rendrer
**Plans:** TBD

### Phase 2: Innhenting
**Goal:** All tekst og bilder fra wannado.no lagret lokalt
**Depends on:** Phase 1
**Requirements:** CONT-01, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. 10+ sider scraped som markdown i content/scraped/
  2. Alle bilder lastet ned til public/images/scraped/
  3. SVG-logo tilgjengelig
**Plans:** TBD

### Phase 3: Navigasjon
**Goal:** Logo, navbar, footer og gjenbrukbare UI-komponenter
**Depends on:** Phase 2
**Requirements:** NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Navbar bruker ekte SVG-logo
  2. 5+ navigasjonspunkter
  3. Footer med kontaktinfo
  4. ServiceCard, SectionHeader, ContactForm komponenter
**Plans:** TBD

### Phase 4: Sidebygging
**Goal:** Alle hovedsider bygget med design og innhold
**Depends on:** Phase 3
**Requirements:** PAGE-01 til PAGE-07, FORM-01, FORM-02
**Success Criteria** (what must be TRUE):
  1. /seilturer, /kajakkturer, /opplevelser bygget
  2. /teambuilding, /foredrag, /kontakt bygget
  3. API-route for kontaktskjema
**Plans:** TBD

### Phase 5: SEO-grunnlag
**Goal:** Teknisk SEO-infrastruktur
**Depends on:** Phase 4
**Requirements:** SEO-01 til SEO-05
**Success Criteria** (what must be TRUE):
  1. /sitemap.xml tilgjengelig
  2. /robots.txt tilgjengelig
  3. JSON-LD LocalBusiness på forside
  4. 301-redirects fra gamle URLer
**Plans:** TBD

### Phase 6: Forside
**Goal:** Poler forsiden med ekte bilder fra scraped/, optimaliser hero-seksjonen, sørg for at den konverterer
**Depends on:** Phase 5
**Requirements:** PAGE-01, CONT-04 (forside)
**Success Criteria** (what must be TRUE):
  1. Hero-seksjonen bruker ekte bilde (ikke placeholder)
  2. CarouselSection har ekte bilder fra scraped/kayak/, scraped/sailing/
  3. BentoGridSection bruker ekte bilder
  4. Alle bilder bruker next/image med width/height
  5. Siden scorer 90+ på Lighthouse Performance
**Plans:** 1 plan

Plans:
- [ ] 06-01-PLAN.md — Erstatt alle placeholder-bilder med next/image og ekte scraped-bilder

### Phase 7: Seilturer
**Goal:** Ferdigstill seiltursiden med ekte bilder fra Havsul og skjærgården
**Depends on:** Phase 5
**Requirements:** PAGE-02, CONT-04 (seil)
**Success Criteria** (what must be TRUE):
  1. Hero bruker ekte Havsul-bilde
  2. Bildegalleri eller sekundære bilder fra scraped/sailing/
  3. Priser og praktisk info er korrekt
  4. JSON-LD TouristTrip schema
  5. CTA leder til /kontakt med forhåndsvalgt "Seilturer"
**Plans:** 1 plan

Plans:
- [ ] 07-01-PLAN.md - Bildegalleri, JSON-LD TouristTrip, CTA med tjeneste-forhåndsvalg

### Phase 8: Kajakkturer
**Goal:** Ferdigstill kajakksiden med ekte kursbilder og turbilder
**Depends on:** Phase 5
**Requirements:** PAGE-03, CONT-04 (kajakk)
**Success Criteria** (what must be TRUE):
  1. Hero bruker ekte kajakkbilde
  2. Kurskort har relevante bilder fra scraped/kayak/
  3. Guidede turer har landskapsbilder
  4. JSON-LD Product schema for kurs
  5. CTA leder til /kontakt med forhåndsvalgt "Kajakktur"
**Plans:** TBD

### Phase 9: Teambuilding
**Goal:** Ferdigstill teambuildingsiden med ekte arrangementsbilder
**Depends on:** Phase 5
**Requirements:** PAGE-04, CONT-04 (team)
**Success Criteria** (what must be TRUE):
  1. Produktkort har ekte bilder fra scraped/teambuilding/
  2. Referanseseksjon med visuell presentasjon
  3. JSON-LD Product schema for hvert arrangement
  4. CTA leder til /kontakt med forhåndsvalgt "Teambuilding"
**Plans:** 1 plan

Plans:
- [ ] 09-01-PLAN.md — Bilder på produktkort, JSON-LD Product schema, visuell referanseseksjon, CTA med forhåndsvalg

### Phase 10: Foredrag
**Goal:** Ferdigstill foredragssiden med Grønlandsbilder og Event schema
**Depends on:** Phase 5
**Requirements:** PAGE-05
**Success Criteria** (what must be TRUE):
  1. JTI-kortet har ekte bilde
  2. Grønlandsekspedisjonen har ekte bilder fra scraped/landscape/
  3. Kontakt-CTA med riktig telefonnummer
  4. JSON-LD Event schema
**Plans:** 1 plan

Plans:
- [ ] 10-01-PLAN.md — Ekte bilder i foredragskort og JSON-LD Event schema

### Phase 11: Om oss
**Goal:** Redesign Om oss/Menneskene til en samlet side med team-profiler og bedriftshistorie
**Depends on:** Phase 5
**Requirements:** PAGE-10
**Success Criteria** (what must be TRUE):
  1. Samlet /om-oss side (redirect /menneskene → /om-oss)
  2. Tone Pernille og Roar har fulle profiler med bilder
  3. Wannados historie og verdier beskrevet
  4. Sertifiseringer: JTI, NLP, Veileder Hav, Skipper
**Plans:** 1 plan

Plans:
- [ ] 11-01-PLAN.md — Combined /om-oss page with team profiles, company history, certifications, and /menneskene redirect

### Phase 12: Kontakt
**Goal:** E-postintegrasjon, Google Maps og tjeneste-forhåndsvalg via URL-parameter
**Depends on:** Phase 5
**Requirements:** FORM-03
**Success Criteria** (what must be TRUE):
  1. Resend API konfigurert
  2. Kontaktskjema sender e-post til mail@wannado.no
  3. Google Maps embed med Skarestrand-lokasjon
  4. URL-parameter ?tjeneste=X forhåndsvelger tjeneste i skjemaet
**Plans:** 1 plan

Plans:
- [ ] 12-01-PLAN.md — Resend e-postintegrasjon, Google Maps embed, URL-param forhåndsvalg, oppdater CTA-lenker

### Phase 13: Utleie
**Goal:** Redesign utleiesiden med priser og utstyrsoversikt
**Depends on:** Phase 5
**Requirements:** PAGE-11
**Success Criteria** (what must be TRUE):
  1. Kajakk- og kanoutleie med priser
  2. Utstyrsliste med bilder
  3. Oppmøtested og kontakt-CTA
**Plans:** 1 plan

Plans:
- [ ] 13-01-PLAN.md — Redesign utleieside med hero, utstyrskort, praktisk info og CTA

### Phase 14: Referanser
**Goal:** Redesign referansesiden med kundeoversikt og testimonials
**Depends on:** Phase 5
**Requirements:** PAGE-12
**Success Criteria** (what must be TRUE):
  1. 49+ bedriftsnavn presentert visuelt
  2. 2-3 utvalgte testimonials
  3. TV-opptredener: Jakten på Kjærligheten, 71° nord
**Plans:** TBD

### Phase 15: Blogg + CMS
**Goal:** Sanity CMS med blogg for SEO-innholdsmarkedsføring
**Depends on:** Phase 5
**Requirements:** CMS-01 til CMS-04, PAGE-08, PAGE-09
**Success Criteria** (what must be TRUE):
  1. Sanity prosjekt opprettet og konfigurert
  2. Innholdsskjemaer: blogPost, service, testimonial, teamMember
  3. Sanity Studio på /studio
  4. /blog viser bloggposter fra Sanity
  5. /blog/[slug] rendrer enkeltartikkel
**Plans:** TBD

### Phase 16: SEO-polering
**Goal:** Avansert SEO: schema per side, OG-bilder, analytics
**Depends on:** Phase 6-14
**Requirements:** SEO-06 til SEO-08, PAGE-13, PAGE-14
**Success Criteria** (what must be TRUE):
  1. JSON-LD schema på alle tjenestesider
  2. OG-bilder for alle sider
  3. Personvern-side redesignet
  4. Praktisk informasjon-side med møtesteder
  5. Analytics integrert
**Plans:** TBD

### Phase 17: Deploy
**Goal:** Produksjons-deploy med domene og DNS
**Depends on:** Phase 6-16
**Requirements:** STRUCT-03
**Success Criteria** (what must be TRUE):
  1. Vercel-prosjekt opprettet
  2. wannado.no DNS peker på Vercel
  3. SSL-sertifikat aktivt
  4. Core Web Vitals alle grønne
**Plans:** TBD

---
*Roadmap created: 2026-03-31*
*Last updated: 2026-03-31 after Phase 10 planning*
