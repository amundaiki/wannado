import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogPostNotFound() {
  return (
    <main id="innhold" className="min-h-screen bg-cream">
      <Navbar />

      <section className="pt-36 pb-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-4">
            404
          </p>
          <h1 className="font-space text-4xl md:text-5xl font-bold text-brown mb-6">
            Innlegget ble ikke funnet
          </h1>
          <p className="font-inter text-lg text-brown-mid leading-relaxed mb-8">
            Blogginnlegget du leter etter finnes ikke, eller er fjernet.
          </p>
          <Link
            href="/blogg"
            className="inline-flex items-center justify-center rounded-lg bg-brown px-6 py-3 font-inter text-sm font-medium text-white hover:bg-brown-mid transition-colors"
          >
            Tilbake til bloggen
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
