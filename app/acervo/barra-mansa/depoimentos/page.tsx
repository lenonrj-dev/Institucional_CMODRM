import SessionLanding from "../../_components/SessionLanding";
import { getCity, getSection } from "../../cityData";
import {
  Section,
  SectionTitle,
  DepoimentoCard,
  FilterSidebar,
  SearchBar,
  Pagination,
} from "../../_components/ui";

const city = getCity("barra-mansa");
const section = city && getSection(city, "depoimentos");

export const metadata = {
  title: "Depoimentos | Acervo Barra Mansa",
  description: "Historia oral e relatos de trabalhadores de Barra Mansa.",
  keywords: [
    "Barra Mansa",
    "depoimentos",
    "historia oral",
    "memoria social",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/barra-mansa/depoimentos" },
  openGraph: {
    title: "Depoimentos | Acervo Barra Mansa",
    description: "Historia oral e relatos de trabalhadores de Barra Mansa.",
    url: "/acervo/barra-mansa/depoimentos",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Depoimentos | Acervo Barra Mansa",
    description: "Historia oral e relatos de trabalhadores de Barra Mansa.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const depoimentos = section.items.map((it) => ({
    author: it.title,
    role: "Trabalhador/a",
    excerpt: it.summary,
    date: it.date,
    theme: "Território e redes sociais",
    avatar: "/hero.png",
  }));

  return (
    <SessionLanding
      city={city}
      section={section}
      breadcrumb={[
        { label: "Acervo", href: "/acervo" },
        { label: city.name, href: `/acervo/${city.slug}` },
        { label: "Depoimentos" },
      ]}
    >
      <Section className="pt-0">
        <SectionTitle
          eyebrow="História oral"
          title="Metodologia e memória social"
          description="Os relatos de Barra Mansa documentam a tessitura social dos bairros, as assembleias em espaços comunitários e as redes de apoio que sustentaram o movimento. Cada depoimento recebe ficha técnica, contexto e encaminhamento ético."
        />
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Filtros temáticos</p>
            <FilterSidebar
              filters={{ label: "Temas", options: ["Indústria", "Urbanização", "Movimentos sociais", "Cultura", "Educação"] }}
              title="Temas"
            />
            <FilterSidebar
              filters={{ label: "Décadas", options: ["1930s", "1940s", "1950s", "1960s", "1970s"] }}
              title="Períodos"
            />
          </div>
          <div className="space-y-4">
            <SearchBar placeholder="Buscar por pessoa, tema ou palavra-chave..." ariaLabel="Buscar depoimentos" />
            <p className="text-sm text-white/70">
              Seleção fictícia de trechos que ressaltam a dimensão humana, os desafios urbanos e a formação de redes solidárias no território.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Relatos"
          title="Depoimentos em destaque"
          description="Trechos editados com enfoque em contexto humano e social. A consulta integral trará áudio e transcrição."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, idx) => (
            <DepoimentoCard key={idx} {...d} />
          ))}
        </div>
        <div className="mt-6">
          <Pagination />
        </div>
      </Section>
    </SessionLanding>
  );
}
