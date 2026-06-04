import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import CheckinBookingEmbed from "@/components/booking/CheckinBookingEmbed";
import ContactForm from "@/components/ui/ContactForm";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Booking av opplevelser i Arendal | Wannado",
  description:
    "Bestill seiltur, kajakktur, kajakkurs, teambuilding, foredrag eller gavekort hos Wannado. Meld deg på aktuelle aktiviteter eller send forespørsel.",
  path: "/booking",
  image: "/images/havsul.jpg",
  imageAlt: "Listerskøyta Havsul i Arendals skjærgård",
});

const bookingPaths = [
  {
    title: "Seiltur med Havsul",
    description:
      "Historisk seilas i Arendals skjærgård for grupper, bedrifter og private gjester.",
    price: "Fra kr 350,- per person",
    href: "/seilturer",
    inquiryHref: "/kontakt?tjeneste=Seilturer",
    image: "/images/scraped/sailing/baat-fb-havsul.jpg",
    imageAlt: "Listerskøyta Havsul i Arendals skjærgård",
    badge: "Seiltur",
  },
  {
    title: "Kajakkturer",
    description:
      "Guidede turer i skjærgården med trygg ramme, naturformidling og lokale guider.",
    price: "Pris etter tur og gruppe",
    href: "/kajakkturer",
    inquiryHref: "/kontakt?tjeneste=Kajakktur",
    image: "/images/roar-laugerud-havsul.jpg",
    imageAlt: "Roar Laugerud klar for aktivitet ved sjøkanten",
    badge: "Kajakk",
  },
  {
    title: "Kajakkurs",
    description:
      "Kurs for deg som vil bli tryggere i kajakk og bygge gode vaner fra start.",
    price: "Kontakt oss for neste kursdato",
    href: "/kurs",
    inquiryHref: "/kontakt?tjeneste=Kajakkurs",
    image: "/images/kajakk-kurs-bilde.jpg",
    imageAlt: "Kajakkurs med Wannado",
    badge: "Kurs",
  },
  {
    title: "Teambuilding",
    description:
      "Opplegg for bedrifter som vil samle folk rundt energi, samarbeid og felles opplevelser.",
    price: "Fra kr 4 500,-",
    href: "/teambuilding",
    inquiryHref: "/kontakt?tjeneste=Teambuilding",
    image: "/images/tp-typeteori.jpg",
    imageAlt: "Tone Pernille Sivertsen under foredrag eller teambuilding",
    badge: "Bedrift",
  },
  {
    title: "Foredrag og JTI",
    description:
      "Faglig innhold med personlighetstyper, samspill og konkrete perspektiver for grupper.",
    price: "Skreddersys etter behov",
    href: "/foredrag",
    inquiryHref: "/kontakt?tjeneste=Foredrag/JTI",
    image: "/images/tp-typeteori.jpg",
    imageAlt: "Tone Pernille Sivertsen holder foredrag",
    badge: "Foredrag",
  },
  {
    title: "Gavekort",
    description:
      "Gi bort en opplevelse på vannet eller et opplegg tilpasset mottakeren og anledningen.",
    price: "Vi lager personlig gavekort",
    href: "/gavekort",
    inquiryHref: "/gavekort#bestill-gavekort",
    image: "/images/P7270038.jpg",
    imageAlt: "Opplevelsesgave fra Wannado",
    badge: "Gavekort",
  },
] as const;

const bookingSteps = [
  {
    title: "Velg opplevelse",
    description:
      "Finn tjenesten som passer best, eller send en åpen forespørsel hvis dere vil ha hjelp til å velge.",
  },
  {
    title: "Send dato og antall",
    description:
      "Legg inn ønsket dato, antall deltakere og eventuelle behov i skjemaet. Da kan vi svare presist.",
  },
  {
    title: "Få forslag og pris",
    description:
      "Vi svarer normalt innen 24 timer med tilgjengelighet, pris og forslag til gjennomføring.",
  },
];

const contacts = [
  {
    name: "Tone Pernille Sivertsen",
    role: "Teambuilding, foredrag, gavekort og spesialtilpasninger",
    email: "tp@wannado.no",
    emailHref: "mailto:tp@wannado.no",
    phone: "+47 99 46 99 57",
    phoneHref: "tel:+4799469957",
    image: "/images/tp-typeteori.jpg",
  },
  {
    name: "Roar Laugerud",
    role: "Kajakk, kano og seilturer",
    email: "roar@wannado.no",
    emailHref: "mailto:roar@wannado.no",
    phone: "+47 94 82 67 10",
    phoneHref: "tel:+4794826710",
    image: "/images/roar-laugerud-havsul.jpg",
  },
] as const;

const practicalNotes = [
  {
    title: "Svar innen 24 timer",
    description:
      "Vi svarer som regel samme dag på hverdager, og senest innen ett døgn.",
  },
  {
    title: "Skreddersys etter gruppe",
    description:
      "Bedriftsopplegg, private grupper og gavekort løses best når vi vet litt om målene deres.",
  },
  {
    title: "Arendal og skjærgården",
    description:
      "De fleste opplevelsene har utgangspunkt i Arendal, Kongshavn eller avtalt oppmøtested.",
  },
] as const;

const faqItems = [
  {
    question: "Hva bør vi skrive i bookingforespørselen?",
    answer:
      "Ta med ønsket opplevelse, cirka antall deltakere, dato eller tidsrom og eventuelle hensyn vi bør kjenne til. For teambuilding er det nyttig å vite mål for dagen, varighet og om dere trenger mat, lokale eller transportforslag.",
  },
  {
    question: "Kan dere tilpasse opplegg for bedrifter og private grupper?",
    answer:
      "Ja. Vi tilpasser innhold, varighet og intensitet etter gruppen. Det gjelder spesielt teambuilding, gavekort, lukkede turer og kombinasjoner av aktivitet og faglig innhold.",
  },
  {
    question: "Må vi booke lang tid i forveien?",
    answer:
      "Populære datoer fylles raskt, spesielt i sommerhalvåret. Send forespørsel så tidlig som mulig, men ta kontakt selv om det haster. Vi sjekker alltid tilgjengelighet.",
  },
] as const;

const bookingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Booking av opplevelser i Arendal",
      url: absoluteUrl("/booking"),
      description:
        "Bestill seiltur, kajakktur, kajakkurs, teambuilding, foredrag eller gavekort hos Wannado.",
      isPartOf: {
        "@type": "WebSite",
        name: "Wannado",
        url: absoluteUrl("/"),
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
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Booking", path: "/booking" }])}
      />
      <JsonLd data={bookingJsonLd} />
      <Navbar />

      <section className="relative isolate overflow-hidden bg-brown">
        <div className="absolute inset-0">
          <Image
            src="/images/havsul.jpg"
            alt="Listerskøyta Havsul på vei gjennom Arendals skjærgård"
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(54,43,34,0.92),rgba(54,43,34,0.72)_45%,rgba(54,43,34,0.45))]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-40 md:pb-24 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 font-inter text-sm font-semibold uppercase tracking-[0.3em] text-sand">
              Booking og forespørsler
            </p>
            <h1 className="font-space text-4xl font-bold leading-tight text-white md:text-6xl">
              Bestill en opplevelse som faktisk passer gruppen din
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-white/82 md:text-xl">
              Seilturer, kajakk, kurs, teambuilding, foredrag og gavekort.
              Send en forespørsel med dato og antall, så svarer vi med forslag,
              pris og neste steg.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#checkin-booking"
                className="inline-flex items-center justify-center rounded-full bg-sand px-6 py-3 font-inter text-sm font-semibold text-brown transition-transform duration-200 hover:-translate-y-0.5"
              >
                Se ledige aktiviteter
              </a>
              <a
                href="#booking-form"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Send forespørsel
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:grid-cols-3 lg:min-w-[360px] lg:grid-cols-1">
            {practicalNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-2xl border border-white/10 bg-white/8 p-4"
              >
                <p className="font-space text-lg font-bold text-white">
                  {note.title}
                </p>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/75">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="checkin-booking"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20"
      >
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            Påmelding
          </p>
          <h2 className="font-space text-3xl font-bold text-brown md:text-4xl">
            Aktuelle aktiviteter fra bookingkalenderen
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
            Faste kurs og åpne aktiviteter hentes fra Wannado sin Checkin-kalender.
            For gavekort, bedrift, lukkede grupper og spesialtilpasninger bruker du
            forespørselsskjemaet lenger ned.
          </p>
        </div>

        <CheckinBookingEmbed />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
            Raske innganger
          </p>
          <h2 className="font-space text-3xl font-bold text-brown md:text-4xl">
            Velg det du vil booke
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
            Gå rett til riktig side for mer informasjon, eller hopp direkte til
            forespørsel hvis du allerede vet hva du vil ha.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookingPaths.map((path) => (
            <article
              key={path.title}
              className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-brown">
                  {path.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-space text-2xl font-bold text-brown">
                  {path.title}
                </h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-brown-mid">
                  {path.description}
                </p>
                <p className="mt-4 font-space text-lg font-bold text-teal">
                  {path.price}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={path.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brown/10 px-4 py-2.5 font-inter text-sm font-semibold text-brown transition-colors duration-200 hover:bg-brown hover:text-white"
                  >
                    Les mer
                  </Link>
                  <Link
                    href={path.inquiryHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal px-4 py-2.5 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d6f6a]"
                  >
                    Send forespørsel
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
              Slik booker du
            </p>
            <h2 className="font-space text-3xl font-bold text-brown md:text-4xl">
              Enkelt for deg, presist for oss
            </h2>
            <div className="mt-8 space-y-4">
              {bookingSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-[24px] border border-border bg-white p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brown font-space text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-space text-xl font-bold text-brown">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-brown-mid md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-brown/10 bg-brown p-8 text-white shadow-sm">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-sand">
              Praktisk
            </p>
            <h3 className="mt-3 font-space text-2xl font-bold">
              Hva bør du sende inn?
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4 font-inter text-sm leading-relaxed text-white/80">
                Ønsket opplevelse eller type arrangement
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4 font-inter text-sm leading-relaxed text-white/80">
                Antall personer og ønsket dato eller tidsrom
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4 font-inter text-sm leading-relaxed text-white/80">
                Eventuelle hensyn rundt fysisk nivå, erfaring eller logistikk
              </li>
            </ul>
            <p className="mt-6 font-inter text-sm leading-relaxed text-white/72">
              Jo mer konkret forespørselen er, desto raskere kan vi gi et
              relevant forslag.
            </p>
          </div>
        </div>
      </section>

      <section
        id="booking-form"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-border bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
              Send forespørsel
            </p>
            <h2 className="font-space text-3xl font-bold text-brown">
              Fortell oss hva du ser for deg
            </h2>
            <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-brown-mid">
              Skjemaet passer for både enkle forespørsler og mer komplekse
              opplegg. For bedrifter er det smart å legge inn mål, sted og
              ønsket varighet i meldingsfeltet.
            </p>
            <div className="mt-8">
              <Suspense
                fallback={
                  <div className="h-[520px] animate-pulse rounded-2xl bg-cream" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
                Direktekontakt
              </p>
              <h2 className="mt-3 font-space text-3xl font-bold text-brown">
                Ring eller send e-post hvis det haster
              </h2>
              <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid">
                Noen ganger er en kort avklaring raskere enn frem og tilbake.
                Da er det bedre at du tar direkte kontakt med riktig person.
              </p>
            </div>

            {contacts.map((contact) => (
              <article
                key={contact.name}
                className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm"
              >
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative hidden min-h-[220px] md:block">
                    <Image
                      src={contact.image}
                      alt={contact.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-space text-2xl font-bold text-brown">
                      {contact.name}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-brown-mid">
                      {contact.role}
                    </p>
                    <div className="mt-6 space-y-3">
                      <a
                        href={contact.phoneHref}
                        className="flex min-h-11 items-center font-inter text-sm font-semibold text-teal transition-colors duration-200 hover:text-brown"
                      >
                        {contact.phone}
                      </a>
                      <a
                        href={contact.emailHref}
                        className="flex min-h-11 items-center font-inter text-sm font-semibold text-teal transition-colors duration-200 hover:text-brown"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-[28px] border border-teal/20 bg-teal/10 p-6">
              <p className="font-space text-xl font-bold text-brown">
                Tilgjengelighet og oppmøte
              </p>
              <p className="mt-3 font-inter text-sm leading-relaxed text-brown-mid">
                Seilturer og kajakkopplevelser har som regel utgangspunkt i
                Arendal eller Kongshavn. Bedriftsopplegg og foredrag kan
                tilpasses andre lokasjoner etter avtale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal">
              Ofte spurt
            </p>
            <h2 className="font-space text-3xl font-bold text-brown md:text-4xl">
              Praktiske svar for booking
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[28px] border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="font-space text-xl font-bold text-brown">
                  {item.question}
                </h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-brown-mid md:text-base">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
