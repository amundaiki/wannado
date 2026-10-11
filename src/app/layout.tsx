import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { defaultOgImage, organizationSchema, siteName, siteUrl } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

const enableVercelAnalytics =
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true" ||
  process.env.VERCEL === "1";

export const metadata: Metadata = {
  title: {
    default: 'Wannado - Opplevelser i Arendals skjærgård',
    template: '%s | Wannado',
  },
  description: 'Wannado tilbyr aktiviteter og opplevelser i Arendal og på Sørlandet: seilturer med Listerskøyta Havsul fra 1933, kajakkturer og kurs, hesteopplevelser, teambuilding for bedrifter og foredrag.',
  keywords: ['aktiviteter Arendal', 'opplevelser Arendal', 'aktiviteter Sørlandet', 'opplevelser Sørlandet', 'ting å gjøre i Arendal', 'seiltur Arendal', 'kajakktur Arendal', 'kajakkurs Arendal', 'våttkort Arendal', 'teambuilding Arendal', 'hesteopplevelser Sørlandet', 'kajakkutleie Arendal', 'foredrag Arendal', 'Havsul'],
  applicationName: siteName,
  authors: [{ name: 'Wannado' }],
  creator: 'Wannado',
  publisher: 'Wannado',
  category: 'travel',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    siteName,
    title: 'Wannado - Opplevelser i Arendals skjærgård',
    description: 'Seilturer, kajakkturer, teambuilding og foredrag på Sørlandet.',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wannado - Opplevelser i Arendals skjærgård',
    description: 'Seilturer, kajakkturer, teambuilding og foredrag på Sørlandet.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`scroll-smooth ${bricolage.variable} ${figtree.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased text-brown bg-cream">
        <a href="#innhold" className="skip-link">
          Hopp til innhold
        </a>
        <JsonLd data={organizationSchema} />
        <MotionProvider>{children}</MotionProvider>
        {enableVercelAnalytics && <Analytics />}
      </body>
    </html>
  );
}
