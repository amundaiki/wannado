"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Anchor } from "lucide-react"; // Using Lucide icon as temporary logo

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-colors duration-300 border-b ${
        isScrolled
          ? "bg-cream/85 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Anchor
            className={`transition-colors duration-300 ${
              isScrolled ? "text-brown" : "text-white"
            }`}
          />
          <span
            className={`font-space font-bold text-xl transition-colors duration-300 uppercase tracking-widest ${
              isScrolled ? "text-brown" : "text-white"
            }`}
          >
            Wannado
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-9 tracking-wide h-full">
          <li>
            <Link
              href="/opplevelser"
              className={`font-inter text-sm font-medium transition-colors hover:text-opacity-100 ${
                isScrolled
                  ? "text-brown-mid hover:text-brown"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Opplevelser
            </Link>
          </li>
          <li>
            <Link
              href="/teambuilding"
              className={`font-inter text-sm font-medium transition-colors hover:text-opacity-100 ${
                isScrolled
                  ? "text-brown-mid hover:text-brown"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Teambuilding
            </Link>
          </li>
          <li>
            <Link
              href="/menneskene"
              className={`font-inter text-sm font-medium transition-colors hover:text-opacity-100 ${
                isScrolled
                  ? "text-brown-mid hover:text-brown"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Om Havsul
            </Link>
          </li>
        </ul>

        <Link
          href="/kontakt"
          className={`font-inter text-sm font-medium px-5 py-2 rounded-md border-2 transition-all duration-300
            ${
              isScrolled
                ? "bg-brown text-white border-brown hover:bg-[#5a4838] hover:border-[#5a4838]"
                : "bg-transparent text-white border-white/60 hover:bg-white hover:text-brown hover:border-white"
            }`}
        >
          Bestill tur
        </Link>
      </div>    
    </motion.nav>
  );
}
