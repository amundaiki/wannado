import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Priser | Wannado",
  description:
    "Se priser for kajakkturer, seilturer med Havsul, teambuilding, hesteopplevelser, foredrag og utleie hos Wannado i Arendal.",
};

const pricingCategories = [
  {
    id: "seilturer",
    title: "Seilturer",
    cards: [
      {
        name: "Seiltur med Havsul",
        price: "Fra 350 kr",
        priceNote: "per person",
        description:
          "Historisk seilas i Arendals skjærgård med den autentiske Listerskøyta Havsul.",
        includes: ["Guidet seilas", "Historisk fortelling", "Skjærgårdsopplevelse"],
        cta: "Bestill seiltur",
        ctaHref: "/booking",
        audience: "Passer for grupper, bedrifter og private",
      },
    ],
  },
  {
    id: "kajakk",
    title: "Kajakkturer",
    cards: [
      {
        name: "Guidet kajakktur",
        price: "Etter avtale",
        priceNote: "",
        description:
          "Oppdag skjærgården fra kajakk med erfarne guider. Turene tilpasses gruppen og værforhold.",
        includes: ["Erfaren guide", "Alt nødvendig utstyr", "Sikkerhetsgjennomgang"],
        cta: "Be om pris",
        ctaHref: "/booking",
        audience: "Passer for nybegynnere og erfarne",
      },
      {
        name: "Skjærgårdssafari",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "En spennende dag med kajakkpadling, utforskning av holmer og skjær, og kanskje et møte med sjøliv.",
        includes: ["Guidet tur", "Utstyr", "Pause med noe å bite i"],
        cta: "Be om pris",
        ctaHref: "/booking",
        audience: "Passer for alle som vil oppleve mer",
      },
    ],
  },
  {
    id: "kurs",
    title: "Kajakkurs",
    cards: [
      {
        name: "Nybegynnerkurs",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "Lær det grunnleggende om kajakkpadling, inkludert våttkort. Perfekt for deg som aldri har padlet før.",
        includes: ["Våttkort", "Teori og praksis", "Alt utstyr"],
        cta: "Meld deg på",
        ctaHref: "/booking",
        audience: "For nybegynnere",
      },
      {
        name: "Avanserte kurs",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "Fordyp deg i kajakkferdigheter med kurs for deg som allerede har grunnleggende erfaring.",
        includes: ["Individuell veiledning", "Tilpasset nivå", "Utstyr"],
        cta: "Be om informasjon",
        ctaHref: "/booking",
        audience: "For erfarne padlere",
      },
    ],
  },
  {
    id: "teambuilding",
    title: "Teambuilding",
    cards: [
      {
        name: "Basispakke",
        price: "Fra 4 500 kr",
        priceNote: "",
        description:
          "En kort og effektiv teambuilding-opplevelse som gir energi og samhold på bare noen timer.",
        includes: ["Aktiviteter", "Guider", "Utstyr", "Refleksjon"],
        cta: "Bestill teambuilding",
        ctaHref: "/booking",
        audience: "Inntil 20 deltakere",
      },
      {
        name: "Halvdagsopplegg",
        price: "Fra 8 000 kr",
        priceNote: "",
        description:
          "Et grundig halvdagsprogram med flere aktiviteter, god tid til refleksjon og teamutvikling.",
        includes: ["Aktiviteter", "Guider", "Utstyr", "Refleksjon", "Pause med enkel servering"],
        cta: "Bestill halvdag",
        ctaHref: "/booking",
        audience: "Inntil 25 deltakere",
      },
      {
        name: "Heldagsopplegg",
        price: "Fra 15 000 kr",
        priceNote: "",
        description:
          "En komplett dag med teambuilding, naturopplevelser og måltider. Det ultimate opplegget for bedrifter.",
        includes: ["Aktiviteter", "Guider", "Utstyr", "Refleksjon", "Måltider", "Transport"],
        cta: "Bestill heldag",
        ctaHref: "/booking",
        audience: "Inntil 30 deltakere",
      },
    ],
  },
  {
    id: "hest",
    title: "Hesteopplevelser",
    cards: [
      {
        name: "Ridetur",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "Opplev naturen fra hesteryggen. Turene tilpasses etter erfaring og ønsker.",
        includes: ["Erfaren rideguide", "Hest og utstyr", "Tilpasset rute"],
        cta: "Be om pris",
        ctaHref: "/booking",
        audience: "Passer for alle nivåer",
      },
      {
        name: "Hestekurs",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "Lær om hester, stell og ridning i et rolig og trygt miljø.",
        includes: ["Individuell veiledning", "Hest og utstyr", "Teori og praksis"],
        cta: "Be om informasjon",
        ctaHref: "/booking",
        audience: "Tilpasses etter behov",
      },
    ],
  },
  {
    id: "foredrag",
    title: "Foredrag",
    cards: [
      {
        name: "JTI-foredrag",
        price: "Skreddersys",
        priceNote: "etter behov",
        description:
          "Inspirerende foredrag om JTI (Jeg Tar Initiativ) og personlig utvikling, tilpasset din bedrift eller organisasjon.",
        includes: ["Tilpasset innhold", "Erfaren foredragsholder", "Interaktiv levering"],
        cta: "Be om tilbud",
        ctaHref: "/booking",
        audience: "For bedrifter og organisasjoner",
      },
      {
        name: "Ekspedisjonsforedrag",
        price: "Ta kontakt",
        priceNote: "for pris",
        description:
          "Hør om ekte ekspedisjoner, mestring og naturopplevelser fra Sørlandet og utover.",
        includes: ["Engasjerende fortelling", "Bilder og videoer", "Tilpasset lengde"],
        cta: "Be om pris",
        ctaHref: "/booking",
        audience: "For alle som vil bli inspirert",
      },
    ],
  },
  {
    id: "utleie",
    title: "Utleie",
    cards: [
      {
        name: "Kajakkutleie",
        price: "Ta kontakt",
        priceNote: "for priser",
        description:
          "Leie av kajakk for egne turer i Arendals skjærgård. Vi hjelper deg med ruteplanlegging og sikkerhet.",
        includes: ["Kajakk", "Åre", "Redningsvest", "Tørrpose"],
        cta: "Be om priser",
        ctaHref: "/booking",
        audience: "Time- eller dagsleie",
      },
      {
        name: "Kanoutleie",
        price: "Ta kontakt",
        priceNote: "for priser",
        description:
          "Leie av kano for rolige turer på innsjøer og rolige elver i området.",
        includes: ["Kano", "Årer", "Redningsvester"],
        cta: "Be om priser",
        ctaHref: "/booking",
        audience: "Time- eller dagsleie",
      },
    ],
  },
];

function PricingCard({
  name,
  price,
  priceNote,
  description,
  includes,
  cta,
  ctaHref,
  audience,
}: {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  includes: string[];
  cta: string;
  ctaHref: string;
  audience: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 lg:p-8 flex flex-col">
      <div className="mb-4">
        <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          {audience}
        </p>
        <h3 className="mt-2 font-space text-xl font-semibold text-brown">{name}</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-space text-3xl font-bold text-brown">{price}</span>
          {priceNote && (
            <span className="font-inter text-sm text-brown-muted">{priceNote}</span>
          )}
        </div>
      </div>

      <p className="font-inter text-sm leading-relaxed text-brown-mid mb-6">
        {description}
      </p>

      <div className="mb-6 flex-1">
        <p className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-brown-muted mb-3">
          Inkluderer
        </p>
        <ul className="space-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2 font-inter text-sm text-brown-mid">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={ctaHref}
        className="inline-flex items-center justify-center rounded-xl bg-brown px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#5a4838]"
      >
        {cta}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-brown pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            Priser
          </p>
          <h1 className="mt-4 font-space text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Priser og pakker
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-warm-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
          <p className="max-w-3xl font-inter text-lg leading-relaxed text-brown-mid">
            Prisene varierer etter gruppestørrelse, varighet og sesong. Kontakt oss for et
            uforpliktende tilbud.
          </p>
        </div>
      </section>

      {/* Pricing sections */}
      {pricingCategories.map((category) => (
        <section
          key={category.id}
          className="border-b border-border bg-cream"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
            <h2 className="mb-10 font-space text-3xl font-bold text-brown">
              {category.title}
            </h2>
            <div
              className={`grid gap-6 ${
                category.cards.length === 1
                  ? "grid-cols-1 max-w-lg"
                  : category.cards.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {category.cards.map((card) => (
                <PricingCard key={card.name} {...card} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA section */}
      <section className="bg-brown">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 text-center">
          <h2 className="font-space text-3xl font-bold text-white md:text-4xl">
            Usikker på hva du trenger?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-lg leading-relaxed text-white/70">
            Vi hjelper deg med å finne den perfekte opplevelsen for deg og ditt selskap.
            Ta kontakt, så setter vi sammen et tilbud som passer dere.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 font-inter text-sm font-semibold text-brown transition-colors hover:bg-sand"
            >
              Send en forespørsel
            </Link>
            <a
              href="tel:+4799469957"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-3.5 font-inter text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Ring oss: +47 99 46 99 57
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
