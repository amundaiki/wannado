import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ofte stilte spørsmål",
  description:
    "Finn svar på vanlige spørsmål om kajakkturer, seilturer, teambuilding, priser, booking og sikkerhet hos Wannado i Arendal.",
  path: "/faq",
  image: "/images/havsul.jpg",
  imageAlt: "Ofte stilte spørsmål om Wannado-opplevelser",
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
