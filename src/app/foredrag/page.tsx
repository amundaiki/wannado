import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Foredrag Arendal - JTI personlighetsanalyse og Grønlandsekspedisjon | Wannado",
  description:
    "Inspirerende foredrag for bedrifter og organisasjoner. JTI personlighetsanalyse basert på C.G. Jung, og Roars kajakkekspedisjon til Øst-Grønland. Bestill i dag!",
};

export default function ForedragPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-sm font-semibold uppercase tracking-widest text-teal mb-4">
            Foredrag og kurs
          </p>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-brown mb-6">
            Foredrag og inspirasjon
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid leading-relaxed">
            Engasjerende foredrag som gir teamet ny innsikt, inspirasjon og
            bedre samspill. Passer for bedrifter, skoler og organisasjoner.
          </p>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* JTI Card */}
          <div className="bg-teal rounded-2xl p-8 md:p-10 text-white flex flex-col">
            <p className="font-inter text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
              Personlighetsanalyse
            </p>
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              JTI: Jungiansk Type Index
            </h2>
            <p className="font-inter text-base text-white/90 leading-relaxed mb-4">
              Et inspirerende foredrag om personlighet og samarbeid, basert på
              C.G. Jungs preferanseteorier. JTI kartlegger hvordan vi mennesker
              er forskjellige, uten sortering i &quot;bra&quot; eller
              &quot;mindre bra&quot;.
            </p>
            <p className="font-inter text-base text-white/90 leading-relaxed mb-6">
              Forstå hvordan ulike personligheter påvirker samarbeid, og få
              verktøy for å styrke teamdynamikken i hverdagen.
            </p>

            <div className="space-y-4 mb-8 flex-1">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-space font-bold text-lg">Foredrag</p>
                  <p className="font-space font-bold text-lg">Fra kr 6 000,-</p>
                </div>
                <p className="font-inter text-sm text-white/70">
                  Ca 45 minutter. Engasjerende introduksjon til
                  personlighetstyper og samarbeid.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-space font-bold text-lg">
                    Full teamanalyse
                  </p>
                  <p className="font-space font-bold text-lg">
                    Kr 1 000,- pr pers
                  </p>
                </div>
                <p className="font-inter text-sm text-white/70">
                  En hel arbeidsdag med grundig kartlegging og gjennomgang av
                  hele teamet.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <p className="font-inter text-sm text-white/60 mb-4">
                Kontakt: Tone Pernille Sivertsen, tp@wannado.no, +47 99 46 99 57
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-white text-teal font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Bestill JTI-foredrag
              </Link>
            </div>
          </div>

          {/* Grønlandsekspeditionen Card */}
          <div className="bg-brown rounded-2xl p-8 md:p-10 text-white flex flex-col">
            <p className="font-inter text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
              Ekspedisjonsforedrag
            </p>
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              Grønlandsekspeditionen
            </h2>
            <p className="font-inter text-base text-white/90 leading-relaxed mb-4">
              Roar tok med seg kajakken til Øst-Grønland. I dette foredraget
              deler han opplevelsen gjennom fantastiske bilder og video fra en
              ekspedisjon i et av verdens mest spektakulære landskap.
            </p>
            <p className="font-inter text-base text-white/90 leading-relaxed mb-6">
              Et inspirerende foredrag om mot, forberedelse og naturopplevelser i
              ytterste konsekvens. Passer for bedrifter, skoler og
              organisasjoner som ønsker inspirasjon og perspektiv.
            </p>

            <div className="space-y-4 mb-8 flex-1">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-space font-bold text-lg mb-1">
                  Pris og varighet
                </p>
                <p className="font-inter text-sm text-white/70">
                  Kontakt oss for tilpasset tilbud. Foredraget tilpasses
                  publikum og anledning.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <p className="font-inter text-sm text-white/60 mb-4">
                Kontakt: Roar Laugerud, roar@wannado.no, +47 94 82 67 10
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-white text-brown font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Bestill foredrag
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-space font-bold text-2xl md:text-3xl text-brown mb-4">
            Kontakt oss for tilbud
          </h2>
          <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mb-8">
            Vi skreddersyr foredrag etter deres behov. Kombiner gjerne med en
            teambuildingdag for maksimal effekt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-brown text-white font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-[#5a4838] transition-colors duration-200"
            >
              Send forespørsel
            </Link>
            <Link
              href="/teambuilding"
              className="inline-flex items-center justify-center border border-border text-brown font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-white transition-colors duration-200"
            >
              Se teambuilding-meny
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
