"use client";

import Link from "next/link";
import {
  HeroBanner,
  Section,
  SectionTitle,
  DocumentCard,
  DepoimentoCard,
  ReferenciaCard,
  PhotoMasonryGrid,
} from "./ui";
import { ArrowRight } from "lucide-react";
import CitySectionGrid from "./CitySectionGrid";
import { CityData } from "../cityData";

type Props = { city: CityData };

const photosFallback = [
  {
    src: "/hero.png",
    alt: "Registro histórico",
    year: "1948",
    location: "Zona industrial",
    description: "Rotina de trabalhadores em área fabril.",
    tags: ["Fotografia", "Cotidiano"],
  },
  {
    src: "/CUT.png",
    alt: "Assembleia",
    year: "1950",
    location: "Praça central",
    description: "Assembleia aberta organizada pelo sindicato.",
    tags: ["Assembleia", "Mobilização"],
  },
  {
    src: "/window.svg",
    alt: "Jornal histórico",
    year: "1953",
    location: "Imprensa sindical",
    description: "Capas e chamadas de edições de época.",
    tags: ["Jornais", "Histórico"],
  },
];

export default function CityLanding({ city }: Props) {
  const mission =
    city.slug === "volta-redonda"
      ? "Um acervo dedicado à memória do trabalho na Cidade do Aço, registrando greves, organização por seção e a construção de direitos em diálogo com a comunidade."
      : "Coleção que acompanha a formação do tecido social de Barra Mansa, registrando redes de apoio, assembleias, cultura sindical e vida cotidiana do Vale do Paraíba.";

  const docCards = city.sections.find((s) => s.key === "documentos")?.items.slice(0, 3) || [];
  const depoCards = city.sections.find((s) => s.key === "depoimentos")?.items.slice(0, 3) || [];
  const refCards = city.sections.find((s) => s.key === "referencia-bibliografica")?.items.slice(0, 3) || [];
  const photoCards = photosFallback;

  return (
    <>
      <Section className="pt-6">
        <HeroBanner
          eyebrow="Acervo"
          title={`Acervo de ${city.name}`}
          description={`${city.description} ${mission}`}
          image={city.image}
          badge="Centro de Memória"
          actions={
            <>
              <Link
                href="#sessoes"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                Explorar sessões <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/acervo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Visão geral do Acervo
              </Link>
            </>
          }
        />
      </Section>

      <Section id="sessoes">
        <SectionTitle
          eyebrow="Navegação"
          title="Sessões principais"
          description="Documentos, depoimentos, referências bibliográficas, jornais de época e acervo fotográfico prontos para consulta pública."
        />
        <CitySectionGrid sections={city.sections} />
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Documentos"
          title="Documentos históricos e administrativos"
          description="Atas, ofícios, relatórios e cadernos de campo que revelam processos decisórios, negociações coletivas e os bastidores da organização sindical."
          actions={
            <Link
              href={`/acervo/${city.slug}/documentos`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Acessar documentos <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {docCards.map((c, idx) => (
            <DocumentCard
              key={idx}
              title={c.title}
              summary={c.summary}
              date={c.date}
              location={city.name}
              tags={["Documento", city.name]}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="História oral"
          title="Depoimentos e memória viva"
          description="Metodologia de história oral aplicada a lideranças, base sindical e comunidade. Áudios, transcrições e registros contextuais."
          actions={
            <Link
              href={`/acervo/${city.slug}/depoimentos`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Ver depoimentos <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {depoCards.map((d, idx) => (
            <DepoimentoCard
              key={idx}
              author={d.title}
              role="História oral"
              excerpt={d.summary}
              date={d.date}
              theme="Memória sindical"
              avatar="/hero.png"
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Referência bibliográfica"
          title="Obras e referências para pesquisa"
          description="Catálogo fictício de livros, artigos e teses que fundamentam a leitura do território, do trabalho e das redes sociais da cidade."
          actions={
            <Link
              href={`/acervo/${city.slug}/referencia-bibliografica`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Ver referências <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {refCards.map((r, idx) => (
            <ReferenciaCard
              key={idx}
              title={r.title}
              authors="Equipe de Pesquisa do Centro de Memória"
              year={r.date.slice(0, 4)}
              type="Livro"
              source="Editora do Sindicato"
              citation={`${r.title}. Centro de Memória ${city.name}, ${r.date.slice(0, 4)}.`}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Acervo fotográfico"
          title="Imagens e metadados"
          description="Ensaios visuais sobre mobilizações, cotidiano fabril e cenas comunitárias. Metadados acessíveis para pesquisa e reprodução autorizada."
          actions={
            <Link
              href={`/acervo/${city.slug}/acervo-fotografico`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Ver acervo fotográfico <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <PhotoMasonryGrid photos={photoCards} />
      </Section>
    </>
  );
}
