"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["ro og balanse", "neste opplevelse", "eventyr på havet"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/baat-fb.jpg"
        alt="Havsul under seil"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Subtle Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#48382B]/70 via-[#48382B]/20 to-transparent z-10" />

      {/* Content */}
      <div className="absolute bottom-[10vh] left-[5vw] md:bottom-[140px] md:left-[80px] z-20 max-w-[900px] px-6 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-space font-bold text-white leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Finn din<br />
          <span className="block h-[1.2em] relative overflow-hidden mt-2">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-dm italic block absolute left-0 top-0 whitespace-nowrap"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-white/70 mt-6 max-w-lg text-lg md:text-xl"
        >
          Mennesker trenger pusterom. Ombord i vår skøyte fra 1933, 
          gjennom Sørlandets vakre skjærgård, finner vi tilbake til lek og fellesskap.
        </motion.p>

        <motion.a
          href="#opplevelser"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="inline-block mt-8 px-8 py-3.5 border-2 border-white rounded-md text-white font-inter font-medium text-base transition-colors duration-300 hover:bg-white hover:text-brown"
        >
          Utforsk turer
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[24px] right-[24px] md:bottom-10 md:right-16 z-20 flex flex-col items-center gap-2">
        <div className="w-[1px] h-10 bg-white/40 relative">
          <motion.div
            animate={{
              y: [0, 34, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
        <span className="font-inter text-[11px] text-white/40 tracking-[0.2em] [writing-mode:vertical-rl]">
          SCROLL
        </span>
      </div>
    </section>
  );
}
