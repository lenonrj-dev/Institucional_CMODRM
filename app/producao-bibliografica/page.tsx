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

import SectionBibliografia from "./sections/Section";
import { getSiteContent } from "../../lib/get-site-content";

export default async function Page() {
  const { production } = await getSiteContent();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: production.hero.title,
    description: production.hero.description,
    hasPart: production.items.map((item) => ({
      "@type": "CreativeWork",
      name: item.title,
      author: item.authors.map((author) => ({ "@type": "Person", name: author })),
      datePublished: item.year.toString(),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SectionBibliografia content={production} />
    </>
  );
}
