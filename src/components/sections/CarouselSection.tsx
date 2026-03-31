"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

const CAROUSEL_DATA = [
  {
    badge: "Opplevelse",
    title: "Vinterkajakk & Sauna",
    desc: "Guidet padling mellom isdekkede holmer, etterfulgt av rykende varm badstue.",
    price: "Fra 890,-",
    img: "/images/scraped/kayak/53G0425-scaled.jpg",
    width: 2560,
    height: 1707,
  },
  {
    badge: "Premium",
    title: "Sunset & Stories",
    desc: "Vår mest populære tur. Seilskuta Havsul i solnedgang med lokale tapas og historisk sus.",
    price: "Fra 790,-",
    img: "/images/scraped/sailing/hav-4-2.jpg",
    width: 1024,
    height: 683,
  },
  {
    badge: "Nyhet",
    title: "Silent Sailing Retreat",
    desc: "Koble helt av fra hverdagen. En digital detox under seil, designet for indre ro.",
    price: "Fra 1290,-",
    img: "/images/scraped/sailing/P9010367.jpg",
    width: 1024,
    height: 641,
  },
  {
    badge: "Familie",
    title: "Skjærgårdseventyr",
    desc: "Ta med barna på oppdagelsesferd. Krabbefiske, sjørøverhistorier og lærerik lek.",
    price: "Fra 625,-",
    img: "/images/scraped/sailing/P7300114.jpg",
    width: 1024,
    height: 768,
  },
];

export default function CarouselSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="opplevelser" className="bg-cream py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-inter text-xs font-medium uppercase tracking-[4px] text-brown-muted mb-3">
            Destinasjon Arendal
          </div>
          <h2 className="font-space font-semibold text-3xl md:text-5xl text-brown mb-10">
            Hva er din lek?
          </h2>
        </motion.div>

        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card-bg items-center justify-center z-10 shadow-sm hover:shadow-md hover:border-brown-light transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-brown" />
          </button>
          
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card-bg items-center justify-center z-10 shadow-sm hover:shadow-md hover:border-brown-light transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-brown" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-2 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CAROUSEL_DATA.map((item, i) => (
              <motion.div
                key={i}
                className="flex-none w-[80%] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start bg-card-bg rounded-xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-card-bg text-brown font-inter text-[11px] font-medium px-3 py-1.5 rounded-md shadow-sm">
                    {item.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-space text-xl font-semibold text-brown mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-brown-muted line-clamp-2 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-inter text-sm font-medium text-teal">
                      {item.price}
                    </span>
                    <span className="font-inter text-sm text-brown hover:text-teal hover:underline transition-colors shrink-0">
                      Les mer &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-right mt-4 md:mt-8">
          <a
            href="#"
            className="font-inter text-sm font-medium text-brown hover:text-teal transition-colors"
          >
            Se alle våre turer &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
