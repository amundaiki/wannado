import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { defaultOgImage, organizationSchema, siteName, siteUrl } from "@/lib/seo";

const enableVercelAnalytics =
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true" ||
  process.env.VERCEL === "1";

export const metadata: Metadata = {
  title: {
    default: 'Wannado - Opplevelser i Arendals skjærgård',
    template: '%s | Wannado',
  },
  description: 'Wannado tilbyr seilturer med Listerskøyta Havsul fra 1933, kajakkturer og kurs, teambuilding for bedrifter, og JTI-foredrag i Arendal og på Sørlandet.',
  keywords: ['seiltur Arendal', 'kajakkturer Arendal', 'teambuilding Arendal', 'opplevelser Sørlandet', 'Havsul', 'kajakkurs Arendal'],
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
    <html lang="nb" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased text-brown bg-cream">
        {/* We can manage load animation by adding a simple script or just make it visible initially. For Next.js, opacity-100 is simpler unless we strictly port the JS logic.  Let's make it visible by default here by removing opacity-0. */}
        <JsonLd data={organizationSchema} />
        <MotionProvider>{children}</MotionProvider>
        {enableVercelAnalytics && <Analytics />}
      </body>
    </html>
  );
}
