# Wannado Markedsplan 2026

En omfattende markedsføringsplan for Wannado - aktivitets- og opplevelsesselskap i Arendal med fokus på Havsul båtturer.

## 🚀 Live nettside

Denne nettsiden er publisert via GitHub Pages og er tilgjengelig på: `[Din GitHub Pages URL]`

## 📁 Mappestruktur

```
/
├── index.html                    # Hovedside (oversikt)
├── markedsplan-interaktiv.html   # 📱 Komplett interaktiv versjon med React
├── css/
│   └── style.css                # Alle stilsett
├── pages/
│   ├── produkter.html           # Produkter & salg
│   ├── markedsforing.html       # Markedsføringsstrategier
│   ├── verktoy.html             # Verktøy & teknisk oppsett
│   └── handlingsplan.html       # Årshjul og handlingsplaner
├── docs/
│   └── arkiv/                   # Gamle versjoner og backup-filer
└── README.md                    # Denne filen
```

## 📝 Innhold

Nettsiden har **to versjoner**:

### 📱 Interaktiv Markedsplan (Anbefalt!)
`markedsplan-interaktiv.html` - Komplett React-basert applikasjon med:
- **Interaktive menyer** med undermenyer og kategorier
- **Ekspanderbare produktkort** med detaljert info for alle 16 produkter
- **Sjekklister** som lagres automatisk i nettleseren
- **Månedlig årshjul** med detaljerte oppgaver, verktøy og kostnader
- **Ordforklaringer** med lenker og enkle forklaringer
- **Markedsføringsstrategier** per produkt
- **Responsive design** - fungerer perfekt på mobil og desktop
- **Søkefunksjonalitet** (hvis implementert)

### 📄 Enkel HTML-versjon
Statiske HTML-sider for enkel navigering:
- **index.html**: Strategisk oversikt, team, mål og budsjett
- **Produkter & Salg**: 16 produktideer med priser og beskrivelser
- **Markedsføring**: E-postkampanjer, sosiale medier, annonseringsstrategier
- **Verktøy**: Teknisk oppsett og verktøykasse
- **Handlingsplaner**: Måned-for-måned årshjul for 2026

**Anbefaling:** Bruk den interaktive versjonen for den beste opplevelsen! Den enkle HTML-versjonen er god for utskrift eller rask oversikt.

## 🛠️ Hvordan legge til nye sider

### 1. Opprett ny HTML-fil i `pages/`-mappen

```bash
touch pages/min-nye-side.html
```

### 2. Bruk denne malen for nye sider

```html
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min Nye Side - Wannado Markedsplan 2026</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="header">
        <h1>🚢 Wannado Markedsplan 2026</h1>
        <p>Min Nye Side</p>
    </div>

    <div class="container">
        <nav class="nav">
            <ul>
                <li><a href="../index.html">Oversikt</a></li>
                <li><a href="produkter.html">Produkter & Salg</a></li>
                <li><a href="markedsforing.html">Markedsføring</a></li>
                <li><a href="verktoy.html">Verktøy</a></li>
                <li><a href="handlingsplan.html">Handlingsplaner</a></li>
                <li><a href="min-nye-side.html" class="active">Min Nye Side</a></li>
            </ul>
        </nav>

        <div class="section">
            <h2>Overskrift</h2>
            <p>Innhold her...</p>
        </div>
    </div>
</body>
</html>
```

### 3. Legg til lenke i navigasjonen

Oppdater navigasjonen i alle eksisterende HTML-filer:

- I `index.html`: `<li><a href="pages/min-nye-side.html">Min Nye Side</a></li>`
- I `pages/*.html`: `<li><a href="min-nye-side.html">Min Nye Side</a></li>`

## 🎨 Styling

Alle stiler ligger i `css/style.css`. Nettstedet bruker:

- Responsivt design (fungerer på mobil og desktop)
- Egendefinert fargepalett med variabler i `:root`
- Print-vennlig styling
- Brune/beige jordfarger som matcher Wannado's profil

### CSS-variabler

```css
--brown: #8B6F47;
--brown-dark: #6B5437;
--brown-light: #B8956A;
--cream: #F5F1E8;
```

## 📦 GitHub Pages oppsett

Nettsiden er satt opp for GitHub Pages:

1. `index.html` må ligge i root (/)
2. Andre filer kan organiseres i mapper
3. Alle lenker bruker relative stier
4. Ingen build-prosess nødvendig

## 🗂️ Arkiv

Gamle versjoner og backup-filer ligger i `docs/arkiv/`:

- Tidligere React-versjon
- Backup-filer
- Gamle tekstfiler og notater

Disse filene beholdes for historikk, men brukes ikke aktivt.

## 👥 Team

- **Tone Pernille Sivertsen** - Partner & Teambuilding-ekspert
- **Roar Laugerud** - Skipper, fotograf & guide

## 📧 Kontakt

- E-post: tp@wannado.no / roar@wannado.no
- Telefon: +47 99 46 99 57 / +47 94 82 67 10

---

_Sist oppdatert: Oktober 2025_

