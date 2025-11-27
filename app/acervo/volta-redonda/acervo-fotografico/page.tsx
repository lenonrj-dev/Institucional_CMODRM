import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";
import {
  Section,
  SectionTitle,
  PhotoMasonryGrid,
  FilterSidebar,
  SearchBar,
  Pagination,
  PhotoItem,
} from "../../_components/ui";

const city = getCity("volta-redonda");
const section = city && getSection(city, "acervo-fotografico");

export const metadata = {
  title: "Acervo Fotográfico | Acervo Volta Redonda",
  description: "Pre-visualizacao do acervo fotografico de Volta Redonda.",
  keywords: [
    "Volta Redonda",
    "acervo fotografico",
    "fotografia historica",
    "mobilizacao",
    "cotidiano fabril",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda/acervo-fotografico" },
  openGraph: {
    title: "Acervo Fotografico | Acervo Volta Redonda",
    description: "Pre-visualizacao do acervo fotografico de Volta Redonda.",
    url: "/acervo/volta-redonda/acervo-fotografico",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acervo Fotografico | Acervo Volta Redonda",
    description: "Pre-visualizacao do acervo fotografico de Volta Redonda.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const photos: PhotoItem[] = [
    {
      src: "/hero.png",
      alt: "Pátio da Fábrica",
      year: "1948",
      location: "Área industrial",
      description: "Registro do cotidiano fabril, circulação de trabalhadores e organização espacial.",
      tags: ["Cotidiano", "Fábrica"],
    },
    {
      src: "/CUT.png",
      alt: "Assembleia aberta",
      year: "1950",
      location: "Praça central",
      description: "Assembleia geral convocada pelo sindicato para deliberação de pauta.",
      tags: ["Assembleia", "Mobilização"],
    },
    {
      src: "/window.svg",
      alt: "Cartaz de convocação",
      year: "1979",
      location: "Imprensa sindical",
      description: "Arte gráfica utilizada para convocar atos e reuniões ampliadas.",
      tags: ["Cartaz", "Imprensa"],
    },
  ];

  return (
    <SessionLanding
      city={city}
      section={section}
      breadcrumb={[
        { label: "Acervo", href: "/acervo" },
        { label: city.name, href: `/acervo/${city.slug}` },
        { label: "Acervo Fotográfico" },
      ]}
    >
      <Section className="pt-0">
        <SectionTitle
          eyebrow="Fotografia histórica"
          title="Visualização imersiva, metadados e contexto"
          description="O acervo visual reúne imagens de mobilização, cotidiano fabril e cenas urbanas. Cada fotografia é descrita com local, data, situação retratada e termos controlados para facilitar a pesquisa."
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <FilterSidebar
            filters={{ label: "Décadas", options: ["1940s", "1950s", "1960s", "1970s", "1980s"] }}
            title="Período"
          />
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Busca e temas</p>
            <SearchBar placeholder="Buscar por local, ano ou tema..." ariaLabel="Buscar no acervo fotográfico" />
            <FilterSidebar
              filters={{ label: "Temas", options: ["Cotidiano", "Mobilização", "Indústria", "Imprensa"] }}
              title="Temas"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Galeria"
          title="Amostras do acervo fotográfico"
          description="Layout inspirado em masonry para leitura fluida e visual envolvente. Clique para ampliar e ver metadados."
        />
        <PhotoMasonryGrid photos={photos} />
        <div className="mt-6">
          <Pagination />
        </div>
      </Section>
    </SessionLanding>
  );
}
