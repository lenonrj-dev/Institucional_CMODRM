import AccessLanding from "./sections/AccessLanding";
import type { SiteContent } from "../../lib/content-types";

export const metadata = {
  title: "Acesso à Informação – Banco de Memória | Sintracon",
  description:
    "Consulte documentos, políticas e registros do banco de memória. Busque por tema e avance para páginas com o conteúdo completo.",
  alternates: { canonical: "/acesso-a-informacao" },
  openGraph: {
    title: "Acesso à Informação – Banco de Memória",
    description: "Transparência ativa, busca por documentos e orientação para pedidos de acesso.",
    url: "/acesso-a-informacao",
    type: "website",
  },
  robots: { index: true, follow: true },
};

async function getContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo do site");
  }
  return res.json();
}

export default async function Page() {
  const { access } = await getContent();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Acesso à Informação – Banco de Memória",
    description: "Transparência ativa, busca por documentos e orientação para pedidos.",
    isPartOf: { "@type": "WebSite", name: "Sintracon" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AccessLanding content={access} />
    </>
  );
}
