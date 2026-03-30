import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Kurs</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kajakkurs`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Avanserte kajakkurs`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hestekurs`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Jungs Typeindeks (JTI)`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Interessert?`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Ta kontakt via vårt bookingskjema eller ring Roar på telefon 94 82 67 10.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kontakt`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
