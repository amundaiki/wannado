import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { mergeTeamProfiles } from "@/lib/data/team";
import { sanityFetch } from "@/sanity/lib/live";
import {
  teamMembersQuery,
  type SanityTeamMember,
} from "@/sanity/lib/content";

export const metadata = createPageMetadata({
  title: "Om oss - Menneskene bak Wannado | Opplevelser i Arendal",
  description:
    "Bli kjent med Tone Pernille Sivertsen og Roar Laugerud. Over 15 års erfaring med kajakk, seil, teambuilding og hesteopplevelser i Arendal og langs Sørlandskysten.",
  path: "/om-oss",
  image: "/images/tone-pernille-havsul.jpg",
  imageAlt: "Tone Pernille Sivertsen og Roar Laugerud på Havsul",
});

async function getTeamProfiles() {
  try {
    const { data } = await sanityFetch({
      query: teamMembersQuery,
      perspective: "published",
    });

    return mergeTeamProfiles((data as SanityTeamMember[]) ?? []);
  } catch {
    return mergeTeamProfiles();
  }
}

export default async function OmOssPage() {
  const teamProfiles = await getTeamProfiles();

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Om oss", path: "/om-oss" }])}
      />
      <Navbar variant="solid" />

      {/* Hero Section */}
      <section className="relative flex min-h-[760px] items-end overflow-hidden text-white md:min-h-[700px]">
        <Image
          src="/images/tone-pernille-havsul.jpg"
          alt="Tone Pernille Sivertsen og Roar Laugerud på Havsul i Arendals skjærgård"
          fill
          priority
          loading="eager"
          className="object-cover object-[52%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/72 via-brown/48 to-brown/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(246,213,142,0.2),transparent_34%)]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32 md:pb-16 md:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.35em] text-[#f6d58e] md:text-sm">
                Om Wannado
              </p>
              <h1 className="font-space text-4xl font-bold leading-[0.98] md:text-6xl lg:text-7xl">
                Menneskene bak opplevelsene
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-lg leading-8 text-white/88 md:text-xl">
                Over 15 år med lidenskap for mestring, lek og naturkraft. Fra
                Kongshavn i Arendal skaper Tone Pernille, Roar og teamet
                opplevelser som setter spor.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#folkene"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6d58e] px-7 font-inter text-sm font-semibold text-brown transition-colors hover:bg-[#f3c977]"
                >
                  Møt folkene
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/55 px-7 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Ta kontakt
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:max-w-3xl">
                {[
                  ["2005", "startet i Arendal"],
                  ["15+ år", "med opplevelser"],
                  ["6", "tjenesteområder"],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    className="border border-white/22 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
                  >
                    <p className="font-space text-xl font-bold text-white sm:text-2xl">
                      {value}
                    </p>
                    <p className="mt-1 font-inter text-[11px] leading-4 text-white/72 sm:text-sm">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown leading-snug mb-8">
            Wannados historie
          </h2>
          <div className="space-y-6">
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Wannado ble grunnlagt rundt 2005, med base på Skarestrand i
              Kongshavn, Arendal. Det som startet som en lidenskap for friluftsliv
              og menneskelig utvikling, har over 15 år vokst til en bred
              opplevelsesvirksomhet som tilbyr alt fra kajakkturer og seilturer med
              Listerskøyta Havsul, til teambuilding, hesteopplevelser og foredrag.
            </p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed">
              Filosofien vår er enkel: vi tror på kraften i lek, mestring og
              naturopplevelser. Vi skaper trygge rammer der mennesker kan utfordre
              seg selv, bygge tillit og oppleve noe de aldri har gjort før. Enten
              det er en bedriftsgruppe som skal styrke samarbeidet, en familie på
              kajakktur i skjærgården, eller en enkeltperson som vil lære noe nytt.
            </p>
          </div>

          {/* Pullquote */}
          <blockquote className="text-2xl md:text-3xl font-dm italic text-brown/80 text-center py-8 my-8 border-y border-border">
            Lek er helsebringende, utviklende og mestringsgivende. Hva er DIN
            lek? Kanskje vi kan finne det ut sammen?
          </blockquote>
        </div>
      </section>

      {/* Team Profiles Section */}
      <section id="folkene" className="bg-warm-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-14">
            Folkene bak opplevelsene
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {teamProfiles.map((person) => (
              <div key={person.id}>
                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={person.imgWidth}
                    height={person.imgHeight}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: person.imageObjectPosition }}
                  />
                </div>
                <h3 className="font-space text-2xl md:text-3xl font-semibold text-brown mt-6">
                  {person.name}
                </h3>
                <p className="font-inter text-sm font-medium text-teal uppercase tracking-wider mt-1">
                  {person.responsibility}
                </p>
                <p className="font-inter text-base md:text-lg text-brown-mid leading-relaxed mt-4">
                  {person.bio}
                </p>
                <div className="mt-4 flex flex-wrap">
                  {person.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-block bg-teal/10 text-teal font-inter text-xs font-semibold px-3 py-1.5 rounded-full mr-2 mb-2"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                  >
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="block font-inter text-sm text-brown-muted hover:text-brown transition-colors"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Videos Section */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-6">
            Bli bedre kjent med oss
          </h2>
          <p className="font-inter text-lg text-brown-mid text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Hør Tone og Roar fortelle om Wannado, Havsul og lidenskapen for opplevelser på sjøen.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="relative overflow-hidden rounded-xl aspect-video bg-brown/5">
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/tp-typeteori.jpg"
                  aria-label="Video med Tone Pernille om Wannado"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/havsul-intervju-tone.mp4#t=2" type="video/mp4" />
                </video>
              </div>
              <h3 className="font-space text-xl font-semibold text-brown mt-4">
                Tone Pernille om Wannado
              </h3>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-xl aspect-video bg-brown/5">
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/P7270038.jpg"
                  aria-label="Video med Roar om livet på sjøen"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/havsul-intervju-roar.mp4#t=2" type="video/mp4" />
                </video>
              </div>
              <h3 className="font-space text-xl font-semibold text-brown mt-4">
                Roar om livet på sjøen
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-14">
            Våre verdier
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Trygghet */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Trygghet
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Sikkerhet først. Våre instruktører har de høyeste
                sertifiseringene, og vi har over 15 års erfaring med trygge
                opplevelser på sjøen.
              </p>
            </div>

            {/* Mestring */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Mestring
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Vi tror på at alle kan mer enn de tror. Våre opplevelser er
                designet for at du skal strekke deg og vokse.
              </p>
            </div>

            {/* Lek */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-teal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-bold text-brown mb-2">
                Lek
              </h3>
              <p className="font-inter text-sm text-brown-mid leading-relaxed">
                Lek er helsebringende, utviklende og mestringsgivende. Vi skaper
                rom for den leken alle fortjener.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brown py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-space text-3xl md:text-5xl font-bold text-white mb-4">
            Vil du oppleve noe nytt?
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-xl mx-auto mb-10">
            Ta kontakt for en uforpliktende prat om hva vi kan skape sammen. Vi
            skreddersyr opplevelser for grupper, bedrifter og privatpersoner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-block bg-sand text-brown font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#f5cc7a] transition-colors"
            >
              Ta kontakt
            </Link>
            <a
              href="tel:+4799469957"
              className="inline-block border-2 border-white/30 text-white font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Ring +47 99 46 99 57
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
