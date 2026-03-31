import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Seilturer Arendal - Listerskøyta Havsul fra 1933 | Wannado",
  description:
    "Opplev en kulturvandring i Arendals skjærgård med den historiske Listerskøyta Havsul fra 1933. Historiefortelling, skipsbygging og uthavner. Fra kr 350,- per person.",
  openGraph: {
    title: "Seilturer Arendal - Listerskøyta Havsul fra 1933 | Wannado",
    description:
      "Opplev en kulturvandring i Arendals skjærgård med den historiske Listerskøyta Havsul fra 1933. Fra kr 350,- per person.",
    images: ["/images/havsul.jpg"],
  },
};

export default function SeilturerPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <Image
          src="/images/havsul.jpg"
          alt="Listerskøyta Havsul seiler i Arendals skjærgård"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <p className="font-inter text-sm font-medium text-sand uppercase tracking-[3px] mb-4">
            Seiltur i skjærgården
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Seil med Havsul
            <br />
            fra 1933
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
            En kulturvandring til sjøs gjennom Arendals rike maritime historie,
            ombord i en autentisk Listerskøyte.
          </p>
        </div>
      </section>

      {/* Main Content + Pricing Card */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Description */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown leading-snug">
              Historiefortelling i Arendals skjærgård
            </h2>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Sett deg inn i Arendals storhetstid under seilskutetiden. Ombord i
              Listerskøyta Havsul, bygget i 1933, får du innblikk i
              skipsbygging, losvirksomhet, fanteliv og livet langs kysten.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Vi seiler forbi uthavnen Merdø og Brattekleiv Skipsverft, med
              historiefortelling som gjør fortiden levende. Turen passer for
              grupper inntil 12 personer og varer 2 til 3 timer.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Grupper kan avtale matservering på Merdø eller Brattekleiv
              Skipsverft. Det er også mulig å bestille catering ombord for en
              ekstra minneverdig opplevelse.
            </p>

            <div className="pt-4">
              <h3 className="font-space text-xl font-bold text-brown mb-3">
                Praktisk informasjon
              </h3>
              <ul className="font-inter text-brown-mid space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-teal mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Fremmøte:</strong> Pollen i Arendal sentrum
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Varighet:</strong> 2 til 3 timer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>Gruppestørrelse:</strong> Inntil 12 personer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal mt-0.5">
                    <svg
                      className="w-5 h-5"
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
                  </span>
                  <span>
                    <strong>Kontakt:</strong> Tone Pernille,{" "}
                    <a
                      href="tel:+4799469957"
                      className="text-teal hover:underline"
                    >
                      +47 99 46 99 57
                    </a>{" "}
                    /{" "}
                    <a
                      href="mailto:tp@wannado.no"
                      className="text-teal hover:underline"
                    >
                      tp@wannado.no
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Pricing Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sticky top-24">
              <h3 className="font-space text-2xl font-bold text-brown mb-6">
                Priser
              </h3>

              {/* Per person */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                  Per person
                </p>
                <p className="font-space text-4xl font-bold text-brown">
                  Kr 350,-
                </p>
                <ul className="mt-3 space-y-1.5 font-inter text-sm text-brown-mid">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-teal flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Varighet 2-3 timer
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-teal flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Maks 12 personer
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-teal flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Historiefortelling inkludert
                  </li>
                </ul>
              </div>

              {/* Charter */}
              <div className="mb-8">
                <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-2">
                  Charter
                </p>
                <p className="font-space text-4xl font-bold text-brown">
                  Kr 3 500,-
                </p>
                <p className="font-inter text-sm text-brown-mid mt-1">
                  per time, eksklusiv bruk
                </p>
              </div>

              <Link
                href="/kontakt"
                className="block w-full text-center bg-brown text-white font-inter font-semibold text-base py-4 rounded-xl hover:bg-[#5a4838] transition-colors"
              >
                Bestill seiltur
              </Link>
              <p className="font-inter text-xs text-brown-muted text-center mt-3">
                Vi svarer vanligvis innen 24 timer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-4">
            Hva kan du forvente?
          </h2>
          <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14">
            En seiltur med Havsul er mer enn en båttur. Det er en reise tilbake
            i tid, med vind i seilene og historier fra en svunnen epoke.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Navigation */}
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Autentisk seilas
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Seil med en ekte Listerskøyte fra 1933. Kjenn vinden i seilene
                og bølgene under kjølen.
              </p>
            </div>

            {/* Card 2: History */}
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Levende historier
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Hør om seilskutetiden, losvirksomhet og fanteliv. Historiene
                gjør turen uforglemmelig.
              </p>
            </div>

            {/* Card 3: Destinations */}
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Unike stoppesteder
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Besøk uthavnen Merdø og Brattekleiv Skipsverft. Steder med
                sjel og historie du ikke finner i guidebøkene.
              </p>
            </div>

            {/* Card 4: Food */}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Mat og drikke
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Bestill matservering på Merdø, Brattekleiv eller som catering
                ombord. Perfekt for selskaper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Klar for et eventyr på havet?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Book en seiltur med Havsul og opplev Arendals skjærgård fra sjøsiden.
            Vi skreddersyr turen etter deres ønsker.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-block bg-sand text-brown font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#f5cc7a] transition-colors"
            >
              Bestill nå
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
