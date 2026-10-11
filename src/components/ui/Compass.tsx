/*
  Kompasset fra logoen som vannmerke. Maske i stedet for img, slik at fargen
  styres av klassen (bg-white/10 på mørk flate, bg-brown/10 på lys).
*/
export default function Compass({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{
        maskImage: "url(/images/scraped/logo/wannado-logo.png)",
        WebkitMaskImage: "url(/images/scraped/logo/wannado-logo.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
