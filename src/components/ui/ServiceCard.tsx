"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration?: string;
  maxParticipants?: string;
  image?: string;
  href: string;
  badge?: string;
}

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  maxParticipants,
  image,
  href,
  badge,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-teal text-white text-xs font-inter font-semibold px-3 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}

      {!image && badge && (
        <div className="px-5 pt-5">
          <span className="inline-block bg-teal text-white text-xs font-inter font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-space font-bold text-lg text-brown mb-2">
          {title}
        </h3>
        <p className="font-inter text-sm text-brown-mid leading-relaxed mb-4 flex-1">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <span className="font-space font-bold text-teal text-lg">
            {price}
          </span>
          {duration && (
            <span className="font-inter text-xs text-brown-muted">
              {duration}
            </span>
          )}
          {maxParticipants && (
            <span className="font-inter text-xs text-brown-muted">
              {maxParticipants}
            </span>
          )}
        </div>

        <Link
          href={href}
          className="font-inter text-sm font-medium text-teal hover:text-brown transition-colors duration-200"
        >
          Les mer &rarr;
        </Link>
      </div>
    </motion.div>
  );
}
