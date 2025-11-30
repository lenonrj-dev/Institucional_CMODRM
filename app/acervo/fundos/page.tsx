"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ContentContainer,
  Section,
  SectionTitle,
  DocumentCard,
  DepoimentoCard,
  ReferenciaCard,
  PhotoMasonryGrid,
} from "../_components/ui";

type BaseItem = { title: string; summary: string; date: string; location?: string; tags?: string[]; image?: string };
type DepItem = { author: string; role: string; excerpt: string; date: string; theme: string; avatar: string };
type RefItem = { title: string; authors: string; year: string; type: "Livro" | "Artigo" | "Tese"; source: string; citation: string };
type PhotoItem = { src: string; alt: string; caption: string; year: string; location: string; description: string };
type Fund = {
  name: string;
  slug: string;
  summary: string;
  highlights: string[];
  image: string;
  documents: BaseItem[];
  depoimentos: DepItem[];
  referencias: RefItem[];
  jornais: BaseItem[];
  fotos: PhotoItem[];
};

const funds: Fund[] = [
  {
    name: "Construcao Civil",
    slug: "const-civil",
    summary:
      "Contratos, diarios de obra, negociacoes coletivas, imagens de canteiros e relatos de seguranca no trabalho.",
    highlights: ["Contratos e atas", "Seguranca e saude", "Jornais de obra", "Fotografias de campo"],
    image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    documents: [
      { title: "Ata de obra 1965", summary: "Deliberacoes sobre estrutura de concreto.", date: "1965-08-12", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Relatorio de seguranca", summary: "Check-list de EPIs e riscos em canteiro.", date: "1970-03-04", location: "Barra Mansa", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Contrato de empreitada", summary: "Clausulas de jornada e pagamentos.", date: "1968-11-20", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Mapa de diario de obra", summary: "Registro de avancos e incidentes.", date: "1972-05-02", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    depoimentos: [
      { author: "Tecnico de seguranca", role: "Obras pesadas", excerpt: "\"Os relatorios mostravam falhas de EPI e causaram revisao imediata.\"", date: "1972", theme: "Seguranca", avatar: "/hero.png" },
      { author: "Mestre de obras", role: "Canteiro", excerpt: "\"As atas de 65 definiram novos fluxos de inspecao.\"", date: "1965", theme: "Organizacao", avatar: "/hero.png" },
    ],
    referencias: [
      { title: "Manual de seguranca em obras", authors: "Silva, R.; Nogueira, L.", year: "1975", type: "Livro", source: "Editora Obra", citation: "Silva, R.; Nogueira, L. Manual de seguranca em obras. Editora Obra, 1975." },
    ],
    jornais: [
      { title: "Boletim do canteiro", summary: "Pautas de seguranca e cronograma.", date: "1969-09-10", location: "Volta Redonda", tags: ["Seguranca"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Circular de obra", summary: "Atualizacoes semanais e comunicados.", date: "1971-02-18", location: "Barra Mansa", tags: ["Cronograma"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    fotos: [
      {
        src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        alt: "Canteiro de obras",
        caption: "Inspecao de seguranca",
        year: "1970",
        location: "Volta Redonda",
        description: "Tecnico avalia uso de EPIs e sinalizacao no local.",
      },
    ],
  },
  {
    name: "Metalurgicos",
    slug: "metalurgico",
    summary:
      "Greves, boletins, mapas de turnos, boletins internos e fotos de portaria que narram o cotidiano fabril e as lutas na CSN.",
    highlights: ["Boletins e jornais", "Escalas e turnos", "Linha de producao", "Historia oral"],
    image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    documents: [
      { title: "Boletim Operario 1952", summary: "Chamada para assembleia e negociacao.", date: "1952-03-10", location: "Volta Redonda", tags: ["Greves"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Ata de turnos", summary: "Reorganizacao de escala em linha de producao.", date: "1961-09-12", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Relatorio de condicoes", summary: "Temperatura e ruido nas linhas.", date: "1975-05-08", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Mapa de producao", summary: "Dados diarios de laminacao.", date: "1982-04-22", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    depoimentos: [
      { author: "Operador de alto-forno", role: "CSN", excerpt: "\"Os boletins eram ponte entre portaria e turnos.\"", date: "1979", theme: "Comunicacao", avatar: "/hero.png" },
      { author: "Lideranca sindical", role: "Metalurgicos", excerpt: "\"Mapas de turno revelaram sobrecarga e basearam a pauta de 82.\"", date: "1982", theme: "Pauta sindical", avatar: "/hero.png" },
    ],
    referencias: [
      { title: "Linha de producao e direitos", authors: "Barbosa, T.", year: "1984", type: "Artigo", source: "Revista Trabalho", citation: "Barbosa, T. Linha de producao e direitos. Revista Trabalho, 1984." },
    ],
    jornais: [
      { title: "Boletim da portaria", summary: "Informes de greve e seguranca.", date: "1979-04-02", location: "Volta Redonda", tags: ["Greves", "Seguranca"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Jornal do turno", summary: "Cobertura de revezamento e saude.", date: "1981-06-15", location: "Volta Redonda", tags: ["Turnos"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    fotos: [
      {
        src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        alt: "Portaria da CSN",
        caption: "Assembleia em portaria",
        year: "1979",
        location: "Volta Redonda",
        description: "Registro de assembleia em frente a portaria principal.",
      },
    ],
  },
  {
    name: "Movimentos Populares",
    slug: "mov-operario",
    summary:
      "Cartazes, panfletos, atas de assembleia comunitaria, fotografias de mobilizacao e entrevistas com liderancas.",
    highlights: ["Cartazes e panfletos", "Atas comunitarias", "Mobilizacoes urbanas", "Depoimentos"],
    image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    documents: [
      { title: "Ata comunitaria", summary: "Deliberacoes sobre transporte e moradia.", date: "1978-10-05", location: "Barra Mansa", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Cartaz de mobilizacao", summary: "Chamada para marcha urbana.", date: "1980-06-11", location: "Volta Redonda", tags: ["Cartazes"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Panfleto de bairro", summary: "Organizacao de comissoes de rua.", date: "1982-09-02", location: "Barra Mansa", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Relato de assembleia popular", summary: "Encaminhamentos de saneamento e moradia.", date: "1983-03-22", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    depoimentos: [
      { author: "Lider comunitario", role: "Mobilizacao urbana", excerpt: "\"Os cartazes ajudaram a unir bairros e sindicatos.\"", date: "1980", theme: "Organizacao popular", avatar: "/hero.png" },
      { author: "Educadora popular", role: "Base comunitaria", excerpt: "\"As atas registram quem falou e quais demandas voltaram.\"", date: "1983", theme: "Memoria coletiva", avatar: "/hero.png" },
    ],
    referencias: [
      { title: "Cidades e lutas populares", authors: "Gomes, A.", year: "1987", type: "Tese", source: "Universidade Federal", citation: "Gomes, A. Cidades e lutas populares. Universidade Federal, 1987." },
    ],
    jornais: [
      { title: "Jornal da comunidade", summary: "Pautas de transporte, moradia e saude.", date: "1981-01-14", location: "Volta Redonda", tags: ["Comunidade"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Folheto especial", summary: "Cobertura de marcha e reivindicacoes.", date: "1982-05-09", location: "Barra Mansa", tags: ["Mobilizacao"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    fotos: [
      {
        src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        alt: "Marcha urbana",
        caption: "Mobilizacao em avenida central",
        year: "1980",
        location: "Volta Redonda",
        description: "Registro fotografico de marcha com cartazes e faixas.",
      },
    ],
  },
  {
    name: "Dom Waldyr",
    slug: "dom-waldyr",
    summary:
      "Pastoral operaria, mediacao de conflitos e vigilancia em direitos humanos atraves de cartas, circulares e registros fotograficos.",
    highlights: ["Cartas pastorais", "Jornais solidarios", "Relatos de mediacao", "Acervo fotografico"],
    image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    documents: [
      { title: "Carta pastoral", summary: "Defesa de direitos e dignidade no trabalho.", date: "1978-06-12", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Relatorio de visitas", summary: "Condicoes em vilas operarias.", date: "1981-03-04", location: "Barra Mansa", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Notas de mediacao", summary: "Acordos de 1985 com sindicatos.", date: "1985-09-18", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Circular pastoral", summary: "Direitos humanos e vigilia.", date: "1983-11-22", location: "Volta Redonda", image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    depoimentos: [
      { author: "Agente pastoral", role: "Pastoral operaria", excerpt: "\"As circulares eram lidas em assembleias e portarias.\"", date: "1983", theme: "Fe e mediacao", avatar: "/hero.png" },
      { author: "Lideranca sindical", role: "Metalurgicos", excerpt: "\"Dom Waldyr mediava processos e reduzia tensoes.\"", date: "1985", theme: "Mediacao", avatar: "/hero.png" },
    ],
    referencias: [
      { title: "Pastoral e direitos", authors: "Ferreira, J.", year: "1990", type: "Livro", source: "Editora Diocesana", citation: "Ferreira, J. Pastoral e direitos. Editora Diocesana, 1990." },
    ],
    jornais: [
      { title: "Boletim solidario", summary: "Notas de apoio as greves e vigilia.", date: "1979-04-10", location: "Volta Redonda", tags: ["Solidariedade"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
      { title: "Circular de direitos", summary: "Denuncias e chamadas a vigilia.", date: "1983-11-22", location: "Barra Mansa", tags: ["Direitos humanos"], image: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg" },
    ],
    fotos: [
      {
        src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        alt: "Assembleia com Dom Waldyr",
        caption: "Mediacao em assembleia",
        year: "1983",
        location: "Volta Redonda",
        description: "Dom Waldyr acompanha trabalhadores em reuniao publica.",
      },
    ],
  },
];

function GroupShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0/10 bg-white/5/10 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.7)] backdrop-blur-sm lg:p-5">
      <div className="mb-4 border-b border-white/5 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      </div>
      {children}
    </div>
  );
}

function DocumentPreviewCard({ item, href }: { item: BaseItem; href: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition-colors hover:border-slate-100/40 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-black"
    >
      <div className="flex items-center gap-2 text-[10px] text-slate-400">
        <span className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5">Doc</span>
        <span>{item.date}</span>
        {item.location && (
          <>
            <span>•</span>
            <span>{item.location}</span>
          </>
        )}
      </div>
      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-50">{item.title}</h4>
          <p className="text-xs leading-snug text-slate-400">{item.summary}</p>
        </div>
        <span className="text-xs text-slate-300">→</span>
      </div>
      {item.tags?.length ? (
        <span className="mt-1 inline-flex items-center gap-1 self-start rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
          {item.tags[0]}
        </span>
      ) : null}
    </Link>
  );
}

function JournalCard({ item, href }: { item: BaseItem; href: string }) {
  return (
    <Link
      href={href}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow transition hover:border-white/40 hover:shadow-lg hover:shadow-black/40 sm:grid-cols-[160px,1fr] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-black"
    >
      <div className="relative h-40 w-full sm:h-full">
        <Image
          src={
            item.image ||
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg"
          }
          alt={item.title}
          fill
          sizes="(min-width:1024px) 160px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 rounded-lg border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white/80">
          Jornal de epoca
        </div>
      </div>
      <div className="space-y-1 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
          <span>{item.date}</span>
          {item.location && (
            <>
              <span>•</span>
              <span>{item.location}</span>
            </>
          )}
        </div>
        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
        <p className="text-xs text-white/70">{item.summary}</p>
        {item.tags?.length ? (
          <div className="flex flex-wrap gap-1 text-[11px] text-white/65">
            {item.tags.map((t) => (
              <span key={t} className="rounded-full border border-amber-300/40 bg-amber-300/5 px-2 py-0.5 text-amber-100">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function DepoimentoPreviewCard({ item, href }: { item: DepItem; href: string }) {
  const initials = item.author
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 transition hover:border-amber-300/50 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-black"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 text-sm font-semibold text-amber-200">
          {initials}
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-50">{item.author}</p>
          <p className="text-[11px] text-slate-400">{item.role} • {item.date}</p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">“{item.excerpt.replace(/(^\"|\"$)/g, "")}”</p>
      <div className="mt-2 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
        {item.theme}
      </div>
      <div className="mt-1 text-[11px] font-medium text-slate-200 underline-offset-4 transition hover:text-amber-300 group-hover:underline">
        Ler depoimento completo →
      </div>
    </Link>
  );
}

function ReferencePreviewCard({ item }: { item: RefItem }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-4 transition hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-500/15">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{item.type}</span>
        <span>{item.year}</span>
      </div>
      <h4 className="mt-1 text-sm font-semibold text-slate-50">{item.title}</h4>
      <p className="text-xs text-slate-400">{item.authors}</p>
      <div className="text-[11px] text-amber-200 transition hover:text-amber-100">
        Clique para ver ficha completa / colecao
      </div>
    </div>
  );
}

function PhotoPreviewCard({ photo }: { photo: PhotoItem }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow transition hover:border-slate-100/40 hover:shadow-xl hover:shadow-slate-950/60">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width:1024px) 400px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="space-y-1 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
          <span>{photo.year}</span>
          <span>•</span>
          <span>{photo.location}</span>
        </div>
        <h4 className="text-sm font-semibold text-slate-50">{photo.caption}</h4>
        <p className="text-xs text-slate-400">{photo.description}</p>
        <span className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-amber-100">
          Acervo fotografico
        </span>
      </div>
    </div>
  );
}

function FundosPageInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase().trim() || "";
  const filtered = q
    ? funds.filter((f) => {
        const hay = `${f.name} ${f.summary} ${f.highlights.join(" ")}`.toLowerCase();
        return hay.includes(q);
      })
    : funds;

  return (
    <div className="bg-gradient-to-b from-[#0b0c10] via-[#0b0c10] to-[#090909] text-white">
      <Section className="pt-6 pb-10">
        <ContentContainer>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.26em] text-white/60">Acervo - Fundos</div>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">Fundos tematicos do acervo</h1>
            <p className="mt-3 max-w-4xl text-base text-white/75 sm:text-lg">
              Cada fundo organiza documentos, depoimentos, referencias e acervos visuais de um eixo especifico. Explore os conjuntos para visualizar amostras e acessar as paginas completas de leitura.
            </p>
          </div>
        </ContentContainer>
      </Section>

      <Section className="pt-0 pb-4">
        <ContentContainer>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <SectionTitle
                eyebrow="Navegue pelos fundos"
                title="Previas e direcionamentos"
                description="Escolha um fundo para abrir a pagina detalhada com hero, secoes de documentos, depoimentos, referencias, jornais de epoca e acervo fotografico."
              />
            </div>
            <form className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5" method="get">
              <label htmlFor="q" className="text-sm font-semibold text-white">
                Buscar nos fundos
              </label>
              <p className="text-xs text-white/60">
                Pesquise por nome do fundo ou palavras-chave dos destaques. O filtro atua sobre as previas exibidas abaixo.
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Ex.: greves, pastoral, contratos..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  aria-label="Buscar fundos"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </ContentContainer>
      </Section>

      <Section className="pt-0 pb-16">
        <ContentContainer>
          <div className="space-y-10">
            {filtered.map((fund) => (
              <div key={fund.slug} className="rounded-3xl border border-white/10 bg-black/60 p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px,1fr]">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <div className="relative h-44 w-full">
                      <Image
                        src={fund.image}
                        alt={fund.name}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white/80">
                        Fundos - {fund.name}
                      </div>
                    </div>
                    <div className="space-y-3 p-4">
                      <h3 className="text-lg font-semibold text-white">{fund.name}</h3>
                      <p className="text-sm text-white/70">{fund.summary}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-white/65">
                        {fund.highlights.map((h) => (
                          <span key={h} className="rounded-lg border border-white/10 bg-black/30 px-2 py-1">
                            {h}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/acervo/fundos/${fund.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/90"
                      >
                        Acessar fundo →
                      </Link>
                    </div>
                  </div>

                  <div className="max-w-6xl space-y-8 lg:space-y-10">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-50 lg:text-3xl">
                        Documentos, jornais e depoimentos
                      </h2>
                      <p className="mt-2 max-w-3xl text-sm text-slate-400 lg:text-base">
                        Previa dos materiais principais do fundo. Acesse para abrir a pagina completa com hero, secoes e leitura detalhada.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <GroupShell title="Documentos">
                        <div className="grid grid-cols-1 gap-3">
                          {fund.documents.map((doc) => (
                            <DocumentPreviewCard key={`${fund.slug}-doc-${doc.title}`} item={doc} href={`/acervo/fundos/${fund.slug}`} />
                          ))}
                        </div>
                      </GroupShell>
                      <GroupShell title="Jornais de epoca">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {fund.jornais.map((j) => (
                            <JournalCard key={`${fund.slug}-jor-${j.title}`} item={j} href={`/acervo/fundos/${fund.slug}`} />
                          ))}
                        </div>
                      </GroupShell>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <GroupShell title="Depoimentos">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                          {fund.depoimentos.map((d) => (
                            <DepoimentoPreviewCard key={`${fund.slug}-dep-${d.author}`} item={d} href={`/acervo/fundos/${fund.slug}`} />
                          ))}
                        </div>
                      </GroupShell>
                      <GroupShell title="Referencia">
                        <div className="grid grid-cols-1 gap-3">
                          {fund.referencias.map((r) => (
                            <ReferencePreviewCard key={`${fund.slug}-ref-${r.title}`} item={r} />
                          ))}
                        </div>
                      </GroupShell>
                    </div>
                    <GroupShell title="Acervo fotografico">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {fund.fotos.map((p) => (
                          <PhotoPreviewCard key={`${fund.slug}-photo-${p.caption}`} photo={p} />
                        ))}
                      </div>
                    </GroupShell>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </Section>
    </div>
  );
}

export default function FundosPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-white/70">Carregando fundos...</div>}>
      <FundosPageInner />
    </Suspense>
  );
}
