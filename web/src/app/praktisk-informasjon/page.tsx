import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Praktisk-informasjon</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Praktisk informasjon om våre arrangement`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Praktisk informasjon ang. våre arrangement`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`På kajakkturer bruker vi en kombinasjon av singel og dobbelkajakker for at flest mulig skal kunne bli med oss på tur. Dette er også en sikkerhetsforanstaltning i forhold til evt skader eller sykom.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Påkledning under padling er ullundertøy el. til å ha under drakta. Ta med klesskift. På sommeren når det er høyere vanntemperatur, padler vi i fritidstøy/tights.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Vi har flere typer kajakker, men kan ikke garantere at vi har kajakk til alle kroppsfasonger og vektklasser.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Bortsett fra begynnerkursene, kan vi arrangere padling hele året. Vi har tørrdrakter til hele gruppen.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Alle deltar på eget ansvar. Sykdom, skalder eller medisinbehov som kan innvirke på turen/arrangementet skal opplyses til arrangør eller turleder.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Wannado har en ansvarsforsikring hos Gjensidige som dekker det rettslige erstatningsansvar for skade som er voldt som følge av vår virksomhet.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Den enkelte gjest må selv sørge for å ha en reise- og ulykkesforsikring. Sjekk om den gjelder for din tur/aktivitet`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`På turer/ekspedisjoner er det forhåndsbetaling. Bookingen bekreftes når 10% av totalbeløpet er betalt.(ikke refunderbart) resten forfaller 1 mnd før avreise. Om bookingen skjer senere enn 1 mnd før avreise, forfaller hele beløpet ved booking. Ved avbestilling senere enn 2 uker før avreise, har deltakeren ikke krav på refundering av deltakeravgift. Sjekk forsikringen din om den dekker.`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
