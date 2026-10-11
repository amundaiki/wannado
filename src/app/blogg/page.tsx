import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery, excerpt, type SanityPost } from "@/sanity/lib/content";
import { blogPostImage, blogPostImageAlt } from "@/lib/data/blogPosts";

export const metadata = createPageMetadata({
  title: "Blogg om kajakk og opplevelser i Arendal",
  description:
    "Les tips, historier og lokale råd om kajakk, seilturer, teambuilding og opplevelser i Arendals skjærgård.",
  path: "/blogg",
  image: "/images/baat-fb.jpg",
  imageAlt: "Historier fra Wannado og Arendals skjærgård",
});

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

function hasUsableSlug(post: SanityPost): post is SanityPost & { slug: string } {
  return Boolean(post.slug && post.slug !== "null");
}

export default async function BloggPage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
    perspective: "published",
  });

  const blogPosts: Array<
    SanityPost & {
      slug: string;
      image: string;
      excerpt: string;
    }
  > = (posts as SanityPost[])
    .filter(hasUsableSlug)
    .map((post) => ({
      ...post,
      image: blogPostImage(post),
      excerpt: post.excerpt || excerpt(post.bodyText, 220),
    }));
  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": absoluteUrl("/blogg#blog"),
        name: "Wannado-bloggen",
        description:
          "Historier, tips og oppdateringer fra Wannado i Arendals skjærgård.",
        url: absoluteUrl("/blogg"),
        inLanguage: "nb-NO",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/blogg#posts"),
        name: "Artikler fra Wannado",
        itemListElement: blogPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/blogg/${post.slug}`),
          name: post.title,
        })),
      },
    ],
  };

  return (
    <main id="innhold" className="min-h-screen bg-cream selection:bg-sand selection:text-brown">
      <JsonLd
        data={createBreadcrumbSchema([{ name: "Blogg", path: "/blogg" }])}
      />
      <JsonLd data={blogSchema} />
      <Navbar variant="solid" />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-medium text-teal uppercase tracking-[3px] mb-4">
            Oppdateringer fra Wannado
          </p>
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-brown leading-tight mb-6">
            Kajakk, seilturer og opplevelser i Arendal
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid max-w-2xl mx-auto leading-relaxed">
            Her deler vi tips fra sjøen, historier fra Havsul og lokale råd til deg
            som vil finne riktig tur, kurs eller opplevelse på Sørlandet.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <h2 className="font-space text-2xl md:text-3xl font-bold text-brown mb-8 md:mb-10">
          Siste artikler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src={post.image}
                  alt={blogPostImageAlt(post)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="font-inter text-xs font-semibold uppercase tracking-[2px] text-teal mb-3">
                  {formatDate(post.publishedAt)}
                </p>
                <h3 className="font-space text-2xl md:text-3xl font-bold text-brown mb-4">
                  {post.title}
                </h3>
                <p className="font-inter text-brown-mid leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blogg/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-lg bg-brown px-6 py-3 font-inter text-sm font-medium text-white hover:bg-brown-hover transition-colors"
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
