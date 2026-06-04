import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CarouselSection from "@/components/sections/CarouselSection";
import BentoGridSection from "@/components/sections/BentoGridSection";
import TrustBar from "@/components/sections/TrustBar";
import ScrollVideoSection from "@/components/sections/ScrollVideoSection";
import FeatureSection from "@/components/sections/FeatureSection";
import PeopleSection from "@/components/sections/PeopleSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import VideoBanner from "@/components/ui/VideoBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { mergeTeamProfiles } from "@/lib/data/team";
import { splitTestimonials } from "@/lib/data/testimonials";
import { sanityFetch } from "@/sanity/lib/live";
import {
  homePageQuery,
  testimonialsQuery,
  teamMembersQuery,
  type SanityHomePage,
  type SanityTestimonial,
  type SanityTeamMember,
} from "@/sanity/lib/content";

const homeFallback = {
  title: "Wannado - Aktiviteter og opplevelser i Arendal og Sørlandet",
  description:
    "Aktiviteter og opplevelser i Arendal og på Sørlandet: seilturer med Listerskøyta Havsul, kajakkturer og kurs, hesteopplevelser, teambuilding og foredrag.",
  image: "/images/baat-fb.jpg",
  imageAlt: "Listerskøyta Havsul under seil i Arendals skjærgård",
};

const serviceRoutes: Record<string, string> = {
  foredrag: "/foredrag",
  gavekort: "/gavekort",
  hesteopplevelser: "/opplevelser/hesteopplevelser",
  kajakkturer: "/kajakkturer",
  seilturer: "/seilturer",
  teambuilding: "/teambuilding",
  utleie: "/utleie/kajakk-og-kano-utleie",
};

const categoryLabels: Record<string, string> = {
  foredrag: "Inspirasjon",
  gavekort: "Gavekort",
  hest: "Hest",
  kajakk: "Kajakk",
  kurs: "Kurs",
  seiltur: "Seilturer",
  teambuilding: "Bedrifter",
  utleie: "Utleie",
};

async function getHomePage() {
  try {
    const { data } = await sanityFetch({
      query: homePageQuery,
      perspective: "published",
    });

    return data as SanityHomePage | null;
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const homePage = await getHomePage();
  const seo = homePage?.seo;

  return createPageMetadata({
    title: seo?.title || homeFallback.title,
    description: seo?.description || homeFallback.description,
    path: "/",
    image: seo?.imageUrl || homePage?.hero?.posterImageUrl || homeFallback.image,
    imageAlt: seo?.imageAlt || homePage?.hero?.posterImageAlt || homeFallback.imageAlt,
    noIndex: seo?.noIndex == true,
  });
}

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Wannado",
  description:
    "Opplevelser i Arendals skjærgård, seilturer, kajakkturer, teambuilding og foredrag",
  url: "https://wannado.no",
  telephone: "+4799469957",
  email: "mail@wannado.no",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Skarestrand 11",
    addressLocality: "Kongshavn",
    postalCode: "4812",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 58.4328,
    longitude: 8.8428,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "21:00",
  },
  sameAs: [
    "https://www.facebook.com/wannado",
    "https://www.instagram.com/wannado",
  ],
};

const homeVideoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Seiltur med Listerskøyta Havsul i Arendals skjærgård",
  description:
    "Klipp fra en seiltur med den restaurerte Listerskøyta Havsul forbi fyr og holmer i Arendals skjærgård.",
  thumbnailUrl: absoluteUrl("/images/scraped/landscape/homborsund-fyr.jpg"),
  uploadDate: "2026-03-31",
  contentUrl: absoluteUrl("/videos/havsul-clip-05-fyrtarn.mp4"),
};

async function getTeamProfiles() {
  try {
    const { data } = await sanityFetch({
      query: teamMembersQuery,
      perspective: "published",
    });

    return mergeTeamProfiles((data as SanityTeamMember[]) ?? []);
  } catch {
    return mergeTeamProfiles();
  }
}

async function getReferenceTestimonials() {
  try {
    const { data } = await sanityFetch({
      query: testimonialsQuery,
      perspective: "published",
    });

    return splitTestimonials((data as SanityTestimonial[]) ?? []);
  } catch {
    return splitTestimonials();
  }
}

export default async function Home() {
  const [homePage, teamProfiles, references] = await Promise.all([
    getHomePage(),
    getTeamProfiles(),
    getReferenceTestimonials(),
  ]);
  const featuredItems =
    homePage?.featuredServices
      ?.filter((service) => service?.title && service?.slug && service?.imageUrl)
      .map((service) => ({
        badge: categoryLabels[service.category || ""] || "Opplevelse",
        title: service.title || "Opplevelse",
        desc: service.summary || "En gøy opplevelse med Wannado på Sørlandet.",
        price: service.priceText || "Be om forslag og pris",
        img: service.imageUrl || "/images/havsul.jpg",
        alt: service.imageAlt || service.title || "Opplevelse med Wannado",
        href: serviceRoutes[service.slug || ""] || "/opplevelser",
      })) ?? null;

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd data={homeJsonLd} />
      <JsonLd data={homeVideoJsonLd} />
      <Navbar />
      <HeroSection
        heading={homePage?.hero?.heading}
        rotatingWords={homePage?.hero?.rotatingWords}
        intro={homePage?.hero?.intro}
        primaryCtaLabel={homePage?.hero?.primaryCtaLabel}
        primaryCtaHref={homePage?.hero?.primaryCtaHref}
        posterImageUrl={homePage?.hero?.posterImageUrl}
        posterImageAlt={homePage?.hero?.posterImageAlt}
      />
      <TrustBar />
      <CarouselSection
        eyebrow={homePage?.featuredIntro?.eyebrow}
        title={homePage?.featuredIntro?.title}
        items={featuredItems}
      />
      <ScrollVideoSection />
      <BentoGridSection />

      {/* Fyrtårn - cinematisk pusterom mellom BentoGrid og Feature */}
      <VideoBanner
        src="/videos/havsul-clip-05-fyrtarn.mp4"
        height="h-[40vh]"
        overlay="dark"
      />

      <FeatureSection />

      {/* Ankomst Merdø - stort cinematisk moment før People */}
      <VideoBanner
        src="/videos/havsul-clip-06-merdo-ankomst.mp4"
        height="h-[60vh]"
        overlay="dark"
      >
        <p className="font-dm text-lg italic text-white/80 md:text-xl">
          Velkommen ombord
        </p>
      </VideoBanner>

      <PeopleSection people={teamProfiles} />

      {/* Vanndetalj - rolig overgang til testimonials */}
      <VideoBanner
        src="/videos/havsul-clip-03-vanndetalj.mp4"
        height="h-[30vh]"
        overlay="light"
      />

      <TestimonialsSection
        testimonials={references.testimonials}
        tripadvisorFeedback={references.tripadvisorFeedback}
      />
      <Footer />
    </main>
  );
}
