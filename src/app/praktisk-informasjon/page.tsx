import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Shirt,
  Users,
  Calendar,
  Shield,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Praktisk informasjon - Wannado",
  description:
    "Praktisk informasjon om Wannados arrangement. Oppmøtesteder, påkledning, utstyr, forsikring og betalingsvilkår.",
  openGraph: {
    title: "Praktisk informasjon - Wannado",
    description: "Praktisk informasjon om Wannados arrangement og turer.",
    images: ["/images/baat-fb.jpg"],
  },
};

const cards = [
  {
    icon: MapPin,
    title: "Oppmøtesteder",
    content: (
      <ul className="space-y-4">
        <li>
          <strong className="text-brown">Kajakkturer og kurs:</strong>
          <br />
          Skarestrand 11, 4812 Kongshavn. God parkeringsmulighet rett ved
          oppmøtestedet.
        </li>
        <li>
          <strong className="text-brown">Seilturer med Havsul:</strong>
          <br />
          Pollen i Arendal sentrum. Parkering i Arendal sentrum (betalingsparkering).
        </li>
        <li>
          <strong className="text-brown">Teambuilding:</strong>
          <br />
          Varierer etter arrangement. Vi sender detaljert informasjon ved
          bestilling.
        </li>
      </ul>
    ),
  },
  {
    icon: Shirt,
    title: "Påkledning og utstyr",
    content: (
      <>
        <ul className="space-y-3">
          <li>
            <strong className="text-brown">
              Kajakkpadling vår/høst:
            </strong>{" "}
            Ullundertøy eller lignende under tørrdrakt (tørrdrakter lånes ut).
          </li>
          <li>
            <strong className="text-brown">Kajakkpadling sommer:</strong>{" "}
            Fritidstøy eller tights.
          </li>
          <li>
            <strong className="text-brown">Seiltur:</strong> Kle deg etter
            været, vindtett ytterlag anbefales.
          </li>
          <li>
            <strong className="text-brown">Ta med:</strong> Klesskift,
            vannflaske, solkrem (sommer).
          </li>
        </ul>
        <p className="mt-4 p-4 bg-teal/5 rounded-xl text-sm">
          <strong className="text-teal">Vi har:</strong> Tørrdrakter,
          padleutstyr, redningsvester, kajakker (singel og dobbel).
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: "Kajakker og gruppetilpasning",
    content: (
      <ul className="space-y-3">
        <li>
          Vi bruker en kombinasjon av singel- og dobbelkajakker, slik at flest
          mulig kan bli med.
        </li>
        <li>
          Kajakktypene tilpasses gruppens erfaring og ønsker.
        </li>
        <li>
          <strong className="text-brown">Merk:</strong> Vi kan ikke garantere
          passende kajakk for alle kroppsfasonger og vektklasser. Kontakt oss
          på forhånd om du er usikker.
        </li>
      </ul>
    ),
  },
  {
    icon: Calendar,
    title: "Sesong og værtilpasning",
    content: (
      <ul className="space-y-3">
        <li>
          <strong className="text-brown">Begynnerkurs:</strong> April til
          oktober.
        </li>
        <li>
          <strong className="text-brown">Øvrig padling:</strong> Hele året (vi
          har tørrdrakter).
        </li>
        <li>
          <strong className="text-brown">Seilturer:</strong> April til
          oktober, væravhengig.
        </li>
        <li>
          <strong className="text-brown">Teambuilding:</strong> Hele året.
        </li>
      </ul>
    ),
  },
  {
    icon: Shield,
    title: "Sikkerhet og forsikring",
    content: (
      <ul className="space-y-3">
        <li>Alle deltar på eget ansvar.</li>
        <li>
          Sykdom, skader eller medisinbehov som kan påvirke turen skal opplyses
          til arrangør eller turleder.
        </li>
        <li>
          Wannado har ansvarsforsikring hos Gjensidige som dekker det rettslige
          erstatningsansvaret.
        </li>
        <li>
          Den enkelte gjest må selv sørge for reise- og ulykkesforsikring.
          Sjekk at den gjelder for aktiviteten du skal delta på.
        </li>
      </ul>
    ),
  },
  {
    icon: CreditCard,
    title: "Betaling og avbestilling",
    content: (
      <ul className="space-y-3">
        <li>
          <strong className="text-brown">Forhåndsbetaling</strong> på turer og
          ekspedisjoner.
        </li>
        <li>
          Bookingen bekreftes når 10 % av totalbeløpet er betalt (ikke
          refunderbart).
        </li>
        <li>Restbeløp forfaller 1 måned før avreise.</li>
        <li>
          Booking senere enn 1 måned før avreise: Hele beløpet betales ved
          booking.
        </li>
        <li>
          Avbestilling senere enn 2 uker før avreise: Ingen refundering.
        </li>
        <li className="p-3 bg-teal/5 rounded-xl text-sm">
          <strong className="text-teal">Tips:</strong> Sjekk om forsikringen
          din dekker avbestilling.
        </li>
      </ul>
    ),
  },
];

export default function PraktiskInformasjonPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-4">
            Praktisk informasjon
          </h1>
          <p className="font-inter text-lg text-white/80 leading-relaxed">
            Alt du trenger å vite før du kommer forberedt til din opplevelse med
            Wannado.
          </p>
        </div>
      </section>

      {/* Content Cards */}
      <section className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="space-y-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 md:p-10 border border-border"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h2 className="font-space text-xl font-bold text-brown mb-4">
                  {card.title}
                </h2>
                <div className="font-inter text-base text-brown-mid leading-relaxed">
                  {card.content}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-space text-2xl md:text-3xl font-bold text-brown mb-4">
            Har du spørsmål?
          </h2>
          <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mb-8">
            Ta gjerne kontakt med oss om du lurer på noe. Vi svarer innen 24
            timer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-brown text-white font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-[#5a4838] transition-colors duration-200"
            >
              Gå til kontaktskjema
            </Link>
            <a
              href="tel:+4799469957"
              className="inline-flex items-center justify-center border border-border text-brown font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-white transition-colors duration-200"
            >
              Ring +47 99 46 99 57
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
