import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const popularLinks = [
  { label: "Seilturer med Havsul", href: "/seilturer" },
  { label: "Kajakkturer og kurs", href: "/kajakkturer" },
  { label: "Teambuilding", href: "/teambuilding" },
  { label: "Blogg", href: "/blogg" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar variant="solid" />

      <section className="flex-1 flex items-center pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-4">
            Side ikke funnet
          </p>
          <h1 className="font-space text-5xl md:text-7xl font-bold text-brown leading-tight mb-6">
            Her var det tomt på sjøen
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid leading-relaxed mb-10 max-w-xl mx-auto">
            Vi fant dessverre ikke siden du lette etter. Den kan ha flyttet seg,
            eller så har lenken blitt borte i bølgene. Prøv en av sidene under,
            eller ta gjerne kontakt så hjelper vi deg videre.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brown px-7 py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#5a4838]"
            >
              Til forsiden
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brown/30 px-7 py-3 font-inter text-sm font-medium text-brown transition-colors hover:bg-warm-white"
            >
              Ta kontakt
            </Link>
          </div>

          <div>
            <p className="font-inter text-sm font-medium text-brown-mid mb-4">
              Populære sider
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-inter text-teal underline underline-offset-4 transition-colors hover:text-brown"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
