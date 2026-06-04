"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import NextImage from "next/image";

const FRAME_COUNT = 52;

function getFrameSrc(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `/videos/havsul-frames/frame_${padded}.jpg`;
}

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const scrollYProgress = useMotionValue(0);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.16, 0.28, 0.68, 0.82], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.16, 0.28, 0.68, 0.82], [36, 0, 0, -24]);
  const contentScale = useTransform(scrollYProgress, [0.16, 0.28, 0.68, 0.82], [0.985, 1, 1, 0.995]);

  useEffect(() => {
    const updateProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      const progress =
        scrollDistance > 0 ? Math.min(1, Math.max(0, -rect.top / scrollDistance)) : 0;

      scrollYProgress.set(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollYProgress]);

  // Sett canvas-størrelse (kun ved mount og resize)
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctxRef.current = canvas.getContext("2d");
    ctxRef.current?.scale(dpr, dpr);
  }, []);

  // Tegn et frame til canvas (uten å resette størrelse)
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const frameIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
    const img = imagesRef.current[frameIdx];
    if (!canvas || !ctx || !img) return;

    const rect = canvas.getBoundingClientRect();
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let dw: number, dh: number, dx: number, dy: number;
    if (imgRatio > canvasRatio) {
      dh = rect.height;
      dw = rect.height * imgRatio;
      dx = (rect.width - dw) / 2;
      dy = 0;
    } else {
      dw = rect.width;
      dh = rect.width / imgRatio;
      dx = 0;
      dy = (rect.height - dh) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = frameIdx;
  }, []);

  // Last frames i batcher (10 om gangen)
  useEffect(() => {
    let cancelled = false;

    async function loadBatch(start: number, end: number): Promise<void> {
      const promises = [];
      for (let i = start; i < end && i < FRAME_COUNT; i++) {
        promises.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (!cancelled) imagesRef.current[i] = img;
              resolve();
            };
            img.onerror = () => resolve(); // Ikke blokker på feil
            img.src = getFrameSrc(i);
          })
        );
      }
      await Promise.all(promises);
    }

    async function loadAll() {
      // Last første batch (frame 0 og noen til) først for rask visning
      await loadBatch(0, 10);
      if (cancelled) return;

      // Sett opp canvas og tegn første frame
      sizeCanvas();
      drawFrame(0);
      setReady(true);

      // Last resten i bakgrunnen
      for (let i = 10; i < FRAME_COUNT; i += 10) {
        if (cancelled) return;
        await loadBatch(i, i + 10);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [sizeCanvas, drawFrame]);

  // Oppdater canvas ved scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(latest);
    });
  });

  // Resize-handler
  useEffect(() => {
    const handleResize = () => {
      sizeCanvas();
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sizeCanvas, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-[#1f1712]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center">
          <NextImage
            src="/images/havsul-poster.jpg"
            alt="Listerskøyten Havsul"
            fill
            loading="eager"
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />

          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 bg-black/30" />

          <motion.div
            className="relative z-10 px-6 text-center will-change-transform"
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          >
            <p className="font-dm italic text-cream/80 text-lg md:text-xl mb-3">
              Listerskøyta Havsul
            </p>
            <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Seil gjennom historien
            </h2>
            <div>
              <a
                href="/seilturer"
                className="inline-block bg-teal text-white font-space font-semibold px-8 py-3.5 rounded-full hover:bg-teal/90 transition-colors text-base md:text-lg"
              >
                Se seilturene
              </a>
              <p className="font-inter text-white/60 text-sm mt-4">
                Med skipper Roar ved roret
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
