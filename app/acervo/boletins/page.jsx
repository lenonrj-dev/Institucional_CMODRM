// app/acervo/boletins/page.jsx (SERVER)
export const metadata = {
  title: "Jornais de Época — Banco de Memória",
  description: "Edições históricas digitalizadas com contexto e busca.",
  alternates: { canonical: "/acervo/boletins" }
};

import CollectionIndexClient from "../_components/CollectionIndexClient";
import { getCollectionItems } from "../api";

export default function Page() {
  const items = getCollectionItems("boletins");
  return <CollectionIndexClient collectionKey="boletins" initialItems={items} />;
}
