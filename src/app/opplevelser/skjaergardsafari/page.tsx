import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Binoculars, CheckCircle2, Compass, LifeBuoy, MapPin, Waves } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const pagePath = "/opplevelser/skjaergardsafari";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "skjaergardsafari",
    path: pagePath,
    fallback: {
      title: "Skjærgårdssafari Arendal | Guidet kajakktur med Wannado",
      description:
        "Bli med på guidet skjærgårdssafari i kajakk ved Arendal. Trygg padling, lokalkjent guide og naturopplevelse for private grupper, turister og bedrifter.",
      image: "/images/scraped/kayak/kajakktur-strandhotell-4015.jpg",
      imageAlt: "Guidet kajakktur i skjærgården ved Arendal",
    },
  });
}

const highlights = [
  ["Guidet tur", "lokalkjent veileder"],
  ["Alle nivåer", "tilpasses gruppen"],
  ["Utstyr med", "kajakk, åre og vest"],
] as const;

const includedItems = [
  "Kajakk, åre og redningsvest",
  "Trygg introduksjon før vi legger ut",
  "Rutevalg etter vær, vind og erfaring",
  "Lokal formidling underveis i skjærgården",
] as const;

const tripModes = [
  {
    title: "Privat skjærgårdstur",
    text: "For familier, vennegjenger og gjester som vil ha en rolig naturopplevelse med en trygg guide.",
    icon: Waves,
  },
  {
    title: "Bedriftsgruppe",
    text: "En lavterskel aktivitet som kan kombineres med teambuilding, seiltur eller faglig innhold.",
    icon: Compass,
  },
  {
    title: "Turistopplevelse",
    text: "Se Arendal fra vannet, med holmer, sørlandskyst og små stopp når forholdene passer.",
    icon: Binoculars,
  },
] as const;

const safetyItems = [
  {
    title: "Værstyrt",
    text: "Ruten velges etter forholdene samme dag. Hvis været ikke passer, finner vi en tryggere løsning.",
    icon: LifeBuoy,
  },
  {
    title: "Oppmøte etter avtale",
    text: "Vi avtaler praktisk oppmøte når dato, gruppe og ønsket opplegg er avklart.",
    icon: MapPin,
  },
  {
    title: "Rolig start",
    text: "Alle får en enkel gjennomgang før turen, også grupper med blandet erfaring.",
    icon: CheckCircle2,
  },
] as const;

const faqItems = [
  {
    question: "Må vi ha padleerfaring?",
    answer:
      "Nei, turen kan tilpasses nybegynnere. Si fra om erfaring og trygghet på vannet, så legger vi opp turen deretter.",
  },
  {
    question: "Passer skjærgårdssafari for bedrifter?",
    answer:
      "Ja. Skjærgårdssafari fungerer godt som en rolig aktivitet i en teambuildingdag, eller som en egen opplevelse for en gruppe.",
  },
  {
    question: "Hvor lenge varer turen?",
    answer:
      "Varighet avtales etter gruppe og værforhold. Mange velger en kortere opplevelse på noen timer, men opplegget kan tilpasses.",
  },
  {
    question: "Hva er inkludert?",
    answer:
      "Kajakk, åre, redningsvest og veiledning er inkludert. Vi avklarer klær, oppmøte og praktiske detaljer før turen.",
  },
] as const;

const tripJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "@id": `${absoluteUrl(pagePath)}#trip`,
  name: "Skjærgårdssafari i Arendal",
  description:
    "Guidet kajakktur i Arendals skjærgård med lokalkjent veileder, trygg introduksjon og utstyr inkludert.",
  url: absoluteUrl(pagePath),
  provider: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
  touristType: ["Kajakkpadling", "Naturopplevelse", "Gruppeopplevelse"],
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Oppmøte og utstyr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trygg introduksjon",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Guidet tur i skjærgården",
      },
    ],
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Arendal" },
    { "@type": "AdministrativeArea", name: "Sørlandet" },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/kontakt?tjeneste=Kajakktur"),
    priceCurrency: "NOK",
    priceSpecification: {
      "@type": "PriceSpecification",
      description: "Pris avtales etter gruppe, varighet og opplegg.",
    },
  },
} as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

export default function SkjaergardsafariPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Opplevelser", path: "/opplevelser" },
          { name: "Skjærgårdssafari", path: pagePath },
        ])}
      />
      <JsonLd data={tripJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />

      <section className="relative min-h-[760px] overflow-hidden bg-brown text-white md:min-h-[720px]">
        <Image
          src="/images/scraped/kayak/kajakktur-strandhotell-4015.jpg"
          alt="Guidet kajakktur i skjærgården ved Arendal"
          fill
          priority
          loading="eager"
          className="object-cover object-[50%_48%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/58 via-brown/45 to-brown/92" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brown to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl flex-col justify-end px-6 pb-12 pt-28 md:min-h-[720px] md:pb-16">
          <div className="max-w-4xl">
            <Link
              href="/opplevelser"
              className="mb-6 inline-flex min-h-11 items-center font-inter text-sm font-semibold text-[#f6d58e] transition-colors hover:text-white"
            >
              Opplevelser i Arendal
            </Link>
            <h1 className="font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
              Skjærgårdssafari i kajakk
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/88 md:text-xl">
              Bli med en lokalkjent guide ut i Arendals skjærgård. Vi holder
              tempoet trygt, velger rute etter forholdene og lar naturen gjøre
              mesteparten av jobben.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt?tjeneste=Kajakktur"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
              >
                Spør om skjærgårdssafari
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/kajakkturer"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
              >
                Se kajakkturer og kurs
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:max-w-3xl">
              {highlights.map(([value, label]) => (
                <div key={value} className="border border-white/22 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
                  <p className="font-space text-lg font-bold leading-tight text-white sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 font-inter text-[11px] leading-4 text-white/72 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            En naturopplevelse uten kursfølelse
          </h2>
          <div className="mt-6 space-y-5 font-inter text-lg leading-8 text-brown-mid">
            <p>
              Skjærgårdssafari er for deg som vil padle, se mer av kysten og ha
              en trygg guide med på turen. Det er mindre kurs og mer opplevelse,
              men vi tar alltid sikkerhet og nivå på alvor.
            </p>
            <p>
              Turen passer for private grupper, turister og bedrifter som vil ha
              en annerledes dag ute. Vi kan holde det rolig og kort, eller bygge
              det inn i et større opplegg med teambuilding, foredrag eller seil.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {includedItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-border bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <p className="font-inter text-sm leading-6 text-brown-mid">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-space text-2xl font-bold text-brown">Passer for</h2>
          <div className="mt-5 space-y-4">
            {tripModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <div key={mode.title} className="rounded-lg border border-border bg-cream p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-space text-lg font-bold text-brown">
                        {mode.title}
                      </h3>
                      <p className="mt-1 font-inter text-sm leading-6 text-brown-mid">
                        {mode.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/kontakt?tjeneste=Kajakktur"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brown px-6 font-inter text-sm font-semibold text-white transition-colors hover:bg-brown-hover"
          >
            Send forespørsel
          </Link>
        </aside>
      </section>

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-brown md:min-h-[560px]">
            <Image
              src="/images/scraped/kayak/kajakktur-53G5152.jpg"
              alt="Kajakkpadlere på rolig vann i Arendals skjærgård"
              fill
              className="object-cover object-[38%_50%]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>

          <div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Trygg ramme, friere opplevelse
            </h2>
            <p className="mt-5 font-inter text-lg leading-8 text-brown-mid">
              En god skjærgårdssafari handler ikke om å padle lengst mulig. Den
              handler om å få nok ro til å se, kjenne og le litt underveis.
            </p>
            <div className="mt-8 grid gap-4">
              {safetyItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border border-border bg-white p-5">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand/40 text-brown">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-space text-xl font-bold text-brown">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-inter text-sm leading-6 text-brown-mid">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            Vanlige spørsmål om skjærgårdssafari
          </h2>
          <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-cream">
            {faqItems.map((item) => (
              <div key={item.question} className="p-6">
                <h3 className="font-space text-xl font-bold text-brown">{item.question}</h3>
                <p className="mt-3 font-inter text-sm leading-6 text-brown-mid">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brown py-20 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-space text-3xl font-bold leading-tight md:text-5xl">
            Vil dere padle sammen?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-lg leading-8 text-white/72">
            Send ønsket dato, antall personer og erfaring i gruppen. Roar svarer
            med forslag til trygg og fin skjærgårdssafari.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt?tjeneste=Kajakktur"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#f6d58e] px-8 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977] sm:w-auto"
            >
              Spør om tur
            </Link>
            <a
              href="tel:+4794826710"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/35 px-8 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Ring +47 94 82 67 10
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
