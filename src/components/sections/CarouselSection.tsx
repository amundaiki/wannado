"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type CarouselItem = {
  badge: string;
  title: string;
  desc: string;
  price: string;
  img: string;
  alt?: string;
  width?: number;
  height?: number;
  href: string;
};

const CAROUSEL_DATA: CarouselItem[] = [
  {
    badge: "Seilturer",
    title: "Listerskøyta Havsul fra 1933",
    desc: "Historisk seilas i Arendals skjærgård med fortellinger, ro og en opplevelse som setter tempoet ned.",
    price: "Fra kr 350,-",
    img: "/images/havsul.jpg",
    width: 1600,
    height: 900,
    href: "/seilturer",
  },
  {
    badge: "Kajakk",
    title: "Kajakkturer og kajakkurs",
    desc: "Fra våttkort og grunnkurs til skjærgårdssafari med trygge guider og alt utstyr inkludert.",
    price: "Fra kr 1 250,-",
    img: "/images/scraped/kayak/kajakktur-strandhotell-4015.jpg",
    width: 2048,
    height: 1365,
    href: "/kajakkturer",
  },
  {
    badge: "Bedrifter",
    title: "Teambuilding som skaper samhold",
    desc: "Utendørs utfordringer, innendørs konkurranser og mordmysterier for grupper som vil få noe ekte ut av dagen.",
    price: "Fra kr 4 500,-",
    img: "/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
    width: 2250,
    height: 1500,
    href: "/teambuilding",
  },
  {
    badge: "Inspirasjon",
    title: "Foredrag og JTI",
    desc: "Engasjerende foredrag om forskjellighet, samarbeid og ekspedisjoner som gir energi videre inn i arbeidsdagen.",
    price: "Fagdag eller samling",
    img: "/images/tp-typeteori.jpg",
    width: 1280,
    height: 800,
    href: "/foredrag",
  },
];

type CarouselSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  items?: CarouselItem[] | null;
};

export default function CarouselSection({
  eyebrow = "Destinasjon Arendal",
  title = "Hva er din lek?",
  items,
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselItems = items && items.length >= 3 ? items : CAROUSEL_DATA;

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
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-inter text-xs font-medium uppercase tracking-[4px] text-brown-muted mb-3">
            {eyebrow}
          </div>
          <h2 className="font-space font-semibold text-3xl md:text-5xl text-brown mb-10">
            {title}
          </h2>
        </motion.div>

        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card-bg opacity-0 shadow-sm transition-all hover:border-brown-light hover:shadow-md group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal md:flex"
            aria-label="Forrige opplevelse"
          >
            <ChevronLeft className="w-4 h-4 text-brown" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card-bg opacity-0 shadow-sm transition-all hover:border-brown-light hover:shadow-md group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal md:flex"
            aria-label="Neste opplevelse"
          >
            <ChevronRight className="w-4 h-4 text-brown" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-2 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {carouselItems.map((item, i) => (
              <Link key={i} href={item.href} className="flex-none w-[80%] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card-bg rounded-xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.alt || item.title}
                      width={item.width || 1200}
                      height={item.height || 800}
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
              </Link>
            ))}
          </div>
        </div>

        <div className="text-right mt-4 md:mt-8">
          <Link
            href="/opplevelser"
            className="inline-flex min-h-11 items-center font-inter text-sm font-medium text-brown transition-colors hover:text-teal"
          >
            Se alle våre turer &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
