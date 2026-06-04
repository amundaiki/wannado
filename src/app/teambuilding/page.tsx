import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/serviceContent";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allProductsQuery,
  formatNok,
  type SanityProduct,
} from "@/sanity/lib/content";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "teambuilding",
    path: "/teambuilding",
    fallback: {
      title: "Teambuilding Arendal - Opplevelser for bedrifter | Wannado",
      description:
        "Teambuilding i Arendal med 15 års erfaring. Velg mellom utendørs utfordringer, mordmysterier, innendørs konkurranser og personlighetsanalyse. Fra kr 4 500. Kontakt oss i dag!",
      image: "/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg",
      imageAlt: "Kollegaer hopper på stranden under teambuilding med Wannado",
    },
  });
}

const products = [
  {
    id: "513c0676-c037-403f-8b78-f7c5d4c1a8a7",
    name: "360\u00B0 Wannado",
    description:
      "Et 71\u00B0 nord-lignende arrangement med utfordrende aktiviteter for lag som ønsker å bli bedre kjent. Tankenøtter og samarbeidsoppgaver i et lavt til moderat aktivitetsnivå.",
    price: "Fra kr 16 500,- / kr 550 pr pers over 30",
    duration: "2 timer",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/Bungeerunning-7607.jpg",
    alt: "Deltakere i utendørs lagkonkurranse under teambuilding med Wannado",
  },
  {
    id: "cb24fedf-ee87-498e-89d3-f6d89534e2ce",
    name: "Heia dem som vinner",
    description:
      "Innendørs konkurranse inspirert av TV-programmer som Vinn på minuttet og Mesternes Mester. Wannado organiserer oppgavene, tidtakingen og opplegg, dere leverer energien.",
    price: "Fra kr 16 500,- / kr 550 pr pers over 30",
    duration: "2 timer",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
    alt: "Innendørs teambuilding-konkurranse på hotell med engasjerte deltakere",
  },
  {
    id: "ea1cd107-08e2-4f00-a936-ee5c7149b867",
    name: "Påfyll",
    description:
      "Utendørs arrangement på Bjellandstrand Gård på Tromøy. En herlig dag med lek, kreativitet og samspill, avsluttet med deilig mat fra jord og hage. Inkludert venue, mat og kaffe/te.",
    price: "Kr 1 950,- pr person",
    duration: "2-3 timer + middag",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg",
    alt: "Gruppeaktivitet utendørs med kolleger under Påfyll-arrangementet",
  },
  {
    id: "a6ab44be-0c0b-4016-b659-b4a0873364db",
    name: "Cluedo",
    description:
      "Mordmysterie der lagene samler spor og eliminerer mistenkte for å avsløre morderen, våpenet, åstedet og motivet. Tilgjengelig på Strand Hotel Fevik, Lillesand Hotell Norge, Lyngørporten, Kragerø Resort og Arendal Herregaard.",
    price: "Fra kr 16 500,- / kr 550 pr pers over 30",
    duration: "2 timer",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/DaVinchi-pa-Strand-8588.jpg",
    alt: "Mordmysterie-arrangement på hotell der lag løser gåter sammen",
  },
  {
    id: "5cf46212-dbcb-4e39-8fce-9ae31c76a95b",
    name: "Mord i Cicilia",
    description:
      "Sittende mordmysterie der deltakerne ledes gjennom et mysterium rundt kafebord i møterommet. Skaper spennende situasjoner og festlig kommunikasjon.",
    price: "Fra kr 4 500,-",
    duration: "1-1,5 timer",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg",
    alt: "Deltakere rundt bord under sittende mordmysterie med Wannado",
  },
  {
    id: "3d8e18c5-a512-4503-89bc-8df26e8f22bc",
    name: "Kajakk og skjærgårdssafari",
    description:
      "Introduksjon til kajakk med enkel padleteknikk, tilrettelagt for gruppen. Alt nødvendig utstyr er inkludert. Perfekt som tilleggsaktivitet til en teambuildingdag.",
    price: "Fra kr 1 350,- pr person",
    duration: "3 timer",
    href: "/kontakt?tjeneste=Teambuilding",
    image: "/images/scraped/teambuilding/Bungeerunning-7634.jpg",
    alt: "Utendørs aktivitet som del av teambuilding-opplevelse med Wannado",
  },
];

export const dynamic = "force-dynamic";

function firstNumber(value: string) {
  const match = value.match(/\d[\d\s]*/);
  return match ? Number.parseInt(match[0].replace(/\s/g, ""), 10) : 0;
}

const references = [
  "Aker Solutions",
  "KPMG",
  "Statoil Hydro",
  "Agder Energi",
  "National Oilwell Varco",
  "Statens Vegvesen",
  "Arendal Kommune",
  "NODE",
  "Teekay",
];

export default async function TeambuildingPage() {
  const [{ data: sanityProducts }, service] = await Promise.all([
    sanityFetch({
      query: allProductsQuery,
      perspective: "published",
    }),
    getServiceBySlug("teambuilding"),
  ]);

  const cmsProducts = (sanityProducts as SanityProduct[] | null) ?? [];
  const productById = new Map<string, SanityProduct>(
    cmsProducts.map((product) => [product._id, product]),
  );

  const productCards = products.map((product) => {
    const sanityProduct = productById.get(product.id);
    const priceValue =
      sanityProduct?.price ??
      firstNumber(product.price);

    return {
      ...product,
      name: sanityProduct?.name || product.name,
      description: sanityProduct?.descriptionText || product.description,
      price:
        product.price.startsWith("Kr")
          ? `Kr ${formatNok(priceValue)},-`
          : product.price,
      image: sanityProduct?.imageUrl || product.image,
      alt: sanityProduct?.imageAlt || product.alt,
    };
  });

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": productCards.map((product) => ({
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: {
        "@type": "Organization",
        name: "Wannado",
      },
      offers: {
        "@type": "Offer",
        price: firstNumber(product.price),
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
        url: "https://wannado.no/kontakt?tjeneste=Teambuilding",
      },
      image: product.image.startsWith("http")
        ? product.image
        : `https://wannado.no${product.image}`,
      category: "Teambuilding",
    })),
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Bedrift", path: "/bedrift" },
          { name: "Teambuilding", path: "/teambuilding" },
        ])}
      />
      <JsonLd data={productSchema} />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[760px] md:min-h-[720px] flex items-center overflow-hidden text-white">
        <Image
          src="/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg"
          alt="Kollegaer hopper på stranden under teambuilding med Wannado"
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/75 via-brown/55 to-brown/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(246,213,142,0.18),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pt-28 pb-16 md:pt-32">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.35em] text-[#f6d58e] mb-5">
                Teambuilding på Sørlandet
              </p>
              <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
                Teambuilding som skaper ekte samhold
              </h1>
              <p className="font-inter text-lg md:text-xl text-white/88 leading-relaxed max-w-2xl">
                Aktive gruppeopplevelser, lekne konkurranser og faglig innhold
                som får kollegaer til å samarbeide bedre, ute i Arendal og langs
                Sørlandskysten.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/kontakt?tjeneste=Teambuilding"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
                >
                  Send forespørsel
                </Link>
                <Link
                  href="#opplevelser"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Se opplevelsene
                </Link>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 md:max-w-3xl">
              {[
                ["15+ år", "med bedriftsopplevelser"],
                ["49+ kunder", "har valgt Wannado"],
                ["Arendal", "skjærgård, strand og fagdag"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="border border-white/22 bg-white/10 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="font-space text-2xl font-bold text-white">
                    {value}
                  </p>
                  <p className="mt-1 font-inter text-sm text-white/72">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-4">
          <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3">
            Gruppearrangementer
          </p>
          <h2 className="font-space font-bold text-3xl md:text-4xl text-brown mb-6">
            Vi er lidenskapelig opptatt av å leke med voksne!
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed">
            Etter 15 år med gruppeaktiviteter har vi sett på nært hold hvordan
            lek og adrenalin virkelig kan endre relasjoner og samhold. Å gjøre
            noe spennende sammen med kollegaer skaper en helt ny dynamikk og
            styrker båndene mellom mennesker.
          </p>
          <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed">
            Vil dere gjøre opplevelsen enda mer meningsfull, kan vi kombinere
            aktiviteten med en fagdag som knytter de praktiske opplevelsene til
            teori, slik at dere får maksimalt utbytte.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section id="opplevelser" className="bg-warm-white py-16 md:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3">
              Våre opplevelser
            </p>
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Meny og priser
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {productCards.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl shadow-sm border border-border flex flex-col hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-space font-bold text-xl text-brown mb-3">
                    {product.name}
                  </h3>
                  <p className="font-inter text-sm md:text-base text-brown-mid leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="font-space font-bold text-teal text-lg">
                      {product.price}
                    </span>
                    <span className="font-inter text-xs text-brown-muted">
                      {product.duration}
                    </span>
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center bg-brown text-white font-inter font-medium text-sm py-2.5 px-6 rounded-lg hover:bg-[#5a4838] transition-colors duration-200 self-start"
                  >
                    Bestill
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Møt fasilitatoren */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative overflow-hidden rounded-xl aspect-video bg-brown/5">
              <video
                className="meet-video w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                controls
                poster="/images/tp-typeteori.jpg"
                aria-label="Video med Tone Pernille om teambuilding"
              >
                <source src="/videos/havsul-intervju-tone.mp4#t=2" type="video/mp4" />
              </video>
            </div>
            <div>
              <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3">
                Møt fasilitatoren
              </p>
              <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-4">
                Tone Pernille Sivertsen
              </h2>
              <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mb-4">
                Med JTI-sertifisering, NLP Master Coach-utdanning og over 15 års erfaring
                med gruppeopplevelser, vet Tone hvordan hun skal skape rom for lek, mestring
                og ekte samhold. Hun tilpasser hvert arrangement etter gruppens dynamikk.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full">
                  JTI-sertifisert
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full">
                  NLP Master Coach
                </span>
              </div>
              <a
                href="tel:+4799469957"
                className="font-inter text-sm font-medium text-brown-muted hover:text-brown transition-colors"
              >
                +47 99 46 99 57
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceCmsSection service={service} />

      {/* JTI Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-teal rounded-2xl p-8 md:p-12 text-white">
            <p className="font-inter text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
              Kombiner med foredrag
            </p>
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              JTI Light: Vi koser oss med forskjellighet
            </h2>
            <p className="font-inter text-base md:text-lg text-white/90 leading-relaxed mb-4">
              Et engasjerende foredrag som legger vekt på verdsettelse av
              forskjellighet, basert på C.G. Jungs preferanseteorier. Jungiansk
              Type Index (JTI) er et ikke-evaluerende psykologisk verktøy som
              kartlegger hvordan vi mennesker er forskjellige, uten sortering i
              &quot;bra&quot; eller &quot;mindre bra&quot;.
            </p>
            <p className="font-inter text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Start dagen med innsikt i personlighetstyper, og sett teoriene på
              prøve under aktivitetene. Se hvordan ulike personer nærmer seg
              utfordringer: noen går rett på sak, mens andre tar det steg for
              steg.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <p className="font-inter text-sm text-white/60 mb-1">
                  Foredrag
                </p>
                <p className="font-space font-bold text-xl">Fra kr 6 000,-</p>
                <p className="font-inter text-sm text-white/70">Ca 1 time</p>
              </div>
              <div>
                <p className="font-inter text-sm text-white/60 mb-1">
                  Full teamanalyse
                </p>
                <p className="font-space font-bold text-xl">
                  Kr 1 000,- pr person
                </p>
                <p className="font-inter text-sm text-white/70">Ca 3 timer</p>
              </div>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center bg-white text-teal font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-cream transition-colors duration-200"
            >
              Bestill foredrag
            </Link>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-3">
            Referanser
          </p>
          <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-10">
            Blant våre kunder
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {references.map((company) => (
              <div
                key={company}
                className="bg-white rounded-xl py-4 px-5 text-center shadow-sm border border-border"
              >
                <span className="font-inter text-sm font-medium text-brown">
                  {company}
                </span>
              </div>
            ))}
          </div>
          <p className="font-inter text-sm text-brown-muted mt-8 text-center">
            Totalt har over 49 bedrifter valgt Wannado for sine arrangementer.{" "}
            <Link
              href="/referanser"
              className="text-teal hover:text-brown underline transition-colors"
            >
              Se alle referanser
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brown rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              Klar for en uforglemmelig dag?
            </h2>
            <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Kontakt oss for et skreddersydd opplegg. Vi tilpasser aktivitetene
              etter antall deltakere, tid og ønsker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakt?tjeneste=Teambuilding"
                className="inline-flex items-center justify-center bg-white text-brown font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Send forespørsel
              </Link>
              <a
                href="tel:+4799469957"
                className="inline-flex items-center justify-center border border-white/30 text-white font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Ring Tone Pernille: +47 99 46 99 57
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
