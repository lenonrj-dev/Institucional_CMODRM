// app/jornais-de-epoca/page.js  (SERVER)
import JornaisLanding from "./[slug]/sections/Landing.jsx";

export const metadata = {
  title: "Jornais de Época — Banco de Memória | Sintracon",
  description:
    "Edições históricas digitalizadas com leitura vertical confortável. Busque por década e acesse a leitura completa.",
  alternates: { canonical: "/jornais-de-epoca" },
};

export default function Page() {
  return <JornaisLanding />;
}
