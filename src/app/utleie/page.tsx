import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kajakk- og kanoutleie Arendal | Wannado",
  description:
    "Lei kajakk eller kano fra Skarestrand i Kongshavn. Utforsk Arendals skjærgård på egenhånd. Kontakt Roar for bestilling.",
  openGraph: {
    title: "Kajakk- og kanoutleie Arendal | Wannado",
    description:
      "Lei kajakk eller kano fra Skarestrand i Kongshavn. Utforsk Arendals skjærgård på egenhånd. Kontakt Roar for bestilling.",
    images: ["/images/utleie-bilde.jpg"],
  },
};

export default function UtleiePage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <Image
          src="/images/utleie-bilde.jpg"
          alt="Kajakker klar for utleie ved Skarestrand"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <p className="font-inter text-sm font-medium text-sand uppercase tracking-[3px] mb-4">
            Utstyrsutleie
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Lei kajakk og kano
            <br />
            i Arendals skjærgård
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
            Utforsk kysten på egenhånd med kajakk eller kano fra Skarestrand.
          </p>
        </div>
      </section>

      {/* Main Content + Pricing Card */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Description */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown leading-snug">
              Padle i ditt eget tempo
            </h2>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Wannado leier ut kajakker og kanoer fra Skarestrand i Kongshavn,
              rett ved Arendals vakre skjærgård. Utstyret er godt vedlikeholdt
              og egner seg perfekt for turer langs kysten, til holmer og i
              rolige viker.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Kano passer fint for familier og nybegynnere, og krever ingen
              forkunnskaper. For kajakk anbefaler vi noe padleerfaring, men ta
              gjerne kontakt dersom du er usikker. Roar hjelper deg med å finne
              riktig utstyr for turen din.
            </p>

            <div className="pt-4">
              <Image
                src="/images/scraped/kayak/kajakkutleie-7989194812.jpg"
                alt="Kajakker ved Skarestrand"
                width={800}
                height={533}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Right: Pricing Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sticky top-24">
              <h3 className="font-space text-2xl font-bold text-brown mb-6">
                Utleiepriser
              </h3>

              {/* Enkel kajakk */}
              {/* TODO: Sett inn faktisk pris når tilgjengelig */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                  Enkel kajakk
                </p>
                <p className="font-space text-2xl font-bold text-brown">
                  Ta kontakt
                </p>
                <p className="font-inter text-sm text-brown-mid mt-1">
                  for pris og tilgjengelighet
                </p>
              </div>

              {/* Dobbel kajakk */}
              {/* TODO: Sett inn faktisk pris når tilgjengelig */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                  Dobbel kajakk
                </p>
                <p className="font-space text-2xl font-bold text-brown">
                  Ta kontakt
                </p>
                <p className="font-inter text-sm text-brown-mid mt-1">
                  for pris og tilgjengelighet
                </p>
              </div>

              {/* Kano */}
              {/* TODO: Sett inn faktisk pris når tilgjengelig */}
              <div className="mb-8">
                <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                  Kano
                </p>
                <p className="font-space text-2xl font-bold text-brown">
                  Ta kontakt
                </p>
                <p className="font-inter text-sm text-brown-mid mt-1">
                  for pris og tilgjengelighet
                </p>
              </div>

              <Link
                href="/kontakt"
                className="block w-full text-center bg-brown text-white font-inter font-semibold text-base py-4 rounded-xl hover:bg-[#5a4838] transition-colors"
              >
                Bestill utleie
              </Link>
              <p className="font-inter text-xs text-brown-muted text-center mt-3">
                Vi svarer vanligvis innen 24 timer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Praktisk informasjon */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-4">
            Praktisk informasjon
          </h2>
          <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14">
            Alt du trenger å vite før du leier kajakk eller kano hos Wannado.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Oppmøtested */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-md transition-shadow">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Oppmøtested
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Skarestrand, 4812 Kongshavn. Wannado holder til rett ved
                sjøkanten, med enkel tilgang til vannet og parkering i nærheten.
              </p>
            </div>

            {/* Hva er inkludert */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-md transition-shadow">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Hva er inkludert
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Kajakk eller kano, padleårer og redningsvest. Alt utstyret du
                trenger for en trygg tur på sjøen er inkludert i leieprisen.
              </p>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-md transition-shadow">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Tips for turen
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Ta med væregnede klær og sko som tåler vann. Sjekk værmelding
                før du drar, og husk solkrem og drikkevann på varme dager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Klar for en padletur?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Lei kajakk eller kano og utforsk skjærgården på egenhånd. Ta kontakt
            med Roar for å reservere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-block bg-sand text-brown font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#f5cc7a] transition-colors"
            >
              Bestill utleie
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
