import Link from "next/link";
import { Star, Shield, Waves, CheckCircle2 } from "lucide-react";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g190486-d6645173-Reviews-Wannado-Arendal_Aust_Agder_Southern_Norway.html";

type TrustItem = {
  icon: typeof Star;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
};

const items: TrustItem[] = [
  {
    icon: Star,
    title: "4,5 av 5 på TripAdvisor",
    text: "Rangert som nummer 1 av båtturer og vannsport i Arendal.",
    href: TRIPADVISOR_URL,
    external: true,
  },
  {
    icon: Shield,
    title: "Sertifiserte guider",
    text: "Veileder Hav, BCU 4-stjerners guide og godkjent fritidsskipper.",
  },
  {
    icon: Waves,
    title: "Trygt på vannet",
    text: "Sikkerhetsgjennomgang og redningsvest på alle turer.",
  },
  {
    icon: CheckCircle2,
    title: "Fleksibelt ved vær",
    text: "Vi ombooker eller finner et godt alternativ ved dårlig vær.",
    href: "/praktisk-informasjon",
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Hvorfor velge Wannado"
      className="bg-warm-white border-y border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <span className="mb-4 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-teal/10">
                  <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
                </span>
                <span className="block font-space text-lg font-bold text-brown">
                  {item.title}
                </span>
                <span className="mt-2 block font-inter text-sm leading-relaxed text-brown-mid">
                  {item.text}
                </span>
              </>
            );

            if (item.href && item.external) {
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl p-2 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    {inner}
                  </a>
                </li>
              );
            }

            if (item.href) {
              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl p-2 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    {inner}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.title} className="p-2">
                {inner}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
