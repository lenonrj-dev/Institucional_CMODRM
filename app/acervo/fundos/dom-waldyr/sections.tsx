import Image from "next/image";
import Link from "next/link";
import {
  ContentContainer,
  DepoimentoCard,
  DocumentCard,
  HeroBanner,
  PhotoMasonryGrid,
  ReferenciaCard,
  Section,
  SectionTitle,
} from "../../_components/ui";
import type { DepoimentoItem, DocumentItem, FotoItem, JournalItem, ReferenciaItem } from "./data";
import { heroImage } from "./data";

type HeroProps = {
  image: string;
};

export function DomWaldyrHero({ image }: HeroProps) {
  return (
    <Section className="bg-black pt-4 pb-12">
      <ContentContainer>
        <HeroBanner
          eyebrow="Fundos"
          badge="Dom Waldyr"
          title="ACERVO DOM WALDYR CALHEIROS DE NOVAES AÇÃO PASTORAL/DITADURA CIVIL-MILITAR/MOVIMENTO OPERÁRI"
          description="Documentação, cronologia histórica, depoimentos e publicações que registram a presença pastoral e social de Dom Waldyr Calheiros de Novaes junto aos trabalhadores de Volta Redonda-RJ, Barra Mansa-RJ e da Diocese de Barra do Piraí-RJ/Volta Redonda-RJ."
          image={image}
          actions={
            <>
              <Link
                href="/acervo/fundos/dom-waldyr/historias/introducao"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
              >
                Breve Biográfia
              </Link>
              
            </>
          }
        />
      </ContentContainer>
    </Section>
  );
}

export function DomWaldyrIntro() {
  return (
    <ContentContainer>
      <div className="mx-auto max-w-4xl space-y-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 shadow-xl sm:px-8 sm:py-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="https://res.cloudinary.com/dc7u5spia/image/upload/v1765292802/DOCUMENTA%C3%87%C3%83O_HIST%C3%93RICA_g0pzkc.png"
              alt="Dom Waldyr Calheiros de Novaes em atividade pastoral"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">Dom Waldyr Calheiros de Novaes</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">DOCUMENTAÇÃO HISTÓRICA</h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          Antes de abrir as séries completas, veja um recorte das cartas, relatórios, circulares e publicações que demonstram a
          presença de Dom Waldyr nas negociações, visitas às vilas operárias e no apoio direto aos trabalhadores da região.
        </p>
        <Link
          href="/acervo/fundos/dom-waldyr/historias/introducao"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Ver documentos
        </Link>
        <Link
          href="/acervo/fundos/dom-waldyr/historias/introducao"
          className="inline-flex items-center ml-5 gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Ver história completa
        </Link>
      </div>
    </ContentContainer>
  );
}

export function DomWaldyrDocuments({ documents }: { documents: DocumentItem[] }) {
  return (
    <Section id="documentos" className="bg-black">
      <SectionTitle
        eyebrow="Documentos"
        title="Cartas, relatórios e notas pastorais"
        description="Seleção de peças que mostram a atuação direta de Dom Waldyr em mediação de conflitos, escuta comunitária e defesa de direitos."
        actions={
          <Link
            href="/acervo/documentos"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Abrir todos
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <DocumentCard key={doc.title} {...doc} href="/acervo/documentos" />
        ))}
      </div>
      <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm">
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg"
              alt="Registros históricos e arquivos de memória"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Contexto ampliado</p>
        <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">Os Prisioneiros Políticos</h3>
        <p className="mt-2 text-sm text-white/70 sm:text-base">
          Além das peças pastorais, o acervo reúne notas de campo e registros de articulação com sindicatos, movimentos populares e
          comunidades paroquiais, evidenciando como a documentação foi usada para fortalecer redes de solidariedade e defesa de
          direitos.
        </p>
        <Link
          href="/acervo/fundos/dom-waldyr/historias/prisioneiros"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Ver história completa
        </Link>
      </div>
    </Section>
  );
}

export function DomWaldyrDepoimentos({ depoimentos }: { depoimentos: DepoimentoItem[] }) {
  return (
    <Section id="depoimentos" className="bg-black">
      <SectionTitle
        eyebrow="História oral"
        title="Depoimentos e memórias pastorais"
        description="Relatos de agentes, padres e lideranças que conviveram com Dom Waldyr nas portarias, assembleias e círculos de leitura."
        actions={
          <Link
            href="/acervo/entrevistas"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Ver entrevistas
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {depoimentos.map((d) => (
          <DepoimentoCard key={d.author} {...d} href="/acervo/entrevistas" />
        ))}
      </div>
      <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm">
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="https://res.cloudinary.com/dc7u5spia/image/upload/v1764469350/Pres%C3%A9pio_Igreja_Santa_Cec%C3%ADlia_-_dezembro_de_1968_nwjnrn.jpg"
              alt="Mediação e diálogo comunitário"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Contexto ampliado</p>
        <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">Conflito com o Coronel Armênio do 1º B.I.B</h3>
        <p className="mt-2 text-sm text-white/70 sm:text-base">
          Além das peças pastorais, o acervo reúne notas de campo e registros de articulação com sindicatos, movimentos populares e
          comunidades paroquiais, evidenciando como a documentação foi usada para fortalecer redes de solidariedade e defesa de
          direitos.
        </p>
        <Link
          href="/acervo/fundos/dom-waldyr/historias/conflito"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Ver história completa
        </Link>
      </div>
    </Section>
  );
}

export function DomWaldyrReferencias({ referencias }: { referencias: ReferenciaItem[] }) {
  return (
    <Section id="referencias" className="bg-black">
      <SectionTitle
        eyebrow="Referência bibliográfica"
        title="Obras sobre a atuação de Dom Waldyr"
        description="Bibliografia comentada para aprofundar estudos sobre mediação social, pastoral operária e documentação do período."
        actions={
          <Link
            href="/acervo/referencia-bibliografica"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Acessar referências
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {referencias.map((ref) => (
          <ReferenciaCard key={ref.title} {...ref} />
        ))}
      </div>
    </Section>
  );
}

export function DomWaldyrJornais({ jornais }: { jornais: JournalItem[] }) {
  return (
    <Section id="jornais" className="bg-black">
      <SectionTitle
        eyebrow="Jornais de época"
        title="Publicações solidárias e circulares pastorais"
        description="Edições que registram posicionamentos públicos, apoio aos trabalhadores e alertas de direitos humanos durante os conflitos."
        actions={
          <Link
            href="/acervo/boletins"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Ler boletins
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {jornais.map((j) => (
          <DocumentCard key={j.title} {...j} href="/acervo/boletins" />
        ))}
      </div>
    </Section>
  );
}

export function DomWaldyrFotos({ fotos }: { fotos: FotoItem[] }) {
  return (
    <Section id="acervo-fotografico" className="bg-black">
      <SectionTitle
        eyebrow="Acervo fotográfico"
        title="Imagens da presença pastoral"
        description="Pré-visualização de fotografias com metadados básicos para orientar a consulta completa."
        actions={
          <Link
            href="/acervo/fotos"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Ver acervo fotográfico
          </Link>
        }
      />
      <PhotoMasonryGrid photos={fotos} />
    </Section>
  );
}

export function DomWaldyrHistorias() {
  return (
    <Section id="historias" className="bg-black">
      <SectionTitle
        eyebrow="Histórias completas"
        title="Abertura de documentos e narrativas"
        description="Relatos integrais com metadados, datas e locais para contextualizar cada frente de atuação de Dom Waldyr e dos agentes pastorais."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article
          id="historia-introducao"
          className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70">
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Tipo: Relato pastoral</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Ano: 1977-1980</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Local: Volta Redonda / Barra Mansa</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Cadernos de campo e escutas iniciais</h3>
          <p className="text-sm text-white/70">
            Relato extenso sobre as primeiras visitas às vilas operárias, descrevendo condições de moradia, saúde e a formação dos
            grupos de base. Inclui notas de reuniões paroquiais, mapas de rotas e descrições de encontros com lideranças sindicais.
          </p>
          <p className="text-sm text-white/70">
            Destaque para o método de registro: escrita coletiva, revisão semanal e envio de sínteses à Diocese para tomada de
            decisão pastoral e mediação de conflitos.
          </p>
        </article>

        <article
          id="historia-prisioneiros"
          className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70">
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Tipo: Dossiê</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Ano: 1982-1985</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Local: Volta Redonda</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Os prisioneiros políticos</h3>
          <p className="text-sm text-white/70">
            Dossiê com cartas de familiares, transcrições de visitas a presídios, recortes de jornais e notas de mediação com
            autoridades. Cada entrada traz data, responsável pela coleta e encaminhamento feito pela Pastoral Operária.
          </p>
          <p className="text-sm text-white/70">
            O documento evidencia a articulação entre Diocese, sindicatos e redes de apoio, indicando os passos para assistência
            jurídica, campanhas de solidariedade e preservação da memória dos casos.
          </p>
        </article>

        <article
          id="historia-conflito"
          className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70">
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Tipo: Relatório confidencial</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Ano: 1984</span>
            <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5">Local: Barra Mansa</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Conflito com o Coronel Armênio do 1º B.I.B</h3>
          <p className="text-sm text-white/70">
            Relatório narrativo sobre a tensão entre agentes pastorais e o comando local, descrevendo negociações, cartas trocadas e
            protocolos de segurança para proteger lideranças ameaçadas. Inclui cronologia detalhada e testemunhos diretos.
          </p>
          <p className="text-sm text-white/70">
            O conteúdo orienta pesquisadores sobre fontes complementares: depoimentos gravados, documentos oficiais anexos e
            referências cruzadas com jornais de época.
          </p>
        </article>
      </div>
    </Section>
  );
}

export function DomWaldyrCTA() {
  return (
    <Section className="bg-black pt-4 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
        <h3 className="text-2xl font-semibold text-white sm:text-3xl">Explore o fundo Dom Waldyr com profundidade</h3>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          Navegue pelos documentos, relatos, referências e publicações para compreender a trajetória pastoral e seu diálogo com os
          trabalhadores da região.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/acervo/documentos"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Documentos
          </Link>
          <Link
            href="/acervo/entrevistas"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Depoimentos
          </Link>
          <Link
            href="/acervo/referencia-bibliografica"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Referências
          </Link>
          <Link
            href="/acervo/boletins"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Jornais de época
          </Link>
          <Link
            href="/acervo/fotos"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Acervo fotográfico
          </Link>
        </div>
      </div>
    </Section>
  );
}
