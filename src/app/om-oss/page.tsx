import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Om oss - Menneskene bak Wannado | Opplevelser i Arendal",
  description:
    "Bli kjent med Tone Pernille Sivertsen og Roar Laugerud. Over 15 års erfaring med kajakk, seil, teambuilding og hesteopplevelser i Arendal og langs Sørlandskysten.",
  openGraph: {
    title: "Om oss - Menneskene bak Wannado",
    description:
      "Bli kjent med Tone Pernille og Roar. Over 15 års erfaring med opplevelser i Arendals skjærgård.",
    images: ["/images/P7270038.jpg"],
  },
};

export default function OmOssPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-brown pt-40 pb-20 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-inter text-sm font-medium text-sand uppercase tracking-[3px] mb-4">
            OM WANNADO
          </p>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Menneskene bak opplevelsene
          </h1>
          <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Over 15 år med lidenskap for mestring, lek og naturkraft. Fra
            Kongshavn i Arendal skaper vi opplevelser som setter spor.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown leading-snug mb-8">
            Wannados historie
          </h2>
          <div className="space-y-6">
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Wannado ble grunnlagt rundt 2005, med base på Skarestrand i
              Kongshavn, Arendal. Det som startet som en lidenskap for friluftsliv
              og menneskelig utvikling, har over 15 år vokst til en bred
              opplevelsesvirksomhet som tilbyr alt fra kajakkturer og seilturer med
              Listerskøyta Havsul, til teambuilding, hesteopplevelser og foredrag.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Filosofien vår er enkel: vi tror på kraften i lek, mestring og
              naturopplevelser. Vi skaper trygge rammer der mennesker kan utfordre
              seg selv, bygge tillit og oppleve noe de aldri har gjort før. Enten
              det er en bedriftsgruppe som skal styrke samarbeidet, en familie på
              kajakktur i skjærgården, eller en enkeltperson som vil lære noe nytt.
            </p>
          </div>

          {/* Pullquote */}
          <blockquote className="text-2xl md:text-3xl font-dm italic text-brown/80 text-center py-8 my-8 border-y border-border">
            Lek er helsebringende, utviklende og mestringsgivende. Hva er DIN
            lek? Kanskje vi kan finne det ut sammen?
          </blockquote>
        </div>
      </section>

      {/* Team Profiles Section */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-14">
            Folkene bak opplevelsene
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Tone Pernille Sivertsen */}
            <div>
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <Image
                  src="/images/tp-typeteori.jpg"
                  alt="Tone Pernille Sivertsen"
                  width={600}
                  height={750}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-space text-2xl md:text-3xl font-semibold text-brown mt-6">
                Tone Pernille Sivertsen
              </h3>
              <p className="font-inter text-sm font-medium text-teal uppercase tracking-wider mt-1">
                Teambuilding, hesteopplevelser og coaching
              </p>
              <div className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mt-4 space-y-4">
                <p>
                  Tone Pernille Sivertsen har vært en sentral del av Wannado siden
                  2005, hvor hun har kombinert sin lidenskap for energi,
                  teambuilding og lek til å skape engasjerende opplevelser for
                  deltakerne. Som sertifisert i Jungs TypeIndeks (JTI) og
                  NLP-coach, har hun en dyp forståelse for menneskers ulikheter og
                  hvordan bygge sterke team. Hun er kjent for sin evne til å
                  motivere og engasjere mennesker på alle nivåer, og får deltakerne
                  til å strekke seg lenger enn de trodde var mulig.
                </p>
                <p>
                  De siste årene har Tone Pernille også utvidet sin erfaring med
                  hester, og har bygget opp en egen hesteflokk. Hun bruker sin
                  kunnskap om islandshester og dyreassisterte intervensjoner til å
                  formidle gleden av å oppleve naturen på en unik måte, fra
                  hesteryggen. Hennes erfaring med både mennesker og dyr gir henne
                  en unik evne til å bygge tillit og relasjoner.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap">
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  JTI-sertifisert
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  NLP Master Coach
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  Dyreassisterte intervensjoner
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="mailto:tp@wannado.no"
                  className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                >
                  tp@wannado.no
                </a>
                <a
                  href="tel:+4799469957"
                  className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                >
                  +47 99 46 99 57
                </a>
              </div>
            </div>

            {/* Roar Laugerud */}
            <div>
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <Image
                  src="/images/P7270038.jpg"
                  alt="Roar Laugerud"
                  width={600}
                  height={750}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-space text-2xl md:text-3xl font-semibold text-brown mt-6">
                Roar Laugerud
              </h3>
              <p className="font-inter text-sm font-medium text-teal uppercase tracking-wider mt-1">
                Kajakkinstruktør, skipper og fotograf
              </p>
              <div className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mt-4 space-y-4">
                <p>
                  Roar Laugerud er en erfaren padle- og ekspedisjonsentusiast som
                  utstråler ro og trygghet. Med sin rolige og sindige tilnærming
                  skaper han en trygg ramme for deltakerne, og gir dem den
                  forståelsen de trenger for å begi seg ut på spennende og
                  utfordrende opplevelser. Roar brenner for å formidle friluftsliv
                  og naturens skjønnhet gjennom praktiske opplevelser, og hans mål
                  er alltid å sette deltakerne i stand til å være på rett sted til
                  rett tid, enten de er på kajakkurs eller på eventyr i naturen.
                </p>
                <p>
                  Roar har oppnådd Veileder Hav-sertifikatet, som er det høyeste
                  nivået på Padleforbundets utdanningsstige. I tillegg er han
                  sertifisert på nest høyeste nivå på BCU (British Canoe Union),
                  som regnes som en av verdens beste padleorganisasjoner. Han har
                  også fritidsskippersertifikat, og gjennom tilleggskurs er han
                  autorisert til å føre båter med inntil 12 passasjerer.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap">
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  Veileder Hav
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  BCU nest høyeste nivå
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  Fritidsskipper
                </span>
                <span className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2">
                  Autorisert for 12 passasjerer
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="mailto:roar@wannado.no"
                  className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                >
                  roar@wannado.no
                </a>
                <a
                  href="tel:+4794826710"
                  className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                >
                  +47 94 82 67 10
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-14">
            Våre verdier
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Trygghet */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Trygghet
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Sikkerhet først. Våre instruktører har de høyeste
                sertifiseringene, og vi har over 15 års erfaring med trygge
                opplevelser på sjøen.
              </p>
            </div>

            {/* Mestring */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Mestring
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Vi tror på at alle kan mer enn de tror. Våre opplevelser er
                designet for at du skal strekke deg og vokse.
              </p>
            </div>

            {/* Lek */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Lek
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Lek er helsebringende, utviklende og mestringsgivende. Vi skaper
                rom for den leken alle fortjener.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Vil du oppleve noe nytt?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Ta kontakt for en uforpliktende prat om hva vi kan skape sammen. Vi
            skreddersyr opplevelser for grupper, bedrifter og privatpersoner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-block bg-sand text-brown font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#f5cc7a] transition-colors"
            >
              Ta kontakt
            </Link>
            <a
              href="tel:+4799469957"
              className="inline-block border-2 border-white/30 text-white font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Ring +47 99 46 99 57
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
