import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Compass,
  MountainSnow,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
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
    slug: "foredrag",
    path: "/foredrag",
    fallback: {
      title:
        "Foredrag Arendal - JTI personlighetsanalyse og Grønlandsekspedisjon | Wannado",
      description:
        "Inspirerende foredrag for bedrifter og organisasjoner. JTI personlighetsanalyse basert på C.G. Jung, og Roars kajakkekspedisjon til Øst-Grønland. Bestill i dag!",
      image: "/images/tp-typeteori.jpg",
      imageAlt: "Tone Pernille Sivertsen holder foredrag",
    },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "JTI Foredrag: Jungiansk Type Index",
      serviceType: "Foredrag og teamanalyse",
      description:
        "Inspirerende foredrag om personlighet og samarbeid basert på C.G. Jungs preferanseteorier. JTI kartlegger hvordan vi mennesker er forskjellige.",
      url: absoluteUrl("/foredrag/jti"),
      areaServed: [
        { "@type": "AdministrativeArea", name: "Arendal" },
        { "@type": "AdministrativeArea", name: "Agder" },
        { "@type": "Country", name: "Norge" },
      ],
      provider: {
        "@type": "Organization",
        name: "Wannado",
        url: absoluteUrl("/"),
      },
      offers: {
        "@type": "Offer",
        url: absoluteUrl("/kontakt?tjeneste=Foredrag/JTI"),
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
      },
      image: absoluteUrl("/images/tp-typeteori.jpg"),
    },
    {
      "@type": "Service",
      name: "Grønlandsekspedisjonen: Kajakkekspedisjon til Øst-Grønland",
      serviceType: "Ekspedisjonsforedrag",
      description:
        "Roar deler opplevelsen fra sin kajakkekspedisjon til Øst-Grønland gjennom fantastiske bilder og video fra et av verdens mest spektakulære landskap.",
      url: absoluteUrl("/foredrag/kajakkekspedisjon-ost-gronland"),
      areaServed: [
        { "@type": "AdministrativeArea", name: "Agder" },
        { "@type": "Country", name: "Norge" },
      ],
      provider: {
        "@type": "Organization",
        name: "Wannado",
        url: absoluteUrl("/"),
      },
      offers: {
        "@type": "Offer",
        url: absoluteUrl("/kontakt?tjeneste=Grønlandsforedrag"),
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
      },
      image: absoluteUrl("/images/scraped/landscape/kimmiut-gronland-1920.jpg"),
    },
  ],
};

const heroStats = [
  { value: "45 min", label: "kort foredrag" },
  { value: "1 dag", label: "teamanalyse" },
  { value: "2", label: "tydelige tema" },
];

const audiences = [
  {
    title: "Ledergrupper",
    description: "Få et språk for preferanser, samarbeid og ulikheter.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Skoler og lag",
    description: "Historier fra naturen som gjør mot og forberedelse konkret.",
    icon: UsersRound,
  },
  {
    title: "Bedriftsdager",
    description: "Kombiner foredrag med kajakk, seiltur eller teambuilding.",
    icon: Compass,
  },
];

const JTI_PRODUCT_ID = "8dd12817-b5af-4b50-ba12-0aba6019c495";
const GREENLAND_PRODUCT_ID = "3745b38f-d5e0-4020-be07-ba0bee81cb94";

export const dynamic = "force-dynamic";

export default async function ForedragPage() {
  const [{ data: sanityProducts }, service] = await Promise.all([
    sanityFetch({
      query: allProductsQuery,
      perspective: "published",
    }),
    getServiceBySlug("foredrag"),
  ]);

  const products = (sanityProducts as SanityProduct[] | null) ?? [];
  const productById = new Map<string, SanityProduct>(
    products.map((product) => [product._id, product]),
  );

  const jtiProduct = productById.get(JTI_PRODUCT_ID);
  const greenlandProduct = productById.get(GREENLAND_PRODUCT_ID);
  const jtiPrice = jtiProduct?.price
    ? `Fra kr ${formatNok(jtiProduct.price)},-`
    : "Fra kr 6 000,-";
  const greenlandPrice = greenlandProduct?.price
    ? `Fra kr ${formatNok(greenlandProduct.price)},-`
    : "Kontakt oss for tilpasset tilbud";

  const talks = [
    {
      eyebrow: "Personlighetsanalyse",
      title: jtiProduct?.name || "JTI: Jungiansk Type Index",
      description:
        jtiProduct?.descriptionText ||
        "Et inspirerende foredrag om personlighet og samarbeid, basert på C.G. Jungs preferanseteorier. JTI kartlegger hvordan vi mennesker er forskjellige, uten sortering i bra eller mindre bra.",
      detail:
        "Forstå hvordan ulike personligheter påvirker samarbeid, og få verktøy for å styrke teamdynamikken i hverdagen.",
      image: jtiProduct?.imageUrl || "/images/tp-typeteori.jpg",
      imageAlt:
        jtiProduct?.imageAlt ||
        "Tone Pernille Sivertsen holder boken Typeforståelse, JTI personlighetsanalyse",
      icon: BookOpenCheck,
      price: jtiPrice,
      meta: "Ca 45 minutter eller hel teamanalyse",
      contact: "Tone Pernille Sivertsen, tp@wannado.no, +47 99 46 99 57",
      href: "/foredrag/jti",
      cta: "Les mer om JTI",
      theme: "teal",
    },
    {
      eyebrow: "Ekspedisjonsforedrag",
      title: greenlandProduct?.name || "Grønlandsekspedisjonen",
      description:
        greenlandProduct?.descriptionText ||
        "Roar tok med seg kajakken til Øst-Grønland. I dette foredraget deler han opplevelsen gjennom bilder og video fra en ekspedisjon i et av verdens mest spektakulære landskap.",
      detail:
        "Et foredrag om mot, forberedelse og naturopplevelser i ytterste konsekvens, tilpasset bedrifter, skoler og organisasjoner.",
      image:
        greenlandProduct?.imageUrl ||
        "/images/scraped/landscape/kimmiut-gronland-1920.jpg",
      imageAlt:
        greenlandProduct?.imageAlt ||
        "Kimmiut landsby på Øst-Grønland med snødekte fjell og isbre",
      icon: MountainSnow,
      price: greenlandPrice,
      meta: "Varighet og innhold tilpasses publikum",
      contact: "Roar Laugerud, roar@wannado.no, +47 94 82 67 10",
      href: "/foredrag/kajakkekspedisjon-ost-gronland",
      cta: "Les mer om foredraget",
      theme: "brown",
    },
  ];

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Foredrag", path: "/foredrag" },
        ])}
      />
      <JsonLd data={jsonLd} />
      <Navbar variant="solid" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brown text-white">
        <Image
          src="/images/scraped/landscape/kimmiut-gronland-1920.jpg"
          alt="Øst-Grønland med fjell, is og vann"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/58 via-brown/82 to-brown lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream" />
        <div className="mx-auto grid min-h-[820px] max-w-7xl items-center gap-10 px-6 pb-12 pt-28 sm:min-h-[760px] md:pb-16 lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr] lg:pt-28">
          <div className="relative z-[1] max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <UsersRound className="h-4 w-4 text-sand" aria-hidden="true" />
              Foredrag og kurs
            </div>
            <h1 className="font-space text-5xl font-bold leading-[0.98] text-white md:text-7xl">
              Foredrag som sitter igjen
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/86 md:text-xl">
              Gi teamet ny innsikt gjennom JTI, personlighet og samarbeid, eller
              la Roar ta salen med til Øst-Grønland gjennom bilder, video og
              erfaringer fra kajakkekspedisjon.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt?tjeneste=Foredrag"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-6 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
              >
                Send forespørsel
              </Link>
              <Link
                href="#foredragene"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Se foredragene
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/16 bg-white/10 px-5 py-4 backdrop-blur"
                >
                  <p className="font-space text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1] hidden min-h-[500px] lg:block">
            <div className="absolute right-0 top-0 h-[330px] w-[58%] overflow-hidden rounded-2xl border border-white/18 shadow-2xl">
              <Image
                src="/images/tp-typeteori.jpg"
                alt="Tone Pernille Sivertsen holder foredrag om JTI"
                fill
                priority
                sizes="420px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 h-[330px] w-[62%] overflow-hidden rounded-2xl border border-white/18 shadow-2xl">
              <Image
                src="/images/scraped/landscape/kimmiut-gronland-1920.jpg"
                alt="Øst-Grønland med fjell, is og vann"
                fill
                priority
                sizes="460px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-16 right-8 w-72 rounded-2xl border border-white/18 bg-white/14 p-5 shadow-2xl backdrop-blur">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                To innganger
              </p>
              <p className="mt-2 font-space text-xl font-bold text-white">
                Samarbeid i rommet, natur på lerretet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-teal">
                  <audience.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-space text-xl font-bold text-brown">
                  {audience.title}
                </h2>
                <p className="mt-2 font-inter text-sm leading-relaxed text-brown-mid">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="foredragene" className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal">
              Velg foredrag
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              To tydelige tema, begge med historier folk husker
            </h2>
          </div>

          <div className="space-y-8">
            {talks.map((talk, index) => (
              <article
                key={talk.title}
                className="min-w-0 overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div
                  className={`grid min-w-0 gap-0 lg:grid-cols-2 ${
                    index === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-w-0 min-h-[300px] md:min-h-[420px]">
                    <Image
                      src={talk.image}
                      alt={talk.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-between p-7 md:p-10">
                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            talk.theme === "teal"
                              ? "bg-teal text-white"
                              : "bg-brown text-white"
                          }`}
                        >
                          <talk.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                          {talk.eyebrow}
                        </p>
                      </div>
                      <h3 className="break-words font-space text-2xl font-bold leading-tight text-brown md:text-4xl">
                        {talk.title}
                      </h3>
                      <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid">
                        {talk.description}
                      </p>
                      <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid">
                        {talk.detail}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-4 rounded-2xl bg-cream p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="font-space text-xl font-bold text-brown">
                          {talk.price}
                        </p>
                        <p className="mt-1 font-inter text-sm leading-relaxed text-brown-mid">
                          {talk.meta}
                        </p>
                        <p className="mt-3 font-inter text-xs leading-relaxed text-brown-mid">
                          Kontakt: {talk.contact}
                        </p>
                      </div>
                      <Link
                        href={talk.href}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brown px-4 py-3 text-center font-inter text-sm font-semibold leading-tight text-white transition-colors hover:bg-brown-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown sm:w-auto"
                      >
                        {talk.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceCmsSection service={service} />

      {/* CTA */}
      <section className="bg-brown py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-sand">
              Vil dere gjøre mer ut av dagen?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold md:text-5xl">
              Kombiner foredrag med en opplevelse ute.
            </h2>
            <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-white/82">
              Vi kan sette sammen foredrag, JTI, kajakk, seiltur eller
              teambuilding til en hel dag for gruppen.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/kontakt?tjeneste=Foredrag/JTI"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            >
              Send forespørsel
            </Link>
            <Link
              href="/teambuilding"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Se teambuilding-meny
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
