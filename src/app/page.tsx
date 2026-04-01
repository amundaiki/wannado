import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CarouselSection from "@/components/sections/CarouselSection";
import BentoGridSection from "@/components/sections/BentoGridSection";
import ScrollVideoSection from "@/components/sections/ScrollVideoSection";
import FeatureSection from "@/components/sections/FeatureSection";
import PeopleSection from "@/components/sections/PeopleSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import VideoBanner from "@/components/ui/VideoBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: 'Wannado',
            description: 'Opplevelser i Arendals skjærgård - seilturer, kajakkturer, teambuilding og foredrag',
            url: 'https://wannado.no',
            telephone: '+4799469957',
            email: 'mail@wannado.no',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Skarestrand 11',
              addressLocality: 'Kongshavn',
              postalCode: '4812',
              addressCountry: 'NO',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 58.4328,
              longitude: 8.8428,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '08:00',
              closes: '21:00',
            },
            sameAs: [
              'https://www.facebook.com/wannado',
              'https://www.instagram.com/wannado',
            ],
          }),
        }}
      />
      <Navbar />
      <HeroSection />
      <CarouselSection />
      <ScrollVideoSection />
      <BentoGridSection />

      {/* Fyrtårn - cinematisk pusterom mellom BentoGrid og Feature */}
      <VideoBanner
        src="/videos/havsul-clip-05-fyrtarn.mp4"
        height="h-[40vh]"
        overlay="dark"
      />

      <FeatureSection />

      {/* Ankomst Merdø - stort cinematisk moment før People */}
      <VideoBanner
        src="/videos/havsul-clip-06-merdo-ankomst.mp4"
        height="h-[60vh]"
        overlay="dark"
      >
        <p className="font-dm text-lg italic text-white/80 md:text-xl">
          Velkommen ombord
        </p>
      </VideoBanner>

      <PeopleSection />

      {/* Vanndetalj - rolig overgang til testimonials */}
      <VideoBanner
        src="/videos/havsul-clip-03-vanndetalj.mp4"
        height="h-[30vh]"
        overlay="light"
      />

      <TestimonialsSection />
      <Footer />
    </main>
  );
}
