"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { COMPANIES } from "@/lib/data/references";
import {
  fallbackPublicTestimonials,
  fallbackTripadvisorFeedback,
  type PublicTestimonial,
  type PublicTripadvisorFeedback,
} from "@/lib/data/testimonials";

type TestimonialsSectionProps = {
  testimonials?: PublicTestimonial[];
  tripadvisorFeedback?: PublicTripadvisorFeedback[];
};

export default function TestimonialsSection({
  testimonials = fallbackPublicTestimonials,
  tripadvisorFeedback = fallbackTripadvisorFeedback,
}: TestimonialsSectionProps) {
  return (
    <section id="referanser" className="bg-card-bg py-16 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-space text-3xl font-semibold text-brown md:text-5xl">
            Ekte tilbakemeldinger fra folk som har vært ute med oss
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-base leading-7 text-brown-mid md:text-lg">
            Når opplevelsen fungerer, merkes det etterpå. De beste bevisene ligger i
            det gjestene faktisk forteller videre.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((quote, index) => (
            <motion.article
              key={quote.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-card border border-border bg-white p-8 md:p-10"
            >
              <div className="flex items-center gap-1 text-sand">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-6 font-inter text-base leading-7 text-brown-mid md:text-lg md:leading-8">
                <span aria-hidden="true">&ldquo;</span>
                {quote.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-inter text-sm font-semibold text-brown">
                  {quote.author}
                </p>
                <p className="mt-1 font-inter text-sm text-teal">{quote.company}</p>
                {"context" in quote && quote.context ? (
                  <p className="mt-2 font-inter text-sm text-brown-muted">{quote.context}</p>
                ) : null}
              </div>
            </motion.article>
          ))}

          {tripadvisorFeedback.map((feedback) => (
            <motion.article
              key={feedback.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-card border border-border bg-[linear-gradient(180deg,#fffaf2_0%,#fff_100%)] p-8 md:p-10"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-inter text-[11px] font-semibold text-teal">
                  {feedback.source}
                </span>
                {feedback.rating && (
                  <span className="rounded-full bg-sand/15 px-3 py-1 font-inter text-[11px] font-semibold text-brown">
                    {feedback.rating}
                  </span>
                )}
              </div>
              <p className="mt-6 font-inter text-base leading-7 text-brown-mid md:text-lg md:leading-8">
                <span aria-hidden="true">&ldquo;</span>
                {feedback.title}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              <p className="mt-4 font-inter text-base leading-7 text-brown-mid">
                {feedback.summary}
              </p>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-inter text-sm font-semibold text-brown">
                  {feedback.source}
                </p>
                <p className="mt-1 font-inter text-sm text-brown-muted">
                  {feedback.year}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-card border border-border/80 bg-cream px-6 py-8 md:px-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-inter text-[11px] font-semibold text-brown-muted">
                Et utvalg kunder
              </p>
              <p className="mt-3 font-inter text-base leading-7 text-brown-mid">
                Bedrifter, lag og vennegjenger har brukt Wannado til kickoff,
                teambuilding, læring og opplevelser i mange år.
              </p>
            </div>
            <Button href="/referanser" variant="outline">
              Se flere referanser
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {COMPANIES.slice(0, 10).map((company) => (
              <span
                key={company}
                className="rounded-full border border-brown/10 bg-white px-4 py-2 font-inter text-sm text-brown-mid"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
