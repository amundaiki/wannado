import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Samarbeidspartnere</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`hove`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Tekst her`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Arendal`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Tekst her`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Gjveving`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Tekst her`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Wannado anbefaler`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Overnatting/mat`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Bokhotellet Lyngørporten`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Strand Hotell Fevik`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Clarion Hotell Tyholmen`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hotell Norge Lillesand`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Krøgeneslåven`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Bjellandstrand`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Smag og Behag Grimstad`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Utstyrsleverandører`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Eian Fritid`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Padlespesialisten`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Nordic Outdoor`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Samarbeidspartnere`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Strand Hotell Fevik`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Lyngørporten`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Arendal Gjestehavn`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Arendal Turistkontor`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Raet Nasjonalpark`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Holla Islandshestgård`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Bjellandstrand`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Mindline`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`MS Torungen`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`DNT Aust Agder`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`DNT Sør`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Norges Padleforbund`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
