"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const faqCategories = [
  {
    id: "generelt",
    label: "Generelt",
    items: [
      {
        question: "Hva tilbyr Wannado?",
        answer:
          "Wannado tilbyr kajakkturer, seilturer med Listerskøyta Havsul, teambuilding for bedrifter, hesteopplevelser, kurs og foredrag. Vi holder til i Arendal-regionen og har over 15 års erfaring.",
      },
      {
        question: "Hvor holder dere til?",
        answer:
          "Vi har base i Skarestrand 11, 4812 Kongshavn i Arendal-regionen. De fleste opplevelsene har utgangspunkt i Arendals skjærgård, men vi kan tilpasse oss andre lokasjoner etter avtale.",
      },
      {
        question: "Når er sesongen?",
        answer:
          "Hovedsesongen er mai til september for utendørsaktiviteter. Kajakkurs og foredrag arrangeres året rundt.",
      },
    ],
  },
  {
    id: "booking",
    label: "Booking og priser",
    items: [
      {
        question: "Hvordan booker jeg en opplevelse?",
        answer:
          "Du kan sende en forespørsel via booking-siden vår, ringe oss direkte eller bruke kontaktskjemaet. Vi svarer normalt innen 24 timer.",
      },
      {
        question: "Hva koster det?",
        answer:
          "Prisene varierer etter type opplevelse, antall deltakere og varighet. Seilturer starter fra 350 kr per person. Teambuilding fra 4 500 kr. Kontakt oss for en skreddersydd pris.",
      },
      {
        question: "Må vi booke lang tid i forveien?",
        answer:
          "Populære datoer fylles raskt, spesielt i sommerhalvåret. Send forespørsel så tidlig som mulig, men ta kontakt selv om det haster.",
      },
    ],
  },
  {
    id: "kajakk",
    label: "Kajakk",
    items: [
      {
        question: "Trenger jeg erfaring for å bli med på kajakktur?",
        answer:
          "Nei, vi tilpasser turene etter gruppens nivå. Nybegynnere får grundig opplæring i sikkerhet og padleteknikk før vi legger ut på tur.",
      },
      {
        question: "Hva er våttkort?",
        answer:
          "Våttkort er et sertifikat som dokumenterer at du har grunnleggende sikkerhetskunnskaper for padling i kaldt vann. Det inngår i våre nybegynnerkurs.",
      },
      {
        question: "Hva bør jeg ha med på kajakktur?",
        answer:
          "Vi stiller med kajakk, åre, vest og spruttrekk. Du bør ha med klær som tåler å bli våte, solkrem, drikke og eventuelt ekstra skift.",
      },
    ],
  },
  {
    id: "teambuilding",
    label: "Teambuilding og bedrift",
    items: [
      {
        question: "Hva inkluderer et teambuilding-opplegg?",
        answer:
          "Vi skreddersyr opplegget etter deres mål. Det kan inkludere kajakkpadling, seiltur, JTI-personlighetstest, øvelser på land og refleksjon underveis.",
      },
      {
        question: "Hvor mange kan delta?",
        answer:
          "Vi tar imot grupper fra 4 til 50 personer. For større grupper samarbeider vi med andre aktører.",
      },
      {
        question: "Kan dere komme til vår bedrift?",
        answer:
          "Ja, vi kan holde foredrag og JTI-workshops hos dere, eller legge opp til en dag med aktiviteter i Arendal-regionen.",
      },
    ],
  },
  {
    id: "sikkerhet",
    label: "Sikkerhet",
    items: [
      {
        question: "Er det trygt å padle med Wannado?",
        answer:
          "Ja, sikkerhet har høyeste prioritet. Alle guider har relevant opplæring, vi bruker godkjent utstyr, og vi tilpasser alltid turene etter vær- og føreforhold.",
      },
      {
        question: "Hva skjer hvis været er dårlig?",
        answer:
          "Vi følger med på værmeldingen og kan flytte eller avlyse turer ved behov. Dere får alltid beskjed i god tid og tilbud om ny dato eller refusjon.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-space text-lg font-semibold text-brown pr-6 group-hover:text-teal transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brown-mid shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="pb-5">
              <p className="font-inter text-base text-brown-mid leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

  const toggleItem = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <section className="bg-brown pt-36 pb-12 md:pt-40 md:pb-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.24em] text-sand/80 mb-4">
            Spørsmål og svar
          </p>
          <h1 className="font-space text-4xl md:text-5xl font-bold text-white leading-tight">
            Ofte stilte spørsmål
          </h1>
          <p className="font-inter text-lg text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Her finner du svar på det meste om aktivitetene våre, booking, priser og sikkerhet.
          </p>
        </div>
      </section>

      <section className="bg-warm-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`font-inter text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === category.id
                    ? "bg-brown text-white"
                    : "bg-white text-brown-mid border border-border hover:border-teal/40 hover:text-teal"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex-grow py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-6">
          {currentCategory && (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-border shadow-sm px-6 md:px-8"
            >
              <h2 className="font-space text-2xl font-bold text-brown py-5 border-b border-border">
                {currentCategory.label}
              </h2>
              {currentCategory.items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems[`${currentCategory.id}-${index}`] ?? false}
                  onToggle={() => toggleItem(currentCategory.id, index)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-[30px] bg-brown px-6 py-10 md:px-10 md:py-12 text-center">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-sand/80 mb-3">
              Finner du ikke svaret?
            </p>
            <h2 className="font-space text-2xl md:text-3xl font-bold text-white mb-4">
              Vi hjelper deg gjerne
            </h2>
            <p className="font-inter text-base text-white/70 leading-relaxed mb-6 max-w-lg mx-auto">
              Ta kontakt med oss direkte, så finner vi ut av det sammen. Vi svarer normalt innen 24 timer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-inter text-sm font-semibold text-brown transition-colors duration-200 hover:bg-sand"
              >
                Kontakt oss
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-inter text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
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
