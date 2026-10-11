import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Priser på seilturer, kajakk, kurs og teambuilding",
  description:
    "Se priser for kajakkturer, seilturer med Havsul, teambuilding, hesteopplevelser, foredrag og utleie hos Wannado i Arendal.",
  path: "/priser",
  image: "/images/havsul.jpg",
  imageAlt: "Priser for opplevelser med Wannado",
});

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
        name: "Mysterieopplegg",
        price: "Fra 4 500 kr",
        priceNote: "",
        description:
          "Mord i Cicilia og andre korte mysterier der gruppen løser gåten sammen. Et intenst og morsomt innslag på samlingen.",
        includes: ["Spilleder", "Rekvisitter", "Roller og oppgaver"],
        cta: "Bestill teambuilding",
        ctaHref: "/booking",
        audience: "Cirka 1 til 1,5 time",
      },
      {
        name: "Teambuilding-opplegg",
        price: "Fra 16 500 kr",
        priceNote: "eller 550 kr per person (fra 30 stk)",
        description:
          "360 Wannado, Heia dem som vinner, CLUEDO og BEDRAGER. Aktive opplegg som bygger samarbeid og latter på rundt to timer.",
        includes: ["Aktiviteter", "Guider", "Utstyr", "Refleksjon"],
        cta: "Bestill teambuilding",
        ctaHref: "/booking",
        audience: "Per person-pris fra 30 deltakere",
      },
      {
        name: "Påfyll på Bjellandstrand Gård",
        price: "1 950 kr",
        priceNote: "per person",
        description:
          "Utendørs teambuilding på Bjellandstrand Gård med aktiviteter og et godt måltid. En komplett halvdag for gruppen.",
        includes: ["Aktiviteter", "Guider", "Måltid"],
        cta: "Bestill teambuilding",
        ctaHref: "/booking",
        audience: "2 til 3 timer med måltid",
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
        price: "Fra 6 000 kr",
        priceNote: "JTI Light, cirka 1 time",
        description:
          "Inspirerende foredrag om JTI (Jungian Type Index) og personlig utvikling, tilpasset din bedrift eller organisasjon.",
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

const pricingPrinciples = [
  {
    title: "Gruppestørrelse",
    text: "Antall deltakere påvirker guider, utstyr, transport og hvor mange aktiviteter vi kan kjøre parallelt.",
  },
  {
    title: "Varighet og innhold",
    text: "En kort seilas, en halvdag med teambuilding og en fagdag med foredrag prises forskjellig.",
  },
  {
    title: "Sesong og logistikk",
    text: "Vær, tidspunkt, servering og oppmøtested kan påvirke endelig tilbud, særlig for bedriftsgrupper.",
  },
];

function priceFromText(price: string) {
  const match = price.match(/(\d[\d\s]*)/);
  return match ? match[1].replace(/\s/g, "") : undefined;
}

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": absoluteUrl("/priser#offer-catalog"),
  name: "Priser og pakker hos Wannado",
  description:
    "Priser for seilturer, kajakkturer, kurs, teambuilding, foredrag og utleie hos Wannado.",
  url: absoluteUrl("/priser"),
  provider: {
    "@id": absoluteUrl("/#organization"),
  },
  itemListElement: pricingCategories.map((category) => ({
    "@type": "OfferCatalog",
    name: category.title,
    itemListElement: category.cards.map((card) => {
      const price = priceFromText(card.price);

      return {
        "@type": "Offer",
        name: card.name,
        description: card.description,
        url: absoluteUrl(card.ctaHref),
        priceCurrency: "NOK",
        ...(price ? { price } : {}),
        itemOffered: {
          "@type": "Service",
          name: card.name,
          description: card.description,
          audience: card.audience,
        },
      };
    }),
  })),
};

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
        className="inline-flex items-center justify-center rounded-xl bg-brown px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-brown-hover"
      >
        {cta}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main id="innhold" className="min-h-screen">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Priser", path: "/priser" }])}
      />
      <JsonLd data={pricingSchema} />
      <Navbar variant="solid" />

      {/* Hero */}
      <section className="relative flex min-h-[640px] items-end overflow-hidden text-white md:min-h-[600px]">
        <Image
          src="/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg"
          alt="Gruppeaktivitet med Wannado under teambuilding på Sørlandet"
          fill
          priority
          loading="eager"
          className="object-cover object-[48%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/74 via-brown/58 to-brown/86" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(246,213,142,0.18),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pb-14 pt-32 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.35em] text-[#f6d58e] md:text-sm">
              Priser
            </p>
            <h1 className="mt-4 max-w-4xl font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
              Priser og pakker for opplevelser i Arendal
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/86 md:text-xl">
              Se fra-priser og typiske pakker. For grupper tilpasser vi
              innhold, varighet og logistikk før vi gir et konkret tilbud.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
              >
                Send forespørsel
              </Link>
              <Link
                href="#prisoversikt"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
              >
                Se prisoversikt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-warm-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <div>
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.3em] text-teal">
                Slik prises det
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-4xl">
                Fra-priser der det er fast, tilbud der opplegget må tilpasses
              </h2>
              <p className="mt-5 font-inter text-base leading-7 text-brown-mid">
                Noen opplevelser kan bestilles direkte, mens bedriftsopplegg,
                kurs og foredrag ofte skreddersys. Da gir vi et uforpliktende
                tilbud før dere bestemmer dere.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pricingPrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="border border-border bg-white p-5 shadow-sm"
                >
                  <h3 className="font-space text-xl font-semibold text-brown">
                    {principle.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm leading-6 text-brown-mid">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {pricingCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-brown/12 bg-white px-4 font-inter text-sm font-medium text-brown-mid transition-colors hover:border-teal/40 hover:text-teal"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing sections */}
      {pricingCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="border-b border-border bg-cream"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="mb-10 max-w-3xl">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.25em] text-teal">
                Prisoversikt
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold text-brown">
                {category.title}
              </h2>
            </div>
            <div
              className={`grid gap-6 ${
                category.cards.length === 1
                  ? "grid-cols-1 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)]"
                  : category.cards.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {category.cards.map((card) => (
                <PricingCard key={card.name} {...card} />
              ))}
              {category.cards.length === 1 ? (
                <aside className="border border-border bg-warm-white p-6 shadow-sm lg:p-8">
                  <p className="font-inter text-xs font-semibold uppercase tracking-[0.25em] text-teal">
                    Få riktig pris
                  </p>
                  <h3 className="mt-3 font-space text-2xl font-semibold text-brown">
                    Vi avklarer rammen før bestilling
                  </h3>
                  <p className="mt-4 font-inter text-sm leading-7 text-brown-mid">
                    Fortell oss dato, antall deltakere og ønsket varighet. Da
                    kan vi bekrefte om fra-prisen passer, eller foreslå et
                    bedre opplegg for gruppen.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {["Dato", "Antall", "Varighet"].map((item) => (
                      <div
                        key={item}
                        className="border border-brown/10 bg-white px-4 py-3"
                      >
                        <p className="font-inter text-sm font-semibold text-brown">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </aside>
              ) : null}
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
    </main>
  );
}
