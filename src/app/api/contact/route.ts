import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const VALID_SERVICES = new Set([
  "Seilturer",
  "Kajakktur",
  "Kajakkurs",
  "Teambuilding",
  "Foredrag/JTI",
  "Grønlandsforedrag",
  "Gavekort",
  "Hesteopplevelser",
  "Annet",
]);

const VALID_GIFT_CARD_TYPES = new Set([
  "Seilopplevelse",
  "Kajakk-eventyr",
  "Teambuilding",
  "Foredrag",
  "Valgfri opplevelse",
]);

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const TRUST_PROXY_HEADERS = process.env.CONTACT_TRUST_PROXY_HEADERS === "true";

type ContactPayload = {
  formType?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company?: string;
  giftCardType?: string;
  amount?: string;
  recipientName?: string;
  personalMessage?: string;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || "";
}

function proxiedClientKey(request: NextRequest) {
  return (
    firstHeaderValue(request.headers.get("cf-connecting-ip")) ||
    firstHeaderValue(request.headers.get("x-real-ip")) ||
    firstHeaderValue(request.headers.get("x-forwarded-for"))
  );
}

function contactSecurityConfigurationError(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  if (!TRUST_PROXY_HEADERS) {
    console.error(
      "Kontaktskjema er ikke konfigurert: CONTACT_TRUST_PROXY_HEADERS=true mangler i production.",
    );
    return jsonError("Kontaktskjemaet er midlertidig utilgjengelig.", 503);
  }

  if (!proxiedClientKey(request)) {
    console.error(
      "Kontaktskjema er ikke konfigurert: ingen proxy-IP-header tilgjengelig i production.",
    );
    return jsonError("Kontaktskjemaet er midlertidig utilgjengelig.", 503);
  }

  return null;
}

function clientKey(request: NextRequest) {
  return proxiedClientKey(request) || "local-development";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function asCleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return value === "" || /^[\d\s+()-]{8,20}$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

async function parsePayload(request: NextRequest): Promise<ContactPayload | null> {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return null;
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return null;
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }

  return {
    formType: asCleanString(body.formType, 40),
    name: asCleanString(body.name, 120),
    email: asCleanString(body.email, 180).toLowerCase(),
    phone: asCleanString(body.phone, 40),
    service: asCleanString(body.service, 80),
    message: asCleanString(body.message, 3000),
    company: asCleanString(body.company, 120),
    giftCardType: asCleanString(body.giftCardType, 80),
    amount: asCleanString(body.amount, 500),
    recipientName: asCleanString(body.recipientName, 120),
    personalMessage: asCleanString(body.personalMessage, 1000),
  };
}

export async function POST(request: NextRequest) {
  try {
    const securityConfigurationError = contactSecurityConfigurationError(request);
    if (securityConfigurationError) {
      return securityConfigurationError;
    }

    if (isRateLimited(clientKey(request))) {
      return jsonError("For mange forsøk. Prøv igjen litt senere.", 429);
    }

    const payload = await parsePayload(request);
    if (!payload) {
      return jsonError("Ugyldig forespørsel.", 400);
    }

    const {
      formType,
      name,
      email,
      phone,
      service,
      message,
      company,
      giftCardType,
      amount,
      recipientName,
      personalMessage,
    } = payload;

    if (company) {
      return NextResponse.json({
        success: true,
        message: "Melding mottatt! Vi svarer deg innen 24 timer.",
      });
    }

    if (name.length < 2 || !isEmail(email) || !isPhone(phone) || !VALID_SERVICES.has(service)) {
      return jsonError("Sjekk feltene og prøv igjen.", 400);
    }

    const isGiftCardOrder = formType === "giftCard";
    if (formType && !isGiftCardOrder) {
      return jsonError("Sjekk feltene og prøv igjen.", 400);
    }

    if (
      isGiftCardOrder &&
      (service !== "Gavekort" ||
        !giftCardType ||
        !VALID_GIFT_CARD_TYPES.has(giftCardType) ||
        !recipientName ||
        recipientName.length < 2)
    ) {
      return jsonError("Sjekk feltene og prøv igjen.", 400);
    }

    const effectiveMessage = isGiftCardOrder
      ? [
          `Type gavekort: ${giftCardType}`,
          amount ? `Beløp eller ønsker: ${amount}` : null,
          `Mottaker: ${recipientName}`,
          personalMessage ? `Melding til mottaker: ${personalMessage}` : null,
        ]
          .filter(Boolean)
          .join("\n")
      : message;

    if (effectiveMessage.length < 10) {
      return jsonError("Sjekk feltene og prøv igjen.", 400);
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Kontaktskjema er ikke konfigurert: RESEND_API_KEY mangler.");
      return jsonError("Kontaktskjemaet er midlertidig utilgjengelig.", 503);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(effectiveMessage);

    await resend.emails.send({
      from: "Wannado Kontaktskjema <onboarding@resend.dev>",
      to: "mail@wannado.no",
      replyTo: email,
      subject: cleanHeaderValue(`Ny henvendelse: ${service} - fra ${name}`),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6B4F3A; border-bottom: 2px solid #E8D5B7; padding-bottom: 12px;">
            Ny forespørsel fra wannado.no
          </h2>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Navn:</p>
          <p style="margin: 0; color: #333;">${safeName}</p>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">E-post:</p>
          <p style="margin: 0; color: #333;"><a href="mailto:${safeEmail}">${safeEmail}</a></p>

          ${phone ? `<p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Telefon:</p><p style="margin: 0; color: #333;"><a href="tel:${safePhone}">${safePhone}</a></p>` : ""}

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Tjeneste:</p>
          <p style="margin: 0; color: #333;">${safeService}</p>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Melding:</p>
          <p style="margin: 0; color: #333; white-space: pre-wrap;">${safeMessage}</p>

          <hr style="margin-top: 32px; border: none; border-top: 1px solid #E8D5B7;" />
          <p style="font-size: 12px; color: #999; margin-top: 12px;">
            Sendt fra kontaktskjemaet på wannado.no
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Melding mottatt! Vi svarer deg innen 24 timer.",
    });
  } catch (error) {
    console.error("Feil ved sending av kontaktskjema:", error);
    return jsonError("Serverfeil. Prøv igjen.", 500);
  }
}
