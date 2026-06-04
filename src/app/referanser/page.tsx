import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANIES, TV_APPEARANCES } from "@/lib/data/references";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { splitTestimonials } from "@/lib/data/testimonials";
import { sanityFetch } from "@/sanity/lib/live";
import {
  testimonialsQuery,
  type SanityTestimonial,
} from "@/sanity/lib/content";

export const metadata = createPageMetadata({
  title: "Referanser - Bedrifter og kunder | Wannado",
  description:
    "Over 30 bedrifter, kommuner og grupper har valgt Wannado for teambuilding og opplevelser i Arendal. Les kundesitater og se vurderingen på TripAdvisor.",
  path: "/referanser",
  image: "/images/tp-typeteori.jpg",
  imageAlt: "Referanser fra Wannado-kunder",
});

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

export default async function ReferanserPage() {
  const { testimonials, tripadvisorFeedback } = await getReferenceTestimonials();
  const featuredTestimonial = testimonials[0];

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Referanser", path: "/referanser" },
        ])}
      />
      <Navbar variant="solid" />

      {/* Hero */}
      <section className="relative flex min-h-[760px] items-end overflow-hidden text-white md:min-h-[720px]">
        <Image
          src="/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg"
          alt="Bedriftsgruppe løser en praktisk teambuilding-oppgave med Wannado"
          fill
          priority
          loading="eager"
          className="object-cover object-[54%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/75 via-brown/55 to-brown/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(246,213,142,0.22),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32 md:pb-16 md:pt-36">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.35em] text-[#f6d58e] md:text-sm">
                Referanser
              </p>
              <h1 className="font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
                Opplevelser bedrifter husker etterpå
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/88 md:text-xl">
                Fra industribedrifter og kommuner til lag og vennegjenger.
                Wannado brukes når samhold, energi og ekte opplevelser skal
                merkes i gruppa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
                >
                  Be om forslag
                </Link>
                <Link
                  href="#tilbakemeldinger"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Les sitater
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
                {[
                  ["30+", "navngitte kunder"],
                  ["4.5/5", "TripAdvisor"],
                  ["15+ år", "grupper"],
                ].map(([value, label]) => (
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

            {featuredTestimonial ? (
              <aside className="hidden border border-white/20 bg-white/12 p-6 backdrop-blur-md md:p-7 lg:block">
                <p className="font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#f6d58e]">
                  Kundesitat
                </p>
                <p className="mt-5 font-inter text-base leading-7 text-white/90">
                  <span aria-hidden="true">&ldquo;</span>
                  {featuredTestimonial.quote}
                  <span aria-hidden="true">&rdquo;</span>
                </p>
                <div className="mt-6 border-t border-white/18 pt-5">
                  <p className="font-inter text-sm font-semibold text-white">
                    {featuredTestimonial.author}
                  </p>
                  <p className="mt-1 font-inter text-sm text-white/72">
                    {featuredTestimonial.company}
                  </p>
                </div>
              </aside>
            ) : null}
          </div>
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
      <section id="tilbakemeldinger" className="bg-cream py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeader
              eyebrow="Tilbakemeldinger"
              title="Hva kundene sier"
              center={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border"
              >
                <span className="font-dm text-5xl text-brown-mid/40 leading-none mb-4 block">
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
                {testimonial.context ? (
                  <span className="font-inter text-xs text-brown-muted block mt-2">
                    {testimonial.context}
                  </span>
                ) : null}
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
          <div className="mb-8 grid gap-4 text-left md:grid-cols-2">
            {tripadvisorFeedback.map((feedback) => (
              <article
                key={feedback.id}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-inter text-xs font-semibold uppercase tracking-widest text-teal">
                    {feedback.source}
                  </span>
                  <span className="rounded-full bg-sand/15 px-3 py-1 font-inter text-xs font-semibold text-brown">
                    {feedback.rating}
                  </span>
                </div>
                <h3 className="mt-4 font-space text-xl font-semibold text-brown">
                  {feedback.title}
                </h3>
                <p className="mt-3 font-inter text-sm leading-6 text-brown-mid">
                  {feedback.summary}
                </p>
                {feedback.year ? (
                  <p className="mt-4 font-inter text-xs text-brown-muted">
                    {feedback.year}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g190486-d6645173-Reviews-Wannado-Arendal_Aust_Agder_Southern_Norway.html"
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
