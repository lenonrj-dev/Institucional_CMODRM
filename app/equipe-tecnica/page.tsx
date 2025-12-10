// app/equipe-tecnica/page.tsx
import TeamLanding from "./TeamLanding";
import type { SiteContent } from "../../lib/content-types";

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

async function getContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo da equipe técnica");
  }
  return res.json();
}

export default async function Page() {
  const { team } = await getContent();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: team.hero.title,
    description: team.hero.description,
    url: "/equipe-tecnica",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TeamLanding content={team} />
    </>
  );
}
