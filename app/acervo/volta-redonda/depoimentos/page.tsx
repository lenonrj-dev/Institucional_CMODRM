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

const city = getCity("volta-redonda");
const section = city && getSection(city, "depoimentos");

export const metadata = {
  title: "Depoimentos | Acervo Volta Redonda",
  description: "Historia oral com liderancas e chao de fabrica de Volta Redonda.",
  keywords: [
    "Volta Redonda",
    "depoimentos",
    "historia oral",
    "memoria operaria",
    "acervo",
    "centro de memoria",
  ],
  alternates: { canonical: "/acervo/volta-redonda/depoimentos" },
  openGraph: {
    title: "Depoimentos | Acervo Volta Redonda",
    description: "Historia oral com liderancas e chao de fabrica de Volta Redonda.",
    url: "/acervo/volta-redonda/depoimentos",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Depoimentos | Acervo Volta Redonda",
    description: "Historia oral com liderancas e chao de fabrica de Volta Redonda.",
  },
};

export default function Page() {
  if (!city || !section) return null;
  const depoimentos = section.items.map((it) => ({
    author: it.title,
    role: "Trabalhador/a",
    excerpt: it.summary,
    date: it.date,
    theme: "Movimento sindical",
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
          title="Metodologia, ética e contexto humano"
          description="Coletamos depoimentos com metodologia de história oral, garantindo consentimento, contexto e preservação. Cada entrevista traz metadados, transcrição e, quando autorizado, áudio para consulta e pesquisa acadêmica."
        />
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Filtros temáticos</p>
            <FilterSidebar
              filters={{ label: "Temas", options: ["Indústria", "Urbanização", "Movimentos sociais", "Educação", "Cultura operária"] }}
              title="Temas"
            />
            <FilterSidebar
              filters={{ label: "Décadas", options: ["1950s", "1960s", "1970s", "1980s"] }}
              title="Períodos"
            />
          </div>
          <div className="space-y-4">
            <SearchBar placeholder="Buscar por pessoa, tema ou palavra-chave..." ariaLabel="Buscar depoimentos" />
            <p className="text-sm text-white/70">
              Destaques de relatos que contextualizam greves, estratégias de organização, cultura de fábrica e redes de solidariedade.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Relatos"
          title="Depoimentos em destaque"
          description="Trechos editados com foco no contexto humano e social. A leitura completa traz áudio, transcrição e ficha técnica."
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
