"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Flag,
  Gavel,
  Calendar,
  Filter,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  BookOpen,
} from "lucide-react";

/* ====== motion variants ====== */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

/* ====== dados mock (troque pelos reais quando quiser) ====== */
const FEATURED = {
  title: "Constituição de 1988 — direitos e garantias",
  description:
    "Marco legal que redefine cidadania, relações de trabalho e acesso a políticas públicas. Entenda impactos no mundo do trabalho e na organização sindical.",
  href: "/politica-nacional/constituicao-1988",
  cover: "/hero.png",
  date: "05/10/1988",
};

const AXES = [
  { key: "todos", label: "Todos" },
  { key: "trabalho", label: "Trabalho" },
  { key: "previdencia", label: "Previdência" },
  { key: "educacao", label: "Educação" },
  { key: "saude", label: "Saúde" },
  { key: "direitos", label: "Direitos" },
];

const EVENTS = [
  {
    title: "Reforma Trabalhista — Contexto e Efeitos",
    date: "2017",
    summary:
      "Mudanças em contratos, negociação coletiva e representação sindical — linhas gerais e debates.",
    href: "/politica-nacional/reforma-trabalhista-2017",
    axis: ["trabalho", "direitos"],
  },
  {
    title: "Política de Valorização do Salário Mínimo",
    date: "2008–Atualizações",
    summary:
      "Indexadores e fórmulas que influenciam renda, consumo e negociações setoriais.",
    href: "/politica-nacional/salario-minimo",
    axis: ["trabalho"],
  },
  {
    title: "Reforma da Previdência — Regras Gerais",
    date: "2019",
    summary:
      "Idade mínima, tempo de contribuição e transições: o que muda para diferentes categorias.",
    href: "/politica-nacional/previdencia-2019",
    axis: ["previdencia", "direitos"],
  },
  {
    title: "Pisos Salariais Profissionais",
    date: "Diversas Leis",
    summary:
      "Estruturas de piso por ocupação e seus reflexos em carreiras e negociações.",
    href: "/politica-nacional/pisos-salariais",
    axis: ["trabalho"],
  },
  {
    title: "Diretrizes Nacionais de Educação Profissional",
    date: "Atualizações",
    summary:
      "Qualificação e certificação para o mundo do trabalho: histórico e políticas.",
    href: "/politica-nacional/educacao-profissional",
    axis: ["educacao", "trabalho"],
  },
  {
    title: "SUS — Estrutura e Participação Social",
    date: "1988–",
    summary:
      "Conselhos, conferências e acesso universal: como a saúde pública se organiza.",
    href: "/politica-nacional/sus-participacao",
    axis: ["saude", "direitos"],
  },
  {
    title: "Segurança e Saúde no Trabalho",
    date: "NRs e Atualizações",
    summary:
      "Normas Regulamentadoras, prevenção e condições de trabalho ao longo das décadas.",
    href: "/politica-nacional/seguranca-saude-trabalho",
    axis: ["trabalho", "saude"],
  },
  {
    title: "Conselhos e Mesas de Negociação",
    date: "Histórico",
    summary:
      "Mecanismos de diálogo social entre governo, trabalhadores e empregadores.",
    href: "/politica-nacional/dialogo-social",
    axis: ["direitos", "trabalho"],
  },
  {
    title: "Programas de Habitação de Interesse Social",
    date: "Várias Fases",
    summary:
      "Acesso à moradia e impactos socioeconômicos para a classe trabalhadora.",
    href: "/politica-nacional/habitacao",
    axis: ["direitos"],
  },
  {
    title: "Política de Transparência e Acesso",
    date: "Lei e Decretos",
    summary:
      "Bases legais de acesso a informações públicas e prestação de contas.",
    href: "/politica-nacional/transparencia",
    axis: ["direitos"],
  },
];

/* ====== subcomponentes ====== */
const AxisChip = memo(function AxisChip({ active, onClick, children }) {
  const classes =
    "rounded-lg border px-2.5 py-1.5 text-xs transition " +
    (active
      ? "border-white/20 bg-white/15 text-white"
      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10");
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={classes}>
      {children}
    </button>
  );
});

const EventCard = memo(function EventCard({ item, measureRef }) {
  return (
    <motion.article
      ref={measureRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
    >
      <div className="flex items-start gap-3">
        <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Gavel className="h-4.5 w-4.5 text-white/80" />
        </div>
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 text-[11px] text-white/60">
            <Calendar className="h-3.5 w-3.5" />
            <span>{item.date}</span>
          </div>
          <h4 className="text-base font-semibold text-white/90">{item.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{item.summary}</p>
          <div className="mt-3">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Ler análise <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ====== util ====== */
function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

/* ====== componente principal ====== */
export default function SeventhSection() {
  // filtros
  const [axis, setAxis] = useState("todos");

  // busca curta (opcional — pode remover se não quiser)
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [q]);

  // filtrar eventos
  const filtered = useMemo(() => {
    const base =
      axis === "todos" ? EVENTS : EVENTS.filter((e) => e.axis.includes(axis));
    if (!qDebounced) return base;
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(qDebounced) ||
        e.summary.toLowerCase().includes(qDebounced)
    );
  }, [axis, qDebounced]);

  /* ====== lista vertical sem scrollbar (com TRAVA da página fora do container) ====== */
  const viewportRef = useRef(null);
  const firstRef = useRef(null);
  const [cardH, setCardH] = useState(0);
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const GAP = 12; // space-y-3
  const MAX_H = 540;

  const recalc = () => {
    const v = viewportRef.current;
    const c = firstRef.current;
    const vh = v?.clientHeight ?? MAX_H;
    let ch = (c?.offsetHeight ?? cardH) || 160;

    const pv = Math.max(1, Math.floor((vh + GAP) / (ch + GAP)));
    setCardH(ch);
    setPerView(pv);
    setIndex((i) => clamp(i, 0, Math.max(0, filtered.length - pv)));
  };

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIndex(0);
    const t = setTimeout(recalc, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axis, qDebounced, filtered.length]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const offset = index * (cardH + GAP);

  const step = (dir) => setIndex((i) => clamp(i + dir, 0, maxIndex));
  const page = (dir) => setIndex((i) => clamp(i + perView * dir, 0, maxIndex));

  // BLOQUEIO: intercepta wheel/touch dentro do viewport para não rolar a página
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    };

    let lastY = 0;
    const handleTouchStart = (e) => {
      lastY = e.touches?.[0]?.clientY ?? 0;
    };
    const handleTouchMove = (e) => {
      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = lastY - y;
      if (Math.abs(dy) < 4) return;
      e.preventDefault();
      step(dy > 0 ? 1 : -1);
      lastY = y;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [maxIndex]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault(); step(1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault(); step(-1);
    } else if (e.key === "Home") {
      e.preventDefault(); setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault(); setIndex(maxIndex);
    }
  };

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl"
      >
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <Flag className="h-4 w-4" />
              Política Nacional
            </div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Contexto e marcos da política nacional
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Acompanhe marcos legais e programas que moldam o mundo do trabalho.
              Explore o destaque, navegue pelos eventos e aprofunde nas análises.
            </p>
          </div>

          <Link
            href="/politica-nacional"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Explorar Política Nacional
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid: destaque / marcos / eixos */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Destaque do período (esquerda) */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5"
          >
            <article className="relative overflow-hidden rounded-2xl border border-white/10">
              {/* capa */}
              <div className="relative h-64 w-full">
                <Image
                  src={FEATURED.cover}
                  alt={FEATURED.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 40vw, 100vw"
                />
              </div>
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              {/* conteúdo */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-white/70">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{FEATURED.date}</span>
                </div>
                <h4 className="text-lg font-semibold text-white">
                  {FEATURED.title}
                </h4>
                <p className="mt-1 text-sm text-white/80">
                  {FEATURED.description}
                </p>
                <Link
                  href={FEATURED.href}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Ler destaque <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </motion.aside>

          {/* Marcos (centro) — lista vertical sem scrollbar */}
          <div className="lg:col-span-4">
            <div className="mb-10 flex items-end justify-between">
              <div className="text-sm font-medium text-white/80">Marcos</div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>{String(index + 1).padStart(2, "0")}</span>/
                <span>{String(filtered.length).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="relative">
              {/* controles */}
              <div className="pointer-events-none absolute -top-6 right-0 z-10 flex gap-2">
                <button
                  onClick={() => step(-1)}
                  aria-label="Anterior"
                  className="pointer-events-auto rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Próximo"
                  className="pointer-events-auto rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* viewport (trava a rolagem da página fora dele) */}
              <div
                ref={viewportRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                role="region"
                aria-label="Marcos de política nacional (use a rolagem/teclas para navegar)"
                className="overflow-hidden"
                style={{ maxHeight: `${MAX_H}px` }}
              >
                {/* trilho */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${GAP}px`,
                    transform: `translateY(-${offset}px)`,
                    transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {filtered.map((ev, i) => (
                      <EventCard
                        key={`${ev.href}-${i}`}
                        item={ev}
                        measureRef={i === 0 ? firstRef : null}
                      />
                    ))}

                    {filtered.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60"
                      >
                        Nenhum resultado. Ajuste os filtros ou a busca.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* fade quando há mais conteúdo abaixo */}
              {index < maxIndex && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent" />
              )}
            </div>
          </div>

          {/* Eixos / Filtros (direita) */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h5 className="text-lg font-semibold text-white">Eixos</h5>
                <BookOpen className="h-5 w-5 text-white/70" />
              </div>

              <div className="flex flex-wrap gap-2">
                {AXES.map((a) => (
                  <AxisChip
                    key={a.key}
                    active={axis === a.key}
                    onClick={() => setAxis(a.key)}
                  >
                    {a.label}
                  </AxisChip>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                <h6 className="text-sm font-semibold text-white">Notas</h6>
                <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                  <li>• Seleções curadas com fontes verificadas.</li>
                  <li>• Resumos objetivos para leitura rápida.</li>
                  <li>• Aprofunde-se nas páginas das análises.</li>
                </ul>

                <div className="mt-4 text-right">
                  <Link
                    href="/politica-nacional/metodologia"
                    className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white"
                  >
                    Metodologia <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Busca rápida opcional */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <label htmlFor="pn-busca" className="text-xs font-medium text-white/70">
                Busca rápida
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Filter className="h-4 w-4 text-white/60" />
                <input
                  id="pn-busca"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar marcos…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Rodapé curto */}
        <p className="mt-8 text-center text-xs text-white/50">
          Esta é uma prévia editorial da área de Política Nacional. Consulte as páginas dedicadas para leituras completas e referências.
        </p>
      </motion.div>
    </section>
  );
}
