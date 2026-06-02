# Phase 18 Research: Code Review Findings

## Kilde

Full kodebase-review utført 2026-04-01 av Opus code-reviewer agent. 35 kildefiler gjennomgått. Helsescore: 6/10.

---

## CRITICAL (må fikses)

### CRITICAL-1: XSS i kontakt-API epostmal
- **Fil:** `src/app/api/contact/route.ts:39-57`
- **Problem:** Brukerinput (`name`, `email`, `phone`, `service`, `message`) interpoleres direkte i HTML-epostmal uten sanitering. Kan brukes til phishing, innholdsspoofing eller e-postheader-injeksjon.
- **Fix:** Lag `escapeHtml()`-funksjon som escaper `&`, `<`, `>`, `"`. Bruk på alle interpolerte verdier. Valider e-postformat server-side. Sanitér subject-linje.

### CRITICAL-2: Eksponert API-nøkkel i .env
- **Fil:** `.env:1`
- **Problem:** Reell Apify API-nøkkel ligger i `.env`. Selv om filen er i `.gitignore`, er det en risiko.
- **Fix:** Roter nøkkelen. Flytt til `.env.local`. `.env` skal kun ha ikke-sensitive defaults.

---

## HIGH (bør fikses)

### HIGH-1: Ingen mobil-navigasjon
- **Fil:** `src/components/layout/Navbar.tsx:57`
- **Problem:** Nav-lenker er `hidden md:flex`. Ingen hamburger-meny, drawer eller alternativ mobil-nav. På mobil ser brukeren bare logo og "Bestill tur"-knapp.
- **Fix:** Implementer hamburger-meny med slide-out drawer. Bruk `useState` toggle, render for skjermer under `md` breakpoint.

### HIGH-2: Ingen inputvalidering i kontakt-API
- **Fil:** `src/app/api/contact/route.ts:6-14`
- **Problem:** Kun sjekk for tomme `name`, `email`, `message`. Ingen e-postformat-validering, rate limiting, CSRF, max-lengde eller honeypot.
- **Fix:** Legg til e-post regex, felt-lengdebegrensning (500 chars melding, 100 navn), honeypot-felt i skjema.

### HIGH-3: Mangler error boundaries
- **Mangler:** `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`
- **Problem:** Brukere ser standard Next.js-feilside ved krasj eller 404.
- **Fix:** Lag `not-found.tsx` (norsk 404) og `error.tsx` (client error boundary) som matcher sidens design.

### HIGH-4: Sitemap inneholder redirect-URL
- **Fil:** `src/app/sitemap.ts:15`
- **Problem:** `/menneskene` er i sitemap men redirecter til `/om-oss`. Forvirrer søkemotorer, sløser crawl-budsjett.
- **Fix:** Fjern `/menneskene` fra sitemap.

### HIGH-5: Tre placeholder-sider med rå innhold
- **Filer:** `src/app/booking/page.tsx`, `src/app/kurs/page.tsx`, `src/app/samarbeidspartnere/page.tsx`
- **Problem:** Rå scrapet tekst i individuelle `<p>`-tags. Booking-siden har fragmenterte e-poster, emojis, em dashes. Mangler metadata.
- **Fix:** Enten fullfør sidene eller redirect til `/kontakt`. `/booking` bør redirecte til `/kontakt`.

### HIGH-6: Dead code - WaterDividerSection
- **Fil:** `src/components/sections/WaterDividerSection.tsx`
- **Problem:** Importeres ingen steder. Erstattet av `VideoBanner`.
- **Fix:** Slett filen.

### HIGH-7: Unødvendig "use client" på presentasjonskomponenter
- **Filer:** `FeatureSection.tsx`, `BentoGridSection.tsx`, `PeopleSection.tsx`, `VideoBanner.tsx`, `WaterDividerSection.tsx`
- **Problem:** Komponenter som `VideoBanner` bruker ingen React hooks. HTML `<video autoPlay muted loop playsInline>` fungerer uten JS. Øker bundle, hindrer SSR.
- **Fix:** Fjern `"use client"` fra `VideoBanner`. Vurder CSS-animasjoner med `@starting-style` eller Intersection Observer i stedet for framer-motion der mulig.

---

## MEDIUM (bør vurderes)

### MEDIUM-1: Native `<img>` i stedet for next/image
- **Filer:** `Navbar.tsx:47-53` (logo SVG), `ServiceCard.tsx:35-39`
- **Fix:** Erstatt med `<Image>` fra `next/image`.

### MEDIUM-2: Hardkodet hover-farge #5a4838 i 8+ filer
- **Filer:** Navbar.tsx:79, kontakt/page.tsx, seilturer/page.tsx, kajakkturer/page.tsx, teambuilding/page.tsx, utleie/page.tsx m.fl.
- **Fix:** Definer som Tailwind theme-farge (`brown-hover` / `brown-dark`).

### MEDIUM-3: 111MB video i public/
- **Fil:** `public/videos/`
- **Problem:** 25MB `havsul-hero.mp4` (original, erstattet av 5.5MB web-versjon) og 17MB `havsul-clip-06-merdo-ankomst.mp4`.
- **Fix:** Slett 25MB originalen. Komprimer 17MB-klippet. Vurder video-CDN.

### MEDIUM-4: Navbar+Footer gjentas i hver side (DRY-brudd)
- **Filer:** Alle page-filer i `src/app/`
- **Fix:** Flytt til root `layout.tsx`. Bruk route groups ved behov.

### MEDIUM-5: Footer-lenker peker til #
- **Fil:** `Footer.tsx:45-53`
- **Problem:** Instagram, Facebook, LinkedIn, Personvern, Vilkår peker alle til `#`. CarouselSection "Se alle turer" også `#`.
- **Fix:** Sett ekte URLer. Link Personvern til `/personvern`.

### MEDIUM-6: Carousel-kort uten lenke/klikk
- **Fil:** `CarouselSection.tsx:101-136`
- **Problem:** `cursor-pointer` men ingen `<a>`, `<Link>` eller `onClick`. "Les mer" er ikke interaktiv.
- **Fix:** Wrap i `<Link>` til relevant tjenesteside.

### MEDIUM-7: Bento-grid-kort uten lenke
- **Fil:** `BentoGridSection.tsx:46-131`
- **Fix:** Wrap i `<Link>` til tjenestesider.

### MEDIUM-8: Mangler sizes-attributt på galleri-bilder
- **Fil:** `seilturer/page.tsx:374-381`
- **Fix:** Legg til `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

### MEDIUM-9: SVG-ikoner mangler aria-hidden
- **Filer:** `seilturer/page.tsx`, `om-oss/page.tsx`, `utleie/page.tsx`
- **Fix:** Legg til `aria-hidden="true"` på dekorative SVG-er.

### MEDIUM-10: personvern/page.tsx bruker HTML-entities
- **Fil:** `personvern/page.tsx:53-144`
- **Problem:** `n&aring;r`, `bes&oslash;k` i stedet for `når`, `besøk`. Bryter æøå-regelen.
- **Fix:** Erstatt alle HTML-entities med faktiske norske tegn.

---

## LOW (valgfritt)

### LOW-1: new Date() i sitemap.ts
- **Fil:** `sitemap.ts:6`
- **Fix:** Bruk statiske datoer eller git commit-timestamps.

### LOW-2: Em dash i booking/page.tsx
- **Fil:** `booking/page.tsx:14`
- **Fix:** Erstatt med punktum eller komma.

### LOW-3: Index som key i .map()
- **Filer:** `CarouselSection.tsx:102`, `BentoGridSection.tsx:106`, `PeopleSection.tsx:42`
- **Fix:** Bruk unike identifikatorer fra data.

### LOW-4: Ingen loading.tsx skeletons
- **Fix:** Legg til `loading.tsx` for ruter med dynamisk innhold.

### LOW-5: Schema.org kan være mer komplett
- **Fil:** `page.tsx:18-49`
- **Problem:** `sameAs`-URLer og åpningstider bør verifiseres med kunden.

### LOW-6: eslint.config.mjs overrider defaults unødvendig
- **Fil:** `eslint.config.mjs:9-15`
- **Fix:** Fjern `globalIgnores` hvis den ikke legger til noe nytt.

---

## INFO

- Ingen testfiler i prosjektet (forståelig for markedsføringsside, men kontakt-API bør testes)
- `content/scraped/facebook/posts.json` er 39K+ linjer (vurder ekstern lagring)
- Next.js 16.2.1 + React 19.2.4 + Tailwind CSS v4 (moderne stack)
- `v1/`-`v5/` legacy-kataloger i prosjektrot bør ryddes

---

## Positivt (behold)

- Sterk SEO: Metadata, OpenGraph, JSON-LD på alle hovedsider
- Gode sikkerhetsheaders i `vercel.json`
- Cookiefri Vercel Analytics
- Rent TypeScript med strict mode
- Konsistent visuell design
- Korrekt Next.js-patterns (Suspense, metadata-exports, redirects)
