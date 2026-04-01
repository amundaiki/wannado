"use client";

interface VideoBannerProps {
  src: string;
  height?: string;
  overlay?: "light" | "dark" | "none";
  children?: React.ReactNode;
}

export default function VideoBanner({
  src,
  height = "h-[40vh]",
  overlay = "dark",
  children,
}: VideoBannerProps) {
  const overlayClass =
    overlay === "dark"
      ? "bg-black/30"
      : overlay === "light"
        ? "bg-black/15"
        : "";

  return (
    <section className={`relative ${height} overflow-hidden`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
