import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Bedriftsarrangement og Teambuilding | Wannado",
  description:
    "Teambuilding og bedriftsarrangement i Arendal med natur som arena. Kajakk, seiltur med Havsul, JTI og foredrag, skreddersydd for deres mål og kultur.",
  path: "/bedrift",
  image: "/images/havsul.jpg",
  imageAlt: "Bedriftsarrangement med seiltur i Arendals skjærgård",
});

const benefits = [
  {
    title: "15+ års erfaring",
    description: "Over 15 år med bedriftsarrangementer på Sørlandet. Vi vet hva som skaper engasjement og samhold.",
  },
  {
    title: "Unik kombinasjon",
    description: "Kajakk, seiltur med Havsul og faglig innhold i én og samme opplevelse. Alt fra én leverandør.",
  },
  {
    title: "Skreddersyr etter deres mål",
    description: "Vi tilpasser opplegget etter gruppens størrelse, målsettinger og kultur. Ingen standardpakker.",
  },
  {
    title: "Trygt og profesjonelt",
    description: "Sertifiserte guider, godkjent utstyr og grundig risikovurdering. Dere kan slappe av og nyte opplevelsen.",
  },
];

const packages = [
  {
    name: "Basispakke",
    description: "Perfekt for mindre grupper som vil oppleve noe utenom det vanlige. Halvdag med kajakk eller seiltur, erfarne guider og alt utstyr inkludert.",
    features: [
      "Halvdag (3-4 timer)",
      "Kajakk eller seiltur med Havsul",
      "Erfarne guider",
      "Alt utstyr inkludert",
      "Trygghetsbriefing",
    ],
    cta: "Send forespørsel",
    href: "/kontakt?tjeneste=Basispakke",
    highlighted: false,
  },
  {
    name: "Komplett dag",
    description: "En heldagsopplevelse som kombinerer aktivitet med faglig innhold. JTI-workshop, lunch og refleksjon for et sterkere team.",
    features: [
      "Heldag (6-8 timer)",
      "Aktivitet etter valg",
      "JTI-personlighetsanalyse",
      "Lunch og drikke",
      "Refleksjon og oppsummering",
      "Oppfølging etter arrangement",
    ],
    cta: "Send forespørsel",
    href: "/kontakt?tjeneste=Komplett dag",
    highlighted: true,
  },
  {
    name: "Premium opplevelse",
    description: "Den komplette bedriftsopplevelsen. Alt inkludert: transport, catering og etterspill. Vi tar oss av alt.",
    features: [
      "Hel dag eller flere dager",
      "Valgfrie aktiviteter",
      "Transport og catering",
      "Etterspill og oppfølging",
    ],
    cta: "Send forespørsel",
    href: "/kontakt?tjeneste=Premium",
    highlighted: false,
  },
];

const activities = [
  {
    title: "Kajakk og skjærgårdssafari",
    description: "Padle gjennom vakre Arendals skjærgård. Passer alle nivåer, med guider og utstyr inkludert.",
    image: "/images/scraped/teambuilding/Bungeerunning-7634.jpg",
    alt: "Kajakk i skjærgården ved Arendal",
  },
  {
    title: "Seiltur med Havsul",
    description: "Opplev den historiske Listerskøyta fra 1933. En unik ramme for teambuilding og felles opplevelser.",
    image: "/images/havsul.jpg",
    alt: "Listerskøyta Havsul under seilas",
  },
  {
    title: "JTI-personlighetsanalyse",
    description: "Forstå forskjellighetene i teamet. JTI kartlegger preferanser uten å vurdere godt eller dårlig.",
    image: "/images/tp-typeteori.jpg",
    alt: "JTI personlighetsanalyse for bedrifter",
  },
  {
    title: "Foredrag og faglig innhold",
    description: "Inspirerende foredrag om ledelse, samarbeid og personlighet. Tilpasset deres bransje og utfordringer.",
    image: "/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg",
    alt: "Foredrag om teambuilding og ledelse",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Kontakt oss",
    description: "Fortell oss om deres gruppe, mål og ønsker. Vi lytter og forstår behovene deres.",
  },
  {
    step: "02",
    title: "Vi skreddersyr",
    description: "Basert på deres input lager vi et opplegg som matcher gruppens størrelse, nivå og målsettinger.",
  },
  {
    step: "03",
    title: "Opplevelsen",
    description: "Dagen kommer. Vi tar oss av alt praktisk. Dere fokuserer på opplevelsen og hverandre.",
  },
  {
    step: "04",
    title: "Oppfølging",
    description: "Etter arrangementet følger vi opp med refleksjon, rapport eller videre opplegg etter ønske.",
  },
];

const references = [
  "Aker Solutions",
  "KPMG",
  "Statoil Hydro",
  "Agder Energi",
  "National Oilwell Varco",
  "Statens Vegvesen",
  "Arendal Kommune",
  "NODE",
  "Teekay",
];

export default function BedriftPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Bedriftsarrangement og Teambuilding",
        description: "Teambuilding, bedriftsarrangement og faglig innhold med kajakk, seiltur og JTI-personlighetsanalyse i Arendal og på Sørlandet.",
        provider: {
          "@type": "Organization",
          name: "Wannado",
          url: absoluteUrl("/"),
          telephone: "+4799469957",
          email: "mail@wannado.no",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Skarestrand 11",
            addressLocality: "Kongshavn",
            postalCode: "4812",
            addressCountry: "NO",
          },
        },
        areaServed: {
          "@type": "Place",
          name: "Arendal og Sørlandet",
        },
        serviceType: "Teambuilding",
        category: "Bedriftsarrangement",
      },
      {
        "@type": "Service",
        name: "JTI-personlighetsanalyse for bedrifter",
        description: "Jungiansk Type Index (JTI) workshop og analyse for bedrifter. Kartlegger personlighetspreferanser for bedre teamdynamikk.",
        provider: {
          "@type": "Organization",
          name: "Wannado",
          url: absoluteUrl("/"),
        },
        serviceType: "Personlighetsanalyse",
        category: "Faglig innhold",
      },
    ],
  };

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Bedrift", path: "/bedrift" }])}
      />
      <JsonLd data={serviceSchema} />
      <Navbar />

      <PageHero
        image="/images/havsul.jpg"
        imageAlt="Seiltur med Havsul i Arendals skjærgård"
        eyebrow="For bedrifter"
        title="Bygg et sterkere team på sjøen"
        intro="Teambuilding, bedriftsarrangement og faglig innhold med natur som arena. Skreddersydd for deres mål og kultur."
        primary={{ label: "Se pakker", href: "#pakker" }}
        secondary={{ label: "Send forespørsel", href: "/kontakt" }}
      />

      {/* Hvorfor velge Wannado */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Hvorfor velge Wannado
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-space font-bold text-lg text-brown mb-3">
                  {benefit.title}
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakker */}
      <section id="pakker" className="bg-warm-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Velg deres opplevelse
            </h2>
            <p className="font-inter text-base text-brown-mid mt-4 max-w-2xl mx-auto">
              Fra en halv dag med kajakk til en komplett premium-opplevelse. Vi skreddersyr etter deres behov.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border shadow-sm flex flex-col ${
                  pkg.highlighted
                    ? "bg-brown text-white border-brown ring-2 ring-brown ring-offset-2 ring-offset-warm-white"
                    : "bg-white border-border"
                }`}
              >
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {pkg.highlighted && (
                    <span className="inline-block font-inter text-xs font-semibold uppercase tracking-wider text-sand mb-3">
                      Mest populær
                    </span>
                  )}
                  <h3 className="font-space font-bold text-xl mb-2">
                    {pkg.name}
                  </h3>
                  <p
                    className={`font-inter text-sm leading-relaxed mb-6 ${
                      pkg.highlighted ? "text-white/80" : "text-brown-mid"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className={`font-inter text-sm flex items-start gap-2 ${
                          pkg.highlighted ? "text-white/90" : "text-brown-mid"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            pkg.highlighted ? "text-sand" : "text-teal"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={pkg.href}
                    variant={pkg.highlighted ? "sand" : "primary"}
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aktiviteter */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Hva vi tilbyr
            </h2>
            <p className="font-inter text-base text-brown-mid mt-4 max-w-2xl mx-auto">
              Kombiner aktiviteter for en helhetlig opplevelse. Kajakk, seiling, personlighetsanalyse og foredrag.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-space font-bold text-xl text-brown mb-3">
                    {activity.title}
                  </h3>
                  <p className="font-inter text-sm text-brown-mid leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="font-inter text-sm font-medium text-teal hover:text-brown transition-colors inline-flex items-center gap-1"
                  >
                    Send forespørsel
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slik fungerer det */}
      <section className="bg-warm-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-space font-bold text-3xl md:text-4xl text-brown">
              Slik fungerer det
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-teal text-white font-space font-bold text-xl flex items-center justify-center mx-auto mb-5">
                  {step.step}
                </div>
                <h3 className="font-space font-bold text-lg text-brown mb-3">
                  {step.title}
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referanser */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-6">
            Bedrifter som har valgt oss
          </h2>
          <p className="font-inter text-base text-brown-mid leading-relaxed mb-10 max-w-2xl mx-auto">
            Blant våre kunder finner du alt fra store konserner til lokale bedrifter.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {references.map((company) => (
              <div
                key={company}
                className="bg-white rounded-xl py-4 px-5 text-center shadow-sm border border-border"
              >
                <span className="font-inter text-sm font-medium text-brown">
                  {company}
                </span>
              </div>
            ))}
          </div>
          <Button href="/referanser" variant="primary">
            Se alle referanser
          </Button>
        </div>
      </section>

      {/* Kontakt Tone */}
      <section className="bg-warm-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-4">
                Tone Pernille Sivertsen
              </h2>
              <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mb-4">
                Med JTI-sertifisering, NLP Master Coach-utdanning og over 15 års erfaring med gruppeopplevelser, vet Tone hvordan hun skaper rom for lek, mestring og ekte samhold. Hun tilpasser hvert arrangement etter gruppens dynamikk og mål.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full">
                  JTI-sertifisert
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full">
                  NLP Master Coach
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full">
                  15+ års erfaring
                </span>
              </div>
              <div className="space-y-2">
                <a
                  href="tel:+4799469957"
                  className="font-inter text-sm font-medium text-brown-muted hover:text-brown transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +47 99 46 99 57
                </a>
                <a
                  href="mailto:mail@wannado.no"
                  className="font-inter text-sm font-medium text-brown-muted hover:text-brown transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  mail@wannado.no
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-brown/5">
              <Image
                src="/images/tp-typeteori.jpg"
                alt="Tone Pernille Sivertsen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brown rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              Klar for en annerledes bedriftsdag?
            </h2>
            <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Kontakt oss for et skreddersydd opplegg. Vi tilpasser aktivitetene etter antall deltakere, tid og ønsker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/kontakt" variant="sand">
                Send forespørsel
              </Button>
              <Button href="tel:+4799469957" variant="outline-light">
                Ring Tone Pernille
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
