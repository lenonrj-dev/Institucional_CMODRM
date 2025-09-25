"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// filtros (ajuste como quiser)
const FILTERS = ["Todos", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s"];

// dados ilustrativos — troque por seus jornais/capas reais depois
const ITEMS = [
  { title: "O Operário", date: "12/05/1913", decade: "1910s", description: "Edição dedicada à organização de base e às primeiras pautas salariais.", href: "/jornais-de-epoca/o-operario-1913-05-12", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821799/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_2_fpkf7o.png" },
  { title: "Folha do Trabalhador", date: "03/09/1921", decade: "1920s", description: "Relatos de mobilizações em bairros fabris e formação de comissões.", href: "/jornais-de-epoca/folha-trabalhador-1921-09-03", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png" },
  { title: "Gazeta Sindical", date: "28/02/1932", decade: "1930s", description: "Análise das greves históricas e estratégias de negociação coletiva.", href: "/jornais-de-epoca/gazeta-sindical-1932-02-28", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821783/construcao_da_cia_nestle_1936_t6voez.jpg" },
  { title: "O Dia do Povo", date: "17/07/1937", decade: "1930s", description: "Cobertura de marchas, assembleias e da vida cotidiana nos galpões.", href: "/jornais-de-epoca/o-dia-do-povo-1937-07-17", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Tribuna Operária", date: "22/10/1944", decade: "1940s", description: "Edição especial sobre segurança, saúde e reformas dos locais de trabalho.", href: "/jornais-de-epoca/tribuna-operaria-1944-10-22", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg" },
  { title: "Voz da Fábrica", date: "09/01/1949", decade: "1940s", description: "Crônicas de turno, refeitórios e as novas demandas do pós-guerra.", href: "/jornais-de-epoca/voz-da-fabrica-1949-01-09", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg" },
  { title: "Correio Popular", date: "11/06/1953", decade: "1950s", description: "Editorial sobre custo de vida e tabelas comparativas de preços.", href: "/jornais-de-epoca/correio-popular-1953-06-11", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821733/A_industrializa%C3%A7%C3%A3o_no_Sul_Fluminense_juqrcc.jpg" },
  { title: "Jornal do Metal", date: "30/11/1957", decade: "1950s", description: "Reportagens fotográficas das linhas de montagem e novas tecnologias.", href: "/jornais-de-epoca/jornal-do-metal-1957-11-30", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821738/Manchete_6_de_fevereiro_de_1960_fh5bkv.jpg" },
  { title: "A Voz do Sindicato", date: "04/04/1962", decade: "1960s", description: "Plano de lutas, calendário de assembleias e entrevistas com lideranças.", href: "/jornais-de-epoca/voz-do-sindicato-1962-04-04", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821733/A_industrializa%C3%A7%C3%A3o_no_Sul_Fluminense_juqrcc.jpg" },
  { title: "Boletim do Trabalhador", date: "18/09/1968", decade: "1960s", description: "Cartazes, notas rápidas e uma linha do tempo de conquistas.", href: "/jornais-de-epoca/boletim-trabalhador-1968-09-18", cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821814/Obelisco_em_Homenagem_aos_oper%C3%A1rios_de_Barra_Mansa_inaugurado_em_1_de_Maio_de_1933_doyk04.jpg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

// dimensões do card usadas para o trilho (condizem com Tailwind: w-[15rem] e gap-4)
const CARD_W = 240; // 15rem
const GAP = 16;     // 1rem (gap-4)

export default function FourthSection() {
  const [filter, setFilter] = useState("Todos");
  const [index, setIndex] = useState(0);        // índice do primeiro card visível
  const [perView, setPerView] = useState(1);    // quantos cabem na viewport
  const viewportRef = useRef(null);

  const filtered = useMemo(
    () => (filter === "Todos" ? ITEMS : ITEMS.filter((i) => i.decade === filter)),
    [filter]
  );

  // Recalcula quantos cabem por vez e ajusta o índice
  useEffect(() => {
    const calc = () => {
      const el = viewportRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const pv = Math.max(1, Math.floor((w + GAP) / (CARD_W + GAP))); // aproximação boa
      setPerView(pv);
      setIndex((i) => clamp(i, 0, Math.max(0, filtered.length - pv)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [filtered.length]);

  // ao trocar filtro, volta ao início e recalcula bounds
  useEffect(() => {
    setIndex(0);
  }, [filter]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const stepPx = CARD_W + GAP;
  const offset = index * stepPx;

  const go = (dir) => {
    setIndex((i) => clamp(i + dir, 0, maxIndex));
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
              <Newspaper className="h-4 w-4" />
              Jornais de Época
            </div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Uma janela para o passado
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore edições históricas digitalizadas com leitura agradável em qualquer
              dispositivo. Veja capas, chamadas e contexto — e continue para a leitura
              completa na página dedicada.
            </p>
          </div>

          {/* CTA geral */}
          <Link
            href="/jornais-de-epoca"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Ver todos os jornais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filtros por década */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              variants={fadeUp}
              onClick={() => setFilter(f)}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm transition",
                filter === f
                  ? "border-white/20 bg-white/15 text-white"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Carrossel sem scrollbar (overflow hidden + trilho com translateX) */}
        <div className="relative">
          {/* sombras laterais para foco */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />

          {/* botões (sempre visíveis) */}
          <div className="absolute -left-2 top-1/2 z-10 -translate-y-1/2">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute -right-2 top-1/2 z-10 -translate-y-1/2">
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="rounded-xl border border-white/20 bg-black/70 p-2 text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* viewport sem scrollbar */}
          <div
            ref={viewportRef}
            role="region"
            aria-label="Carrossel de jornais de época"
            className="overflow-hidden pb-2"
          >
            {/* trilho */}
            <div
              style={{
                display: "flex",
                gap: `${GAP}px`,
                transform: `translateX(-${offset}px)`,
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
              }}
            >
              {filtered.map((it, idx) => (
                <motion.article
                  key={`${it.title}-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-[20rem] w-[15rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
                >
                  {/* capa */}
                  <div className="relative h-full w-full">
                    <Image
                      src={it.cover || "/hero.png"}
                      alt={`${it.title} — capa`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      sizes="240px"
                      priority={false}
                    />
                  </div>

                  {/* gradiente/overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                  {/* meta inferior */}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="mb-1 flex items-center gap-2 text-[11px] text-white/70">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{it.date}</span>
                      <span>•</span>
                      <span>{it.decade}</span>
                    </div>
                    <h4 className="line-clamp-2 text-sm font-semibold text-white">
                      {it.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs text-white/70">
                      {it.description}
                    </p>

                    <Link
                      href={it.href}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      Ler edição
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* rodapé curto da seção */}
        <p className="mt-6 text-center text-xs text-white/50">
          Prévia do acervo de jornais digitalizados. A leitura completa acontece na página dedicada.
        </p>
      </motion.div>
    </section>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}
