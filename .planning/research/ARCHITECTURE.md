# Architecture Research

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                    BROWSER                           │
├─────────────────────────────────────────────────────┤
│  Next.js App Router (Static + SSR)                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Layout    │  │  Pages    │  │  API       │       │
│  │  (Navbar,  │  │  (Route   │  │  Routes    │       │
│  │   Footer)  │  │   files)  │  │  (/api/*)  │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│        │              │              │               │
│  ┌─────┴──────────────┴──────────────┘               │
│  │         Component Layer                           │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  │ Sections │ │ Layout   │ │ UI       │          │
│  │  │ (Hero,   │ │ (Navbar, │ │ (Cards,  │          │
│  │  │  Carousel│ │  Footer) │ │  Buttons)│          │
│  │  └──────────┘ └──────────┘ └──────────┘          │
│  └───────────────────────────────────────────────────│
│        │                                             │
│  ┌─────┴─────────────────────────────────────┐       │
│  │         Styling Layer                      │       │
│  │  Tailwind v4 + CSS Custom Properties       │       │
│  │  globals.css (@theme, fargepalett)          │       │
│  └────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────┤
│  External: Vercel (hosting), Vercel Analytics,       │
│  Google Maps (embed), Resend (e-post)                │
└─────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|---------------|----------------|
| Pages (`app/*/page.tsx`) | Rute-definisjon, metadata, sidekomposisjon | Next.js file-system routing |
| Sections (`components/sections/`) | Selvstendige seksjoner med data + UI + animasjon | `"use client"`, Framer Motion |
| Layout (`components/layout/`) | Navbar og Footer, delt på tvers av sider | Navbar: client, Footer: server |
| UI (`components/ui/`) | Gjenbrukbare atomiske komponenter | Kort, knapper, skjema-elementer |
| API Routes (`app/api/`) | Server-side logikk (kontaktskjema) | Next.js Route Handlers |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonter, metadata, HTML
│   ├── page.tsx                # Forside: komposisjon av seksjoner
│   ├── globals.css             # Tailwind v4 tema, CSS-variabler
│   ├── sitemap.ts              # Dynamisk sitemap
│   ├── robots.ts               # Robots.txt
│   ├── seilturer/page.tsx      # Tjenesteside
│   ├── kajakkturer/page.tsx    # Tjenesteside
│   ├── teambuilding/page.tsx   # Tjenesteside
│   ├── foredrag/page.tsx       # Tjenesteside
│   ├── om-oss/page.tsx         # Om bedriften
│   ├── kontakt/page.tsx        # Kontaktskjema
│   ├── referanser/page.tsx     # Kundeliste + testimonials
│   ├── utleie/page.tsx         # Utstyrsutleie
│   ├── personvern/page.tsx     # GDPR/personvern
│   ├── praktisk-informasjon/page.tsx
│   └── api/
│       └── contact/route.ts    # Kontaktskjema → Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fast navbar med scroll-hide
│   │   └── Footer.tsx          # Footer med kontaktinfo
│   ├── sections/
│   │   ├── HeroSection.tsx     # Animert hero med ordrotasjon
│   │   ├── CarouselSection.tsx # Horisontal scroll-karusell
│   │   ├── ScrollVideoSection.tsx  # Scroll-basert video
│   │   └── TestimonialsSection.tsx # Roterende sitater
│   └── ui/
│       ├── PersonVideoCard.tsx # Team-profil med video
│       └── ...
└── lib/                        # Hjelpefunksjoner (ved behov)
```

## Architectural Patterns

### Section Component Composition
Forsiden er bygget opp av uavhengige seksjonskomponenter som hver eier sine data, UI og animasjoner. Nye seksjoner legges til ved å importere dem i `page.tsx`.

### Hardcoded Content → CMS Migration Path
Alt innhold er foreløpig hardkodet som modul-konstanter (SCREAMING_SNAKE_CASE). Designet for enkel migrering til Sanity CMS i fase 15: bytt ut konstanter med `sanityFetch()`-kall.

### Manual Layout Composition
Navbar og Footer importeres manuelt i hver side i stedet for nestede layouts. Enkelt og eksplisitt for en site med 12-15 sider.

## Data Flow

### Sidevisning (statisk)
1. Vercel serverer pre-rendret HTML
2. React hydrerer `"use client"`-komponenter
3. Framer Motion aktiverer scroll-baserte animasjoner
4. Ingen data-fetching, ingen API-kall

### Kontaktskjema
1. Bruker fyller ut skjema → `POST /api/contact`
2. Route handler validerer input
3. Resend API sender e-post til mail@wannado.no
4. Response → bruker ser bekreftelse

## Anti-Patterns

| Anti-Pattern | Hvorfor feil | Gjør dette i stedet |
|-------------|-------------|-------------------|
| Global state (Redux) | Ingen delt state mellom sider | Lokal `useState` |
| Dynamisk rendering overalt | Statisk site, unødvendig serverbelastning | Static generation (default) |
| CSS-in-JS | Inkompatibelt med RSC, runtime overhead | Tailwind utility classes |
| Barrel exports (`index.ts`) | Hindrer tree-shaking i Next.js | Direkte imports |
| Layout-basert Navbar/Footer | Overengineering for 15 sider | Manuell import per side |

## Sources

- Next.js App Router: https://nextjs.org/docs/app
- React Server Components: https://react.dev/reference/rsc/server-components
- Vercel deployment: https://vercel.com/docs

---
*Research: 2026-03-31*
