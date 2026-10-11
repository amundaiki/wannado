import Image from "next/image";
import Link from "next/link";

type ServiceRowProps = {
  title: string;
  text: string;
  price?: string;
  image: string;
  imageAlt?: string;
  href: string;
  priority?: boolean;
};

/*
  Én rad per tilbud: bilde, tittel med linje og pris. Hele raden er lenke.
  Bruk i <ul className="divide-y divide-border border-y border-border">.
*/
export default function ServiceRow({
  title,
  text,
  price,
  image,
  imageAlt = "",
  href,
  priority = false,
}: ServiceRowProps) {
  return (
    <li>
      <Link href={href} className="group flex gap-5 py-5 sm:gap-8">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-card sm:h-32 sm:w-48">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="192px"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-brown group-hover:underline">
              {title}
            </h3>
            <p className="mt-1 max-w-xl text-brown-mid">{text}</p>
          </div>
          {price && (
            <p className="shrink-0 font-display text-lg font-bold text-brown sm:text-right">
              {price}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
