import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCmsSection } from "@/components/services/ServiceCmsSection";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/serviceContent";

const pagePath = "/opplevelser/hesteopplevelser" as const;
const heroImage = "/images/scraped/horses/hesteopplevelser-bilde.jpg";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "hesteopplevelser",
    path: pagePath,
    fallback: {
      title:
        "Hesteopplevelser og ridetur på islandshest i Arendal | Wannado",
      description:
        "Bli med på hesteopplevelser med trygge islandshester på Sørlandet. Vi legger opp rolige, mestringsbyggende møter med hest, natur og trygg veiledning.",
      image: heroImage,
      imageAlt: "Ridetur på islandshest langs kysten på Sørlandet",
    },
  });
}

const quickFacts = [
  { label: "Hester", value: "Trygge islandshester" },
  { label: "Nivå", value: "Tilpasses erfaring" },
  { label: "Sted", value: "Arendal og Sørlandet" },
];

const experienceSteps = [
  {
    title: "Trygg start",
    text: "Vi tar oss tid til å møte hesten, snakke om forventninger og finne et tempo som passer dere.",
    icon: ShieldCheck,
  },
  {
    title: "Natur og nærvær",
    text: "Hesteopplevelsene legges opp ute, med god plass til ro, mestring og gøye øyeblikk i terrenget.",
    icon: Leaf,
  },
  {
    title: "Samspill",
    text: "Hesten blir en medhjelper som gjør samarbeid, kroppsspråk og tillit konkret, rett og slett.",
    icon: HeartHandshake,
  },
];

const goodFor = [
  "Førstegangsmøter med hest",
  "Familier og små grupper",
  "Bedrifter som vil ha en annerledes samlingsdag",
  "Kurs og mestringsopplegg etter avtale",
];

const faqs = [
  {
    question: "Må jeg ha rideerfaring for å bli med?",
    answer:
      "Nei. Vi tilpasser hesteopplevelsen etter erfaring, trygghet og gruppen som kommer. Målet er at både nye og erfarne ryttere skal kjenne mestring.",
  },
  {
    question: "Hva slags hester bruker Wannado?",
    answer:
      "Wannado bruker trygge islandshester i hesteopplevelsene. De er stødige, sosiale og godt egnet til rolige naturopplevelser med tett veiledning.",
  },
  {
    question: "Kan hesteopplevelser brukes i teambuilding?",
    answer:
      "Ja. Hester er fine medhjelpere når vi jobber med tillit, kroppsspråk, samspill og trygg kommunikasjon. Vi kan kombinere hest med teambuilding, foredrag eller en rolig dag ute.",
  },
  {
    question: "Hvordan bestiller jeg hesteopplevelser?",
    answer:
      "Send en forespørsel med ønsket dato, antall personer og litt om gruppen. Så finner vi et opplegg som passer, helt uforpliktende.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Hesteopplevelser i Arendal",
      url: absoluteUrl(pagePath),
      description:
        "Hesteopplevelser med trygge islandshester, natur og mestringsbyggende veiledning hos Wannado i Arendal-regionen.",
      inLanguage: "nb-NO",
      isPartOf: {
        "@type": "WebSite",
        name: "Wannado",
        url: absoluteUrl("/"),
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(heroImage),
      },
    },
    {
      "@type": "Service",
      name: "Hesteopplevelser med islandshest",
      serviceType: "Hesteopplevelser og ridetur",
      url: absoluteUrl(pagePath),
      image: absoluteUrl(heroImage),
      description:
        "Mestringsbyggende hesteopplevelser med trygge islandshester, natur og veiledning for private grupper, familier og bedrifter.",
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Arendal",
        },
        {
          "@type": "AdministrativeArea",
          name: "Sørlandet",
        },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: "Wannado",
        url: absoluteUrl("/"),
        telephone: "+4799469957",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Skarestrand 11",
          postalCode: "4812",
          addressLocality: "Kongshavn",
          addressRegion: "Agder",
          addressCountry: "NO",
        },
      },
      offers: {
        "@type": "Offer",
        url: absoluteUrl("/kontakt?tjeneste=Hesteopplevelser"),
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "NOK",
          description: "Pris avtales etter gruppe, varighet og opplegg.",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
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

export const dynamic = "force-dynamic";

export default async function HesteopplevelserPage() {
  const service = await getServiceBySlug("hesteopplevelser");

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Opplevelser", path: "/opplevelser" },
          { name: "Hesteopplevelser", path: pagePath },
        ])}
      />
      <JsonLd data={jsonLd} />
      <Navbar variant="solid" />

      <section className="relative isolate overflow-hidden bg-brown text-white">
        <Image
          src={heroImage}
          alt="Ridetur på islandshest langs kysten på Sørlandet"
          fill
          preload
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover object-[55%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/50 via-brown/72 to-brown" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" />

        <div className="relative mx-auto grid min-h-[820px] max-w-7xl items-end gap-8 px-6 pb-16 pt-32 md:min-h-[760px] lg:grid-cols-[minmax(0,1fr)_390px] lg:pb-20 lg:pt-40">
          <div className="max-w-4xl">
            <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.22em] text-sand">
              Ridetur og mestring med hest
            </p>
            <h1 className="font-space text-5xl font-bold leading-[0.98] text-white md:text-7xl">
              Ridetur med trygge islandshester
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/86 md:text-xl">
              Bli med ut i naturen sammen med hestene våre. Vi lager rolige,
              gøye og mestringsbyggende opplevelser for fine folk som vil prøve
              noe annerledes på Sørlandet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt?tjeneste=Hesteopplevelser"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-6 py-3 font-inter text-sm font-bold text-brown transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand active:scale-[0.98]"
              >
                Be om forslag og pris
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+4799469957"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ring Tone Pernille
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/18 bg-white/14 p-5 shadow-2xl backdrop-blur">
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              Kort fortalt
            </p>
            <div className="mt-5 grid gap-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-white/12 bg-white/10 p-4"
                >
                  <p className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-white/58">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-space text-xl font-bold text-white">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            Hva dere får
          </p>
          <h2 className="mt-3 font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
            Hest gjør samarbeid, ro og mestring helt konkret
          </h2>
        </div>
        <div className="space-y-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
          <p>
            En hesteopplevelse hos Wannado handler ikke bare om å ri. Det
            handler om å møte et stort, klokt dyr, kjenne på egen trygghet og
            få noen deilige timer ute sammen.
          </p>
          <p>
            Tone Pernille har jobbet lenge med mennesker, grupper og
            dyreassisterte intervensjoner. Derfor legger vi opp opplevelsen
            slik at både førstegangsgjester og erfarne hestefolk kan kjenne på
            mestring, uten stress og mas.
          </p>
          <p>
            Dette passer for familier, vennegjenger, kursdager og bedrifter som
            vil gi teamet noe annet enn et møterom. Bli med da vel!
          </p>
        </div>
      </section>

      <ServiceCmsSection service={service} />

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
              Slik legger vi det opp
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Rolig ramme, tydelig veiledning og rom for å prøve
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {experienceSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-brown-muted/15 bg-cream p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <step.icon
                  className="h-8 w-8 text-teal"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-space text-2xl font-bold text-brown">
                  {step.title}
                </h3>
                <p className="mt-3 font-inter text-base leading-relaxed text-brown-mid">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src={heroImage}
            alt="Islandshester på ridetur ved kysten på Sørlandet"
            width={1280}
            height={800}
            loading="eager"
            className="aspect-[4/3] w-full object-cover object-[55%_44%] lg:aspect-[16/10]"
            sizes="(max-width: 1024px) 100vw, 760px"
          />
        </div>

        <div className="rounded-3xl bg-brown p-6 text-white md:p-8">
          <div className="flex items-center gap-3">
            <UsersRound className="h-7 w-7 text-sand" aria-hidden="true" />
            <h2 className="font-space text-3xl font-bold">Passer fint for</h2>
          </div>
          <ul className="mt-7 space-y-4">
            {goodFor.map((item) => (
              <li key={item} className="flex gap-3 font-inter text-white/82">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-sand"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/10 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-sand" aria-hidden="true" />
              <p className="font-inter text-sm leading-relaxed text-white/78">
                Vi avtaler oppmøtested og opplegg etter gruppe, sesong og hva
                dere ønsker å få ut av dagen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            Vanlige spørsmål
          </p>
          <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
            Før du blir med til hestene
          </h2>
          <div className="mt-10 divide-y divide-brown-muted/18 rounded-3xl border border-brown-muted/18 bg-cream">
            {faqs.map((item) => (
              <article key={item.question} className="p-6 md:p-8">
                <h3 className="font-space text-xl font-bold text-brown">
                  {item.question}
                </h3>
                <p className="mt-3 font-inter text-base leading-relaxed text-brown-mid">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brown">
          <div className="grid lg:grid-cols-[1fr_0.82fr]">
            <div className="p-8 text-white md:p-12">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-sand">
                Klar for hest?
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold leading-tight md:text-5xl">
                Send oss litt om gruppen, så lager vi et forslag
              </h2>
              <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-white/78 md:text-lg">
                Fortell hvor mange dere er, om dere har rideerfaring og hvilken
                type opplevelse dere ønsker. Så tar vi en hyggelig prat, helt
                uforpliktende.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakt?tjeneste=Hesteopplevelser"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-6 py-3 font-inter text-sm font-bold text-brown transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Be om forslag og pris
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/priser#hest"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                >
                  Se prisnivå
                </Link>
              </div>
            </div>
            <div className="relative hidden min-h-[280px] lg:block lg:min-h-full">
              <Image
                src="/images/tp-typeteori.jpg"
                alt="Tone Pernille Sivertsen, ansvarlig for hesteopplevelser hos Wannado"
                fill
                className="object-cover object-[center_24%]"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
