"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface PortableTextRendererProps {
  value: any;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-inter text-lg text-brown-mid leading-relaxed mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-space text-3xl md:text-4xl font-bold text-brown mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-space text-2xl md:text-3xl font-bold text-brown mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-space text-xl font-bold text-brown mt-8 mb-4">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal pl-6 py-4 my-8 bg-warm-white rounded-r-lg">
        <p className="font-inter text-lg italic text-brown-mid leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brown">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href;
      if (!href) {
        return <span>{children}</span>;
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal underline hover:text-brown transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 font-inter text-lg text-brown-mid leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 font-inter text-lg text-brown-mid leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value as SanityImageSource).width(1200).url();
      const imageAlt = value.alt || "";
      return (
        <figure className="my-10">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {imageAlt && (
            <figcaption className="text-center mt-4 font-inter text-sm text-brown-mid italic">
              {imageAlt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) {
    return null;
  }
  return <PortableText value={value} components={components} />;
}
