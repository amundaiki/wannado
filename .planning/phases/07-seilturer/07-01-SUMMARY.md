---
phase: 07-seilturer
plan: 01
subsystem: ui
tags: [next-image, json-ld, schema-org, tourist-trip, seo, gallery, query-params]

# Dependency graph
requires:
  - phase: 04-sidebygging
    provides: Existing /seilturer page structure
  - phase: 02-innhenting
    provides: Scraped sailing images in public/images/scraped/sailing/
  - phase: 03-navigasjon
    provides: ContactForm component
provides:
  - Polished /seilturer page with real image gallery
  - JSON-LD TouristTrip structured data for SEO
  - ContactForm query param pre-selection pattern (?tjeneste=)
affects: [08-kajakkturer, 09-teambuilding, 10-foredrag, 16-seo-polering]

# Tech tracking
tech-stack:
  added: []
  patterns: [JSON-LD TouristTrip schema, CTA-to-contact query param routing, useSearchParams in ContactForm]

key-files:
  created: []
  modified:
    - src/app/seilturer/page.tsx
    - src/components/ui/ContactForm.tsx
    - src/app/kontakt/page.tsx

key-decisions:
  - "Brukte useSearchParams i ContactForm for a lese ?tjeneste= fra URL, med Suspense boundary i kontakt/page.tsx"
  - "Valgte 6 unike bilder fra scraped/sailing/, hoppet over duplikater (hav-1-2-1, hav-1-2-2)"
  - "JSON-LD TouristTrip med to Offer-objekter for per-person og charter-pris"

patterns-established:
  - "CTA query param routing: Tjenestesider lenker til /kontakt?tjeneste=TjenesteNavn for pre-seleksjon"
  - "JSON-LD per tjenesteside: TouristTrip/Product schema med offers-array"
  - "Bildegalleri-moenster: responsive grid 1/2/3 kolonner med next/image width/height og aspect-ratio container"

requirements-completed: [PAGE-02, CONT-04]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 7 Plan 1: Seilturer Summary

**Seilturside med 6-bilders galleri, JSON-LD TouristTrip schema (350/3500 NOK), og CTA-routing med pre-seleksjon i kontaktskjema**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T16:41:24Z
- **Completed:** 2026-03-31T16:43:55Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Lagt til responsivt bildegalleri med 6 ekte seilbilder i 3-kolonne grid (desktop), 2 (tablet), 1 (mobil)
- JSON-LD TouristTrip structured data med to prisnivaaer og itinerary for SEO-synlighet
- CTA-knapper paa seiltursiden ruter til /kontakt?tjeneste=Seilturer
- ContactForm leser ?tjeneste= parameter fra URL og pre-velger riktig tjeneste i dropdown

## Task Commits

Each task was committed atomically:

1. **Task 1: Add image gallery, JSON-LD TouristTrip schema, and CTA query params** - `077d4cc` (feat)
2. **Task 2: Add defaultService prop to ContactForm for CTA pre-selection** - `5db0baa` (feat)

## Files Created/Modified
- `src/app/seilturer/page.tsx` - Galleri, JSON-LD TouristTrip, CTA query params
- `src/components/ui/ContactForm.tsx` - useSearchParams for ?tjeneste= pre-seleksjon
- `src/app/kontakt/page.tsx` - Suspense boundary rundt ContactForm

## Decisions Made
- Brukte useSearchParams i ContactForm for aa lese ?tjeneste= fra URL, med Suspense boundary i kontakt/page.tsx for Next.js kompatibilitet
- Valgte 6 unike bilder fra scraped/sailing/, hoppet over duplikater (hav-1-2-1, hav-1-2-2)
- JSON-LD TouristTrip med to Offer-objekter: per-person (350 NOK) og charter (3500 NOK per time)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CTA query param moenster er etablert og kan gjenbrukes for kajakkturer, teambuilding, foredrag
- JSON-LD TouristTrip moenster kan tilpasses til Product schema for andre tjenester
- ContactForm stotter naa alle tjenestesider via ?tjeneste= parameter

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 07-seilturer*
*Completed: 2026-03-31*
