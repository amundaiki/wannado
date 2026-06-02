import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery, relatedPostsQuery, type SanityPost } from "@/sanity/lib/content";
import { BlockContent } from "@/components/sanity/BlockContent";

export const dynamic = "force-dynamic";

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

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    perspective: "published",
  });

  if (!post) {
    return {
      title: "Innlegg ikke funnet | Wannado",
    };
  }

  const description =
    post.excerpt ||
    `Les mer om ${post.title} hos Wannado i Arendal.`;

  return {
    title: `${post.title} | Wannado`,
    description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    perspective: "published",
  });

  if (!post) {
    notFound();
  }

  const { data: relatedPosts } = await sanityFetch({
    query: relatedPostsQuery,
    params: { slug },
    perspective: "published",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName || "Wannado",
    },
    image: post.imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Wannado",
    },
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 md:pt-36">
        {post.imageUrl && (
          <div className="relative h-80 md:h-[28rem] w-full">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-12">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: string) => (
                  <span
                    key={category}
                    className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-teal bg-teal/10 px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-space text-3xl md:text-5xl lg:text-6xl font-bold text-brown leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-inter text-lg md:text-xl text-brown-mid leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              {post.authorImage && (
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.authorImage}
                    alt={post.authorName || ""}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div>
                {post.authorName && (
                  <p className="font-inter font-semibold text-brown text-sm">
                    {post.authorName}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="font-inter text-brown-light text-sm">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
          <BlockContent content={post.body} />
        ) : (
          <p className="font-inter text-lg text-brown-light">
            Innholdet er ikke tilgjengelig.
          </p>
        )}
      </article>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <div className="text-center mb-12">
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-3">
              Les mer
            </p>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-brown">
              Flere innlegg
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedPosts.map((relatedPost: SanityPost) => (
              <Link
                key={relatedPost._id}
                href={`/blogg/${relatedPost.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                {relatedPost.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.imageUrl}
                      alt={relatedPost.imageAlt || relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-space text-xl font-bold text-brown group-hover:text-teal transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  {relatedPost.excerpt && (
                    <p className="font-inter text-sm text-brown-mid mt-3 line-clamp-3 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
