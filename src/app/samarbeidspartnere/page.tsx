import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/sections/PageHero";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Samarbeidspartnere | Wannado",
  description:
    "Wannado samarbeider med lokale aktører på Sørlandet for å levere unike naturopplevelser. Møt våre partnere innen opplevelser, overnatting, utstyr og mer.",
  path: "/samarbeidspartnere",
  image: "/images/scraped/landscape/20230910_125202-scaled.jpg",
  imageAlt: "Havsul i Arendal med lokale samarbeidspartnere rundt havna",
});

const partnerHighlights = [
  {
    title: "Opplevelser ute",
    description:
      "Aktiviteter, nasjonalpark, gjestehavn og lokale guider som gjør opplegget rikere.",
    image: "/images/scraped/activities/klatreparkinngang.jpg",
    imageAlt: "Klatrepark og aktivitetspartner i skogen",
  },
  {
    title: "Sjø og skjærgård",
    description:
      "Båter, havner og padlemiljø som gir gjestene trygg tilgang til Sørlandskysten.",
    image: "/images/scraped/landscape/20230910_125202-scaled.jpg",
    imageAlt: "Havsul ved kai i Arendal",
  },
  {
    title: "Mat, overnatting og utstyr",
    description:
      "Lokale hoteller, leverandører og matpartnere gjør større grupper enklere å samle.",
    image: "/images/scraped/landscape/20100727-Strandhugg-pa-Maerdo.jpg",
    imageAlt: "Kajakker på strand ved Sørlandskysten",
  },
] as const;

const partnerStats = [
  ["20+", "lokale aktører"],
  ["4", "partnerområder"],
  ["Agder", "lokale røtter"],
] as const;

const opplevelsespartnere = [
  { name: "TrollPark Hove", description: "Klatrepark og aktiviteter på Tromøy for store og små" },
  { name: "Raet Nasjonalpark", description: "Nasjonalparksamarbeid for unike friluftsopplevelser" },
  { name: "Arendal Gjestehavn", description: "Gjestehavn i hjertet av Arendal" },
  { name: "Arendal Turistkontor", description: "Turistinformasjon og veiledning for besøkende" },
  { name: "DNT Aust Agder", description: "Friluftsliv og turopplevelser i Agder" },
  { name: "DNT Sør", description: "Friluftsliv og turopplevelser på Sørlandet" },
  { name: "Norges Padleforbund", description: "Padlesport og kompetanseutvikling" },
  { name: "MS Torungen", description: "Båtruter og sjøopplevelser i Arendalsområdet" },
];

const overnattingOgMat = [
  { name: "Bokhotellet Lyngørporten", description: "Unikt bokhotell i vakre Lyngør" },
  { name: "Strand Hotell Fevik", description: "Koselig hotell ved sjøen på Fevik" },
  { name: "Clarion Hotell Tyholmen", description: "Moderne hotell i historiske omgivelser i Arendal" },
  { name: "Hotell Norge Lillesand", description: "Sjarmerende hotell i hvite Sørlandet" },
  { name: "Krøgeneslåven", description: "Landlig overnatting med sjel" },
  { name: "Bjellandstrand", description: "Idyllisk overnatting ved stranden" },
  { name: "Smag og Behag Grimstad", description: "Mat og catering med lokale råvarer" },
];

const utstyrsleverandorer = [
  { name: "Eian Fritid", description: "Kvalitets friluftsutstyr for alle eventyr" },
  { name: "Padlespesialisten", description: "Spesialbutikk for kajakk og padleutstyr" },
  { name: "Nordic Outdoor", description: "Friluftsutstyr for krevende forhold" },
];

const andrePartnere = [
  { name: "Holla Islandshestgård", description: "Unike hesteopplevelser med islandshester" },
  { name: "Mindline", description: "Samarbeidspartner innen utvikling og rådgivning" },
];

function PartnerCard({ name, description }: { name: string; description: string }) {
  return (
    <article
      className="rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      <h3 className="font-space text-lg font-semibold text-brown">
        {name}
      </h3>
      <p className="mt-2 font-inter text-sm text-brown-mid/80 leading-relaxed">
        {description}
      </p>
    </article>
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
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Samarbeidspartnere", path: "/samarbeidspartnere" },
        ])}
      />
      <Navbar />

      <PageHero
        image="/images/scraped/landscape/20230910_125202-scaled.jpg"
        imageAlt="Havsul ved kai i Arendal sentrum"
        imagePosition="52% 50%"
        eyebrow="Samarbeid"
        title="Lokale partnere som gjør opplevelsene større"
        intro="Når gjester, bedrifter og grupper kommer til Sørlandet, kobler vi aktivitetene våre med lokale aktører innen natur, overnatting, utstyr og vertskap."
        primary={{ label: "Se partnerne", href: "#partneroversikt" }}
        secondary={{ label: "Snakk om samarbeid", href: "/kontakt" }}
        facts={partnerStats}
      />

      {/* Intro */}
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.3em] text-teal">
              Lokalt vertskap
            </p>
            <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-4xl">
              Et nettverk rundt hele opplevelsen
            </h2>
            <p className="mt-5 font-inter text-base leading-7 text-brown-mid md:text-lg">
              Hos Wannado tror vi på kraften i samarbeid. Lokale partnere gjør
              det enklere å sette sammen turer, kurs, teambuilding, overnatting
              og mat på en måte som faktisk henger sammen for gjestene.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {partnerHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="overflow-hidden border border-border bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={highlight.image}
                    alt={highlight.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-space text-xl font-semibold text-brown">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm leading-6 text-brown-mid">
                    {highlight.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partner sections */}
      <section id="partneroversikt" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
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
            className="inline-block bg-brown text-white font-inter font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-brown-hover transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
