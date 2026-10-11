import Image from "next/image";
import Link from "next/link";
import { Anchor, CheckCircle2, Clock3, LifeBuoy, MapPin, Waves } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import { getServiceBySlug } from "@/lib/serviceContent";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const pagePath = "/utleie/kajakk-og-kano-utleie";

export async function generateMetadata() {
  const metadata = await createServicePageMetadata({
    slug: "utleie",
    path: pagePath,
    fallback: {
      title: "Kajakk- og kanoutleie Arendal | Lei fra Skarestrand",
      description:
        "Lei kajakk eller kano fra Skarestrand i Kongshavn ved Arendal. Utstyr, redningsvest og praktisk veiledning inkludert. Perfekt for rolige turer i skjærgården.",
      image: "/images/utleie-bilde.jpg",
      imageAlt: "Kajakker klare for utleie ved Skarestrand i Kongshavn",
    },
  });

  // Detaljsiden deler innhold og CMS-metadata med oversiktssiden /utleie.
  // Kanoniserer hit for å unngå duplikat title/description i indeksen.
  return {
    ...metadata,
    alternates: { canonical: "/utleie" },
  };
}

const rentalOptions = [
  {
    name: "Enkel kajakk",
    price: "Fra kr 350,-",
    schemaPrice: "350",
    note: "kr 350,- halv dag (3 t) / kr 450,- hel dag",
    bestFor: "deg som har litt erfaring og vil padle i eget tempo",
  },
  {
    name: "Dobbel kajakk",
    price: "Fra kr 400,-",
    schemaPrice: "400",
    note: "kr 400,- halv dag (3 t) / kr 500,- hel dag",
    bestFor: "to personer, rolige turer og trygg start for nybegynnere",
  },
  {
    name: "Kano",
    price: "Ta kontakt for pris",
    schemaPrice: null,
    note: "ta kontakt med Roar for pris",
    bestFor: "familier, korte turer og deg som vil ha en stabil farkost",
  },
] as const;

const includedItems = [
  "Kajakk eller kano som passer turen",
  "Padleåre og redningsvest",
  "Kort gjennomgang av utstyr og oppmøte",
  "Lokalkunnskap om enkle ruter fra Skarestrand",
] as const;

const routeIdeas = [
  {
    title: "Rolig nærtur",
    text: "Start forsiktig fra Skarestrand og hold deg i lune områder mens du blir kjent med utstyret.",
    icon: Waves,
  },
  {
    title: "Holme til holme",
    text: "For deg som har litt padleerfaring og vil utforske mer av skjærgården når været spiller på lag.",
    icon: Anchor,
  },
  {
    title: "Familietur i kano",
    text: "En stabil og sosial måte å være på vannet sammen, med lav terskel og god plass til rolig tempo.",
    icon: LifeBuoy,
  },
] as const;

const practicalItems = [
  {
    title: "Oppmøte",
    text: "Skarestrand 11, 4812 Kongshavn. Avtal tidspunkt på forhånd, så er riktig utstyr klart når du kommer.",
    icon: MapPin,
  },
  {
    title: "Varighet",
    text: "Leie avtales etter behov. Si gjerne fra om ønsket rute, erfaring og hvor lenge dere vil være ute.",
    icon: Clock3,
  },
  {
    title: "Sikkerhet",
    text: "Vi leier ikke ut når vær, vind eller erfaring gjør turen uforsvarlig. Da finner vi heller et bedre tidspunkt.",
    icon: CheckCircle2,
  },
] as const;

const faqItems = [
  {
    question: "Må jeg ha våttkort for å leie kajakk?",
    answer:
      "Ikke nødvendigvis, men vi anbefaler padleerfaring for kajakk. Hvis du er nybegynner, kan dobbel kajakk eller kano være et bedre valg.",
  },
  {
    question: "Kan barn være med?",
    answer:
      "Ja, barn kan være med når voksne tar ansvar og forholdene er rolige. Kano er ofte det enkleste valget for familier.",
  },
  {
    question: "Hvor henter vi utstyret?",
    answer:
      "Utstyret hentes etter avtale hos Wannado på Skarestrand i Kongshavn, rett ved sjøen utenfor Arendal.",
  },
  {
    question: "Hva skjer hvis været blir dårlig?",
    answer:
      "Da avtaler vi nytt tidspunkt eller finner en tryggere løsning. Utleie skal være gøy, men sikkerhet kommer først.",
  },
] as const;

const rentalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl(pagePath)}#service`,
  name: "Kajakk- og kanoutleie i Arendal",
  description:
    "Lei kajakk eller kano fra Skarestrand i Kongshavn ved Arendal, med redningsvest, åre og praktisk veiledning inkludert.",
  provider: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Arendal" },
    { "@type": "Place", name: "Kongshavn" },
    { "@type": "AdministrativeArea", name: "Sørlandet" },
  ],
  serviceType: "Kajakk- og kanoutleie",
  url: absoluteUrl(pagePath),
  offers: rentalOptions
    .filter((option) => option.schemaPrice !== null)
    .map((option) => ({
      "@type": "Offer",
      name: option.name,
      price: option.schemaPrice,
      priceCurrency: "NOK",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/kontakt?tjeneste=Utleie"),
    })),
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

export default async function KajakkOgKanoUtleiePage() {
  const service = await getServiceBySlug("utleie");

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Opplevelser", path: "/opplevelser" },
          { name: "Utleie", path: "/utleie" },
          { name: "Kajakk- og kanoutleie", path: pagePath },
        ])}
      />
      <JsonLd data={rentalServiceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />

      <PageHero
        image="/images/utleie-bilde.jpg"
        imageAlt="Kajakker klare for utleie ved Skarestrand i Kongshavn"
        imagePosition="55% 42%"
        eyebrow="Utleie hos Wannado"
        title="Lei kajakk og kano fra Skarestrand"
        intro="Start turen rett ved sjøen i Kongshavn og utforsk Arendals skjærgård i ditt eget tempo. Vi hjelper deg med riktig utstyr, trygg oppstart og en rute som passer forholdene."
        primary={{ label: "Spør om utleie", href: "/kontakt?tjeneste=Utleie" }}
        secondary={{ label: "Ring Roar", href: "tel:+4794826710" }}
        asideOnMobile
        aside={
          <>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-brown">
              Fra
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-brown">
              kr 350,-
            </p>
            <p className="mt-2 font-body text-sm leading-6 text-brown">
              Enkel kajakk halv dag (3 t). Hel dag fra kr 450,-. Redningsvest og
              åre er inkludert.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-brown/15 pt-4">
              <div>
                <dt className="font-display text-xl font-bold text-brown">Skarestrand</dt>
                <dd className="mt-1 font-body text-xs text-brown">oppmøte</dd>
              </div>
              <div>
                <dt className="font-display text-xl font-bold text-brown">3 valg</dt>
                <dd className="mt-1 font-body text-xs text-brown">utstyr</dd>
              </div>
            </dl>
          </>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            Utstyr for rolige eventyr i skjærgården
          </h2>
          <div className="mt-6 space-y-5 font-inter text-lg leading-8 text-brown-mid">
            <p>
              Kajakk- og kanoutleie passer for deg som vil oppleve sjøen uten et
              fast kursprogram. Du kan ta en kort tur i nærområdet, samle
              familien i kano eller planlegge en litt lengre padletur når været
              er stabilt.
            </p>
            <p>
              Vi holder til ved Skarestrand i Kongshavn, med kort vei fra
              Arendal og enkel tilgang til vannet. Før du legger ut, avklarer vi
              erfaring, vær og praktiske behov, slik at turen får en trygg start.
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
          <h2 className="font-space text-2xl font-bold text-brown">Priser</h2>
          <div className="mt-5 divide-y divide-border">
            {rentalOptions.map((option) => (
              <div key={option.name} className="py-5 first:pt-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between lg:flex-col">
                  <div>
                    <h3 className="font-inter text-sm font-semibold uppercase tracking-[0.18em] text-brown-muted">
                      {option.name}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-6 text-brown-mid">
                      Passer for {option.bestFor}.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <p className="font-space text-2xl font-bold text-brown">
                      {option.price}
                    </p>
                    <p className="font-inter text-xs text-brown-muted">{option.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/kontakt?tjeneste=Utleie"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brown px-6 font-inter text-sm font-semibold text-white transition-colors hover:bg-brown-hover"
          >
            Reserver utstyr
          </Link>
        </aside>
      </section>

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Velg en tur som passer erfaringen din
            </h2>
            <p className="mt-5 font-inter text-lg leading-8 text-brown-mid">
              Arendals skjærgård er vakker, men vær og vind bestemmer alltid.
              Vi hjelper deg å velge en enkel retning, eller sier fra hvis det er
              smartere å vente.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {routeIdeas.map((idea) => {
              const Icon = idea.icon;

              return (
                <article key={idea.title} className="rounded-lg border border-border bg-white p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10">
                    <Icon className="h-5 w-5 text-teal" />
                  </div>
                  <h3 className="font-space text-xl font-bold text-brown">{idea.title}</h3>
                  <p className="mt-3 font-inter text-sm leading-6 text-brown-mid">
                    {idea.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-brown md:min-h-[560px]">
          <Image
            src="/images/scraped/kayak/kajakkutleie-7989194812.jpg"
            alt="Kajakker ved Skarestrand klare for en rolig tur i Arendals skjærgård"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>

        <div>
          <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            Slik gjør vi det enkelt å komme på vannet
          </h2>
          <div className="mt-8 grid gap-4">
            {practicalItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-lg border border-border bg-white p-5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand/40 text-brown">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-space text-xl font-bold text-brown">{item.title}</h3>
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
      </section>

      <ServiceCmsSection service={service} />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            Vanlige spørsmål om kajakk- og kanoutleie
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
            Klar for en tur fra Skarestrand?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-lg leading-8 text-white/72">
            Send oss ønsket dato, antall personer og om du vil leie kajakk eller
            kano. Roar svarer med praktisk avklaring.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt?tjeneste=Utleie"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#f6d58e] px-8 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977] sm:w-auto"
            >
              Send forespørsel
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
