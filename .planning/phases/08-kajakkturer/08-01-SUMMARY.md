---
phase: 08-kajakkturer
plan: 01
subsystem: ui
tags: [next-image, json-ld, schema-org, product-schema, tourist-trip, seo, kayak]

# Dependency graph
requires:
  - phase: 04-sidebygging
    provides: "/kajakkturer page route and basic layout"
  - phase: 02-innhenting
    provides: "56 kayak images in public/images/scraped/kayak/"
  - phase: 07-seilturer
    provides: "ContactForm with useSearchParams for tjeneste pre-selection"
provides:
  - "Kajakkturer page with 10 real images across hero, courses, tours, and guide profile"
  - "JSON-LD Product schema for 6 kayak courses with NOK prices"
  - "JSON-LD TouristTrip schema for 2 guided tours"
  - "CTA button wired to /kontakt?tjeneste=Kajakktur"
affects: [16-seo-polering]

# Tech tracking
tech-stack:
  added: []
  patterns: [json-ld-product-schema, image-per-course-card, cta-query-param-routing]

key-files:
  created: []
  modified:
    - src/app/kajakkturer/page.tsx

key-decisions:
  - "Reused ContactForm searchParams support from Phase 7 instead of modifying ContactForm again"
  - "Used ItemList wrapper around Product schemas for better search engine parsing of course catalog"
  - "Mapped each course image to match skill level visually (calm water for intro, heavy surf for advanced)"

patterns-established:
  - "Course card with image: relative h-40 image container above p-8 text content in overflow-hidden rounded-2xl card"
  - "JSON-LD Product schema pattern with Offer, price string, NOK currency, InStock availability"

requirements-completed: [PAGE-03, CONT-04, SEO-06]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 8 Plan 01: Kajakkturer Summary

**Kajakkturer page polished with 10 real kayak images, JSON-LD Product schema for 6 courses, TouristTrip schema for guided tours, and CTA pre-selecting Kajakktur on contact form**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T16:48:21Z
- **Completed:** 2026-03-31T16:52:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced all placeholder/generic images with 10 curated kayak photos matched to context (hero, 6 courses, 2 guided tours, guide profile)
- Added JSON-LD Product schema for all 6 kayak courses with correct NOK prices and booking URLs
- Added JSON-LD TouristTrip schema for Skjaergardssafari and Fyr til fyr guided tours
- Wired CTA button to /kontakt?tjeneste=Kajakktur for contact form pre-selection

## Task Commits

Each task was committed atomically:

1. **Task 1: Add images to hero, course cards, guided tours, and guide profile** - `d48622b` (feat)
2. **Task 2: Add JSON-LD Product schema and wire CTA to pre-select contact form** - `6fabf55` (feat)

## Files Created/Modified

- `src/app/kajakkturer/page.tsx` - Complete kayak page with real images, JSON-LD schemas, and CTA routing (513 lines)

## Decisions Made

- Reused ContactForm useSearchParams support already implemented in Phase 7, avoiding duplicate modification
- Used schema.org ItemList as wrapper for Product entries to present courses as a structured catalog
- Each course image hand-matched to skill level: calm water for intro, beach setup for grunnkurs, overhead technique shot, rescue training, heavy surf, and campfire expedition

## Deviations from Plan

None - plan executed exactly as written. ContactForm Part C was already complete from Phase 7 (useSearchParams with tjeneste param), so no changes were needed to ContactForm.tsx.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Kajakkturer page is production-ready with images, SEO schema, and CTA routing
- Pattern established for remaining service pages (Teambuilding, Foredrag) to follow same image + JSON-LD + CTA approach
- All 56 kayak images available in scraped/kayak/ for future use

---
*Phase: 08-kajakkturer*
*Completed: 2026-03-31*
