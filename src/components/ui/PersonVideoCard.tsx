"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "./Skeleton";

interface PersonVideoCardProps {
  name: string;
  role: string;
  bio: string;
  email: string;
  img: string;
  imgWidth: number;
  imgHeight: number;
  videoSrc: string;
  videoLabel: string;
  imageObjectPosition?: string;
  videoObjectPosition?: string;
  /** Seconds to skip into the video for a better opening moment */
  videoStartTime?: number;
}

export default function PersonVideoCard({
  name,
  role,
  bio,
  email,
  img,
  imgWidth,
  imgHeight,
  videoSrc,
  videoLabel,
  imageObjectPosition = "center center",
  videoObjectPosition = "center center",
  videoStartTime = 2,
}: PersonVideoCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for autoplay on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay/pause video when in/out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, showVideo]);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Video / Image container */}
      <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-brown/5">
        {showVideo ? (
          <video
            ref={videoRef}
            playsInline
            controls
            preload="auto"
            poster={img}
            className="w-full h-full object-cover"
            style={{ objectPosition: videoObjectPosition }}
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              if (videoStartTime && video.currentTime === 0) {
                video.currentTime = videoStartTime;
              }
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <button
            onClick={handlePlayClick}
            className="relative w-full h-full group cursor-pointer"
            aria-label={`Spill av: ${videoLabel}`}
          >
            <Image
              src={img}
              alt={name}
              width={imgWidth}
              height={imgHeight}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: imageObjectPosition }}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <Skeleton className="absolute inset-0" />
            )}
            {/* Play overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown/55 via-transparent to-transparent flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm text-brown font-inter text-sm font-medium px-5 py-2.5 rounded-full shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Se og hør intervju
              </div>
            </div>
            {/* Always-visible play icon (smaller, top-right) */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-brown ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="mt-8">
        <h3 className="font-space text-2xl md:text-3xl font-semibold text-brown">
          {name}
        </h3>
        <div className="font-inter text-[13px] md:text-[15px] font-medium text-teal mt-1">
          {role}
        </div>
        <p className="font-inter text-[15px] md:text-[17px] text-brown-mid leading-relaxed mt-4">
          {bio}
        </p>
        <a
          href={`mailto:${email}`}
          className="inline-block mt-4 font-inter text-[13px] md:text-[15px] text-brown-muted hover:text-brown border-b border-transparent hover:border-brown transition-colors"
        >
          {email}
        </a>
      </div>
    </motion.div>
  );
}
