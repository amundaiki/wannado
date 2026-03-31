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

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Personvern</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Personvern og informasjonskapsler`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Nettsidene til Wannado inneholder sporingskoder fra tjenester som Google og Facebook. Informasjonen bruker vi til å forbedre innholdet og brukeropplevelsen på hjemmesiden, vise deg tilbud på tvers av ulike platformer.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Informasjonen lagres på din egen datamaskin i form av cookies (informasjonskapsler) som du selv administrerer og kan slette.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Søkestatistikk og informasjon om besøkte sider lagres hos henholdsvis Google og Facebook.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Dersom du er uenig denne praksisen kan du forlate nettstedet eller lese mer på Nettvett.no om hvordan du administrerer informasjonskapsler og beskytter deg mot målrettet annonsering og sporing.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hvis du ønsker å vite med anbefaler vi å lese mer her:`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{``}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Lovdata § 2-7 b – Bruk av informasjonskapsler/cookies`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{``}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Nettvett`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
