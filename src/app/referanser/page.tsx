import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/sections/PageHero";
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
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Referanser", path: "/referanser" },
        ])}
      />
      <Navbar />

      <PageHero
        image="/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg"
        imageAlt="Bedriftsgruppe løser en praktisk teambuilding-oppgave med Wannado"
        imagePosition="54% 50%"
        eyebrow="Referanser"
        title="Opplevelser bedrifter husker etterpå"
        intro="Fra industribedrifter og kommuner til lag og vennegjenger. Wannado brukes når samhold, energi og ekte opplevelser skal merkes i gruppa."
        primary={{ label: "Be om forslag", href: "/kontakt" }}
        secondary={{ label: "Les sitater", href: "#tilbakemeldinger" }}
        facts={[
          ["30+", "navngitte kunder"],
          ["15+ år", "grupper"],
        ]}
        aside={
          featuredTestimonial ? (
            <>
              <p className="font-body text-xs font-semibold text-teal">
                Kundesitat
              </p>
              <p className="mt-4 font-body text-base leading-relaxed">
                <span aria-hidden="true">&ldquo;</span>
                {featuredTestimonial.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-body text-sm font-semibold">
                  {featuredTestimonial.author}
                </p>
                <p className="mt-1 font-body text-sm text-brown-mid">
                  {featuredTestimonial.company}
                </p>
              </div>
            </>
          ) : undefined
        }
      />

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
                className="bg-white rounded-xl p-4 border border-border text-center hover:shadow-md hover:border-teal/30 transition-all duration-200"
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
                className="bg-white rounded-card p-8 md:p-10 border border-border"
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
            <p className="font-inter text-sm font-semibold text-white/60 mb-3">
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
                className="bg-white/10 backdrop-blur-sm rounded-card p-6 md:p-8 border border-white/10"
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
                className="rounded-card border border-border bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-inter text-xs font-semibold text-teal">
                    {feedback.source}
                  </span>
                  {feedback.rating && (
                    <span className="rounded-full bg-sand/15 px-3 py-1 font-inter text-xs font-semibold text-brown">
                      {feedback.rating}
                    </span>
                  )}
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
          <div className="bg-brown rounded-card p-8 md:p-12 text-center text-white">
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
