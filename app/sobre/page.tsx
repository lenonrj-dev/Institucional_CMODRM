import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "../../lib/content-types";
import { getSiteContent } from "../../lib/get-site-content";

/* =====================================================
   SEO
   ===================================================== */
export const metadata = {
  title: "Sobre o Projeto — Centro de Memória | Sintracon",
  description:
    "Histórico, metodologia e orientações de acesso do Centro de Memória Operária Digitalizada Rubem Machado, com foco em Volta Redonda, Barra Mansa, Resende e cidades vizinhas.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre o Projeto — Centro de Memória | Sintracon",
    description:
      "Histórico, metodologia e orientações de acesso para pesquisadores, educadores e público em geral.",
    url: "/sobre",
    images: [
      {
        url:
          "https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763052010/1_de_janeiro_de_1959_2_jkdm71.png",
        width: 1200,
        height: 630,
        alt: "Linha do tempo e imagens históricas do acervo",
      },
    ],
  },
};

type SectionProps = { id?: string; title?: string; subtitle?: string; children: ReactNode };
type HeroProps = { hero: SiteContent["about"]["hero"] };
type TocProps = { items: SiteContent["about"]["toc"] };
type EscopoProps = { data: SiteContent["about"]["escopo"] };
type MetodologiaProps = { data: SiteContent["about"]["metodologia"] };
type CityBlockProps = SiteContent["about"]["cities"][number];
type AcessoProps = { data: SiteContent["about"]["acesso"] };
type GuiaProps = { data: SiteContent["about"]["guia"] };
type GovernancaProps = { data: SiteContent["about"]["governanca"] };
type FaqProps = { data: SiteContent["about"]["faq"] };
type ContatoProps = { data: SiteContent["about"]["contato"] };

/* =====================================================
   Helpers visuais
   ===================================================== */
function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="relative w-full py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-8">
          {subtitle && (
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/50">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/80">
      {children}
    </kbd>
  );
}

/* =====================================================
   Seções principais
   ===================================================== */
function Hero({ hero }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[min(70svh,560px)] min-h-[360px]">
        <Image
          src={hero.image}
          alt="Fotografia histórica de trabalhadores — acervo digitalizado"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">
                {hero.eyebrow}
              </p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {hero.title}
              </h1>
              <p className="mt-2 text-white/80">{hero.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hero.pills.map((pill) => (
                  <Pill key={pill}>{pill}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toc({ items }: TocProps) {
  return (
    <Section id="toc" title="Navegação rápida" subtitle="Sumário">
      <nav aria-label="Navegação por seções" className="overflow-x-auto">
        <ul className="flex flex-wrap gap-2">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}

function EscopoObjetivos({ data }: EscopoProps) {
  return (
    <Section id="escopo" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </article>
        <aside className="lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Tipos documentais</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              {data.tiposDocumentais.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Públicos prioritários</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              {data.publicos.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function MetodologiaPadroes({ data }: MetodologiaProps) {
  return (
    <Section id="metodologia" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </article>
        <aside className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Boas práticas</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              {data.boasPraticas.map((bp) => (
                <li key={bp}>{bp}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Dica de uso rápido</h3>
            <p className="mt-2 text-sm text-white/70">
              {data.tip}{" "}
              <span className="inline-flex items-center gap-1">
                <Kbd>Ctrl</Kbd>/<Kbd>Cmd</Kbd> + <Kbd>K</Kbd>
              </span>
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function CityBlock({ id, name, cover, stats = [], paragraphs }: CityBlockProps) {
  return (
    <Section id={id} title={name} subtitle="Recortes territoriais">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 lg:col-span-7">
          <Image
            src={cover}
            alt={`Imagem da cidade de ${name}`}
            fill
            sizes="(min-width:1024px) 60vw, 100vw"
            className="object-cover"
          />
        </figure>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="prose prose-invert max-w-none text-white/80">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          {stats.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.map((s, i) => (
                <li key={i} className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
                  <div className="text-lg font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}

function AcessoDireitos({ data }: AcessoProps) {
  return (
    <Section id="acesso" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </article>
        <aside className="lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Como citar</h3>
            <p className="mt-2 text-sm text-white/70">
              <strong>Modelo:</strong> {data.comoCitar}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Solicitações</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              {data.solicitacoes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function GuiaPesquisador({ data }: GuiaProps) {
  return (
    <Section id="pesquisa" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.tips.map((t, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">{t.title}</h3>
            <p className="mt-2 text-sm text-white/70">{t.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GovernancaParcerias({ data }: GovernancaProps) {
  return (
    <Section id="governanca" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </article>
        <aside className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Frentes de trabalho</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/70">
              {data.frentes.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Parcerias</h3>
            <p className="mt-2 text-sm text-white/70">{data.parcerias}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Faq({ data }: FaqProps) {
  return (
    <Section id="faq" title="Perguntas frequentes" subtitle="Antes de escrever para a equipe">
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {data.map((x, i) => (
          <details key={i} className="group open:bg-white/5">
            <summary className="cursor-pointer list-none px-5 py-4 text-white/90 hover:bg-white/5">
              <span className="text-sm font-medium">{x.q}</span>
            </summary>
            <div className="px-5 pb-5 text-sm text-white/70">{x.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

function ContatoCta({ data }: ContatoProps) {
  return (
    <Section id="contato" title={data.title} subtitle={data.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <p className="text-white/80">
            Para dúvidas, solicitações de reprodução e propostas de parceria, acesse a{" "}
            <Link href="/contato" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Contato
            </Link>
            . Para pedidos de informação institucional, consulte também{" "}
            <Link href="/acesso-a-informacao" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Acesso à Informação
            </Link>
            .
          </p>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Navegar o acervo</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {data.asideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* =====================================================
   Página principal
   ===================================================== */
export default async function Page() {
  const { about } = await getSiteContent();

  return (
    <main id="main" className="relative">
      <Hero hero={about.hero} />
      <Toc items={about.toc} />
      <EscopoObjetivos data={about.escopo} />
      <MetodologiaPadroes data={about.metodologia} />

      {about.cities.map((city) => (
        <CityBlock key={city.id} {...city} />
      ))}

      <AcessoDireitos data={about.acesso} />
      <GuiaPesquisador data={about.guia} />
      <GovernancaParcerias data={about.governanca} />
      <Faq data={about.faq} />
      <ContatoCta data={about.contato} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            name: "Centro de Memória Operária Digitalizada Rubem Machado",
            url: "/sobre",
            areaServed: ["Volta Redonda", "Barra Mansa", "Resende"],
            keywords: ["acervo", "memória operária", "jornais de época", "história do trabalho"],
            creator: { "@type": "Organization", name: "Sintracon" },
          }),
        }}
      />
    </main>
  );
}
