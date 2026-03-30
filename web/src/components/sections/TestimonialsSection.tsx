"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MARQUEE_ITEMS = [
  "Uforglemmelig kveld", "Fantastisk mannskap", "Magisk solnedgang", "Perfekt for teambuilding",
  "Historisk sus", "Nydelig mat", "Trygt og profesjonelt", "Anbefales på det varmeste",
  "Uforglemmelig kveld", "Fantastisk mannskap", "Magisk solnedgang", "Perfekt for teambuilding"
];

const QUOTES = [
  {
    text: "En helt magisk opplevelse. Å se Arendal fra sjøsiden i solnedgang ombord på en så flott skute, med nydelig servering, var høydepunktet på sommeren.",
    author: "Kari N.",
    tour: "Sunset & Stories"
  },
  {
    text: "Teambuildingen på Havsul ga oss akkurat det pusterommet vi trengte. Fantastisk opplegg fra Tone og Roar som virkelig sveiset gjengen sammen.",
    author: "Ledergruppe",
    tour: "Skreddersydd arrangement"
  },
  {
    text: "Barna snakker fortsatt om krabbefisket og å få svinge på roret. En super feriedag for hele familien!",
    author: "Familien Olsen",
    tour: "Skjærgårdseventyr"
  }
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Marquee Banner */}
      <div className="bg-brown py-4 overflow-hidden flex flex-col gap-1.5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap min-w-max"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="font-inter text-sm text-white/40 tracking-wider px-5">{item}</span>
              <span className="text-white/25 px-1">•</span>
            </div>
          ))}
        </motion.div>
        
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap min-w-max"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={`reverse-${i}`} className="flex items-center">
              <span className="font-inter text-sm text-white/40 tracking-wider px-5">{item}</span>
              <span className="text-white/25 px-1">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated Quotes */}
      <div className="bg-card-bg py-16 md:py-28">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-full"
              >
                <div className="mb-6 font-dm text-4xl md:text-5xl text-brown-light/30 leading-none">
                  &#8220;
                </div>
                <p className="font-space text-xl md:text-[26px] font-medium text-brown leading-relaxed max-w-2xl mx-auto">
                  {QUOTES[index].text}
                </p>
                <div className="mt-8">
                  <span className="font-inter text-[15px] font-semibold text-brown block">
                    {QUOTES[index].author}
                  </span>
                  <span className="font-inter text-[13px] text-teal block mt-1">
                    {QUOTES[index].tour}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-3 mt-10">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-brown scale-125" : "bg-border hover:bg-brown-light"
                }`}
                aria-label={`Show quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
