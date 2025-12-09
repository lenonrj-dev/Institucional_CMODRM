"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Landmark,
  ShieldCheck,
  Filter,
  Search,
  CalendarDays,
  Compass,
  ArrowRight,
  FileText,
  ScrollText,
  HeartPulse,
  Users,
  GraduationCap,
  Building2,
  Scale,
  Hammer,
  ChevronLeft,
  ChevronRight,
  History,
  MapPin,
  HelpCircle,
  CheckCircle2,
  BarChart3,
  LayoutGrid,
  List,
} from "lucide-react";
import type { SiteContent } from "../../api/content/route";

/* ---------- animações ---------- */
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

type PoliticsPageContent = SiteContent["home"]["politics"];

type StatProps = { icon: any; label: string; value: number | string };
const Stat = ({ icon: Icon, label, value }: StatProps) => (
  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
    <Icon className="h-4.5 w-4.5 text-white/80" />
    <div>
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/60">{label}</div>
    </div>
  </div>
);

type BadgeProps = { icon: any; label: string };
const Badge = ({ icon: Icon, label }: BadgeProps) => (
  <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </span>
);

type CardProps = { title: string; desc: string; href: string; tag: string; cover: string };
const DestaqueCard = ({ title, desc, href, tag, cover }: CardProps) => (
  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
    <div className="relative h-36 w-full">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
        sizes="(min-width:1024px) 320px, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
    <div className="flex flex-1 flex-col gap-2 p-4">
      <Badge icon={Compass} label={tag} />
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{desc}</p>
      <div className="mt-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Ver mais <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  </div>
);

type Diretriz = {
  eixo: string;
  decade: string;
  title: string;
  desc: string;
  href: string;
};
type Instrumento = { title: string; tag: string; href: string; cover: string };
type Destaque = { title: string; desc: string; href: string; cover: string };

function usePerView(CARD_W: number, GAP: number, total: number) {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(1);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const recalc = () => {
      const w = viewportRef.current?.clientWidth || CARD_W;
      const pv = Math.max(1, Math.floor((w + GAP) / (CARD_W + GAP)));
      setPerView(pv);
      setIdx((i) => Math.max(0, Math.min(i, Math.max(0, total - pv))));
    };
    recalc();
    const onR = () => recalc();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [total, CARD_W, GAP]);

  return { idx, setIdx, perView, viewportRef };
}

type Props = { content: PoliticsPageContent };

export default function PoliticaLanding({ content }: Props) {
  const sections = [
    { id: "diretrizes", label: "Diretrizes" },
    { id: "destaques", label: "Destaques" },
    { id: "instrumentos", label: "Instrumentos" },
    { id: "linha-do-tempo", label: "Linha do tempo" },
    { id: "implementacao", label: "Implementação" },
    { id: "faq", label: "FAQ" },
  ];

  const axesMap = {
    trabalho: Hammer,
    previdencia: ShieldCheck,
    educacao: GraduationCap,
    saude: HeartPulse,
    direitos: Scale,
  };

  const [q, setQ] = useState("");
  const [eixo, setEixo] = useState("Todos");
  const [decade, setDecade] = useState("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");

  const DIRETRIZES: Diretriz[] = content.events.map((ev) => ({
    eixo: ev.axis[0] || "trabalho",
    decade: "Todos",
    title: ev.title,
    desc: ev.summary,
    href: ev.href,
  }));
  const INSTRUMENTOS: Instrumento[] = [
    { title: content.featured.title, tag: content.featured.date, href: content.featured.href, cover: content.featured.cover },
  ];
  const DESTAQUES: Destaque[] = content.events.slice(0, 3).map((ev) => ({
    title: ev.title,
    desc: ev.summary,
    href: ev.href,
    cover: content.featured.cover,
  }));

  const filtered = useMemo(() => {
    let arr = DIRETRIZES.slice();
    if (eixo !== "Todos") arr = arr.filter((d) => d.eixo === eixo);
    if (decade !== "Todos") arr = arr.filter((d) => d.decade === decade);
    const term = q.trim().toLowerCase();
    if (term) arr = arr.filter((d) => (d.title + " " + d.desc).toLowerCase().includes(term));
    return arr;
  }, [q, eixo, decade]);

  /* ----- carrossel Destaques (sem scrollbar) ----- */
  const CARD_W = 320,
    GAP = 16;
  const { idx, setIdx, perView, viewportRef } = usePerView(CARD_W, GAP, DESTAQUES.length);
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
            {content.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {content.description}
          </p>

          {/* indicadores rápidos */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <Stat icon={ShieldCheck} label="Eixos" value={content.axes.length} />
            <Stat icon={FileText} label="Diretrizes" value={DIRETRIZES.length} />
            <Stat icon={ScrollText} label="Instrumentos" value={INSTRUMENTOS.length} />
            <Stat icon={CalendarDays} label="Períodos" value={"—"} />
            <Stat icon={BarChart3} label="Regiões" value={"—"} />
            <Stat icon={Compass} label="Destaques" value={DESTAQUES.length} />
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
            <select
              value={eixo}
              onChange={(e) => setEixo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="Todos">Todos os eixos</option>
              {content.axes.map((ax) => (
                <option key={ax.key} value={ax.key}>
                  {ax.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <select
              value={decade}
              onChange={(e) => setDecade(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="Todos">Todos os períodos</option>
              {["2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DIRETRIZES */}
        <section id="diretrizes" className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <FileText className="h-4 w-4" />
              Diretrizes
            </div>
            <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setView("grid")}
                className={[
                  "rounded-md px-3 py-1 text-xs",
                  view === "grid" ? "bg-white/10 text-white" : "text-white/70",
                ].join(" ")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={[
                  "rounded-md px-3 py-1 text-xs",
                  view === "list" ? "bg-white/10 text-white" : "text-white/70",
                ].join(" ")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((d, i) => (
                <motion.div key={`${d.title}-${i}`} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Badge icon={axesMap[d.eixo] || Hammer} label={d.eixo} />
                    <Badge icon={History} label={d.decade} />
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-white">{d.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{d.desc}</p>
                  <Link
                    href={d.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-white hover:text-white/80"
                  >
                    Ler diretriz <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map((d, i) => (
                <div key={`${d.title}-${i}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Badge icon={axesMap[d.eixo] || Hammer} label={d.eixo} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Badge icon={History} label={d.decade} />
                    </div>
                    <h3 className="text-base font-semibold text-white">{d.title}</h3>
                    <p className="text-sm text-white/70">{d.desc}</p>
                  </div>
                  <Link href={d.href} className="text-sm text-white underline-offset-2 hover:underline">
                    Ler
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DESTAQUES */}
        <section id="destaques" className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Compass className="h-4 w-4" />
            Destaques
          </div>

          <div className="relative">
            <div
              ref={viewportRef}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div
                style={{
                  display: "flex",
                  gap: `${GAP}px`,
                  transform: `translateX(-${offset}px)`,
                  transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {DESTAQUES.map((d, i) => (
                  <div key={`${d.title}-${i}`} style={{ width: `${CARD_W}px`, minWidth: `${CARD_W}px` }}>
                    <DestaqueCard title={d.title} desc={d.desc} href={d.href} tag="Destaque" cover={d.cover} />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center pl-1">
              <button
                onClick={() => setIdx((v) => Math.max(0, v - 1))}
                aria-label="Anterior"
                className="rounded-lg border border-white/10 bg-black/60 p-2 text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <button
                onClick={() => setIdx((v) => Math.min(maxIndex, v + 1))}
                aria-label="Próximo"
                className="rounded-lg border border-white/10 bg-black/60 p-2 text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* INSTRUMENTOS */}
        <section id="instrumentos" className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <ScrollText className="h-4 w-4" />
            Instrumentos
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INSTRUMENTOS.map((inst, i) => (
              <div key={`${inst.title}-${i}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Badge icon={FileText} label={inst.tag} />
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">{inst.title}</h3>
                <Link
                  href={inst.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-white hover:text-white/80"
                >
                  Ver documento <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* LINHA DO TEMPO (simples, usando featured + meta) */}
        <section id="linha-do-tempo" className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <History className="h-4 w-4" />
            Linha do tempo
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/70">Consulte as páginas de análise para detalhes cronológicos.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
              {content.events.map((ev) => (
                <span key={ev.href} className="rounded-lg border border-white/10 bg-black/40 px-2 py-1">
                  {ev.date} — {ev.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Implementação (placeholder com CTA) */}
        <section id="implementacao" className="mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              Implementação regional e indicadores (conteúdo dinâmico a ser ligado à API real).
            </div>
          </div>
        </section>

        {/* FAQ simples */}
        <section id="faq">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {[
              { q: "Como navegar pelas diretrizes?", a: "Use filtros por eixo/período e abra as páginas de análise." },
              { q: "Onde encontro os documentos integrais?", a: "Nos links de instrumentos e diretrizes; futuramente ligados à base oficial." },
            ].map((x, i) => (
              <details key={i} className="group open:bg-white/5">
                <summary className="cursor-pointer list-none px-5 py-4 text-white/90 hover:bg-white/5">
                  <span className="text-sm font-medium">{x.q}</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-white/70">{x.a}</div>
              </details>
            ))}
          </div>
        </section>
      </motion.div>
    </section>
  );
}
