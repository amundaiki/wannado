import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt Wannado - Bestill opplevelse eller tur | Wannado",
  description:
    "Ta kontakt med Wannado for å bestille teambuilding, kajakkturer, seilturer, foredrag eller andre opplevelser i Arendal. Vi svarer innen 24 timer.",
  openGraph: {
    title: "Kontakt Wannado - Bestill opplevelse eller tur",
    description:
      "Ta kontakt med Wannado for å bestille opplevelser i Arendal. Vi svarer innen 24 timer.",
    images: ["/images/havsul.jpg"],
  },
};

const contacts = [
  {
    name: "Tone Pernille Sivertsen",
    role: "Teambuilding, foredrag og hest",
    phone: "+47 99 46 99 57",
    phoneHref: "tel:+4799469957",
    email: "tp@wannado.no",
    emailHref: "mailto:tp@wannado.no",
  },
  {
    name: "Roar Laugerud",
    role: "Kajakk, kano og seilturer",
    phone: "+47 94 82 67 10",
    phoneHref: "tel:+4794826710",
    email: "roar@wannado.no",
    emailHref: "mailto:roar@wannado.no",
  },
];

const meetingPoints = [
  {
    label: "Kajakkurs og turer",
    location: "Oppmøte Skarestrand, 4812 Kongshavn",
  },
  {
    label: "Båtturer",
    location: "Oppmøte Pollen i Arendal (eller avtalt sted)",
  },
];

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-sand selection:text-brown flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-16 bg-cream text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space text-4xl md:text-6xl font-bold text-brown mb-4">
            Ta kontakt
          </h1>
          <p className="font-inter text-lg md:text-xl text-brown-mid leading-relaxed">
            Send oss en forespørsel, eller ring direkte. Vi svarer innen 24
            timer.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="flex-grow pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* LEFT: Contact Form */}
            <div>
              <h2 className="font-space font-bold text-xl text-brown mb-4">
                Send forespørsel
              </h2>
              <Suspense
                fallback={
                  <div className="bg-cream rounded-2xl p-6 md:p-8 h-[500px] animate-pulse" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* RIGHT: Contact Info */}
            <div className="space-y-6">
              <h2 className="font-space font-bold text-xl text-brown mb-4">
                Kontaktpersoner
              </h2>

              {/* Contact cards */}
              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-border"
                >
                  {/* Photo placeholder */}
                  <div className="w-16 h-16 rounded-full bg-warm-white border border-border flex items-center justify-center mb-4">
                    <span className="font-space font-bold text-xl text-brown-muted">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-space font-bold text-lg text-brown mb-1">
                    {contact.name}
                  </h3>
                  <p className="font-inter text-sm text-brown-muted mb-3">
                    {contact.role}
                  </p>
                  <div className="space-y-1.5">
                    <a
                      href={contact.phoneHref}
                      className="block font-inter text-sm text-teal hover:text-brown transition-colors duration-200"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={contact.emailHref}
                      className="block font-inter text-sm text-teal hover:text-brown transition-colors duration-200"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              ))}

              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="font-space font-bold text-lg text-brown mb-3">
                  Adresse
                </h3>
                <p className="font-inter text-sm text-brown-mid leading-relaxed mb-1">
                  Wannado
                </p>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  Skarestrand 11, 4812 Kongshavn
                </p>
              </div>

              {/* Meeting points */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="font-space font-bold text-lg text-brown mb-3">
                  Oppmøtesteder
                </h3>
                <div className="space-y-3">
                  {meetingPoints.map((point) => (
                    <div key={point.label}>
                      <p className="font-inter text-sm font-medium text-brown">
                        {point.label}
                      </p>
                      <p className="font-inter text-sm text-brown-mid">
                        {point.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
                <h3 className="font-space font-bold text-lg text-brown p-6 pb-0">
                  Finn oss
                </h3>
                <div className="p-6 pt-4">
                  <iframe
                    src="https://www.google.com/maps?q=Skarestrand+11,+4812+Kongshavn,+Norway&output=embed"
                    className="w-full h-64 md:h-72 rounded-lg"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wannado, Skarestrand 11, 4812 Kongshavn"
                  />
                </div>
              </div>

              {/* Availability note */}
              <div className="bg-teal/10 rounded-2xl p-6">
                <p className="font-inter text-sm text-teal font-medium mb-1">
                  Tilgjengelig hele året
                </p>
                <p className="font-inter text-sm text-brown-mid leading-relaxed">
                  Wannado tilbyr opplevelser gjennom alle årstider. Ta kontakt
                  for å finne en dato som passer dere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
