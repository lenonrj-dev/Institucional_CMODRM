"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Tags,
  Calendar,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  MapPin,
} from "lucide-react";
import type { AcervoContent } from "../../../lib/content-types";

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

type HeroItem = AcervoContent["hero"]["items"][number];

const ResultItem = memo(function ResultItem({
  item,
  measureRef,
}: {
  item: HeroItem;
  measureRef: any;
}) {
  return (
    <motion.article
      ref={measureRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 sm:p-5"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
            {item.type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1">
            <MapPin className="h-3.5 w-3.5" />
            {item.origin}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {item.date}
          </span>
        </div>
        <h4 className="text-base font-semibold text-white sm:text-lg">{item.title}</h4>
        <div className="flex flex-wrap gap-1.5 text-[11px] text-white/70">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white cursor-pointer transition hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          Ver item <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
});

type AcervoHeroProps = {
  content: AcervoContent["hero"];
};

export default function AcervoHero({ content }: AcervoHeroProps) {
  const { items, filters, searchPlaceholder, searchLabel, emptyStateMessage } = content;
  const { types, origins, tags } = filters;

  const [q, setQ] = useState("");
  const [deb, setDeb] = useState("");
  const [type, setType] = useState("Todos");
  const [origin, setOrigin] = useState("Todos");
  const [picked, setPicked] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const firstRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef(1);
  const [cardH, setCardH] = useState(0);
  const GAP = 16;
  const MAX_H = 600;

  useEffect(() => {
    const t = setTimeout(() => setDeb(q.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    let arr = items.slice();
    if (type !== "Todos") arr = arr.filter((i) => i.type === type);
    if (origin !== "Todos") arr = arr.filter((i) => i.origin === origin);
    if (picked.length) arr = arr.filter((i) => picked.every((t) => i.tags.includes(t)));
    if (deb) arr = arr.filter((i) => (i.title + " " + i.tags.join(" ")).toLowerCase().includes(deb));
    return arr;
  }, [deb, type, origin, picked, items]);

  const recalc = () => {
    const v = viewportRef.current;
    const c = firstRef.current;
    const list = listRef.current;
    const vh = v?.clientHeight ?? MAX_H;
    let ch = c?.offsetHeight;
    if (!ch) ch = cardH || 180;
    const listW = list?.clientWidth ?? 0;
    const cardW = c?.clientWidth ?? 0;
    const columns = cardW ? Math.max(1, Math.floor((listW + GAP) / (cardW + GAP))) : 1;
    columnsRef.current = columns;
    const rowsPerView = Math.max(1, Math.floor((vh + GAP) / (ch + GAP)));
    setCardH(ch);
    setPerView(rowsPerView);
    const rows = Math.ceil(filtered.length / columns);
    const max = Math.max(0, rows - rowsPerView);
    setIndex((i) => Math.max(0, Math.min(i, max)));
  };

  useEffect(() => {
    recalc();
    const onR = () => recalc();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  useEffect(() => {
    setIndex(0);
    const t = setTimeout(recalc, 0);
    return () => clearTimeout(t);
  }, [deb, type, origin, picked, filtered.length]);

  const columns = columnsRef.current || 1;
  const rowCount = Math.ceil(filtered.length / columns);
  const maxIndex = Math.max(0, rowCount - perView);
  const offset = index * (cardH + GAP);
  const step = (d: number) => setIndex((i) => Math.max(0, Math.min(i + d, maxIndex)));

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const dy = e.deltaY;
    if (Math.abs(dy) < 6) return;
    step(dy > 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    } else if (e.key === " ") {
      e.preventDefault();
      step(1);
    }
  };

  const toggleTag = (t: string) =>
    setPicked((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));

  const clearFilters = () => {
    setQ("");
    setType("Todos");
    setOrigin("Todos");
    setPicked([]);
  };

  const fundStart = tags.indexOf("Fundos");
  const topicTags = fundStart >= 0 ? tags.slice(0, fundStart) : tags;
  const fundTags = fundStart >= 0 ? tags.slice(fundStart) : [];

  const renderTagButton = (t: string) => (
    <button
      key={t}
      onClick={() => toggleTag(t)}
      aria-pressed={picked.includes(t)}
      className={
        "rounded-full border px-3 py-2 text-xs cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 " +
        (picked.includes(t)
          ? "border-white/30 bg-white/20 text-white"
          : "border-white/10 bg-black/40 text-white/70 hover:border-white/20 hover:bg-white/10")
      }
    >
      {t}
    </button>
  );

  const filtersPanel = (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
          <Filter className="h-3.5 w-3.5" />
          Tipos
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-11 w-full rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
          <MapPin className="h-3.5 w-3.5" />
          Localidade
        </div>
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="h-11 w-full rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          {origins.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
          <Tags className="h-3.5 w-3.5" />
          Temas
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {topicTags.map((t) => renderTagButton(t))}
        </div>
      </div>

      {fundTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
            <Tags className="h-3.5 w-3.5" />
            Fundos
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {fundTags.map((t) => renderTagButton(t))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative w-full overflow-x-hidden bg-black py-10 sm:py-14 lg:py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-white/50">Banco de Memoria</p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">Acervo</h1>
              <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                Busque por temas, tipos e locais para acessar o acervo completo.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white cursor-pointer transition hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
              >
                Limpar filtros
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/50 cursor-not-allowed"
              >
                Ordenar
              </button>
              <a
                href="#acervo-filters"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-white cursor-pointer transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 lg:hidden"
              >
                Abrir filtros
              </a>
            </div>
          </header>

          <div className="mt-6">
            <label htmlFor="acervo-search" className="sr-only">
              {searchLabel}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                id="acervo-search"
                placeholder={searchPlaceholder}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/50 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="min-w-0 lg:col-span-4 xl:col-span-3">
              <details id="acervo-filters" className="rounded-2xl border border-white/10 bg-white/5 p-4 lg:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white">
                  <span>Filtros</span>
                  <Filter className="h-4 w-4 text-white/60" />
                </summary>
                <div className="mt-4 space-y-6">{filtersPanel}</div>
              </details>

              <div className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">Filtros</div>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs text-white/60 cursor-pointer transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                    >
                      Limpar
                    </button>
                  </div>
                  <div className="mt-5">{filtersPanel}</div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 lg:col-span-8 xl:col-span-9">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">Resultados</div>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">Itens do acervo</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/70">
                    {filtered.length} itens
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="pointer-events-none absolute -top-10 right-0 z-10 flex gap-2">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Anterior"
                      className="pointer-events-auto rounded-full border border-white/20 bg-black/70 p-2 text-white cursor-pointer transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Proximo"
                      className="pointer-events-auto rounded-full border border-white/20 bg-black/70 p-2 text-white cursor-pointer transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  <div
                    ref={viewportRef}
                    tabIndex={0}
                    onWheel={onWheel}
                    onKeyDown={onKeyDown}
                    role="region"
                    aria-label="Resultados do acervo (navegacao por setas/rolagem)"
                    className="overflow-hidden outline-none"
                    style={{ maxHeight: `${MAX_H}px` }}
                  >
                    <div
                      ref={listRef}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                      style={{
                        transform: `translateY(-${offset}px)`,
                        transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                        willChange: "transform",
                      }}
                    >
                      <AnimatePresence initial={false} mode="popLayout">
                        {filtered.map((it, idx) => (
                          <ResultItem key={it.href} item={it} measureRef={idx === 0 ? firstRef : null} />
                        ))}

                        {filtered.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full rounded-2xl border border-white/10 bg-black/50 p-10 text-center"
                          >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                              <Search className="h-5 w-5 text-white/60" />
                            </div>
                            <p className="mt-4 text-sm text-white/70">{emptyStateMessage}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {index < maxIndex && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
