export type FaqItem = {
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  generelt: "Generelt",
  booking: "Booking og priser",
  kajakk: "Kajakk",
  bedrift: "Teambuilding og bedrift",
  sikkerhet: "Sikkerhet",
  praktisk: "Praktisk informasjon",
  seiltur: "Seiltur",
};

export const FAQ_CATEGORY_ORDER = [
  "generelt",
  "booking",
  "kajakk",
  "bedrift",
  "sikkerhet",
  "praktisk",
  "seiltur",
];

export const FALLBACK_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Hva tilbyr Wannado?",
    answer:
      "Wannado tilbyr kajakkturer, seilturer med Listerskøyta Havsul, teambuilding for bedrifter, hesteopplevelser, kurs og foredrag. Vi holder til i Arendal-regionen og har over 15 års erfaring.",
    category: "generelt",
    order: 10,
  },
  {
    question: "Hvor holder dere til?",
    answer:
      "Vi har base i Skarestrand 11, 4812 Kongshavn i Arendal-regionen. De fleste opplevelsene har utgangspunkt i Arendals skjærgård, men vi kan tilpasse oss andre lokasjoner etter avtale.",
    category: "generelt",
    order: 20,
  },
  {
    question: "Når er sesongen?",
    answer:
      "Hovedsesongen er mai til september for utendørsaktiviteter. Kajakkurs og foredrag arrangeres året rundt.",
    category: "generelt",
    order: 30,
  },
  {
    question: "Hvordan booker jeg en opplevelse?",
    answer:
      "Du kan sende en forespørsel via booking-siden vår, ringe oss direkte eller bruke kontaktskjemaet. Vi svarer normalt innen 24 timer.",
    category: "booking",
    order: 40,
  },
  {
    question: "Hva koster det?",
    answer:
      "Prisene varierer etter type opplevelse, antall deltakere og varighet. Seilturer starter fra 350 kr per person. Teambuilding fra 4 500 kr. Kontakt oss for en skreddersydd pris.",
    category: "booking",
    order: 50,
  },
  {
    question: "Må vi booke lang tid i forveien?",
    answer:
      "Populære datoer fylles raskt, spesielt i sommerhalvåret. Send forespørsel så tidlig som mulig, men ta kontakt selv om det haster.",
    category: "booking",
    order: 60,
  },
  {
    question: "Trenger jeg erfaring for å bli med på kajakktur?",
    answer:
      "Nei, vi tilpasser turene etter gruppens nivå. Nybegynnere får grundig opplæring i sikkerhet og padleteknikk før vi legger ut på tur.",
    category: "kajakk",
    order: 70,
  },
  {
    question: "Hva er våttkort?",
    answer:
      "Våttkort er et sertifikat som dokumenterer at du har grunnleggende sikkerhetskunnskaper for padling i kaldt vann. Det inngår i våre nybegynnerkurs.",
    category: "kajakk",
    order: 80,
  },
  {
    question: "Hva bør jeg ha med på kajakktur?",
    answer:
      "Vi stiller med kajakk, åre, vest og spruttrekk. Du bør ha med klær som tåler å bli våte, solkrem, drikke og eventuelt ekstra skift.",
    category: "kajakk",
    order: 90,
  },
  {
    question: "Hva inkluderer et teambuilding-opplegg?",
    answer:
      "Vi skreddersyr opplegget etter deres mål. Det kan inkludere kajakkpadling, seiltur, JTI-personlighetstest, øvelser på land og refleksjon underveis.",
    category: "bedrift",
    order: 100,
  },
  {
    question: "Hvor mange kan delta?",
    answer:
      "Vi tar imot grupper fra 4 til 50 personer. For større grupper samarbeider vi med andre aktører.",
    category: "bedrift",
    order: 110,
  },
  {
    question: "Kan dere komme til vår bedrift?",
    answer:
      "Ja, vi kan holde foredrag og JTI-workshops hos dere, eller legge opp til en dag med aktiviteter i Arendal-regionen.",
    category: "bedrift",
    order: 120,
  },
  {
    question: "Er det trygt å padle med Wannado?",
    answer:
      "Ja, sikkerhet har høyeste prioritet. Alle guider har relevant opplæring, vi bruker godkjent utstyr, og vi tilpasser alltid turene etter vær- og føreforhold.",
    category: "sikkerhet",
    order: 130,
  },
  {
    question: "Hva skjer hvis været er dårlig?",
    answer:
      "Vi følger med på værmeldingen og kan flytte eller avlyse turer ved behov. Dere får alltid beskjed i god tid og tilbud om ny dato eller refusjon.",
    category: "sikkerhet",
    order: 140,
  },
];

export function groupFaqItems(items: FaqItem[]) {
  const categories = new Map<string, FaqItem[]>();

  for (const item of items) {
    const category = item.category || "generelt";
    const categoryItems = categories.get(category) ?? [];
    categoryItems.push(item);
    categories.set(category, categoryItems);
  }

  return Array.from(categories.entries())
    .map(([id, categoryItems]) => ({
      id,
      label: FAQ_CATEGORY_LABELS[id] ?? id,
      items: categoryItems.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => {
      const aIndex = FAQ_CATEGORY_ORDER.indexOf(a.id);
      const bIndex = FAQ_CATEGORY_ORDER.indexOf(b.id);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
}
