import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/sections/PageHero";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kontakt Wannado - Bestill opplevelse eller tur | Wannado",
  description:
    "Ta kontakt med Wannado for å bestille teambuilding, kajakkturer, seilturer, foredrag eller andre opplevelser i Arendal. Vi svarer så fort vi kan.",
  path: "/kontakt",
  image: "/images/havsul.jpg",
  imageAlt: "Kontakt Wannado for opplevelser i Arendal",
});

const contacts = [
  {
    name: "Tone Pernille Sivertsen",
    role: "Teambuilding, foredrag og skreddersydde opplevelser",
    summary:
      "Tone hjelper med bedriftsarrangementer, gavekort og opplegg som trenger tydelig planlegging og tilpasning.",
    phone: "+47 99 46 99 57",
    phoneHref: "tel:+4799469957",
    email: "tp@wannado.no",
    emailHref: "mailto:tp@wannado.no",
    image: "/images/tp-typeteori.jpg",
    imageAlt: "Tone Pernille Sivertsen",
    responseLabel: "Passer best for bedrifter og spesialopplegg",
  },
  {
    name: "Roar Laugerud",
    role: "Kajakk, kano og seilturer",
    summary:
      "Roar svarer på forespørsler om kajakkurs, utleie, padleturer og opplevelser på sjøen.",
    phone: "+47 94 82 67 10",
    phoneHref: "tel:+4794826710",
    email: "roar@wannado.no",
    emailHref: "mailto:roar@wannado.no",
    image: "/images/roar-laugerud-havsul.jpg",
    imageAlt: "Roar Laugerud",
    responseLabel: "Passer best for kajakk og seilturer",
  },
] as const;

const meetingPoints = [
  {
    label: "Kajakkurs og turer",
    location: "Oppmøte Skarestrand, 4812 Kongshavn",
    note: "Roar sender praktisk info om parkering, utstyr og starttidspunkt.",
  },
  {
    label: "Båtturer",
    location: "Oppmøte Pollen i Arendal eller annet avtalt sted",
    note: "For charter og grupper avtaler vi avgangssted direkte med dere.",
  },
] as const;

const quickActions = [
  {
    title: "Ring Tone",
    description: "Bedrift, gavekort eller skreddersydd opplegg",
    href: "tel:+4799469957",
    label: "+47 99 46 99 57",
  },
  {
    title: "Ring Roar",
    description: "Kajakkurs, turer, kano eller seiltur",
    href: "tel:+4794826710",
    label: "+47 94 82 67 10",
  },
  {
    title: "Gå til booking",
    description: "Se tilbudene og send en mer konkret forespørsel",
    href: "/booking",
    label: "Åpen bookingside",
  },
] as const;

const practicalSteps = [
  "Fortell hva dere vil oppleve, hvor mange dere er og ønsket dato.",
  "Vi svarer så fort vi kan med forslag, pris eller videre oppfølging.",
  "Ved grupper og spesialopplegg finjusterer vi opplegg, sted og tidsplan sammen.",
] as const;

export default function KontaktPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Kontakt", path: "/kontakt" }])}
      />
      <Navbar />

      <PageHero
        image="/images/tone-pernille-havsul.jpg"
        imageAlt="Tone Pernille Sivertsen og Roar Laugerud på Havsul i Arendal"
        imagePosition="52% 50%"
        eyebrow="Kontakt Wannado"
        title="Få raskt tak i riktig person"
        intro="Send en forespørsel, ring direkte eller gå videre til booking. Vi svarer så fort vi kan og hjelper med alt fra små turer til store bedriftsopplegg."
        primary={{ label: "Send forespørsel", href: "#kontakt-skjema" }}
        secondary={{ label: "Åpne booking", href: "/booking" }}
        facts={[
          ["Tone", "bedrift og foredrag"],
          ["Roar", "kajakk og seil"],
        ]}
        aside={
          <>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-teal">
              Raskeste vei inn
            </p>
            <div className="grid gap-3">
              {quickActions.map((action) => {
                const content = (
                  <>
                    <p className="font-display text-lg font-bold text-brown">
                      {action.title}
                    </p>
                    <p className="mt-1 font-body text-sm leading-6 text-brown-mid">
                      {action.description}
                    </p>
                    <p className="mt-2 font-body text-sm font-semibold text-teal">
                      {action.label}
                    </p>
                  </>
                );
                const classes =
                  "block rounded-control border border-border bg-white px-4 py-4 transition-colors duration-200 hover:border-teal/40";
                return action.href.startsWith("/") ? (
                  <Link key={action.title} href={action.href} className={classes}>
                    {content}
                  </Link>
                ) : (
                  <a key={action.title} href={action.href} className={classes}>
                    {content}
                  </a>
                );
              })}
            </div>
          </>
        }
      />

      <section className="flex-grow pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-start">
            <div className="space-y-8">
              <div
                id="kontakt-skjema"
                className="rounded-[30px] bg-white p-6 md:p-8 shadow-sm border border-border"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-5">
                  <div>
                    <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal mb-2">
                      Send forespørsel
                    </p>
                    <h2 className="font-space font-bold text-2xl md:text-3xl text-brown">
                      Fortell hva dere trenger
                    </h2>
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex min-h-11 items-center font-inter text-sm font-medium text-teal transition-colors duration-200 hover:text-brown"
                  >
                    Se bookingvalg
                  </Link>
                </div>
                <p className="font-inter text-sm md:text-base text-brown-mid leading-relaxed mb-6">
                  Jo mer konkret du er på dato, antall deltakere og ønsket
                  opplevelse, desto raskere kan vi gi et godt svar.
                </p>
                <Suspense
                  fallback={
                    <div className="bg-cream rounded-2xl p-6 md:p-8 h-[500px] animate-pulse" />
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>

              <div className="rounded-[30px] border border-border bg-warm-white p-6 md:p-8">
                <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal mb-3">
                  Slik fungerer det
                </p>
                <div className="space-y-4">
                  {practicalSteps.map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brown text-sm font-space font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="font-inter text-sm md:text-base text-brown-mid leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal mb-2">
                  Kontaktpersoner
                </p>
                <h2 className="font-space font-bold text-2xl md:text-3xl text-brown">
                  Ring direkte hvis det haster
                </h2>
              </div>

              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="overflow-hidden rounded-[30px] border border-border bg-white shadow-sm"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={contact.image}
                      alt={contact.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-sand/80 mb-2">
                        {contact.responseLabel}
                      </p>
                      <h3 className="font-space font-bold text-2xl">
                        {contact.name}
                      </h3>
                      <p className="font-inter text-sm text-white/80 mt-1">
                        {contact.role}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-inter text-sm md:text-base text-brown-mid leading-relaxed mb-5">
                      {contact.summary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <a
                        href={contact.phoneHref}
                        className="rounded-2xl bg-brown px-4 py-4 text-white transition-colors duration-200 hover:bg-brown-hover"
                      >
                        <span className="block font-inter text-xs uppercase tracking-[0.18em] text-sand/75 mb-1">
                          Ring direkte
                        </span>
                        <span className="font-space text-lg font-bold">
                          {contact.phone}
                        </span>
                      </a>
                      <a
                        href={contact.emailHref}
                        aria-label={`Send e-post til ${contact.email}`}
                        className="rounded-2xl border border-border bg-warm-white px-4 py-4 text-brown transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5"
                      >
                        <span
                          aria-hidden="true"
                          className="block font-inter text-xs uppercase tracking-[0.18em] text-brown-muted mb-1"
                        >
                          Send e-post
                        </span>
                        <span className="font-inter text-sm font-medium text-teal break-all">
                          {contact.email}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
                  <h3 className="font-space font-bold text-xl text-brown mb-4">
                    Oppmøtesteder
                  </h3>
                  <div className="space-y-4">
                    {meetingPoints.map((point) => (
                      <div
                        key={point.label}
                        className="rounded-2xl bg-warm-white px-4 py-4"
                      >
                        <p className="font-space text-lg font-bold text-brown">
                          {point.label}
                        </p>
                        <p className="font-inter text-sm text-brown-mid mt-1">
                          {point.location}
                        </p>
                        <p className="font-inter text-xs text-brown-muted mt-2 leading-relaxed">
                          {point.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] overflow-hidden border border-border bg-white shadow-sm">
                  <div className="p-6 pb-4">
                    <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal mb-2">
                      Finn oss
                    </p>
                    <h3 className="font-space font-bold text-xl text-brown">
                      Skarestrand 11, 4812 Kongshavn
                    </h3>
                    <p className="font-inter text-sm text-brown-mid mt-2 leading-relaxed">
                      Dette er utgangspunktet for kajakkurs og flere av
                      aktivitetene våre. Ved andre oppmøtesteder avtaler vi det
                      direkte i dialogen.
                    </p>
                  </div>
                  <div className="px-6 pb-6">
                    <iframe
                      src="https://www.google.com/maps?q=Skarestrand+11,+4812+Kongshavn,+Norway&output=embed"
                      className="w-full h-72 rounded-2xl"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Wannado, Skarestrand 11, 4812 Kongshavn"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] bg-teal/10 p-6">
                <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-teal mb-2">
                  Trenger du rask avklaring?
                </p>
                <p className="font-inter text-sm md:text-base text-brown-mid leading-relaxed mb-4">
                  Hvis du allerede vet hva du vil bestille, er booking-siden den
                  raskeste veien videre. Hvis du er usikker, bruk skjemaet eller
                  ring direkte.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex rounded-full bg-brown px-5 py-3 font-inter text-sm font-medium text-white transition-colors duration-200 hover:bg-brown-hover"
                >
                  Gå til booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
