import Navbar from "@/components/layout/Navbar";
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

      {/* Hero */}
      <section className="relative flex min-h-[760px] items-end overflow-hidden text-white md:min-h-[700px]">
        <Image
          src="/images/scraped/landscape/20230910_125202-scaled.jpg"
          alt="Havsul ved kai i Arendal sentrum"
          fill
          priority
          loading="eager"
          className="object-cover object-[52%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/72 via-brown/45 to-brown/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(246,213,142,0.18),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32 md:pb-16 md:pt-36">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.35em] text-[#f6d58e] md:text-sm">
                Samarbeid
              </p>
              <h1 className="font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
                Lokale partnere som gjør opplevelsene større
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/88 md:text-xl">
                Når gjester, bedrifter og grupper kommer til Sørlandet, kobler
                vi aktivitetene våre med lokale aktører innen natur,
                overnatting, utstyr og vertskap.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#partneroversikt"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
                >
                  Se partnerne
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Snakk om samarbeid
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              {partnerStats.map(([value, label]) => (
                <div
                  key={value}
                  className="border border-white/22 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
                >
                  <p className="font-space text-xl font-bold text-white sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 font-inter text-[11px] leading-4 text-white/72 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
