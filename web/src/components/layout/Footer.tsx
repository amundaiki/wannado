export default function Footer() {
  return (
    <footer className="bg-brown pt-20 pb-10 border-t border-brown-muted/20">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-16 mb-20 text-white">
          
          <div className="md:col-span-1">
            <h3 className="font-space text-2xl font-bold uppercase tracking-widest mb-6">Wannado</h3>
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-[250px]">
              Eksklusive opplevelser, historisk seilas og teambuilding i skjærgården rundt Arendal.
            </p>
          </div>

          <div>
            <h4 className="font-inter text-[11px] font-semibold text-white/40 uppercase tracking-[2px] mb-6">Opplevelser</h4>
            <ul className="space-y-4">
              <li><a href="/opplevelser" className="font-inter text-[14px] text-white/80 hover:text-sand transition-colors">Vinterkajakk & Sauna</a></li>
              <li><a href="/opplevelser" className="font-inter text-[14px] text-white/80 hover:text-sand transition-colors">Sunset & Stories</a></li>
              <li><a href="/opplevelser" className="font-inter text-[14px] text-white/80 hover:text-sand transition-colors">Silent Sailing Retreat</a></li>
              <li><a href="/teambuilding" className="font-inter text-[14px] text-white/80 hover:text-sand transition-colors">Teambuilding</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-[11px] font-semibold text-white/40 uppercase tracking-[2px] mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="font-inter text-[14px] text-white/80">
                <span className="block text-white/50 text-[12px] mb-1">E-post</span>
                <a href="mailto:mail@wannado.no" className="hover:text-sand transition-colors">mail@wannado.no</a>
              </li>
              <li className="font-inter text-[14px] text-white/80 mt-4">
                <span className="block text-white/50 text-[12px] mb-1">Tone P. Sivertsen</span>
                <a href="tel:+4799469957" className="hover:text-sand transition-colors">+47 99 46 99 57</a>
              </li>
              <li className="font-inter text-[14px] text-white/80 mt-4">
                <span className="block text-white/50 text-[12px] mb-1">Roar Laugerud</span>
                <a href="tel:+4794826710" className="hover:text-sand transition-colors">+47 94 82 67 10</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-inter text-[11px] font-semibold text-white/40 uppercase tracking-[2px] mb-6">Følg oss</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-sand hover:text-brown transition-all" aria-label="Instagram">
                Ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-sand hover:text-brown transition-all" aria-label="Facebook">
                Fb
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-sand hover:text-brown transition-all" aria-label="LinkedIn">
                Li
              </a>
            </div>
            <div className="mt-8">
              <a href="/kontakt" className="inline-block px-6 py-2.5 rounded-md border border-white/20 text-[13px] font-medium hover:bg-white hover:text-brown transition-colors">
                Gå til booking
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} Wannado. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-inter text-[12px] text-white/40 hover:text-white transition-colors">Personvern</a>
            <a href="#" className="font-inter text-[12px] text-white/40 hover:text-white transition-colors">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
