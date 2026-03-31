import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Teambuilding Arendal - Opplevelser for bedrifter | Wannado",
  description:
    "Teambuilding i Arendal med 15 års erfaring. Velg mellom utendørs utfordringer, mordmysterier, innendørs konkurranser og personlighetsanalyse. Fra kr 4 500. Kontakt oss i dag!",
};

const schemaPrices: Record<string, number> = {
  "360\u00B0 Wannado": 16500,
  "Heia dem som vinner": 16500,
  "Påfyll": 1950,
  "Cluedo": 16500,
  "Mord i Cicilia": 4500,
  "Kajakk og skjærgårdssafari": 1350,
};

const products = [
  {
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

export default function TeambuildingPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": products.map((product) => ({
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: {
        "@type": "Organization",
        name: "Wannado",
      },
      offers: {
        "@type": "Offer",
        price: schemaPrices[product.name],
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
        url: "https://wannado.no/kontakt?tjeneste=Teambuilding",
      },
      image: `https://wannado.no${product.image}`,
      category: "Teambuilding",
    })),
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-6">
            Teambuilding som skaper ekte samhold
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/80 leading-relaxed">
            I over 15 år har Wannado skapt uforglemmelige opplevelser for
            bedrifter på Sørlandet. Vi vet hva som fungerer.
          </p>
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
      <section className="bg-warm-white py-16 md:py-20">
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
            {products.map((product) => (
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
                    href={product.href}
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
              href="/kontakt?tjeneste=Foredrag%2FJTI"
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
