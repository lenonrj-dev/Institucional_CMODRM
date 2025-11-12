// app/acervo/cartazes/page.jsx (SERVER)
export const metadata = {
  title: "Cartazes & Panfletos — Banco de Memória",
  description: "Materiais gráficos de campanha, mobilização e eventos.",
  alternates: { canonical: "/acervo/cartazes" }
};

import CollectionIndexClient from "../_components/CollectionIndexClient";
import { getCollectionItems } from "../api";

export default function Page() {
  const items = getCollectionItems("cartazes");
  return <CollectionIndexClient collectionKey="cartazes" initialItems={items} />;
}
