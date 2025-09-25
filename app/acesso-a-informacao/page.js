// app/acesso-a-informacao/page.js
import AccessLanding from "./AccessLanding";

export const metadata = {
  title: "Acesso à Informação — Banco de Memória | Sintracon",
  description:
    "Consulte documentos, políticas e registros do banco de memória. Busque por tema e avance para páginas com o conteúdo completo.",
  alternates: { canonical: "/acesso-a-informacao" },
  openGraph: {
    title: "Acesso à Informação — Banco de Memória",
    description:
      "Transparência ativa, busca por documentos e orientação para pedidos de acesso.",
    url: "/acesso-a-informacao",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  // JSON-LD simples (ajuste se tiver política/URL oficiais)
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Acesso à Informação — Banco de Memória",
    description:
      "Transparência ativa, busca por documentos e orientação para pedidos.",
    isPartOf: { "@type": "WebSite", name: "Sintracon" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AccessLanding />
    </>
  );
}
