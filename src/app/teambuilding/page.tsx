import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import Button from "@/components/ui/Button";
import ServiceRow from "@/components/ui/ServiceRow";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
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
        "Teambuilding i Arendal med 15 års erfaring. Velg utendørs utfordringer, mordmysterier, JTI og personlighetsanalyse. Skreddersydd for deres mål.",
      image: "/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg",
      imageAlt: "Kollegaer hopper på stranden under teambuilding med Wannado",
    },
  });
}

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Tone Pernille forteller om teambuilding",
  description:
    "Tone Pernille i Wannado forteller om teambuilding og bedriftsarrangement i Arendal og på Sørlandet.",
  thumbnailUrl: absoluteUrl("/images/tp-typeteori.jpg"),
  uploadDate: "2026-04-01",
  contentUrl: absoluteUrl("/videos/havsul-intervju-tone.mp4"),
} as const;

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
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Bedrift", path: "/bedrift" },
          { name: "Teambuilding", path: "/teambuilding" },
        ])}
      />
      <JsonLd data={productSchema} />
      <JsonLd data={videoJsonLd} />
      <Navbar />

      <PageHero
        image="/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg"
        imageAlt="Kollegaer hopper på stranden under teambuilding med Wannado"
        eyebrow="Teambuilding på Sørlandet"
        title="Teambuilding som skaper ekte samhold"
        intro="Aktive gruppeopplevelser, lekne konkurranser og faglig innhold som får kollegaer til å samarbeide bedre, ute i Arendal og langs Sørlandskysten."
        primary={{ label: "Send forespørsel", href: "/kontakt?tjeneste=Teambuilding" }}
        secondary={{ label: "Se opplevelsene", href: "#opplevelser" }}
      />

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-4">
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
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Meny og priser
            </h2>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {productCards.map((product) => (
              <ServiceRow
                key={product.name}
                title={product.name}
                text={`${product.description} Varighet: ${product.duration}.`}
                price={product.price}
                image={product.image}
                imageAlt={product.alt}
                href="/booking"
              />
            ))}
          </ul>
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
          <div className="bg-teal rounded-card p-8 md:p-12 text-white">
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
                <p className="font-inter text-sm text-white/85 mb-1">
                  Foredrag
                </p>
                <p className="font-space font-bold text-xl">Fra kr 6 000,-</p>
                <p className="font-inter text-sm text-white/85">Ca 1 time</p>
              </div>
              <div>
                <p className="font-inter text-sm text-white/85 mb-1">
                  Full teamanalyse
                </p>
                <p className="font-space font-bold text-xl">
                  Kr 1 000,- pr person
                </p>
                <p className="font-inter text-sm text-white/85">Ca 3 timer</p>
              </div>
            </div>
            <Button href="/booking" variant="sand">
              Bestill foredrag
            </Button>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-10">
            Blant våre kunder
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {references.map((company) => (
              <div
                key={company}
                className="bg-white rounded-xl py-4 px-5 text-center border border-border"
              >
                <span className="font-inter text-sm font-medium text-brown">
                  {company}
                </span>
              </div>
            ))}
          </div>
          <p className="font-inter text-sm text-brown-muted mt-8 text-center">
            Se hvem som har vært med oss.{" "}
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
          <div className="bg-brown rounded-card p-8 md:p-12 text-center text-white">
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              Klar for en uforglemmelig dag?
            </h2>
            <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Kontakt oss for et skreddersydd opplegg. Vi tilpasser aktivitetene
              etter antall deltakere, tid og ønsker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/kontakt?tjeneste=Teambuilding" variant="sand">
                Send forespørsel
              </Button>
              <Button href="tel:+4799469957" variant="outline-light">
                Ring Tone Pernille
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
