import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";
import {
  SectionTitle,
  Section,
  DocumentTimeline,
  DocumentCard,
  SearchBar,
  FilterSidebar,
  Pagination,
} from "../../_components/ui";

const city = getCity("volta-redonda");
const section = city && getSection(city, "documentos");

export const metadata = {
  title: "Documentos | Acervo Volta Redonda",
  description: "Atas, oficios e relatorios digitalizados do acervo de Volta Redonda.",
  keywords: [
    "Volta Redonda",
    "documentos",
    "atas",
    "oficios",
    "relatorios",
    "acervo historico",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda/documentos" },
  openGraph: {
    title: "Documentos | Acervo Volta Redonda",
    description: "Atas, oficios e relatorios digitalizados do acervo de Volta Redonda.",
    url: "/acervo/volta-redonda/documentos",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentos | Acervo Volta Redonda",
    description: "Atas, oficios e relatorios digitalizados do acervo de Volta Redonda.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const timeline = [
    { year: "1950", title: "Ata de assembleia inaugural", description: "Registro das primeiras deliberações e pauta salarial." },
    { year: "1961", title: "Ata de Assembleia – Setembro", description: "Indicação de greve e eleição de comissão de base." },
    { year: "1965", title: "Relatório de Gestão", description: "Síntese das ações, finanças e participação em conselhos." },
    { year: "1972", title: "Ofício ao Ministério do Trabalho", description: "Pedido de mediação em dissídio e abertura de mesa tripartite." },
  ];

  const docs = section.items.map((it) => ({
    title: it.title,
    summary: it.summary,
    date: it.date,
    location: city.name,
    tags: ["Documento", "Volta Redonda"],
  }));

  return (
    <SessionLanding
      city={city}
      section={section}
      breadcrumb={[
        { label: "Acervo", href: "/acervo" },
        { label: city.name, href: `/acervo/${city.slug}` },
        { label: "Documentos" },
      ]}
    >
      <Section className="pt-0">
        <SectionTitle
          eyebrow="Documentação histórica"
          title="Descrição, preservação e contexto"
          description="As séries documentais de Volta Redonda revelam o desenho institucional do sindicato, seus processos decisórios e as camadas do cotidiano de fábrica. Cada peça passa por higienização, descrição archivística e atribuição de metadados controlados."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Linha do tempo documental</p>
            <p className="text-sm text-white/70">
              Marco temporal de documentos-chave: assembleias, relatórios e ofícios que estruturam a atuação sindical.
            </p>
            <div className="mt-4">
              <DocumentTimeline items={timeline} />
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Pesquisa e filtros</p>
            <SearchBar placeholder="Buscar por título, data ou palavra-chave..." ariaLabel="Buscar documentos" />
            <FilterSidebar
              filters={{ label: "Categorias", options: ["Atas", "Relatórios", "Ofícios", "Dossiês", "Correspondência"] }}
              title="Categorias"
            />
            <FilterSidebar
              filters={{ label: "Décadas", options: ["1950s", "1960s", "1970s", "1980s"] }}
              title="Período"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Pré-visualizações"
          title="Documentos em destaque"
          description="Recortes ilustrativos do acervo digitalizado. As versões integrais podem ser acessadas na leitura completa."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc, idx) => (
            <DocumentCard key={idx} {...doc} />
          ))}
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </Section>
    </SessionLanding>
  );
}
