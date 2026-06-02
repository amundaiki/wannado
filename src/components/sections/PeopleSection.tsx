"use client";

import { motion } from "framer-motion";
import PersonVideoCard from "@/components/ui/PersonVideoCard";

const PEOPLE = [
  {
    name: "Tone Pernille Sivertsen",
    role: "Teambuilding, foredrag og hest",
    bio: "Tone Pernille har siden 2005 skapt opplevelser som kombinerer energi, trygghet og tydelig ledelse. Med JTI, coaching og lang erfaring fra grupper og bedrifter bygger hun tillit og får folk med.",
    email: "tp@wannado.no",
    img: "/images/tp-typeteori.jpg",
    imgWidth: 900,
    imgHeight: 1200,
    videoSrc: "/videos/havsul-intervju-tone.mp4",
    videoLabel: "Tone Pernille om Wannado",
    imageObjectPosition: "center 22%",
    videoObjectPosition: "72% center",
    videoStartTime: 2,
  },
  {
    name: "Roar Laugerud",
    role: "Kajakk, seilturer og trygg ferdsel",
    bio: "Roar er Veileder Hav, skipper og fotograf. Han skaper rolige, trygge rammer for mennesker som vil utfordre seg i kajakk, på seiltur eller ute i skjærgården.",
    email: "roar@wannado.no",
    img: "/images/P7270038.jpg",
    imgWidth: 900,
    imgHeight: 1200,
    videoSrc: "/videos/havsul-intervju-roar.mp4",
    videoLabel: "Roar om livet på sjøen",
    imageObjectPosition: "center 28%",
    videoObjectPosition: "center 32%",
    videoStartTime: 2,
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
            <PersonVideoCard
              key={idx}
              name={person.name}
              role={person.role}
              bio={person.bio}
              email={person.email}
              img={person.img}
              imgWidth={person.imgWidth}
              imgHeight={person.imgHeight}
              videoSrc={person.videoSrc}
              videoLabel={person.videoLabel}
              imageObjectPosition={person.imageObjectPosition}
              videoObjectPosition={person.videoObjectPosition}
              videoStartTime={person.videoStartTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
