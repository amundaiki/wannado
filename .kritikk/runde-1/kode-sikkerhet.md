---
funn_count: 4
---
## FUNN

### Sikkerhet (verifisert intakt, ingen svekkelser)
- [info] Kontakt-API (`src/app/api/contact/route.ts`) er fortsatt herdet og IKKE svekket. Bekreftet: rate limiting (5/10 min, linje 5-6, 86-97), `escapeHtml` paa alle felter foer e-post (linje 115-122, 239-243), regex-validering av e-post/telefon (linje 107-113), honeypot via `company`-felt (linje 191-196), maks body 8KB (linje 4, 128-137), fail-closed i prod naar proxy-header/RESEND_API_KEY mangler (linje 60-80, 233-236), CRLF-stripping i subject (linje 124-126, 249). Ingen funn.
- [info] Sikkerhetsheaders i `next.config.ts` verifisert mot `curl -I http://localhost:3000/`: HSTS (`max-age=31536000; includeSubDomains`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` alle paa. `/api/*` returnerer `X-Robots-Tag: noindex, nofollow, noarchive`. Ingen funn.
- [info] Secrets: ingen hardkodede noekler/tokens i `src/` eller `scripts/`. `scripts/import-blog-to-sanity.mjs` leser Sanity-token fra `~/.config/sanity/config.json` (linje 14-15), bruker den kun i `Authorization`-header (linje 242), logger den aldri. `.env*` er gitignored; kun `.env.local.example` er tracket. `.next/`/`dist/` ikke committet. Treff paa secret-moenster i `scripts/audit-public-site.mjs` linje 20 er detektor-regex i et legitimt audit-skript, ikke en lekket secret. Ingen funn.
- [info] Error boundaries (`src/app/error.tsx`, `global-error.tsx`) er korrekte: `"use client"`, `reset()`-knapp, `console.error(error)` i `useEffect`. Logger kun error-objektet, ingen PII/tokens. Ingen funn.
- [info] XSS-sink `dangerouslySetInnerHTML` finnes kun i `src/components/seo/JsonLd.tsx`, og `serializeJsonLd` escaper `<` til `<` (linje 6) som hindrer script-breakout. Blogg-render bruker `@portabletext/react` (`BlockContent.tsx`), ingen raa HTML-injeksjon. Ingen funn.

### Doed kode
- [low] `src/components/blog/PortableTextRenderer.tsx` er doed kode. Bekreftet: ingen import (statisk eller dynamisk) noe sted i `src/`; blogg-siden bruker `src/components/sanity/BlockContent.tsx` i stedet (`src/app/blogg/[slug]/page.tsx:10,209`). Filen er en duplikat-renderer som aldri kjoeres. Fil/linje: hele `src/components/blog/PortableTextRenderer.tsx`. Fiks: slett filen (`git rm src/components/blog/PortableTextRenderer.tsx`).

### Rate limiting (robusthet, ikke svekkelse)
- [low] Rate-limit-store i kontakt-API er en in-memory `Map` (`src/app/api/contact/route.ts:27`). Paa serverless/multi-instance deploy (f.eks. Vercel) deles ikke telleren mellom instanser, og nullstilles ved cold start, saa effektiv grense blir hoeyere enn 5/10 min. Ikke en regresjon, men en kjent begrensning som boer dokumenteres. Fil/linje: `src/app/api/contact/route.ts:27`. Fiks: legg til en kort kommentar over `rateLimitStore` som noterer at den er per-instans og best-effort, ev. flagg for delt store (Upstash/Redis) hvis bot-trafikk blir et problem. Ingen kodeendring paakrevd naa.

### SEO/structured-data compliance
- [medium] `organizationSchema` i `src/lib/seo.ts:128-134` emitter `aggregateRating` (ratingValue "4.5", ratingCount 14) paa Organization-niva site-wide via `src/app/layout.tsx`. Google sin structured-data-policy krever at aggregateRating refererer til vurderinger som faktisk vises paa siden; selvdeklarert org-rating uten synlige reviews paa samme side er en vanlig aarsak til manual action / fjerning av rich results. Verdiene matcher TrustBar ("4,5 av 5 paa TripAdvisor"), men TripAdvisor-rating boer modelleres som `Review`/`aggregateRating` knyttet til den eksterne kilden, ikke som en uverifisert org-rating. Fil/linje: `src/lib/seo.ts:128-134`. Fiks: enten (a) fjern `aggregateRating` fra organizationSchema og legg den paa et produkt/tjeneste-schema med synlige reviews paa siden, eller (b) bekreft at 14 vurderinger er reelle og legg til synlig review-innhold paa forsiden saa den samsvarer med Googles policy.
