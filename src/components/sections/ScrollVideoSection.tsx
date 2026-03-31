"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import NextImage from "next/image";

const FRAME_COUNT = 90;
const FRAME_PATH = "/videos/havsul-frames/frame_";

function getFrameSrc(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${FRAME_PATH}${padded}.jpg`;
}

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Tekst-animasjoner via scroll
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [30, 0, 0, -30]);
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.75], [0, 1, 1, 0]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[Math.round(index)];
    if (!img?.complete) return;

    // Sett canvas-buffer til viewport-størrelse for skarp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Cover-stil: beregn korrekt posisjon og størrelse
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      // Bildet er bredere enn canvas - crop sider
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      drawX = (rect.width - drawWidth) / 2;
      drawY = 0;
    } else {
      // Bildet er høyere enn canvas - crop topp/bunn
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      drawX = 0;
      drawY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      drawFrame(latest);
    }
  });

  // Tegn om ved resize
  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => drawFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, drawFrame, frameIndex]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-brown"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {!loaded && (
          <NextImage
            src="/images/havsul-poster.jpg"
            alt="Listerskoyten Havsul"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            className="font-dm italic text-cream/80 text-lg md:text-xl mb-3"
            style={{ opacity: subtitleOpacity }}
          >
            Listerskøyta Havsul
          </motion.p>
          <motion.h2
            className="font-space text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ opacity: headingOpacity, y: headingY }}
          >
            Seil gjennom historien
          </motion.h2>
          <motion.div style={{ opacity: ctaOpacity }}>
            <a
              href="/seilturer"
              className="inline-block bg-teal text-white font-space font-semibold px-8 py-3 rounded-full hover:bg-teal/90 transition-colors"
            >
              Se seilturene
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
