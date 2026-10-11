import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Phone,
  Route,
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

const pagePath = "/kurs/jti" as const;
const heroImage = "/images/tp-typeteori.jpg";
const JTI_PRODUCT_ID = "8dd12817-b5af-4b50-ba12-0aba6019c495";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "jti-kurs",
    path: pagePath,
    fallback: {
      title: "JTI-kurs for team og ledere | Wannado Arendal",
      description:
        "JTI-kurs, workshop og teamanalyse for bedrifter som vil jobbe praktisk med personlighetstyper, samarbeid og kommunikasjon.",
      image: heroImage,
      imageAlt: "Tone Pernille Sivertsen holder kurs om JTI og teamutvikling",
    },
  });
}

const outcomes = [
  "Forstå egne preferanser uten å gjøre dem til fasit",
  "Se hvorfor misforståelser oppstår i helt vanlige arbeidsdager",
  "Trene på tydeligere kommunikasjon mellom ulike personligheter",
  "Lage konkrete avtaler for hvordan teamet skal samarbeide bedre",
];

const courseSteps = [
  {
    title: "Kartlegg",
    text: "Vi starter med et trygt rammeverk for preferanser, forskjeller og typiske mønstre i gruppen.",
    icon: ClipboardCheck,
  },
  {
    title: "Forstå",
    text: "Teamet jobber med praktiske eksempler fra egen hverdag, slik at teorien blir lett å kjenne igjen.",
    icon: MessageCircle,
  },
  {
    title: "Avtal",
    text: "Dere går videre med konkrete grep for møter, samarbeid, beslutninger og hverdagskommunikasjon.",
    icon: Route,
  },
];

const formats = [
  {
    title: "Halvdagskurs",
    description:
      "For team som vil ha en tydelig introduksjon, refleksjon og noen konkrete verktøy samme dag.",
  },
  {
    title: "Heldags teamanalyse",
    description:
      "For grupper som vil jobbe grundigere med samspill, roller og utviklingspunkter.",
  },
  {
    title: "Fagdag med aktivitet",
    description:
      "Kombiner JTI med teambuilding, kajakk, seiltur eller en rolig opplevelse ute.",
  },
];

const faqItems = [
  {
    question: "Er JTI-kurs det samme som JTI-foredrag?",
    answer:
      "Nei. Foredraget gir rask inspirasjon og felles begreper. Kurset går dypere, med øvelser, refleksjon og praktisk arbeid med egen gruppe.",
  },
  {
    question: "Må alle ta en test på forhånd?",
    answer:
      "Det avtales etter opplegget. Noen grupper ønsker full teamanalyse med individuell kartlegging, mens andre starter med en enklere workshop.",
  },
  {
    question: "Kan JTI-kurs kombineres med teambuilding?",
    answer:
      "Ja. Det er ofte en god kombinasjon. Først får dere språk for forskjeller, deretter bruker dere det i aktivitet, samtale og refleksjon.",
  },
  {
    question: "Hvor holdes kurset?",
    answer:
      "Kurset kan holdes hos dere, i Arendal-regionen eller som del av en Wannado-dag med aktivitet ute.",
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
        name: "JTI-kurs for team og ledere",
        description:
          "JTI-kurs, workshop og teamanalyse for bedrifter som vil jobbe praktisk med personlighetstyper, samarbeid og kommunikasjon.",
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
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        name: "JTI-kurs for team og ledere",
        description:
          "Praktisk JTI-kurs med fokus på personlighetstyper, teamdynamikk, kommunikasjon og konkrete samarbeidsavtaler.",
        url: pageUrl,
        image: absoluteUrl(heroImage),
        inLanguage: "nb-NO",
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/kontakt?tjeneste=Foredrag/JTI"),
          priceCurrency: "NOK",
          availability: "https://schema.org/InStock",
          description: priceText,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "JTI workshop og teamanalyse",
        serviceType: "Kurs og teamutvikling",
        description:
          "Fasilitert JTI-workshop for bedrifter, ledergrupper og team som vil utvikle samarbeid og kommunikasjon.",
        provider: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Arendal" },
          { "@type": "AdministrativeArea", name: "Agder" },
          { "@type": "Country", name: "Norge" },
        ],
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

export default async function JtiKursPage() {
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
    : "Pris avtales etter gruppe og opplegg";

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Kurs", path: "/kurs" },
          { name: "JTI-kurs", path: pagePath },
        ])}
      />
      <JsonLd data={createJsonLd(priceText)} />
      <Navbar variant="solid" />

      <PageHero
        image={heroImage}
        imageAlt="Tone Pernille Sivertsen holder kurs om JTI og teamutvikling"
        imagePosition="52% 30%"
        eyebrow="JTI-kurs og teamanalyse"
        title="Gjør forskjellene i teamet nyttige"
        intro="Et praktisk kurs for team som vil forstå preferanser, redusere friksjon og lage bedre avtaler for samarbeid. Tone Pernille leder gruppen trygt gjennom JTI, øvelser og refleksjon."
        primary={{ label: "Send forespørsel", href: "/kontakt?tjeneste=Foredrag/JTI" }}
        secondary={{ label: "Se kursopplegg", href: "#opplegg" }}
        asideOnMobile
        aside={
          <>
            <UsersRound className="h-8 w-8 text-teal" aria-hidden="true" />
            <p className="mt-5 font-space text-2xl font-bold text-brown">
              {priceText}
            </p>
            <p className="mt-3 font-inter text-sm leading-relaxed text-brown-mid">
              Varighet, nivå og forarbeid tilpasses gruppen. Kurset kan være
              kort, grundig eller del av en større bedriftsdag.
            </p>
            <dl className="mt-6 grid gap-4 border-t border-border pt-5">
              <div>
                <dt className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                  Passer for
                </dt>
                <dd className="mt-1 font-inter text-sm text-brown-mid">
                  Team, ledergrupper og bedrifter
                </dd>
              </div>
              <div>
                <dt className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                  Fasilitator
                </dt>
                <dd className="mt-1 font-inter text-sm text-brown-mid">
                  Tone Pernille Sivertsen
                </dd>
              </div>
            </dl>
          </>
        }
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Et kurs som går fra innsikt til handling
            </h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
              JTI er nyttig først når teamet bruker innsikten i hverdagen. Derfor
              handler kurset både om personlighetspreferanser og om konkrete
              situasjoner dere kjenner fra møter, beslutninger og samarbeid.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-teal" aria-hidden="true" />
                <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid">
                  {outcome}
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
              Slik jobber vi med gruppen
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courseSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-teal">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-space text-2xl font-bold text-brown">
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

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl bg-brown shadow-sm">
            <Image
              src="/images/tone-pernille-havsul.jpg"
              alt="Tone Pernille Sivertsen på Havsul i Arendals skjærgård"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/72 via-brown/12 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-md p-7 text-white md:p-9">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-sand">
                Tone Pernille
              </p>
              <p className="mt-3 font-space text-2xl font-bold">
                Erfaren fasilitator med JTI, coaching og gruppeprosesser.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
              Kurset kan være kompakt eller dyptgående
            </h2>
            <div className="mt-8 grid gap-4">
              {formats.map((format) => (
                <article
                  key={format.title}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm"
                >
                  <h3 className="font-space text-xl font-bold text-brown">
                    {format.title}
                  </h3>
                  <p className="mt-2 font-inter text-base leading-relaxed text-brown-mid">
                    {format.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt?tjeneste=Foredrag/JTI" className="gap-2">
                Send forespørsel
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="tel:+4799469957" variant="outline" className="gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ring Tone Pernille
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
              Ofte spurt om JTI-kurs
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
            <h2 className="font-space text-3xl font-bold md:text-5xl">
              Fortell om teamet, så foreslår Tone riktig JTI-opplegg.
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
