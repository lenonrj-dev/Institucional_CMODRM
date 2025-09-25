// app/producao-bibliografica/page.js

export const metadata = {
  title: "Nossa Produção Bibliográfica — Banco de Memória | Sintracon",
  description:
    "Artigos, livros, relatórios e capítulos ligados ao banco de memória. Busque por tema, filtre por década e acesse PDF e referências.",
  alternates: { canonical: "/producao-bibliografica" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nossa Produção Bibliográfica — Banco de Memória",
    description:
      "Artigos, livros, relatórios e capítulos ligados ao banco de memória.",
    url: "/producao-bibliografica",
    siteName: "Sintracon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nossa Produção Bibliográfica — Banco de Memória",
    description:
      "Artigos, livros, relatórios e capítulos ligados ao banco de memória.",
  },
};

import SectionBibliografia from "./section";

export default function Page() {
  // JSON-LD básico (ajuste quando tiver dados reais em produção)
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nossa Produção Bibliográfica — Banco de Memória | Sintracon",
    hasPart: [
      {
        "@type": "CreativeWork",
        name: "Exemplo de Artigo",
        author: [{ "@type": "Person", name: "Autor Exemplo" }],
        datePublished: "2021",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SectionBibliografia />
    </>
  );
}
