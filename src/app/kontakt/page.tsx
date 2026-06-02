import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt Wannado - Bestill opplevelse eller tur | Wannado",
  description:
    "Ta kontakt med Wannado for å bestille teambuilding, kajakkturer, seilturer, foredrag eller andre opplevelser i Arendal. Vi svarer innen 24 timer.",
  openGraph: {
    title: "Kontakt Wannado - Bestill opplevelse eller tur",
    description:
      "Ta kontakt med Wannado for å bestille opplevelser i Arendal. Vi svarer innen 24 timer.",
    images: ["/images/havsul.jpg"],
  },
};

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
    responseLabel: "Best for bedrifter og spesialopplegg",
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
    responseLabel: "Best for kajakk og seilturer",
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
  "Vi svarer normalt innen 24 timer med forslag, pris eller videre oppfølging.",
  "Ved grupper og spesialopplegg finjusterer vi opplegg, sted og tidsplan sammen.",
] as const;

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      <section className="pt-36 pb-14 md:pt-40 md:pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.24em] text-teal mb-4">
                Kontakt Wannado
              </p>
              <h1 className="font-space text-4xl md:text-6xl font-bold text-brown leading-tight mb-5">
                Få raskt tak i riktig person
              </h1>
              <p className="font-inter text-lg md:text-xl text-brown-mid leading-relaxed max-w-2xl">
                Send en forespørsel, ring direkte eller gå videre til
                booking-siden. Vi svarer normalt innen 24 timer og hjelper med
                alt fra små turer til store bedriftsopplegg.
              </p>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.18em] text-teal mb-3">
                Raskeste vei inn
              </p>
              <div className="space-y-3">
                {quickActions.map((action) =>
                  action.href.startsWith("/") ? (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="block rounded-2xl border border-border bg-warm-white px-4 py-4 transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5"
                    >
                      <p className="font-space text-lg font-bold text-brown">
                        {action.title}
                      </p>
                      <p className="font-inter text-sm text-brown-mid mt-1">
                        {action.description}
                      </p>
                      <p className="font-inter text-sm font-medium text-teal mt-2">
                        {action.label}
                      </p>
                    </Link>
                  ) : (
                    <a
                      key={action.title}
                      href={action.href}
                      className="block rounded-2xl border border-border bg-warm-white px-4 py-4 transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5"
                    >
                      <p className="font-space text-lg font-bold text-brown">
                        {action.title}
                      </p>
                      <p className="font-inter text-sm text-brown-mid mt-1">
                        {action.description}
                      </p>
                      <p className="font-inter text-sm font-medium text-teal mt-2">
                        {action.label}
                      </p>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-brown px-6 py-5 text-white">
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-sand/80 mb-2">
              Svartid
            </p>
            <p className="font-space text-2xl font-bold">Innen 24 timer</p>
          </div>
          <div className="rounded-2xl border border-border bg-white px-6 py-5">
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-teal mb-2">
              Best for grupper
            </p>
            <p className="font-space text-2xl font-bold text-brown">
              Teambuilding og foredrag
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white px-6 py-5">
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-teal mb-2">
              Best for turer
            </p>
            <p className="font-space text-2xl font-bold text-brown">
              Kajakk, kano og seiltur
            </p>
          </div>
        </div>
      </section>

      <section className="flex-grow pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-start">
            <div className="space-y-8">
              <div className="rounded-[30px] bg-white p-6 md:p-8 shadow-sm border border-border">
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
                    className="font-inter text-sm font-medium text-teal hover:text-brown transition-colors duration-200"
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
                        className="rounded-2xl bg-brown px-4 py-4 text-white transition-colors duration-200 hover:bg-[#5a4838]"
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
                        className="rounded-2xl border border-border bg-warm-white px-4 py-4 text-brown transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5"
                      >
                        <span className="block font-inter text-xs uppercase tracking-[0.18em] text-brown-muted mb-1">
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
                  className="inline-flex rounded-full bg-brown px-5 py-3 font-inter text-sm font-medium text-white transition-colors duration-200 hover:bg-[#5a4838]"
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
