import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Booking</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Vil du? med Wannado kan du…`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Velkommen til Wannado – Bestill din opplevelse`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Ønsker du å bestille en opplevelse? Bruk skjemaene nedenfor for en enkel og rask booking, eller kontakt oss direkte på telefon eller e-post. Vi hjelper deg gjerne med spørsmål og spesialtilpasninger!`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Gavekort – Gi bort en opplevelse`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Overrask noen med et unikt eventyr! Velg mellom`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`hesteopplevelser, kajakkturer eller kajakkurs`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`, så lager vi et personlig gavekort tilpasset mottakeren.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Ønsker du et skreddersydd teambuilding-opplegg?`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Fyll ut skjemaet og legg inn`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`dato, sted og antall deltakere`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`i kommentar, så sender vi et tilbud.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kajakk og kano`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Ønsker du å leie kajakk eller kano? Send oss en melding for forespørsel eller bestilling.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Informasjon og booking`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Har du spørsmål eller ønsker å bestille en opplevelse? Kontakt oss direkte:`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Tone Pernille`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`– Generelle henvendelser, teambuilding, gavekort og spesialtilpassede opplevelser`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`📩`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`tp`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`@wannado`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`.no`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`| 📞 +47 99 46 99 57`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Roar`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`– Kajakk-, kano-, og båtforespørsler`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`📩`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`roar`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`@wannado`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`.no`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`| 📞 +47 94 82 67 10`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Info: Kajakkurs`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Info: Fyr til fyr tur`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Info: Hesteopplevelser`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Bli med på ekspedisjon`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Å bli klar for en ekspedisjon er en prosess som krever tid, erfaring og riktig forberedelse. Derfor har vi en lukket gruppe for ekspedisjonsinteresserte – et fellesskap hvor du kan lære, planlegge og dele erfaringer med andre eventyrere.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Lukket gruppe for ekspesisjonsdrømmer`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
