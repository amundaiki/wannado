import Link from "next/link";
import type { ReactNode } from "react";

/*
  Én knappestil for hele siden. Velg variant etter flaten knappen ligger på:
  primary = brun på lys flate, sand = på foto eller mørk flate (primærhandling),
  outline = sekundærhandling på lys flate, outline-light = sekundærhandling på foto.
*/
const variants = {
  primary: "bg-brown text-white hover:bg-brown-hover",
  sand: "bg-sand text-brown hover:bg-sand-hover",
  outline: "border-2 border-brown text-brown hover:bg-brown hover:text-white",
  "outline-light": "border-2 border-white/70 text-white hover:bg-white hover:text-brown",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-control px-7 py-3 font-body text-base font-semibold transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98] ${variants[variant]} ${className}`;
  const external = /^(https?:|tel:|mailto:)/.test(href);

  if (external) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
