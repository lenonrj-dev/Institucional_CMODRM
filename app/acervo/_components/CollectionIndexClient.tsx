"use client";

// Componente reutilizável para páginas de índice das coleções.
// Inclui: busca, filtros (tags e década), cards, e rolagem só no container.

import { useEffect, useMemo, useRef, useState, memo, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Tags, Calendar, ChevronUp, ChevronDown, MapPin, ArrowRight } from "lucide-react";
import { COLLECTION_META, type AcervoItem, type CollectionKey } from "../api";

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

type CardProps = {
  item: AcervoItem;
  measureRef?: ((el: HTMLElement | null) => void) | RefObject<HTMLElement | null>;
};
type CollectionIndexProps = { collectionKey: CollectionKey; initialItems: AcervoItem[] };

function decadeOf(dateStr) {
  const y = Number((dateStr || "").slice(0, 4));
  if (!y || Number.isNaN(y)) return "—";
  const d = Math.floor(y / 10) * 10;
  return `${d}s`;
}

const Card = memo(function Card({ item, measureRef }: CardProps) {
  return (
    <motion.article
      ref={measureRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:col-span-3">
          <Image src={item.cover} alt={item.title} fill className="object-cover" sizes="(min-width:1024px) 18vw, 50vw" />
        </div>

        <div className="sm:col-span-9">
          <div className="mb-1 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">
              {COLLECTION_META[item.collection]?.typeLabel || "Item"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {item.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {item.location}
            </span>
          </div>

          <h3 className="text-base font-semibold text-white sm:text-lg">{item.title}</h3>
          <p className="mt-1 text-sm text-white/70">{item.summary}</p>

          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-white/60">
            {item.tags.map((t) => (
              <span key={t} className="rounded border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
            ))}
          </div>

          <div className="mt-3">
            <Link
              href={`/acervo/${item.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Ver item <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default function CollectionIndexClient({ collectionKey, initialItems }: CollectionIndexProps) {
  const meta = COLLECTION_META[collectionKey] || { label: "Acervo", typeLabel: "Item" };

  const [q, setQ] = useState("");
  const [deb, setDeb] = useState("");
  const [picked, setPicked] = useState([]);
  const [decade, setDecade] = useState("Todas");

  // ===== scroll/virtual list =====
  const viewportRef = useRef(null);
  const firstRef = useRef(null);
  const [cardH, setCardH] = useState(0);
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const GAP = 12;
  const MAX_H = 560;

  useEffect(() => {
    const t = setTimeout(() => setDeb(q.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [q]);

  // Tags e décadas dinâmicas com base nos itens
  const allTags = useMemo<string[]>(() => {
    const s = new Set<string>();
    initialItems.forEach((it) => it.tags?.forEach?.((t) => s.add(t)));
    return Array.from(s).sort();
  }, [initialItems]);

  const allDecades = useMemo<string[]>(() => {
    const s = new Set<string>();
    initialItems.forEach((it) => s.add(decadeOf(it.date)));
    return ["Todas", ...Array.from(s).filter((d) => d !== "—").sort()];
  }, [initialItems]);

  const filtered = useMemo(() => {
    let arr = initialItems.slice();
    if (picked.length) arr = arr.filter((i) => picked.every((t) => i.tags.includes(t)));
    if (decade !== "Todas") arr = arr.filter((i) => decadeOf(i.date) === decade);
    if (deb) {
      arr = arr.filter((i) =>
        `${i.title} ${i.summary} ${i.tags.join(" ")}`.toLowerCase().includes(deb)
      );
    }
    return arr;
  }, [deb, picked, decade, initialItems]);

  const recalc = () => {
    const v = viewportRef.current;
    const c = firstRef.current;
    const vh = v?.clientHeight ?? MAX_H;
    let ch = c?.offsetHeight;
    if (!ch) ch = cardH || 160;
    const pv = Math.max(1, Math.floor((vh + GAP) / (ch + GAP)));
    setCardH(ch);
    setPerView(pv);
    setIndex((i) => Math.max(0, Math.min(i, Math.max(0, filtered.length - pv))));
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
  }, [deb, picked.length, decade, filtered.length]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const offset = index * (cardH + GAP);
  const step = (d) => setIndex((i) => Math.max(0, Math.min(i + d, maxIndex)));

  const onWheel = (e) => {
    const dy = e.deltaY;
    if (Math.abs(dy) < 6) return;
    e.preventDefault();
    step(dy > 0 ? 1 : -1);
  };

  const toggleTag = (t) =>
    setPicked((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            {meta.typeLabel}
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {meta.label}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Explore os itens desta coleção. Use a busca e os filtros para refinar os resultados.
          </p>
        </header>

        {/* Busca + Filtros */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <label htmlFor="col-search" className="sr-only">Buscar</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  id="col-search"
                  placeholder="Buscar por título, tag…"
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
                  value={decade}
                  onChange={(e) => setDecade(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {allDecades.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-white/60" />
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 6).map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      aria-pressed={picked.includes(t)}
                      className={
                        "rounded-lg border px-2.5 py-1.5 text-xs transition " +
                        (picked.includes(t)
                          ? "border-white/20 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista (rolagem só no container) */}
          <div className="relative mt-4">
            <div className="pointer-events-none absolute -top-8 right-0 z-10 flex gap-2">
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

            <div
              ref={viewportRef}
              onWheel={(e) => {
                const dy = e.deltaY;
                if (Math.abs(dy) < 6) return;
                e.preventDefault();
                step(dy > 0 ? 1 : -1);
              }}
              role="region"
              aria-label={`${meta.label} — use a rolagem/teclas para navegar`}
              tabIndex={0}
              className="overflow-hidden outline-none"
              style={{ maxHeight: `${MAX_H}px` }}
            >
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
                    <Card key={it.id} item={it} measureRef={idx === 0 ? firstRef : null} />
                  ))}

                  {filtered.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60"
                    >
                      Nenhum resultado. Ajuste filtros ou termos.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
