---
phase: 11-om-oss
plan: 01
subsystem: ui
tags: [next-image, seo-metadata, team-profiles, company-history, redirects, server-component]

# Dependency graph
requires:
  - phase: 05-seo-grunnlag
    provides: redirect pattern in next.config.ts, SEO infrastructure
  - phase: 06-forside
    provides: next/image patterns, design token conventions
provides:
  - Combined /om-oss page with company history, team profiles, values, certifications, and CTA
  - 301 redirect from /menneskene to /om-oss
  - SEO-optimized metadata for Om oss page
affects: [16-seo-polering]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-component-page, certification-badges, pullquote-blockquote, value-cards-grid]

key-files:
  created: []
  modified:
    - src/app/om-oss/page.tsx
    - next.config.ts

key-decisions:
  - "Kept PeopleSection.tsx because homepage (src/app/page.tsx) imports it; only removed from om-oss"
  - "Used blockquote element for 'Hva er DIN lek?' pullquote with font-dm italic styling"
  - "Both profiles include phone numbers alongside email for better contact accessibility"

patterns-established:
  - "Certification badges: inline-block bg-teal/10 text-teal rounded-full spans"
  - "Pullquote: blockquote with font-dm italic, border-y, centered"
  - "Value cards: 3-column grid with icon, heading, description in bg-white rounded-2xl cards"

requirements-completed: [PAGE-10]

# Metrics
duration: 5min
completed: 2026-03-31
---

# Phase 11 Plan 01: Om Oss Summary

**Combined /om-oss page with company history, team profiles (Tone Pernille and Roar), certification badges, values section, and /menneskene 301 redirect**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T16:48:35Z
- **Completed:** 2026-03-31T16:54:31Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Redesigned /om-oss from a raw PeopleSection dump into a polished 333-line page with 5 distinct sections
- Full team profiles for Tone Pernille Sivertsen and Roar Laugerud with next/image, full bios from scraped content, certification badges, and contact info
- 301 redirect from /menneskene to /om-oss eliminates duplicate content
- SEO metadata with descriptive title, description, and OpenGraph tags
- Values section (Trygghet, Mestring, Lek) with icon cards following seilturer design pattern

## Task Commits

Both tasks were already committed in prior phase executions (discovered during verification):

1. **Task 1: Add /menneskene redirect and remove old page** - `024038d` (feat(14-01): opprett strukturerte referansedata)
   - Redirect was added as part of phase 14 execution
   - menneskene page was already removed from git tracking

2. **Task 2: Rebuild /om-oss as combined team + company page** - `dec7668` (docs(10-01): complete foredrag plan with summary and state updates)
   - Full page rewrite was committed during phase 10 completion

**Plan metadata:** (this commit)

## Files Created/Modified

- `src/app/om-oss/page.tsx` - Combined Om oss page: hero, company story, team profiles, values, CTA (333 lines)
- `next.config.ts` - Added /menneskene to /om-oss permanent redirect

## Decisions Made

1. **Kept PeopleSection.tsx** - The plan instructed deletion, but `src/app/page.tsx` (homepage) imports PeopleSection. Deleting it would break the homepage build. PeopleSection is no longer used by om-oss but remains for the homepage.
2. **Used blockquote for pullquote** - The "Hva er DIN lek?" quote uses a semantic blockquote element with font-dm italic styling and border-y separator.
3. **Both phone and email on profiles** - Added phone numbers from scraped content alongside emails for better accessibility.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Kept PeopleSection.tsx instead of deleting**
- **Found during:** Task 1 (Add redirect and remove old page)
- **Issue:** Plan specified deleting PeopleSection.tsx, but `src/app/page.tsx` (homepage) imports it. Deleting would break the build.
- **Fix:** Kept PeopleSection.tsx for homepage use; om-oss page is self-contained without importing it.
- **Files modified:** None (avoided destructive change)
- **Verification:** `npm run build` passes, homepage still renders with PeopleSection

---

**Total deviations:** 1 auto-fixed (1 blocking issue avoided)
**Impact on plan:** Minimal. The om-oss page is fully self-contained as intended. PeopleSection.tsx remains only for homepage use.

## Issues Encountered

- Both tasks were already completed in prior commits (024038d and dec7668). The executor verified all requirements were met and no additional changes were needed. This likely happened because a previous phase executor included om-oss changes in a batch commit.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- /om-oss is complete with all sections, profiles, and SEO metadata
- Ready for Phase 12 (Kontakt) or Phase 16 (SEO-polering) which may add JSON-LD schema
- PeopleSection.tsx could be cleaned up in a future phase if the homepage is redesigned

## Self-Check: PASSED

All items verified:
- src/app/om-oss/page.tsx: FOUND
- next.config.ts: FOUND
- 11-01-SUMMARY.md: FOUND
- Commit 024038d: FOUND
- Commit dec7668: FOUND
- menneskene page: CONFIRMED REMOVED
- Build: PASSES

---
*Phase: 11-om-oss*
*Completed: 2026-03-31*
