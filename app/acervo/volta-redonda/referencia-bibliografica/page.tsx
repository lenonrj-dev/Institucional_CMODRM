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

const city = getCity("volta-redonda");
const section = city && getSection(city, "referencia-bibliografica");

export const metadata = {
  title: "Referência Bibliográfica | Acervo Volta Redonda",
  description: "Clippings, livros e artigos sobre o acervo de Volta Redonda.",
  keywords: [
    "Volta Redonda",
    "referencia bibliografica",
    "livros",
    "artigos",
    "teses",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda/referencia-bibliografica" },
  openGraph: {
    title: "Referência Bibliográfica | Acervo Volta Redonda",
    description: "Clippings, livros e artigos sobre o acervo de Volta Redonda.",
    url: "/acervo/volta-redonda/referencia-bibliografica",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referência Bibliográfica | Acervo Volta Redonda",
    description: "Clippings, livros e artigos sobre o acervo de Volta Redonda.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const refs = [
    {
      title: "Memória Operária no Vale do Paraíba",
      authors: "Equipe de Pesquisa do Centro de Memória",
      year: "1984",
      type: "Livro" as const,
      source: "Editora do Sindicato",
      citation: "EQUIPE CM. Memória Operária no Vale do Paraíba. Editora do Sindicato, 1984.",
    },
    {
      title: "Greves e urbanização em Volta Redonda",
      authors: "J. Silva; M. Pereira",
      year: "1979",
      type: "Artigo" as const,
      source: "Revista Estudos do Trabalho",
      citation: "SILVA, J.; PEREIRA, M. Greves e urbanização em Volta Redonda. Estudos do Trabalho, 1979.",
    },
    {
      title: "História oral e cidadania",
      authors: "C. Rocha",
      year: "1988",
      type: "Tese" as const,
      source: "Universidade Federal do RJ",
      citation: "ROCHA, C. História oral e cidadania. Tese (Doutorado), UFRJ, 1988.",
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
          title="O que é, para que serve, como consultar"
          description="Referências bibliográficas asseguram rastreabilidade, citabilidade e rigor na pesquisa. Cada entrada traz autoria, ano, tipo documental e citação pronta para facilitar estudos."
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
              As citações abaixo são fictícias e exemplificam a estrutura de registro de obras relacionadas ao acervo.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Bibliografia selecionada"
          title="Referências fictícias para ilustração"
          description="Listagem didática com tipos variados para demonstrar a organização do catálogo de referências."
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
