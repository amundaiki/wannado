import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GiftCardForm from "@/components/ui/GiftCardForm";

export const metadata: Metadata = {
  title: "Gavekort | Wannado",
  description:
    "Gi bort en uforglemmelig opplevelse med gavekort fra Wannado. Seilturer, kajakk-eventyr, teambuilding og mer. Vi lager personlige gavekort tilpasset mottakeren.",
  openGraph: {
    title: "Gavekort | Wannado",
    description:
      "Gi bort en uforglemmelig opplevelse med gavekort fra Wannado. Seilturer, kajakk-eventyr, teambuilding og mer.",
    images: ["/images/havsul.jpg"],
  },
};

const giftOptions = [
  {
    title: "Seilopplevelse",
    description:
      "Gi bort en tur med Listerskøyta Havsul gjennom Arendals vakre skjærgård. Passer for alle.",
    icon: "⛵",
  },
  {
    title: "Kajakk-eventyr",
    description:
      "En guidet kajakktur i skjærgården med kajakk, utstyr og erfaren guide inkludert.",
    icon: "🛶",
  },
  {
    title: "Teambuilding",
    description:
      "En uforglemmelig opplevelse for bedriften med aktiviteter på sjøen og land.",
    icon: "🤝",
  },
];

const steps = [
  {
    step: 1,
    title: "Velg opplevelse",
    description: "Fyll ut skjemaet under med ønsket type gavekort og mottaker.",
  },
  {
    step: 2,
    title: "Vi lager gavekortet",
    description:
      "Vi setter sammen et personlig gavekort med din melding og tilpasser det til anledningen.",
  },
  {
    step: 3,
    title: "Lever til mottakeren",
    description:
      "Du velger om gavekortet skal sendes digitalt til deg eller direkte til mottakeren.",
  },
];

export default function GavekortPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-brown">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-sand/80 mb-4">
            Gi bort en opplevelse
          </p>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Gavekort fra Wannado
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Gi bort minner som varer livet ut. Vi lager personlige gavekort tilpasset mottakeren og anledningen.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
              Velg din opplevelse
            </p>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown">
              Gavekort som passer alle
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {giftOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center transition-all duration-200 hover:border-teal/40 hover:shadow-md"
              >
                <div className="text-5xl mb-5">{option.icon}</div>
                <h3 className="font-space text-xl font-bold text-brown mb-3">
                  {option.title}
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
              Slik fungerer det
            </p>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown">
              Tre enkle steg
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brown text-white font-space text-lg font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="font-space text-lg font-bold text-brown mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[30px] border border-border shadow-sm p-6 md:p-10">
            <div className="text-center mb-8">
              <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
                Bestill gavekort
              </p>
              <h2 className="font-space text-2xl md:text-3xl font-bold text-brown">
                Fyll ut skjemaet
              </h2>
              <p className="font-inter text-sm text-brown-mid mt-3 leading-relaxed">
                Vi tar kontakt med deg for å avtale detaljer og lage et personlig gavekort.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="bg-cream rounded-2xl p-6 md:p-8 h-[500px] animate-pulse" />
              }
            >
              <GiftCardForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-brown">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-5">
            Gi bort noe som betyr noe
          </h2>
          <p className="font-inter text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
            En opplevelse sammen skaper minner som varer mye lenger enn en vanlig gave. Overrask noen du er glad i.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex rounded-xl bg-sand text-brown font-inter font-semibold text-sm px-8 py-4 hover:bg-[#f5c97a] transition-colors duration-200"
          >
            Ta kontakt med oss
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
