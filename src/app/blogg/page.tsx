import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery, excerpt, type SanityPost } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Blogg | Wannado",
  description:
    "Les nyheter, historier og opplevelser fra Wannado i Arendals skjærgård.",
};

export const dynamic = "force-dynamic";

const postImageFallbacks: Record<string, string> = {
  "Velkommen til blogg": "/images/baat-fb.jpg",
  "5 grunner til å oppleve Arendals skjærgård med Havsul": "/images/havsul.jpg",
  "Havsuls historie: en reise tilbake til 1933": "/images/havsul.jpg",
  "Hvordan en seiltur bygger teamwork": "/images/tp-typeteori.jpg",
  "Høst i Raet nasjonalpark: kajakk, seiling og natur": "/images/gronland-kajakk-3.jpg",
};

function formatDate(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BloggPage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
    perspective: "published",
  });

  const blogPosts: Array<
    SanityPost & {
      image: string;
      excerpt: string;
    }
  > = posts.map((post: SanityPost) => ({
    ...post,
    image: post.imageUrl || postImageFallbacks[post.title] || "/images/havsul.jpg",
    excerpt: excerpt(post.bodyText, 220),
  }));

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-medium text-teal uppercase tracking-[3px] mb-4">
            Oppdateringer fra Wannado
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-brown leading-tight mb-6">
            Blogg
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid max-w-2xl mx-auto leading-relaxed">
            Her publiserer vi historier, tips og oppdateringer fra sjøen, kajakkene og
            opplevelsene våre.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="font-inter text-xs font-semibold uppercase tracking-[2px] text-teal mb-3">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="font-space text-2xl md:text-3xl font-bold text-brown mb-4">
                  {post.title}
                </h2>
                <p className="font-inter text-brown-mid leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blogg/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-lg bg-brown px-6 py-3 font-inter text-sm font-medium text-white hover:bg-[#5a4838] transition-colors"
                >
                  Les mer
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
