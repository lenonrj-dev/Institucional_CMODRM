"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Newspaper, Search, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

// MOCK — troque pela sua fonte/API real quando quiser
const ALL = [
  {
    slug: "o-operario-1913-05-12",
    title: "O Operário",
    date: "12/05/1913",
    decade: "1910s",
    cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    summary: "Organização de base e pautas salariais.",
  },
  {
    slug: "folha-trabalhador-1921-09-03",
    title: "Folha do Trabalhador",
    date: "03/09/1921",
    decade: "1920s",
    cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    summary: "Mobilizações e comissões.",
  },
  {
    slug: "gazeta-sindical-1932-02-28",
    title: "Gazeta Sindical",
    date: "28/02/1932",
    decade: "1930s",
    cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    summary: "Greves e negociação coletiva.",
  },
  {
    slug: "o-dia-do-povo-1937-07-17",
    title: "O Dia do Povo",
    date: "17/07/1937",
    decade: "1930s",
    cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    summary: "Marchas, assembleias e cotidiano.",
  },
];

const DECADES = ["Todos", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s"];

export default function JornaisLanding() {
  const [q, setQ] = useState("");
  const [dec, setDec] = useState("Todos");

  const items = useMemo(() => {
    let arr = ALL.slice();
    if (dec !== "Todos") arr = arr.filter((i) => i.decade === dec);
    const term = q.trim().toLowerCase();
    if (term)
      arr = arr.filter((i) =>
        (i.title + " " + i.summary + " " + i.decade).toLowerCase().includes(term)
      );
    return arr;
  }, [q, dec]);

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Newspaper className="h-4 w-4" />
            Jornais de Época
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Uma janela para o passado
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Leia edições digitalizadas em rolagem vertical. Clique em uma capa para abrir o
            leitor e use ↑/↓ para navegar.
          </p>
        </div>

        {/* Busca + filtro por década */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
              <Search className="h-4 w-4 text-white/60" />
              <input
                placeholder="Buscar por título, década ou palavra-chave…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <select
              value={dec}
              onChange={(e) => setDec(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {DECADES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade de edições */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <Link
              key={it.slug}
              href={`/jornais-de-epoca/${it.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={it.cover || "/hero.png"}
                  alt={`${it.title} — capa`}
                  fill
                  sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-3">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{it.date}</span>
                  <span>•</span>
                  <span>{it.decade}</span>
                </div>
                <h3 className="text-base font-semibold text-white/90">{it.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/70">{it.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Rodapé curto */}
        <p className="mt-8 text-center text-xs text-white/50">
          A leitura abre em nova página com rolagem vertical padrão e índice por páginas.
        </p>
      </motion.div>
    </section>
  );
}
