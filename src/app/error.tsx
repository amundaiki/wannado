"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logg til konsollen for feilsoking. Ingen PII eller tokens logges.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="font-inter text-sm font-semibold uppercase tracking-[0.25em] text-teal mb-4">
          Noe gikk galt
        </p>
        <h1 className="font-space text-4xl md:text-6xl font-bold text-brown leading-tight mb-6">
          Her krøllet det seg litt
        </h1>
        <p className="font-inter text-lg text-brown-mid leading-relaxed mb-10">
          Det oppstod en uventet feil. Prøv gjerne på nytt, eller gå tilbake til
          forsiden. Vedvarer det, ta kontakt med oss så hjelper vi deg.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brown px-7 py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-[#5a4838]"
          >
            Prøv igjen
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brown/30 px-7 py-3 font-inter text-sm font-medium text-brown transition-colors hover:bg-warm-white"
          >
            Til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
