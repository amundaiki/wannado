"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface VideoBannerProps {
  src: string;
  height?: string;
  overlay?: "light" | "dark" | "none";
  children?: React.ReactNode;
  poster?: string;
}

const VIDEO_POSTERS: Record<string, string> = {
  "/videos/havsul-clip-05-fyrtarn.mp4": "/images/scraped/landscape/homborsund-fyr.jpg",
  "/videos/havsul-clip-06-merdo-ankomst.mp4": "/images/scraped/sailing/hav-1-2.jpg",
  "/videos/havsul-clip-03-vanndetalj.mp4": "/videos/havsul-frames/frame_024.jpg",
};

export default function VideoBanner({
  src,
  height = "h-[40vh]",
  overlay = "dark",
  children,
  poster,
}: VideoBannerProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const resolvedPoster = useMemo(
    () => poster ?? VIDEO_POSTERS[src] ?? "/images/havsul-poster.jpg",
    [poster, src]
  );
  const overlayClass =
    overlay === "dark"
      ? "bg-brown-dark/30"
      : overlay === "light"
        ? "bg-brown-dark/15"
        : "";

  return (
    <section className={`relative ${height} overflow-hidden`}>
      <Image
        src={resolvedPoster}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        } motion-reduce:opacity-100`}
        aria-hidden="true"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={resolvedPoster}
        aria-hidden="true"
        onLoadedData={() => setIsVideoReady(true)}
        onCanPlay={() => setIsVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center [&>p]:text-2xl [&>p]:font-medium md:[&>p]:text-4xl">
          {children}
        </div>
      )}
    </section>
  );
}
