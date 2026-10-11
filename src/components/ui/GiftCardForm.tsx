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

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  giftCardType?: string;
  recipientName?: string;
}

export default function GiftCardForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone: string): boolean {
    if (!phone) return true;
    return /^[\d\s\+()-]{8,15}$/.test(phone);
  }

  function validateField(name: string, value: string): string | undefined {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Navn må være minst 2 tegn" : undefined;
      case "email":
        return !validateEmail(value) ? "Ugyldig e-postadresse" : undefined;
      case "phone":
        return !validatePhone(value) ? "Ugyldig telefonnummer" : undefined;
      case "giftCardType":
        return !giftCardTypes.includes(value) ? "Velg type gavekort" : undefined;
      case "recipientName":
        return value.trim().length < 2
          ? "Mottakernavn må være minst 2 tegn"
          : undefined;
      default:
        return undefined;
    }
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      formType: "giftCard",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: "Gavekort",
      message: "Gavekortbestilling",
      giftCardType: formData.get("giftCardType"),
      amount: formData.get("amount"),
      recipientName: formData.get("recipientName"),
      personalMessage: formData.get("message"),
      company: formData.get("company"),
    };

    const newErrors: FieldErrors = {};
    newErrors.name = validateField("name", String(data.name || ""));
    newErrors.email = validateField("email", String(data.email || ""));
    newErrors.phone = validateField("phone", String(data.phone || ""));
    newErrors.giftCardType = validateField(
      "giftCardType",
      String(data.giftCardType || "")
    );
    newErrors.recipientName = validateField(
      "recipientName",
      String(data.recipientName || "")
    );

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        giftCardType: true,
        recipientName: true,
      });
      setStatus("error");
      return;
    }

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
      <div className="bg-cream rounded-2xl p-8 text-center" role="status" aria-live="polite">
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
      noValidate
    >
      <input
        type="text"
        name="company"
        aria-label="Bedrift (valgfritt)"
        autoComplete="off"
        className="hidden"
      />
      <div>
        <label
          htmlFor="gc-name"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Navn <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <input
          id="gc-name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "gc-name-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Ditt fulle navn"
        />
        {errors.name && touched.name && (
          <p id="gc-name-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="gc-email"
            className="block font-inter text-sm font-medium text-brown mb-1.5"
          >
            E-post <span className="text-teal" aria-hidden="true">*</span>
          </label>
          <input
            id="gc-email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "gc-email-error" : undefined}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
            placeholder="din@epost.no"
          />
          {errors.email && touched.email && (
            <p id="gc-email-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
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
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "gc-phone-error" : undefined}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
            placeholder="+47 XXX XX XXX"
          />
          {errors.phone && touched.phone && (
            <p id="gc-phone-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="gc-type"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Type gavekort <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <select
          id="gc-type"
          name="giftCardType"
          required
          aria-required="true"
          aria-invalid={!!errors.giftCardType}
          aria-describedby={errors.giftCardType ? "gc-type-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
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
        {errors.giftCardType && touched.giftCardType && (
          <p id="gc-type-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.giftCardType}
          </p>
        )}
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
          className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="F.eks. 1000 kr, eller beskriv ønsket opplevelse..."
        />
      </div>

      <div>
        <label
          htmlFor="gc-recipient"
          className="block font-inter text-sm font-medium text-brown mb-1.5"
        >
          Mottaker navn <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <input
          id="gc-recipient"
          name="recipientName"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.recipientName}
          aria-describedby={errors.recipientName ? "gc-recipient-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Hvem skal gavekortet til?"
        />
        {errors.recipientName && touched.recipientName && (
          <p id="gc-recipient-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.recipientName}
          </p>
        )}
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
          className="w-full rounded-lg border border-border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="En personlig hilsen som skal stå på gavekortet..."
        />
      </div>

      {status === "error" && !Object.values(errors).some(Boolean) && (
        <p role="alert" className="font-inter text-sm text-red-600">
          Noe gikk galt. Ring oss på{" "}
          <a href="tel:+4799469957" className="inline-flex min-h-11 items-center underline">
            +47 99 46 99 57
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="min-h-11 w-full bg-brown text-white font-inter font-medium text-sm py-3 rounded-lg hover:bg-brown-hover transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Sender..." : "Bestill gavekort"}
      </button>
    </form>
  );
}
