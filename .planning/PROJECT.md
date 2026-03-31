# Wannado - Ny nettside

## What This Is

Ny Next.js 16 nettside for Wannado, en opplevelsesbasert bedrift i Arendal som tilbyr seilturer med Listerskøyta Havsul fra 1933, kajakkturer og kurs, teambuilding for bedrifter, hesteopplevelser og JTI-foredrag. Erstatter en utdatert WordPress/Divi-side med SEO-score 3/10.

## Core Value

Konvertere turister og bedrifter til å booke opplevelser med Wannado via en rask, vakker nettside som rangerer topp 3 for kjernesøkeord innen 6 måneder.

## Requirements

### Validated

- ✓ Next.js 16 app kjører fra root, klar for Vercel -- fase 1
- ✓ Innhold og bilder hentet fra wannado.no (131 bilder, 10 sider) -- fase 2
- ✓ SVG-logo og Havsul-bilde lastet ned -- fase 2
- ✓ Sider bygget: /, /seilturer, /kajakkturer, /opplevelser, /teambuilding, /foredrag, /kontakt -- fase 4
- ✓ Kontaktskjema med API-route -- fase 4
- ✓ Navbar med ekte logo, 5 navigasjonspunkter -- fase 4
- ✓ Gjenbrukbare UI-komponenter: ServiceCard, SectionHeader, ContactForm -- fase 4

### Active

- [ ] Sanity CMS oppsett (krever brukerinteraksjon: npx sanity init)
- [ ] Blogg (/blog og /blog/[slug]) for SEO
- [ ] Bilder fra scraped/ integrert på alle sider
- [ ] Resend e-postintegrasjon for kontaktskjema
- [ ] Hesteopplevelser-side (/hest)
- [ ] Om oss / Menneskene-sider polert
- [ ] Sitemap, robots.txt, JSON-LD LocalBusiness ✓ (fase 5)
- [ ] Vercel deploy og domene-konfigurasjon

### Out of Scope

- Automatisk bookingsystem, bruker manuell kontaktflyt (ingen eksisterende API funnet)
- Betalingsintegrasjon, ikke relevant for nåværende forretningsmodell
- Flerspråklig støtte, norsk first, engelsk later
- Mobil-app, web-first

## Context

**Nåværende side:** https://wannado.no/ (WordPress + Divi v4.27.6)
**Hosting:** Apache med Varnish-cache
**Ny stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript
**Deploy:** Vercel (settes opp)
**CMS:** Sanity (planlagt, ikke satt opp ennå)

**To nøkkelpersoner:**
- Tone Pernille Sivertsen: teambuilding, JTI/NLP, hesteopplevelser. tp@wannado.no, +47 99 46 99 57
- Roar Laugerud: kajakk, seilturer, ekspedisjoner. roar@wannado.no, +47 94 82 67 10

**Fargepalett:** Brun #48382B (primær), Teal #00838f (aksent), Cream #faf8f4 (bakgrunn)

## Constraints

- **SEO:** Title tags, meta descriptions og structured data er kritisk, nåværende side mangler alt
- **Mobil-først:** Alle sider skal fungere perfekt på mobil
- **Norsk tekst:** Alltid æøå, aldri ASCII-erstatninger
- **Booking:** Kun kontaktskjema/telefon, ingen ekstern booking-API

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 + Tailwind v4 | Allerede valgt av utvikler | Pending |
| Sanity CMS | Klientredigering av blogg og innhold | Pending |
| Ingen booking-API | Wannado bruker manuell bookingflyt | ✓ Good |
| Root-mappe deploy | Enklere Vercel-setup enn subdirectory | ✓ Good |

---
*Last updated: 2026-03-31 after initial build*
