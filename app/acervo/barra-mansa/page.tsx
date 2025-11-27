import CityLanding from "../_components/CityLanding";
import { getCity } from "../cityData";

const city = getCity("barra-mansa");

export const metadata = {
  title: "Acervo Barra Mansa | Banco de Memoria",
  description:
    "Pre-visualizacao do acervo de Barra Mansa: documentos, depoimentos, referencia bibliografica, jornais de epoca e acervo fotografico.",
  keywords: [
    "Barra Mansa",
    "acervo",
    "documentos historicos",
    "historia oral",
    "jornais de epoca",
    "fotografia",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa" },
  openGraph: {
    title: "Acervo Barra Mansa | Banco de Memoria",
    description:
      "Navegue por documentos, depoimentos, referencias e acervo fotografico dedicados a memoria de Barra Mansa.",
    url: "/acervo/barra-mansa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acervo Barra Mansa | Banco de Memoria",
    description:
      "Documentos, depoimentos, referencias e acervo fotografico de Barra Mansa.",
  },
};

export default function Page() {
  if (!city) return null;
  return <CityLanding city={city} />;
}
