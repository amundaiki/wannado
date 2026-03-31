"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type FormStatus = "idle" | "pending" | "success" | "error";

const serviceOptions = [
  "Seilturer",
  "Kajakktur",
  "Kajakkurs",
  "Teambuilding",
  "Foredrag/JTI",
  "Annet",
];

interface ContactFormProps {
  defaultService?: string;
}

export default function ContactForm({ defaultService }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const searchParams = useSearchParams();
  const serviceParam = defaultService || searchParams.get("tjeneste") || "";
  const matchedService =
    serviceOptions.find(
      (opt) => opt.toLowerCase() === serviceParam.toLowerCase()
    ) || "";
  const initialService = matchedService;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
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
          Takk for din henvendelse!
        </p>
        <p className="font-inter text-brown-mid">
          Vi svarer deg innen 24 timer.
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
          htmlFor="contact-name"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Navn <span className="text-teal">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Ditt fulle navn"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          E-post <span className="text-teal">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="din@epost.no"
        />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Telefon
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="+47 XXX XX XXX"
        />
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Tjeneste <span className="text-teal">*</span>
        </label>
        <select
          id="contact-service"
          name="service"
          required
          defaultValue={initialService}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
        >
          <option value="" disabled>
            Velg tjeneste
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Melding <span className="text-teal">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="Fortell oss hva du er interessert i, antall deltakere, ønsket dato..."
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
        {status === "pending" ? "Sender..." : "Send forespørsel"}
      </button>
    </form>
  );
}
