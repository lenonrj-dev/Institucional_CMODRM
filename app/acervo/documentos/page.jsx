// app/acervo/documentos/page.jsx (SERVER)
export const metadata = {
  title: "Documentos — Banco de Memória",
  description: "Atas, relatórios, ofícios e registros institucionais.",
  alternates: { canonical: "/acervo/documentos" }
};

import CollectionIndexClient from "../_components/CollectionIndexClient";
import { getCollectionItems } from "../api";

export default function Page() {
  const items = getCollectionItems("documentos");
  return <CollectionIndexClient collectionKey="documentos" initialItems={items} />;
}
