import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Personvern og personvernerklæring | Wannado",
  description:
    "Personvernerklæring for Wannado. Les hvordan vi behandler personopplysninger fra kontaktskjema og besøk, og hvilke rettigheter du har etter GDPR.",
  path: "/personvern",
  image: "/images/baat-fb.jpg",
  imageAlt: "Personvern hos Wannado",
});

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
              className="text-teal underline underline-offset-2 hover:text-brown"
            >
              mail@wannado.no
            </a>
          </li>
          <li>
            Telefon:{" "}
            <a
              href="tel:+4799469957"
              className="text-teal underline underline-offset-2 hover:text-brown"
            >
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
          Disse opplysningene oppgir du frivillig når du sender oss en
          henvendelse.
        </li>
        <li>
          <strong>Nettstedsbesøk:</strong> Anonymisert
          besøksstatistikk via Vercel Analytics. Ingen informasjonskapsler
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
    title: "3. Formål med behandlingen",
    content: (
      <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
        <li>
          <strong>Kontaktskjema:</strong> Besvare henvendelser og tilby
          opplevelser.
        </li>
        <li>
          <strong>Besøksstatistikk:</strong> Forstå hvordan
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
          velger selv å sende inn informasjonen.
        </li>
        <li>
          <strong>Besøksstatistikk:</strong> Berettiget interesse (GDPR
          art. 6(1)(f)). Dataene er anonymiserte og kan ikke knyttes til
          enkeltpersoner.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Lagring og sletting",
    content: (
      <>
        <p className="font-inter text-base text-brown-mid leading-relaxed mb-3">
          Vi lagrer personopplysninger ikke lenger enn det som er nødvendig for
          formålet de ble samlet inn for. Når lagringstiden er passert, slettes
          opplysningene på en sikker måte.
        </p>
        <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-3">
          <li>
            Kontaktskjemaforespørsler slettes senest 12 måneder etter siste
            kontakt, med mindre henvendelsen leder til en avtale vi er pålagt å
            dokumentere, for eksempel av regnskapsmessige hensyn.
          </li>
          <li>
            Opplysninger knyttet til booking og betaling oppbevares så lenge
            bokføringsloven krever, deretter slettes de.
          </li>
          <li>
            Besøksstatistikk er anonymisert og kan ikke knyttes til
            enkeltpersoner, og lagres kun i aggregert form.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Dine rettigheter",
    content: (
      <>
        <h3 className="font-space text-lg font-semibold text-brown mb-3">
          Dette kan du kreve
        </h3>
        <p className="font-inter text-base text-brown-mid leading-relaxed mb-3">
          Som registrert har du etter personvernforordningen flere rettigheter
          overfor oss:
        </p>
        <ul className="font-inter text-base text-brown-mid leading-relaxed space-y-2 list-disc list-inside">
          <li>
            Innsyn i hvilke opplysninger vi har lagret om deg, og hvorfor.
          </li>
          <li>Retting av feilaktige eller ufullstendige opplysninger.</li>
          <li>
            Sletting av opplysninger når de ikke lenger er nødvendige, eller når
            du trekker tilbake samtykket ditt.
          </li>
          <li>
            Begrensning av behandlingen og rett til å protestere mot behandling
            som bygger på berettiget interesse.
          </li>
          <li>
            Dataportabilitet, det vil si å få utlevert opplysningene du har gitt
            oss i et maskinlesbart format.
          </li>
          <li>
            Klage til Datatilsynet (
            <a
              href="https://www.datatilsynet.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline underline-offset-2 hover:text-brown"
            >
              datatilsynet.no
            </a>
            ) dersom du mener vi behandler opplysningene dine i strid med
            regelverket.
          </li>
        </ul>
        <h3 className="font-space text-lg font-semibold text-brown mt-6 mb-3">
          Slik tar du kontakt
        </h3>
        <p className="font-inter text-base text-brown-mid leading-relaxed">
          For å utøve rettighetene dine, sender du en henvendelse til{" "}
          <a
            href="mailto:mail@wannado.no"
            className="text-teal underline underline-offset-2 hover:text-brown"
          >
            mail@wannado.no
          </a>
          . Vi svarer normalt innen 30 dager. Du trenger ikke begrunne hvorfor
          du ønsker innsyn, og det er kostnadsfritt å be om det.
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
        Denne personvernerklæringen kan oppdateres ved behov. Sist
        oppdatert: mars 2026.
      </p>
    ),
  },
];

export default function PersonvernPage() {
  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Personvern", path: "/personvern" },
        ])}
      />
      <Navbar variant="solid" />

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
