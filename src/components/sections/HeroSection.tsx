"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const words = ["ro og balanse", "eventyr på havet", "lek og fellesskap"];
const HERO_POSTER = "/images/scraped/sailing/baat-fb-havsul.jpg";

type HeroSectionProps = {
  heading?: string | null;
  rotatingWords?: string[] | null;
  intro?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  posterImageUrl?: string | null;
  posterImageAlt?: string | null;
};

export default function HeroSection({
  heading = "Opplevelser i Arendals skjærgård",
  rotatingWords,
  intro = "Mennesker trenger pusterom. Ombord i vår skøyte fra 1933 går turen gjennom Sørlandets skjærgård. Her finner vi tilbake til lek og fellesskap.",
  primaryCtaLabel = "Utforsk turer",
  primaryCtaHref = "#opplevelser",
  posterImageUrl,
  posterImageAlt,
}: HeroSectionProps) {
  const heroWords = rotatingWords && rotatingWords.length >= 2 ? rotatingWords : words;
  const poster = posterImageUrl || HERO_POSTER;
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setVideoPaused(false);
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  useEffect(() => {
    // Respekter prefers-reduced-motion: ikke auto-roter ordene da.
    if (prefersReducedMotion) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroWords.length, prefersReducedMotion]);

  return (
    <section className="relative min-h-[100dvh] w-[100dvw] max-w-full overflow-hidden">
      <Image
        src={poster}
        alt={posterImageAlt || "Havsul under seil i Arendals skjærgård"}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover md:hidden md:motion-reduce:block"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover md:block md:motion-reduce:hidden"
      >
        <source
          src="/videos/havsul-clip-01-aerial-kystby.mp4"
          type="video/mp4"
        />
      </video>
      
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(42,31,24,0.58)_0%,rgba(42,31,24,0.2)_26%,rgba(72,56,43,0.18)_48%,rgba(42,31,24,0.9)_100%)]" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-[10vh] z-20 box-border w-full max-w-none px-6 md:bottom-[140px] md:left-[80px] md:right-[80px] md:max-w-[900px] md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[42rem] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
        >
          <h1 className="font-space text-[2.35rem] font-bold leading-[1.06] sm:text-5xl md:text-6xl lg:text-7xl">
            {heading}
          </h1>
          <div
            className="relative mt-3 h-[1.2em] overflow-hidden font-dm text-[2.25rem] font-bold text-sand leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
            aria-hidden="true"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${index}-${heroWords[index]}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 block whitespace-nowrap"
              >
                {heroWords[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-6 max-w-full font-inter text-base leading-relaxed text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.65)] sm:max-w-[34rem] md:max-w-[70ch] md:text-xl">
          {intro}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={primaryCtaHref || "#opplevelser"} variant="sand">
            {primaryCtaLabel || "Utforsk turer"}
          </Button>
          <Button href="/booking" variant="outline-light">
            Bestill opplevelse
          </Button>
        </div>
      </div>

      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={toggleVideo}
          className="absolute bottom-10 right-16 z-20 hidden min-h-11 items-center rounded-control border border-white/60 bg-brown-dark/70 px-4 font-body text-sm font-semibold text-white transition-colors hover:bg-brown-dark md:inline-flex"
        >
          {videoPaused ? "Spill av video" : "Pause video"}
        </button>
      )}
    </section>
  );
}
