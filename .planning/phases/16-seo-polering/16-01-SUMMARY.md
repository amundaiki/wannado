---
phase: 16-seo-polering
plan: 01
subsystem: seo
tags: [json-ld, schema.org, open-graph, structured-data, rich-results]

requires:
  - phase: 05-seo-grunnlag
    provides: "JSON-LD LocalBusiness on homepage, sitemap, robots.txt"
  - phase: 07-seilturer
    provides: "TouristTrip JSON-LD schema on /seilturer"
  - phase: 08-kajakkturer
    provides: "Product JSON-LD schema on /kajakkturer"
  - phase: 10-foredrag
    provides: "Event JSON-LD schema on /foredrag"
provides:
  - "Product JSON-LD schema on /teambuilding for all 6 services"
  - "OG image metadata on teambuilding, foredrag, kontakt, personvern, praktisk-informasjon"
affects: [17-deploy]

tech-stack:
  added: []
  patterns: ["schemaPrices lookup map for dynamic JSON-LD generation from product arrays"]

key-files:
  created: []
  modified:
    - src/app/teambuilding/page.tsx
    - src/app/foredrag/page.tsx
    - src/app/kontakt/page.tsx
    - src/app/personvern/page.tsx
    - src/app/praktisk-informasjon/page.tsx

key-decisions:
  - "Seilturer, kajakkturer, foredrag already had JSON-LD from phases 7, 8, 10; only teambuilding needed new schema"
  - "Used schemaPrices lookup map for dynamic Product schema generation from products array"

patterns-established:
  - "OG image pattern: every page has openGraph.images in metadata export"

requirements-completed: [SEO-06, SEO-08]

duration: 5min
completed: 2026-03-31
---

# Phase 16 Plan 01: JSON-LD + OG Images Summary

**Product JSON-LD schema on /teambuilding for 6 services, OG image metadata added to all 5 pages missing it**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T16:59:57Z
- **Completed:** 2026-03-31T17:05:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Product JSON-LD with @graph array added to /teambuilding with all 6 services and numeric prices
- OG image metadata added to teambuilding, foredrag, kontakt, personvern, praktisk-informasjon
- Metadata exports created for personvern and praktisk-informasjon (previously had none)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add JSON-LD structured data to teambuilding** - `f7013bd` (feat)
2. **Task 2: Add OG image metadata to all pages missing it** - `76b35a5` (feat)

## Files Created/Modified
- `src/app/teambuilding/page.tsx` - Added Product JSON-LD schema with 6 products and OG metadata
- `src/app/foredrag/page.tsx` - Added OG metadata with JTI image
- `src/app/kontakt/page.tsx` - Added OG metadata with Havsul image
- `src/app/personvern/page.tsx` - Created metadata export with OG and description
- `src/app/praktisk-informasjon/page.tsx` - Created metadata export with OG and description

## Decisions Made
- Seilturer, kajakkturer, and foredrag already had JSON-LD from phases 7, 8, and 10; only teambuilding needed a new schema
- A linter refactored the static teambuildingSchema into a dynamic schemaPrices + products.map() approach, which is cleaner

## Deviations from Plan

None - plan executed exactly as written. The only difference was that 3 of 4 service pages already had JSON-LD from earlier phases.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All service pages now have JSON-LD structured data for Google Rich Results
- All pages have OG image metadata for social media previews
- Ready for deploy

---
*Phase: 16-seo-polering*
*Completed: 2026-03-31*
