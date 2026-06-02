# Pitfalls Research

## Critical Pitfalls

### 1. SEO Redirect Loss
**What goes wrong:** Gamle URLer fra WordPress returnerer 404 etter migrasjon. Google deindekserer sidene.
**Why it happens:** URL-strukturen endres fra WordPress-slugs til nye ruter.
**How to avoid:** 301-redirects i `next.config.ts` for alle gamle URLer. Verifiser med `curl -I`.
**Warning signs:** Google Search Console rapporterer økning i 404-feil.
**Phase to address:** Phase 5 (SEO-grunnlag)

### 2. Tailwind CSS v4 Breaking Changes
**What goes wrong:** Klasser som `bg-opacity-50` fungerer ikke. `tailwind.config.js` ignoreres.
**Why it happens:** Tailwind v4 bruker CSS-native `@theme` i stedet for JavaScript-konfig. Opacity-modifiers er erstattet med `bg-black/50`-syntaks.
**How to avoid:** Bruk CSS `@theme`-blokk i `globals.css`. Sjekk migreringsguiden.
**Warning signs:** Stiler rendrer ikke, ingen feilmeldinger.
**Phase to address:** Phase 1 (oppsett)

### 3. Framer Motion + Server Components
**What goes wrong:** `motion.div` brukt i en Server Component gir hydration-feil.
**Why it happens:** Framer Motion krever `"use client"` fordi den bruker React hooks og DOM-tilgang.
**How to avoid:** Alltid `"use client"` på komponenter med Framer Motion. Hold animasjonskomponenter som leaf nodes.
**Warning signs:** Hydration mismatch errors i konsollen.
**Phase to address:** Alle faser med UI-arbeid

### 4. Bildestørrelser ødelegger Core Web Vitals
**What goes wrong:** LCP > 2.5s, CLS > 0.1 fordi bilder mangler dimensjoner eller er for store.
**Why it happens:** `<img>` uten width/height, eller store JPG-filer uten next/image-optimalisering.
**How to avoid:** Alltid bruk `next/image` med eksplisitte `width` og `height`. Bruk `priority` på hero-bilder.
**Warning signs:** Lighthouse Performance under 90.
**Phase to address:** Phase 6+ (alle sider med bilder)

### 5. DNS Cutover Nedetid
**What goes wrong:** wannado.no er nede i timer under DNS-bytte fra Apache til Vercel.
**Why it happens:** TTL på DNS-records er for høy, eller CNAME/A-record er feil konfigurert.
**How to avoid:** Sett TTL til 300 (5 min) minst 24 timer før cutover. Bruk Vercel CLI for å verifisere domene. Test med `dig` og `curl`.
**Warning signs:** Site returnerer gammel Apache-side etter DNS-endring.
**Phase to address:** Phase 17 (deploy)

### 6. Kontaktskjema-spam
**What goes wrong:** Hundrevis av spam-meldinger via kontaktskjemaet.
**Why it happens:** Ingen rate limiting eller bot-deteksjon på API-ruten.
**How to avoid:** Honeypot-felt, rate limiting, eventuelt Turnstile (Cloudflare CAPTCHA).
**Warning signs:** Økning i irrelevante kontaktskjema-innsendinger.
**Phase to address:** Phase 12 (kontakt) / Phase 18 (sikkerhet)

### 7. Manglende Error Boundaries
**What goes wrong:** En feil i en komponent krasjer hele siden med en hvit skjerm.
**Why it happens:** Ingen `error.tsx` eller `not-found.tsx` filer.
**How to avoid:** Legg til `error.tsx` og `not-found.tsx` i app-roten.
**Warning signs:** Brukere rapporterer hvit skjerm.
**Phase to address:** Phase 18 (kodekvalitet)

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|---------|------------------|---------------|----------------|
| Hardkodet innhold | Rask utvikling, ingen CMS-oppsett | Klienten kan ikke redigere | Pre-launch, migrerer til Sanity i fase 15 |
| Manuell Navbar/Footer import | Eksplisitt, enkelt | Duplisering ved endringer | Alltid OK for <20 sider |
| Ingen tester | Raskere utvikling | Regresjoner ved endringer | Akseptabelt for statisk markedsføringsside |
| Ingen error boundaries | Mindre filer | Hvit skjerm ved feil | Bare pre-launch |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|------------|---------------|-----------------|
| Resend API | Hardkode API-nøkkel i koden | Bruk `RESEND_API_KEY` env var |
| Google Maps embed | Bruke Maps JavaScript API (krever billing) | Bruk enkel iframe embed (gratis) |
| Vercel Analytics | Importere i layout uten `"use client"` | `<Analytics />` er en client component, importer i layout |
| next/image remote | Glemme å konfigurere `remotePatterns` | Bruk lokale bilder i `public/` (allerede gjort) |
| JSON-LD | Bruke `dangerouslySetInnerHTML` | Bruk `<script type="application/ld+json">` med `JSON.stringify` |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|-----------|----------------|
| Unoptimaliserte bilder | LCP > 4s | next/image med width/height | Hver side med hero-bilde |
| For mange Framer Motion-animasjoner | Janky scroll, høyt CPU | `will-change: transform`, `useReducedMotion` | Mobil med mange seksjoner |
| Google Fonts blocking render | FCP forsinket | `next/font/google` med `display: swap` | Allerede løst |
| Stor JavaScript-bundle | TTI > 5s | Dynamisk import for tunge komponenter | Hvis bundle > 300kb |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|------------|----------------|
| CTA som bare sier "Kontakt oss" | Ingen kontekst om hva bruker kontakter for | CTA med tjeneste-kontekst: "Book seiltur" |
| Telefonnummer uten `tel:`-lenke | Mobilbrukere må kopiere manuelt | `<a href="tel:+4799469957">` |
| Bildegalleri uten lazy loading | Treg lasting av sider med mange bilder | next/image med standard lazy loading |
| Manglende breadcrumbs | Bruker vet ikke hvor de er | Vurder for dype sider (blogg) |

## "Looks Done But Isn't" Checklist

- [ ] Alle bilder har alt-tekst (tilgjengelighet + SEO)
- [ ] Alle lenker har meningsfull tekst (ikke "klikk her")
- [ ] Kontaktskjema har feilmeldinger og loading-state
- [ ] 301-redirects fra alle gamle WordPress-URLer
- [ ] Meta description på alle sider (unike, ikke dupliserte)
- [ ] OG-bilder generert for alle sider
- [ ] Favicon og apple-touch-icon
- [ ] robots.txt blokkerer ikke viktige sider
- [ ] sitemap.xml inkluderer alle offentlige sider

## Sources

- Tailwind v4 migration: https://tailwindcss.com/docs/upgrade-guide
- Next.js SEO: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Core Web Vitals: https://web.dev/vitals/
- Resend docs: https://resend.com/docs

---
*Research: 2026-03-31*
