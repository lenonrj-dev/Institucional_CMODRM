// app/acervo-pessoal/rubem-machado/page.js
// Página do Acervo Pessoal — Rubem Machado (Server Component)
// - Sem "use client" para permitir export de metadata e SEO completo
// - Apenas imports relativos ao App Router e libs do projeto
// - Design dark (Tailwind v4), tipografia clara e componentes reutilizáveis inline

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, FileText, Images, Mic, BookOpen, Newspaper, Download, Quote, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Acervo Pessoal — Rubem Machado | Banco de Memória",
  description:
    "Acervo pessoal de Rubem Machado: biografia, fotografias, documentos, entrevistas e referências com leitura confortável.",
  alternates: { canonical: "/acervo-pessoal/rubem-machado" },
  openGraph: {
    title: "Acervo Pessoal — Rubem Machado",
    description:
      "Biografia, linha do tempo, seleção de fotos, documentos digitalizados e história oral.",
    url: "/acervo-pessoal/rubem-machado",
    images: [
      {
        url: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
      },
    ],
  },
};

// =============================
// Dados (mock inicial — troque pela sua fonte quando quiser)
// =============================
const person = {
  name: "Rubem Machado",
  roles: ["Liderança sindical", "Editor de boletins", "Organizador de base"],
  period: "1940–1970",
  location: "Volta Redonda — RJ",
  portrait: "https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg", // capa já habilitada no projeto
  cover:
    "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
  summary:
    "Figura central nas mobilizações operárias, articulou boletins, assembleias e redes de solidariedade entre categorias. Seu acervo reúne fotografias de cotidiano fabril, documentos deliberativos e depoimentos gravados.",
  stats: [
    { label: "Período", value: "1940–1970" },
    { label: "Local", value: "Volta Redonda — RJ" },
    { label: "Séries", value: "Fotos, Documentos, Entrevistas, Boletins" },
  ],
};

const gallery = [
  {
    src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    alt: "Funcionários da Siderúrgica — década de 1950",
  },
  {
    src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    alt: "Repressão a manifestação popular em Volta Redonda",
  },
  {
    src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_2_uls3kf.png",
    alt: "Cortejo e multidão — década de 1950",
  },
  {
    src: "https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg",
    alt: "Jornal de época — O Operário",
  },
];

const documents = [
  {
    title: "Ata de Assembleia — Setembro de 1961",
    href: "/acervo/documentos/ata-1961-09",
    meta: "Documento • 18/09/1961",
  },
  {
    title: "Boletim Operário — Março de 1952",
    href: "/acervo/boletins/1952-03",
    meta: "Jornal • 10/03/1952",
  },
  {
    title: "Boletim Operário — Julho de 1953",
    href: "/acervo/boletins/1953-07",
    meta: "Jornal • 05/07/1953",
  },
];

const interviews = [
  {
    title: "Entrevista com M. Santos — 1983",
    href: "/acervo/entrevistas/m-santos-1983",
    meta: "Áudio + Transcrição",
  },
];

const timeline = [
  { year: "1946", text: "Início de atuação em comissões de fábrica e formação política local." },
  { year: "1952", text: "Coordena produção do Boletim Operário e rede de distribuição." },
  { year: "1959", text: "Amplia mobilização intersindical e participa de frentes de solidariedade." },
  { year: "1961", text: "Registra assembleia decisiva com indicativo de greve (ata preservada)." },
  { year: "1964", text: "Perseguições e dispersão de lideranças; preservação clandestina de materiais." },
];

// =============================
// UI Helpers (componentes inline)
// =============================
function SectionTitle({ icon: Icon, children, className = "" }) {
  return (
    <h2 className={`mb-3 inline-flex items-center gap-2 text-lg font-semibold text-white sm:text-xl ${className}`}>
      {Icon && <Icon className="h-5 w-5" />} {children}
    </h2>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 text-base font-medium text-white">{value}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Acervo Pessoal — ${person.name}`,
    description: metadata.description,
    hasPart: [
      { "@type": "Collection", name: "Fotografias" },
      { "@type": "Collection", name: "Documentos" },
      { "@type": "Collection", name: "Entrevistas" },
      { "@type": "Collection", name: "Boletins" },
    ],
    about: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.roles.join(", "),
      address: person.location,
    },
  };

  return (
    <main className="relative w-full py-10 sm:py-14 lg:py-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="absolute inset-0">
            <Image
              src={person.cover}
              alt="Capa do acervo pessoal"
              fill
              sizes="(min-width:1024px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 items-end gap-6 p-5 sm:p-6 lg:grid-cols-12 lg:p-8">
            <div className="lg:col-span-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={person.portrait}
                  alt={`Retrato de ${person.name}`}
                  fill
                  sizes="(min-width:1024px) 320px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                Acervo Pessoal
              </div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {person.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {person.roles.map((r) => (
                  <Pill key={r}>{r}</Pill>
                ))}
              </div>

              <p className="mt-4 max-w-3xl text-white/80">{person.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-xl">
                {person.stats.map((s) => (
                  <Stat key={s.label} label={s.label} value={s.value} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/acervo/fotos"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  <Images className="h-4 w-4" /> Ver fotografias
                </Link>
                <Link
                  href="/acervo"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" /> Explorar acervo completo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* GRID PRINCIPAL */}
        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Coluna principal */}
          <div className="lg:col-span-8">
            {/* Linha do tempo */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Calendar}>Linha do tempo</SectionTitle>
              <ol className="relative ml-3 mt-3 border-l border-white/10">
                {timeline.map((t, i) => (
                  <li key={i} className="mb-4 ml-4">
                    <div className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full border border-white/20 bg-white/40" />
                    <div className="text-sm font-medium text-white">{t.year}</div>
                    <p className="text-sm text-white/70">{t.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Galeria */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Images}>Seleção de fotografias</SectionTitle>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((g, i) => (
                  <figure key={i} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <figcaption className="px-3 py-2 text-xs text-white/60">{g.alt}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/acervo/fotos" className="text-sm text-white/80 hover:underline">
                  Ver todas as fotos
                </Link>
              </div>
            </div>

            {/* Documentos */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={FileText}>Documentos digitalizados</SectionTitle>
              <ul className="mt-2 divide-y divide-white/10">
                {documents.map((d) => (
                  <li key={d.href} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <Link href={d.href} className="font-medium text-white hover:underline">
                        {d.title}
                      </Link>
                      <div className="text-xs text-white/60">{d.meta}</div>
                    </div>
                    <Link
                      href={d.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                    >
                      Abrir <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entrevistas */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Mic}>História oral</SectionTitle>
              <ul className="mt-2 divide-y divide-white/10">
                {interviews.map((it) => (
                  <li key={it.href} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <Link href={it.href} className="font-medium text-white hover:underline">
                        {it.title}
                      </Link>
                      <div className="text-xs text-white/60">{it.meta}</div>
                    </div>
                    <Link
                      href={it.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                    >
                      Ouvir <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={BookOpen}>Sobre o acervo</SectionTitle>
              <p className="text-sm leading-relaxed text-white/80">
                O acervo pessoal reúne séries fotográficas, jornais de época com anotações, atas e registros de assembleias, além de depoimentos gravados com participantes das mobilizações. A seleção abaixo destaca pontos de entrada.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/jornais-de-epoca"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60"
                >
                  <Newspaper className="h-4 w-4" /> Jornais
                </Link>
                <Link
                  href="/producao-bibliografica"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60"
                >
                  <BookOpen className="h-4 w-4" /> Bibliografia
                </Link>
              </div>
            </div>

            {/* Citação */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                <Quote className="h-4 w-4" /> Depoimento
              </div>
              <blockquote className="text-white/90">
                <p className="text-sm italic">
                  “Organizar é construir memória viva. Cada jornal passado de mão em mão também guardava nossas histórias.”
                </p>
                <footer className="mt-2 text-xs text-white/60">— atribuído a contemporâneos</footer>
              </blockquote>
            </div>

            {/* Downloads/kit */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Download}>Downloads</SectionTitle>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white hover:bg-black/60"
                  >
                    Guia do acervo (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white hover:bg-black/60"
                  >
                    Press kit (ZIP)
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {/* Rodapé de navegação */}
        <nav className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/acervo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
          >
            Voltar ao Acervo
          </Link>
          <div className="text-xs text-white/50">
            Para solicitações de uso e reprodução, consulte <Link href="/acesso-a-informacao" className="underline">Acesso à Informação</Link>.
          </div>
        </nav>
      </div>
    </main>
  );
}
