import ContactHero from "./sections/ContactHero";
import ContactChannels from "./sections/ContactChannels";
import ContactForm from "./sections/ContactForm";
import ContactAddresses from "./sections/ContactAddresses";
import ContactMap from "./sections/ContactMap";
import ContactFAQ from "./sections/ContactFAQ";
import { getSiteContent } from "../../lib/get-site-content";

export const metadata = {
  title: "Contato – Banco de Memória | Sintracon",
  description:
    "Fale com a equipe do Banco de Memória: canais oficiais, formulário, endereços, horários e orientações.",
  alternates: { canonical: "/contato" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contato – Banco de Memória | Sintracon",
    description:
      "Canais oficiais, formulário, endereços, horários e orientações.",
    url: "/contato",
    siteName: "Sintracon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato – Banco de Memória | Sintracon",
    description:
      "Canais oficiais, formulário, endereços, horários e orientações.",
  },
};

export default async function Page() {
  const { contact } = await getSiteContent();

  return (
    <>
      {/* JSON-LD (ContactPage + Organization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contato – Banco de Memória | Sintracon",
            url: "https://example.com/contato",
            mainEntity: {
              "@type": "Organization",
              name: "Sintracon",
              url: "https://example.com",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "contato@sintracon.org.br",
                  telephone: "+55-11-0000-0000",
                  areaServed: "BR",
                  availableLanguage: ["pt-BR"],
                },
              ],
            },
          }),
        }}
      />
      {/* Seções (Client Components) */}
      <ContactHero content={contact.hero} />
      <ContactChannels content={contact.channels} />
      <ContactForm content={contact.form} />
      <ContactAddresses content={contact.addresses} />
      <ContactMap content={contact.map} />
      <ContactFAQ content={contact.faq} />
    </>
  );
}
