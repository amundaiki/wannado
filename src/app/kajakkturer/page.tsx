import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kajakkurs og kajakkturer Arendal | Wannado",
  description:
    "Kajakkurs fra nybegynner til ekspedisjon i Arendals skjærgård. Våttkort, grunnkurs hav, rullekurs og guidede turer. Alt utstyr inkludert. Fra kr 1 250,-.",
  openGraph: {
    title: "Kajakkurs og kajakkturer Arendal | Wannado",
    description:
      "Kajakkurs fra nybegynner til ekspedisjon i Arendals skjærgård. Alt utstyr inkludert. Fra kr 1 250,-.",
    images: ["/images/scraped/kayak/kajakktur-strandhotell-4015.jpg"],
  },
};

const courses = [
  {
    name: "Våttkort / Introduksjonskurs",
    duration: "3 timer",
    price: "Kr 1 350,-",
    privatePrice: "Kr 1 500,- (2-4 pers)",
    description:
      "Perfekt start for nybegynnere. Lær grunnleggende padleteknikk, sikkerhet og selvberging. Du får våttkort etter bestått kurs.",
    highlight: true,
    image: "/images/scraped/kayak/pusnes-introkurs-4613.jpg",
    imageAlt: "Nybegynner padler kajakk i rolig vann ved Arendal",
  },
  {
    name: "Grunnkurs hav",
    duration: "16 timer",
    price: "Kr 3 000,-",
    privatePrice: "Kr 3 500,- (privat)",
    description:
      "Grundig opplæring i havpadling med fokus på navigasjon, værforståelse og gruppeteknikk. Inkluderer alt utstyr.",
    image: "/images/scraped/kayak/kajakkurs-strandhotell-4010.jpg",
    imageAlt: "Kajakkene klare for grunnkurs hav på stranden",
  },
  {
    name: "Teknikkurs",
    duration: "16 timer",
    price: "Kr 3 500,-",
    description:
      "For deg som vil videreutvikle padleteknikken. Fokus på effektive padletak, kantring og avansert manøvrering.",
    image: "/images/scraped/kayak/kajakkurs-redning-DSC_0165.jpg",
    imageAlt: "Kajakkpadler sett ovenfra i grønt vann under teknikkurs",
  },
  {
    name: "Rullekurs",
    duration: "3 timer",
    price: "Kr 1 250,-",
    description:
      "Lær den viktigste selvbergingsteknikken. Rullekurset gir deg tryggheten til å padle i mer utfordrende forhold.",
    image: "/images/scraped/kayak/kajakkursredning-3619.jpg",
    imageAlt: "Redningstrening i kajakk på åpent vann",
  },
  {
    name: "Tøffe tak",
    duration: "5 timer",
    price: "Kr 1 350,-",
    description:
      "Utfordrende kurs for deg som vil teste grensene. Padling i bølger, strøm og vind under trygge rammer.",
    image: "/images/scraped/kayak/bolgepadling-5570.jpg",
    imageAlt: "Rød kajakk i dramatisk bølgepadling",
  },
  {
    name: "Turkurs / Ekspedisjonskurs",
    duration: "2 dager",
    price: "Kr 3 500,-",
    description:
      "Planlegging og gjennomføring av lengre kajakkekspedisjoner. Bivuakk, navigasjon og ledelse i felten.",
    image: "/images/scraped/kayak/grebbestad-2013-3804.jpg",
    imageAlt: "Leirbål med kajakker i bakgrunnen under ekspedisjonskurs",
  },
];

export default function KajakkturerPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <Image
          src="/images/scraped/kayak/kajakktur-strandhotell-4015.jpg"
          alt="Gruppe kajakkpadlere vinker fra vannet med norsk kystby i bakgrunnen"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <p className="font-inter text-sm font-medium text-sand uppercase tracking-[3px] mb-4">
            Kurs og opplevelser
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Kajakkturer og kajakkurs
            <br />
            i Arendals skjærgård
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
            Fra ditt første padletak til ekspedisjon på Grønland. Vi tar deg med
            hele veien.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown mb-6">
            Padl i verdens vakreste skjærgård
          </h2>
          <p className="font-inter text-lg text-brown-mid leading-relaxed max-w-3xl mx-auto mb-4">
            Kajakkpadling er en fantastisk fritidsaktivitet som passer for
            veldig mange. De fleste har kajakken liggende på hytta eller i
            garasjen og padler av og til i godt vær. Andre bruker kajakken i
            all slags vær.
          </p>
          <p className="font-inter text-lg text-brown-mid leading-relaxed max-w-3xl mx-auto">
            Kanskje du har drømmer om lengre turer, padling i bølger eller til
            og med ekspedisjonspadling? Vi kan bli med deg hele veien fra der du
            er, til målet er nådd. Vi garanterer en innholdsrik reise.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-4">
            Kurs for alle nivåer
          </h2>
          <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14">
            Alt nødvendig utstyr er inkludert i prisen. Oppmøte på Skarestrand,
            4812 Kongshavn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.name}
                className={`bg-white rounded-2xl overflow-hidden border hover:shadow-md transition-shadow ${
                  course.highlight
                    ? "border-teal/40 ring-1 ring-teal/20"
                    : "border-border"
                }`}
              >
                <div className="relative h-40">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  {course.highlight && (
                    <span className="inline-block font-inter text-xs font-semibold text-teal uppercase tracking-[2px] mb-3">
                      Mest populært
                    </span>
                  )}
                  <h3 className="font-space text-xl font-bold text-brown mb-2">
                    {course.name}
                  </h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-space text-2xl font-bold text-brown">
                      {course.price}
                    </span>
                    <span className="font-inter text-sm text-brown-muted">
                      / {course.duration}
                    </span>
                  </div>
                  {course.privatePrice && (
                    <p className="font-inter text-sm text-brown-muted mb-3">
                      Privatundervisning: {course.privatePrice}
                    </p>
                  )}
                  <p className="font-inter text-sm text-brown-mid leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guided Tours Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-4">
          Guidede turer
        </h2>
        <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14">
          Ikke kurs, men rene opplevelsesturer i skjærgården med erfaren guide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skjærgårdssafari */}
          <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow">
            <div className="relative h-56">
              <Image
                src="/images/scraped/kayak/kajakktur-16510307442.jpg"
                alt="Guidet kajakktur gjennom skjærgården med hvite sørlandshus"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/50 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-space text-2xl font-bold text-brown mb-2">
                Skjærgårdssafari
              </h3>
              <p className="font-inter text-sm text-brown-muted mb-4">
                Kr 1 350,- per person
              </p>
              <p className="font-inter text-brown-mid leading-relaxed">
                En guidet tur gjennom Arendals vakre skjærgård. Perfekt for deg
                som vil oppleve naturen uten kursformat. Vi tilpasser turen
                etter gruppens nivå og ønsker.
              </p>
            </div>
          </div>

          {/* Fyr til fyr */}
          <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow">
            <div className="relative h-56">
              <Image
                src="/images/scraped/kayak/kajakktur-fyr-oslofjorden-3995.jpg"
                alt="Kajakkpadler på vei mot fyrtårn langs kysten"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/50 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-space text-2xl font-bold text-brown mb-2">
                Fyr til fyr
              </h3>
              <p className="font-inter text-sm text-brown-muted mb-4">
                Kontakt oss for pris
              </p>
              <p className="font-inter text-brown-mid leading-relaxed">
                Padle mellom de historiske fyrene langs kysten. En lengre tur for
                deg med noe erfaring som ønsker en skikkelig opplevelse i
                Sørlandets fineste farvann.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Profile: Roar */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-10 md:p-14 border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <Image
                  src="/images/scraped/kayak/fyr-til-fyr-4656.jpg"
                  alt="Roar Laugerud, kajakkguide og Veileder Hav"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-space text-2xl md:text-3xl font-bold text-brown mb-2">
                  Roar er din guide
                </h2>
                <p className="font-inter text-sm font-medium text-teal mb-4">
                  Veileder Hav, sertifisert instruktør
                </p>
                <p className="font-inter text-lg text-brown-mid leading-relaxed mb-4">
                  Med mange års erfaring som veileder hav og en lidenskap for
                  kajakkpadling, er Roar Laugerud din trygge guide i
                  skjærgården. Han kjenner hvert skjær, hvert strømdrag og
                  hver vindkast langs kysten ved Arendal.
                </p>
                <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">
                  Roar har ledet ekspedisjoner til Øst-Grønland og har den
                  erfaringen og kompetansen som gjør at du kan føle deg trygg,
                  uansett nivå.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+4794826710"
                    className="inline-flex items-center gap-2 font-inter text-sm font-medium text-brown hover:text-teal transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +47 94 82 67 10
                  </a>
                  <a
                    href="mailto:roar@wannado.no"
                    className="inline-flex items-center gap-2 font-inter text-sm font-medium text-brown hover:text-teal transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    roar@wannado.no
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Klar til å padle?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Enten du er nybegynner eller erfaren padler, har vi et kurs eller en
            tur som passer for deg. Ta kontakt i dag.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-block bg-sand text-brown font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#f5cc7a] transition-colors"
            >
              Bestill kurs eller tur
            </Link>
            <a
              href="tel:+4794826710"
              className="inline-block border-2 border-white/30 text-white font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Ring Roar: +47 94 82 67 10
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
