import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PeopleSection from "@/components/sections/PeopleSection";

export default function OmOss() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Menneskene bak Wannado</h1>
        <p className="font-inter mt-6 text-white/70 max-w-xl mx-auto text-lg hover:text-white transition-colors">
          Lang erfaring, trygghet på hav og ufattelig stort engasjement for mestring og naturkraft.
        </p>
      </div>
      <div className="flex-grow">
        <PeopleSection />
      </div>
      <Footer />
    </main>
  );
}
