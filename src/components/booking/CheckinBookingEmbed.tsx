"use client";

import { useEffect, useState } from "react";

type CheckinDocument = Document & {
  customerId?: number;
  calendarConfig?: {
    openRegistrationModal: boolean;
    view: "TILE";
    showSearch: boolean;
    showTopics: boolean;
    showViewToggle: boolean;
    showOnlyForm: boolean;
    language: "nb";
    topics: null;
    style: Record<string, string | number>;
  };
};

const CHECKIN_LOADER_SRC = "https://static.checkin.no/loaders/eventindex/loader.js";
const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);
const getIsLocalHostname = () =>
  typeof window !== "undefined" && localHostnames.has(window.location.hostname);

export default function CheckinBookingEmbed() {
  const [failed, setFailed] = useState(false);
  const [environment, setEnvironment] = useState<"pending" | "local" | "remote">(
    "pending",
  );

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setEnvironment(getIsLocalHostname() ? "local" : "remote");
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (environment !== "remote") {
      return;
    }

    const checkinDocument = document as CheckinDocument;
    const container = document.getElementById("checkin_event_index");
    const handleCheckinError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const value = "reason" in event ? event.reason : event.error;
      const text = value instanceof Error ? value.stack ?? value.message : String(value);

      if (text.includes("checkin.no") || text.includes("EventIndex")) {
        event.preventDefault();
        setFailed(true);
      }
    };
    const fallbackTimeout = window.setTimeout(() => {
      if (!container?.textContent?.trim()) {
        setFailed(true);
      }
    }, 12000);

    if (container) {
      container.innerHTML = "";
    }

    checkinDocument.customerId = 16533;
    checkinDocument.calendarConfig = {
      openRegistrationModal: true,
      view: "TILE",
      showSearch: false,
      showTopics: true,
      showViewToggle: false,
      showOnlyForm: false,
      language: "nb",
      topics: null,
      style: {
        searchButtonBgColor: "rgba(28, 43, 57, 1)",
        searchButtonTextColor: "rgba(255, 255, 255, 1)",
        searchButtonBorderRadius: 3,
        topicBadgeBgColor: "rgba(85, 96, 106, 1)",
        topicBadgeTextColor: "rgba(255, 255, 255, 1)",
        topicBadgeBorderRadius: 3,
        headerTextColor: "rgba(54, 43, 34, 1)",
        bodyTextColor: "rgba(54, 43, 34, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        eventTileColor: "rgba(54, 43, 34, 0)",
      },
    };

    const script = document.createElement("script");
    script.src = CHECKIN_LOADER_SRC;
    script.async = true;
    script.dataset.checkinLoader = "wannado";
    script.onerror = () => setFailed(true);

    window.addEventListener("error", handleCheckinError);
    window.addEventListener("unhandledrejection", handleCheckinError);
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("error", handleCheckinError);
      window.removeEventListener("unhandledrejection", handleCheckinError);
      window.clearTimeout(fallbackTimeout);
      script.remove();
    };
  }, [environment]);

  return (
    <div className="rounded-[32px] border border-border bg-white p-4 shadow-sm md:p-6">
      {failed ? (
        <div className="rounded-2xl bg-cream p-6 text-center md:p-10">
          <p className="font-space text-2xl font-bold text-brown">
            Bookingkalenderen kunne ikke lastes
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm leading-relaxed text-brown-mid md:text-base">
            Send forespørselen i skjemaet lenger ned på siden, eller ring oss
            direkte. Da sjekker vi tilgjengelighet manuelt.
          </p>
          <a
            href="#booking-form"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-teal px-5 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#0d6f6a]"
          >
            Send forespørsel
          </a>
        </div>
      ) : environment === "local" ? (
        <div className="rounded-2xl bg-cream p-6 text-center md:p-10">
          <p className="font-space text-2xl font-bold text-brown">
            Bookingkalenderen vises på produksjonsdomenet
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm leading-relaxed text-brown-mid md:text-base">
            Checkin-kalenderen fra eksisterende side er koblet inn, men lastes
            ikke i lokal utvikling fordi tredjepartsscriptet feiler på lokal
            origin. Bruk forespørselsskjemaet for lokal testing.
          </p>
          <a
            href="#booking-form"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-teal px-5 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#0d6f6a]"
          >
            Test forespørselsskjema
          </a>
        </div>
      ) : environment === "pending" ? (
        <div className="rounded-2xl bg-cream p-6 text-center md:p-10">
          <p className="font-space text-2xl font-bold text-brown">
            Klargjør bookingkalender
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm leading-relaxed text-brown-mid md:text-base">
            Kalenderen lastes inn straks nettleseren har bekreftet riktig
            domene.
          </p>
        </div>
      ) : (
        <div
          id="checkin_event_index"
          aria-label="Bookingkalender fra Checkin"
          className="min-h-[420px]"
        />
      )}
    </div>
  );
}
