// app/jornais-de-epoca/page.tsx  (SERVER)
import JornaisLanding from "./[slug]/sections/Landing";
import type { SiteContent } from "../../lib/content-types";

export const metadata = {
  title: "Jornais de Epoca - Banco de Memoria | Sintracon",
  description: "Edicoes historicas digitalizadas com leitura vertical confortavel. Busque por decada e acesse a leitura completa.",
  alternates: { canonical: "/jornais-de-epoca" },
};

async function getContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo de jornais de época");
  }
  return res.json();
}

export default async function Page() {
  const { journals } = await getContent();
  return <JornaisLanding content={journals} />;
}
