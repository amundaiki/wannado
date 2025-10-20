import React, { useState, useEffect } from 'react';
import { Calendar, Globe, MapPin, Target, TrendingUp, Users, CheckSquare, Compass, FileText, DollarSign, BookOpen, ExternalLink, HelpCircle, Lightbulb, Award, Package, Phone, Mail, Sunset, Coffee, Camera, Star, Gift, Ship } from 'lucide-react';

const WannadoMarkedsplan2026 = () => {
  const [activeTab, setActiveTab] = useState('oversikt');
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedHelp, setExpandedHelp] = useState({});
  const [notes, setNotes] = useState({});

  // Last inn data fra localStorage ved oppstart
  useEffect(() => {
    const savedChecks = localStorage.getItem('wannado_checks');
    const savedNotes = localStorage.getItem('wannado_notes');
    if (savedChecks) setCheckedItems(JSON.parse(savedChecks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Lagre til localStorage når data endres
  useEffect(() => {
    localStorage.setItem('wannado_checks', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('wannado_notes', JSON.stringify(notes));
  }, [notes]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
  };

  const toggleHelp = (id) => {
    setExpandedHelp(prev => ({...prev, [id]: !prev[id]}));
  };

  const addNote = (id, note) => {
    setNotes(prev => ({...prev, [id]: note}));
  };

  // Team informasjon
  const team = {
    tone: {
      navn: "Tone Pernille Sivertsen",
      rolle: "Partner & Teambuilding-ekspert",
      ansvar: ["Administrasjon", "Teambuilding og kurs", "Hester og naturopplevelser", "Kundeoppfølging", "Foredrag og JTI/NLP"],
      tlf: "+47 99 46 99 57",
      epost: "tp@wannado.no",
      beskrivelse: "Sertifisert i Jungs TypeIndeks (JTI) og NLP-coach. Har bygget opp Wannados hesteflokk og kombinerer lidenskap for energi, teambuilding og lek med dyp forståelse for menneskers ulikheter."
    },
    roar: {
      navn: "Roar Laugerud",
      rolle: "Skipper, Fotograf & Guide",
      ansvar: ["Skippervirksomhet på Havsul", "Fotografi og videografi", "Guide og historiefortelling", "Kajakk og padleaktiviteter", "Sikkerhet og teknisk"],
      tlf: "+47 94 82 67 10",
      epost: "roar@wannado.no",
      beskrivelse: "Innehar Veileder Hav-sertifikat (høyeste nivå i Padleforbundet), BCU-sertifisering og fritidsskippersertifikat. Autorisert til å føre båter med inntil 12 passasjerer. Erfaren padle- og ekspedisjonsentusiast."
    }
  };

  // Produktpakker
  const produkter = [
    {
      ikon: Sunset,
      navn: "Sunset Sail",
      type: "HOVEDPRODUKT - Drop-in",
      varighet: "2,5 timer",
      pris: "590 kr per person",
      inkludert: ["Seilas i solnedgang", "Historiefortelling", "Soft drinks"],
      malgruppe: "Par, venner, turister",
      sesong: "Juni-August, 2-3x per uke (ti/to/lø kl 18:00)",
      beskrivelse: "Den perfekte kveldsturen for turister som vil oppleve skjærgården i gyllen time. Drop-in konsept gjør det enkelt å booke samme dag.",
      markedsforing: "Post på Instagram hver morgen det er tur. 'Tonight at 6pm - Sunset Sail! X spots left.'"
    },
    {
      ikon: Star,
      navn: "Sunset & Stories",
      type: "Premium kveldstur",
      varighet: "2,5 timer",
      pris: "790 kr per person",
      inkludert: ["Seilas i solnedgang", "Historiefortelling fra Arendals sjøfartshistorie", "1 glass vin/musserende", "Lokale snacks"],
      malgruppe: "Par 40-70 år, både lokale og turister",
      sesong: "Juni-August, 3x per uke (man/ons/fre kl 19:00)",
      beskrivelse: "Eksklusiv opplevelse som kombinerer seiling, kultur og kulinarisk nytelse.",
      markedsforing: "Markedsfør som premium-opplevelse. Ideell for special occasions."
    },
    {
      ikon: Users,
      navn: "Skjærgårdseventyr for familier",
      type: "Familieopplevelse",
      varighet: "3 timer",
      pris: "2.500 kr for familie (2 voksne + 2 barn)",
      inkludert: ["Dagseilas", "Barna får prøve å styre skøyta", "Krabbes fiske på holme", "Enkel lunsj/piknik", "Spennende sjøfortellinger"],
      malgruppe: "Barnefamilier",
      sesong: "Juni-August, dagtid",
      beskrivelse: "En ferieminne for livet! Perfekt for familier som vil gi barna en autentisk sjøfartsopplevelse.",
      markedsforing: "Familierabatt. Markedsfør via hoteller og campingplasser."
    },
    {
      ikon: Coffee,
      navn: "Morning Coffee Cruise",
      type: "Morgentur - NY!",
      varighet: "2 timer",
      pris: "490 kr per person",
      inkludert: ["Morgenseilas", "Kaffe/te", "Fersk bakst fra lokalt bakeri", "Rolig start på dagen"],
      malgruppe: "Alle - spesielt seniorer og par",
      sesong: "Juni-August, tirsdager og torsdager kl 09:00",
      beskrivelse: "Start dagen med kaffe på fjorden. Rolig tempo, vakkert morgenlys og fred før dagens turisme starter.",
      markedsforing: "Markedsfør mot hotellgjester som ønsker rolige opplevelser. 'Before the crowds'."
    },
    {
      ikon: Package,
      navn: "Lunch at Sea",
      type: "Lunsjtur - NY!",
      varighet: "3 timer",
      pris: "850 kr per person",
      inkludert: ["Seilas til vakker holme", "3-retters lunsj fra lokal restaurant", "Drikke", "Historiefortelling"],
      malgruppe: "Matentusiaster, par, grupper",
      sesong: "Juni-August, søndager kl 12:00",
      beskrivelse: "Kombinasjon av seiling og kulinarisk opplevelse. Samarbeid med lokal restaurant.",
      markedsforing: "Samarbeid med restaurant om felles markedsføring. 'Sail & Taste Southern Norway'."
    },
    {
      ikon: Camera,
      navn: "Photography Sail",
      type: "For fotografer - NY!",
      varighet: "3 timer",
      pris: "990 kr per person (maks 8 personer)",
      inkludert: ["Seilas til beste fotospots", "Roar gir tips om fotografering", "Golden hour timing", "Ekstra stopp for perfekte bilder"],
      malgruppe: "Fotografer, Instagram-brukere, influensere",
      sesong: "Mai-September, etter avtale",
      beskrivelse: "Spesialdesignet for fotografer. Vi seiler til de vakreste stedene i best mulig lys.",
      markedsforing: "Influencer-samarbeid. Markedsfør på Instagram med #photographynorway"
    },
    {
      ikon: Star,
      navn: "Stjernehimmelseilas",
      type: "Kveldseventyr - NY!",
      varighet: "2 timer",
      pris: "690 kr per person",
      inkludert: ["Seilas i mørket", "Stjernetitting (august-september)", "Varme tepper", "Varm drikke", "Historier under stjernene"],
      malgruppe: "Par, romantikere, naturelskere",
      sesong: "August-September når det er mørkt nok",
      beskrivelse: "Magisk opplevelse under stjernehimmelen. Når natten senker seg over skjærgården.",
      markedsforing: "Markedsfør som 'Once in a lifetime experience'. Begrenset sesong skaper eksklusivitet."
    },
    {
      ikon: Gift,
      navn: "Juleseilas",
      type: "Sesongopplevelse",
      varighet: "2 timer",
      pris: "590 kr per person",
      inkludert: ["Seilas i juledekorert skøyte", "Gløgg", "Pepperkaker", "Julestemning og historier"],
      malgruppe: "Familier, bedrifter, vennegjenger",
      sesong: "Desember (før jul)",
      beskrivelse: "Noe helt spesielt! Havsul i julestemning. Perfekt for juleavslutninger eller familiehygge.",
      markedsforing: "Book tidlig-kampanje i november. Begrenset antall turer skaper etterspørsel."
    },
    {
      ikon: Ship,
      navn: "Havsul Charter - VIP",
      type: "Privat leie",
      varighet: "3+ timer",
      pris: "Fra 15.000 kr (3 timer)",
      inkludert: ["Privat charter for inntil 12 personer", "Skreddersydd rute", "Catering fra lokal restaurant (ekstra)", "Dedikert mannskap"],
      malgruppe: "Bedrifter, bursdager, spesielle anledninger",
      sesong: "Hele året (mai-september hovedsesong)",
      beskrivelse: "Eksklusiv opplevelse for dem som vil ha Havsul for seg selv. Perfekt for VIP-gjester, jubileer, proposaler.",
      markedsforing: "Markedsfør mot bedrifter under Arendalsuka. Premium pricing."
    },
    {
      ikon: Award,
      navn: "Arendalsuka VIP-Pakke",
      type: "STRATEGISK EVENT-PRODUKT ⭐",
      varighet: "3-4 timer",
      pris: "Fra 20.000 kr per charter",
      inkludert: ["Privat charter av Havsul", "Premium catering og drikke", "Historiefortelling og lokal kunnskap", "Fotografdokumentasjon", "Flytende møterom med skjærgårdsidyll"],
      malgruppe: "Politiske partier, bedrifter, organisasjoner, VIP-gjester",
      sesong: "Uke 33 (august) - KUN under Arendalsuka",
      beskrivelse: "DEN ultimate VIP-opplevelsen under Arendalsuka! Havsul blir deres private, flytende møterom med 180 graders skjærgårdsidyll. Potensial: 100.000-250.000 kr på én uke!",
      markedsforing: "START SALG I JANUAR! LinkedIn, direkte salg til bedrifter/partier, Arendalsuka-nettverk. Inviter journalist ombord = GRATIS PR. Tilby 2-3 slots per dag.",
      nøkkeltips: ["Start salg i januar - alle planlegger tidlig!", "Kontakt politiske partier og konsulentfirmaer", "Tilby flere slots per dag (morgen/ettermiddag/kveld)", "Inviter journalist = gratis PR", "Lag case story = markedsføring for neste år"]
    },
    {
      ikon: Users,
      navn: "Stay & Sail pakke",
      type: "Hotellsamarbeid",
      varighet: "2 netter + 3 timers seilas",
      pris: "Fra 3.500 kr for 2 personer",
      inkludert: ["2 overnattinger på partnerhotell", "Frokost", "3 timers Havsul-tur", "Rabatt på restaurant"],
      malgruppe: "Turister, weekendgjester",
      sesong: "April-September",
      beskrivelse: "Samarbeid med Clarion Tyholmen, Thon, Strand Hotell Fevik. Hotell booker - vi får 70% av seiltur-delen.",
      markedsforing: "Hotellet markedsfører på sine kanaler. Vi promoterer på vår nettside."
    },
    {
      ikon: Package,
      navn: "Sail & Dine pakke",
      type: "Restaurant-samarbeid",
      varighet: "Seilas 2,5t + middag 2t",
      pris: "1.490 kr per person",
      inkludert: ["Seilas kl 17:00", "Middag på restaurant kl 20:00", "Aperitiff ombord", "3-retters middag"],
      malgruppe: "Par, date night, turister",
      sesong: "Juni-August, lørdager",
      beskrivelse: "Samarbeid med restauranter i Pollen. Perfekt helaften på fjorden og i byen.",
      markedsforing: "Felles markedsføring med restaurant. 'The perfect evening in Arendal'."
    },
    {
      ikon: Users,
      navn: "Barnas Seilskole",
      type: "Læring og moro - NY!",
      varighet: "3 dager x 3 timer",
      pris: "2.500 kr per barn",
      inkludert: ["Lær grunnleggende seiling", "Sjøvettregler", "Knuter og navigasjon", "Sertifikat ved endt kurs", "Alle dager inkl. lunsj"],
      malgruppe: "Barn 8-14 år",
      sesong: "Uke 28, 30, 32 (sommerferien)",
      beskrivelse: "Gi barna ferdigheter for livet! Roar lærer dem å seile på trygt og morsomt vis.",
      markedsforing: "Markedsfør mot lokale familier i april-mai. Begrenset antall plasser (8 barn per kurs)."
    }
  ];

  // KPI og mål for 2026
  const kpiMal = {
    bookinger: {
      mal: "200+ seilinger",
      2025: "~120 seilinger",
      vekst: "+67%"
    },
    omsetning: {
      mal: "800.000 - 1.200.000 kr",
      2025: "~600.000 kr (estimat)",
      vekst: "+33-100%"
    },
    anmeldelser: {
      google: "50+ anmeldelser (snitt 4,7+)",
      tripadvisor: "40+ anmeldelser (snitt 4,5+)"
    },
    kanaler: {
      ota: "Registrert på GetYourGuide, Viator, Airbnb Experiences",
      internasjonale: "30% av bookinger fra utlandet"
    },
    partnerskap: {
      hotell: "3 hotellavtaler signert",
      restauranter: "2 Sail & Dine samarbeid"
    }
  };

  // Strategisk oversikt
  const strategiOversikt = {
    hvemErVi: "Wannado er en aktivitets- og opplevelsesbedrift i Arendal som tilbyr naturopplevelser fra seilturer med historiske Havsul til kajakkpadling, rideturer og teambuilding. Havsul, en 43 fots treskøyte fra 1933, er vårt mest unike produkt - et flytende kulturminne som tar gjester med på en reise tilbake til seilskutetidens Arendal.",
    usp: [
      "Havsul - autentisk treskøyte fra 1933 (kulturminne)",
      "Kombinasjon av vakker natur og historiefortelling",
      "Små grupper (maks 12 personer) = personlig opplevelse",
      "Lokal kompetanse - Roar og Tone kjenner skjærgården perfekt",
      "Helårstilbud - ikke bare sommer",
      "Skreddersydde opplevelser for alle målgrupper"
    ],
    muligheter: [
      "Voksende etterspørsel etter autentiske opplevelser",
      "Internasjonal turiststrøm til Sørlandet øker",
      "Bedriftsmarkedet søker unike teambuilding-arenaer",
      "OTA-plattformer gir global distribusjon",
      "Lokale samarbeid kan multiplisere bookinger",
      "Få konkurrenter med historisk seilskøyte"
    ],
    visjon2026: "Wannado skal være den foretrukne opplevelsesleverandøren i Arendal-regionen. Havsul skal være fullt booket i høysesongen med en sunn mix av norske og internasjonale gjester. Vi skal ha etablert sterke partnerskap med hoteller og restauranter, og være kjent som 'must-do' aktiviteten i Arendal."
  };

  // Månedlig plan (beholder fra v5)
  const monthlyPlan = [
    {
      month: "Oktober 2025",
      phase: "Lavsesongen starter - Planlegging",
      focus: "Planlegging og innhold",
      tasks: [
        {
          task: "Gjør status på sommerens salg og anmeldelser",
          howTo: "Logg inn på Google My Business og TripAdvisor. Tell antall bookinger, inntekt og anmeldelser. Lag et Excel-ark med oversikt.",
          tools: ["Excel/Google Sheets", "TripAdvisor", "Google My Business"],
          time: "2-3 timer",
          responsible: "Tone + Roar"
        },
        {
          task: "Lag innhold fra årets sesong (beste bilder/video)",
          howTo: "Gå gjennom alle bilder og videoer fra sommeren. Velg ut de 20-30 beste. Organiser dem i mapper: 'Havsul under seil', 'Fornøyde gjester', 'Solnedgang', 'Skjærgård'.",
          tools: ["iPhone/kamera", "Google Photos eller Dropbox"],
          time: "4-6 timer",
          responsible: "Roar (fotograf)"
        },
        {
          task: "Sett budsjett for neste års kampanjer",
          howTo: "Basert på forventet inntekt neste år, sett av 10-20% til markedsføring. Bruk budsjettseksjonen i denne planen som mal. Eksempel: Forventet inntekt 800.000 kr → budsjett 120.000 kr til markedsføring.",
          tools: ["Excel/budsjettmal"],
          time: "2-3 timer",
          responsible: "Tone + Roar"
        },
        {
          task: "Opprett engelsk og tysk versjon av nettsiden",
          howTo: "Hvis nettsiden er laget i Wordpress: installer plugin 'WPML' eller 'Polylang'. Oversett alle sider. Alternativt: bruk Google Translate som utgangspunkt, men få en som kan språket til å kvalitetssjekke. Fokus på: Forside, Om Havsul, Booking, Priser.",
          tools: ["Wordpress + WPML plugin", "Google Translate", "Oversetter (fiverr.com)"],
          time: "8-12 timer",
          cost: "Profesjonell oversettelse: 2.000-5.000 kr",
          responsible: "Tone (web)"
        }
      ],
      channels: "Instagram, nettside, TripAdvisor, Google"
    },
    {
      month: "November 2025",
      phase: "Bygge vintersalg",
      focus: "Gavekort & samarbeid",
      tasks: [
        {
          task: "Lanser 'Gi en opplevelse til jul' kampanje",
          howTo: "Lag innlegg på Facebook og Instagram med bilde av Havsul + tekst: 'Gi noe mer enn ting - gi en opplevelse på Havsul sommeren 2026'. Kjør annonse (boost innlegget) mot 30-60 år i Agder fylke. Budsjett: 50 kr/dag i 3 uker.",
          tools: ["Facebook/Instagram", "Canva.com (gratis design)"],
          time: "3-4 timer",
          cost: "Annonse: 1.000-1.500 kr totalt",
          responsible: "Tone"
        },
        {
          task: "Lag gavekort på Havsul-tur 2026 (digitalt + fysisk)",
          howTo: "DIGITALT: Bruk Vipps Gavekort eller lag PDF-gavekort med Canva. FYSISK: Design et fint gavekort i Canva, print 50 stk hos Copy Cat Arendal (ca 500 kr). Selg via nettsiden.",
          tools: ["Vipps Business", "Canva.com", "Lokalt trykkeri"],
          time: "4-5 timer",
          cost: "Fysisk print: 500-1.000 kr",
          responsible: "Tone"
        },
        {
          task: "Oppsøk hoteller og restauranter for partnerskap",
          howTo: "Lag liste over 5-7 hoteller og 3-4 restauranter i Pollen. Ring eller besøk personlig, be om møte. Presentér 'Stay & Sail' eller 'Sail & Dine'. Tilby 10% provisjon eller felles markedsføring. Få skriftlig avtale.",
          tools: ["Telefon", "Avtalemaler", "Visittkort"],
          time: "10-15 timer totalt",
          cost: "Gratis (tid)",
          responsible: "Tone"
        },
        {
          task: "Start samarbeid med Visit Sørlandet om vinter-PR",
          howTo: "Send e-post til deres markedsavdeling. Foreslå at de inkluderer Havsul i kampanjer. Tilby gratis prøvetur. Spør om medlemskap (ca 10.000 kr/år).",
          tools: ["E-post", "Telefon"],
          time: "2-3 timer + møte",
          cost: "Medlemskap: 10.000-15.000 kr/år",
          responsible: "Tone"
        }
      ],
      channels: "Meta Ads, lokale medier, Visit Sørlandet"
    }
    // ... fortsetter med resten av månedene fra v5
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 rounded-lg shadow-2xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Compass size={48} className="text-amber-200" />
            <div>
              <h1 className="text-4xl font-bold">
                Wannado Komplett Markedsføringsplan 2026
              </h1>
              <p className="text-amber-100 text-lg">
                Din guide til beste år noensinne - Fra visjon til handling
              </p>
            </div>
          </div>
          <p className="text-amber-50 text-sm italic border-l-4 border-amber-400 pl-4">
            "Lekne og grensesprengende naturopplevelser på Sørlandet"
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('oversikt')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'oversikt' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Target size={18} />
              Strategi & Visjon
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'team' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Users size={18} />
              Teamet
            </button>
            <button
              onClick={() => setActiveTab('produkter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'produkter' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Package size={18} />
              Produkter
            </button>
            <button
              onClick={() => setActiveTab('arshjul')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'arshjul' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Calendar size={18} />
              Årshjul
            </button>
            <button
              onClick={() => setActiveTab('kpi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'kpi' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Award size={18} />
              Mål & KPI
            </button>
            <button
              onClick={() => setActiveTab('budsjett')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'budsjett' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <DollarSign size={18} />
              Budsjett
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Strategisk oversikt */}
          {activeTab === 'oversikt' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Target className="text-amber-700" />
                Strategisk Oversikt - Wannado 2026
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200">
                  <h3 className="text-xl font-bold text-teal-900 mb-3">Hvem er vi?</h3>
                  <p className="text-teal-900 leading-relaxed">{strategiOversikt.hvemErVi}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Award size={24} />
                    Våre Unike Salgsargumenter (USP)
                  </h3>
                  <ul className="space-y-2">
                    {strategiOversikt.usp.map((punkt, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-green-900">{punkt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Lightbulb size={24} />
                    Muligheter i 2026
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {strategiOversikt.muligheter.map((mulighet, index) => (
                      <li key={index} className="flex items-start gap-2 bg-white p-3 rounded">
                        <span className="text-emerald-600 mt-1">→</span>
                        <span className="text-emerald-900">{mulighet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg border-4 border-amber-400">
                  <h3 className="text-2xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Target size={28} className="text-amber-700" />
                    Visjon 2026
                  </h3>
                  <p className="text-amber-900 text-lg leading-relaxed font-medium">
                    {strategiOversikt.visjon2026}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Team-seksjonen */}
          {activeTab === 'team' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Users className="text-amber-700" />
                Wannado-teamet
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Tone */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">{team.tone.navn}</h3>
                  <p className="text-amber-700 font-semibold mb-4">{team.tone.rolle}</p>
                  <p className="text-amber-800 mb-4 text-sm italic">{team.tone.beskrivelse}</p>

                  <div className="mb-4">
                    <h4 className="font-bold text-amber-900 mb-2">Ansvarsområder:</h4>
                    <ul className="space-y-1">
                      {team.tone.ansvar.map((a, i) => (
                        <li key={i} className="text-amber-800 text-sm flex items-start gap-2">
                          <span className="text-amber-600">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone size={16} className="text-amber-700" />
                      <a href={`tel:${team.tone.tlf}`} className="text-amber-900 font-medium hover:text-amber-700">
                        {team.tone.tlf}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-amber-700" />
                      <a href={`mailto:${team.tone.epost}`} className="text-amber-900 font-medium hover:text-amber-700">
                        {team.tone.epost}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Roar */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-teal-900 mb-2">{team.roar.navn}</h3>
                  <p className="text-teal-700 font-semibold mb-4">{team.roar.rolle}</p>
                  <p className="text-teal-800 mb-4 text-sm italic">{team.roar.beskrivelse}</p>

                  <div className="mb-4">
                    <h4 className="font-bold text-teal-900 mb-2">Ansvarsområder:</h4>
                    <ul className="space-y-1">
                      {team.roar.ansvar.map((a, i) => (
                        <li key={i} className="text-teal-800 text-sm flex items-start gap-2">
                          <span className="text-teal-600">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone size={16} className="text-teal-700" />
                      <a href={`tel:${team.roar.tlf}`} className="text-teal-900 font-medium hover:text-teal-700">
                        {team.roar.tlf}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-teal-700" />
                      <a href={`mailto:${team.roar.epost}`} className="text-teal-900 font-medium hover:text-teal-700">
                        {team.roar.epost}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <h3 className="font-bold text-amber-900 mb-2">Kontaktinfo generell:</h3>
                <p className="text-amber-800">
                  <strong>Telefon:</strong> +47 99 46 99 57<br />
                  <strong>E-post:</strong> mail@wannado.no<br />
                  <strong>Postadresse:</strong> Skarestrand 11, 4812 Kongshavn<br />
                  <strong>Møtested båtturer:</strong> Arendal sentrum eller avtalt sted
                </p>
              </div>
            </div>
          )}

          {/* Produkter-seksjonen */}
          {activeTab === 'produkter' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Package className="text-amber-700" />
                Produktportefølje 2026
              </h2>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-6 rounded">
                <p className="text-teal-900">
                  <strong>Strategi:</strong> Tydelige produktpakker gjør det enklere for kunder å velge og for dere å markedsføre.
                  Hver pakke har sitt unike salgsargument og målgruppe.
                </p>
              </div>

              <div className="space-y-6">
                {produkter.map((produkt, index) => {
                  const Ikon = produkt.ikon;
                  const isHighlight = produkt.navn.includes('Sunset');
                  
                  return (
                    <div 
                      key={index}
                      className={`p-6 rounded-lg border-2 shadow-lg ${
                        isHighlight 
                          ? 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-400 border-4' 
                          : 'bg-gradient-to-r from-white to-amber-50 border-amber-200'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${isHighlight ? 'bg-orange-500' : 'bg-amber-500'}`}>
                          <Ikon size={32} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-amber-900">{produkt.navn}</h3>
                            {isHighlight && (
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                HOVEDPRODUKT
                              </span>
                            )}
                          </div>
                          <p className="text-amber-700 font-semibold">{produkt.type}</p>
                        </div>
                      </div>

                      <p className="text-amber-900 mb-4">{produkt.beskrivelse}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-amber-900 mb-2">Detaljer:</h4>
                          <p className="text-sm text-amber-800">
                            <strong>Varighet:</strong> {produkt.varighet}<br />
                            <strong>Pris:</strong> {produkt.pris}<br />
                            <strong>Målgruppe:</strong> {produkt.malgruppe}<br />
                            <strong>Sesong:</strong> {produkt.sesong}
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-bold text-green-900 mb-2">Inkludert:</h4>
                          <ul className="space-y-1">
                            {produkt.inkludert.map((item, i) => (
                              <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                        <h4 className="font-bold text-teal-900 mb-1 flex items-center gap-2">
                          <TrendingUp size={16} />
                          Markedsføring:
                        </h4>
                        <p className="text-sm text-teal-800">{produkt.markedsforing}</p>
                      </div>

                      {produkt.nøkkeltips && (
                        <div className="mt-4 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
                          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                            <Lightbulb size={16} />
                            Nøkkeltips for suksess:
                          </h4>
                          <ul className="space-y-1">
                            {produkt.nøkkeltips.map((tip, i) => (
                              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                                <span className="text-amber-600">💡</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* KPI-seksjonen */}
          {activeTab === 'kpi' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Award className="text-amber-700" />
                Mål og KPI for 2026
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Bookinger og omsetning</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-green-700 mb-1">Antall seilinger</p>
                      <p className="text-3xl font-bold text-green-900">{kpiMal.bookinger.mal}</p>
                      <p className="text-sm text-green-600 mt-1">Vekst: {kpiMal.bookinger.vekst} fra 2025</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-green-700 mb-1">Omsetning Havsul</p>
                      <p className="text-3xl font-bold text-green-900">{kpiMal.omsetning.mal}</p>
                      <p className="text-sm text-green-600 mt-1">Vekst: {kpiMal.omsetning.vekst}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-300">
                  <h3 className="text-xl font-bold text-teal-900 mb-4">Anmeldelser og omdømme</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-teal-700 mb-2">Google My Business</p>
                      <p className="text-lg font-bold text-teal-900">{kpiMal.anmeldelser.google}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-teal-700 mb-2">TripAdvisor</p>
                      <p className="text-lg font-bold text-teal-900">{kpiMal.anmeldelser.tripadvisor}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-300">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Nye kanaler og partnerskap</h3>
                  <ul className="space-y-3">
                    <li className="bg-white p-4 rounded-lg">
                      <span className="font-bold text-amber-900">OTA-plattformer: </span>
                      <span className="text-amber-800">{kpiMal.kanaler.ota}</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg">
                      <span className="font-bold text-amber-900">Internasjonale gjester: </span>
                      <span className="text-amber-800">{kpiMal.kanaler.internasjonale}</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg">
                      <span className="font-bold text-amber-900">Hotellsamarbeid: </span>
                      <span className="text-amber-800">{kpiMal.partnerskap.hotell}</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg">
                      <span className="font-bold text-amber-900">Restaurant-samarbeid: </span>
                      <span className="text-amber-800">{kpiMal.partnerskap.restauranter}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-100 p-6 rounded-lg border-l-4 border-amber-600">
                  <h3 className="font-bold text-amber-900 mb-3">Slik måler dere fremgang:</h3>
                  <ul className="space-y-2 text-amber-900">
                    <li>• <strong>Månedlig:</strong> Tell bookinger og inntekt. Oppdater Excel-ark.</li>
                    <li>• <strong>Kvartalsvis:</strong> Sjekk anmeldelser på Google og TripAdvisor. Responder på alle.</li>
                    <li>• <strong>Hver onsdag:</strong> Se på neste ukes bookinger. Justér markedsføring hvis nødvendig.</li>
                    <li>• <strong>Etter hver tur:</strong> Be gjester legge igjen anmeldelse.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Budsjett-seksjonen */}
          {activeTab === 'budsjett' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <DollarSign className="text-amber-700" />
                Budsjettveiledning 2026
              </h2>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-6 rounded">
                <p className="text-teal-900">
                  <strong>Generell regel:</strong> Sett av 10-20% av forventet omsetning til markedsføring.
                  For oppstartsfase eller vekst: 15-25%. Under ser du tre budsjettscenarioer.
                </p>
              </div>

              <div className="space-y-6">
                {/* Minimum budsjett */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-300">
                  <h3 className="text-xl font-bold text-teal-900 mb-4">Minimumbudsjett: 50.000 - 100.000 kr/år</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      Gratis SoMe-markedsføring (Instagram, Facebook) - Egen innsats
                    </li>
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      Gavekortkampanje jul: 3.000-5.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      Lokale brosjyrer og flagg: 15.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      1-2 influensere (gratis turer): 6.000 kr verdi
                    </li>
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      Google My Business optimalisering: Gratis
                    </li>
                    <li className="flex items-start gap-2 text-teal-900">
                      <span className="text-teal-600 mt-1">✓</span>
                      Noe Meta Ads (Facebook/Instagram): 20.000 kr
                    </li>
                  </ul>
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="text-sm text-teal-900"><strong>Best for:</strong> Begrenset budsjett. Krever mye egeninnsats, men kan gi gode resultater.</p>
                  </div>
                </div>

                {/* Anbefalt budsjett */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-4 border-green-400">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-green-900">Anbefalt budsjett: 150.000 - 250.000 kr/år</h3>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ANBEFALT
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      <strong>Alt i minimumbudsjett +</strong>
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Meta Ads (Facebook/Instagram): 60.000-100.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Google Ads: 50.000-80.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      OTA-registrering (GetYourGuide, Viator) - Kun provisjon ved salg
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Profesjonell video og foto: 30.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Influenser-honorar: 20.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Trykkemateriell og flagg: 15.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-green-900">
                      <span className="text-green-600 mt-1">✓</span>
                      Visit Sørlandet medlemskap: 10.000 kr
                    </li>
                  </ul>
                  <div className="bg-green-100 p-4 rounded">
                    <p className="text-green-900"><strong>Best for:</strong> Balansert vekst med målbar ROI. Dette budsjettet dekker det viktigste for god synlighet både lokalt og internasjonalt. Forventet ROI: 300-500%</p>
                  </div>
                </div>

                {/* Aggressiv vekst */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-300">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Aggressiv vekst: 350.000 - 500.000 kr/år</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      <strong>Alt i anbefalt budsjett +</strong>
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      Markedsføringsbyrå/konsulent: 100.000-150.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      Økt Meta/Google Ads budsjett: 200.000 kr totalt
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      Internasjonal PR-kampanje: 50.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      Profesjonell fotograf/videograf hele sesongen: 80.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      Event-sponsing og partnermøter: 30.000 kr
                    </li>
                    <li className="flex items-start gap-2 text-amber-900">
                      <span className="text-amber-600 mt-1">✓</span>
                      CRM-system og marketing automation: 40.000 kr
                    </li>
                  </ul>
                  <div className="bg-amber-100 p-3 rounded">
                    <p className="text-sm text-amber-900"><strong>Best for:</strong> Rask skalering og maksimal markedsandel. Profesjonell drift med dedikert markedsføringshjelp.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-bold text-emerald-900 mb-3 text-lg">ROI-forventninger:</h3>
                <ul className="space-y-2 text-emerald-900">
                  <li>• <strong>Gavekortsalg:</strong> ROI 300-500% (lav kostnad, direkte inntekt)</li>
                  <li>• <strong>Meta/Google Ads:</strong> ROI 150-300% i høysesongen</li>
                  <li>• <strong>OTA-plattformer:</strong> Provisjon 20-30%, men ekspanderer markedet betydelig</li>
                  <li>• <strong>PR og influensere:</strong> Langsiktig effekt - vanskelig å måle direkte</li>
                  <li>• <strong>Lokale partnerskap:</strong> ROI 200-400% (hoteller sender kunder til dere)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Årshjul */}
          {activeTab === 'arshjul' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Calendar className="text-amber-700" />
                Markedsføringsårshjul 2025-2026
              </h2>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-6 rounded">
                <p className="text-teal-900">
                  <strong>Slik bruker du årshjulet:</strong> For hver måned finner du konkrete oppgaver.
                  Klikk på <HelpCircle size={16} className="inline text-teal-700" /> for detaljerte instruksjoner.
                  Kryss av når oppgaver er fullført - fremgangen lagres automatisk.
                </p>
              </div>

              <div className="space-y-8">
                {monthlyPlan.map((month, monthIndex) => (
                  <div
                    key={monthIndex}
                    className="border-2 border-amber-200 rounded-lg p-6 hover:shadow-xl transition-all bg-gradient-to-r from-white to-amber-50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                          {month.phase}
                        </span>
                        <h3 className="text-2xl font-bold text-amber-900">
                          {month.month}
                        </h3>
                        <p className="text-amber-700 font-medium text-lg">{month.focus}</p>
                      </div>
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {month.channels}
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      {month.tasks.map((taskItem, taskIndex) => {
                        const itemId = `${monthIndex}-${taskIndex}`;
                        const isExpanded = expandedHelp[itemId];
                        
                        return (
                          <div key={taskIndex} className="bg-white p-5 rounded-lg border border-amber-200 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                              <button
                                onClick={() => toggleCheck(itemId)}
                                className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 transition-all ${
                                  checkedItems[itemId]
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-amber-400 hover:border-amber-600'
                                }`}
                              >
                                {checkedItems[itemId] && (
                                  <CheckSquare size={20} className="text-white" />
                                )}
                              </button>
                              <div className="flex-1">
                                <h4 className={`font-semibold text-lg ${checkedItems[itemId] ? 'line-through text-gray-500' : 'text-amber-900'}`}>
                                  {taskItem.task}
                                </h4>
                              </div>
                              <button
                                onClick={() => toggleHelp(itemId)}
                                className="flex-shrink-0 text-teal-600 hover:text-teal-800"
                                title="Vis/skjul detaljer"
                              >
                                <HelpCircle size={24} />
                              </button>
                            </div>

                            {isExpanded && (
                              <div className="mt-4 space-y-3">
                                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                                  <h5 className="font-semibold text-teal-900 mb-2 flex items-center gap-2">
                                    <FileText size={16} />
                                    Slik gjør du det:
                                  </h5>
                                  <p className="text-teal-900 text-sm whitespace-pre-line">{taskItem.howTo}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-3">
                                  {taskItem.tools && (
                                    <div className="bg-amber-50 p-3 rounded border border-amber-200">
                                      <p className="text-xs font-semibold text-amber-900 mb-1">Verktøy du trenger:</p>
                                      <ul className="text-sm text-amber-800 space-y-1">
                                        {taskItem.tools.map((tool, i) => (
                                          <li key={i}>• {tool}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {taskItem.time && (
                                    <div className="bg-teal-50 p-3 rounded border border-teal-200">
                                      <p className="text-xs font-semibold text-teal-900 mb-1">Tidsbruk:</p>
                                      <p className="text-sm text-teal-800">{taskItem.time}</p>
                                    </div>
                                  )}

                                  {taskItem.cost && (
                                    <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                                      <p className="text-xs font-semibold text-emerald-900 mb-1">Kostnad:</p>
                                      <p className="text-sm text-emerald-800">{taskItem.cost}</p>
                                    </div>
                                  )}

                                  {taskItem.responsible && (
                                    <div className="bg-amber-50 p-3 rounded border border-amber-200">
                                      <p className="text-xs font-semibold text-amber-900 mb-1">Ansvarlig:</p>
                                      <p className="text-sm text-amber-800">{taskItem.responsible}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Notatfelt */}
                                <div className="bg-amber-50 p-3 rounded border border-amber-300">
                                  <label className="text-xs font-semibold text-amber-900 mb-1 block">Dine notater:</label>
                                  <textarea
                                    value={notes[itemId] || ''}
                                    onChange={(e) => addNote(itemId, e.target.value)}
                                    placeholder="Skriv notater her..."
                                    className="w-full p-2 text-sm border border-amber-300 rounded resize-none"
                                    rows="2"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 bg-amber-900 text-white p-6 rounded-lg text-center">
          <p className="text-lg font-semibold mb-2">Lykke til med 2026! 🚤</p>
          <p className="text-amber-200 text-sm">
            Denne planen er et levende dokument. Juster og tilpass etter hvert som dere lærer hva som fungerer best for Wannado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WannadoMarkedsplan2026;

