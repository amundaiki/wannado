import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANIES, TESTIMONIALS, TV_APPEARANCES } from "@/lib/data/references";

export const metadata: Metadata = {
  title: "Referanser - Bedrifter og kunder | Wannado",
  description:
    "Over 30 bedrifter har valgt Wannado for teambuilding og opplevelser. Les hva kundene sier om oss.",
};

export default function ReferanserPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-6">
            Våre referanser
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/80 leading-relaxed">
            Vi har hatt gleden av å leke med mange. Både bedrifter, lag,
            foreninger og vennegjenger.
          </p>
        </div>
      </section>

      {/* Bedriftsrutenett */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeader
              eyebrow="Kunder"
              title="Bedrifter som har valgt oss"
              center={true}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {COMPANIES.map((company) => (
              <div
                key={company}
                className="bg-white rounded-xl p-4 shadow-sm border border-border text-center hover:shadow-md hover:border-teal/30 transition-all duration-200"
              >
                <span className="font-inter text-sm md:text-base text-brown-mid font-medium">
                  {company}
                </span>
              </div>
            ))}
          </div>
          <p className="text-brown-muted text-sm italic text-center mt-6">
            ...og mange flere bedrifter, lag, foreninger og vennegjenger
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeader
              eyebrow="Tilbakemeldinger"
              title="Hva kundene sier"
              center={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.author}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border"
              >
                <span className="font-dm text-5xl text-brown-light/40 leading-none mb-4 block">
                  {"\u201C"}
                </span>
                <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <span className="font-inter text-sm font-semibold text-brown mt-6 block">
                  {testimonial.author}
                </span>
                <span className="font-inter text-xs text-teal block mt-1">
                  {testimonial.company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TV-opptredener */}
      <section className="bg-brown text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-widest text-white/60 mb-3">
              Sett på TV
            </p>
            <h2 className="font-space font-bold text-3xl md:text-4xl text-white">
              Wannado på skjermen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {TV_APPEARANCES.map((appearance) => (
              <div
                key={appearance.show}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
              >
                <span className="font-space text-3xl font-bold text-sand mb-2 block">
                  {appearance.year}
                </span>
                <h3 className="font-space text-xl font-bold text-white mb-2">
                  {appearance.show}
                </h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  {appearance.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TripAdvisor */}
      <section className="bg-warm-white py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-space font-bold text-2xl text-brown mb-6">
            Se hva andre sier om oss
          </h2>
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g2376662-d6023658-Reviews-Wannado-Arendal_Agder_Eastern_Norway.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal text-white font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-teal/90 transition-colors duration-200"
          >
            Les anmeldelser på TripAdvisor
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brown rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-space font-bold text-2xl md:text-3xl mb-4">
              Klar for din neste opplevelse?
            </h2>
            <p className="font-inter text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Kontakt oss for å høre mer om hva vi kan tilby din bedrift eller
              gruppe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-white text-brown font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Send forespørsel
              </Link>
              <a
                href="tel:+4799469957"
                className="inline-flex items-center justify-center border border-white/30 text-white font-inter font-medium text-sm py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Ring oss: +47 99 46 99 57
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
