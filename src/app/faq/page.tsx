import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import FaqClient from "@/components/faq/FaqClient";
import {
  FALLBACK_FAQ_ITEMS,
  groupFaqItems,
  type FaqItem,
} from "@/lib/data/faq";
import { sanityFetch } from "@/sanity/lib/live";
import { allFaqItemsQuery, type SanityFaqItem } from "@/sanity/lib/content";
import { createBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const faqHeroStats = [
  ["24 t", "normal svartid"],
  ["5", "temaer samlet"],
  ["2005", "lokal erfaring"],
] as const;

const answerPaths = [
  {
    title: "Booking og pris",
    text: "Hvordan dere reserverer dato, hva som påvirker pris og når det lønner seg å ta direkte kontakt.",
  },
  {
    title: "Utstyr og nivå",
    text: "Hva som er inkludert på kajakktur, hva dere bør ha med og hvordan vi tilpasser etter erfaring.",
  },
  {
    title: "Sikkerhet og vær",
    text: "Hvordan vi vurderer forholdene, guider gruppen og håndterer flytting eller avlysning ved dårlig vær.",
  },
] as const;

function toFaqItems(items: SanityFaqItem[]): FaqItem[] {
  return items
    .map((item, index) => ({
      question: item.question,
      answer: item.answerText || "",
      category: item.category || "generelt",
      order: item.order ?? index,
    }))
    .filter((item) => item.question && item.answer);
}

export default async function FAQPage() {
  const { data: cmsFaqItems } = await sanityFetch({
    query: allFaqItemsQuery,
    perspective: "published",
  });

  const faqItems = toFaqItems((cmsFaqItems as SanityFaqItem[]) ?? []);
  const sourceItems = faqItems.length > 0 ? faqItems : FALLBACK_FAQ_ITEMS;
  const faqCategories = groupFaqItems(sourceItems);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sourceItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd data={createBreadcrumbSchema([{ name: "FAQ", path: "/faq" }])} />
      <JsonLd data={faqJsonLd} />

      <Navbar />

      <section className="relative flex min-h-[680px] items-end overflow-hidden text-white md:min-h-[700px]">
        <Image
          src="/images/scraped/landscape/20230910_125202-scaled.jpg"
          alt="Listerskøyta Havsul ved kai i Arendal"
          fill
          priority
          loading="eager"
          className="object-cover object-[48%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/78 via-brown/48 to-brown/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(246,213,142,0.22),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32 md:pb-16 md:pt-36">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.35em] text-[#f6d58e] md:text-sm">
                Spørsmål og svar
              </p>
              <h1 className="font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
                Finn riktig svar før dere booker
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/88 md:text-xl">
                Her finner du praktiske svar om aktivitetene våre, booking,
                priser, sikkerhet og hva dere bør vite før turen starter.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#sporsmal-og-svar"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
                >
                  Se spørsmålene
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Spør oss direkte
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:max-w-3xl">
                {faqHeroStats.map(([value, label]) => (
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

            <div className="hidden border border-white/18 bg-white/12 p-5 backdrop-blur-md md:p-6 lg:block">
              <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#f6d58e]">
                Her får du avklart
              </p>
              <div className="grid gap-3">
                {answerPaths.map((item) => (
                  <div
                    key={item.title}
                    className="border border-white/14 bg-white/10 px-4 py-4"
                  >
                    <h2 className="font-space text-lg font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 font-inter text-sm leading-6 text-white/74">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqClient categories={faqCategories} />

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-[30px] bg-brown px-6 py-10 text-center md:px-10 md:py-12">
            <p className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.2em] text-sand/80">
              Finner du ikke svaret?
            </p>
            <h2 className="mb-4 font-space text-2xl font-bold text-white md:text-3xl">
              Vi hjelper deg gjerne
            </h2>
            <p className="mx-auto mb-6 max-w-lg font-inter text-base leading-relaxed text-white/70">
              Ta kontakt med oss direkte, så finner vi ut av det sammen. Vi svarer normalt innen 24 timer.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 font-inter text-sm font-semibold text-brown transition-colors duration-200 hover:bg-sand"
              >
                Kontakt oss
              </Link>
              <Link
                href="/booking"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-inter text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                Gå til booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
