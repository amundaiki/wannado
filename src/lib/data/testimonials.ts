import type { SanityTestimonial } from "@/sanity/lib/content";
import { TESTIMONIALS, TRIPADVISOR_FEEDBACK } from "@/lib/data/references";

export type PublicTestimonial = {
  id: string;
  quote: string;
  author: string;
  company: string;
  context?: string;
};

export type PublicTripadvisorFeedback = {
  id: string;
  title: string;
  summary: string;
  source: string;
  rating?: string;
  year?: number;
};

export const fallbackPublicTestimonials: PublicTestimonial[] = TESTIMONIALS.map(
  (testimonial, index) => ({
    id: `fallback-testimonial-${index}`,
    quote: testimonial.quote,
    author: testimonial.author,
    company: testimonial.company,
    context: testimonial.context,
  }),
);

export const fallbackTripadvisorFeedback: PublicTripadvisorFeedback[] =
  TRIPADVISOR_FEEDBACK.map((feedback, index) => ({
    id: `fallback-tripadvisor-${index}`,
    title: feedback.title,
    summary: feedback.summary,
    source: feedback.source,
    year: feedback.year,
  }));

export function splitTestimonials(items: SanityTestimonial[] = []) {
  const direct = items
    .filter((item) => item.source !== "tripadvisor")
    .map<PublicTestimonial>((item) => ({
      id: item._id,
      quote: item.quote,
      author: item.person || "Wannado-kunde",
      company: item.company || "Kunde",
      context: item.context || item.serviceTitle || undefined,
    }));

  const tripadvisor = items
    .filter((item) => item.source === "tripadvisor")
    .map<PublicTripadvisorFeedback>((item) => ({
      id: item._id,
      title: item.quote,
      summary: item.context || "",
      source: item.company || "TripAdvisor",
      rating: item.rating || undefined,
      year: item.year || undefined,
    }));

  return {
    testimonials: direct.length > 0 ? direct : fallbackPublicTestimonials,
    tripadvisorFeedback:
      tripadvisor.length > 0 ? tripadvisor : fallbackTripadvisorFeedback,
  };
}
