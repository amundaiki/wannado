import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const imageUrl = urlFor(value).width(1200).url();
      const imageAlt = value.alt || "";

      return (
        <figure className="my-8 md:my-12">
          <div className="relative h-80 md:h-96 w-full">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover rounded-card"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {imageAlt && (
            <figcaption className="mt-3 text-center text-sm text-brown-mid font-inter">
              {imageAlt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="font-inter text-lg leading-relaxed text-brown-mid mb-6">
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
      <h4 className="font-space text-xl font-bold text-brown mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-card bg-warm-white px-6 py-6 md:px-8">
        <p className="font-space text-xl font-medium text-brown leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 font-inter text-lg text-brown-mid">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 font-inter text-lg text-brown-mid">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-brown">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href;
      if (!href) {
        return <span>{children}</span>;
      }
      const isInternalLink = href.startsWith("/");

      return (
        <a
          href={href}
          target={isInternalLink ? undefined : "_blank"}
          rel={isInternalLink ? undefined : "noopener noreferrer"}
          className="text-teal underline underline-offset-2 transition-colors hover:text-brown"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-warm-white px-1.5 py-0.5 rounded text-sm font-mono text-brown">
        {children}
      </code>
    ),
  },
};

interface BlockContentProps {
  content: Array<Record<string, unknown>>;
}

export function BlockContent({ content }: BlockContentProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return <PortableText value={content as unknown as Parameters<typeof PortableText>[0]["value"]} components={components} />;
}
