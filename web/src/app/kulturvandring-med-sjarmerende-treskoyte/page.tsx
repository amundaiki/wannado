import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Kulturvandring-med-sjarmerende-treskoyte</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Båttur med seilskøyta Havsul fra 1933`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kulturvandring i Arendals skjærgård med historiefortelling og mulighet for å sette seg inn i Arendals storhetstid under seilskutetiden, Vi får innblikk i skipsbygging, losvirksomhet, fanteliv, uthavnen Merdø, Brattekleiv Skipsverft mm.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Grupper kan avtale matservering på Merdø eller Brattekleiv Skipsverft, alternativt catering ombord`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Passer for grupper inntil 12 personer`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kr 350,- pr pers Varighet 2-3 timer`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Charterpris 3500,- pr time`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Fremmøte i Pollen i Arendal`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
