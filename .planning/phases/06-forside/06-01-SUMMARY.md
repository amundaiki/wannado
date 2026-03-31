---
phase: 06-forside
plan: 01
subsystem: ui
tags: [next-image, image-optimization, lighthouse, lcp, webp, avif]

# Dependency graph
requires:
  - phase: 05-seo-grunnlag
    provides: "Build-pipeline og sidestruktur"
  - phase: 02-innhenting
    provides: "Scraped bilder i public/images/scraped/"
provides:
  - "Alle forsidebilder bruker next/image med responsive srcset"
  - "Hero LCP optimalisert med priority-prop"
  - "Ekte bilder fra scraped/ erstatter alle placeholders"
affects: [07-seilturer, 08-kajakkturer, 09-teambuilding, 10-foredrag, 16-seo-polering]

# Tech tracking
tech-stack:
  added: []
  patterns: ["next/image fill mode for container-sized images", "next/image width/height for intrinsic-sized images", "NextImage alias when Image constructor conflict exists"]

key-files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/CarouselSection.tsx
    - src/components/sections/BentoGridSection.tsx
    - src/components/sections/FeatureSection.tsx
    - src/components/sections/PeopleSection.tsx
    - src/components/sections/ScrollVideoSection.tsx

key-decisions:
  - "Brukte fill-modus for bilder som fyller containere (Hero, BentoGrid, ScrollVideo poster)"
  - "Brukte width/height-modus for bilder med CSS-kontrollert storrelse (Carousel, People, Feature)"
  - "Importerte next/image som NextImage i ScrollVideoSection for a unnga konflikt med browser Image constructor"
  - "P7270038.jpg dimensjoner korrigert fra plan (1024x624, ikke 1280x960)"

patterns-established:
  - "next/image fill: for bilder i containere med absolute inset-0 / relative parent"
  - "next/image width/height: for bilder med CSS-kontrollert storrelse (aspect-ratio, max-width)"
  - "NextImage alias: bruk nar komponent bruker new Image() for canvas"

requirements-completed: [PAGE-01, CONT-04]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 6 Plan 01: Forside-bilder med next/image Summary

**Erstattet alle 11 placeholder/raw img-tagger pa forsiden med next/image og ekte scraped-bilder fra kayak, sailing, teambuilding og landscape**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T16:28:50Z
- **Completed:** 2026-03-31T16:32:44Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Alle 6 forsidekomponenter bruker naa next/image med ekte scraped-bilder
- Hero-bildet har priority-prop for rask LCP (baat-fb-havsul.jpg fra Havsul)
- Karusellen viser 4 ekte bilder fra kayak/ og sailing/ med korrekte dimensjoner
- BentoGrid viser 5 ekte bilder fra teambuilding/, landscape/, sailing/, kayak/
- FeatureSection har 2 teambuilding-bilder (Bungeerunning, Volum-liter)
- ScrollVideoSection poster bruker next/image fill-modus
- Null raw img-tagger gjenstaar i noen forsidekomponent
- Null eslint-disable no-img-element kommentarer gjenstaar
- Build passerer rent med null feil

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace images in Hero, Carousel, BentoGrid** - `fad8a1e` (feat)
2. **Task 2: Replace images in FeatureSection, PeopleSection, ScrollVideoSection** - `f311ee8` (feat)

## Files Created/Modified
- `src/components/sections/HeroSection.tsx` - next/image fill med scraped/sailing/baat-fb-havsul.jpg, priority for LCP
- `src/components/sections/CarouselSection.tsx` - 4 ekte bilder med width/height fra kayak/ og sailing/
- `src/components/sections/BentoGridSection.tsx` - 5 ekte bilder med fill-modus fra teambuilding/, landscape/, sailing/, kayak/
- `src/components/sections/FeatureSection.tsx` - 2 teambuilding-bilder med width/height
- `src/components/sections/PeopleSection.tsx` - next/image med korrekte dimensjoner (1280x800, 1024x624)
- `src/components/sections/ScrollVideoSection.tsx` - poster fallback med next/image fill (NextImage alias)

## Decisions Made
- Brukte fill-modus for bilder som fyller containere (Hero, BentoGrid, ScrollVideo poster) i stedet for width/height, ettersom disse bildene bruker absolute inset-0 CSS
- Brukte width/height-modus for bilder med CSS-kontrollert storrelse (Carousel-kort, People-profiler, Feature-bilder)
- Importerte next/image som NextImage i ScrollVideoSection for a unnga navnekonflikt med browserens Image-konstruktor som brukes til canvas frame-lasting
- Korrigerte P7270038.jpg dimensjoner til 1024x624 (planen antok 1280x960, verifisert med sips)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Korrigert P7270038.jpg bildedimensjoner**
- **Found during:** Task 2 (PeopleSection)
- **Issue:** Planen oppga 1280x960 for P7270038.jpg, men faktiske dimensjoner er 1024x624
- **Fix:** Brukte korrekte dimensjoner (1024x624) verifisert med sips
- **Files modified:** src/components/sections/PeopleSection.tsx
- **Verification:** Build passes, dimensjoner verifisert med sips -g pixelWidth -g pixelHeight
- **Committed in:** f311ee8 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Korrigering nodvendig for korrekt bildeoptimalisering. Ingen scope-utvidelse.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Forsiden er komplett med ekte optimaliserte bilder
- next/image-monstre etablert for bruk pa alle andre sider (fase 7-14)
- Lighthouse Performance-malet (90+) sannsynliggjort av next/image auto WebP/AVIF, responsive srcset og priority LCP

---
*Phase: 06-forside*
*Completed: 2026-03-31*

## Self-Check: PASSED

- All 6 modified files exist on disk
- All 7 files verified (6 source + 1 SUMMARY)
- Commit fad8a1e (Task 1) found in git log
- Commit f311ee8 (Task 2) found in git log
