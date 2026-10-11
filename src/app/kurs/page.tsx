import {
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Compass,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import ServiceRow from "@/components/ui/ServiceRow";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kurs i kajakk, ridning og JTI i Arendal | Wannado",
  description:
    "Lær kajakk, ridning og personlighetsutvikling med erfarne instruktører i Arendal. Våttkortkurs, avansert kajakk, hestekurs og JTI-kurs på Sørlandet.",
  path: "/kurs",
  image: "/images/kajakk-kurs-bilde.jpg",
  imageAlt: "Kajakkurs med Wannado i Arendal",
});

const courses = [
  {
    title: "Kajakkurs",
    description:
      "Lær kajakk fra grunnen av med erfarne instruktører. Få våttkort og bli trygg på vannet.",
    image: "/images/kajakk-kurs-bilde.jpg",
    price: "Fra 1 490 kr",
    href: "/kurs/kajakkurs",
  },
  {
    title: "Avanserte kajakkurs",
    description:
      "For deg som allerede padler og vil ta steget videre. Rulle, surfing og ekspedisjonsteknikk.",
    image: "/images/gronland-kajakk-3.jpg",
    price: "Fra 1 990 kr",
    href: "/kurs/kajakkurs#kurs",
  },
  {
    title: "Hestekurs",
    description:
      "Bli kjent med islandshestene våre og lær grunnleggende rideteknikk i vakker natur.",
    image: "/images/scraped/horses/hesteopplevelser-bilde.jpg",
    price: "Fra 1 290 kr",
    href: "/kurs/hestekurs",
  },
  {
    title: "Jungs Typeindeks (JTI)",
    description:
      "Forstå deg selv og andre bedre med Jungs Typeindeks. Perfekt for team og ledere.",
    image: "/images/tp-typeteori.jpg",
    price: "Ta kontakt for pris",
    href: "/kurs/jti",
  },
];

const courseHighlights = [
  "Små grupper med tett oppfølging",
  "Kurs for nybegynnere, viderekomne og team",
  "Praktisk læring ute i naturen",
];

const practicalInfo = [
  {
    title: "Hva bør du ta med?",
    description:
      "Klær etter vær, solkrem, drikkeflaske og godt humør. Ved kajakkurs stiller vi med alt nødvendig utstyr, inkludert redningsvest og spruttrekk.",
    icon: BookOpenCheck,
  },
  {
    title: "Hvordan fungerer booking?",
    description:
      "Du velger kurs og dato, fyller ut bestillingsskjemaet og mottar en bekreftelse på e-post. Betaling skjer ved oppmøte eller på forhånd.",
    icon: CalendarCheck,
  },
  {
    title: "Gruppestørrelser",
    description:
      "Vi tilpasser gruppene etter erfaring og ønsker. Maks fire deltakere per instruktør sikrer god oppfølging for alle.",
    icon: UsersRound,
  },
];

const courseSchema = courses.map((course, index) => ({
  "@type": "Course",
  name: course.title,
  description: course.description,
  provider: {
    "@type": "Organization",
    name: "Wannado",
    sameAs: absoluteUrl("/"),
  },
  url: absoluteUrl(course.href),
  image: absoluteUrl(course.image),
  educationalLevel: index === 0 ? "Beginner" : "Intermediate",
  inLanguage: "nb-NO",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": courseSchema,
};

export default function KursPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Kurs", path: "/kurs" }])}
      />
      <JsonLd data={jsonLd} />
      <Navbar variant="solid" />

      {/* Hero */}
      <PageHero
        image="/images/kajakk-kurs-bilde.jpg"
        imageAlt="Kajakkurs med Wannado i Arendal"
        imagePosition="54% 42%"
        eyebrow="Kurs og opplæring"
        title="Lær ute i naturen"
        intro="Kajakk, hest, team og personlig utvikling med erfarne instruktører i Arendal. Velg kurset som passer nivået ditt, så legger vi opp en trygg og praktisk opplevelse."
        primary={{ label: "Bestill kurs", href: "/booking" }}
        secondary={{ label: "Se kursene", href: "#kursoversikt" }}
        facts={[["Sørlandet", "naturbasert læring"]]}
        aside={
          <>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-brown">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-inter text-xs font-semibold text-teal">
                  Riktig nivå
                </p>
                <p className="font-space text-xl font-bold text-brown">
                  Dette får du
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {courseHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 font-inter text-sm leading-relaxed text-brown-mid"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-teal"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* Course Cards */}
      <section id="kursoversikt" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
              Kurs som bygger trygghet, mestring og gode opplevelser
            </h2>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {courses.map((course, index) => (
              <ServiceRow
                key={course.title}
                title={course.title}
                text={course.description}
                price={course.price}
                image={course.image}
                imageAlt={course.title}
                href={course.href}
                priority={index < 4}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
                Praktisk informasjon uten overraskelser
              </h2>
              <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid">
                Vi sender tydelig beskjed om oppmøtested, utstyr og eventuelle
                værtilpasninger før kursstart. Målet er at du skal møte forberedt,
                trygg og klar for å lære.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5">
            {practicalInfo.map((info) => (
              <div
                key={info.title}
                className="grid gap-4 rounded-card border border-border bg-white p-6 sm:grid-cols-[auto,1fr]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-teal">
                  <info.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-space text-xl font-bold text-brown mb-2">
                    {info.title}
                  </h3>
                  <p className="font-inter text-brown-mid leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brown py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-space text-3xl font-bold md:text-5xl">
              Book kurs eller spør oss om riktig nivå.
            </h2>
            <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-white/82">
              Fortell oss hva du vil lære, hvem som skal være med og hvilken dato som
              passer. Vi hjelper deg å velge riktig opplegg.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button href="/booking" variant="sand">
              Bestill kurs
            </Button>
            <Button href="/kontakt" variant="outline-light">
              Send forespørsel
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
