import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Compass,
  UsersRound,
  Waves,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
    badge: "Populært",
    badgeColor: "bg-teal",
    price: "Fra 1 490 kr",
    href: "/kurs/kajakkurs",
    detail: "Grunnkurs, teknikk og trygg padling langs skjærgården.",
  },
  {
    title: "Avanserte kajakkurs",
    description:
      "For deg som allerede padler og vil ta steget videre. Rulle, surfing og ekspedisjonsteknikk.",
    image: "/images/gronland-kajakk-3.jpg",
    badge: "Videregående",
    badgeColor: "bg-brown",
    price: "Fra 1 990 kr",
    href: "/kurs/kajakkurs#kurs",
    detail: "For deg som vil mestre mer krevende forhold og turplanlegging.",
  },
  {
    title: "Hestekurs",
    description:
      "Bli kjent med islandshestene våre og lær grunnleggende rideteknikk i vakker natur.",
    image: "/images/20230910_125202-1280x960.jpg",
    badge: "Natur",
    badgeColor: "bg-brown-mid",
    price: "Fra 1 290 kr",
    href: "/kurs/hestekurs",
    detail: "Rolig læring, nærhet til dyrene og praktisk mestring ute.",
  },
  {
    title: "Jungs Typeindeks (JTI)",
    description:
      "Forstå deg selv og andre bedre med Jungs Typeindeks. Perfekt for team og ledere.",
    image: "/images/tp-typeteori.jpg",
    badge: "Bedrift",
    badgeColor: "bg-teal",
    price: "Ta kontakt for pris",
    href: "/kurs/jti",
    detail: "Et konkret verktøy for samarbeid, ledelse og bedre kommunikasjon.",
  },
];

const heroStats = [
  { value: "4", label: "kursretninger" },
  { value: "1:4", label: "maks instruktørforhold" },
  { value: "Sørlandet", label: "naturbasert læring" },
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
      "Du velger kurs og dato, fyller ut bestillingsskjemaet og mottar en bekreftelse på e-post innen 24 timer. Betaling skjer ved oppmøte eller på forhånd.",
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
    category: course.badge,
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
      <section className="relative isolate min-h-[86svh] overflow-hidden bg-brown text-white">
        <Image
          src="/images/kajakk-kurs-bilde.jpg"
          alt="Kajakkurs med Wannado i Arendal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[54%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/45 via-brown/70 to-brown" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-cream" />

        <div className="relative mx-auto flex min-h-[86svh] max-w-7xl flex-col justify-end px-6 pb-12 pt-32 md:pb-16 lg:pt-40">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <Waves className="h-4 w-4 text-sand" aria-hidden="true" />
                Kurs og opplæring
              </div>
              <h1 className="font-space text-5xl font-bold leading-[0.98] text-white md:text-7xl">
                Lær ute i naturen
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/88 md:text-xl">
                Kajakk, hest, team og personlig utvikling med erfarne instruktører i
                Arendal. Velg kurset som passer nivået ditt, så legger vi opp en trygg
                og praktisk opplevelse.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/booking"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-6 py-3 font-inter text-sm font-bold text-brown shadow-sm transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                >
                  Finn kursdato
                </Link>
                <Link
                  href="#kursoversikt"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 font-inter text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Se kursene
                </Link>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-white/20 bg-white/14 p-5 shadow-2xl backdrop-blur lg:block">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-brown">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                    Riktig nivå
                  </p>
                  <p className="font-space text-xl font-bold text-white">
                    Dette får du
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {courseHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 font-inter text-sm leading-relaxed text-white/86"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-none text-sand"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/18 bg-white/12 px-5 py-4 backdrop-blur"
              >
                <p className="font-space text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-[0.12em] text-white/72">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section id="kursoversikt" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal">
              Velg kurs
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
              Kurs som bygger trygghet, mestring og gode opplevelser
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Link
                key={course.title}
                href={course.href}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    priority={index < 4}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block font-inter text-xs font-semibold uppercase tracking-[0.15em] text-white px-3 py-1.5 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-space text-2xl font-bold text-brown mb-3 group-hover:text-teal transition-colors">
                    {course.title}
                  </h3>
                  <p className="font-inter text-brown-mid leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <p className="mb-5 font-inter text-sm font-medium leading-relaxed text-brown/78">
                    {course.detail}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-inter text-sm font-semibold text-brown">
                      {course.price}
                    </span>
                    <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-teal">
                      Les mer
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal">
                Før kursdagen
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-5xl">
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
                className="grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm sm:grid-cols-[auto,1fr]"
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
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-sand">
              Klar for neste steg?
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold md:text-5xl">
              Book kurs eller spør oss om riktig nivå.
            </h2>
            <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-white/82">
              Fortell oss hva du vil lære, hvem som skal være med og hvilken dato som
              passer. Vi hjelper deg å velge riktig opplegg.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-7 py-3 font-inter text-sm font-bold text-brown transition-colors hover:bg-[#f4c96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            >
              Gå til booking
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Kontakt oss
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
