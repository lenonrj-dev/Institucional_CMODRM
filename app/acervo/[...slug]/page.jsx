"use client";

// app/acervo/[...slug]/page.jsx — Reader dinâmico importando da API local.

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, FileText, Tags as TagsIcon, MapPin, Download, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { COLLECTION_META, getItem, searchItems, relatedFor } from "../api";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const FALLBACK_IMG = "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg";

function Chip({ children }) {
  return <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">{children}</span>;
}
function MetaRow({ icon: Icon, children }) {
  return <div className="inline-flex items-center gap-2 text-sm text-white/70"><Icon className="h-4 w-4" /> {children}</div>;
}

export default function AcervoReaderPage() {
  const params = useParams();
  const [c, s] = Array.isArray(params?.slug) ? params.slug : [null, null];
  const collection = c || "boletins";
  const slug = s || "1952-03";

  let item = getItem(collection, slug);
  if (!item) {
    item = {
      id: `${collection}/${slug}`,
      collection,
      slug,
      title: `${COLLECTION_META[collection]?.typeLabel || "Item"} — ${slug}`,
      date: "—",
      location: "—",
      cover: FALLBACK_IMG,
      tags: ["Em preparação"],
      summary: "Conteúdo em preparação. Este item ainda está sendo digitalizado e descrito.",
      body: ["Estamos trabalhando para disponibilizar a versão digitalizada e a descrição completa deste item do acervo."],
      files: []
    };
  }

  const rel = relatedFor(item, 6);
  const [q, setQ] = useState("");
  const results = useMemo(() => searchItems(q), [q]);
  const colMeta = COLLECTION_META[item.collection] || { label: "Acervo", typeLabel: "Item" };

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-white/60">
          <ol className="flex items-center gap-2">
            <li><Link href="/acervo" className="hover:text-white">Acervo</Link></li>
            <li className="text-white/40">/</li>
            <li><Link href={`/acervo/${item.collection}`} className="hover:text-white">{colMeta.label}</Link></li>
            <li className="text-white/40">/</li>
            <li className="text-white">{item.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <FileText className="h-4 w-4" /> {colMeta.typeLabel}
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{item.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <MetaRow icon={Calendar}>{item.date}</MetaRow>
            <MetaRow icon={MapPin}>{item.location}</MetaRow>
            <MetaRow icon={TagsIcon}>
              <div className="flex flex-wrap gap-1.5">{item.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
            </MetaRow>
          </div>
        </header>

        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
          <div className="relative h-[46vw] max-h-[520px] w-full">
            <Image src={item.cover} alt={item.title} fill sizes="(min-width:1024px) 90vw, 100vw" className="object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Article */}
          <article className="lg:col-span-8">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">Resumo</h2>
              <p className="mt-2 leading-relaxed text-white/80">{item.summary}</p>
            </section>

            <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">Leitura</h2>
              <div className="prose prose-invert mt-2 max-w-none text-white/80">
                {item.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {item.files?.length > 0 && (
              <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-white sm:text-xl">Downloads</h2>
                <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.files.map((f, i) => (
                    <li key={i}>
                      <a href={f.url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
                        <span className="truncate">{f.label}</span>
                        <Download className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <label htmlFor="acervo-q" className="text-xs font-medium text-white/70">Buscar no acervo</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                <Search className="h-4 w-4 text-white/60" />
                <input id="acervo-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por título, tag…" className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none" />
              </div>

              {q && (
                <div className="mt-3 max-h-72 overflow-auto rounded-xl border border-white/10">
                  <ul className="divide-y divide-white/10">
                    {results.map((r) => (
                      <li key={r.id} className="bg-black/40">
                        <Link href={`/acervo/${r.id}`} className="block px-3 py-2 text-sm text-white/80 hover:bg-white/5">
                          <div className="line-clamp-1 font-medium text-white">{r.title}</div>
                          <div className="text-[11px] text-white/60">{COLLECTION_META[r.collection]?.typeLabel} • {r.date}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold text-white">Relacionados</h3>
              <ul className="mt-3 space-y-2">
                {rel.length === 0 && <li className="text-sm text-white/60">Sem itens relacionados.</li>}
                {rel.map((r) => (
                  <li key={r.id}>
                    <Link href={`/acervo/${r.id}`} className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/50 px-3 py-2 hover:bg-black/70">
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-sm font-medium text-white">{r.title}</div>
                        <div className="text-[11px] text-white/60">{COLLECTION_META[r.collection]?.typeLabel} • {r.date}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white/40 group-hover:text-white/70" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-right">
              <Link href={`/acervo/${item.collection}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15">
                <ChevronLeft className="h-4 w-4" /> Voltar para {colMeta.label}
              </Link>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
