import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";

const city = getCity("volta-redonda");
const section = city && getSection(city, "jornais-de-epoca");

export const metadata = {
  title: "Jornais de Época | Acervo Volta Redonda",
  description: "Capas e edicoes digitalizadas do acervo de Volta Redonda.",
  keywords: [
    "Volta Redonda",
    "jornais de epoca",
    "imprensa sindical",
    "acervo",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda/jornais-de-epoca" },
  openGraph: {
    title: "Jornais de Época | Acervo Volta Redonda",
    description: "Capas e edicoes digitalizadas do acervo de Volta Redonda.",
    url: "/acervo/volta-redonda/jornais-de-epoca",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jornais de Época | Acervo Volta Redonda",
    description: "Capas e edicoes digitalizadas do acervo de Volta Redonda.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  return <SessionLanding city={city} section={section} />;
}
