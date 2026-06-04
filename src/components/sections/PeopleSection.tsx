"use client";

import { motion } from "framer-motion";
import PersonVideoCard from "@/components/ui/PersonVideoCard";
import {
  FALLBACK_TEAM_PROFILES,
  type TeamProfile,
} from "@/lib/data/team";

export default function PeopleSection({
  people = FALLBACK_TEAM_PROFILES,
}: {
  people?: TeamProfile[];
}) {
  return (
    <section id="folkene" className="bg-cream py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space text-3xl md:text-[38px] font-semibold text-brown text-center mb-16 md:mb-24"
        >
          Folkene bak opplevelsene
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {people.map((person) => (
            <PersonVideoCard
              key={person.id}
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
