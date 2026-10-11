import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Compass, MapPin, Waves } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/serviceContent";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "utleie",
    path: "/utleie",
    fallback: {
      title: "Kajakk- og kanoutleie Arendal | Wannado",
      description:
        "Lei kajakk eller kano fra Skarestrand i Kongshavn. Utforsk Arendals skjærgård på egenhånd. Kontakt Roar for bestilling.",
      image: "/images/utleie-bilde.jpg",
      imageAlt: "Kajakker klare for utleie ved Skarestrand",
    },
  });
}

const rentalOptions = [
  {
    name: "Enkel kajakk",
    price: "Fra kr 350,-",
    note: "kr 350,- halv dag (3 t) / kr 450,- hel dag, inkludert åre og redningsvest",
    schemaPrice: "350",
  },
  {
    name: "Dobbel kajakk",
    price: "Fra kr 400,-",
    note: "kr 400,- halv dag (3 t) / kr 500,- hel dag, godt valg for to eller nybegynnere",
    schemaPrice: "400",
  },
  {
    name: "Kano",
    price: "Ta kontakt for pris",
    note: "rolig og familievennlig, ta kontakt med Roar for pris",
    schemaPrice: null,
  },
] as const;

const practicalCards = [
  {
    icon: MapPin,
    title: "Oppmøtested",
    text: "Skarestrand, 4812 Kongshavn. Wannado holder til rett ved sjøkanten, med enkel tilgang til vannet og parkering i nærheten.",
  },
  {
    icon: CheckCircle2,
    title: "Hva er inkludert",
    text: "Kajakk eller kano, padleårer og redningsvest. Alt utstyret du trenger for en trygg tur på sjøen er inkludert i leieprisen.",
  },
  {
    icon: Compass,
    title: "Tips for turen",
    text: "Ta med klær etter vær, sko som tåler vann, solkrem og drikkevann. Sjekk værmeldingen før du legger ut.",
  },
] as const;

const rentalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl("/utleie")}#service`,
  name: "Kajakk- og kanoutleie i Arendal",
  description:
    "Lei kajakk eller kano fra Skarestrand i Kongshavn og utforsk Arendals skjærgård på egenhånd.",
  provider: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Arendal",
    },
    {
      "@type": "Place",
      name: "Kongshavn",
    },
    {
      "@type": "AdministrativeArea",
      name: "Sørlandet",
    },
  ],
  serviceType: "Utstyrsutleie",
  url: absoluteUrl("/utleie"),
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

export default async function UtleiePage() {
  const service = await getServiceBySlug("utleie");

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Opplevelser", path: "/opplevelser" },
          { name: "Utleie", path: "/utleie" },
        ])}
      />
      <JsonLd data={rentalServiceJsonLd} />
      <Navbar />

      <PageHero
        image="/images/utleie-bilde.jpg"
        imageAlt="Kajakker klar for utleie ved Skarestrand"
        imagePosition="54% 44%"
        eyebrow="Utstyrsutleie"
        title="Lei kajakk og kano i Arendals skjærgård"
        intro="Utforsk kysten på egenhånd med utstyr fra Skarestrand. Vi hjelper deg med riktig valg, praktisk oppmøte og trygg start på turen."
        primary={{ label: "Bestill utleie", href: "/booking" }}
        secondary={{ label: "Ring Roar", href: "tel:+4794826710" }}
        facts={[
          ["Skarestrand", "oppmøte ved sjøen"],
          ["3 valg", "kajakk, dobbel og kano"],
          ["Roar", "hjelper med riktig utstyr"],
        ]}
        aside={
          <>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
              <Waves className="h-6 w-6 text-teal" aria-hidden="true" />
            </div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-brown">
              Før du legger ut
            </p>
            <p className="mt-4 font-body text-sm leading-7 text-brown">
              Ta kontakt hvis du er usikker på vær, rute, erfaring eller hvilken
              kajakk som passer. Utleie bør avklares på forhånd, slik at riktig
              utstyr er klart.
            </p>
          </>
        }
      />

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown leading-snug">
              Padle i ditt eget tempo
            </h2>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Wannado leier ut kajakker og kanoer fra Skarestrand i Kongshavn,
              rett ved Arendals vakre skjærgård. Utstyret er godt vedlikeholdt
              og egner seg perfekt for turer langs kysten, til holmer og i
              rolige viker.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Kano passer fint for familier og nybegynnere, og krever ingen
              forkunnskaper. For kajakk anbefaler vi noe padleerfaring, men ta
              gjerne kontakt dersom du er usikker. Roar hjelper deg med å finne
              riktig utstyr for turen din.
            </p>

            <div className="pt-4">
              <Image
                src="/images/scraped/kayak/kajakkutleie-7989194812.jpg"
                alt="Kajakker ved Skarestrand"
                width={800}
                height={533}
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sticky top-24">
              <h3 className="font-space text-2xl font-bold text-brown mb-6">
                Utleiepriser
              </h3>

              <div className="mb-8 divide-y divide-border">
                {rentalOptions.map((option) => (
                  <div key={option.name} className="py-5 first:pt-0">
                    <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                      {option.name}
                    </p>
                    <p className="font-space text-2xl font-bold text-brown">
                      {option.price}
                    </p>
                    <p className="font-inter text-sm text-brown-mid mt-1">
                      {option.note}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/utleie/kajakk-og-kano-utleie"
                className="block min-h-12 w-full rounded-xl bg-brown px-6 py-4 text-center font-inter text-base font-semibold text-white transition-colors hover:bg-brown-hover"
              >
                Se kajakk- og kanoutleie
              </Link>
              <p className="font-inter text-xs text-brown-muted text-center mt-3">
                Priser, oppmøte og praktisk info
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceCmsSection service={service} />

      {/* Praktisk informasjon */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-4">
            Praktisk informasjon
          </h2>
          <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14">
            Alt du trenger å vite før du leier kajakk eller kano hos Wannado.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {practicalCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-teal" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-space text-lg font-bold text-brown mb-2">
                    {card.title}
                  </h3>
                  <p className="font-inter text-sm text-brown-mid leading-relaxed">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Klar for en padletur?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Lei kajakk eller kano og utforsk skjærgården på egenhånd. Ta kontakt
            med Roar for å reservere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#f6d58e] px-8 py-4 font-inter text-base font-semibold text-brown transition-colors hover:bg-[#f3c977] sm:w-auto"
            >
              Bestill utleie
            </Link>
            <a
              href="tel:+4794826710"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 font-inter text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Ring Roar: +47 94 82 67 10
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
