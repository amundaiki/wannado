import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Navn, e-post og melding er påkrevd" },
        { status: 400 }
      );
    }

    // Fallback to console.log when RESEND_API_KEY is not set (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log("Ny henvendelse (RESEND_API_KEY mangler, logger til konsoll):", {
        name,
        email,
        phone,
        service,
        message,
      });

      return NextResponse.json({
        success: true,
        message: "Melding mottatt! Vi svarer deg innen 24 timer.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Wannado Kontaktskjema <onboarding@resend.dev>",
      to: "mail@wannado.no",
      replyTo: email,
      subject: `Ny henvendelse: ${service} - fra ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6B4F3A; border-bottom: 2px solid #E8D5B7; padding-bottom: 12px;">
            Ny forespørsel fra wannado.no
          </h2>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Navn:</p>
          <p style="margin: 0; color: #333;">${name}</p>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">E-post:</p>
          <p style="margin: 0; color: #333;"><a href="mailto:${email}">${email}</a></p>

          ${phone ? `<p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Telefon:</p><p style="margin: 0; color: #333;"><a href="tel:${phone}">${phone}</a></p>` : ""}

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Tjeneste:</p>
          <p style="margin: 0; color: #333;">${service}</p>

          <p style="margin: 16px 0 4px; font-weight: bold; color: #6B4F3A;">Melding:</p>
          <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>

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
    console.error("Feil ved sending av e-post:", error);
    return NextResponse.json(
      { success: false, message: "Serverfeil. Prøv igjen." },
      { status: 500 }
    );
  }
}
