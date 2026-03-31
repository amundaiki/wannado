"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import NextImage from "next/image";

const FRAME_COUNT = 90;

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [30, 0, 0, -30]);
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.75], [0, 1, 1, 0]);

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
      className="relative h-[300vh] bg-brown"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {!ready && (
          <NextImage
            src="/images/havsul-poster.jpg"
            alt="Listerskøyten Havsul"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
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
