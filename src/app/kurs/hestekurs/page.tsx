import Image from "next/image";
import {
  CheckCircle2,
  HeartHandshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

const pagePath = "/kurs/hestekurs" as const;
const heroImage = "/images/scraped/horses/hesteopplevelser-bilde.jpg";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "hestekurs",
    path: pagePath,
    fallback: {
      title: "Hestekurs og ridetrening Arendal | Wannado",
      description:
        "Hestekurs på Sørlandet for deg som vil lære om islandshest, trygg ridning, stell, kroppsspråk og samspill. Kurs legges opp etter nivå og gruppe.",
      image: heroImage,
      imageAlt: "Hestekurs med islandshester ved kysten på Sørlandet",
    },
  });
}

const courseOutcomes = [
  "Trygg innføring i hestens signaler, kroppsspråk og behov",
  "Grunnleggende stell, håndtering og rolig kontakt fra bakken",
  "Rideteknikk og balanse i et tempo som passer gruppen",
  "Refleksjon rundt samspill, tillit og tydelig kommunikasjon",
];

const courseFlow = [
  {
    title: "Møt hesten",
    text: "Vi starter på bakken med rolig kontakt, sikkerhet og litt om hvordan islandshester tenker og reagerer.",
    icon: ShieldCheck,
  },
  {
    title: "Lær med kroppen",
    text: "Du får kjenne hvordan pust, blikk, balanse og små signaler påvirker samarbeidet med hesten.",
    icon: HeartHandshake,
  },
  {
    title: "Ta det videre",
    text: "Kurset kan avsluttes med ridning, øvelser eller en større hesteopplevelse ute i naturen.",
    icon: Leaf,
  },
];

const audience = [
  "Nybegynnere som vil lære hest på en trygg måte",
  "Familier og små grupper som ønsker praktisk kurs",
  "Bedrifter som vil jobbe med samspill utenfor møterommet",
  "Erfarne ryttere som vil ha en rolig fagdag med islandshest",
];

const faqItems = [
  {
    question: "Passer hestekurs for nybegynnere?",
    answer:
      "Ja. Vi starter rolig og tilpasser øvelser, tempo og ridning etter erfaringen deres.",
  },
  {
    question: "Er dette det samme som ridetur?",
    answer:
      "Nei. Hestekurs handler mer om læring, trygg håndtering, stell, kroppsspråk og samspill. Ønsker dere først og fremst tur, passer hesteopplevelser-siden bedre.",
  },
  {
    question: "Kan kurset brukes til teambuilding?",
    answer:
      "Ja. Hester gjør kommunikasjon, tydelighet og tillit veldig konkret. Vi kan legge opp en kursdag for grupper som vil lære sammen.",
  },
  {
    question: "Hva koster hestekurs?",
    answer:
      "Pris avtales etter antall personer, varighet, sesong og opplegg. Send oss litt om gruppen, så lager vi forslag og pris helt uforpliktende.",
  },
];

const pageUrl = absoluteUrl(pagePath);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Hestekurs og ridetrening i Arendal",
      description:
        "Hestekurs med islandshest, trygg ridning, stell, kroppsspråk og samspill hos Wannado på Sørlandet.",
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
      name: "Hestekurs med islandshest",
      description:
        "Praktisk hestekurs for nybegynnere, grupper og bedrifter med fokus på trygg håndtering, stell, kroppsspråk, ridning og samspill.",
      url: pageUrl,
      image: absoluteUrl(heroImage),
      inLanguage: "nb-NO",
      provider: {
        "@id": `${absoluteUrl("/")}#organization`,
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

export const dynamic = "force-dynamic";

export default function HestekursPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Kurs", path: "/kurs" },
          { name: "Hestekurs", path: pagePath },
        ])}
      />
      <JsonLd data={jsonLd} />
      <Navbar variant="solid" />

      <PageHero
        image={heroImage}
        imageAlt="Hestekurs med islandshester ved kysten på Sørlandet"
        imagePosition="55% 42%"
        eyebrow="Hestekurs i Arendal"
        title="Lær hest med ro og trygghet"
        intro="Vi bruker islandshestene våre til praktisk læring om stell, kroppsspråk, ridning og samspill. Det blir nært, gøy og veldig konkret, rett og slett."
        primary={{ label: "Send forespørsel", href: "/kontakt?tjeneste=Hesteopplevelser" }}
        secondary={{ label: "Ring Tone Pernille", href: "tel:+4799469957" }}
        aside={
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-brown">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                  Kurs etter nivå
                </p>
                <p className="font-space text-2xl font-bold text-brown">
                  Fra bakken til salen
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["Trygg start", "for nybegynnere"],
                ["Islandshest", "rolig og stødig læring"],
                ["Etter avtale", "for grupper og bedrifter"],
              ].map(([value, label]) => (
                <div key={value} className="border-t border-border pt-4">
                  <p className="font-space text-2xl font-bold text-brown">
                    {value}
                  </p>
                  <p className="mt-1 font-inter text-sm text-brown-mid">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Et hestekurs for trygghet, mestring og samspill
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-brown-mid">
              Hestekurs hos Wannado handler om å lære med hele kroppen. Du får
              praktisk erfaring, god veiledning og tid til å forstå både hesten
              og deg selv litt bedre på kjøpet.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {courseOutcomes.map((point) => (
              <div key={point} className="border border-border bg-white p-5 shadow-sm">
                <CheckCircle2
                  className="mb-4 h-6 w-6 text-teal"
                  aria-hidden="true"
                />
                <p className="font-inter text-sm leading-relaxed text-brown-mid">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Slik kan kursdagen legges opp
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-brown-mid">
              Vi tilpasser etter alder, erfaring, vær og hva gruppen vil lære.
              Her er en typisk ramme.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courseFlow.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="border border-brown-muted/15 bg-cream p-6 shadow-sm md:p-8"
                >
                  <Icon
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1fr_420px] lg:items-start">
        <div className="relative min-h-[420px] overflow-hidden bg-brown">
          <Image
            src={heroImage}
            alt="Islandshester på kurs og ridetrening ved kysten på Sørlandet"
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover object-[55%_44%]"
          />
        </div>

        <div className="bg-brown p-6 text-white md:p-8">
          <div className="flex items-center gap-3">
            <UsersRound className="h-7 w-7 text-sand" aria-hidden="true" />
            <h2 className="font-space text-3xl font-bold">Passer fint for</h2>
          </div>
          <ul className="mt-7 space-y-4">
            {audience.map((item) => (
              <li key={item} className="flex gap-3 font-inter text-white/82">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-sand"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border border-white/12 bg-brown-mid p-5 text-white">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-sand" aria-hidden="true" />
              <p className="font-inter text-sm leading-relaxed text-white/78">
                Oppmøte, varighet og innhold avtales etter gruppe og sesong.
                Vi sier tydelig fra hvis vær eller forhold tilsier en annen
                løsning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brown py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-space text-3xl font-bold leading-tight md:text-5xl">
                Lurer du på om hestekurs passer?
              </h2>
              <p className="mt-5 font-inter text-lg leading-relaxed text-white/76">
                Send oss litt om hvem som skal være med og hva dere ønsker å
                lære. Så finner vi en trygg og gøy ramme sammen.
              </p>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-space text-xl font-bold text-white">
                    {item.question}
                    <span className="text-sand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 font-inter text-sm leading-relaxed text-white/72">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-10 sm:flex-row">
            <Button href="/kontakt?tjeneste=Hesteopplevelser" variant="sand">
              Send forespørsel
            </Button>
            <Button href="/opplevelser/hesteopplevelser" variant="outline-light">
              Se hesteopplevelser
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
