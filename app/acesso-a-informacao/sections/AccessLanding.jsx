"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search, SlidersHorizontal, FileText, ClipboardList, HandCoins,
  Landmark, Newspaper, ImageIcon, ShieldCheck, ArrowRight,
  HelpCircle, BarChart3, Database, CheckCircle2, ChevronDown,
} from "lucide-react";
// Se quiser usar seu card já estilizado:
// import DocCard from "../components/sections/DocCard";

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const FILTERS = ["Todos", "Atas", "Relatórios", "Contratos", "Despesas", "Convênios", "Boletins", "Imagens"];

const ITEMS = [
  {
    icon: ClipboardList,
    tag: "Atas",
    title: "Atas de Assembleia — 1950–1980",
    desc: "Deliberações, presença e pautas debatidas em encontros gerais e extraordinários.",
    href: "/acervo/documentos/atas",
  },
  {
    icon: FileText,
    tag: "Relatórios",
    title: "Relatórios de Gestão",
    desc: "Síntese anual de ações, indicadores e prestação de contas das frentes do sindicato.",
    href: "/acervo/relatorios",
  },
  {
    icon: HandCoins,
    tag: "Contratos",
    title: "Contratos e Parcerias",
    desc: "Instrumentos firmados com fornecedores e instituições, com objetos e vigências.",
    href: "/acesso-a-informacao/contratos",
  },
  {
    icon: Landmark,
    tag: "Despesas",
    title: "Despesas e Custos Operacionais",
    desc: "Notas, empenhos e categorias de gasto com critérios de classificação.",
    href: "/acesso-a-informacao/despesas",
  },
  {
    icon: Landmark,
    tag: "Convênios",
    title: "Convênios",
    desc: "Termos, metas e prestações de contas em convênios institucionais.",
    href: "/acesso-a-informacao/convenios",
  },
  {
    icon: Newspaper,
    tag: "Boletins",
    title: "Boletins Informativos",
    desc: "Comunicados e chamadas oficiais publicados ao longo dos anos.",
    href: "/jornais-de-epoca",
  },
  {
    icon: ImageIcon,
    tag: "Imagens",
    title: "Acervo Fotográfico",
    desc: "Álbuns temáticos, eventos e registros históricos (metadados e direitos).",
    href: "/acervo/fotos",
  },
];

const REPORTS = [
  { title: "Relatório de Transparência 2024", desc: "Indicadores de atendimento, prazos, indeferimentos e bases publicadas.", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821815/Untitled_design_6_nsj01b.png", href: "/transparencia/relatorio-2024" },
  { title: "Plano de Dados Abertos", desc: "Datasets priorizados, formato, atualização e responsáveis.", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821815/Untitled_design_6_nsj01b.png", href: "/transparencia/plano-dados" },
  { title: "Política de Privacidade", desc: "Tratamento de dados pessoais e bases legais aplicáveis.", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821815/Untitled_design_6_nsj01b.png", href: "/transparencia/privacidade" },
];

const DATASETS = [
  { title: "Catálogo de Documentos (CSV)", type: "CSV", href: "/datasets/catalogo-documentos.csv" },
  { title: "Vocabulário Controlado (JSON)", type: "JSON", href: "/datasets/vocabulario.json" },
  { title: "Séries de Pedidos de Acesso (CSV)", type: "CSV", href: "/datasets/pedidos.csv" },
];

export default function AccessLanding() {
  /* —— estado de busca/filtro —— */
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [limit, setLimit] = useState(4); // limita o bloco “Todos” pra página não ficar enorme

  const items = useMemo(() => {
    let arr = ITEMS.slice();
    if (filter !== "Todos") arr = arr.filter((i) => i.tag === filter);
    const term = q.trim().toLowerCase();
    if (term) arr = arr.filter((i) =>
      (i.title + " " + i.desc + " " + i.tag).toLowerCase().includes(term)
    );
    return arr;
  }, [q, filter]);

  const visible = filter === "Todos" && !q ? items.slice(0, limit) : items;

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* HERO */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <ShieldCheck className="h-4 w-4" />
              Acesso à Informação
            </div>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Transparência ativa e busca em um só lugar
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Consulte documentos, políticas e registros do banco de memória. Filtre por
              tema e avance para páginas com o conteúdo completo.
            </p>

            {/* Busca + filtros */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  placeholder="Buscar por título, tema ou descrição…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-white/50">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filtros
                </span>
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setFilter(f); setLimit(4); }}
                    className={[
                      "rounded-lg border px-3 py-1.5 text-sm transition",
                      filter === f
                        ? "border-white/20 bg-white/15 text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lateral: como funciona + CTA */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
              <h3 className="text-lg font-semibold text-white">Como funciona</h3>
              <ol className="mt-2 space-y-2 text-sm text-white/70">
                <li>1. <strong>Localize</strong> o tema pela busca ou filtros.</li>
                <li>2. <strong>Acesse a página</strong> do conteúdo desejado.</li>
                <li>3. <strong>Verifique permissões</strong> e termos de uso quando aplicável.</li>
                <li>4. <strong>Precisa de algo específico?</strong> Envie um pedido de acesso.</li>
              </ol>
              <Link
                href="/contato"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                Enviar pedido de acesso <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">Direitos do requerente</h4>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-white/70">
                <li>Orientação sobre onde e como acessar informações.</li>
                <li>Ser informado sobre a disponibilidade do conteúdo solicitado.</li>
                <li>Justificativa em caso de restrição de acesso.</li>
              </ul>
              <div className="mt-2 text-right">
                <Link href="/transparencia/politica" className="text-xs text-white/60 underline-offset-2 hover:underline">
                  Ver política de transparência
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RESULTADOS (cards) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-3"
        >
          {visible.map((it, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="grid grid-cols-[44px,1fr,auto] items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 sm:gap-4 sm:p-4"
            >
              <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                <it.icon className="h-5 w-5 text-white/80" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/60">{it.tag}</div>
                <h3 className="text-base font-semibold text-white/90">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{it.desc}</p>
              </div>
              <div>
                <Link
                  href={it.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Ver mais (apenas no modo 'Todos' sem busca) */}
        {filter === "Todos" && !q && limit < items.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setLimit((n) => n + 4)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Ver mais <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* TRANSPARÊNCIA ATIVA — Relatórios */}
        <div className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <BarChart3 className="h-4 w-4" />
            Transparência ativa — relatórios
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((r, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={r.cover} alt={r.title} fill className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
                </div>
                <div className="p-4 pb-14">
                  <h4 className="text-base font-semibold text-white/90">{r.title}</h4>
                  <p className="mt-1 text-sm text-white/70">{r.desc}</p>
                </div>
                <Link
                  href={r.href}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Abrir <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* DATASETS PÚBLICOS */}
        <div className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Database className="h-4 w-4" />
            Datasets públicos
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {DATASETS.map((d, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                <div>
                  <div className="text-sm font-medium text-white">{d.title}</div>
                  <div className="text-xs text-white/60">Atualização periódica • {d.type}</div>
                </div>
                <Link
                  href={d.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                >
                  Baixar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* PASSO-A-PASSO RÁPIDO */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: Search, title: "Localize", text: "Use a busca ou filtros para chegar ao conteúdo." },
            { icon: CheckCircle2, title: "Verifique", text: "Leia os termos de uso e permissões disponíveis." },
            { icon: ShieldCheck, title: "Solicite", text: "Se necessário, envie um pedido com justificativa." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="inline-flex items-center gap-2 text-white/80">
                <s.icon className="h-5 w-5" />
                <span className="font-medium">{s.title}</span>
              </div>
              <p className="mt-1 text-sm text-white/70">{s.text}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <HelpCircle className="h-4 w-4" />
            Perguntas frequentes
          </div>
          <div className="space-y-2">
            {FAQ.map((f, i) => <Faq key={i} {...f} />)}
          </div>
        </div>

        {/* CONTATO */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">Fale com a equipe</h3>
              </div>
              <p className="mt-1 text-sm text-white/70">
                Dúvidas sobre prazos, formatos e disponibilização? Estamos à disposição.
              </p>
            </div>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Solicitar acesso <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ——— FAQ simples ——— */
const FAQ = [
  {
    q: "Quais informações podem estar restritas?",
    a: "Itens com dados pessoais sensíveis, segredos industriais ou direitos autorais não licenciados podem ter acesso condicionado ou parcial.",
  },
  {
    q: "Em quanto tempo recebo retorno do pedido?",
    a: "Você recebe protocolo imediato e atualização de status. Prazos variam conforme complexidade e disponibilidade do acervo solicitado.",
  },
  {
    q: "Posso reutilizar os dados?",
    a: "Respeite a licença indicada em cada item. Datasets abertos podem ser reutilizados com crédito ao Banco de Memória.",
  },
];

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-white/90">{q}</span>
        <ChevronDown className={`h-5 w-5 text-white/70 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-3 text-sm text-white/70">{a}</div>}
    </div>
  );
}
