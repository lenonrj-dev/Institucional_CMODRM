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

const city = getCity("barra-mansa");
const section = city && getSection(city, "acervo-fotografico");

export const metadata = {
  title: "Acervo Fotográfico | Acervo Barra Mansa",
  description: "Pre-visualizacao do acervo fotografico de Barra Mansa.",
  keywords: [
    "Barra Mansa",
    "acervo fotografico",
    "fotografia historica",
    "mobilizacao",
    "cotidiano",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa/acervo-fotografico" },
  openGraph: {
    title: "Acervo Fotografico | Acervo Barra Mansa",
    description: "Pre-visualizacao do acervo fotografico de Barra Mansa.",
    url: "/acervo/barra-mansa/acervo-fotografico",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acervo Fotografico | Acervo Barra Mansa",
    description: "Pre-visualizacao do acervo fotografico de Barra Mansa.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const photos: PhotoItem[] = [
    {
      src: "/hero.png",
      alt: "Cena urbana",
      year: "1948",
      location: "Centro de Barra Mansa",
      description: "Registro do cotidiano urbano e circulação de trabalhadores.",
      tags: ["Cotidiano", "Urbano"],
    },
    {
      src: "/CUT.png",
      alt: "Assembleia comunitária",
      year: "1950",
      location: "Praça central",
      description: "Assembleia local que antecedeu negociações regionais.",
      tags: ["Assembleia", "Mobilização"],
    },
    {
      src: "/window.svg",
      alt: "Cartaz de bairro",
      year: "1972",
      location: "Imprensa comunitária",
      description: "Cartaz de convocação para reunião ampliada de bairro.",
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
          title="Visualização e contexto"
          description="Imagens que registram bairros, assembleias e cultura local. Metadados acessíveis para estudo e reprodução autorizada."
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <FilterSidebar
            filters={{ label: "Décadas", options: ["1930s", "1940s", "1950s", "1960s", "1970s"] }}
            title="Período"
          />
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Busca e temas</p>
            <SearchBar placeholder="Buscar por local, ano ou tema..." ariaLabel="Buscar no acervo fotográfico" />
            <FilterSidebar
              filters={{ label: "Temas", options: ["Cotidiano", "Mobilização", "Imprensa", "Cultura"] }}
              title="Temas"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Galeria"
          title="Amostras do acervo fotográfico"
          description="Disposição fluida estilo masonry para leitura confortável e visual imersivo."
        />
        <PhotoMasonryGrid photos={photos} />
        <div className="mt-6">
          <Pagination />
        </div>
      </Section>
    </SessionLanding>
  );
}
