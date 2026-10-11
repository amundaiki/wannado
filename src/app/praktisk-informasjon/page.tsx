import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Shirt,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/sections/PageHero";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Praktisk informasjon | Wannado",
  description:
    "Praktisk informasjon om Wannados arrangement. Oppmøtesteder, påkledning, utstyr, forsikring og betalingsvilkår.",
  path: "/praktisk-informasjon",
  image: "/images/scraped/landscape/20230910_125202-scaled.jpg",
  imageAlt: "Praktisk informasjon om Wannado-opplevelser",
});

const quickChecklist = [
  "Møt presis på avtalt sted",
  "Kle deg etter vær og aktivitet",
  "Gi beskjed om sykdom, skade eller medisinbehov",
  "Sjekk forsikring ved turer og ekspedisjoner",
];

const practicalFaq = [
  {
    question: "Hvor møter jeg opp til kajakkurs og kajakktur?",
    answer:
      "Oppmøte for kajakkturer og kurs er på Skarestrand 11, 4812 Kongshavn. Det er god parkeringsmulighet ved oppmøtestedet.",
  },
  {
    question: "Hva bør jeg ha på meg på kajakkpadling?",
    answer:
      "På vår og høst anbefales ullundertøy eller lignende under tørrdrakt. Om sommeren holder det ofte med fritidstøy eller tights.",
  },
  {
    question: "Er utstyr inkludert?",
    answer:
      "Ja, Wannado stiller med tørrdrakter, padleutstyr, redningsvester og kajakker når det er relevant for aktiviteten.",
  },
  {
    question: "Hva skjer hvis været endrer seg?",
    answer:
      "Wannado tilpasser aktivitetene etter vær og sesong. Ved behov får du beskjed om endringer eller praktiske tilpasninger før oppmøte.",
  },
];

const practicalInfoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Praktisk informasjon",
      url: absoluteUrl("/praktisk-informasjon"),
      description:
        "Oppmøtesteder, påkledning, utstyr, værtilpasning, sikkerhet, forsikring og betaling for Wannado-opplevelser.",
      isPartOf: {
        "@type": "WebSite",
        name: "Wannado",
        url: absoluteUrl("/"),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: practicalFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const cards = [
  {
    icon: MapPin,
    title: "Oppmøtesteder",
    content: (
      <ul className="space-y-4">
        <li>
          <strong className="text-brown">Kajakkturer og kurs:</strong>
          <br />
          Skarestrand 11, 4812 Kongshavn. God parkeringsmulighet rett ved
          oppmøtestedet.
        </li>
        <li>
          <strong className="text-brown">Seilturer med Havsul:</strong>
          <br />
          Pollen i Arendal sentrum. Parkering i Arendal sentrum (betalingsparkering).
        </li>
        <li>
          <strong className="text-brown">Teambuilding:</strong>
          <br />
          Varierer etter arrangement. Vi sender detaljert informasjon ved
          bestilling.
        </li>
      </ul>
    ),
  },
  {
    icon: Shirt,
    title: "Påkledning og utstyr",
    content: (
      <>
        <ul className="space-y-3">
          <li>
            <strong className="text-brown">
              Kajakkpadling vår/høst:
            </strong>{" "}
            Ullundertøy eller lignende under tørrdrakt (tørrdrakter lånes ut).
          </li>
          <li>
            <strong className="text-brown">Kajakkpadling sommer:</strong>{" "}
            Fritidstøy eller tights.
          </li>
          <li>
            <strong className="text-brown">Seiltur:</strong> Kle deg etter
            været, vindtett ytterlag anbefales.
          </li>
          <li>
            <strong className="text-brown">Ta med:</strong> Klesskift,
            vannflaske, solkrem (sommer).
          </li>
        </ul>
        <p className="mt-4 p-4 bg-teal/5 rounded-xl text-sm">
          <strong className="text-teal">Vi har:</strong> Tørrdrakter,
          padleutstyr, redningsvester, kajakker (singel og dobbel).
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: "Kajakker og gruppetilpasning",
    content: (
      <ul className="space-y-3">
        <li>
          Vi bruker en kombinasjon av singel- og dobbelkajakker, slik at flest
          mulig kan bli med.
        </li>
        <li>
          Kajakktypene tilpasses gruppens erfaring og ønsker.
        </li>
        <li>
          <strong className="text-brown">Merk:</strong> Vi kan ikke garantere
          passende kajakk for alle kroppsfasonger og vektklasser. Kontakt oss
          på forhånd om du er usikker.
        </li>
      </ul>
    ),
  },
  {
    icon: Calendar,
    title: "Sesong og værtilpasning",
    content: (
      <ul className="space-y-3">
        <li>
          <strong className="text-brown">Begynnerkurs:</strong> April til
          oktober.
        </li>
        <li>
          <strong className="text-brown">Øvrig padling:</strong> Hele året (vi
          har tørrdrakter).
        </li>
        <li>
          <strong className="text-brown">Seilturer:</strong> April til
          oktober, væravhengig.
        </li>
        <li>
          <strong className="text-brown">Teambuilding:</strong> Hele året.
        </li>
      </ul>
    ),
  },
  {
    icon: Shield,
    title: "Sikkerhet og forsikring",
    content: (
      <ul className="space-y-3">
        <li>Alle deltar på eget ansvar.</li>
        <li>
          Sykdom, skader eller medisinbehov som kan påvirke turen skal opplyses
          til arrangør eller turleder.
        </li>
        <li>
          Spør oss gjerne om hvilke forsikrings- og ansvarsforhold som gjelder
          for din aktivitet, så går vi gjennom det med deg.
        </li>
        <li>
          Den enkelte gjest bør selv sørge for reise- og ulykkesforsikring.
          Sjekk at den gjelder for aktiviteten du skal delta på.
        </li>
      </ul>
    ),
  },
  {
    icon: CreditCard,
    title: "Betaling og avbestilling",
    content: (
      <ul className="space-y-3">
        <li>
          <strong className="text-brown">Forhåndsbetaling</strong> kan være
          aktuelt på turer og ekspedisjoner.
        </li>
        <li>
          Avbestillingsvilkår og betalingsfrister avtales ved booking, og
          varierer med hvilken opplevelse du velger.
        </li>
        <li>
          Ta kontakt før du booker, så går vi gjennom hva som gjelder for akkurat
          din tur.
        </li>
        <li className="p-3 bg-teal/5 rounded-xl text-sm">
          <strong className="text-teal">Tips:</strong> Sjekk om forsikringen
          din dekker avbestilling.
        </li>
      </ul>
    ),
  },
];

export default function PraktiskInformasjonPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Praktisk informasjon", path: "/praktisk-informasjon" },
        ])}
      />
      <JsonLd data={practicalInfoJsonLd} />
      <Navbar />

      <PageHero
        image="/images/scraped/landscape/20230910_125202-scaled.jpg"
        imageAlt="Havsul ved brygga i Arendal før en Wannado-opplevelse"
        imagePosition="48% 44%"
        eyebrow="Før du drar"
        title="Praktisk informasjon"
        intro="Alt du trenger å vite om oppmøte, klær, utstyr, vær, sikkerhet og betaling før opplevelsen med Wannado."
        primary={{ label: "Se booking", href: "/booking" }}
        secondary={{ label: "Les detaljene", href: "#praktisk-detaljer" }}
        facts={[
          ["Hele året", "aktivitet ved riktig vær"],
          ["Alt utstyr", "inkludert på kajakk"],
        ]}
        aside={
          <>
            <p className="font-body text-xs font-semibold text-teal">
              Rask sjekk
            </p>
            <ul className="mt-5 space-y-3">
              {quickChecklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-body text-sm leading-relaxed text-brown"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-teal"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* Content Cards */}
      <section
        id="praktisk-detaljer"
        className="flex-grow py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-inter text-sm font-semibold text-teal">
              Greit å vite
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Finn riktig info før du møter opp
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid">
              Har du valgt tur, kurs eller bedriftsopplegg, er dette siden du
              bruker for å sjekke oppmøte, klær, utstyr og vilkår.
            </p>
            <div className="mt-6 rounded-card border border-border bg-white p-5">
              <p className="font-space text-xl font-bold text-brown">
                Spør oss hvis noe er uklart
              </p>
              <div className="mt-4 grid gap-3">
                <a
                  href="tel:+4799469957"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border px-4 py-2 font-inter text-sm font-semibold text-brown transition-colors hover:bg-cream"
                >
                  <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
                  Ring Tone
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border px-4 py-2 font-inter text-sm font-semibold text-brown transition-colors hover:bg-cream"
                >
                  <MessageCircle
                    className="h-4 w-4 text-teal"
                    aria-hidden="true"
                  />
                  Send melding
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-card border border-border bg-white p-6 md:p-8"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <Icon className="h-6 w-6 text-teal" aria-hidden="true" />
                  </div>
                  <h3 className="font-space text-xl font-bold text-brown mb-4">
                    {card.title}
                  </h3>
                  <div className="font-inter text-base text-brown-mid leading-relaxed">
                    {card.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brown py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-inter text-sm font-semibold text-sand">
              Fortsatt usikker?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold md:text-5xl">
              Spør før du pakker sekken.
            </h2>
            <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-white/82">
              Ta kontakt hvis du lurer på oppmøte, nivå, klær, vær eller
              hvilken opplevelse som passer best.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/kontakt"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            >
              Gå til kontaktskjema
            </Link>
            <a
              href="tel:+4799469957"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ring +47 99 46 99 57
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
