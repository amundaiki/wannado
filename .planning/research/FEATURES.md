# Features Research

## Feature Landscape

### Table Stakes (brukere forventer dette, mangler = ødelagt)

| Feature | Why Expected | Complexity | Notes |
|---------|-------------|-----------|-------|
| Responsiv design | Mobil-først, 60%+ mobiltrafikk | Medium | Tailwind breakpoints |
| Kontaktskjema | Bookingforespørsler | Low | Resend API |
| Rask lasting | Core Web Vitals, SEO | Medium | Next.js static, bildeoptimlisering |
| SEO-metadata | Ranke på Google | Low | Next.js Metadata API |
| Tjenestesider | Vise hva Wannado tilbyr | Medium | 6 unike sider |
| Bilder av høy kvalitet | Opplevelsesselskap selger visuelt | High | next/image, WebP |
| Kontaktinfo synlig | Telefon/e-post lett tilgjengelig | Low | Footer, kontaktside |
| HTTPS/SSL | Sikkerhet, SEO-signal | Low | Vercel automatisk |
| Google Maps | Vise lokasjon (Skarestrand) | Low | Iframe embed |
| Personvernside | GDPR-krav | Low | Statisk side |

### Differentiators (konkurransefortrinn)

| Feature | Value Proposition | Complexity | Notes |
|---------|------------------|-----------|-------|
| Scroll-baserte animasjoner | Engasjerende, moderne opplevelse | Medium | Framer Motion |
| Video-integrasjon | Vise opplevelser i aksjon | Medium | Intervjuvideoer, scroll-video |
| JSON-LD structured data | Rich snippets i Google | Medium | TouristTrip, Product, Event, LocalBusiness |
| OG-bilder per side | Attraktiv deling på sosiale medier | Low | Next.js opengraph-image |
| Tjeneste-forhåndsvalg i kontaktskjema | Reduser friksjon fra CTA | Low | URL-parameter `?tjeneste=X` |
| Referanseliste med 49+ bedrifter | Sosial bevis, B2B-tillit | Low | Visuelt rutenett |
| TV-opptredener-seksjon | Unikt tillitssignal | Low | Jakten, 71° nord |
| Testimonial-karusell | Sosialt bevis, engasjement | Medium | Auto-rotasjon + marquee |
| Norsk innhold med æøå | Lokalt relevant, SEO for norske søk | Low | lang="nb" |
| Blogg med SEO-innhold | Organisk trafikk over tid | High | Sanity CMS (fase 15) |

### Anti-Features (vanlige forespørsler som ofte er problematiske)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|--------------|----------------|------------|
| Live chat | "Alle har det" | Krever bemanning, lav verdi for 2-personers bedrift | Kontaktskjema + telefonnummer |
| Online booking-system | Automatisere bookinger | Wannado har manuell flyt, ulike priser per gruppe | Kontaktskjema med tjeneste-forhåndsvalg |
| Flerspråklig (EN) | Turister | 90%+ norske kunder, dobler vedlikeholdsarbeid | Norsk first, vurder engelsk senere |
| Brukerkontoer | "Moderne" | Ingen verdi for engangsbookinger | Ikke relevant |
| E-handel/betaling | Selge direkte | Turer krever tilpasning per gruppe, ikke standardpris | Pristabeller + kontaktskjema |
| Nyhetsbrev | Email-marketing | Krever konsistent innholdsproduksjon, lav prioritet | Sosiale medier (Facebook aktiv) |
| Animert videobakgrunn (hero) | Imponerende | Treg lasting, høyt dataforbruk på mobil, dårlig LCP | Optimalisert bilde + scroll-video seksjon |
| Infinite scroll | "Moderne" | Dårlig for SEO, forvirrer navigasjon | Tydelig sidestruktur |

## Feature Dependencies

```
Fonter + Farger (globals.css)
    └── Layout (Navbar, Footer)
        └── Tjenestesider (seilturer, kajakk, teambuilding, foredrag, utleie)
            └── SEO (metadata, JSON-LD, sitemap, robots)
                └── Kontaktskjema (Resend)
                    └── CTA-routing (tjeneste-parameter)
                        └── Deploy (Vercel, DNS)
                            └── Blogg + CMS (Sanity, post-launch)
```

## MVP Definition

### v1 Launch (fase 1-17)
- [x] Alle tjenestesider med ekte bilder og innhold
- [x] Kontaktskjema med e-post (Resend)
- [x] Full SEO: metadata, JSON-LD, sitemap, robots, OG-bilder
- [x] Responsivt design, mobil-først
- [x] Scroll-animasjoner og interaktivitet
- [x] Referanser og testimonials
- [x] Personvern og praktisk informasjon
- [x] Vercel Analytics
- [ ] Vercel deploy med wannado.no

### v1.x Post-launch
- [ ] Sanity CMS for blogg
- [ ] Blogg med SEO-artikler
- [ ] Hesteopplevelser-side (/hest)

### v2+ Fremtid
- [ ] Engelsk versjon
- [ ] Online booking-integrasjon (hvis forretningsmodell endres)
- [ ] Nyhetsbrev/e-postliste

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|-----------|-------------------|----------|
| Tjenestesider med bilder | High | Medium | P1 |
| Kontaktskjema + Resend | High | Low | P1 |
| SEO-metadata + JSON-LD | High | Medium | P1 |
| Responsivt design | High | Medium | P1 |
| Vercel deploy | High | Low | P1 |
| Scroll-animasjoner | Medium | Medium | P2 |
| Testimonials/referanser | Medium | Low | P2 |
| OG-bilder | Medium | Low | P2 |
| Vercel Analytics | Medium | Low | P2 |
| Blogg + CMS | High | High | P3 (post-launch) |
| Hesteopplevelser-side | Medium | Medium | P3 |

## Sources

- Wannado.no (eksisterende WordPress-side)
- Facebook-side: aktiv med 503+ poster
- Konkurranseanalyse: se `.obsidian/06_Resources/COMPETITOR-ANALYSIS.md`

---
*Research: 2026-03-31*
