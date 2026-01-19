// app/acervo/page.js

export const metadata = {
  title: "Acervo — Banco de Memória | Sintracon",
  description:
    "Navegue pelo acervo: jornais de época, fotografias, cartazes, documentos e entrevistas. Busca por tema, filtros e coleções em destaque.",
  alternates: { canonical: "/acervo" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Acervo — Banco de Memória",
    description:
      "Jornais, fotos, cartazes, documentos e entrevistas digitalizadas.",
    url: "/acervo",
    siteName: "Sintracon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acervo — Banco de Memória",
    description:
      "Navegue por coleções e itens com filtros e busca otimizada.",
  },
};

import AcervoHero from "./sections/AcervoHero";
import CityShowcase from "./sections/CityShowcase";
import { getSiteContent } from "../../lib/get-site-content";

export default async function Page() {
  const { acervo } = await getSiteContent();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Acervo — Banco de Memória | Sintracon",
    mainEntity: {
      "@type": "Organization",
      name: "Sintracon",
      url: "https://example.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "/acervo?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="overflow-x-hidden bg-black">
        <AcervoHero content={acervo.hero} />
  
        {/* Visão focada apenas nos acervos disponíveis: Volta Redonda, Barra Mansa e Fundos temáticos */}
        <CityShowcase content={acervo.cityShowcase} />
      </div>
    </>
  );
}
