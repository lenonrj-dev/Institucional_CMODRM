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

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

// mock rápido com origem (cidade/fundo) para visão geral do acervo
const ITEMS = [
  { title: "Documentos • Volta Redonda", origin: "Volta Redonda", type: "Documento", date: "1952-03-10", tags: ["Documentos","Atas","Greves"], href: "/acervo/volta-redonda/documentos" },
  { title: "Depoimentos • Volta Redonda", origin: "Volta Redonda", type: "Depoimento", date: "1983-11-02", tags: ["Depoimentos","Oral","Lideranças"], href: "/acervo/volta-redonda/depoimentos" },
  { title: "Referência Bibliográfica • Volta Redonda", origin: "Volta Redonda", type: "Bibliografia", date: "1980-01-01", tags: ["Bibliografia","Clipping"], href: "/acervo/volta-redonda/referencia-bibliografica" },
  { title: "Jornais de Época • Volta Redonda", origin: "Volta Redonda", type: "Jornal", date: "1953-07-05", tags: ["Jornais","Greves"], href: "/acervo/volta-redonda/jornais-de-epoca" },
  { title: "Acervo Fotográfico • Volta Redonda", origin: "Volta Redonda", type: "Foto", date: "1948-06-01", tags: ["Fotografia","Cotidiano"], href: "/acervo/volta-redonda/acervo-fotografico" },

  { title: "Documentos • Barra Mansa", origin: "Barra Mansa", type: "Documento", date: "1958-02-09", tags: ["Documentos","Atas"], href: "/acervo/barra-mansa/documentos" },
  { title: "Depoimentos • Barra Mansa", origin: "Barra Mansa", type: "Depoimento", date: "1978-06-15", tags: ["Depoimentos","Oral"], href: "/acervo/barra-mansa/depoimentos" },
  { title: "Referência Bibliográfica • Barra Mansa", origin: "Barra Mansa", type: "Bibliografia", date: "1985-01-01", tags: ["Bibliografia","Clipping"], href: "/acervo/barra-mansa/referencia-bibliografica" },
  { title: "Jornais de Época • Barra Mansa", origin: "Barra Mansa", type: "Jornal", date: "1937-07-17", tags: ["Jornais","Histórico"], href: "/acervo/barra-mansa/jornais-de-epoca" },
  { title: "Acervo Fotográfico • Barra Mansa", origin: "Barra Mansa", type: "Foto", date: "1950-01-01", tags: ["Fotografia","Mobilização"], href: "/acervo/barra-mansa/acervo-fotografico" },

  { title: "Fundos • Const. Civil", origin: "Fundos", type: "Documento", date: "1965-12-20", tags: ["Fundos","Const. Civil"], href: "/acervo/fundos/const-civil" },
  { title: "Fundos • Metalúrgico", origin: "Fundos", type: "Documento", date: "1960-06-01", tags: ["Fundos","Metalúrgico"], href: "/acervo/fundos/metalurgico" },
  { title: "Fundos • Mov. Operário", origin: "Fundos", type: "Jornal", date: "1979-04-20", tags: ["Fundos","Mov. Operário","Cartazes"], href: "/acervo/fundos/mov-operario" },
  { title: "Fundos • Dom Waldyr", origin: "Fundos", type: "Bibliografia", date: "1988-10-05", tags: ["Fundos","Dom Waldyr"], href: "/acervo/fundos/dom-waldyr" },
];

const TYPES = ["Todos","Documento","Depoimento","Bibliografia","Jornal","Foto"];
const ORIGINS = ["Todos", "Volta Redonda", "Barra Mansa", "Fundos"];
const TAGS = [
  "Documentos","Atas","Greves","Depoimentos","Oral","Lideranças",
  "Bibliografia","Clipping","Jornais","Histórico","Fotografia","Cotidiano","Mobilização",
  "Fundos","Const. Civil","Metalúrgico","Mov. Operário","Dom Waldyr"
];

const ResultItem = memo(function ResultItem({
  item,
  measureRef,
}: {
  item: (typeof ITEMS)[number];
  measureRef: any;
}) {
  return (
    <motion.article
      ref={measureRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
    >
      <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-white/60">
        <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">{item.type}</span>
        <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-black/30 px-2 py-0.5">
          <MapPin className="h-3.5 w-3.5" />
          {item.origin}
        </span>
        <Calendar className="h-3.5 w-3.5" />
        <span>{item.date}</span>
      </div>
      <h4 className="text-base font-semibold text-white/90">{item.title}</h4>
      <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-white/60">
        {item.tags.map((t) => (
          <span key={t} className="rounded border border-white/10 bg-white/5 px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
        >
          Ver item <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
});

export default function AcervoSearch() {
  const [q, setQ] = useState("");
  const [deb, setDeb] = useState("");
  const [type, setType] = useState("Todos");
  const [origin, setOrigin] = useState("Todos");
  const [picked, setPicked] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const firstRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardH, setCardH] = useState(0);
  const GAP = 12;
  const MAX_H = 520;

  // ===== scroll lock enquanto o mouse/touch está NO container =====
  const [lockPageScroll, setLockPageScroll] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!lockPageScroll) return;

    const prevent = (e: WheelEvent | TouchEvent | KeyboardEvent) => {
      e.preventDefault();
    };
    const preventKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent as any, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", prevent as any);
      window.removeEventListener("touchmove", prevent as any);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [lockPageScroll]);

  const handleMouseEnter = () => {
    setLockPageScroll(true);
    viewportRef.current?.focus();
  };
  const handleMouseLeave = () => setLockPageScroll(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setLockPageScroll(true);
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const y = e.touches[0].clientY;
    const dy = touchStartY.current - y;
    if (Math.abs(dy) > 6) {
      e.preventDefault();
      step(dy > 0 ? 1 : -1);
      touchStartY.current = y;
    }
  };
  const handleTouchEnd = () => setLockPageScroll(false);

  // ===== debounce da busca =====
  useEffect(() => {
    const t = setTimeout(() => setDeb(q.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [q]);

  // ===== filtragem =====
  const filtered = useMemo(() => {
    let arr = ITEMS.slice();
    if (type !== "Todos") arr = arr.filter((i) => i.type === type);
    if (origin !== "Todos") arr = arr.filter((i) => i.origin === origin);
    if (picked.length) arr = arr.filter((i) => picked.every((t) => i.tags.includes(t)));
    if (deb) arr = arr.filter((i) => (i.title + " " + i.tags.join(" ")).toLowerCase().includes(deb));
    return arr;
  }, [deb, type, origin, picked]);

  // ===== cálculo de layout =====
  const recalc = () => {
    const v = viewportRef.current;
    const c = firstRef.current;
    const vh = v?.clientHeight ?? MAX_H;
    let ch = c?.offsetHeight;
    if (!ch) ch = cardH || 150;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIndex(0);
    const t = setTimeout(recalc, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deb, type, origin, picked, filtered.length]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const offset = index * (cardH + GAP);
  const step = (d: number) => setIndex((i) => Math.max(0, Math.min(i + d, maxIndex)));

  // ===== rolagem e teclado no viewport =====
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const dy = e.deltaY;
    if (Math.abs(dy) < 6) return;
    e.preventDefault();
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

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* barra de busca + filtros */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <label htmlFor="acervo-search" className="sr-only">
                Buscar
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  id="acervo-search"
                  placeholder="Buscar por título, tag ou cidade…"
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/60" />
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {ORIGINS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-white/60" />
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
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

          {/* resultados (lista vertical sem scrollbar) */}
          <div className="relative mt-4">
            <div className="pointer-events-none absolute -top-8 right-0 z-10 flex gap-2">
              <button
                onClick={() => step(-1)}
                aria-label="Anterior"
                className="pointer-events-auto rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Próximo"
                className="pointer-events-auto rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={viewportRef}
              tabIndex={0}
              onWheel={onWheel}
              onKeyDown={onKeyDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              role="region"
              aria-label="Resultados do acervo (navegação por setas/rolagem)"
              className="overflow-hidden outline-none"
              style={{ maxHeight: "520px" }}
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
                    <ResultItem key={it.href} item={it} measureRef={idx === 0 ? firstRef : null} />
                  ))}

                  {filtered.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60"
                    >
                      Nenhum resultado para sua busca. Ajuste filtros ou termos.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {index < maxIndex && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent" />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
