"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  FolderOpen,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

/* ========= framer variants ========= */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

/* ========= filtros + dados (exemplos) ========= */
const FILTERS = [
  { key: "todas", label: "Todas" },
  { key: "atas", label: "Atas" },
  { key: "relatorios", label: "Relatórios" },
  { key: "contratos", label: "Contratos" },
  { key: "despesas", label: "Despesas" },
  { key: "convenios", label: "Convênios" },
  { key: "boletins", label: "Boletins" },
  { key: "imagens", label: "Imagens" },
];

const ITEMS = [
  {
    title: "Atas de Assembleia — 1950–1980",
    description:
      "Deliberações, presença e pautas debatidas em encontros gerais e extraordinários.",
    href: "/acesso-a-informacao/atas-assembleia",
    tags: ["atas"],
  },
  {
    title: "Relatórios de Gestão",
    description:
      "Síntese anual de ações, indicadores e prestação de contas das frentes do sindicato.",
    href: "/acesso-a-informacao/relatorios-gestao",
    tags: ["relatorios", "despesas"],
  },
  {
    title: "Contratos e Parcerias",
    description:
      "Instrumentos firmados com fornecedores e instituições, com objetos e vigências.",
    href: "/acesso-a-informacao/contratos",
    tags: ["contratos", "convenios"],
  },
  {
    title: "Despesas e Custos Operacionais",
    description:
      "Notas, empenhos e categorias de gasto com critérios de classificação.",
    href: "/acesso-a-informacao/despesas",
    tags: ["despesas", "relatorios"],
  },
  {
    title: "Convênios e Termos de Cooperação",
    description:
      "Bases de colaboração, responsabilidades e resultados esperados.",
    href: "/acesso-a-informacao/convenios",
    tags: ["convenios"],
  },
  {
    title: "Boletins e Comunicados Oficiais",
    description:
      "Publicações periódicas com decisões, avisos e orientações à categoria.",
    href: "/acesso-a-informacao/boletins",
    tags: ["boletins"],
  },
  {
    title: "Acervo Fotográfico — Acesso Público",
    description:
      "Conjunto de imagens com termos de uso, créditos e contexto.",
    href: "/acesso-a-informacao/imagens-publicas",
    tags: ["imagens"],
  },
  {
    title: "Política de Transparência e Acesso",
    description:
      "Diretrizes gerais de disponibilização, prazos e canais de atendimento.",
    href: "/acesso-a-informacao/politica",
    tags: [
      "relatorios",
      "contratos",
      "boletins",
      "atas",
      "despesas",
      "convenios",
      "imagens",
    ],
  },
];

/* ========= subcomponentes ========= */
const Chip = memo(function Chip({ active, onClick, children }) {
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

const ResultItem = memo(function ResultItem({ item, measureRef }) {
  return (
    <motion.article
      ref={measureRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <FileText className="h-5 w-5 text-white/80" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-white/90">{item.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{item.description}</p>
          <div className="mt-3">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Saiba mais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ========= util ========= */
function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

/* ========= componente principal ========= */
export default function SixthSection() {
  const [filterKey, setFilterKey] = useState("todas");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  // lista virtualizada sem scrollbar
  const viewportRef = useRef(null);
  const firstCardRef = useRef(null);
  const [cardH, setCardH] = useState(0);
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0); // primeiro item visível
  const GAP = 12; // equivale a space-y-3 (0.75rem)
  const MAX_H = 560; // limite de altura da lista

  // ===== Scroll lock global quando o ponteiro/foco estiver dentro do viewport =====
  const lockActiveRef = useRef(false);
  const forgetStylesRef = useRef({ html: "", body: "" });

  const prevent = (e) => {
    e.preventDefault();
  };
  const blockScrollKeys = (e) => {
    // Bloqueia somente teclas que causam scroll do documento
    const k = e.key;
    if (
      k === " " ||
      k === "Spacebar" ||
      k === "Space" ||
      k === "ArrowDown" ||
      k === "ArrowUp" ||
      k === "PageDown" ||
      k === "PageUp" ||
      k === "Home" ||
      k === "End"
    ) {
      e.preventDefault();
    }
  };
  const enableLock = () => {
    if (lockActiveRef.current) return;
    lockActiveRef.current = true;
    const html = document.documentElement;
    const body = document.body;
    forgetStylesRef.current = {
      html: html.style.overscrollBehavior,
      body: body.style.overflow,
    };
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    window.addEventListener("wheel", prevent, { passive: false, capture: true });
    window.addEventListener("touchmove", prevent, { passive: false, capture: true });
    window.addEventListener("keydown", blockScrollKeys, { passive: false, capture: true });
  };
  const disableLock = () => {
    if (!lockActiveRef.current) return;
    lockActiveRef.current = false;
    const html = document.documentElement;
    const body = document.body;
    html.style.overscrollBehavior = forgetStylesRef.current.html || "";
    body.style.overflow = forgetStylesRef.current.body || "";
    window.removeEventListener("wheel", prevent, { capture: true });
    window.removeEventListener("touchmove", prevent, { capture: true });
    window.removeEventListener("keydown", blockScrollKeys, { capture: true });
  };

  useEffect(() => {
    const v = viewportRef.current;
    if (!v) return;

    const onEnter = () => enableLock();
    const onLeave = () => disableLock();

    v.addEventListener("pointerenter", onEnter);
    v.addEventListener("pointerleave", onLeave);
    v.addEventListener("focusin", onEnter);
    v.addEventListener("focusout", onLeave);
    v.addEventListener("touchstart", onEnter, { passive: true });

    return () => {
      v.removeEventListener("pointerenter", onEnter);
      v.removeEventListener("pointerleave", onLeave);
      v.removeEventListener("focusin", onEnter);
      v.removeEventListener("focusout", onLeave);
      v.removeEventListener("touchstart", onEnter);
      disableLock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce da busca
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  // filtragem
  const filtered = useMemo(() => {
    const q = debounced;
    const base = ITEMS.filter((it) =>
      filterKey === "todas" ? true : it.tags.includes(filterKey)
    );
    if (!q) return base;
    return base.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q)
    );
  }, [debounced, filterKey]);

  // mede altura do card e quantos cabem por viewport
  const recalc = () => {
    const v = viewportRef.current;
    const c = firstCardRef.current;
    if (!v) return;
    const vh = v.clientHeight || MAX_H;
    let ch = cardH;
    if (c) ch = c.offsetHeight; // altura real do componente
    if (!ch) ch = 148; // fallback seguro
    const pv = Math.max(1, Math.floor((vh + GAP) / (ch + GAP)));
    setCardH(ch);
    setPerView(pv);
    // reajusta índice para não passar do fim
    setIndex((i) => clamp(i, 0, Math.max(0, filtered.length - pv)));
  };

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // quando muda filtro/busca ou quantidade, volta ao início e recalcula
  useEffect(() => {
    setIndex(0);
    const t = setTimeout(recalc, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, debounced, filtered.length]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const step = (dir) => setIndex((i) => clamp(i + dir, 0, maxIndex));
  const page = (dir) => setIndex((i) => clamp(i + perView * dir, 0, maxIndex));

  // rolagem do mouse dentro da área — sem mostrar scrollbar
  const onWheel = (e) => {
    // sempre previne o scroll da página quando dentro do viewport
    e.preventDefault();
    // só navega pelos itens quando estiver no filtro "todas"
    if (filterKey !== "todas") return;
    const dy = e.deltaY;
    if (Math.abs(dy) < 8) return;
    step(dy > 0 ? 1 : -1);
  };

  // navegação por teclado
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(maxIndex);
    }
  };

  // deslocamento do trilho
  const offset = index * (cardH + GAP);

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
              <Shield className="h-4 w-4" />
              Acesso à Informação
            </div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Transparência para pesquisa e memória coletiva
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Consulte documentos, políticas e registros do banco de memória. Faça buscas,
              filtre por tema e avance para páginas com o conteúdo completo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/acesso-a-informacao/solicitar"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Solicitar acesso
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/acesso-a-informacao/transparencia-ativa"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              Transparência ativa
            </Link>
          </div>
        </div>

        {/* grid principal */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* coluna esquerda */}
          <div className="lg:col-span-8">
            {/* busca + filtros */}
            <div role="search" aria-label="Busca de Acesso à Informação" className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
              <label htmlFor="ai-search" className="sr-only">
                Buscar por título, tema ou descrição
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  id="ai-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título, tema ou descrição…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-white/50">
                  <Filter className="h-3.5 w-3.5" />
                  Filtros
                </span>
                {FILTERS.map((f) => (
                  <Chip key={f.key} active={filterKey === f.key} onClick={() => setFilterKey(f.key)}>
                    {f.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* lista sem scrollbar: viewport fixo + trilho translateY */}
            <div className="relative mt-6">
              {/* controles (setas) */}
              <div className="pointer-events-none absolute -top-4 right-0 z-10 flex gap-2">
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

              {/* viewport (sem scrollbar) */}
              <div
                ref={viewportRef}
                tabIndex={0}
                onWheel={onWheel}
                onKeyDown={onKeyDown}
                role="region"
                aria-label="Resultados de Acesso à Informação (use as setas para navegar)"
                className="overflow-hidden pr-1"
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
                    {filtered.map((it, idx) => (
                      <ResultItem
                        key={`${it.href}-${idx}`}
                        item={it}
                        // mede a altura do primeiro card visível
                        measureRef={idx === 0 ? firstCardRef : null}
                      />
                    ))}

                    {filtered.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60"
                      >
                        Nenhum resultado para sua busca. Tente outro termo ou limpe os filtros.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* fade de rodapé quando existe mais conteúdo abaixo */}
              {index < maxIndex && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent" />
              )}
            </div>
          </div>

          {/* coluna direita */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h5 className="text-lg font-semibold text-white">Como funciona</h5>
              <ol className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <FolderOpen className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <span><strong>1. Localize o tema</strong> pela busca ou pelos filtros.</span>
                </li>
                <li className="flex gap-2">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <span><strong>2. Acesse a página</strong> do conteúdo desejado.</span>
                </li>
                <li className="flex gap-2">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <span><strong>3. Verifique permissões</strong> e termos de uso quando aplicável.</span>
                </li>
                <li className="flex gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <span><strong>4. Precisa de algo específico?</strong> Envie um pedido de acesso.</span>
                </li>
              </ol>

              <div className="mt-4">
                <Link
                  href="/acesso-a-informacao/solicitar"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Enviar pedido de acesso
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                <h6 className="text-sm font-semibold text-white">Direitos do requerente</h6>
                <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                    <span>Receber orientação sobre onde e como acessar informações.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                    <span>Ser informado sobre a disponibilidade do conteúdo solicitado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                    <span>Obter justificativa em caso de restrição de acesso.</span>
                  </li>
                </ul>

                <div className="mt-3 text-right">
                  <Link
                    href="/acesso-a-informacao/politica"
                    className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white"
                  >
                    Ver política de transparência <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* rodapé curto */}
        <p className="mt-8 text-center text-xs text-white/50">
          Esta é uma visão resumida do Acesso à Informação. O conteúdo completo está nas páginas dedicadas.
        </p>
      </motion.div>
    </section>
  );
}