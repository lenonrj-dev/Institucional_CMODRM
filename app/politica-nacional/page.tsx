// app/politica-nacional/page.tsx
import PoliticaLanding from "./sections/PoliticaLanding";
import type { SiteContent } from "../../lib/content-types";

export const metadata = {
  title: "Política Nacional — Banco de Memória | Sintracon",
  description:
    "Diretrizes, instrumentos e linha do tempo da política nacional do sindicato. Busque por eixos, períodos e acesse documentos completos.",
  alternates: { canonical: "/politica-nacional" },
  openGraph: {
    title: "Política Nacional — Banco de Memória",
    description:
      "Diretrizes, instrumentos e linha do tempo. Transparência e histórico da atuação sindical.",
    url: "/politica-nacional",
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
  const { politics } = await getContent();

  // JSON-LD simples (ajuste se tiver URIs oficiais)
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Política Nacional — Banco de Memória",
    about: {
      "@type": "Organization",
      name: "Sintracon",
      areaServed: "Brasil",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PoliticaLanding content={politics} />
    </>
  );
}
