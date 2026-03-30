"use client";

import { motion } from "framer-motion";

export default function FeatureSection() {
  return (
    <section id="teambuilding" className="bg-card-bg py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tp-typeteori.jpg"
              alt="Teambuilding med Wannado"
              className="w-full aspect-[16/11] object-cover rounded-lg shadow-sm"
            />
            {/* Overlapping smaller image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/20230910_125202-1280x960.jpg"
              alt="Kreativt samarbeid"
              className="absolute -bottom-10 -right-6 md:-right-12 w-[60%] md:w-[55%] aspect-video object-cover rounded-lg border-4 border-card-bg shadow-xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-16 md:mt-0"
          >
            <div className="w-[1px] h-8 bg-border mb-4"></div>
            <div className="font-inter text-[11px] font-medium uppercase tracking-[3px] text-teal">
              For Bedrifter
            </div>
            <h2 className="font-space text-3xl md:text-5xl font-bold text-brown leading-[1.15] mt-3">
              Følg din ledestjerne. Bygg sterkere team.
            </h2>
            <p className="font-inter text-base md:text-lg text-brown-mid leading-[1.8] mt-6">
              Våre teambuilding-kurs er utviklet med over 20 års erfaring innen prestasjonskultur 
              og JTI/NLP-metodikk. Utfordre komfortsonen, lær mer om dere selv og hverandre 
              – på sjøen, med hester, eller på utvalgte destinasjoner.
            </p>
            <ul className="mt-8 space-y-3 font-inter text-sm md:text-base text-brown-muted">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                Skreddersydde ledergruppe-samlinger
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                Seiling, navigasjon og felles master-oppgaver
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                Aktiviteter med islandshest for mestring og tillit
              </li>
            </ul>
            <a
              href="#kontakt"
              className="inline-block mt-10 font-inter text-base font-medium text-brown hover:text-teal hover:underline transition-colors"
            >
              Les mer om våre bedriftskurs &rarr;
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
