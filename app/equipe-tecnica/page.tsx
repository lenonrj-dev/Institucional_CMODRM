// app/equipe-tecnica/page.js
import TeamLanding from "./TeamLanding";

export const metadata = {
  title: "Equipe Técnica — Banco de Memória | Sintracon",
  description:
    "Conheça a equipe técnica responsável pelo Banco de Memória: coordenação, curadoria, preservação digital, pesquisa e desenvolvimento.",
  alternates: { canonical: "/equipe-tecnica" },
  openGraph: {
    title: "Equipe Técnica — Banco de Memória",
    description:
      "Coordenação, curadoria, preservação digital, pesquisa e desenvolvimento.",
    url: "/equipe-tecnica",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  // JSON-LD simples da organização (para SEO)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sintracon — Banco de Memória",
    url: "/equipe-tecnica",
    department: [
      { "@type": "Organization", name: "Curadoria" },
      { "@type": "Organization", name: "Preservação Digital" },
      { "@type": "Organization", name: "Pesquisa & Catalogação" },
      { "@type": "Organization", name: "Desenvolvimento" },
      { "@type": "Organization", name: "Acessibilidade & Comunicação" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TeamLanding />
    </>
  );
}
