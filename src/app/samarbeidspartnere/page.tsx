import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samarbeidspartnere | Wannado",
  description:
    "Wannado samarbeider med lokale aktører på Sørlandet for å levere unike naturopplevelser. Møt våre partnere innen opplevelser, overnatting, utstyr og mer.",
};

const opplevelsespartnere = [
  { name: "TrollPark Hove", description: "Klatrepark og aktiviteter på Tromøy for store og små", href: "#" },
  { name: "Raet Nasjonalpark", description: "Nasjonalparksamarbeid for unike friluftsopplevelser", href: "#" },
  { name: "Arendal Gjestehavn", description: "Gjestehavn i hjertet av Arendal", href: "#" },
  { name: "Arendal Turistkontor", description: "Turistinformasjon og veiledning for besøkende", href: "#" },
  { name: "DNT Aust Agder", description: "Friluftsliv og turopplevelser i Agder", href: "#" },
  { name: "DNT Sør", description: "Friluftsliv og turopplevelser på Sørlandet", href: "#" },
  { name: "Norges Padleforbund", description: "Padlesport og kompetanseutvikling", href: "#" },
  { name: "MS Torungen", description: "Båtruter og sjøopplevelser i Arendalsområdet", href: "#" },
];

const overnattingOgMat = [
  { name: "Bokhotellet Lyngørporten", description: "Unikt bokhotell i vakre Lyngør", href: "#" },
  { name: "Strand Hotell Fevik", description: "Koselig hotell ved sjøen på Fevik", href: "#" },
  { name: "Clarion Hotell Tyholmen", description: "Moderne hotell i historiske omgivelser i Arendal", href: "#" },
  { name: "Hotell Norge Lillesand", description: "Sjarmerende hotell i hvite Sørlandet", href: "#" },
  { name: "Krøgeneslåven", description: "Landlig overnatting med sjel", href: "#" },
  { name: "Bjellandstrand", description: "Idyllisk overnatting ved stranden", href: "#" },
  { name: "Smag og Behag Grimstad", description: "Mat og catering med lokale råvarer", href: "#" },
];

const utstyrsleverandorer = [
  { name: "Eian Fritid", description: "Kvalitets friluftsutstyr for alle eventyr", href: "#" },
  { name: "Padlespesialisten", description: "Spesialbutikk for kajakk og padleutstyr", href: "#" },
  { name: "Nordic Outdoor", description: "Friluftsutstyr for krevende forhold", href: "#" },
];

const andrePartnere = [
  { name: "Holla Islandshestgård", description: "Unike hesteopplevelser med islandshester", href: "#" },
  { name: "Mindline", description: "Samarbeidspartner innen utvikling og rådgivning", href: "#" },
];

function PartnerCard({ name, description, href }: { name: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brown/30"
    >
      <h3 className="font-space text-lg font-semibold text-brown group-hover:text-teal transition-colors">
        {name}
      </h3>
      <p className="mt-2 font-inter text-sm text-brown-mid/80 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

function PartnerSection({ title, partners }: { title: string; partners: typeof opplevelsespartnere }) {
  return (
    <section className="mb-16">
      <h2 className="font-space text-2xl md:text-3xl font-bold text-brown mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} {...partner} />
        ))}
      </div>
    </section>
  );
}

export default function SamarbeidspartnerePage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-center px-6">
        <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-4">
          Samarbeid
        </p>
        <h1 className="font-space text-4xl md:text-6xl font-bold text-white">
          Samarbeidspartnere
        </h1>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="font-inter text-lg text-brown-mid leading-relaxed">
          Hos Wannado tror vi på kraften i samarbeid. Ved å samarbeide med lokale aktører
          kan vi levere rikere opplevelser, støtte lokalt næringsliv og skape verdier for
          hele Sørlandet. Våre partnere er en naturlig forlengelse av det vi står for:
          ekte naturopplevelser med lokale røtter.
        </p>
      </section>

      {/* Partner sections */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <PartnerSection title="Opplevelsespartnere" partners={opplevelsespartnere} />
        <PartnerSection title="Overnatting og mat" partners={overnattingOgMat} />
        <PartnerSection title="Utstyrsleverandører" partners={utstyrsleverandorer} />
        <PartnerSection title="Andre partnere" partners={andrePartnere} />
      </section>

      {/* CTA */}
      <section className="bg-warm-white border-y border-border py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-4">
            Bli med
          </p>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown mb-6">
            Bli samarbeidspartner?
          </h2>
          <p className="font-inter text-base text-brown-mid leading-relaxed mb-8">
            Vi er alltid på utkikk etter nye partnere som deler vår lidenskap for
            naturopplevelser og lokalt samarbeid. Ta kontakt for en uformell prat om
            hvordan vi kan skape noe sammen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-brown text-white font-inter font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-[#5a4838] transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
