"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Landmark, ShieldCheck, Filter, Search, CalendarDays, Compass, ArrowRight,
  FileText, ScrollText, HeartPulse, Users, GraduationCap,
  Building2, Scale, Hammer, ChevronLeft, ChevronRight, History, MapPin,
  HelpCircle, CheckCircle2, BarChart3, LayoutGrid, List
} from "lucide-react";

/* ---------- animações ---------- */
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

/* ---------- dados mock (trocar pela sua API) ---------- */
const EIXOS = [
  { key: "trabalho-decente", label: "Trabalho Decente", icon: Hammer },
  { key: "negociacao", label: "Negociação Coletiva", icon: Scale },
  { key: "saude", label: "Saúde & Segurança", icon: HeartPulse },
  { key: "formacao", label: "Formação & Juventude", icon: GraduationCap },
  { key: "mulheres", label: "Mulheres", icon: Users },
  { key: "habitacao", label: "Política Habitacional", icon: Building2 },
];

const DECADES = ["Todos", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s"];

const DIRETRIZES = [
  {
    eixo: "trabalho-decente",
    decade: "2020s",
    title: "Piso Setorial e Formalização",
    desc: "Valorização salarial, combate à informalidade e critérios de contratação.",
    href: "/politica-nacional/diretrizes/piso-setorial",
  },
  {
    eixo: "negociacao",
    decade: "2010s",
    title: "Canais Permanentes de Negociação",
    desc: "Calendário, mediação e instrumentos de prevenção de conflito.",
    href: "/politica-nacional/diretrizes/canais-negociacao",
  },
  {
    eixo: "saude",
    decade: "2000s",
    title: "Programa de Saúde e Segurança",
    desc: "Mapeamento de riscos, EPIs, CIPA setorial e auditorias participativas.",
    href: "/politica-nacional/diretrizes/saude-seguranca",
  },
  {
    eixo: "formacao",
    decade: "2020s",
    title: "Formação de Base e Juventude",
    desc: "Itinerários formativos, bolsas e desenvolvimento de quadros.",
    href: "/politica-nacional/diretrizes/formacao-juventude",
  },
  {
    eixo: "mulheres",
    decade: "2010s",
    title: "Igualdade e Enfrentamento à Violência",
    desc: "Cláusulas específicas, canais seguros e protocolo de atendimento.",
    href: "/politica-nacional/diretrizes/igualdade-mulheres",
  },
  {
    eixo: "habitacao",
    decade: "1990s",
    title: "Mutirões e Crédito Habitacional",
    desc: "Programas públicos, assistência técnica e regularização fundiária.",
    href: "/politica-nacional/diretrizes/habitacao",
  },
];

const INSTRUMENTOS = [
  { title: "Estatuto do Sindicato (consolidação)", tag: "Normativo", href: "/politica-nacional/instrumentos/estatuto", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Código de Conduta e Integridade",       tag: "Normativo", href: "/politica-nacional/instrumentos/conduta",  cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Acordo Coletivo — 2019/2020",           tag: "Acordo",    href: "/politica-nacional/instrumentos/acordo-2019", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
];

const DESTAQUES = [
  { title: "Plano Nacional — 2024–2027", desc: "Metas, eixos estruturantes e indicadores de acompanhamento.", href: "/politica-nacional/plano-2024", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Carta de Princípios", desc: "Valores, compromissos e diretrizes éticas que orientam a atuação.", href: "/politica-nacional/carta-principios", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Pactos Regionais", desc: "Acordos de implementação por macrorregiões e frentes temáticas.", href: "/politica-nacional/pactos-regionais", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
];

const REGIOES = [
  { name: "Norte",       status: "Em implementação", pontos: 12 },
  { name: "Nordeste",    status: "Consolidado",      pontos: 26 },
  { name: "Centro-Oeste",status: "Em expansão",      pontos: 18 },
  { name: "Sudeste",     status: "Consolidado",      pontos: 38 },
  { name: "Sul",         status: "Em implementação", pontos: 20 },
];

/* ---------- helpers ---------- */
const cls = (...xs) => xs.filter(Boolean).join(" ");

/* ---------- componente principal ---------- */
export default function PoliticaLanding() {
  const sections = [
    { id: "diretrizes", label: "Diretrizes" },
    { id: "destaques", label: "Destaques" },
    { id: "instrumentos", label: "Instrumentos" },
    { id: "linha-do-tempo", label: "Linha do tempo" },
    { id: "implementacao", label: "Implementação" },
    { id: "faq", label: "FAQ" },
  ];

  const [q, setQ] = useState("");
  const [eixo, setEixo] = useState("Todos");
  const [decade, setDecade] = useState("Todos");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    let arr = DIRETRIZES.slice();
    if (eixo !== "Todos")   arr = arr.filter((d) => d.eixo === eixo);
    if (decade !== "Todos") arr = arr.filter((d) => d.decade === decade);
    const term = q.trim().toLowerCase();
    if (term) arr = arr.filter((d) => (d.title + " " + d.desc).toLowerCase().includes(term));
    return arr;
  }, [q, eixo, decade]);

  /* ----- carrossel “Destaques” (sem scrollbar) ----- */
  const CARD_W = 320, GAP = 16;
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(1);
  const viewportRef = useRef(null);

  useEffect(() => {
    const recalc = () => {
      const w = viewportRef.current?.clientWidth || CARD_W;
      const pv = Math.max(1, Math.floor((w + GAP) / (CARD_W + GAP)));
      setPerView(pv);
      setIdx((i) => Math.max(0, Math.min(i, Math.max(0, DESTAQUES.length - pv))));
    };
    recalc();
    const onR = () => recalc();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const maxIndex = Math.max(0, DESTAQUES.length - perView);
  const offset = idx * (CARD_W + GAP);

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* HERO + subnav */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Landmark className="h-4 w-4" />
            Política Nacional
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Diretrizes, instrumentos e histórico da atuação sindical
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            Explore os eixos estratégicos, acesse documentos integrais e acompanhe a implementação por regiões. Navegação clara e leitura confortável.
          </p>

          {/* indicadores rápidos */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <Stat icon={ShieldCheck} label="Eixos" value={EIXOS.length} />
            <Stat icon={FileText}    label="Diretrizes" value={DIRETRIZES.length} />
            <Stat icon={ScrollText}  label="Instrumentos" value={INSTRUMENTOS.length} />
            <Stat icon={CalendarDays}label="Períodos" value={DECADES.length - 1} />
            <Stat icon={BarChart3}   label="Regiões" value={REGIOES.length} />
            <Stat icon={Compass}     label="Destaques" value={DESTAQUES.length} />
          </div>

          {/* subnav sticky */}
          <nav className="sticky top-16 z-20 mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <div className="inline-flex gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* BUSCA + filtros */}
        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
              <Search className="h-4 w-4 text-white/60" />
              <input
                placeholder="Buscar por título ou palavra-chave…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={eixo}
                onChange={(e) => setEixo(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <option>Todos</option>
                {EIXOS.map((e) => (
                  <option key={e.key} value={e.key}>{e.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="md:col-span-3">
            <select
              value={decade}
              onChange={(e) => setDecade(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {DECADES.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* DIRETRIZES */}
        <section id="diretrizes" className="relative w-full py-6">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <ScrollText className="h-4 w-4" />
            Diretrizes por eixo
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-white/60">{filtered.length} resultado(s)</span>
            <div className="inline-flex overflow-hidden rounded-lg border border-white/10">
              <button
                onClick={() => setView("grid")}
                className={cls("px-2.5 py-2", view === "grid" ? "bg-white/15 text-white" : "bg-white/5 text-white/70 hover:bg-white/10")}
                aria-label="Grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cls("px-2.5 py-2", view === "list" ? "bg-white/15 text-white" : "bg-white/5 text-white/70 hover:bg-white/10")}
                aria-label="Lista"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}
          >
            {filtered.map((d, i) =>
              view === "grid" ? <CardDiretriz key={i} d={d} /> : <RowDiretriz key={i} d={d} />
            )}
          </motion.div>
        </section>

        {/* DESTAQUES — carrossel sem scrollbar */}
        <section id="destaques" className="relative w-full py-10 sm:py-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <CheckCircle2 className="h-4 w-4" />
            Destaques
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />

            <div className="absolute -left-2 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                className="rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute -right-2 top-1/2 z-10 -translate-y-1/2">
              <button
                onClick={() => setIdx((i) => Math.min(maxIndex, i + 1))}
                className="rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div ref={viewportRef} className="overflow-hidden">
              <div
                style={{
                  display: "flex",
                  gap: `${GAP}px`,
                  transform: `translateX(-${offset}px)`,
                  transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {DESTAQUES.map((it) => (
                  <article
                    key={it.title}
                    className="group relative h-[18rem] w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={it.cover}
                        alt={it.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        sizes="320px"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-base font-semibold text-white">{it.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-white/80">{it.desc}</p>
                      <Link
                        href={it.href}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                      >
                        Abrir <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INSTRUMENTOS NORMATIVOS */}
        <section id="instrumentos" className="relative w-full py-6">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <FileText className="h-4 w-4" />
            Instrumentos normativos
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INSTRUMENTOS.map((ins, i) => (
              <article
                key={i}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={ins.cover}
                    alt={ins.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-4 pb-14">
                  <div className="text-xs text-white/60">{ins.tag}</div>
                  <h4 className="text-base font-semibold text-white/90">{ins.title}</h4>
                </div>
                <Link
                  href={ins.href}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Abrir <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* LINHA DO TEMPO */}
        <section id="linha-do-tempo" className="relative w-full py-10 sm:py-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <History className="h-4 w-4" />
            Linha do tempo
          </div>
          <ul className="space-y-3">
            {[
              { year: "1964-1985", text: "Repressão, reorganização e redes de solidariedade." },
              { year: "1988",      text: "Constituição: reforço de direitos sociais e coletivos." },
              { year: "1990s",     text: "Negociações setoriais e política habitacional vinculada." },
              { year: "2000s",     text: "Ampliação de saúde e segurança; bases de dados." },
              { year: "2010s",     text: "Plataformas digitais e novos canais de negociação." },
              { year: "2020s",     text: "Plano nacional com indicadores e transparência ativa." },
            ].map((ev, i) => (
              <li key={i} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <CalendarDays className="h-4 w-4" />
                  {ev.year}
                </div>
                <p className="mt-1 text-sm text-white/80">{ev.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* IMPLEMENTAÇÃO POR REGIÕES */}
        <section id="implementacao" className="relative w-full py-6">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <MapPin className="h-4 w-4" />
            Implementação por regiões
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {REGIOES.map((r, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-white/60">{r.status}</div>
                <div className="mt-2 text-2xl font-bold text-white">{r.pontos}</div>
                <div className="text-xs text-white/60">pontos de implementação</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative w-full py-10 sm:py-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <HelpCircle className="h-4 w-4" />
            Perguntas frequentes
          </div>
          <div className="space-y-2">
            {[
              { q: "Como as diretrizes viram cláusulas?", a: "Por meio de negociação coletiva e pactos regionais. As versões finais ficam em ‘Instrumentos’." },
              { q: "Como acompanho os indicadores?", a: "Nos relatórios periódicos da política (transparência ativa) e no painel por região." },
              { q: "Posso propor ajustes?", a: "Sim. Use o canal de contato. As propostas são analisadas pela coordenação e curadoria." },
            ].map((f, i) => <FaqRow key={i} {...f} />)}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">Contribua com a política</h3>
              </div>
              <p className="mt-1 text-sm text-white/70">Envie sugestões ou documentos relacionados aos eixos.</p>
            </div>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Falar com a equipe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- subcomponentes ---------- */
function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3">
      <div className="inline-flex items-center gap-2 text-white/80">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function CardDiretriz({ d }) {
  const eixoObj = EIXOS.find((e) => e.key === d.eixo);
  const Icon = eixoObj?.icon ?? Hammer;
  const label = eixoObj?.label ?? d.eixo;
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
    >
      <div className="mb-1 flex items-center gap-2 text-[11px] text-white/60">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        <span>•</span>
        <span>{d.decade}</span>
      </div>
      <h3 className="text-base font-semibold text-white/90">{d.title}</h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-white/70">{d.desc}</p>
      <Link href={d.href} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15">
        Saiba mais <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}

function RowDiretriz({ d }) {
  const eixoObj = EIXOS.find((e) => e.key === d.eixo);
  const Icon = eixoObj?.icon ?? Hammer;
  const label = eixoObj?.label ?? d.eixo;
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.22 }}
      className="grid grid-cols-[44px,1fr,auto] items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 sm:gap-4 sm:p-4"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
        <Icon className="h-5 w-5 text-white/80" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] text-white/60">{label} • {d.decade}</div>
        <h3 className="text-base font-semibold text-white/90">{d.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{d.desc}</p>
      </div>
      <Link href={d.href} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15">
        Saiba mais <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="font-medium text-white/90">{q}</span>
        <ChevronRight className={`h-5 w-5 text-white/70 transition ${open ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-4 pb-3 text-sm text-white/70"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
