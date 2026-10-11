import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Phone,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  formatNok,
  productsByIdsQuery,
  type SanityProduct,
} from "@/sanity/lib/content";

const pagePath = "/foredrag/jti" as const;
const heroImage = "/images/tp-typeteori.jpg";
const JTI_PRODUCT_ID = "8dd12817-b5af-4b50-ba12-0aba6019c495";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "jti",
    path: pagePath,
    fallback: {
      title:
        "JTI foredrag Arendal - teamdynamikk og samarbeid | Wannado",
      description:
        "JTI foredrag og workshop for bedrifter, ledergrupper og team. Forstå personlighetstyper, samarbeid og kommunikasjon med Tone Pernille Sivertsen.",
      image: heroImage,
      imageAlt: "Tone Pernille Sivertsen holder foredrag om JTI",
    },
  });
}

const learningPoints = [
  "Et felles språk for forskjeller i teamet",
  "Bedre forståelse av hvordan folk tar inn informasjon og tar beslutninger",
  "Konkrete grep for tydeligere kommunikasjon i arbeidshverdagen",
  "Mer raushet når tempo, behov og arbeidsstil er ulik",
];

const formats = [
  {
    title: "JTI Light",
    text: "Et engasjerende foredrag på rundt 45 minutter for kick-off, fagdag eller ledermøte.",
    icon: Lightbulb,
  },
  {
    title: "Workshop",
    text: "Mer tid til refleksjon, øvelser og praktiske samtaler om hvordan teamet faktisk jobber sammen.",
    icon: MessageCircle,
  },
  {
    title: "Teamanalyse",
    text: "En hel dag der gruppen går dypere i preferanser, samspill og utviklingspunkter.",
    icon: UsersRound,
  },
];

const audience = [
  "Ledergrupper som vil forstå samspillet bedre",
  "Team med høyt tempo, mange roller eller krevende samarbeid",
  "Bedrifter som vil kombinere faglig innhold med opplevelser ute",
  "Skoler, organisasjoner og grupper som vil jobbe med kommunikasjon",
];

const faqItems = [
  {
    question: "Hva er JTI?",
    answer:
      "JTI står for Jungiansk Type Index og bygger på C.G. Jungs teori om psykologiske preferanser. Det handler om typiske måter vi henter energi, tar inn informasjon, vurderer valg og organiserer hverdagen på.",
  },
  {
    question: "Er JTI en test som sier hva som er riktig personlighet?",
    answer:
      "Nei. JTI brukes ikke for å rangere folk. Poenget er å gjøre forskjeller tydelige, nyttige og lettere å snakke om i teamet.",
  },
  {
    question: "Kan foredraget holdes hos oss?",
    answer:
      "Ja. Tone Pernille kan holde foredraget hos dere, i egne lokaler i Arendal-regionen eller som del av en større Wannado-dag med aktivitet ute.",
  },
  {
    question: "Hva koster JTI-foredrag?",
    answer:
      "Kort foredrag starter normalt fra 6 000 kroner. Workshop og teamanalyse prises etter varighet, antall personer og ønsket opplegg.",
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
        name: "JTI foredrag og teamdynamikk",
        description:
          "JTI foredrag og workshop for team som vil forstå personlighetstyper, samarbeid og kommunikasjon bedre.",
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
        name: "JTI foredrag og workshop",
        serviceType: "Foredrag, workshop og teamanalyse",
        description:
          "Foredrag og workshop om JTI, personlighetspreferanser, teamdynamikk og kommunikasjon for bedrifter og grupper.",
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Arendal" },
          { "@type": "AdministrativeArea", name: "Agder" },
          { "@type": "Country", name: "Norge" },
        ],
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/kontakt?tjeneste=Foredrag/JTI"),
          priceCurrency: "NOK",
          availability: "https://schema.org/InStock",
          description: priceText,
        },
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        name: "JTI for team og ledere",
        description:
          "Lær å bruke Jungiansk Type Index som praktisk verktøy for samarbeid, kommunikasjon og teamutvikling.",
        url: pageUrl,
        image: absoluteUrl(heroImage),
        inLanguage: "nb-NO",
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
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

export default async function JtiForedragPage() {
  const { data: products } = await sanityFetch({
    query: productsByIdsQuery,
    params: { ids: [JTI_PRODUCT_ID] },
    perspective: "published",
  });

  const product = (products as SanityProduct[]).find(
    (item) => item._id === JTI_PRODUCT_ID,
  );
  const priceText = product?.price
    ? `Fra kr ${formatNok(product.price)},-`
    : "Fra kr 6 000,-";
  const productDescription =
    product?.descriptionText ||
    "Et inspirerende foredrag om personlighet og samarbeid, basert på C.G. Jungs preferanseteorier. JTI kartlegger hvordan vi mennesker er forskjellige, uten sortering i bra eller mindre bra.";

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Foredrag", path: "/foredrag" },
          { name: "JTI", path: pagePath },
        ])}
      />
      <JsonLd data={createJsonLd(priceText)} />
      <Navbar />

      <PageHero
        image={heroImage}
        imageAlt="Tone Pernille Sivertsen holder foredrag om JTI"
        imagePosition="52% 30%"
        eyebrow="JTI foredrag og workshop"
        title="Forstå teamet før dere prøver å endre det"
        intro="JTI gjør personlighet og samarbeid praktisk. Tone Pernille gir teamet et språk for ulikheter, kommunikasjon og de små friksjonene som ofte avgjør hvordan hverdagen fungerer."
        primary={{ label: "Send forespørsel", href: "/kontakt?tjeneste=Foredrag/JTI" }}
        secondary={{ label: "Se opplegg", href: "#opplegg" }}
        asideOnMobile
        aside={
          <>
            <BookOpenCheck className="h-8 w-8 text-teal" aria-hidden="true" />
            <p className="mt-5 font-space text-2xl font-bold text-brown">
              {priceText}
            </p>
            <p className="mt-3 font-inter text-sm leading-relaxed text-brown-mid">
              Kort foredrag, workshop eller hel teamanalyse. Innhold og varighet
              tilpasses gruppen.
            </p>
            <dl className="mt-6 grid gap-4 border-t border-border pt-5">
              <div>
                <dt className="font-inter text-xs font-semibold text-teal">
                  Passer for
                </dt>
                <dd className="mt-1 font-inter text-sm text-brown">
                  Bedrifter, ledergrupper og team
                </dd>
              </div>
              <div>
                <dt className="font-inter text-xs font-semibold text-teal">
                  Kontakt
                </dt>
                <dd className="mt-1 font-inter text-sm text-brown">
                  Tone Pernille Sivertsen
                </dd>
              </div>
            </dl>
          </>
        }
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Mindre synsing, mer felles språk
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              {productDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {learningPoints.map((point) => (
              <div
                key={point}
                className="rounded-card border border-border bg-white p-5"
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
            <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
              Fra kort inspirasjon til hel teamdag
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              JTI kan stå alene som foredrag, eller brukes som faglig kjerne i
              en større bedriftsdag med refleksjon, aktivitet og sosialt påfyll.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((format) => (
              <article
                key={format.title}
                className="rounded-card border border-border bg-white p-6"
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
          <div className="relative min-h-[420px] overflow-hidden rounded-card bg-brown">
            <Image
              src="/images/tone-pernille-havsul.jpg"
              alt="Tone Pernille Sivertsen på Havsul i Arendals skjærgård"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/10 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-md p-7 text-white md:p-9">
              <p className="font-inter text-xs font-semibold text-sand">
                Tone Pernille
              </p>
              <p className="mt-3 font-space text-2xl font-bold">
                JTI-sertifisert, NLP Master Coach og erfaren fasilitator.
              </p>
            </div>
          </div>

          <div>
            <p className="font-inter text-sm font-semibold text-teal">
              Hvem passer det for?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Når folk er forskjellige, trenger samtalen bedre rammer
            </h2>
            <div className="mt-8 grid gap-4">
              {audience.map((item) => (
                <div key={item} className="flex gap-4">
                  <HeartHandshake
                    className="mt-1 h-5 w-5 shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  <p className="font-inter text-base leading-relaxed text-brown-mid">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/kontakt?tjeneste=Foredrag/JTI"
                variant="primary"
                className="gap-2"
              >
                Send forespørsel
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href="tel:+4799469957"
                variant="outline"
                className="gap-2"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ring Tone Pernille
              </Button>
              <Button href="/kurs/jti" variant="outline" className="gap-2">
                Se JTI-kurs
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
              Ofte spurt om JTI
            </h2>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-card border border-border bg-white p-6"
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
            <p className="font-inter text-sm font-semibold text-sand">
              Klar for en bedre teamsamtale?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold md:text-5xl">
              Fortell litt om gruppen, så foreslår vi riktig JTI-opplegg.
            </h2>
          </div>
          <Button href="/kontakt?tjeneste=Foredrag/JTI" variant="sand" className="gap-2">
            Send forespørsel
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
