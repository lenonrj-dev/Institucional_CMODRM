import CityLanding from "../_components/CityLanding";
import { getCity } from "../cityData";

const city = getCity("volta-redonda");

export const metadata = {
  title: "Acervo Volta Redonda | Banco de Memoria",
  description:
    "Pre-visualizacao do acervo de Volta Redonda: documentos, depoimentos, referencia bibliografica, jornais de epoca e acervo fotografico.",
  keywords: [
    "Volta Redonda",
    "acervo",
    "documentos historicos",
    "historia oral",
    "jornais de epoca",
    "fotografia",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda" },
  openGraph: {
    title: "Acervo Volta Redonda | Banco de Memoria",
    description:
      "Navegue por documentos, depoimentos, referencias e acervo fotografico dedicados a memoria de Volta Redonda.",
    url: "/acervo/volta-redonda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acervo Volta Redonda | Banco de Memoria",
    description:
      "Documentos, depoimentos, referencias e acervo fotografico de Volta Redonda.",
  },
};

export default function Page() {
  if (!city) return null;
  return <CityLanding city={city} />;
}
