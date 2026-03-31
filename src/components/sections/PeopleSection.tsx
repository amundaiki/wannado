"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PEOPLE = [
  {
    name: "Tone Pernille Sivertsen",
    role: "Leken & teambuilding",
    bio: "Tone har siden 2005 brukt sin lidenskap for energi, hester og teambuilding for å engasjere. Sertifisert i JTI og NLP-coach, bygger hun tillit og løfter de rundt seg.",
    email: "tp@wannado.no",
    img: "/images/tp-typeteori.jpg",
    width: 1280,
    height: 800,
  },
  {
    name: "Roar Laugerud",
    role: "Trygghet & opplevelser",
    bio: "Roar er Veileder Hav, Skipper og fotograf. Med ro og lang erfaring skaper han trygge rammer der folk kan utfordre seg selv - enten det er i kajakk eller under fulle seil på Havsul.",
    email: "roar@wannado.no",
    img: "/images/P7270038.jpg",
    width: 1024,
    height: 624,
  },
];

export default function PeopleSection() {
  return (
    <section id="folkene" className="bg-cream py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space text-3xl md:text-[38px] font-semibold text-brown text-center mb-16 md:mb-24"
        >
          Folkene bak opplevelsene
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {PEOPLE.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <Image
                src={person.img}
                alt={person.name}
                width={person.width}
                height={person.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full aspect-[4/5] object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-500"
              />
              <div className="mt-8">
                <h3 className="font-space text-2xl md:text-3xl font-semibold text-brown">
                  {person.name}
                </h3>
                <div className="font-inter text-[13px] md:text-[15px] font-medium text-teal mt-1">
                  {person.role}
                </div>
                <p className="font-inter text-[15px] md:text-[17px] text-brown-mid leading-relaxed mt-4">
                  {person.bio}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-block mt-4 font-inter text-[13px] md:text-[15px] text-brown-muted hover:text-brown border-b border-transparent hover:border-brown transition-colors"
                >
                  {person.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
