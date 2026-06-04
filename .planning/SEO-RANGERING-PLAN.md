# SEO-rangeringsplan: Wannado på topp for aktiviteter i Arendal

Skrevet 2026-06-04. Målet er at wannado.no rangerer i toppen når noen søker etter
aktiviteter og opplevelser i Arendal og på Sørlandet, på norsk, engelsk og tysk.

## Ærlig premiss

Ingen kan garantere fast førsteplass på Google. Rangering styres av Google og
avhenger av on-page (nettsiden), off-page (lenker, omtale, Google Business
Profile) og brukeratferd over uker til måneder. Denne planen maksimerer alt vi
faktisk kontrollerer. Den største enkeltfaktoren for lokale søk som
"aktiviteter i Arendal" er som regel Google Business Profile, ikke nettsiden.

## Søkeord-cluster (norsk)

### Bredt / forsiden + /opplevelser
- aktiviteter i Arendal, ting å gjøre i Arendal, opplevelser i Arendal
- aktiviteter på Sørlandet, opplevelser Sørlandet, sommer i Arendal

### Per tjeneste (egen landingsside hver)
| Tjeneste | Primærsøkeord | Side |
|---|---|---|
| Seiltur | seiltur Arendal, båttur Arendal, Listerskøyta Havsul | /seilturer |
| Kajakktur | kajakktur Arendal, guidet kajakk skjærgård | /kajakkturer |
| Kajakkurs | våttkort Arendal, kajakkurs Arendal | /kurs/kajakkurs |
| Kajakkutleie | leie kajakk Arendal, kano utleie Arendal | /utleie/kajakk-og-kano-utleie |
| Teambuilding | teambuilding Arendal, bedriftsarrangement Sørlandet | /teambuilding, /bedrift |
| Hesteopplevelser | hesteopplevelser Sørlandet, ridetur islandshest Arendal | /opplevelser/hesteopplevelser |
| Hestekurs | hestekurs Arendal, ridetrening Arendal | /kurs/hestekurs |
| Skjærgårdssafari | skjærgårdssafari Arendal | /opplevelser/skjaergardsafari |
| JTI | JTI-kurs, JTI-foredrag, teamdynamikk | /kurs/jti, /foredrag/jti |
| Grønlandsforedrag | foredrag kajakkekspedisjon Grønland, Øst-Grønland kajakk | /foredrag/kajakkekspedisjon-ost-gronland |
| Gavekort | gavekort opplevelser Arendal | /gavekort |

## On-page status (gjort 2026-06-04)

- Forside: title + meta dekker aktiviteter/opplevelser i Arendal OG Sørlandet, alle tjenester (inkl. hest).
- /opplevelser: H1 og title leder nå med "Aktiviteter og opplevelser i Arendal" (var "Finn turen som passer gruppen din" uten søkeord).
- layout.ts: keywords utvidet til hele tjeneste- og geografi-clusteret.
- Alle tjenestesider har søkeordrike title-tagger med Arendal og egne H1-er (verifisert).
- Teknisk SEO sterkt: Core SEO 93, Mobile/Local SEO 100, Security 91, JSON-LD LocalBusiness/TravelAgency, sitemap, canonical (squirrel-audit 2026-06-04).

### Gjenstår on-page (egen runde)
- Vurder å bredde "Sørlandet" inn i flere tjeneste-titler der det er naturlig (i dag mest "Arendal").
- ItemList-schema på /opplevelser som lister alle aktivitetene (rik-snippet-potensial).

## Flerspråklig (norsk + engelsk + tysk) — BYGGES MED KEYSTATIC-MIGRERINGEN

Besluttet 2026-06-04: i18n designes inn i Keystatic-migreringen, ikke på dagens
Sanity-arkitektur (unngår dobbeltarbeid; oversettelser hører i CMS-et og skal
være redigerbare for kunden).

### Språk og hvorfor
- Norsk (bokmål): hjemmemarked.
- Engelsk: internasjonale turister bredt + "kayaking Arendal / Norway", "things to do in Arendal", "kayak expedition Greenland".
- Tysk: største utenlandske turistgruppe på Sørlandet om sommeren. "Aktivitäten Arendal", "Kajak Norwegen", "Bootstour Südnorwegen". Krever ekte tyske søkeord, ikke maskinoversettelse — en tysktalende må kvalitetssikre.

### Teknisk i18n-arkitektur (for Keystatic-fasen)
- Next.js App Router med `[locale]`-segment: `/` (no), `/en/`, `/de/`.
- `hreflang`-alternates i metadata for hver side (no/en/de + x-default).
- Keystatic: enten locale-felt per dokument eller egen collection per språk; bilder og NAP deles, tekst per språk.
- Oversatte slugs der det styrker SEO (f.eks. `/en/experiences`, `/de/aktivitaeten`).
- Språkvelger i Navbar; behold valgt språk i navigasjon.
- Oppdater sitemap til å liste alle språkvarianter.

### Søkeord per språk (utgangspunkt, må valideres lokalt)
- EN: things to do in Arendal, kayaking Norway, sailing trip Arendal, team building Norway, kayak expedition East Greenland talk.
- DE: Aktivitäten Arendal, Kajaktour Norwegen, Segeltörn Südnorwegen, Teambuilding Norwegen, Reiterlebnis Südnorwegen.

## Off-page — STØRST EFFEKT FOR LOKALE SØK (utenfor nettsidekoden)

Dette er ikke kode, men det avgjør ofte topp-plassering for "aktiviteter i Arendal":

1. Google Business Profile (kritisk): fullt utfylt, riktig kategori (turoperatør / opplevelsessenter), bilder, åpningstider, NAP = Skarestrand 11, 4812 Kongshavn. Lokal-pakken (kartet) vises over organiske treff.
2. Anmeldelser: aktivt be om Google- og TripAdvisor-anmeldelser (TripAdvisor 4,5/5 finnes allerede). Volum og ferskhet teller.
3. Lokale lenker: VisitSørlandet, Visit Arendal, reiseliv-portaler, partnere (hoteller som Strand Hotel Fevik), Arendal kommune turist-sider.
4. NAP-konsistens på tvers av alle kataloger (Google, TripAdvisor, Facebook, 1881, Gule Sider).
5. Innhold/blogg: de 15 bloggutkastene targeter long-tail ("kajakktur fyr til fyr", "teambuilding Strand Hotel") — publiser dem for å fange søk konkurrenter ikke dekker.

## Realistisk tidslinje

- Uke 0 (nå): norsk on-page maksimert, lansering.
- Uke 0-2: Google Business Profile + Search Console + sitemap-innsending + anmeldelses-rutine.
- Måned 1-3: publisere blogg, bygge lokale lenker, flerspråklig (no/en/de) med Keystatic.
- Måned 3-6: måle i Search Console, iterere på søkeord som beveger seg.

CLAUDE.md-målet (topp 3 på kjernesøkeord innen 6 mnd, doble organisk trafikk
innen 12 mnd) er realistisk med on-page + Google Business Profile + jevnt
innholds- og lenkearbeid.
