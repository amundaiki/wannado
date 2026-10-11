import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

type HeroAction = { label: string; href: string };

type PageHeroProps = {
  image: string;
  imageAlt: string;
  /** CSS object-position, f.eks. "54% 44%". */
  imagePosition?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  primary?: HeroAction;
  secondary?: HeroAction;
  /** Korte fakta under knappene, vist som en rolig rad uten bokser. */
  facts?: ReadonlyArray<readonly [value: string, label: string]>;
  /** Valgfritt kort til høyre på lg og opp, på solid flate (ikke glass). */
  aside?: ReactNode;
};

/*
  Delt hero for innholdssider. Faste verdier: samme venstrekant som resten av
  siden (max-w-6xl, px-6 lg:px-10), overskrift med linjehøyde 1.1 og samme
  scrim over bildet, slik at tekst alltid leses mot foto.
*/
export default function PageHero({
  image,
  imageAlt,
  imagePosition = "50% 50%",
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  facts,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[600px] items-end overflow-hidden text-white md:min-h-[640px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/70 via-brown/35 to-brown-dark/90" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-32 md:pb-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.12em] text-sand">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/90 md:text-xl">
                {intro}
              </p>
            )}
            {(primary || secondary) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primary && (
                  <Button href={primary.href} variant="sand">
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} variant="outline-light">
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
            {facts && facts.length > 0 && (
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/30 pt-5">
                {facts.map(([value, label]) => (
                  <div key={value}>
                    <dt className="font-display text-2xl font-bold leading-tight">
                      {value}
                    </dt>
                    <dd className="mt-1 font-body text-sm text-white/85">{label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {aside && (
            <div className="hidden rounded-card bg-cream p-6 text-brown shadow-[0_1px_2px_rgba(42,31,24,0.2),0_12px_32px_rgba(42,31,24,0.25)] lg:block">
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
