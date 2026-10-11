"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqCategory } from "@/lib/data/faq";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="group flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand/35 font-inter text-xs font-semibold text-brown-mid sm:flex">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-space text-lg font-semibold leading-snug text-brown transition-colors duration-200 group-hover:text-teal">
            {question}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brown-mid transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="pb-6 pl-0 sm:pl-12">
              <p className="max-w-2xl font-inter text-base leading-relaxed text-brown-mid">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqClient({ categories }: { categories: FaqCategory[] }) {
  const firstCategoryId = categories[0]?.id ?? "";
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(firstCategoryId);

  const currentCategory = useMemo(
    () => categories.find((category) => category.id === activeCategory) ?? categories[0],
    [activeCategory, categories],
  );

  const toggleItem = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!currentCategory) {
    return null;
  }

  return (
    <>
      <section id="sporsmal-og-svar" className="flex-grow bg-cream py-12 md:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-inter text-xs font-semibold text-teal">
              Velg tema
            </p>
            <div className="flex max-w-full min-w-0 gap-2 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:overflow-visible lg:pb-0">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`min-h-12 min-w-fit rounded-lg border px-4 py-3 text-left font-inter text-sm font-semibold transition-colors duration-200 lg:w-full ${
                      isActive
                        ? "border-brown bg-brown text-white"
                        : "border-border bg-white text-brown-mid hover:border-teal/45 hover:text-teal"
                    }`}
                  >
                    <span className="block">{category.label}</span>
                    <span
                      className={`mt-1 block text-xs font-medium ${
                        isActive ? "text-white/68" : "text-brown-mid/60"
                      }`}
                    >
                      {category.items.length} svar
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 grid gap-4 border-y border-border py-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-inter text-sm font-semibold text-teal">
                  Ofte spurt
                </p>
                <h2 className="mt-2 font-space text-3xl font-bold leading-tight text-brown md:text-4xl">
                  {currentCategory.label}
                </h2>
              </div>
              <p className="max-w-sm font-inter text-sm leading-6 text-brown-mid md:text-right">
                Trykk på et spørsmål for å åpne svaret. Bytt tema hvis du lurer
                på booking, kajakk, sikkerhet eller bedriftsopplegg.
              </p>
            </div>

            <motion.div
              key={currentCategory.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-card border border-border bg-white px-5 md:px-8"
            >
              {currentCategory.items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                  isOpen={openItems[`${currentCategory.id}-${index}`] ?? false}
                  onToggle={() => toggleItem(currentCategory.id, index)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
