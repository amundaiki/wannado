import Link from "next/link";

type TrustItem = {
  title: string;
  text: string;
  href?: string;
};

const items: TrustItem[] = [
  {
    title: "Sertifiserte guider",
    text: "Veileder Hav, BCU 4-stjerners guide og godkjent fritidsskipper.",
  },
  {
    title: "Trygt på vannet",
    text: "Sikkerhetsgjennomgang og redningsvest på alle turer.",
  },
  {
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
        <ul className="flex flex-col gap-6 md:flex-row md:gap-10">
          {items.map((item) => {
            const inner = (
              <>
                <span className="block font-space text-lg font-bold text-brown">
                  {item.title}
                </span>
                <span className="mt-2 block font-inter text-sm leading-relaxed text-brown-mid">
                  {item.text}
                </span>
              </>
            );

            if (item.href) {
              return (
                <li key={item.title} className="flex-1">
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
              <li key={item.title} className="flex-1 p-2">
                {inner}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
