import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Opplevelser", href: "/opplevelser" },
  { label: "Seilturer med Havsul", href: "/seilturer" },
  { label: "Kajakkurs og turer", href: "/kajakkturer" },
  { label: "Våttkort og kajakkurs", href: "/kurs/kajakkurs" },
  { label: "JTI-kurs", href: "/kurs/jti" },
  { label: "Skjærgårdssafari", href: "/opplevelser/skjaergardsafari" },
  { label: "Kajakk- og kanoutleie", href: "/utleie/kajakk-og-kano-utleie" },
  { label: "Hestekurs", href: "/kurs/hestekurs" },
  { label: "Teambuilding", href: "/teambuilding" },
  { label: "Hesteopplevelser", href: "/opplevelser/hesteopplevelser" },
  { label: "Foredrag", href: "/foredrag" },
  { label: "JTI-foredrag", href: "/foredrag/jti" },
  {
    label: "Grønlandsforedrag",
    href: "/foredrag/kajakkekspedisjon-ost-gronland",
  },
  { label: "Referanser", href: "/referanser" },
  { label: "Priser", href: "/priser" },
  { label: "Praktisk informasjon", href: "/praktisk-informasjon" },
  { label: "Ofte stilte spørsmål", href: "/faq" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/wannado_no/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/wannado.no/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://no.linkedin.com/in/tone-pernille-sivertsen-8b028676",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.025-3.037-1.85-3.037-1.85 0-2.133 1.445-2.133 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.605 0 4.27 2.372 4.27 5.456v6.285zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.556V9h3.563v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Flickr",
    href: "https://www.flickr.com/photos/roarfoto",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 8.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm13 0a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-brown-muted/20 bg-brown pt-20 pb-10">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-16 grid grid-cols-1 gap-12 text-white md:grid-cols-4 md:gap-8 lg:gap-16">
          <div className="md:col-span-1">
            <Link href="/" aria-label="Gå til forsiden" className="inline-flex min-h-11 items-center">
              <Image
                src="/images/wannado-logo.svg"
                alt="Wannado"
                width={128}
                height={42}
                className="brightness-0 invert"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="mt-6 max-w-[260px] font-inter text-sm leading-relaxed text-white/65">
              Lekne og grensesprengende naturopplevelser på Sørlandet, med Havsul,
              kajakk, teambuilding og foredrag for folk som vil oppleve mer sammen.
            </p>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g190486-d6645173-Reviews-Wannado-Arendal_Aust_Agder_Southern_Norway.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-inter text-sm text-white/85 transition-colors hover:border-sand/50 hover:text-sand"
            >
              Les anmeldelser på TripAdvisor
            </a>
          </div>

          <div>
            <h4 className="mb-6 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-white/60">
              Utforsk
            </h4>
            <ul className="space-y-1 md:space-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-inter text-[14px] text-white/80 transition-colors hover:text-sand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-white/60">
              Kontakt
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="font-inter text-[14px] text-white/80">
                <span className="block text-white/60 text-[12px] mb-1">E-post</span>
                <a href="mailto:mail@wannado.no" className="inline-flex min-h-11 items-center transition-colors hover:text-sand">
                  mail@wannado.no
                </a>
              </li>
              <li className="font-inter text-[14px] text-white/80 mt-4">
                <span className="block text-white/60 text-[12px] mb-1">Tone P. Sivertsen</span>
                <a href="tel:+4799469957" className="inline-flex min-h-11 items-center transition-colors hover:text-sand">
                  +47 99 46 99 57
                </a>
              </li>
              <li className="font-inter text-[14px] text-white/80 mt-4">
                <span className="block text-white/60 text-[12px] mb-1">Roar Laugerud</span>
                <a href="tel:+4794826710" className="inline-flex min-h-11 items-center transition-colors hover:text-sand">
                  +47 94 82 67 10
                </a>
              </li>
              <li className="pt-2 font-inter text-[14px] text-white/80">
                <span className="mb-1 block text-[12px] text-white/60">Postadresse</span>
                Skarestrand 11
                <br />
                4812 Kongshavn
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-white/60">
              Følg Wannado
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/80 transition-all hover:bg-sand hover:text-brown"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="mt-6 max-w-[240px] font-inter text-sm leading-relaxed text-white/60">
              Følg med på turer, kurs og glimt fra Havsul, skjærgården og livet ute.
            </p>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 py-2.5 text-[13px] font-medium transition-colors hover:bg-white hover:text-brown"
              >
                Send en forespørsel
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-inter text-[12px] text-white/60">
            &copy; {new Date().getFullYear()} Wannado. Alle rettigheter reservert.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <Link
              href="/om-oss"
              className="inline-flex min-h-11 items-center font-inter text-[12px] text-white/60 transition-colors hover:text-white"
            >
              Om oss
            </Link>
            <Link
              href="/personvern"
              className="inline-flex min-h-11 items-center font-inter text-[12px] text-white/60 transition-colors hover:text-white"
            >
              Personvern
            </Link>
            <Link
              href="/referanser"
              className="inline-flex min-h-11 items-center font-inter text-[12px] text-white/60 transition-colors hover:text-white"
            >
              Referanser
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
