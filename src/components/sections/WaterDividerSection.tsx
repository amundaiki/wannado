"use client";

export default function WaterDividerSection() {
  return (
    <section className="relative h-[200px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/havsul-clip-03-vanndetalj.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}
