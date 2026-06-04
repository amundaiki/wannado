import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import GiftCardForm from "@/components/ui/GiftCardForm";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/serviceContent";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "gavekort",
    path: "/gavekort",
    fallback: {
      title: "Gavekort | Wannado",
      description:
        "Gi bort en uforglemmelig opplevelse med gavekort fra Wannado. Seilturer, kajakk-eventyr, teambuilding og mer. Vi lager personlige gavekort tilpasset mottakeren.",
      image: "/images/havsul.jpg",
      imageAlt: "Gavekort på opplevelser med Wannado",
    },
  });
}

const giftOptions = [
  {
    title: "Seilopplevelse",
    description:
      "Gi bort en tur med Listerskøyta Havsul gjennom Arendals vakre skjærgård. Passer for alle.",
    image: "/images/havsul.jpg",
    alt: "Listerskøyta Havsul i Arendals skjærgård",
  },
  {
    title: "Kajakk-eventyr",
    description:
      "En guidet kajakktur i skjærgården med kajakk, utstyr og erfaren guide inkludert.",
    image: "/images/scraped/kayak/kajakktur-strandhotell-4015.jpg",
    alt: "Kajakktur i skjærgården på Sørlandet",
  },
  {
    title: "Teambuilding",
    description:
      "En uforglemmelig opplevelse for bedriften med aktiviteter på sjøen og land.",
    image: "/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg",
    alt: "Kollegaer på stranden under teambuilding med Wannado",
  },
];

const steps = [
  {
    step: 1,
    title: "Velg opplevelse",
    description: "Fyll ut skjemaet under med ønsket type gavekort og mottaker.",
  },
  {
    step: 2,
    title: "Vi lager gavekortet",
    description:
      "Vi setter sammen et personlig gavekort med din melding og tilpasser det til anledningen.",
  },
  {
    step: 3,
    title: "Lever til mottakeren",
    description:
      "Du velger om gavekortet skal sendes digitalt til deg eller direkte til mottakeren.",
  },
];

const giftCardJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Gavekort fra Wannado",
      url: absoluteUrl("/gavekort"),
      description:
        "Gavekort på seiltur, kajakktur, teambuilding, foredrag og skreddersydde opplevelser på Sørlandet.",
    },
    {
      "@type": "Product",
      name: "Gavekort fra Wannado",
      description:
        "Personlig gavekort på opplevelser med Wannado i Arendal og på Sørlandet.",
      brand: {
        "@type": "Organization",
        name: "Wannado",
        url: absoluteUrl("/"),
      },
      category: "Opplevelsesgave",
      image: absoluteUrl("/images/scraped/sailing/baat-fb-havsul.jpg"),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "NOK",
        url: absoluteUrl("/gavekort#bestill-gavekort"),
      },
    },
  ],
};

export default async function GavekortPage() {
  const service = await getServiceBySlug("gavekort");

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Gavekort", path: "/gavekort" },
        ])}
      />
      <JsonLd data={giftCardJsonLd} />
      <Navbar />

      <section className="relative min-h-[720px] md:min-h-[680px] flex items-center overflow-hidden px-6 text-white">
        <Image
          src="/images/scraped/sailing/baat-fb-havsul.jpg"
          alt="Havsul på sjøen, en opplevelse som kan gis som gavekort"
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/70 via-brown/55 to-brown/82" />
        <div className="relative z-10 max-w-5xl mx-auto pt-28 pb-16 text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.32em] text-[#f6d58e] mb-5">
            Gi bort en opplevelse
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.98] mb-6">
            Gavekort fra Wannado
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/86 leading-relaxed max-w-2xl mx-auto">
            Gi bort seiltur, kajakk, teambuilding eller en skreddersydd dag på
            Sørlandet. Vi lager personlige gavekort tilpasset mottakeren og
            anledningen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#bestill-gavekort"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
            >
              Bestill gavekort
            </Link>
            <Link
              href="/booking"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
            >
              Se opplevelser
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
              Velg din opplevelse
            </p>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown">
              Gavekort som passer alle
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {giftOptions.map((option) => (
              <div
                key={option.title}
                className="overflow-hidden bg-white rounded-2xl border border-border shadow-sm transition-all duration-200 hover:border-teal/40 hover:shadow-md"
              >
                <div className="relative h-52">
                  <Image
                    src={option.image}
                    alt={option.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/55 to-transparent" />
                </div>
                <div className="p-7 text-center">
                  <h3 className="font-space text-xl font-bold text-brown mb-3">
                    {option.title}
                  </h3>
                  <p className="font-inter text-sm text-brown-mid leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
              Slik fungerer det
            </p>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown">
              Tre enkle steg
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brown text-white font-space text-lg font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="font-space text-lg font-bold text-brown mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCmsSection service={service} />

      <section id="bestill-gavekort" className="py-16 md:py-20 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[30px] border border-border shadow-sm p-6 md:p-10">
            <div className="text-center mb-8">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
                Bestill gavekort
              </p>
              <h2 className="font-space text-2xl md:text-3xl font-bold text-brown">
                Fyll ut skjemaet
              </h2>
              <p className="font-inter text-sm text-brown-mid mt-3 leading-relaxed">
                Vi tar kontakt med deg for å avtale detaljer og lage et personlig gavekort.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="bg-cream rounded-2xl p-6 md:p-8 h-[500px] animate-pulse" />
              }
            >
              <GiftCardForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-brown">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-5">
            Gi bort noe som betyr noe
          </h2>
          <p className="font-inter text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
            En opplevelse sammen skaper minner som varer mye lenger enn en vanlig gave. Overrask noen du er glad i.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex rounded-xl bg-sand text-brown font-inter font-semibold text-sm px-8 py-4 hover:bg-[#f5c97a] transition-colors duration-200"
          >
            Ta kontakt med oss
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
