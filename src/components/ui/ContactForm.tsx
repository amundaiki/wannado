"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type FormStatus = "idle" | "pending" | "success" | "error";

const serviceOptions = [
  "Seilturer",
  "Kajakktur",
  "Kajakkurs",
  "Teambuilding",
  "Foredrag/JTI",
  "Grønlandsforedrag",
  "Gavekort",
  "Hesteopplevelser",
  "Annet",
];

// Lenker som peker på verdier utenfor listen over, mappet til gyldig tjeneste
// (API-et godtar bare verdiene i serviceOptions). Note forhåndsutfyller meldingen
// slik at konteksten ikke går tapt.
const serviceAliases: Record<string, { service: string; note?: string }> = {
  utleie: { service: "Annet", note: "Gjelder utleie av kajakk og kano." },
  foredrag: { service: "Foredrag/JTI" },
  basispakke: { service: "Teambuilding", note: "Gjelder bedriftspakken Basispakke." },
  "komplett dag": { service: "Teambuilding", note: "Gjelder bedriftspakken Komplett dag." },
  premium: { service: "Teambuilding", note: "Gjelder bedriftspakken Premium." },
};

const fieldOrder = ["name", "email", "phone", "service", "message"] as const;

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 font-body text-sm text-brown placeholder:text-brown-mid focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors";

function inputClass(hasError: boolean): string {
  return `${inputBase} ${hasError ? "border-red-600" : "border-border"}`;
}

const errorTextClass = "mt-1 font-body text-sm text-red-700";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface ContactFormProps {
  defaultService?: string;
}

export default function ContactForm({ defaultService }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const serviceParam = defaultService || searchParams.get("tjeneste") || "";
  const normalizedParam = serviceParam.trim().toLowerCase();
  const alias = serviceAliases[normalizedParam];
  const initialService =
    serviceOptions.find((opt) => opt.toLowerCase() === normalizedParam) ||
    alias?.service ||
    "";
  const initialMessage = alias?.note || "";
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
      case "service":
        return !serviceOptions.includes(value)
          ? "Velg en tjeneste"
          : undefined;
      case "message":
        return value.trim().length < 10 ? "Melding må være minst 10 tegn" : undefined;
      default:
        return undefined;
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      company: formData.get("company"),
    };

    const newErrors: FieldErrors = {};
    newErrors.name = validateField("name", String(data.name || ""));
    newErrors.email = validateField("email", String(data.email || ""));
    newErrors.phone = validateField("phone", String(data.phone || ""));
    newErrors.service = validateField("service", String(data.service || ""));
    newErrors.message = validateField("message", String(data.message || ""));

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, service: true, message: true });
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
        <p className="font-display font-bold text-xl text-brown mb-2">
          Takk for din henvendelse!
        </p>
        <p className="font-body text-brown-mid">
          Vi svarer deg innen 24 timer.
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
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label
          htmlFor="contact-name"
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          Navn <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={!!showError("name")}
          aria-describedby={showError("name") ? "contact-name-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("name"))}
          placeholder="Ditt fulle navn"
        />
        {showError("name") && (
          <p id="contact-name-error" role="alert" className={errorTextClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          E-post <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          aria-required="true"
          aria-invalid={!!showError("email")}
          aria-describedby={showError("email") ? "contact-email-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("email"))}
          placeholder="din@epost.no"
        />
        {showError("email") && (
          <p id="contact-email-error" role="alert" className={errorTextClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          Telefon
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={!!showError("phone")}
          aria-describedby={showError("phone") ? "contact-phone-error" : undefined}
          onBlur={handleBlur}
          className={inputClass(!!showError("phone"))}
          placeholder="+47 XXX XX XXX"
        />
        {showError("phone") && (
          <p id="contact-phone-error" role="alert" className={errorTextClass}>
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          Tjeneste <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-service"
          name="service"
          required
          aria-required="true"
          aria-invalid={!!showError("service")}
          aria-describedby={showError("service") ? "contact-service-error" : undefined}
          onBlur={handleBlur}
          defaultValue={initialService}
          className={inputClass(!!showError("service"))}
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
        {showError("service") && (
          <p id="contact-service-error" role="alert" className={errorTextClass}>
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          Melding <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          aria-invalid={!!showError("message")}
          aria-describedby={showError("message") ? "contact-message-error" : undefined}
          onBlur={handleBlur}
          rows={5}
          defaultValue={initialMessage}
          className={`${inputClass(!!showError("message"))} resize-y`}
          placeholder="Fortell oss hva du er interessert i, antall deltakere, ønsket dato..."
        />
        {showError("message") && (
          <p id="contact-message-error" role="alert" className={errorTextClass}>
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && !Object.values(errors).some(Boolean) && (
        <div
          role="alert"
          className="rounded-lg border border-red-600 bg-white px-4 py-3 font-body text-sm text-red-700 text-pretty"
        >
          Noe gikk galt, og meldingen ble ikke sendt. Ring oss på{" "}
          <a href="tel:+4799469957" className="inline-flex min-h-11 items-center whitespace-nowrap underline">
            +47 99 46 99 57
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="min-h-11 w-full bg-brown text-white font-body font-medium text-sm py-3 rounded-lg hover:bg-brown-hover transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {status === "pending" ? "Sender..." : "Send forespørsel"}
      </button>
    </form>
  );
}
