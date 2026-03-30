import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CarouselSection from "@/components/sections/CarouselSection";
import BentoGridSection from "@/components/sections/BentoGridSection";
import FeatureSection from "@/components/sections/FeatureSection";
import PeopleSection from "@/components/sections/PeopleSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />
      <HeroSection />
      <CarouselSection />
      <BentoGridSection />
      <FeatureSection />
      <PeopleSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
