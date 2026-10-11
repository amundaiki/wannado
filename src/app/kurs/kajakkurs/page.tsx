import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Compass,
  LifeBuoy,
  MapPin,
  Phone,
  Waves,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicePageMetadata } from "@/lib/serviceMetadata";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allProductsQuery,
  formatNok,
  type SanityProduct,
} from "@/sanity/lib/content";

export function generateMetadata() {
  return createServicePageMetadata({
    slug: "kajakkurs",
    path: "/kurs/kajakkurs",
    fallback: {
      title: "Kajakkurs og våttkort Arendal | Wannado",
      description:
        "Ta kajakkurs og våttkort i Arendal med Wannado. Vi holder nybegynnerkurs, grunnkurs hav, teknikkurs og rullekurs med alt utstyr inkludert.",
      image: "/images/scraped/kayak/pusnes-introkurs-4613.jpg",
      imageAlt: "Kajakkurs med Wannado i rolig vann ved Arendal",
    },
  });
}

export const dynamic = "force-dynamic";

type CourseCard = {
  id: string;
  name: string;
  duration: string;
  price: string;
  schemaPrice: string;
  description: string;
  outcome: string;
  image: string;
  imageAlt: string;
};

const courseCards: CourseCard[] = [
  {
    id: "f2fc0825-3e4d-4dee-96fc-c5b2e46be4ec",
    name: "Våttkort og introduksjonskurs",
    duration: "3 timer",
    price: "Kr 1 350,-",
    schemaPrice: "1350",
    description:
      "Perfekt for deg som vil bli trygg i kajakk fra første padletak. Vi går gjennom padleteknikk, sikkerhet, kameratredning og gode valg på vannet.",
    outcome: "Du får våttkort etter bestått kurs.",
    image: "/images/scraped/kayak/pusnes-introkurs-4613.jpg",
    imageAlt: "Nybegynner padler kajakk på introduksjonskurs ved Arendal",
  },
  {
    id: "88a9fa43-5c56-4bad-9133-0f4f402c50f7",
    name: "Grunnkurs hav",
    duration: "16 timer",
    price: "Kr 3 000,-",
    schemaPrice: "3000",
    description:
      "For deg som vil lære mer om havpadling, turplanlegging, navigasjon, værforståelse og trygg ferdsel i gruppe.",
    outcome: "Et solid steg videre etter våttkort.",
    image: "/images/scraped/kayak/kajakkurs-strandhotell-4010.jpg",
    imageAlt: "Kajakker klare på stranden før grunnkurs hav",
  },
  {
    id: "e639299b-81d9-42b8-b576-1621ecfab8be",
    name: "Teknikkurs",
    duration: "16 timer",
    price: "Kr 3 500,-",
    schemaPrice: "3500",
    description:
      "Vi jobber med effektive padletak, manøvrering, kantring, kontroll og bedre flyt i kajakken.",
    outcome: "For deg som vil padle mer presist og avslappet.",
    image: "/images/scraped/kayak/kajakkurs-redning-DSC_0165.jpg",
    imageAlt: "Kajakkpadler øver teknikk og redning i grønt vann",
  },
  {
    id: "6bbf424c-db51-46b4-8391-f106c8717f06",
    name: "Rullekurs",
    duration: "3 timer",
    price: "Kr 1 250,-",
    schemaPrice: "1250",
    description:
      "Et konsentrert kurs for deg som vil lære eller finpusse kajakkrulla med tett veiledning.",
    outcome: "Mer trygghet når du vil padle i friskere forhold.",
    image: "/images/scraped/kayak/kajakkursredning-3619.jpg",
    imageAlt: "Redningstrening og rullekurs i kajakk",
  },
];

const learningPoints = [
  "Trygg innføring i utstyr, sittestilling og grunnleggende padleteknikk",
  "Praktisk sikkerhet, kameratredning og hva du gjør hvis du havner i vannet",
  "Vurdering av vær, vind, strøm og gode rutevalg innaskjærs",
  "Rolig oppfølging fra instruktør med små grupper og mye tid på vannet",
];

const practicalFacts = [
  {
    icon: MapPin,
    title: "Oppmøte",
    text: "Som regel på Skarestrand i Kongshavn, med kort vei rett ned til sjøen.",
  },
  {
    icon: LifeBuoy,
    title: "Utstyr",
    text: "Kajakk, åre, spruttrekk, redningsvest og nødvendig sikkerhetsutstyr er inkludert.",
  },
  {
    icon: Clock3,
    title: "Varighet",
    text: "Fra tre timer på introduksjonskurs til helgekurs for deg som vil lære mer.",
  },
];

const faqItems = [
  {
    question: "Må jeg ha erfaring før jeg melder meg på kajakkurs?",
    answer:
      "Nei. Våttkort og introduksjonskurs passer for nybegynnere. Vi tar det i ditt tempo og starter med det grunnleggende.",
  },
  {
    question: "Er våttkort inkludert?",
    answer:
      "Ja, på våttkort og introduksjonskurs får du våttkort etter bestått kurs.",
  },
  {
    question: "Hva må jeg ta med selv?",
    answer:
      "Ta med klær etter vær, drikkeflaske og skift. Vi stiller med kajakk, åre, vest og nødvendig padleutstyr.",
  },
  {
    question: "Kan vi bestille privat kajakkurs?",
    answer:
      "Ja, vi kan sette opp privat kurs for to til fire personer eller tilpasse et opplegg for grupper. Be om forslag og pris, helt uforpliktende.",
  },
];

const pageUrl = absoluteUrl("/kurs/kajakkurs");
function createCourseListSchema(courses: CourseCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#courses`,
    name: "Kajakkurs og våttkort hos Wannado",
    itemListElement: courses.map((course, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: {
        "@id": `${absoluteUrl("/")}#organization`,
      },
      url: pageUrl,
      image: absoluteUrl(course.image),
      inLanguage: "nb-NO",
      offers: {
        "@type": "Offer",
        price: course.schemaPrice,
        priceCurrency: "NOK",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/booking"),
      },
    },
    })),
  } as const;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Kajakkurs og våttkort i Arendal",
  description:
    "Kajakkurs, våttkort, grunnkurs hav, teknikkurs og rullekurs med Wannado i Arendals skjærgård.",
  inLanguage: "nb-NO",
  isPartOf: {
    "@id": `${absoluteUrl("/")}#website`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: absoluteUrl("/images/scraped/kayak/pusnes-introkurs-4613.jpg"),
  },
} as const;

export default async function KajakkursPage() {
  const { data: products } = await sanityFetch({
    query: allProductsQuery,
    perspective: "published",
  });

  const sanityProducts = (products as SanityProduct[] | null) ?? [];
  const productById = new Map<string, SanityProduct>(
    sanityProducts.map((product) => [product._id, product]),
  );
  const courses = courseCards.map((course) => {
    const product = productById.get(course.id);
    const priceValue =
      product?.price ?? Number.parseInt(course.schemaPrice, 10);

    return {
      ...course,
      name: product?.name || course.name,
      description: product?.descriptionText || course.description,
      price: `Kr ${formatNok(priceValue)},-`,
      schemaPrice: String(priceValue),
      image: product?.imageUrl || course.image,
      imageAlt: product?.imageAlt || course.imageAlt,
    };
  });

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Kurs", path: "/kurs" },
          { name: "Kajakkurs", path: "/kurs/kajakkurs" },
        ])}
      />
      <JsonLd data={webPageSchema} />
      <JsonLd data={createCourseListSchema(courses)} />
      <JsonLd data={faqSchema} />
      <Navbar variant="solid" />

      <PageHero
        image="/images/scraped/kayak/pusnes-introkurs-4613.jpg"
        imageAlt="Kajakkurs i rolig vann ved Arendal"
        imagePosition="48% 44%"
        eyebrow="Kajakkurs i Arendal"
        title="Ta våttkort i skjærgården"
        intro="Vi eeeelsker å lære bort kajakk på Sørlandet. Du får trygg opplæring, alt utstyr inkludert og en deilig kursdag innaskjærs, rett og slett."
        primary={{ label: "Bestill kurs", href: "/booking" }}
        secondary={{ label: "Send forespørsel", href: "/kontakt?tjeneste=Kajakkurs" }}
        aside={
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-brown">
                <Waves className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-inter text-xs font-semibold text-teal">
                  Fra nybegynner
                </p>
                <p className="font-space text-2xl font-bold text-brown">
                  Til trygg padler
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["3 timer", "våttkortkurs"],
                ["16 timer", "grunnkurs hav"],
                ["Alt utstyr", "inkludert"],
              ].map(([value, label]) => (
                <div key={value} className="border-t border-border pt-4">
                  <p className="font-space text-2xl font-bold text-brown">
                    {value}
                  </p>
                  <p className="mt-1 font-inter text-sm text-brown-mid">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Kajakkurs som gjør deg trygg på vannet
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-brown-mid">
              Kurset handler ikke om å prestere mest mulig. Det handler om å
              skjønne kajakken, sjøen og egne valg. Vi øver praktisk, ler litt
              underveis og sørger for at du får mestring på kjøpet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="tel:+4794826710" className="gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ring Roar
              </Button>
              <Button href="#kurs" variant="outline" className="gap-2">
                Se kursene
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {learningPoints.map((point, index) => (
              <div
                key={point}
                className="border border-border bg-white p-5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <CheckCircle2
                  className="mb-4 h-6 w-6 text-teal"
                  aria-hidden="true"
                />
                <p className="font-inter text-sm leading-relaxed text-brown-mid">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kurs" className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Velg riktig kajakkurs
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-brown-mid">
              Start med våttkort hvis du er ny. Har du padlet litt før, finner
              vi et kurs som gir deg mer teknikk, mer kontroll og mer gøy.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.id}
                className="grid overflow-hidden border border-border bg-white md:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="relative min-h-[240px] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-h-[300px] flex-col p-6">
                  <div className="mb-5 grid gap-3 sm:flex sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="font-space text-2xl font-bold leading-tight text-brown">
                        {course.name}
                      </h3>
                      <p className="mt-2 font-inter text-sm font-semibold text-teal">
                        {course.duration}
                      </p>
                    </div>
                    <p className="font-space text-xl font-bold text-brown sm:shrink-0 sm:text-right">
                      {course.price}
                    </p>
                  </div>
                  <p className="font-inter text-sm leading-relaxed text-brown-mid">
                    {course.description}
                  </p>
                  <p className="mt-4 font-inter text-sm font-semibold leading-relaxed text-brown">
                    {course.outcome}
                  </p>
                  <div className="mt-auto pt-6">
                    <Button href="/booking">Bestill kurs</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden bg-brown">
            <Image
              src="/images/scraped/kayak/kajakkursredning-3619.jpg"
              alt="Kajakkurs med redningsøvelse i Arendals skjærgård"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-[55%_44%]"
            />
          </div>
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
              <Compass className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="font-space text-3xl font-bold leading-tight text-brown md:text-5xl">
              Før kursdagen
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-brown-mid">
              Vi sender deg praktisk informasjon om oppmøte, vær og bekledning
              før kursstart. Målet er at du skal møte rolig, forberedt og klar
              for en skikkelig fin dag på sjøen.
            </p>
            <div className="mt-8 grid gap-4">
              {practicalFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.title}
                    className="grid gap-4 border-t border-border pt-5 sm:grid-cols-[auto,1fr]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-teal">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-space text-xl font-bold text-brown">
                        {fact.title}
                      </h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-brown-mid">
                        {fact.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brown py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-space text-3xl font-bold leading-tight md:text-5xl">
                Spørsmål før du melder deg på?
              </h2>
              <p className="mt-5 font-inter text-lg leading-relaxed text-white/76">
                Det er helt lov. Skriv litt om erfaringen din, så hjelper vi deg
                med riktig nivå. Helt uforpliktende, selvfølgelig.
              </p>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-space text-xl font-bold text-white">
                    {item.question}
                    <span className="text-sand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 font-inter text-sm leading-relaxed text-white/72">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-10 sm:flex-row">
            <Button href="/booking" variant="sand">
              Bestill kurs
            </Button>
            <Button href="/kontakt?tjeneste=Kajakkurs" variant="outline-light">
              Send forespørsel
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
