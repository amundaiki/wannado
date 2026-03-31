"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BENTO_DATA = [
  {
    title: "Skreddersydde arrangementer",
    price: "Fra 15.000,-",
    img: "/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
    large: true,
  },
  {
    title: "Ride & Reconnect",
    price: "Helgepakke",
    img: "/images/scraped/landscape/20230521_180051-2024-scaled.jpg",
    large: false,
  },
  {
    title: "Arendalsuka VIP",
    price: "I august",
    img: "/images/scraped/sailing/baat-fb-havsul.jpg",
    bottom: true,
  },
  {
    title: "Kajakkurs for alle",
    price: "Våttkort",
    img: "/images/scraped/kayak/53G0425-scaled.jpg",
    bottom: true,
  },
  {
    title: "Juleseilas",
    price: "Magisk desember",
    img: "/images/scraped/sailing/hav-4-2.jpg",
    bottom: true,
  },
];

export default function BentoGridSection() {
  return (
    <section className="bg-warm-white py-16 md:py-24">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(300px,40vh)_minmax(250px,30vh)] gap-2 group/grid">
          
          {/* Top Left (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 relative rounded-lg overflow-hidden cursor-pointer group/card transition-all duration-400 h-[300px] md:h-auto"
          >
            <Image
              src={BENTO_DATA[0].img}
              alt={BENTO_DATA[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
              <h3 className="font-space text-2xl md:text-3xl font-semibold text-white">
                {BENTO_DATA[0].title}
              </h3>
              <p className="font-inter text-sm md:text-base text-white/80 mt-1">
                {BENTO_DATA[0].price}
              </p>
            </div>
            {/* Blur overlay for others when hovering grid */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
          </motion.div>

          {/* Top Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 relative rounded-lg overflow-hidden cursor-pointer group/card transition-all duration-400 h-[300px] md:h-auto"
          >
            <Image
              src={BENTO_DATA[1].img}
              alt={BENTO_DATA[1].title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-5 left-5 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
              <h3 className="font-space text-xl md:text-2xl font-semibold text-white">
                {BENTO_DATA[1].title}
              </h3>
              <p className="font-inter text-sm text-white/80 mt-1">
                {BENTO_DATA[1].price}
              </p>
            </div>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
          </motion.div>

          {/* Bottom 3 items */}
          {BENTO_DATA.slice(2).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="col-span-1 relative rounded-lg overflow-hidden cursor-pointer group/card transition-all duration-400 h-[250px] md:h-auto"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-5 left-5 z-10 transition-transform duration-300 group-hover/card:translate-x-2">
                <h3 className="font-space text-lg md:text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="font-inter text-xs md:text-sm text-white/80 mt-1">
                  {item.price}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover/grid:opacity-100 group-hover/card:!opacity-0 transition-opacity duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
