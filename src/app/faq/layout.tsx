import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål | Wannado",
  description:
    "Finn svar på vanlige spørsmål om kajakkturer, seilturer, teambuilding, priser, booking og sikkerhet hos Wannado i Arendal.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
