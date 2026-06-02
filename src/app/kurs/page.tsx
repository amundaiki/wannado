import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kurs og opplæring | Wannado",
  description:
    "Lær kajakk, ridning og personlighetsutvikling med erfarne instruktører i Arendal. Våttkurs, avansert kajakk, hestekurs og JTI-kurs på Sørlandet.",
  openGraph: {
    title: "Kurs og opplæring | Wannado",
    description:
      "Lær kajakk, ridning og personlighetsutvikling med erfarne instruktører i Arendal.",
    url: "https://wannado.no/kurs",
    type: "website",
  },
};

const courses = [
  {
    title: "Kajakkurs",
    description:
      "Lær kajakk fra grunnen av med erfarne instruktører. Få våttkort og bli trygg på vannet.",
    image: "/images/kajakkurs.jpg",
    badge: "Populært",
    badgeColor: "bg-teal",
    price: "Fra 1 490 kr",
    href: "/kajakkturer",
  },
  {
    title: "Avanserte kajakkurs",
    description:
      "For deg som allerede padler og vil ta steget videre. Rulle, surfing og ekspedisjonsteknikk.",
    image: "/images/avansert-kajakk.jpg",
    badge: "Videregående",
    badgeColor: "bg-brown",
    price: "Fra 1 990 kr",
    href: "/kajakkturer",
  },
  {
    title: "Hestekurs",
    description:
      "Bli kjent med islandshestene våre og lær grunnleggende rideteknikk i vakker natur.",
    image: "/images/hestekurs.jpg",
    badge: "Natur",
    badgeColor: "bg-brown-mid",
    price: "Fra 1 290 kr",
    href: "/opplevelser",
  },
  {
    title: "Jungs Typeindeks (JTI)",
    description:
      "Forstå deg selv og andre bedre med Jungs Typeindeks. Perfekt for team og ledere.",
    image: "/images/jti-kurs.jpg",
    badge: "Bedrift",
    badgeColor: "bg-teal",
    price: "Ta kontakt for pris",
    href: "/foredrag",
  },
];

const practicalInfo = [
  {
    title: "Hva bør du ta med?",
    description:
      "Klær etter vær, solkrem, drikkeflaske og godt humør. Ved kajakkurs stiller vi med alt nødvendig utstyr, inkludert redningsvest og spruttrekk.",
  },
  {
    title: "Hvordan fungerer booking?",
    description:
      "Du velger kurs og dato, fyller ut bestillingsskjemaet og mottar en bekreftelse på e-post innen 24 timer. Betaling skjer ved oppmøte eller på forhånd.",
  },
  {
    title: "Gruppstørrelser",
    description:
      "Vi tilpasser gruppene etter erfaring og ønsker. Maks fire deltakere per instruktør sikrer god oppfølging for alle.",
  },
];

const courseSchema = courses.map((course, index) => ({
  "@type": "Course",
  name: course.title,
  description: course.description,
  provider: {
    "@type": "Organization",
    name: "Wannado",
    sameAs: "https://wannado.no",
  },
  url: `https://wannado.no${course.href}`,
  educationalLevel: index < 2 ? "Beginner" : "Intermediate",
  inLanguage: "no",
  offers: {
    "@type": "Offer",
    category: course.badge,
    availability: "https://schema.org/InStock",
  },
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hjem",
          item: "https://wannado.no",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kurs og opplæring",
          item: "https://wannado.no/kurs",
        },
      ],
    },
    ...courseSchema,
  ],
};

export default function KursPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-brown text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-6">
            Kurs og opplæring
          </p>
          <h1 className="font-space text-4xl md:text-6xl font-bold mb-6">Kurs</h1>
          <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Lær nye ferdigheter med våre erfarne guider i vakker natur på Sørlandet.
            Fra kajakkurs til personlighetsutvikling, finner du noe som passer ditt nivå.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="group bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block font-inter text-xs font-semibold uppercase tracking-[0.15em] text-white px-3 py-1.5 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-space text-2xl font-bold text-brown mb-3 group-hover:text-teal transition-colors">
                    {course.title}
                  </h2>
                  <p className="font-inter text-brown-mid leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm font-semibold text-brown">
                      {course.price}
                    </span>
                    <span className="font-inter text-sm font-medium text-teal group-hover:underline">
                      Les mer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold text-brown text-center mb-14">
            Praktisk informasjon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {practicalInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-2xl border border-border p-8 shadow-sm"
              >
                <h3 className="font-space text-xl font-bold text-brown mb-4">
                  {info.title}
                </h3>
                <p className="font-inter text-brown-mid leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brown text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-6">
            Klar for å lære noe nytt?
          </h2>
          <p className="font-inter text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Book ditt kurs i dag og opplev noe nytt med våre erfarne instruktører.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-teal text-white font-inter font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#006b75] transition-colors"
          >
            Gå til booking
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
