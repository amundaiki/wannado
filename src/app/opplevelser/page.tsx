import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Opplevelser i Arendal - Seilturer, Kajakk og Teambuilding | Wannado",
  description:
    "Utforsk opplevelser i Arendals skjærgård med Wannado. Seilturer med Havsul, kajakkurs, teambuilding og inspirerende foredrag. Book din opplevelse i dag.",
  openGraph: {
    title:
      "Opplevelser i Arendal - Seilturer, Kajakk og Teambuilding | Wannado",
    description:
      "Utforsk opplevelser i Arendals skjærgård med Wannado. Seilturer, kajakkurs, teambuilding og foredrag.",
    images: ["/images/havsul.jpg"],
  },
};

const categories = [
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
];

export default function OpplevelserPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-medium text-teal uppercase tracking-[3px] mb-4">
            Wannado opplevelser
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-brown leading-tight mb-6">
            Velg din opplevelse
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid max-w-2xl mx-auto leading-relaxed">
            Fra historiske seilturer til adrenalinfylt kajakkpadling. Vi skaper
            minner som varer, i Arendals vakreste omgivelser.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden h-[380px] md:h-[440px] block"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <h2 className="font-space text-2xl md:text-3xl font-bold text-white mb-2">
                  {cat.title}
                </h2>
                <p className="font-inter text-sm md:text-base text-white/80 leading-relaxed max-w-sm mb-4">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-sand group-hover:gap-3 transition-all">
                  Utforsk
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-warm-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
                className="font-space text-2xl font-bold text-brown hover:text-teal transition-colors"
              >
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
                className="font-space text-2xl font-bold text-brown hover:text-teal transition-colors"
              >
                +47 94 82 67 10
              </a>
              <p className="font-inter text-sm text-brown-muted mt-1">
                Roar Laugerud
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/kontakt"
              className="inline-block bg-brown text-white font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#5a4838] transition-colors"
            >
              Gå til kontaktskjema
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
