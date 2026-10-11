import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { BlockContent } from "@/components/sanity/BlockContent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatNok, type SanityService } from "@/sanity/lib/content";

type ServiceCmsSectionProps = {
  service?: SanityService | null;
};

const detailIcons = {
  duration: Clock,
  groupSize: Users,
  location: MapPin,
  meetingPoint: MapPin,
  season: CalendarDays,
};

const detailLabels = {
  duration: "Varighet",
  groupSize: "Gruppe",
  location: "Sted",
  meetingPoint: "Oppmøte",
  season: "Sesong",
};

function serviceHref(slug?: string | null) {
  if (!slug) return "/opplevelser";

  const knownRoutes: Record<string, string> = {
    foredrag: "/foredrag",
    gavekort: "/gavekort",
    hesteopplevelser: "/opplevelser/hesteopplevelser",
    kajakkturer: "/kajakkturer",
    seilturer: "/seilturer",
    teambuilding: "/teambuilding",
    utleie: "/utleie/kajakk-og-kano-utleie",
  };

  return knownRoutes[slug] || `/kontakt?tjeneste=${encodeURIComponent(slug)}`;
}

function priceText(service: SanityService) {
  if (service.priceText) return service.priceText;
  if (typeof service.priceFrom === "number") return `Fra kr ${formatNok(service.priceFrom)}`;
  return "";
}

export function ServiceCmsSection({ service }: ServiceCmsSectionProps) {
  if (!service?.body?.length) {
    return null;
  }

  const details = [
    ["duration", service.duration],
    ["groupSize", service.groupSize],
    ["location", service.location],
    ["meetingPoint", service.meetingPoint],
    ["season", service.season],
  ].filter((detail): detail is [keyof typeof detailLabels, string] => Boolean(detail[1]));
  const pricing = priceText(service);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        <ScrollReveal>
          <p className="mb-4 font-inter text-sm font-semibold text-teal">
            Fra Wannado
          </p>
          <div className="rounded-card border border-border bg-white p-6 md:p-9">
            {service.imageUrl && (
              <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-xl bg-sand/30">
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt || service.title}
                  fill
                  sizes="(min-width: 1024px) 680px, calc(100vw - 72px)"
                  className="object-cover"
                />
              </div>
            )}
            <BlockContent content={service.body} />
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-5 lg:sticky lg:top-24" delay={0.12}>
          {(details.length > 0 || pricing) && (
            <div className="rounded-card border border-border bg-white p-6">
              <h2 className="font-space text-2xl font-bold text-brown">
                Praktisk kort fortalt
              </h2>
              <div className="mt-5 space-y-4">
                {details.map(([key, value]) => {
                  const Icon = detailIcons[key];
                  return (
                    <div key={key} className="flex gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-inter text-xs font-semibold text-brown-mid">
                          {detailLabels[key]}
                        </p>
                        <p className="mt-1 font-inter text-sm leading-relaxed text-brown-mid">
                          {value}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {pricing && (
                  <div className="rounded-xl bg-sand/35 p-4">
                    <p className="font-inter text-xs font-semibold text-brown-mid">
                      Pris
                    </p>
                    <p className="mt-1 font-inter text-sm leading-relaxed text-brown-mid">
                      {pricing}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {service.faqs && service.faqs.length > 0 && (
            <div className="rounded-card border border-border bg-white p-6">
              <h2 className="font-space text-2xl font-bold text-brown">
                Vanlige spørsmål
              </h2>
              <div className="mt-5 space-y-4">
                {service.faqs.slice(0, 4).map((faq) => (
                  <div key={faq._id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-inter text-sm font-bold text-brown">
                      {faq.question}
                    </h3>
                    {faq.answerText && (
                      <p className="mt-2 font-inter text-sm leading-relaxed text-brown-mid">
                        {faq.answerText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.relatedServices && service.relatedServices.length > 0 && (
            <div className="rounded-card border border-border bg-brown p-6 text-white">
              <h2 className="font-space text-2xl font-bold">
                Kanskje også gøy
              </h2>
              <div className="mt-5 space-y-3">
                {service.relatedServices.slice(0, 3).map((related) => (
                  <Link
                    key={related._id}
                    href={serviceHref(related.slug)}
                    className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 transition-colors hover:bg-white/14"
                  >
                    <span>
                      <span className="block font-inter text-sm font-bold">
                        {related.title || "Opplevelse"}
                      </span>
                      {related.summary && (
                        <span className="mt-1 block font-inter text-xs leading-relaxed text-white/70">
                          {related.summary}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-sand transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
