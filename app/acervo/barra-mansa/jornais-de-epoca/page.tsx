import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";

const city = getCity("barra-mansa");
const section = city && getSection(city, "jornais-de-epoca");

export const metadata = {
  title: "Jornais de Época | Acervo Barra Mansa",
  description: "Recortes e edicoes historicas do acervo de Barra Mansa.",
  keywords: [
    "Barra Mansa",
    "jornais de epoca",
    "imprensa",
    "acervo historico",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa/jornais-de-epoca" },
  openGraph: {
    title: "Jornais de Época | Acervo Barra Mansa",
    description: "Recortes e edicoes historicas do acervo de Barra Mansa.",
    url: "/acervo/barra-mansa/jornais-de-epoca",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jornais de Época | Acervo Barra Mansa",
    description: "Recortes e edicoes historicas do acervo de Barra Mansa.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  return <SessionLanding city={city} section={section} />;
}
