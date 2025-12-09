// app/jornais-de-epoca/page.tsx  (SERVER)
import JornaisLanding from "./[slug]/sections/Landing";

export const metadata = {
  title: "Jornais de Epoca - Banco de Memoria | Sintracon",
  description: "Edicoes historicas digitalizadas com leitura vertical confortavel. Busque por decada e acesse a leitura completa.",
  alternates: { canonical: "/jornais-de-epoca" },
};

export default function Page() {
  return <JornaisLanding />;
}
