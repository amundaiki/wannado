# Research Summary

## Executive Summary

Wannado er et opplevelsesselskap i Arendal som tilbyr seilturer med Listerskøyta Havsul, kajakkturer og kurs, teambuilding, hesteopplevelser og foredrag. Den eksisterende WordPress/Divi-siden har SEO-score 3/10 med kritiske mangler: title tags er rene URLer, ingen meta descriptions, ingen structured data, og PHP 7.4.

Ny nettside bygges med Next.js 16 + React 19 + Tailwind v4 for Vercel-deploy. Fokus er på visuell kvalitet (opplevelsesselskap selger visuelt), SEO-infrastruktur (metadata, JSON-LD, sitemap), og konvertering via kontaktskjema med tjeneste-forhåndsvalg. Ingen booking-API eksisterer; all booking skjer manuelt via telefon og e-post.

## Key Findings

### Recommended Stack (fra STACK.md)
- **Core:** Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion
- **Deploy:** Vercel med automatisk SSL og CDN
- **CMS:** Sanity (planlagt post-launch for blogg)
- **E-post:** Resend for kontaktskjema
- **Analytics:** Vercel Analytics (cookieless, GDPR-vennlig)

### Expected Features (fra FEATURES.md)
- **Must have:** Tjenestesider med bilder, kontaktskjema, SEO-metadata, responsivt design, Vercel deploy
- **Should have:** Scroll-animasjoner, testimonials, OG-bilder, JSON-LD structured data
- **Defer:** Blogg/CMS (post-launch), hesteopplevelser-side, flerspråklig

### Architecture Approach (fra ARCHITECTURE.md)
- Section-basert komposisjon: forsiden bygget av uavhengige seksjonskomponenter
- Hardkodet innhold med klar migreringssti til Sanity CMS
- Statisk rendering som standard, client components kun for animasjoner
- Manuell layout-komposisjon (Navbar/Footer per side)

### Critical Pitfalls (fra PITFALLS.md)
1. **SEO redirect loss:** 301-redirects fra alle WordPress-URLer er kritisk
2. **Tailwind v4 syntax:** CSS `@theme` i stedet for `tailwind.config.js`
3. **Framer Motion + RSC:** Krever `"use client"` på alle animerte komponenter
4. **Bildestørrelser:** next/image med eksplisitte dimensjoner for CWV
5. **DNS cutover:** Sett TTL til 300 før domenebytte

## Implications for Roadmap

### Phase 1-4: Grunnlag
**Rationale:** Mappestruktur, innhenting, navigasjon og stub-sider gir et skjelett å bygge på.
**Delivers:** Kjørende Next.js-app med alle ruter.
**Addresses:** Prosjektstruktur, komponentbibliotek.
**Avoids:** Over-engineering med CMS for tidlig.

### Phase 5: SEO-grunnlag
**Rationale:** SEO-infrastruktur før individuelle sider sikrer at alt er indekserbart fra dag 1.
**Delivers:** Sitemap, robots.txt, JSON-LD LocalBusiness, redirects.
**Addresses:** Kritisk SEO-gap fra gammel side.
**Avoids:** Miste Google-indeksering under migrasjon.

### Phase 6-14: Sidebygging
**Rationale:** Parallelliserbare: forside + tjenestesider + støttesider kan bygges uavhengig.
**Delivers:** Alle kundevendte sider med ekte bilder, innhold og JSON-LD.
**Addresses:** Visuell kvalitet, SEO per side.
**Avoids:** Serielt flaskehals; bruk parallelle agenter.

### Phase 16: SEO-polering
**Rationale:** Avansert SEO etter at alle sider er bygget.
**Delivers:** OG-bilder, Product/Event schema, Analytics.
**Addresses:** Social sharing, rich snippets.

### Phase 17: Deploy
**Rationale:** Deploy før blogg; en fungerende side er viktigere enn content marketing.
**Delivers:** Produksjons-URL, SSL, DNS.
**Addresses:** Nåværende sites kritiske tilstand.

### Phase 15: Blogg + CMS (post-launch)
**Rationale:** Utsatt til etter launch. Sanity CMS krever brukerinteraksjon og opplæring.
**Delivers:** Redigerbart innhold, blogg for langsiktig SEO.

### Research Flags
- **Fase 15 (Blogg + CMS):** Trenger dyp research. Sanity-skjemaer, GROQ-spørringer, ISR-oppsett.
- **Fase 17 (Deploy):** Trenger research om DNS-strategi for å minimere nedetid.
- **Fase 6-14:** Kan hoppe over research; standard implementasjon av tjenestesider.

## Confidence Assessment

| Area | Confidence | Notes |
|------|-----------|-------|
| Stack-valg | High | Velprøvd kombinasjon, allerede i bruk |
| SEO-strategi | High | Klare mangler å fikse, kjent løsningsrom |
| Designretning | High | Brun/teal fargepalett, leken men enkel |
| CMS-migrasjon | Medium | Sanity er valgt men ikke testet |
| Booking-flyt | High | Manuell via kontaktskjema, bekreftet av kunden |
| Deploy/DNS | Medium | Avhenger av tilgang til DNS-panel |

## Gaps to Address

1. **Hesteopplevelser-side** (/hest) er ikke planlagt i nåværende roadmap
2. **Booking-API** finnes ikke; må bekreftes at manuell flyt er langsiktig løsning
3. **E-postliste/nyhetsbrev** er utelatt, men kan bli relevant for content marketing
4. **Bilderettigheter** fra scraped WordPress-innhold er antatt OK, men ikke verifisert
5. **Google Search Console** bør settes opp ved deploy for å overvåke indeksering

## Sources

**Primary (high confidence):**
- Wannado.no eksisterende side (scraped innhold og bilder)
- SEO-revisjon: `.obsidian/06_Resources/SEO-revisjon-wannado-2026-03-30.md`
- Konkurranseanalyse: `.obsidian/06_Resources/COMPETITOR-ANALYSIS.md`

**Secondary (medium confidence):**
- Next.js 16 dokumentasjon
- Tailwind v4 migreringsguide
- Vercel deploy-dokumentasjon

**Tertiary (low confidence):**
- Bransjedata for opplevelsessektoren i Sørlandet
- Generelle SEO best practices

---
*Research summary: 2026-03-31*
