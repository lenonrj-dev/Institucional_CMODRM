// app/sobre/page.js
// Página "Sobre" — Centro de Memória Operária Digitalizada Rubem Machado
// - Server Component (sem "use client") para permitir export de metadata
// - Estruturada em várias seções/componentes no MESMO arquivo (fácil de mover depois)
// - Estilo dark do projeto (Tailwind v4), sem dependências externas
// - Links âncora para navegação interna

import Image from "next/image";
import Link from "next/link";

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

/* =====================================================
   Helpers visuais
   ===================================================== */
function Section({ id, title, subtitle, children }) {
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

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Kbd({ children }) {
  return (
    <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/80">
      {children}
    </kbd>
  );
}

/* =====================================================
   Seções principais
   ===================================================== */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[min(70svh,560px)] min-h-[360px]">
        <Image
          src="https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763052010/1_de_janeiro_de_1959_2_jkdm71.png"
          alt="Fotografia histórica de trabalhadores — acervo digitalizado"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Fade inferior para legibilidade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">
                Centro de Memória Operária Digitalizada
              </p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                Sobre o Projeto Rubem Machado
              </h1>
              <p className="mt-2 text-white/80">
                Um repositório público para documentação, imagens, jornais e história oral
                do trabalho na região do Médio Paraíba Fluminense.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>Volta Redonda</Pill>
                <Pill>Barra Mansa</Pill>
                <Pill>Resende</Pill>
                <Pill>VRM e cidades vizinhas</Pill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toc() {
  const items = [
    { href: "#escopo", label: "Escopo & Objetivos" },
    { href: "#metodologia", label: "Metodologia e Padrões" },
    { href: "#volta-redonda", label: "Cidade: Volta Redonda" },
    { href: "#barra-mansa", label: "Cidade: Barra Mansa" },
    { href: "#resende", label: "Cidade: Resende" },
    { href: "#acesso", label: "Acesso, Uso e Direitos" },
    { href: "#pesquisa", label: "Guia do Pesquisador" },
    { href: "#governanca", label: "Governança & Parcerias" },
    { href: "#faq", label: "Perguntas Frequentes" },
    { href: "#contato", label: "Contato" },
  ];

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

function EscopoObjetivos() {
  return (
    <Section id="escopo" title="Escopo e objetivos" subtitle="Missão do projeto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            <p>
              O Centro de Memória Operária Digitalizada Rubem Machado (CMODRM) preserva e
              disponibiliza acervos relacionados ao mundo do trabalho, às organizações
              sindicais e à vida operária da região de Volta Redonda e entorno. O projeto
              integra documentos impressos, fotografias, jornais de época, cartazes,
              entrevistas e publicações, descrevendo-os com metadados consistentes e
              oferecendo leitura acessível em dispositivos variados.
            </p>
            <p>
              Nossos objetivos incluem: (1) preservar materiais em risco de degradação; (2)
              democratizar o acesso público; (3) apoiar ensino, pesquisa e extensão; (4)
              fortalecer a memória social do trabalho; (5) fomentar novas investigações
              históricas a partir de fontes primárias.
            </p>
          </div>
        </article>
        <aside className="lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Tipos documentais</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              <li>Jornais de época e boletins</li>
              <li>Fotografias e negativos</li>
              <li>Cartazes, panfletos e ephemera</li>
              <li>Documentos administrativos</li>
              <li>História oral (áudio, transcrições)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Públicos prioritários</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              <li>Pesquisadores/as e estudantes</li>
              <li>Escolas e projetos educativos</li>
              <li>Jornalistas e produtores culturais</li>
              <li>Comunidade local e sindical</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function MetodologiaPadroes() {
  return (
    <Section id="metodologia" title="Metodologia e padrões" subtitle="Como colecionamos e descrevemos">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            <p>
              A digitalização segue parâmetros comuns de preservação (ex.: captura em alta
              resolução e arquivo-matriz sem perdas) e acesso (derivados otimizados para
              leitura em tela). A descrição prioriza campos inspirados em esquemas amplamente
              adotados (como Dublin Core), com normalização de nomes, datas e locais.
            </p>
            <p>
              Cada item recebe um identificador estável (<em>slug</em>), é associado a uma
              coleção (boletins, fotos, documentos, entrevistas, cartazes) e contém resumo,
              palavras-chave e, quando pertinente, indicação de direitos.
            </p>
          </div>
        </article>
        <aside className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Boas práticas</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              <li>Arquivo-matriz preservado e arquivos de acesso otimizados</li>
              <li>Metadados consistentes e vocabulário controlado</li>
              <li>Registro de proveniência e contexto de produção</li>
              <li>Citações e créditos padronizados</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Dica de uso rápido</h3>
            <p className="mt-2 text-sm text-white/70">
              Use <Kbd>Ctrl</Kbd>/<Kbd>Cmd</Kbd> + <Kbd>K</Kbd> (ou a busca global do site)
              para localizar termos, pessoas e datas. Nas páginas de leitura, utilize o
              índice e o modo de visualização mais confortável.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function CityBlock({ id, name, cover, children, stats = [] }) {
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
            <div className="prose prose-invert max-w-none text-white/80">{children}</div>
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

function AcessoDireitos() {
  return (
    <Section id="acesso" title="Acesso, uso e direitos" subtitle="Orientações e políticas">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            <p>
              O acesso é público e gratuito. Alguns itens podem ter restrições de uso
              (direitos autorais, imagem ou privacidade). Nesses casos, a página do item
              indica a licença e as condições de reprodução. Respeite sempre as credenciais
              e cite a fonte.
            </p>
            <p>
              Para materiais que envolvam dados pessoais, aplicamos medidas alinhadas à LGPD
              (Lei nº 13.709/2018), com avaliação de risco, minimização de dados sensíveis e
              disponibilização de versões editadas quando necessário.
            </p>
            <p>
              Reproduções para fins acadêmicos e jornalísticos são bem-vindas, desde que
              acompanhadas de citação completa. Para usos comerciais, consulte previamente a
              coordenação do projeto.
            </p>
          </div>
        </article>
        <aside className="lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Como citar</h3>
            <p className="mt-2 text-sm text-white/70">
              <strong>Modelo:</strong> Nome do item. Coleção, entidade custodiadora. Cidade,
              data. Centro de Memória Operária Digitalizada Rubem Machado — Sintracon.
              URL.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Solicitações</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              <li>Retirada/anonimização de dados sensíveis</li>
              <li>Liberação de reprodução em alta resolução</li>
              <li>Depósito de novos conjuntos documentais</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function GuiaPesquisador() {
  const tips = [
    {
      title: "Comece pelo sumário do Acervo",
      text:
        "Use as páginas de coleção (Boletins, Fotos, Documentos, Entrevistas, Cartazes) para ter visão geral e refinar sua busca.",
    },
    {
      title: "Aproveite filtros e busca",
      text:
        "Filtre por década, tema e tags; a busca localiza termos no título e no resumo dos itens.",
    },
    {
      title: "Navegação em leitura",
      text:
        "Nos jornais de época, utilize o índice e ative o modo de visualização mais confortável (ampliado ou normal).",
    },
    {
      title: "Cite corretamente",
      text:
        "Registre título, coleção, local, data e a referência ao Centro de Memória; inclua a URL do item.",
    },
  ];

  return (
    <Section id="pesquisa" title="Guia do pesquisador" subtitle="Dicas práticas">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((t, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">{t.title}</h3>
            <p className="mt-2 text-sm text-white/70">{t.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function GovernancaParcerias() {
  return (
    <Section id="governanca" title="Governança e parcerias" subtitle="Equipe, processos e rede de apoio">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="prose prose-invert max-w-none text-white/80">
            <p>
              A governança envolve coordenação geral, curadoria técnica, digitalização,
              descrição, desenvolvimento e atendimento ao público. Parcerias institucionais e
              comunitárias viabilizam a identificação de fundos, a conservação física e a
              difusão do acervo.
            </p>
            <p>
              O projeto prevê relatórios de transparência, calendário de atualizações e
              canais para doações de acervos e apoio financeiro.
            </p>
          </div>
        </article>
        <aside className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Frentes de trabalho</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/70">
              <li>Curadoria</li>
              <li>Digitalização</li>
              <li>Descrição</li>
              <li>TI/Desenvolvimento</li>
              <li>Jurídico</li>
              <li>Educação</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Parcerias</h3>
            <p className="mt-2 text-sm text-white/70">
              Sindicatos, universidades, arquivos públicos, bibliotecas, centros de
              documentação e iniciativas comunitárias.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Faq() {
  const qa = [
    {
      q: "Posso enviar documentos para integrar o acervo?",
      a: "Sim. Entre em contato pela página de Contato para iniciar o processo de avaliação e doação/deposição.",
    },
    {
      q: "Há custos para acessar os materiais?",
      a: "Não. O acesso é público. Apenas reproduções especiais em alta resolução ou usos comerciais podem demandar autorização adicional.",
    },
    {
      q: "Posso usar imagens em trabalhos acadêmicos?",
      a: "Sim, com citação apropriada e observância das condições indicadas no item (licenças e direitos).",
    },
  ];

  return (
    <Section id="faq" title="Perguntas frequentes" subtitle="Antes de escrever para a equipe">
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {qa.map((x, i) => (
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

function ContatoCta() {
  return (
    <Section id="contato" title="Fale com a equipe" subtitle="Atendimento e suporte">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <p className="text-white/80">
            Para dúvidas, solicitações de reprodução e propostas de parceria, acesse a
            página <Link href="/contato" className="underline decoration-white/40 underline-offset-4 hover:text-white">Contato</Link>.
            Para pedidos de informação institucional, consulte também
            {" "}
            <Link href="/acesso-a-informacao" className="underline decoration-white/40 underline-offset-4 hover:text-white">Acesso à Informação</Link>.
          </p>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-white">Navegar o acervo</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/acervo" className="inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10">Visão geral do Acervo</Link>
              </li>
              <li>
                <Link href="/jornais-de-epoca" className="inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10">Jornais de Época</Link>
              </li>
              <li>
                <Link href="/producao-bibliografica" className="inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10">Produção Bibliográfica</Link>
              </li>
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
export default function Page() {
  return (
    <main id="main" className="relative">
      <Hero />
      <Toc />
      <EscopoObjetivos />
      <MetodologiaPadroes />

      {/* Cidades */}
      <CityBlock
        id="volta-redonda"
        name="Volta Redonda"
        cover="https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763052010/1_de_janeiro_de_1959_2_jkdm71.png"
        stats={[
          { label: "Itens descritos", value: "480+" },
          { label: "Séries", value: "12" },
          { label: "Períodos", value: "1930–1990" },
        ]}
      >
        <p>
          Cidade-sede do projeto e referência nacional no mundo do trabalho,
          sobretudo pela indústria do aço. O acervo reúne jornais, fotografias e
          documentação associada a greves, assembleias e cotidiano fabril.
        </p>
        <p>
          As descrições priorizam datas, locais, entidades de classe e termos de
          assunto (ex.: greves, negociações, segurança do trabalho), facilitando a
          pesquisa temática e temporal.
        </p>
      </CityBlock>

      <CityBlock
        id="barra-mansa"
        name="Barra Mansa"
        cover="https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763127052/Design_sem_nome_19_kiwxzz.svg"
        stats={[
          { label: "Itens descritos", value: "160+" },
          { label: "Séries", value: "6" },
          { label: "Períodos", value: "1940–1980" },
        ]}
      >
        <p>
          Município vizinho histórico de circulação de trabalhadores e impressos
          sindicais. O acervo destaca a organização por locais de trabalho e a
          articulação regional com Volta Redonda.
        </p>
      </CityBlock>

      <CityBlock
        id="resende"
        name="Resende"
        cover="https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg"
        stats={[
          { label: "Itens descritos", value: "90+" },
          { label: "Séries", value: "4" },
          { label: "Períodos", value: "1950–1980" },
        ]}
      >
        <p>
          Composição industrial e circulação regional de impressos de base. Fontes
          iconográficas e de história oral complementam o mapeamento documental.
        </p>
      </CityBlock>

      <AcessoDireitos />
      <GuiaPesquisador />
      <GovernancaParcerias />
      <Faq />
      <ContatoCta />

      {/* JSON-LD básico */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            name: "Centro de Memória Operária Digitalizada Rubem Machado",
            url: "/sobre",
            areaServed: ["Volta Redonda", "Barra Mansa", "Resende"],
            keywords: [
              "acervo",
              "memória operária",
              "jornais de época",
              "história do trabalho",
            ],
            creator: {
              "@type": "Organization",
              name: "Sintracon",
            },
          }),
        }}
      />
    </main>
  );
}
