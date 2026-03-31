import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: 'Wannado - Opplevelser i Arendals skjærgård',
    template: '%s | Wannado',
  },
  description: 'Wannado tilbyr seilturer med Listerskøyta Havsul fra 1933, kajakkturer og kurs, teambuilding for bedrifter, og JTI-foredrag i Arendal og på Sørlandet.',
  keywords: ['seiltur Arendal', 'kajakkturer Arendal', 'teambuilding Arendal', 'opplevelser Sørlandet', 'Havsul', 'kajakkurs Arendal'],
  authors: [{ name: 'Wannado' }],
  creator: 'Wannado',
  metadataBase: new URL('https://wannado.no'),
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://wannado.no',
    siteName: 'Wannado',
    title: 'Wannado - Opplevelser i Arendals skjærgård',
    description: 'Seilturer, kajakkturer, teambuilding og foredrag på Sørlandet.',
    images: [{ url: '/images/baat-fb.jpg', width: 1200, height: 630, alt: 'Wannado - Listerskøyta Havsul' }],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${dmSerif.variable} scroll-smooth`}
    >
      <body className="antialiased text-brown bg-cream">
        {/* We can manage load animation by adding a simple script or just make it visible initially. For Next.js, opacity-100 is simpler unless we strictly port the JS logic.  Let's make it visible by default here by removing opacity-0. */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
