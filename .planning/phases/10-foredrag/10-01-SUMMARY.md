---
phase: 10-foredrag
plan: 01
subsystem: ui
tags: [next-image, json-ld, schema-org, event-schema, seo]

# Dependency graph
requires:
  - phase: 04-sidebygging
    provides: Foredragsside med tekst, priser og kontaktinfo
provides:
  - Foredragsside med ekte bilder og JSON-LD Event schema
affects: [16-seo-polering]

# Tech tracking
tech-stack:
  added: []
  patterns: [card-with-image-header, json-ld-event-array]

key-files:
  created: []
  modified:
    - src/app/foredrag/page.tsx

key-decisions:
  - "Restructured cards to separate image area from padded content (overflow-hidden pattern)"
  - "Used JSON-LD array with two Event objects instead of separate script tags"
  - "Omitted startDate from Event schema since lectures are on-demand bookable"

patterns-established:
  - "Card with image header: overflow-hidden on card, aspect-[3/2] image container, separate p-8 content div"
  - "JSON-LD Event array: Multiple events in single script tag using JSON.stringify on array"

requirements-completed: [PAGE-05]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 10 Plan 01: Foredrag Summary

**Foredragsside med ekte bilder (JTI + Gronland) og JSON-LD Event schema for begge foredrag**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T16:48:33Z
- **Completed:** 2026-03-31T16:51:18Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- JTI-kortet viser tp-typeteori.jpg (Tone Pernille med Typeforstaelse-boken) via next/image
- Gronlandskortet viser kimmiut-gronland-1920.jpg som hero + isfjell-gronland-1.jpg som thumbnail
- JSON-LD med to Event-objekter: JTI (Tone Pernille, to Offers) og Gronlandsekspeditionen (Roar)
- Alle priser og kontaktinfo bevart eksakt

## Task Commits

Each task was committed atomically:

1. **Task 1: Add images to JTI and Gronland cards** - `ce8c80d` (feat)
2. **Task 2: Add JSON-LD Event schema for both lectures** - `61ddf06` (feat)

## Files Created/Modified
- `src/app/foredrag/page.tsx` - Restructured lecture cards with images, added JSON-LD Event schema array

## Decisions Made
- Restructured cards to have separate image container (aspect-[3/2]) and padded content area, matching the plan's "best approach" recommendation
- Used a single JSON-LD script tag with an array of two Event objects (consistent with how multiple events should be represented)
- Omitted startDate from Event schema since these are on-demand bookable lectures, not fixed-date events

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Foredragssiden er ferdig med bilder og strukturert data
- Klar for fase 11 (Om oss) eller videre SEO-polering i fase 16

## Self-Check: PASSED

- FOUND: src/app/foredrag/page.tsx
- FOUND: .planning/phases/10-foredrag/10-01-SUMMARY.md
- FOUND: commit ce8c80d (Task 1)
- FOUND: commit 61ddf06 (Task 2)

---
*Phase: 10-foredrag*
*Completed: 2026-03-31*
