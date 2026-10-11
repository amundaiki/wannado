import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
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

export default function PricingPage() {
  return (
    <main id="innhold" className="min-h-screen">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Priser", path: "/priser" }])}
      />
      <JsonLd data={pricingSchema} />
      <Navbar />

      <PageHero
        image="/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg"
        imageAlt="Gruppeaktivitet med Wannado under teambuilding på Sørlandet"
        imagePosition="48% 50%"
        eyebrow="Priser"
        title="Priser og pakker for opplevelser i Arendal"
        intro="Se fra-priser og typiske pakker. For grupper tilpasser vi innhold, varighet og logistikk før vi gir et konkret tilbud."
        primary={{ label: "Send forespørsel", href: "/booking" }}
        secondary={{ label: "Se prisoversikt", href: "#prisoversikt" }}
      />

      {/* Intro */}
      <section id="prisoversikt" className="scroll-mt-20 border-b border-border bg-warm-white">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-brown md:text-4xl">
                Fra-priser der det er fast, tilbud der opplegget må tilpasses
              </h2>
              <p className="mt-5 text-base leading-7 text-brown-mid">
                Noen opplevelser kan bestilles direkte, mens bedriftsopplegg,
                kurs og foredrag ofte skreddersys. Da gir vi et uforpliktende
                tilbud før dere bestemmer dere. Oppgi dato, antall deltakere og
                ønsket varighet, så bekrefter vi om fra-prisen passer.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 md:grid-cols-3">
              {pricingPrinciples.map((principle) => (
                <div key={principle.title} className="border-t border-border pt-4">
                  <dt className="font-display text-lg font-bold text-brown">
                    {principle.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-brown-mid">
                    {principle.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Kategorier" className="mt-10 flex flex-wrap gap-x-6 gap-y-1">
            {pricingCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex min-h-11 items-center font-semibold text-teal underline-offset-4 hover:underline"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Prisliste: kategori til venstre, rader til høyre */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl divide-y divide-border px-6 lg:px-10">
          {pricingCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="grid scroll-mt-20 gap-6 py-12 md:py-16 lg:grid-cols-[240px_1fr] lg:gap-14"
            >
              <h2 className="font-display text-2xl font-bold text-brown lg:sticky lg:top-24 lg:self-start">
                {category.title}
              </h2>
              <ul className="space-y-9">
                {category.cards.map((card) => (
                  <li
                    key={card.name}
                    className="grid gap-x-8 gap-y-2 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-brown">
                        {card.name}
                      </h3>
                      <p className="mt-1 max-w-xl text-brown-mid">{card.description}</p>
                      <p className="mt-2 max-w-xl text-sm text-brown-muted">
                        {card.audience}. Inkluderer: {card.includes.join(", ").toLowerCase()}.
                      </p>
                      <Link
                        href={card.ctaHref}
                        className="mt-3 inline-flex min-h-11 items-center font-semibold text-teal underline-offset-4 hover:underline"
                      >
                        {card.cta}
                      </Link>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-display text-xl font-bold text-brown">
                        {card.price}
                      </p>
                      {card.priceNote && (
                        <p className="text-sm text-brown-muted">{card.priceNote}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-brown">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Usikker på hva dere trenger?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
            Ta kontakt, så setter vi sammen et tilbud som passer gruppen.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/booking" variant="sand">
              Send en forespørsel
            </Button>
            <Button href="tel:+4799469957" variant="outline-light">
              Ring +47 99 46 99 57
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
