"use client";

import { useEffect } from "react";

// global-error erstatter rot-layouten, sa globals.css lastes ikke. Derfor
// brukes inline-stiler med Wannados farger sa siden alltid ser riktig ut.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nb">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f4",
          color: "#48382B",
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#2a7d7d",
              marginBottom: "1rem",
            }}
          >
            Noe gikk galt
          </p>
          <h1
            style={{
              fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 1.5rem",
            }}
          >
            Her krøllet det seg
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6B5744",
              lineHeight: 1.6,
              margin: "0 0 2.5rem",
            }}
          >
            Det oppstod en uventet feil. Prøv gjerne på nytt, eller last siden
            inn igjen.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: "2.75rem",
              borderRadius: "0.5rem",
              background: "#48382B",
              color: "#ffffff",
              border: "none",
              padding: "0.75rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Prøv igjen
          </button>
        </div>
      </body>
    </html>
  );
}
