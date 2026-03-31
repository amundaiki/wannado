# Roadmap: Wannado nettside

**Created:** 2026-03-31
**Phases:** 6

## Phase Overview

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 1 | Mappestruktur | Next.js fra root | ✓ Complete |
| 2 | Innhenting | Innhold og bilder fra wannado.no | ✓ Complete |
| 3 | Grunnkomponenter | Logo, UI-komponenter, navigasjon | ✓ Complete |
| 4 | Sidebygging | Alle konverteringssider | ✓ Complete |
| 5 | SEO og infrastruktur | Sitemap, robots, JSON-LD | ◆ In Progress |
| 6 | CMS og polering | Sanity, blogg, e-post, deploy | ○ Pending |

## Phase 5: SEO og infrastruktur

**Goal:** Legge til teknisk SEO-grunnlag: sitemap, robots.txt, JSON-LD structured data, og 301-redirects fra gamle WordPress-URLer.

**Requirements:** SEO-01, SEO-02, SEO-03, SEO-05

**Success criteria:**
1. /sitemap.xml returnerer XML med alle 11 URL-er
2. /robots.txt returnerer robots-instruksjoner
3. Forside har JSON-LD LocalBusiness schema
4. 301-redirect: /kulturvandring-med-sjarmerende-treskoyte -> /seilturer

## Phase 6: CMS, blogg og deploy

**Goal:** Sanity CMS satt opp, blogg live, kontaktskjema sender e-post, Vercel deploy.

**Requirements:** CMS-01 til CMS-04, PAGE-08, PAGE-09, FORM-03, STRUCT-03

**Success criteria:**
1. `npx sanity@latest init` kjørt og prosjekt opprettet
2. /blog viser bloggposter fra Sanity
3. Kontaktskjema sender e-post via Resend
4. wannado.no peker på Vercel deployment

**Manual step required:**
```bash
npx sanity@latest init
# Velg: Create new project
# Project name: wannado
# Dataset: production
# Project output path: sanity
```

---
*Roadmap created: 2026-03-31*
