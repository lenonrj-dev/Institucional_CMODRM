import { Breadcrumb, ContentContainer } from "../../_components/ui";
import { depoimentos, documents, fotos, heroImage, jornais, referencias } from "./data";
import {
  DomWaldyrCTA,
  DomWaldyrDepoimentos,
  DomWaldyrDocuments,
  DomWaldyrFotos,
  DomWaldyrHero,
  DomWaldyrIntro,
  DomWaldyrJornais,
  DomWaldyrReferencias,
} from "./sections";

export const metadata = {
  title: "Acervo • Fundos Dom Waldyr",
  description:
    "Coleção dedicada à atuação pastoral e mediação social de Dom Waldyr, com documentos, depoimentos, referências, jornais e acervo fotográfico.",
  keywords: [
    "Dom Waldyr",
    "Fundos",
    "Pastoral Operária",
    "Jornais de época",
    "Documentos históricos",
    "Volta Redonda",
    "Barra Mansa",
  ],
};

export default function DomWaldyrFundPage() {
  return (
    <div className="bg-black text-white">
      <ContentContainer>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Acervo", href: "/acervo" },
            { label: "Fundos", href: "/acervo#fundos" },
            { label: "Dom Waldyr" },
          ]}
        />
      </ContentContainer>

      <DomWaldyrHero image={heroImage} />
      <DomWaldyrIntro />
      <DomWaldyrDocuments documents={documents} />
      <DomWaldyrDepoimentos depoimentos={depoimentos} />
      <DomWaldyrReferencias referencias={referencias} />
      <DomWaldyrJornais jornais={jornais} />
      <DomWaldyrFotos fotos={fotos} />
      <DomWaldyrCTA />
    </div>
  );
}
