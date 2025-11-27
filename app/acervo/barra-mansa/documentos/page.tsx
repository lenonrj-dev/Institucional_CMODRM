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

const city = getCity("barra-mansa");
const section = city && getSection(city, "documentos");

export const metadata = {
  title: "Documentos | Acervo Barra Mansa",
  description: "Oficios, atas e registros do acervo de Barra Mansa.",
  keywords: [
    "Barra Mansa",
    "documentos",
    "atas",
    "oficios",
    "relatorios",
    "acervo historico",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa/documentos" },
  openGraph: {
    title: "Documentos | Acervo Barra Mansa",
    description: "Oficios, atas e registros do acervo de Barra Mansa.",
    url: "/acervo/barra-mansa/documentos",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentos | Acervo Barra Mansa",
    description: "Oficios, atas e registros do acervo de Barra Mansa.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const timeline = [
    { year: "1937", title: "Ata comunitária", description: "Registro de assembleia local para organização sindical." },
    { year: "1950", title: "Ata de assembleia – 1950", description: "Chamada à organização e calendário de reuniões." },
    { year: "1958", title: "Ofício ao Ministério do Trabalho", description: "Pedido de mediação em dissídio coletivo." },
    { year: "1968", title: "Relatório de prestação de contas", description: "Síntese de gastos, receitas e projetos sociais." },
  ];

  const docs = section.items.map((it) => ({
    title: it.title,
    summary: it.summary,
    date: it.date,
    location: city.name,
    tags: ["Documento", "Barra Mansa"],
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
          title="Preservação, descrição e memória local"
          description="O acervo documental de Barra Mansa reúne atas, ofícios e relatórios que evidenciam redes de apoio, mobilizações de bairro e negociações coletivas. Cada peça recebe tratamento archivístico e metadados para busca refinada."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Linha do tempo documental</p>
            <p className="text-sm text-white/70">
              Marco temporal ilustrativo: documentos que estruturam a atuação do sindicato e sua relação com o território.
            </p>
            <div className="mt-4">
              <DocumentTimeline items={timeline} />
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Pesquisa e filtros</p>
            <SearchBar placeholder="Buscar por título, data ou palavra-chave..." ariaLabel="Buscar documentos" />
            <FilterSidebar
              filters={{ label: "Categorias", options: ["Atas", "Relatórios", "Ofícios", "Correspondência"] }}
              title="Categorias"
            />
            <FilterSidebar
              filters={{ label: "Décadas", options: ["1930s", "1940s", "1950s", "1960s"] }}
              title="Período"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Pré-visualizações"
          title="Documentos em destaque"
          description="Amostras fictícias do acervo digitalizado. A leitura integral será acessível nas rotas dedicadas."
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
