"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BENTO_DATA = [
  {
    title: "Teambuilding som skaper ekte samhold",
    price: "For grupper og bedrifter",
    img: "/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
    large: true,
    href: "/teambuilding",
  },
  {
    title: "Lær noe nytt med Wannado",
    price: "Kajakkurs og faglig påfyll",
    img: "/images/scraped/kayak/kajakkurs-strandhotell-4010.jpg",
    large: false,
    href: "/kajakkturer",
  },
  {
    title: "Lei utstyr og skap ditt eget eventyr",
    price: "Kajakk, kano og utstyr",
    img: "/images/utleie-bilde.jpg",
    bottom: true,
    href: "/utleie",
  },
  {
    title: "Foredrag som engasjerer",
    price: "JTI og ekspedisjonsglede",
    img: "/images/tp-typeteori.jpg",
    bottom: true,
    href: "/foredrag",
  },
  {
    title: "Seilturer med Listerskøyta Havsul",
    price: "Historisk seilas i skjærgården",
    img: "/images/scraped/sailing/hav-1-2.jpg",
    bottom: true,
    href: "/seilturer",
  },
];

export default function BentoGridSection() {
  return (
    <section id="flere-opplevelser" className="bg-warm-white py-16 md:py-24">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(300px,40vh)_minmax(250px,30vh)] gap-2 group/grid">
          
          {/* Top Left (Large) */}
          <Link
            href={BENTO_DATA[0].href}
            className="md:col-span-2 relative rounded-lg overflow-hidden cursor-pointer group/card transition-colors duration-400 h-[300px] md:h-auto block"
            aria-label={BENTO_DATA[0].title}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={BENTO_DATA[0].img}
                alt={BENTO_DATA[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
                <h3 className="font-space text-2xl md:text-3xl font-semibold text-white">
                  {BENTO_DATA[0].title}
                </h3>
                <p className="font-inter text-sm md:text-base text-white/95 mt-1">
                  {BENTO_DATA[0].price}
                </p>
              </div>
              <div className="absolute inset-0 bg-brown-dark/10 opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
            </motion.div>
          </Link>

          {/* Top Right */}
          <Link
            href={BENTO_DATA[1].href}
            className="md:col-span-1 relative rounded-lg overflow-hidden cursor-pointer group/card transition-colors duration-400 h-[300px] md:h-auto block"
            aria-label={BENTO_DATA[1].title}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={BENTO_DATA[1].img}
                alt={BENTO_DATA[1].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-5 left-5 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
                <h3 className="font-space text-xl md:text-2xl font-semibold text-white">
                  {BENTO_DATA[1].title}
                </h3>
                <p className="font-inter text-sm text-white/95 mt-1">
                  {BENTO_DATA[1].price}
                </p>
              </div>
              <div className="absolute inset-0 bg-brown-dark/10 opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
            </motion.div>
          </Link>

          {/* Bottom 3 items */}
          {BENTO_DATA.slice(2).map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="col-span-1 relative rounded-lg overflow-hidden cursor-pointer group/card transition-colors duration-400 h-[250px] md:h-auto block"
              aria-label={item.title}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.16 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/85 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-5 left-5 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
                  <h3 className="font-space text-lg md:text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="font-inter text-xs md:text-sm text-white/95 mt-1">
                    {item.price}
                  </p>
                </div>
                <div className="absolute inset-0 bg-brown-dark/10 opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
