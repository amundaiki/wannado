"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FormStatus = "idle" | "pending" | "success" | "error";

const giftCardTypes = [
  "Seilopplevelse",
  "Kajakk-eventyr",
  "Teambuilding",
  "Foredrag",
  "Valgfri opplevelse",
];

const fieldOrder = ["name", "email", "phone", "giftCardType", "recipientName"] as const;

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 font-inter text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors";

function inputClass(hasError: boolean): string {
  return `${inputBase} ${hasError ? "border-red-600" : "border-border"}`;
}

const errorTextClass = "mt-1 font-inter text-sm text-red-700";

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

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "success") return;
    const el = successRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    el.focus({ preventScroll: true });
  }, [status]);

  function showError(name: keyof FieldErrors): string | undefined {
    return touched[name] ? errors[name] : undefined;
  }

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
      const firstInvalid = fieldOrder.find((key) => newErrors[key]);
      if (firstInvalid) {
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      }
      return;
    }

    setErrors({});

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
      <div
        ref={successRef}
        tabIndex={-1}
        className="bg-cream rounded-2xl p-8 text-center focus:outline-none"
        role="status"
        aria-live="polite"
      >
        <p className="font-space font-bold text-xl text-brown mb-2">
          Takk for din gavekort-bestilling!
        </p>
        <p className="font-inter text-brown-mid">
          Vi tar kontakt med deg for å avtale detaljer.
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
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={!!showError("name")}
          aria-describedby={showError("name") ? "gc-name-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("name"))}
          placeholder="Ditt fulle navn"
        />
        {showError("name") && (
          <p id="gc-name-error" role="alert" className={errorTextClass}>
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
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            aria-required="true"
            aria-invalid={!!showError("email")}
            aria-describedby={showError("email") ? "gc-email-error" : undefined}
            onBlur={handleBlur}
            className={inputClass(!!showError("email"))}
            placeholder="din@epost.no"
          />
          {showError("email") && (
            <p id="gc-email-error" role="alert" className={errorTextClass}>
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
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!showError("phone")}
            aria-describedby={showError("phone") ? "gc-phone-error" : undefined}
            onBlur={handleBlur}
            className={inputClass(!!showError("phone"))}
            placeholder="+47 XXX XX XXX"
          />
          {showError("phone") && (
            <p id="gc-phone-error" role="alert" className={errorTextClass}>
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
          defaultValue=""
          required
          aria-required="true"
          aria-invalid={!!showError("giftCardType")}
          aria-describedby={showError("giftCardType") ? "gc-type-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("giftCardType"))}
        >
          <option value="" disabled>
            Velg opplevelse
          </option>
          {giftCardTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {showError("giftCardType") && (
          <p id="gc-type-error" role="alert" className={errorTextClass}>
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
          className={`${inputClass(false)} resize-y`}
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
          autoComplete="off"
          required
          aria-required="true"
          aria-invalid={!!showError("recipientName")}
          aria-describedby={showError("recipientName") ? "gc-recipient-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("recipientName"))}
          placeholder="Hvem skal gavekortet til?"
        />
        {showError("recipientName") && (
          <p id="gc-recipient-error" role="alert" className={errorTextClass}>
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
          className={`${inputClass(false)} resize-y`}
          placeholder="En personlig hilsen som skal stå på gavekortet..."
        />
      </div>

      {status === "error" && !Object.values(errors).some(Boolean) && (
        <div
          role="alert"
          className="rounded-lg border border-red-600 bg-white px-4 py-3 font-inter text-sm text-red-700 text-pretty"
        >
          Noe gikk galt, og bestillingen ble ikke sendt. Ring oss på{" "}
          <a href="tel:+4799469957" className="inline-flex min-h-11 items-center whitespace-nowrap underline">
            +47 99 46 99 57
          </a>
          .
        </div>
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
