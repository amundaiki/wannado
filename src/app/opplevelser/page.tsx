import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { allServicesQuery, type SanityService } from "@/sanity/lib/content";

export const metadata = createPageMetadata({
  title: "Aktiviteter og opplevelser i Arendal | Wannado",
  description:
    "Aktiviteter i Arendal for hele gruppen: seilturer med Havsul, kajakkturer og kurs, teambuilding og foredrag i Arendals skjærgård. Book opplevelsen din i dag.",
  path: "/opplevelser",
  image: "/images/havsul.jpg",
  imageAlt: "Opplevelser med Wannado i Arendals skjærgård",
});

const serviceFallbacks: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
    href: string;
    alt: string;
    badge: string;
  }
> = {
  seilturer: {
    title: "Seilturer",
    description:
      "Seil med Listerskøyta Havsul fra 1933 og opplev Arendals maritime historie fra sjøsiden.",
    image: "/images/baat-fb.jpg",
    href: "/seilturer",
    alt: "Listerskøyta Havsul under seil i Arendals skjærgård",
    badge: "Sjø og historie",
  },
  kajakkturer: {
    title: "Kajakkturer og kurs",
    description:
      "Padl i Arendals vakre skjærgård. Fra introduksjonskurs med våttkort til avanserte ekspedisjoner.",
    image: "/images/kajakk-kurs-bilde.jpg",
    href: "/kajakkturer",
    alt: "Kajakkpadlere i skjærgården ved Arendal",
    badge: "Kajakk",
  },
  skjaergardsafari: {
    title: "Skjærgårdssafari",
    description:
      "Guidet kajakkopplevelse i Arendals skjærgård, med trygg veiledning og rute etter vær, vind og nivå.",
    image: "/images/scraped/kayak/kajakktur-strandhotell-4015.jpg",
    href: "/opplevelser/skjaergardsafari",
    alt: "Guidet kajakktur i skjærgården ved Arendal",
    badge: "Guidet tur",
  },
  teambuilding: {
    title: "Teambuilding",
    description:
      "Opplevelser som styrker samarbeid. Aktiviteter, konkurranser og fagdager for bedrifter og grupper.",
    image: "/images/scraped/teambuilding/Bungeerunning-7607.jpg",
    href: "/teambuilding",
    alt: "Teambuilding med Wannado i Arendal",
    badge: "Bedrift",
  },
  foredrag: {
    title: "Foredrag",
    description:
      "Inspirerende foredrag om personlighet, samarbeid og ekspedisjoner. Perfekt alene eller som del av en fagdag.",
    image: "/images/gronland-kajakk-3.jpg",
    href: "/foredrag",
    alt: "Foredrag og inspirasjon med Wannado",
    badge: "Fag og inspirasjon",
  },
  utleie: {
    title: "Kajakk- og kanoutleie",
    description:
      "Lei kajakk eller kano fra Skarestrand og utforsk skjærgården på egen hånd.",
    image: "/images/utleie-bilde.jpg",
    href: "/utleie/kajakk-og-kano-utleie",
    alt: "Kajakker klare for utleie ved Skarestrand",
    badge: "Utleie",
  },
  gavekort: {
    title: "Gavekort",
    description:
      "Gi bort en opplevelse på sjøen, i kajakk eller som skreddersydd Wannado-eventyr.",
    image: "/images/havsul.jpg",
    href: "/gavekort",
    alt: "Gavekort på opplevelser med Wannado",
    badge: "Gave",
  },
  hesteopplevelser: {
    title: "Hesteopplevelser",
    description:
      "Mestringsbyggende opplevelser med islandshester, natur og trygg veiledning.",
    image: "/images/scraped/horses/hesteopplevelser-bilde.jpg",
    href: "/opplevelser/hesteopplevelser",
    alt: "Ridetur på islandshest langs kysten på Sørlandet",
    badge: "Hest",
  },
};

const fallbackCategories = [
  {
    title: "Seilturer",
    description:
      "Seil med Listerskøyta Havsul fra 1933 og opplev Arendals maritime historie fra sjøsiden.",
    image: "/images/baat-fb.jpg",
    href: "/seilturer",
    alt: "Listerskøyta Havsul under seil i Arendals skjærgård",
  },
  {
    title: "Kajakkturer og kurs",
    description:
      "Padl i Arendals vakre skjærgård. Fra introduksjonskurs med våttkort til avanserte ekspedisjoner.",
    image: "/images/kajakk-kurs-bilde.jpg",
    href: "/kajakkturer",
    alt: "Kajakkpadlere i skjærgården ved Arendal",
  },
  {
    title: "Skjærgårdssafari",
    description:
      "Guidet kajakkopplevelse i Arendals skjærgård, med trygg rute og utstyr inkludert.",
    image: "/images/scraped/kayak/kajakktur-strandhotell-4015.jpg",
    href: "/opplevelser/skjaergardsafari",
    alt: "Guidet kajakktur i skjærgården ved Arendal",
  },
  {
    title: "Teambuilding",
    description:
      "Opplevelser som styrker samarbeid. Aktiviteter, konkurranser og fagdager for bedrifter og grupper.",
    image: "/images/tp-typeteori.jpg",
    href: "/teambuilding",
    alt: "Teambuilding med Wannado i Arendal",
  },
  {
    title: "Foredrag",
    description:
      "Inspirerende foredrag om personlighet, samarbeid og ekspedisjoner. Perfekt alene eller som del av en fagdag.",
    image: "/images/gronland-kajakk-3.jpg",
    href: "/foredrag",
    alt: "Foredrag og inspirasjon med Wannado",
  },
].map((item) => ({ ...item, badge: "Opplevelse" }));

const preferredOrder = [
  "seilturer",
  "kajakkturer",
  "skjaergardsafari",
  "teambuilding",
  "foredrag",
  "utleie",
  "gavekort",
  "hesteopplevelser",
];

const supplementalServiceSlugs = ["skjaergardsafari"] as const;

export const dynamic = "force-dynamic";

type ServiceCard = {
  title: string;
  description: string;
  image: string;
  href: string;
  alt: string;
  badge: string;
  slug: string;
};

function serviceHref(slug?: string | null) {
  if (!slug) {
    return "/kontakt";
  }

  return serviceFallbacks[slug]?.href || `/kontakt?tjeneste=${encodeURIComponent(slug)}`;
}

function createServiceCard(service: SanityService): ServiceCard {
  const fallback = serviceFallbacks[service.slug || ""];

  return {
    title: service.title || fallback?.title || "Opplevelse",
    description: service.summary || fallback?.description || "",
    image: service.imageUrl || fallback?.image || "/images/havsul.jpg",
    href: serviceHref(service.slug),
    alt: service.imageAlt || fallback?.alt || service.title,
    badge: fallback?.badge || service.category || "Opplevelse",
    slug: service.slug || service._id,
  };
}

function createFallbackServiceCard(slug: keyof typeof serviceFallbacks): ServiceCard {
  const fallback = serviceFallbacks[slug];

  return {
    ...fallback,
    slug,
  };
}

function sortServiceCards(cards: ServiceCard[]) {
  return cards.sort((a, b) => {
    const aIndex = preferredOrder.indexOf(a.slug);
    const bIndex = preferredOrder.indexOf(b.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
}

function createOpplevelserJsonLd(serviceCards: ServiceCard[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Opplevelser i Arendal",
        url: absoluteUrl("/opplevelser"),
        description:
          "Seilturer, kajakkturer, kajakkurs, teambuilding, foredrag, utleie, gavekort og hesteopplevelser hos Wannado.",
        isPartOf: {
          "@type": "WebSite",
          name: "Wannado",
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "ItemList",
        name: "Wannado opplevelser",
        numberOfItems: serviceCards.length,
        itemListElement: serviceCards.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(service.href.startsWith("/") ? service.href : "/kontakt"),
          name: service.title,
          description: service.description,
        })),
      },
    ],
  };
}

export default async function OpplevelserPage() {
  const { data: services } = await sanityFetch({
    query: allServicesQuery,
    perspective: "published",
  });

  const publishedServices = (services || []) as SanityService[];
  const publishedCards = publishedServices.map(createServiceCard);
  const supplementalCards = supplementalServiceSlugs.map(createFallbackServiceCard);
  const serviceCards: ServiceCard[] =
    publishedServices.length > 0
      ? sortServiceCards([...publishedCards, ...supplementalCards])
      : fallbackCategories.map((item) => ({ ...item, slug: item.href }));

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Opplevelser", path: "/opplevelser" },
        ])}
      />
      <JsonLd data={createOpplevelserJsonLd(serviceCards)} />
      <Navbar variant="solid" />

      <PageHero
        image="/images/scraped/sailing/baat-fb-havsul.jpg"
        imageAlt="Listerskøyta Havsul på sjøen med Wannado-opplevelser i Arendal"
        imagePosition="54% 42%"
        eyebrow="Opplevelser i Arendal"
        title="Aktiviteter og opplevelser i Arendal"
        intro="Finn turen som passer gruppen din. Seil med Havsul, padle i skjærgården, samle kollegaer rundt teambuilding eller gi bort en opplevelse som varer lenger enn ting. Alt sammen i Arendals skjærgård på Sørlandet."
        primary={{ label: "Bestill opplevelse", href: "/booking" }}
        secondary={{ label: "Se alle opplevelser", href: "#opplevelseskort" }}
        aside={
          <>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Rask veiviser
            </p>
            <div className="mt-5 grid gap-3">
              {[
                ["Privat tur", "Seiltur, kajakk eller gavekort"],
                ["Bedrift", "Teambuilding, foredrag og fagdag"],
                ["Kurs", "Våttkort, kajakk og hestekurs"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-white p-4"
                >
                  <p className="font-space text-lg font-bold text-brown">
                    {title}
                  </p>
                  <p className="mt-1 font-inter text-sm leading-relaxed text-brown-mid">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
      />

      {/* Category Grid */}
      <section
        id="opplevelseskort"
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="mb-10 max-w-3xl">
          <h2 className="font-space text-3xl font-bold text-brown md:text-5xl">
            Fra rolig skjærgårdsdag til energisk gruppetur
          </h2>
          <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
            Alle opplevelser kan tilpasses nivå, årstid og gruppe. Bruk kortene
            for å finne riktig retning, eller send en åpen forespørsel.
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
            På sjøen seiler du med Listerskøyta Havsul fra 1933 og opplever
            Arendals maritime historie fra vannet. I kajakken padler du i den
            skjermede skjærgården, enten du tar introduksjonskurs med våttkort,
            blir med på en guidet skjærgårdssafari eller satser på en lengre
            ekspedisjon. For bedrifter og grupper setter vi sammen teambuilding
            og fagdager som styrker samarbeid, og vi holder inspirerende foredrag
            om personlighet og ekspedisjonsliv. Vil du utforske på egen hånd,
            leier du kajakk eller kano fra Skarestrand. Hesteopplevelsene med
            islandshester bygger mestring i rolige rammer, og et gavekort lar deg
            gi bort en opplevelse i stedet for en ting.
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-brown-mid md:text-lg">
            Felles for alt vi gjør er trygge rammer, lokal kjennskap til
            farvannet og guider med høy kompetanse. Vi tilpasser ruten etter vær
            og sesong, så du kan oppleve Sørlandskysten på en måte som passer
            akkurat din gruppe. Er du usikker på hva som passer best, ringer du
            oss gjerne for en uforpliktende prat.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((cat, index) => (
            <Link
              key={cat.slug || cat.href}
              href={cat.href}
              className="group relative block h-[360px] overflow-hidden rounded-2xl border border-white/10 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:h-[420px]"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                loading={index === 0 ? "eager" : undefined}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-[0.22em] text-sand">
                  {cat.badge}
                </p>
                <h3 className="font-space text-2xl md:text-3xl font-bold text-white mb-2">
                  {cat.title}
                </h3>
                <p className="font-inter text-sm md:text-base text-white leading-relaxed max-w-sm mb-4">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-sand group-hover:gap-3 transition-colors">
                  Utforsk
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-warm-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="mx-auto mb-5 h-8 w-8 text-teal" aria-hidden="true" />
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown mb-4">
            Ikke sikker? Ring oss!
          </h2>
          <p className="font-inter text-lg text-brown-mid max-w-xl mx-auto mb-10">
            Vi hjelper deg gjerne med å finne den perfekte opplevelsen for din
            gruppe. Fortell oss hva dere drømmer om, så fikser vi resten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-1">
                Seilturer og teambuilding
              </p>
              <a
                href="tel:+4799469957"
                className="inline-flex items-center justify-center gap-2 font-space text-2xl font-bold text-brown transition-colors hover:text-teal"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                +47 99 46 99 57
              </a>
              <p className="font-inter text-sm text-brown-muted mt-1">
                Tone Pernille
              </p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border" />
            <div className="text-center">
              <p className="font-inter text-xs font-semibold text-brown-muted uppercase tracking-[2px] mb-1">
                Kajakk og kurs
              </p>
              <a
                href="tel:+4794826710"
                className="inline-flex items-center justify-center gap-2 font-space text-2xl font-bold text-brown transition-colors hover:text-teal"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                +47 94 82 67 10
              </a>
              <p className="font-inter text-sm text-brown-muted mt-1">
                Roar Laugerud
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button href="/kontakt?tjeneste=Kajakktur" variant="primary">
              Send forespørsel
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
