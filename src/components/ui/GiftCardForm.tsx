"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "pending" | "success" | "error";

const giftCardTypes = [
  "Seilopplevelse",
  "Kajakk-eventyr",
  "Teambuilding",
  "Foredrag",
  "Valgfri opplevelse",
];

export default function GiftCardForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      tjeneste: "Gavekort",
      giftCardType: formData.get("giftCardType"),
      amount: formData.get("amount"),
      recipientName: formData.get("recipientName"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-cream rounded-2xl p-8 text-center">
        <p className="font-space font-bold text-xl text-brown mb-2">
          Takk for din gavekort-bestilling!
        </p>
        <p className="font-inter text-brown-mid">
          Vi tar kontakt med deg innen 24 timer for å avtale detaljer.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream rounded-2xl p-6 md:p-8 space-y-5"
    >
      <div>
        <label
          htmlFor="gc-name"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Navn <span className="text-teal">*</span>
        </label>
        <input
          id="gc-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Ditt fulle navn"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="gc-email"
            className="block font-inter text-sm font-medium text-brown mb-1.5"
          >
            E-post <span className="text-teal">*</span>
          </label>
          <input
            id="gc-email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
            placeholder="din@epost.no"
          />
        </div>

        <div>
          <label
            htmlFor="gc-phone"
            className="block font-inter text-sm font-medium text-brown mb-1.5"
          >
            Telefon
          </label>
          <input
            id="gc-phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
            placeholder="+47 XXX XX XXX"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="gc-type"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Type gavekort <span className="text-teal">*</span>
        </label>
        <select
          id="gc-type"
          name="giftCardType"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
        >
          <option value="" disabled>
            Velg type
          </option>
          {giftCardTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="gc-amount"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Beløp eller ønsker
        </label>
        <textarea
          id="gc-amount"
          name="amount"
          rows={2}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="F.eks. 1000 kr, eller beskriv ønsket opplevelse..."
        />
      </div>

      <div>
        <label
          htmlFor="gc-recipient"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Mottaker navn <span className="text-teal">*</span>
        </label>
        <input
          id="gc-recipient"
          name="recipientName"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Hvem skal gavekortet til?"
        />
      </div>

      <div>
        <label
          htmlFor="gc-message"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Melding til mottaker
        </label>
        <textarea
          id="gc-message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="En personlig hilsen som skal stå på gavekortet..."
        />
      </div>

      {status === "error" && (
        <p className="font-inter text-sm text-red-600">
          Noe gikk galt. Ring oss på{" "}
          <a href="tel:+4799469957" className="underline">
            +47 99 46 99 57
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full bg-brown text-white font-inter font-medium text-sm py-3 rounded-lg hover:bg-[#5a4838] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Sender..." : "Bestill gavekort"}
      </button>
    </form>
  );
}
