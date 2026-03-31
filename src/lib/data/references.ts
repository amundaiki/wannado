export const COMPANIES = [
  "ABCenter",
  "Agder Energi",
  "Aker Kværner, Kristiansand",
  "Aker Solutions, Pusnes",
  "Amfi Arena",
  "Arendal Kommune",
  "Befalets fellesorganisasjon",
  "Durapart",
  "ERV Teknikk",
  "Flexmodul",
  "Frilynt Ungdomsforening",
  "Fylkeskommunens ansatte",
  "Idrettsleiren v/Agder idrettskrets",
  "KPMG",
  "Kvadraturen skolesenter",
  "Lady Circle",
  "Lindeberg Skole",
  "National Oilwell Varco",
  "NODE",
  "Norges Blindeforbund",
  "Origo Solutions",
  "Protan",
  "Skatt Sør",
  "Stærk & co",
  "Statoil Hydro",
  "Statens Vegvesen",
  "Sørlandskirken",
  "Teekay",
  "Ups & Downs",
] as const;

export type Company = (typeof COMPANIES)[number];

export const TESTIMONIALS = [
  {
    quote:
      "Gruppen fra NOV var i ekstase da de kom hjem, det var virkelig et supert opplegg! ALT gikk på skinner. Utvelgelsen av lagene ble gjort på en særdeles artig måte. Oppgavene var utfordrende, engasjerende og morsomme. Opplegget passet for alle, og samtlige var så fornøyde.",
    author: "Charlotte Beckmann Østeby",
    company: "Cforyou",
  },
  {
    quote:
      "Tusen takk for en fantastisk pangstart på dagen! For et løft. Dette var morsomt! Tror aldri jeg har vært så nær mine kollegaer før. Det ble en snakkis utover dagen, og startet noen gode refleksjoner og samtaler.",
    author: "Anonym",
    company: "Bedriftskunde",
  },
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];

export const TV_APPEARANCES = [
  {
    show: "Jakten på Kjærligheten",
    year: 2011,
    description:
      "Wannado arrangerte aktiviteter for TV 2s populære datingprogram",
  },
  {
    show: "71 grader nord",
    year: 2009,
    description:
      "Uttak til sesong 2009 av den legendariske konkurransen",
  },
] as const;

export type TvAppearance = (typeof TV_APPEARANCES)[number];
