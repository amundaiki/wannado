import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />
      <div className="pt-40 pb-20 bg-brown text-white text-center">
        <h1 className="font-space text-4xl md:text-6xl font-bold">Menneskene</h1>
      </div>
      <div className="flex-grow max-w-[900px] mx-auto px-6 py-20">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-border">
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hvem er vi?`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Tone Pernille Sivertsen`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`har vært en sentral del av Wannado siden 2005, hvor hun har kombinert sin lidenskap for energi, teambuilding og lek til å skape engasjerende opplevelser for deltakerne. Som sertifisert i`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Jungs TypeIndeks (JTI)`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`og`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`NLP-coach`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`, har hun en dyp forståelse for menneskers ulikheter og hvordan bygge sterke team. Hun er kjent for sin evne til å motivere og engasjere mennesker på alle nivåer, og får deltakerne til å strekke seg lenger enn de trodde var mulig.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`De siste årene har Tone Pernille også utvidet sin erfaring med hester, og har bygget opp en egen hesteflokk. Hun bruker sin kunnskap om`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`islandshester`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`og`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`dyreassisterte intervensjoner`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`til å formidle gleden av å oppleve naturen på en unik måte – fra hesteryggen. Hennes erfaring med både mennesker og dyr gir henne en unik evne til å bygge tillit og relasjoner.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Roar Laugerud`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`er en erfaren padle- og ekspedisjonsentusiast som utstråler ro og trygghet. Med sin rolige og sindige tilnærming skaper han en trygg ramme for deltakerne, og gir dem den forståelsen de trenger for å begi seg ut på spennende og utfordrende opplevelser. Roar brenner for å formidle friluftsliv og naturens skjønnhet gjennom praktiske opplevelser, og hans mål er alltid å sette deltakerne i stand til å være på rett sted til rett tid – enten de er på kajakkurs eller på eventyr i naturen.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Roar har oppnådd`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Veileder Hav`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`-sertifikatet, som er det høyeste nivået på Padleforbundets utdanningsstige. I tillegg er han sertifisert på nest høyeste nivå på BCU (British Canoe Union), som regnes som en av verdens beste padleorganisasjoner. Han har også fritidsskippersertifikat, og gjennom tilleggskurs er han autorisert til å føre båter med inntil 12 passasjerer.`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hva tenker vi?`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Lek er helsebringende, utviklende og mestringsgivende – spørsmålet er bare;`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Hva er DIN lek?`}</p>
            <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">{`Kanskje vi kan finne det ut sammen?`}</p>
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
