"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            <Image
              src="/images/scraped/teambuilding/Bungeerunning-7607.jpg"
              alt="Teambuilding med Wannado"
              width={2250}
              height={1500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full aspect-[16/11] object-cover rounded-lg shadow-sm"
            />
            {/* Overlapping smaller image */}
            <Image
              src="/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg"
              alt="Kreativt samarbeid"
              width={2250}
              height={1500}
              sizes="(max-width: 768px) 60vw, 30vw"
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
              Teambuilding som bygger tillit og samhold.
            </h2>
            <p className="font-inter text-base md:text-lg text-brown-mid leading-[1.8] mt-6">
              I over 15 år har Wannado laget opplegg for grupper som trenger mer enn en hyggelig dag ute.
              Vi kombinerer lek, samarbeid og tydelige rammer slik at dere får en opplevelse som merkes
              lenge etter at dagen er over.
            </p>
            <ul className="mt-8 space-y-3 font-inter text-sm md:text-base text-brown-muted">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                360° Wannado, Cluedo og Mord i Cicilia
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                Innendørs og utendørs opplegg tilpasset gruppen
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0"></span>
                Mulighet for faglig påfyll med foredrag og JTI
              </li>
            </ul>
            <a
              href="/teambuilding"
              className="inline-block mt-10 font-inter text-base font-medium text-brown hover:text-teal hover:underline transition-colors"
            >
              Les mer om teambuilding &rarr;
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
