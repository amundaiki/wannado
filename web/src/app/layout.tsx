import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google";
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
  title: "Wannado – Hva er din lek?",
  description: "Opplevelser, teambuilding og historiske seilturer i Arendals skjærgård med skøyta Havsul.",
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
      </body>
    </html>
  );
}
