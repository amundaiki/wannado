import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/sections/PageHero";
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

const goodToKnow = [
  {
    question: "Hvor er oppmøtestedet?",
    answer:
      "Kajakkturer og kurs har oppmøte ved Skarestrand 11, 4812 Kongshavn, der det er god parkering rett ved stranda. Seilturer med Listerskøyta Havsul starter fra Pollen i Arendal sentrum. For teambuilding og bedriftsopplegg avtaler vi oppmøtested i god tid før arrangementet, og dere får detaljert beskjed i bookingbekreftelsen.",
  },
  {
    question: "Hva skjer ved dårlig vær?",
    answer:
      "Vi følger værmeldingen tett og legger sikkerheten først. Blir forholdene for krevende, flytter vi turen til en ny dato eller finner et trygt alternativ i skjermet farvann. Dere får alltid beskjed i god tid, og ingen blir sendt ut i forhold vi vurderer som utrygge. Mange aktiviteter går fint hele året fordi vi har tørrdrakter og tilpasser ruten.",
  },
  {
    question: "Hvordan fungerer avbestilling?",
    answer:
      "Avbestillingsvilkår og betalingsfrister avtales ved booking og varierer med hvilken opplevelse du velger. På enkelte turer og ekspedisjoner kan forhåndsbetaling være aktuelt. Ta kontakt før du booker, så går vi gjennom hva som gjelder for akkurat din tur. Avlyser vi turen på grunn av vær, tilbyr vi ny dato eller refusjon.",
  },
  {
    question: "Hva bør jeg ha med?",
    answer:
      "På kajakktur stiller vi med kajakk, åre, vest og tørrdrakt når det trengs. Du bør ha med klesskift, vannflaske og solkrem om sommeren, samt klær som tåler å bli våte. På seiltur anbefaler vi vindtett ytterlag og klær etter været. Vi sier alltid fra på forhånd hvis en aktivitet krever noe spesielt utstyr.",
  },
  {
    question: "Finnes det aldersgrenser?",
    answer:
      "Mange av opplevelsene passer for både barn, ungdom og voksne, men noen aktiviteter har nedre aldersgrense av sikkerhetshensyn. Vi tilpasser alltid nivå og opplegg etter gruppen. Er dere usikre på om turen passer for de yngste eller eldste i følget, ta kontakt så finner vi en løsning som er trygg for alle.",
  },
  {
    question: "Hvor trygt er det?",
    answer:
      "Sikkerhet har høyeste prioritet. Roar er Veileder Hav, det høyeste nivået i Norges Padleforbund, og godkjent for inntil tolv passasjerer. Vi bruker godkjent utstyr, gjennomgår sikkerheten før hver tur og tilpasser ruten etter vær, vind og deltakernes nivå. Du deltar på eget ansvar, og vi anbefaler at hver gjest selv sørger for reise- og ulykkesforsikring.",
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
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd data={createBreadcrumbSchema([{ name: "FAQ", path: "/faq" }])} />
      <JsonLd data={faqJsonLd} />

      <Navbar />

      <PageHero
        image="/images/scraped/landscape/20230910_125202-scaled.jpg"
        imageAlt="Listerskøyta Havsul ved kai i Arendal"
        imagePosition="48% 50%"
        eyebrow="Spørsmål og svar"
        title="Finn riktig svar før dere booker"
        intro="Her finner du praktiske svar om aktivitetene våre, booking, priser, sikkerhet og hva dere bør vite før turen starter."
        primary={{ label: "Se spørsmålene", href: "#sporsmal-og-svar" }}
        secondary={{ label: "Spør oss direkte", href: "/kontakt" }}
        facts={faqHeroStats}
        aside={
          <>
            <p className="mb-4 font-body text-xs font-semibold text-teal">
              Her får du avklart
            </p>
            <div className="grid gap-3">
              {answerPaths.map((item) => (
                <div
                  key={item.title}
                  className="rounded-control border border-border bg-white px-4 py-4"
                >
                  <h2 className="font-display text-lg font-bold text-brown">
                    {item.title}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-6 text-brown-mid">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
      />

      <FaqClient categories={faqCategories} />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-inter text-sm font-semibold text-teal">
            Greit å vite
          </p>
          <h2 className="mt-3 font-space text-3xl font-bold text-brown md:text-4xl">
            Det folk lurer mest på før de drar
          </h2>
          <p className="mt-5 font-inter text-base leading-relaxed text-brown-mid">
            Her samler vi de praktiske svarene om oppmøte, vær, avbestilling,
            utstyr, aldersgrenser og sikkerhet. Lurer du på noe som ikke står
            her, er du alltid velkommen til å ta kontakt med oss.
          </p>

          <div className="mt-10 space-y-8">
            {goodToKnow.map((item) => (
              <div key={item.question}>
                <h3 className="font-space text-xl font-bold text-brown">
                  {item.question}
                </h3>
                <p className="mt-3 font-inter text-base leading-relaxed text-brown-mid">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-card bg-brown px-6 py-10 text-center md:px-10 md:py-12">
            <p className="mb-3 font-inter text-sm font-semibold text-sand/80">
              Finner du ikke svaret?
            </p>
            <h2 className="mb-4 font-space text-2xl font-bold text-white md:text-3xl">
              Vi hjelper deg gjerne
            </h2>
            <p className="mx-auto mb-6 max-w-lg font-inter text-base leading-relaxed text-white/70">
              Ta kontakt med oss direkte, så finner vi ut av det sammen. Vi svarer så fort vi kan.
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
