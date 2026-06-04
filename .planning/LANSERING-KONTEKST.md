# Wannado lansering: full kontekst for fullførings-agent

Skrevet 2026-06-04. Dette dokumentet er kilden en autonom agent skal jobbe ut fra
for å gjøre wannado.no lanseringsklar. Agenten starter uten samtalekontekst, så
ALT som trengs står her eller i filene det pekes til. Ikke gjett tall: der pris
mangler, marker tydelig og bruk "Ta kontakt"/forespørsel, ikke oppdiktede beløp.

## Nåværende tilstand (verifisert 2026-06-04)

- Next.js 16.2.7 (App Router, webpack), React 19.2.4, Tailwind v4, TypeScript strict.
- `npm run build` gir exit 0. 34 ruter bygger.
- Sanity er i dag dypt integrert: forside, blogg, og ~15 sider leser via custom
  REST-klient i `src/sanity/lib/`. Studio på `/studio`. 12 schema-typer.
- Kontakt-API (`src/app/api/contact/route.ts`) er allerede herdet: rate limiting,
  `escapeHtml`, e-post/telefon-regex, honeypot. Behold dette.
- Booking finnes via Checkin.no-embed (`src/components/booking/CheckinBookingEmbed.tsx`,
  `customerId = 16533`). Dette er en reell Wannado-konto. Verifiser at embedet
  laster og viser aktiviteter; behold fallback-UI.
- Mangler: `not-found.tsx`, `error.tsx`, `loading.tsx`, `global-error.tsx`.
- 111 MB video i `public/videos/` (inkl. ubrukt 25 MB `havsul-hero.mp4`). Trim.
- ~16 sider er hardkodet JSX utenfor CMS, inkl. `/priser` og `/kontakt`. Kunden
  kan derfor ikke redigere egne priser. Dette er det reelle redigerbarhets-gapet.

## CMS-beslutning: migrer Sanity -> Keystatic

Eier vil bort fra Sanity og vil ha "veldig enkelt og intuitivt CMS som de kan
endre bilder og tekst med". Valget er **Keystatic** (Thinkmill), ikke TinaCMS.
Begrunnelse: git-basert, TypeScript-schema likt Sanity sine defineType, ingen
ekstern cloud-konto, rent App Router admin-UI på `/keystatic`, intuitiv
bilde/tekst-redigering. Tina ble vurdert og frarådet (cache-friksjon på Next 16,
commit-per-edit, klønete relasjoner).

Migreringssteg (alt innhold MÅ bevares, ingen datatap):
1. Eksporter alle Sanity-dokumenter (post, service, faqItem, teamMember,
   testimonial, homePage, siteSettings, author, category, product).
2. Konverter Portable Text -> Markdown/MDX. Bevar interne lenker og bilde-alt-tekst.
3. Last ned alle Sanity-CDN-bilder, commit til `public/` eller Keystatic media-mappe.
4. Definer Keystatic collections/singletons i `keystatic.config.ts` som speiler
   de 12 schemaene (relasjoner -> reference-felt mot filstier).
5. Erstatt alle GROQ-queries i `src/sanity/lib/content.ts` med Keystatic-lesing
   (`@keystatic/core/reader`). Oppdater alle ~15 konsumerende sider + sitemap.ts.
6. Bytt Portable Text-rendering (`BlockContent.tsx`, `PortableTextRenderer.tsx`)
   mot Markdown/MDX-rendering.
7. Fjern `/studio`, `sanity.config.ts`, `sanity.cli.ts`, `structure.ts`,
   `src/sanity/**`, og avhengighetene `sanity`, `next-sanity`, `@sanity/*`,
   `@portabletext/*`. Legg til `@keystatic/core`, `@keystatic/next`.
8. Beskytt `/keystatic` mot indeksering (X-Robots-Tag noindex, som `/studio` har i dag).
9. FLYTT de hardkodede sidene inn i Keystatic der det gir mening, SPESIELT priser
   og kontaktinfo, slik at kunden faktisk kan redigere tekst, priser og bilder selv.

Behold fallback-mønsteret: hvis CMS-lesing feiler, fall tilbake til lokale data
i `src/lib/data/` slik at siden aldri kræsjer.

## Tjenester og priser (hentet fra live wannado.no 2026-06-04, sitert verbatim)

Bruk disse som fasit. Der "IKKE oppgitt" står: bruk "Ta kontakt for pris" og
forespørselsflyt, ikke gjett tall. Grønlandsprisen er fra 2023 og må verifiseres.

### Seiltur / båttur (Listerskøyta Havsul, 1933)
- kr 350,- pr pers. Charter kr 3 500,- pr time. Varighet 2-3 t. Maks 12 personer.
- Sesong: hele året. Oppmøte: Pollen i Arendal eller avtalt sted.
- Mat valgfritt: Merdø eller Brattekleiv Skipsverft, evt. catering ombord.
- Booking: Tone Pernille, 99 46 99 57 / tp@wannado.no.

### Kajakk - kurs (oppmøte Skarestrand, 4812 Kongshavn; booking Roar 94 82 67 10)
- Introduksjonskurs (våttkort): kr 1 350,- pr pers inkl. utstyr. 2-10 delt.
  Privat (2-4 pers): kr 1 500,-.
- Grunnkurs hav (våttkort): kr 3 000,- inkl. utstyr. 16 t (2 dager / 3 kvelder).
  Privat (maks 4): kr 3 500,-.
- Teknikkurs: kr 3 500,- inkl. utstyr. 16 t.
- Rullekurs: kr 1 250,-. 3 t.
- "Tøffe tak": kr 1 350,-. 5 t. Krever teknikkurs+.
- Turkurs/ekspedisjonskurs: kr 3 500,-. 2 dager.
- Aktivitetslederkurs: PRIS IKKE OPPGITT. 2 dager m/overnatting.
- Guidet tur: 1 350,- pr pers (3 t).

### Kajakk - turer og ekspedisjoner
- Oversiktspriser/varighet/gruppestørrelse: IKKE oppgitt.
- Tilgang til ekspedisjonsbåt Delfin Senior (48 fot).
- Fyr til fyr: 3-5 dagers padletur, overnatting fyrstasjoner. PRIS IKKE OPPGITT.
  Rute: Kristiansand Feriesenter -> Blindleia -> Grønningen -> Saltholmen ->
  Homborsund -> Store Torungen -> Arendal/Hove.
- Kajakkekspedisjon Øst-Grønland: NOK 29 000 (2023, MÅ VERIFISERES). 10-13 dager.
  Inkl. guiding, transport, mat, utstyr, overnatting på Grønland. Ekskl. reise
  til Grønland og reiseforsikring.

### Utleie (kajakk/kano; betaling kontant/Vipps ved utlevering)
- Enerkajakk: kr 350,- (halv dag/3 t) / kr 450,- (hel dag).
- Dobbelkajakk: kr 400,- / kr 500,-.
- Transport av kajakker: kr 5,- pr km + kr 200,- pr time.
- Kano: PRIS IKKE OPPGITT separat. Depositum IKKE oppgitt. Leietaker
  erstatningsansvarlig ved skade/tyveri, ingen forsikring fra utleier.

### Teambuilding / bedrift (booking Tone Pernille 99 46 99 57)
- 360° Wannado: 16 500,- min. ELLER 550,- pr pers (30+). 2 t.
- Heia dem som vinner (innendørs): 16 500,- ELLER 550,- pr pers (30+). 2 t.
- Påfyll (utendørs, Bjellandstrand Gård): 1 950,- pr pers. 2-3 t + måltid.
- CLUEDO (mordmysterium): 16 500,- ELLER 550,- pr pers (30+). 2 t.
  Venues: Strand Hotel Fevik, Lillesand Hotell Norge, Lyngørporten, Kargerø,
  Arendal Herregaard m.fl. (annet sted = tillegg).
- Mord i Cicilia: 4 500,- min. 1-1,5 t.
- JTI Light-foredrag: 6 000,- (~1 t). Full analyse: 1 000,- pr pers (~3 t).
- BEDRAGER (Forræder-konsept): nytt, prøvekjørt nov 2025, ~2 t. PRIS IKKE OPPGITT.

### Foredrag
- JTI (Tone Pernille): JTI Light 6 000,-, full analyse 1 000,- pr pers.
- Kajakkekspedisjon Grønland (Roar): PRIS/VARIGHET IKKE OPPGITT.

### Hesteopplevelser (islandshester, guide Tone Pernille, Skarestrand 11)
- PRIS, VARIGHET, GRUPPESTØRRELSE: IKKE OPPGITT. Skreddersydd program.
- Sosial profil: fokus på ungdom/unge voksne i utenforskap.

### Gavekort
- Live-siden /gavekort gir 404. Beløp/vilkår IKKE tilgjengelig. Bygg en ren
  gavekort-side med forespørsel/kontakt til beløp foreligger.

## Kontakt og bedriftsfakta
- Postadresse: Skarestrand 11, 4812 Kongshavn (Arendal-regionen).
- mail@wannado.no. Tone Pernille Sivertsen 99 46 99 57 / tp@wannado.no
  (teambuilding, JTI, hest, booking). Roar Laugerud 94 82 67 10 / roar@wannado.no
  (kajakk, seil, ekspedisjon, båt).
- Sertifiseringer: Tone Pernille (JTI, NLP-coach, dyreassisterte intervensjoner
  NMBU, islandshest). Roar (Veileder Hav - høyeste nivå Norges Padleforbund,
  BCU 4-stjerners guide, fritidsskipper, godkjent inntil 12 passasjerer).
- Org.nr: IKKE oppgitt på live-siden. Hent fra kunde før footer/JSON-LD.
- Sosiale medier: facebook.com/wannado.no, instagram.com/wannado_no,
  linkedin (Tone Pernille), flickr/roarfoto.

## Tillit / sosialt bevis (gjør bedriften 10/10)

Sosialt bevis funnet eksternt:
- TripAdvisor 4,5/5, 14 anmeldelser, #1 av 5 i "Boat Tours & Water Sports"
  Arendal. URL: tripadvisor.com (Wannado Arendal). Vis dette tydelig på siden.
- Facebook ~1 718 likes (bekreft manuelt).
- Google Business: ingen verifiserbar rating funnet -> svak profil, flagg for kunde.
- NAP-DISKREPANS: TripAdvisor lister Teaterplassen 3, nettsiden Skarestrand 11.
  Bruk Skarestrand 11 konsistent overalt (footer, JSON-LD LocalBusiness, kontakt).

Tillit-elementer som SKAL bygges inn (manglet på gammel side):
1. Synlige fra-priser per aktivitet (ikke gjemt).
2. Avbestillingsvilkår tydelig (frist, vær-forbehold, refusjon ved avlyst tur).
3. Sikkerhet/utstyr: sikkerhetsgjennomgang før tur, redningsvester, guide-kompetanse.
4. Sertifiseringer synlig (Veileder Hav, BCU, fritidsskipper, JTI).
5. Forsikring/ansvar for deltakere.
6. Anmeldelser synlig på siden: TripAdvisor 4,5/5 + sitater (hent de 14 manuelt).
7. Trygg booking: bekreftelse, kontakt, maks gruppestørrelse per tur.
8. Værbasert forutsigbarhet: hva skjer ved dårlig vær (ombooking/alternativ).
9. FAQ som svarer "People Also Ask" (se blogg-fila).

## Blogg: 15 ferdig-researchede artikler

FULL kilde med søkeord, Facebook-kilder og begrunnelse:
`content/scraped/facebook/SEO-BLOGGPOTENSIAL.md` (LES DENNE).
Tone-of-voice: `content/scraped/facebook/TONE-OF-VOICE.md`.

Alle 15 skal skrives som ekte, publiseringsklare artikler (norsk bokmål, æøå,
1000-2000 ord, E-E-A-T, intern lenking til relevante tjenestesider, hver med
unik title/meta/OG og JSON-LD Article/BlogPosting). Prioritert rekkefølge: JTI,
Listerskøyta Havsul, BEDRAGER teambuilding, padlesikkerhet, mordgåte, båttur
Arendal, så resten. Ikke oppdiktede fakta; bygg på Facebook-kildene og
tjenestedata over.

## Lokal-SEO (konkurrentene eier dette i dag)

Konkurrenter (Ship O'Hoi, Padlegleden) har egne landingssider per by/aktivitet.
Vurder lokal-SEO-landingssider/innhold for: "kajakkutleie Arendal", "kajakk
Tromøy/Hove", "seiltur Sørlandet", "teambuilding Arendal", "guidet kajakktur
Raet nasjonalpark". 20 prioriterte søkeord ligger i blogg-research og i
SEO-BLOGGPOTENSIAL.md.

## Constraints (gjelder alt arbeid)
- All brukersynlig tekst: norsk bokmål med æøå. Aldri ASCII-erstatning (aa/oe/ae).
- Aldri em-dash. Aldri emoji. Ingen pill/badge over overskrifter.
- Behold eksisterende visuell identitet: brun #48382B, teal #00838f, cream #faf8f4,
  logo. Mobil-først.
- Ikke gjett priser. Manglende pris = "Ta kontakt"/forespørsel.
- Behold herdet kontakt-API og Checkin-booking. Ikke svekk sikkerhetsheaders.
