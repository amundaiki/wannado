"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Opplevelser", href: "/opplevelser" },
  { label: "Seilturer", href: "/seilturer" },
  { label: "Kajakk", href: "/kajakkturer" },
  { label: "Teambuilding", href: "/teambuilding" },
  { label: "Bedrift", href: "/bedrift" },
  { label: "Foredrag", href: "/foredrag" },
  { label: "Priser", href: "/priser" },
  { label: "Blogg", href: "/blogg" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Close mobile menu on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden && !mobileOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-colors duration-300 border-b ${
          isScrolled || mobileOpen
            ? "bg-cream/85 backdrop-blur-md border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center group" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/wannado-logo.svg"
              alt="Wannado"
              width={96}
              height={32}
              className={`h-8 w-auto transition-all duration-300 ${
                isScrolled || mobileOpen ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-9 tracking-wide h-full">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors hover:text-opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:rounded ${
                    isScrolled
                      ? "text-brown-mid hover:text-brown"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className={`hidden md:inline-block font-body text-sm font-medium px-5 py-2 rounded-md border-2 transition-all duration-300 active:scale-[0.98] active:translate-y-px focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2
                ${
                  isScrolled
                    ? "bg-brown text-white border-brown hover:bg-[#5a4838] hover:border-[#5a4838]"
                    : "bg-transparent text-white border-white/60 hover:bg-white hover:text-brown hover:border-white"
                }`}
            >
              Bestill tur
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`md:hidden w-11 h-11 flex items-center justify-center rounded-md transition-colors active:scale-95 ${
                isScrolled || mobileOpen
                  ? "text-brown hover:bg-brown/10"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brown/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-16 right-0 bottom-0 w-[280px] bg-cream z-40 md:hidden shadow-2xl border-l border-border"
            >
              <div className="flex flex-col h-full pt-6 pb-8 px-6">
                <ul className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link, idx) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block font-body text-base font-medium text-brown py-3 px-3 rounded-lg hover:bg-warm-white transition-colors focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-inset"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link
                    href="/kontakt"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center bg-brown text-white font-body font-semibold text-base py-3.5 rounded-xl hover:bg-[#5a4838] transition-colors active:scale-[0.98]"
                  >
                    Bestill tur
                  </Link>
                  <a
                    href="tel:+4799469957"
                    className="block w-full text-center font-body text-sm text-brown-muted mt-4 hover:text-brown transition-colors"
                  >
                    Ring: +47 99 46 99 57
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
