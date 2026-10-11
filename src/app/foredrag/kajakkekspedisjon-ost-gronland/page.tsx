import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Binoculars,
  CheckCircle2,
  Compass,
  Map,
  MountainSnow,
  Phone,
  Waves,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  formatNok,
  productsByIdsQuery,
  type SanityProduct,
} from "@/sanity/lib/content";

const pagePath = "/foredrag/kajakkekspedisjon-ost-gronland" as const;
const heroImage = "/images/scraped/landscape/kimmiut-gronland-1920.jpg";
const GREENLAND_PRODUCT_ID = "3745b38f-d5e0-4020-be07-ba0bee81cb94";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "kajakkekspedisjon-ost-gronland",
    path: pagePath,
    fallback: {
      title:
        "Foredrag om kajakkekspedisjon til Øst-Grønland | Wannado",
      description:
        "Roar Laugerud holder inspirerende foredrag om kajakkekspedisjon til Øst-Grønland, med bilder, video og historier om mot, natur og forberedelse.",
      image: heroImage,
      imageAlt: "Øst-Grønland med fjell, is og vann",
    },
  });
}

const storyBeats = [
  "Hvordan man planlegger når naturen bestemmer tempoet",
  "Møter med is, vær, stillhet og små marginer",
  "Hva krevende turer lærer oss om trygghet og forberedelse",
  "Bilder og video fra et landskap få får oppleve på nært hold",
];

const formats = [
  {
    title: "Inspirasjonsforedrag",
    text: "Passer godt for skoler, foreninger og grupper som vil ha en sterk naturhistorie med bilder og video.",
    icon: MountainSnow,
  },
  {
    title: "Bedriftsforedrag",
    text: "Foredraget kan vinkles mot forberedelse, risikoforståelse, samarbeid og beslutninger når rammene endrer seg.",
    icon: Compass,
  },
  {
    title: "Fagdag med aktivitet",
    text: "Kombiner foredraget med kajakk, seiltur eller teambuilding for en dag med både historie og opplevelse.",
    icon: Waves,
  },
];

const faqItems = [
  {
    question: "Hvem passer Grønlandsforedraget for?",
    answer:
      "Det passer for bedrifter, skoler, lag, foreninger og grupper som vil ha en inspirerende historie om natur, mot, forberedelse og mestring.",
  },
  {
    question: "Kan foredraget holdes utenfor Arendal?",
    answer:
      "Ja. Roar kan holde foredraget hos dere, eller dere kan legge det inn som del av en Wannado-dag på Sørlandet.",
  },
  {
    question: "Inneholder foredraget bilder og video?",
    answer:
      "Ja. Foredraget bygger på sterke bilder og video fra kajakkekspedisjonen til Øst-Grønland.",
  },
  {
    question: "Hva koster foredraget?",
    answer:
      "Pris avtales etter sted, varighet og opplegg. Send oss ønsket dato, gruppe og ramme, så kommer vi med et konkret forslag.",
  },
];

const pageUrl = absoluteUrl(pagePath);

function createJsonLd(priceText: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Kajakkekspedisjon til Øst-Grønland",
        description:
          "Inspirerende foredrag med Roar Laugerud om kajakkekspedisjon til Øst-Grønland, natur, forberedelse og mestring.",
        inLanguage: "nb-NO",
        isPartOf: {
          "@id": `${absoluteUrl("/")}#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(heroImage),
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Foredrag om kajakkekspedisjon til Øst-Grønland",
        serviceType: "Ekspedisjonsforedrag",
        description:
          "Foredrag med bilder og video fra Roar Laugeruds kajakkekspedisjon til Øst-Grønland.",
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Agder" },
          { "@type": "Country", name: "Norge" },
        ],
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/kontakt?tjeneste=Grønlandsforedrag"),
          priceCurrency: "NOK",
          availability: "https://schema.org/InStock",
          description: priceText,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  } as const;
}

export const dynamic = "force-dynamic";

export default async function GreenlandTalkPage() {
  const { data: products } = await sanityFetch({
    query: productsByIdsQuery,
    params: { ids: [GREENLAND_PRODUCT_ID] },
    perspective: "published",
  });

  const product = (products as SanityProduct[]).find(
    (item) => item._id === GREENLAND_PRODUCT_ID,
  );
  const priceText = product?.price
    ? `Fra kr ${formatNok(product.price)},-`
    : "Pris avtales etter opplegg";
  const productDescription =
    product?.descriptionText ||
    "Roar tok med seg kajakken til Øst-Grønland. I dette foredraget deler han opplevelsen gjennom bilder og video fra en ekspedisjon i et av verdens mest spektakulære landskap.";

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Foredrag", path: "/foredrag" },
          { name: "Kajakkekspedisjon til Øst-Grønland", path: pagePath },
        ])}
      />
      <JsonLd data={createJsonLd(priceText)} />
      <Navbar variant="solid" />

      <section className="relative isolate overflow-hidden bg-brown text-white">
        <Image
          src={heroImage}
          alt="Øst-Grønland med fjell, is og vann"
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[55%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/42 via-brown/70 to-brown" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" />

        <div className="relative mx-auto grid min-h-[820px] max-w-7xl items-end gap-10 px-6 pb-16 pt-32 lg:grid-cols-[minmax(0,1fr)_390px] lg:pb-20">
          <div className="max-w-4xl">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-sand">
              Ekspedisjonsforedrag
            </p>
            <h1 className="mt-5 max-w-4xl font-space text-5xl font-bold leading-[0.98] md:text-7xl">
              Kajakk, isfjell og stillhet på Øst-Grønland
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/86 md:text-xl">
              Roar tar publikum med inn i en kajakkekspedisjon der naturen er
              større enn planen. Et foredrag om forberedelse, mot, risiko og
              opplevelser som setter seg i kroppen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt?tjeneste=Grønlandsforedrag"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-6 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
              >
                Send forespørsel
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#opplegg"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Se innholdet
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/18 bg-white/14 p-6 shadow-2xl backdrop-blur">
            <Binoculars className="h-8 w-8 text-sand" aria-hidden="true" />
            <p className="mt-5 font-space text-2xl font-bold text-white">
              {priceText}
            </p>
            <p className="mt-3 font-inter text-sm leading-relaxed text-white/76">
              Foredraget tilpasses publikum, sted og ønsket vinkel. Bilder og
              video er en sentral del av opplevelsen.
            </p>
            <dl className="mt-6 grid gap-4 border-t border-white/15 pt-5">
              <div>
                <dt className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-sand">
                  Forteller
                </dt>
                <dd className="mt-1 font-inter text-sm text-white/82">
                  Roar Laugerud
                </dd>
              </div>
              <div>
                <dt className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-sand">
                  Passer for
                </dt>
                <dd className="mt-1 font-inter text-sm text-white/82">
                  Bedrifter, skoler og foreninger
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-teal">
              En historie fra kanten av kartet
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Natur, valg og små marginer
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              {productDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {storyBeats.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-teal" aria-hidden="true" />
                <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="opplegg" className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-teal">
              Slik kan det brukes
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Fra ren inspirasjon til fagdag
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              Foredraget kan stå alene, eller knyttes til tema som ledelse,
              risiko, samarbeid, natur, friluftsliv og beslutninger under press.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((format) => (
              <article
                key={format.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-teal">
                  <format.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-space text-2xl font-bold text-brown">
                  {format.title}
                </h3>
                <p className="mt-3 font-inter text-base leading-relaxed text-brown-mid">
                  {format.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-brown shadow-sm">
              <Image
                src="/images/scraped/landscape/isfjell-gronland-1.jpg"
                alt="Isfjell på Øst-Grønland"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-brown shadow-sm sm:mt-14">
              <Image
                src="/images/scraped/kayak/Kajakktauing-Gronland.jpg"
                alt="Kajakker på slep under ekspedisjon på Grønland"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-teal">
              Roar Laugerud
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Guiden som vet hva forberedelse betyr
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              Roar er Veileder Hav, skipper og fotograf. Han formidler
              ekspedisjonen med ro, presisjon og sterke visuelle øyeblikk, slik
              at publikum både kjenner eventyret og forstår arbeidet bak.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Norges høyeste padleveileder-nivå",
                "Lang erfaring med turledelse, kurs og sikkerhet på sjøen",
                "Fotografisk fortelling med bilder fra ekspedisjonen",
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <Map className="mt-1 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <p className="font-inter text-base leading-relaxed text-brown-mid">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt?tjeneste=Grønlandsforedrag"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brown px-6 py-3 font-inter text-sm font-bold text-white transition-colors hover:bg-brown-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
              >
                Send forespørsel
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+4794826710"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 font-inter text-sm font-semibold text-brown transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                +47 94 82 67 10
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-teal">
              Praktisk
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Ofte spurt om foredraget
            </h2>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
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

      <section className="bg-brown py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-sand">
              Vil dere høre historien?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold md:text-5xl">
              Send ønsket dato, sted og publikum, så svarer Roar med forslag.
            </h2>
          </div>
          <Link
            href="/kontakt?tjeneste=Grønlandsforedrag"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-7 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
          >
            Send forespørsel
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
