---
phase: 09-teambuilding
plan: 01
subsystem: ui
tags: [next-image, json-ld, schema-org, teambuilding, seo]

# Dependency graph
requires:
  - phase: 04-sidebygging
    provides: Teambuilding page skeleton with products array and references
  - phase: 02-innhenting
    provides: Scraped teambuilding images (6 JPEGs)
  - phase: 07-seilturer
    provides: ContactForm useSearchParams pattern for ?tjeneste= pre-selection
provides:
  - Teambuilding page with real event images on product cards
  - JSON-LD Product schema for all 6 teambuilding products
  - Visual reference section with card grid layout
  - CTA links with pre-selected service in contact form
affects: [16-seo-polering, 12-kontakt]

# Tech tracking
tech-stack:
  added: []
  patterns: [dynamic-json-ld-from-data-array, schemaPrices-lookup-map]

key-files:
  created: []
  modified:
    - src/app/teambuilding/page.tsx

key-decisions:
  - "Gjenbrukte ContactForm useSearchParams-stotte fra fase 7, ingen endringer i ContactForm.tsx"
  - "Dynamisk JSON-LD generert fra products-array med schemaPrices-oppslag, ikke duplisert statisk schema"
  - "Referanseseksjon som grid-kort (2 kolonner mobil, 3 kolonner tablet+) med lenke til /referanser"

patterns-established:
  - "schemaPrices Record: Separat prisoppslag for schema.org-data, holder UI-priser og schema-priser adskilt"

requirements-completed: [PAGE-04, CONT-04]

# Metrics
duration: 7min
completed: 2026-03-31
---

# Phase 9 Plan 01: Teambuilding Summary

**Teambuilding-side med ekte arrangementsbilder, JSON-LD Product schema for 6 produkter, og visuelt referansegrid med CTA til kontaktskjema**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-31T17:00:03Z
- **Completed:** 2026-03-31T17:07:28Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- 6 produktkort viser ekte bilder fra teambuilding-arrangementer med next/image fill og object-cover
- JSON-LD Product schema med @graph-struktur generert dynamisk fra products-array, inkluderer pris, bilde-URL, merke og tilgjengelighet
- Referanseseksjon oppgradert fra ren tekst til responsivt kortgrid med "Se alle referanser"-lenke
- Alle CTA-knapper ruter til /kontakt?tjeneste=Teambuilding (og /kontakt?tjeneste=Foredrag%2FJTI for JTI-seksjonen)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add images to product cards and enable CTA pre-selection** - `5db9f49` (feat)
2. **Task 2: Add JSON-LD Product schema and upgrade references section** - `75967fe` (feat)

## Files Created/Modified
- `src/app/teambuilding/page.tsx` - Teambuilding-side med bilder, JSON-LD, referansegrid og CTA-lenker (342 linjer)

## Decisions Made
- Gjenbrukte ContactForm useSearchParams-stotte fra fase 7, ingen endringer i ContactForm.tsx eller kontakt/page.tsx
- Dynamisk JSON-LD generert fra products-array med schemaPrices Record-oppslag, unngikk duplisering av produktdata
- Referanseseksjon som grid med bg-white rounded-xl kort, konsistent med prosjektets designsprak

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Enhancement] Pre-commit hook added openGraph metadata**
- **Found during:** Task 2 commit
- **Issue:** Teambuilding-siden manglet openGraph metadata for sosiale medier
- **Fix:** Pre-commit hook la til openGraph title, description og images automatisk
- **Files modified:** src/app/teambuilding/page.tsx
- **Verification:** Build passerer, metadata synlig i filens metadata-eksport
- **Committed in:** 75967fe (Task 2 commit)

---

**Total deviations:** 1 auto-enhanced (openGraph metadata)
**Impact on plan:** Forbedring av SEO/deling, ingen scope creep.

## Issues Encountered
- Pre-commit hook la til en statisk teambuildingSchema under Task 1-commit; erstattet med dynamisk productSchema i Task 2 for bedre vedlikeholdbarhet

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Teambuilding-siden er produksjonsklar med bilder, schema og CTA-routing
- /referanser-siden eksisterer allerede (fase 14)
- Kontaktskjema fungerer med ?tjeneste= pre-seleksjon fra fase 7

## Self-Check: PASSED

- FOUND: src/app/teambuilding/page.tsx
- FOUND: .planning/phases/09-teambuilding/09-01-SUMMARY.md
- FOUND: 5db9f49 (Task 1 commit)
- FOUND: 75967fe (Task 2 commit)
- FOUND: 2b46171 (Docs commit)

---
*Phase: 09-teambuilding*
*Completed: 2026-03-31*
