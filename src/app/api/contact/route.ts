import { NextRequest, NextResponse } from "next/server";

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

    // Log for now - replace with Resend/email sending later
    console.log("Ny henvendelse:", { name, email, phone, service, message });

    return NextResponse.json({
      success: true,
      message: "Melding mottatt! Vi svarer deg innen 24 timer.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Serverfeil. Prøv igjen." },
      { status: 500 }
    );
  }
}
