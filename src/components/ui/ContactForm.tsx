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
  const matchedService =
    serviceOptions.find(
      (opt) => opt.toLowerCase() === serviceParam.toLowerCase()
    ) || "";
  const initialService = matchedService;

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
    };

    const newErrors: FieldErrors = {};
    (data.name as string) && (newErrors.name = validateField("name", data.name as string));
    (data.email as string) && (newErrors.email = validateField("email", data.email as string));
    (data.phone as string) && (newErrors.phone = validateField("phone", data.phone as string));
    (data.message as string) && (newErrors.message = validateField("message", data.message as string));

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, message: true });
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
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-body text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="Ditt fulle navn"
        />
        {errors.name && touched.name && (
          <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600">
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
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-body text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="din@epost.no"
        />
        {errors.email && touched.email && (
          <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-600">
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
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-body text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
          placeholder="+47 XXX XX XXX"
        />
        {errors.phone && touched.phone && (
          <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-600">
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
          defaultValue={initialService}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-body text-sm text-brown focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
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
          className="block font-body text-sm font-medium text-brown mb-1.5"
        >
          Melding <span className="text-teal" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onBlur={handleBlur}
          rows={5}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 font-body text-sm text-brown placeholder:text-brown-light focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors resize-y"
          placeholder="Fortell oss hva du er interessert i, antall deltakere, ønsket dato..."
        />
        {errors.message && touched.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && !Object.values(errors).some(Boolean) && (
        <p role="alert" className="font-body text-sm text-red-600">
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
        className="w-full bg-brown text-white font-body font-medium text-sm py-3 rounded-lg hover:bg-[#5a4838] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {status === "pending" ? "Sender..." : "Send forespørsel"}
      </button>
    </form>
  );
}
