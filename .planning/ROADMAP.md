# Roadmap: Wannado nettside

**Created:** 2026-03-31
**Phases:** 17 (5 ferdig, 12 gjenstår)

## Phase Overview

| # | Phase | Goal | Requirements | Status |
|---|-------|------|-------------|--------|
| 1 | Mappestruktur | Next.js fra root, Vercel-klar | STRUCT-01, STRUCT-02 | ✓ Complete |
| 2 | Innhenting | Innhold og bilder fra wannado.no | CONT-01 til CONT-03 | ✓ Complete |
| 3 | Navigasjon | Logo, navbar, footer, UI-komponenter | NAV-01 til NAV-04 | ✓ Complete |
| 4 | Sidebygging | Grunnleggende sider bygget | PAGE-01 til PAGE-07 | ✓ Complete |
| 5 | SEO-grunnlag | Sitemap, robots, JSON-LD, redirects | SEO-01 til SEO-05 | ✓ Complete |
| 6 | Forside | Polert forside med ekte bilder | PAGE-01 | ○ Pending |
| 7 | Seilturer | Ferdig seiltur-side med bilder | PAGE-02 | ○ Pending |
| 8 | Kajakkturer | Ferdig kajakk-side med bilder | PAGE-03 | ○ Pending |
| 9 | Teambuilding | Ferdig teambuilding med bilder | PAGE-04 | ○ Pending |
| 10 | Foredrag | Ferdig foredragside med bilder | PAGE-05 | ○ Pending |
| 11 | Om oss | Team-profiler og bedriftshistorie | PAGE-10 | ○ Pending |
| 12 | Kontakt | E-postintegrasjon med Resend | FORM-03 | ○ Pending |
| 13 | Utleie | Utstyrsutleie med priser | PAGE-11 | ○ Pending |
| 14 | Referanser | Kundeoversikt og testimonials | PAGE-12 | ○ Pending |
| 15 | Blogg + CMS | Sanity CMS, bloggsider | CMS-01 til CMS-04, PAGE-08, PAGE-09 | ○ Pending |
| 16 | SEO-polering | Schema per side, OG-bilder, analytics | SEO-06 til SEO-08, PAGE-13, PAGE-14 | ○ Pending |
| 17 | Deploy | Vercel deploy, domene, DNS | STRUCT-03 | ○ Pending |

---

## Phase 6: Forside

**Goal:** Poler forsiden med ekte bilder fra scraped/, optimaliser hero-seksjonen, og sørg for at den konverterer.

**Requirements:** PAGE-01, CONT-04 (forside)

**Success criteria:**
1. Hero-seksjonen bruker ekte bilde (ikke placeholder)
2. CarouselSection har ekte bilder fra scraped/kayak/, scraped/sailing/
3. BentoGridSection bruker ekte bilder
4. Alle bilder bruker next/image med width/height
5. Siden scorer 90+ på Lighthouse Performance

**Bilder tilgjengelig:** `public/images/scraped/sailing/`, `public/images/scraped/kayak/`, `public/images/scraped/landscape/`

---

## Phase 7: Seilturer

**Goal:** Ferdigstill seiltursiden med ekte bilder fra Havsul og skjærgården.

**Requirements:** PAGE-02, CONT-04 (seil)

**Success criteria:**
1. Hero bruker ekte Havsul-bilde (public/images/havsul.jpg allerede lastet)
2. Bildegalleri eller sekundære bilder fra scraped/sailing/ (9 bilder tilgjengelig)
3. Priser og praktisk info er korrekt
4. JSON-LD TouristTrip schema
5. CTA leder til /kontakt med forhåndsvalgt "Seilturer" i dropdown

**Bilder tilgjengelig:** `public/images/scraped/sailing/baat-fb-havsul.jpg`, `hav-*.jpg`, `P7300114.jpg`, `P9010367.jpg`

---

## Phase 8: Kajakkturer

**Goal:** Ferdigstill kajakksiden med ekte kursbilder og turbilder.

**Requirements:** PAGE-03, CONT-04 (kajakk)

**Success criteria:**
1. Hero bruker ekte kajakkbilde
2. Kurskort har relevante bilder fra scraped/kayak/ (56 bilder tilgjengelig)
3. Guidede turer har landskapsbilder
4. JSON-LD Product schema for kurs
5. CTA leder til /kontakt med forhåndsvalgt "Kajakktur"

**Bilder tilgjengelig:** `public/images/scraped/kayak/` (56 stk: kurs, turer, vinterpadling, Grønland)

---

## Phase 9: Teambuilding

**Goal:** Ferdigstill teambuildingsiden med ekte arrangementsbilder.

**Requirements:** PAGE-04, CONT-04 (team)

**Success criteria:**
1. Produktkort har ekte bilder fra scraped/teambuilding/ (6 bilder tilgjengelig)
2. Referanseseksjonen har bedriftslogoer eller mer visuell presentasjon
3. JSON-LD Product schema for hvert arrangement
4. CTA leder til /kontakt med forhåndsvalgt "Teambuilding"

**Bilder tilgjengelig:** `public/images/scraped/teambuilding/` (Bungeerunning, DaVinchi, Strand Hotell)

---

## Phase 10: Foredrag

**Goal:** Ferdigstill foredragssiden med bilder og utvidet innhold.

**Requirements:** PAGE-05

**Success criteria:**
1. JTI-kortet har ekte bilde (Tone Pernille)
2. Grønlandsekspedisjonen har ekte bilder fra scraped/landscape/ (isfjell, Grønland)
3. Kontakt-CTA med riktig telefonnummer
4. JSON-LD Event schema

**Bilder tilgjengelig:** `public/images/scraped/landscape/isfjell-gronland-*.jpg`, `kimmiut-gronland-1920.jpg`

---

## Phase 11: Om oss

**Goal:** Redesign Om oss / Menneskene-sidene til en samlet side med team-profiler og bedriftshistorie.

**Requirements:** PAGE-10

**Success criteria:**
1. Samlet /om-oss side (redirect /menneskene → /om-oss)
2. Tone Pernille og Roar har fulle profiler med bilder
3. Wannados historie og verdier
4. Sertifiseringer: JTI, NLP, Veileder Hav, Skipper
5. Visuelt tiltalende layout, ikke bare tekst

---

## Phase 12: Kontakt

**Goal:** E-postintegrasjon slik at kontaktskjemaet sender ekte e-post.

**Requirements:** FORM-03

**Success criteria:**
1. Resend API-nøkkel konfigurert i .env.local
2. Kontaktskjema sender e-post til mail@wannado.no
3. Bruker får bekreftelsesmelding
4. Google Maps embed med Skarestrand-lokasjon

**Manuelt steg:** Bruker må opprette Resend-konto og legge til API-nøkkel

---

## Phase 13: Utleie

**Goal:** Redesign utleiesiden med priser og utstyrsoversikt.

**Requirements:** PAGE-11

**Success criteria:**
1. Kajakk- og kanoutleie med priser (fra content/scraped/)
2. Utstyrsliste med bilder
3. Oppmøtested: Skarestrand
4. Kontakt-CTA
5. Metadata og SEO-tittel

---

## Phase 14: Referanser

**Goal:** Redesign referansesiden med kundeoversikt og testimonials.

**Requirements:** PAGE-12

**Success criteria:**
1. 49+ bedriftsnavn presentert visuelt (logo-grid eller navne-grid)
2. 2-3 utvalgte testimonials med sitat og firma
3. TV-opptreden: "Jakten på Kjærligheten" 2011, "71° nord" 2009
4. TripAdvisor-kobling

**Innhold tilgjengelig:** `content/scraped/referanser.md`

---

## Phase 15: Blogg + CMS

**Goal:** Sanity CMS satt opp med blogg for SEO-innholdsmarkedsføring.

**Requirements:** CMS-01 til CMS-04, PAGE-08, PAGE-09

**Success criteria:**
1. `npx sanity@latest init` kjørt og prosjekt opprettet
2. Innholdsskjemaer: blogPost, service, testimonial, teamMember
3. Sanity Studio tilgjengelig på /studio
4. /blog viser bloggposter fra Sanity
5. /blog/[slug] rendrer enkeltartikkel med Portable Text
6. ISR med revalidate: 3600

**Manuelt steg:** Bruker kjører `npx sanity@latest init`

---

## Phase 16: SEO-polering

**Goal:** Avansert SEO: schema per side, OG-bilder, personvern og praktisk info.

**Requirements:** SEO-06 til SEO-08, PAGE-13, PAGE-14

**Success criteria:**
1. JSON-LD schema på alle tjenestesider (TouristTrip, Product, Event)
2. OG-bilder generert for alle sider
3. Personvern-side redesignet med riktig GDPR-info
4. Praktisk informasjon-side med møtesteder, parkering, utstyr
5. Vercel Analytics eller Google Analytics integrert

---

## Phase 17: Deploy

**Goal:** Produksjons-deploy med domene og DNS.

**Requirements:** STRUCT-03

**Success criteria:**
1. Vercel-prosjekt opprettet
2. wannado.no DNS peker på Vercel
3. SSL-sertifikat aktivt
4. 301-redirects fra gamle URLer fungerer i produksjon
5. Core Web Vitals alle grønne

**Manuelt steg:** DNS-endring hos nåværende hostingleverandør

---
*Roadmap created: 2026-03-31*
*Last updated: 2026-03-31 after restructuring to per-section phases*
