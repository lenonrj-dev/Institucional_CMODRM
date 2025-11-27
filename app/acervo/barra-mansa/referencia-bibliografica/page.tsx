import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";
import {
  Section,
  SectionTitle,
  ReferenciaCard,
  FilterSidebar,
  SearchBar,
  Pagination,
} from "../../_components/ui";

const city = getCity("barra-mansa");
const section = city && getSection(city, "referencia-bibliografica");

export const metadata = {
  title: "Referência Bibliográfica | Acervo Barra Mansa",
  description: "Clippings, livros e artigos sobre Barra Mansa.",
  keywords: [
    "Barra Mansa",
    "referencia bibliografica",
    "livros",
    "artigos",
    "teses",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa/referencia-bibliografica" },
  openGraph: {
    title: "Referência Bibliográfica | Acervo Barra Mansa",
    description: "Clippings, livros e artigos sobre Barra Mansa.",
    url: "/acervo/barra-mansa/referencia-bibliografica",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referência Bibliográfica | Acervo Barra Mansa",
    description: "Clippings, livros e artigos sobre Barra Mansa.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const refs = [
    {
      title: "Memória sindical de Barra Mansa",
      authors: "Equipe de Pesquisa do Centro de Memória",
      year: "1982",
      type: "Livro" as const,
      source: "Editora do Sindicato",
      citation: "EQUIPE CM. Memória sindical de Barra Mansa. Editora do Sindicato, 1982.",
    },
    {
      title: "Território, bairro e organização",
      authors: "L. Almeida; P. Souza",
      year: "1980",
      type: "Artigo" as const,
      source: "Revista Cultura Operária",
      citation: "ALMEIDA, L.; SOUZA, P. Território, bairro e organização. Cultura Operária, 1980.",
    },
    {
      title: "História oral como política",
      authors: "M. Carvalho",
      year: "1990",
      type: "Tese" as const,
      source: "Universidade Federal Fluminense",
      citation: "CARVALHO, M. História oral como política. Tese (Doutorado), UFF, 1990.",
    },
  ];

  return (
    <SessionLanding
      city={city}
      section={section}
      breadcrumb={[
        { label: "Acervo", href: "/acervo" },
        { label: city.name, href: `/acervo/${city.slug}` },
        { label: "Referência Bibliográfica" },
      ]}
    >
      <Section className="pt-0">
        <SectionTitle
          eyebrow="Referências e citações"
          title="Catálogo para consulta"
          description="As referências bibliográficas ajudam a mapear a produção sobre Barra Mansa, ancorando estudos e memórias do território. Cada registro traz citação pronta para pesquisa acadêmica."
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <FilterSidebar
            filters={{ label: "Tipos", options: ["Livros", "Artigos", "Teses"] }}
            title="Classificação"
          />
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Consulta rápida</p>
            <SearchBar placeholder="Buscar por título, autor ou palavra-chave..." ariaLabel="Buscar referências" />
            <p className="text-sm text-white/70">
              Citações fictícias para ilustrar a organização do catálogo de referência bibliográfica da cidade.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Bibliografia selecionada"
          title="Referências ilustrativas"
          description="Obras exemplificativas para orientar pesquisadores e estudantes sobre o acervo de Barra Mansa."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {refs.map((ref, idx) => (
            <ReferenciaCard key={idx} {...ref} />
          ))}
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </Section>
    </SessionLanding>
  );
}
