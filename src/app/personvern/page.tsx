import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Personvern - Wannado",
  description:
    "Personvernerklæring for Wannado. Informasjon om hvordan vi behandler dine personopplysninger i henhold til GDPR.",
  openGraph: {
    title: "Personvern - Wannado",
    description: "Personvernerklæring for Wannado.",
    images: ["/images/baat-fb.jpg"],
  },
};

const sections = [
  {
    title: "1. Behandlingsansvarlig",
    content: (
      <>
        <p className="font-inter text-base text-brown-mid leading-relaxed mb-3">
          Wannado v/ Tone Pernille Sivertsen er behandlingsansvarlig for
          personopplysninger som samles inn via wannado.no.
        </p>
        <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-1">
          <li>Adresse: Skarestrand 11, 4812 Kongshavn</li>
          <li>
            E-post:{" "}
            <a
              href="mailto:mail@wannado.no"
              className="text-teal hover:underline"
            >
              mail@wannado.no
            </a>
          </li>
          <li>
            Telefon:{" "}
            <a href="tel:+4799469957" className="text-teal hover:underline">
              +47 99 46 99 57
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Hvilke opplysninger samler vi inn?",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          <strong>Kontaktskjema:</strong> Navn, e-post, telefon og melding.
          Disse opplysningene oppgir du frivillig n&aring;r du sender oss en
          henvendelse.
        </li>
        <li>
          <strong>Nettstedsbes&oslash;k:</strong> Anonymisert
          bes&oslash;ksstatistikk via Vercel Analytics. Ingen informasjonskapsler
          (cookies), ingen personidentifiserbar informasjon.
        </li>
        <li>
          <strong>Ingen tredjepartssporing:</strong> Wannado.no bruker ingen
          sporingskoder fra Google, Facebook eller andre tredjeparter.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Form\u00e5l med behandlingen",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          <strong>Kontaktskjema:</strong> Besvare henvendelser og tilby
          opplevelser.
        </li>
        <li>
          <strong>Bes&oslash;ksstatistikk:</strong> Forst&aring; hvordan
          nettsiden brukes, slik at vi kan forbedre innholdet.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Rettslig grunnlag",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          <strong>Kontaktskjema:</strong> Samtykke (GDPR art. 6(1)(a)). Du
          velger selv &aring; sende inn informasjonen.
        </li>
        <li>
          <strong>Bes&oslash;ksstatistikk:</strong> Berettiget interesse (GDPR
          art. 6(1)(f)). Dataene er anonymiserte og kan ikke knyttes til
          enkeltpersoner.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Lagring og sletting",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          Kontaktskjemaforesp&oslash;rsler slettes etter 12 m&aring;neder.
        </li>
        <li>
          Bes&oslash;ksstatistikk er anonymisert og kan ikke knyttes til
          enkeltpersoner.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Dine rettigheter",
    content: (
      <>
        <p className="font-inter text-base text-brown-mid leading-relaxed mb-3">
          Som registrert har du rett til:
        </p>
        <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-2 list-disc list-inside">
          <li>Innsyn i egne opplysninger</li>
          <li>Retting av feilaktige opplysninger</li>
          <li>Sletting av opplysninger</li>
          <li>
            Klage til Datatilsynet (
            <a
              href="https://www.datatilsynet.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              datatilsynet.no
            </a>
            )
          </li>
        </ul>
        <p className="font-inter text-base text-brown-mid leading-relaxed mt-3">
          Kontakt oss p&aring;{" "}
          <a
            href="mailto:mail@wannado.no"
            className="text-teal hover:underline"
          >
            mail@wannado.no
          </a>{" "}
          for &aring; ut&oslash;ve dine rettigheter.
        </p>
      </>
    ),
  },
  {
    title: "7. Informasjonskapsler (cookies)",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          Wannado.no bruker ingen sporingsbaserte informasjonskapsler.
        </li>
        <li>Vercel Analytics er helt cookiefri.</li>
        <li>
          Eventuell teknisk sesjonscookie kan forekomme for nettsidens
          grunnleggende funksjon.
        </li>
      </ul>
    ),
  },
  {
    title: "8. Endringer",
    content: (
      <p className="font-inter text-base text-brown-mid leading-relaxed">
        Denne personvernerkl&aelig;ringen kan oppdateres ved behov. Sist
        oppdatert: mars 2026.
      </p>
    ),
  },
];

export default function PersonvernPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-4">
            Personvern
          </h1>
          <p className="font-inter text-lg text-white/80 leading-relaxed">
            Slik behandler Wannado dine personopplysninger.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-grow max-w-[900px] mx-auto px-6 py-16 md:py-20">
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl p-8 md:p-10 border border-border"
            >
              <h2 className="font-space text-2xl font-bold text-brown mb-4">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
