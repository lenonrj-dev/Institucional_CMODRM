"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  BarChart3,
  Database,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ClipboardList,
  FileText,
  HandCoins,
  Landmark,
  Newspaper,
  ImageIcon,
} from "lucide-react";
import type { AccessContent } from "../../../lib/content-types";

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const RESOURCE_ICON_MAP = {
  clipboard: ClipboardList,
  file: FileText,
  coins: HandCoins,
  landmark: Landmark,
  newspaper: Newspaper,
  image: ImageIcon,
} as const;

const STEP_ICON_MAP = {
  search: Search,
  check: CheckCircle2,
  shield: ShieldCheck,
} as const;

type AccessLandingProps = {
  content: AccessContent;
};

export default function AccessLanding({ content }: AccessLandingProps) {
  const {
    hero,
    resources,
    operations,
    rights,
    transparency,
    datasets,
    quickSteps,
    faq,
    contact,
    initialLimit,
  } = content;

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState(hero.filters[0] ?? "Todos");
  const [limit, setLimit] = useState(initialLimit);

  const items = useMemo(() => {
    let arr = resources.cards.slice();
    if (filter !== "Todos") arr = arr.filter((i) => i.tag === filter);
    const term = q.trim().toLowerCase();
    if (term) {
      arr = arr.filter(
        (i) => (i.title + " " + i.description + " " + i.tag).toLowerCase().includes(term)
      );
    }
    return arr;
  }, [q, filter, resources.cards]);

  const visible = filter === "Todos" && !q ? items.slice(0, limit) : items;

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <ShieldCheck className="h-4 w-4" />
              {hero.label}
            </div>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{hero.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  placeholder={hero.searchPlaceholder}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-white/50">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {hero.filterLabel}
                </span>
                {hero.filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setLimit(initialLimit);
                    }}
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

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
              <h3 className="text-lg font-semibold text-white">{operations.howItWorksTitle}</h3>
              <ol className="mt-2 space-y-2 text-sm text-white/70">
                {operations.howItWorksSteps.map((step, idx) => (
                  <li key={step.title}>
                    <strong>{`${idx + 1}. ${step.title}`}</strong> {step.detail}
                  </li>
                ))}
              </ol>
              <Link
                href={operations.cta.href}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                {operations.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{rights.title}</h4>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-white/70">
                {rights.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-2 text-right">
                <Link href={rights.policyLink.href} className="text-xs text-white/60 underline-offset-2 hover:underline">
                  {rights.policyLink.label}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RESULTADOS */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-3"
        >
          {visible.map((it, i) => {
            const Icon = RESOURCE_ICON_MAP[it.icon];
            return (
              <motion.article
                key={`${it.title}-${i}`}
                variants={fadeUp}
                className="grid grid-cols-[44px,1fr,auto] items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 sm:gap-4 sm:p-4"
              >
                <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{it.tag}</div>
                  <h3 className="text-base font-semibold text-white/90">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{it.description}</p>
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
            );
          })}
        </motion.div>

        {filter === "Todos" && !q && limit < items.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setLimit((n) => n + initialLimit)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Ver mais <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        <section className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <BarChart3 className="h-4 w-4" />
            {transparency.heading}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {transparency.reports.map((report, idx) => (
              <motion.article
                key={`${report.title}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={report.cover} alt={report.title} fill className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
                </div>
                <div className="p-4 pb-14">
                  <h4 className="text-base font-semibold text-white/90">{report.title}</h4>
                  <p className="mt-1 text-sm text-white/70">{report.description}</p>
                </div>
                <Link
                  href={report.href}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Abrir <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Database className="h-4 w-4" />
            {datasets.heading}
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {datasets.items.map((dataset) => (
              <div key={dataset.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                <div>
                  <div className="text-sm font-medium text-white">{dataset.title}</div>
                  <div className="text-xs text-white/60">
                    {datasets.label} {dataset.type}
                  </div>
                </div>
                <Link
                  href={dataset.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                >
                  Baixar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickSteps.map((step) => {
            const Icon = STEP_ICON_MAP[step.icon];
            return (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="inline-flex items-center gap-2 text-white/80">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{step.title}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{step.text}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <HelpCircle className="h-4 w-4" />
            {faq.heading}
          </div>
          <div className="space-y-2">
            {faq.items.map((item) => (
              <Faq key={item.q} {...item} />
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
              </div>
              <p className="mt-1 text-sm text-white/70">{contact.description}</p>
            </div>
            <Link
              href={contact.ctaHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              {contact.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </motion.div>
    </section>
  );
}

type FaqItem = {
  q: string;
  a: string;
};

function Faq({ q, a }: FaqItem) {
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
