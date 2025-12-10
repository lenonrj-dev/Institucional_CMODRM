// app/jornais-de-epoca/page.tsx  (SERVER)
import JornaisLanding from "./[slug]/sections/Landing";
import { getSiteContent } from "../../lib/get-site-content";

export const metadata = {
  title: "Jornais de Epoca - Banco de Memoria | Sintracon",
  description: "Edicoes historicas digitalizadas com leitura vertical confortavel. Busque por decada e acesse a leitura completa.",
  alternates: { canonical: "/jornais-de-epoca" },
};

export default async function Page() {
  const { journals } = await getSiteContent();
  return <JornaisLanding content={journals} />;
}
