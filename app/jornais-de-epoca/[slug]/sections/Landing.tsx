"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Maximize2, Newspaper, Search } from "lucide-react";
import ZoomModal from "../../components/ZoomModal";

type EditionCard = {
  slug: string;
  title: string;
  date: string;
  decade: string;
  cover: string;
  full: string;
  summary: string;
  width?: number;
  height?: number;
};

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };

// Imagem em alta indicada pelo usuario
const FULL_IMG = "https://res.cloudinary.com/dc7u5spia/image/upload/v1765237328/Jornal_do_Brasil_-_2%C2%AA_Auditoria_do_Ex%C3%A9rcito_xzf1q2.jpg";

// Mock estatico - substitua pela sua fonte real quando desejar
const ALL: EditionCard[] = [
  { slug: "o-operario-1913-05-12", title: "O Operario", date: "12/05/1913", decade: "1910s", cover: FULL_IMG, full: FULL_IMG, summary: "Organizacao de base e pautas salariais." },
  { slug: "folha-trabalhador-1921-09-03", title: "Folha do Trabalhador", date: "03/09/1921", decade: "1920s", cover: FULL_IMG, full: FULL_IMG, summary: "Mobilizacoes e comissoes." },
  { slug: "gazeta-sindical-1932-02-28", title: "Gazeta Sindical", date: "28/02/1932", decade: "1930s", cover: FULL_IMG, full: FULL_IMG, summary: "Greves e negociacao coletiva." },
  { slug: "o-dia-do-povo-1937-07-17", title: "O Dia do Povo", date: "17/07/1937", decade: "1930s", cover: FULL_IMG, full: FULL_IMG, summary: "Marchas, assembleias e cotidiano." },
];

const DECADES = ["Todos", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s"];

export default function JornaisLanding() {
  const [q, setQ] = useState("");
  const [dec, setDec] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<EditionCard | null>(null);

  const items = useMemo(() => {
    let arr = ALL.slice();
    if (dec !== "Todos") arr = arr.filter((i) => i.decade === dec);
    const term = q.trim().toLowerCase();
    if (term) arr = arr.filter((i) => (i.title + " " + i.summary + " " + i.decade).toLowerCase().includes(term));
    return arr;
  }, [q, dec]);

  const openModal = (it: EditionCard) => {
    setActive(it);
    setOpen(true);
  };

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecalho */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Newspaper className="h-4 w-4" />
            Jornais de Epoca
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">Uma janela para o passado</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Clique em uma capa para abrir o leitor em tela cheia com ajuste automatico. Use as setas para navegar na leitura aberta.
          </p>
        </div>

        {/* Busca + filtro por decada */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
              <Search className="h-4 w-4 text-white/60" />
              <input
                placeholder="Buscar por titulo, decada ou palavra-chave"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Buscar edicoes"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <label className="sr-only" htmlFor="decade">
              Filtrar por decada
            </label>
            <select
              id="decade"
              value={dec}
              onChange={(e) => setDec(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Filtrar por decada"
            >
              {DECADES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade de edicoes (cada card abre o modal de leitura) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <article key={it.slug} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
              <button
                type="button"
                onClick={() => openModal(it)}
                className="relative block w-full text-left"
                aria-label={`Abrir leitura da edicao ${it.title}`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={it.cover || "/hero.png"}
                    alt={`${it.title} - capa`}
                    fill
                    sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/50 px-2 py-1 text-[11px] text-white/80 backdrop-blur">
                    <Maximize2 className="h-3.5 w-3.5" /> Ver
                  </span>
                </div>
              </button>
              <div className="p-3">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{it.date}</span>
                  <span>-</span>
                  <span>{it.decade}</span>
                </div>
                <h3 className="text-base font-semibold text-white/90">{it.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/70">{it.summary}</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => openModal(it)}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/90 hover:bg-white/10"
                  >
                    Abrir leitura completa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de leitura (sem zoom, apenas ajuste automatico) */}
        <ZoomModal
          open={open}
          onClose={() => setOpen(false)}
          src={active?.full || FULL_IMG}
          hrefFull={active?.full || FULL_IMG}
          title={active?.title || "Edicao digitalizada"}
          caption={active ? `${active.title} - ${active.date}` : ""}
          width={active?.width || 1359}
          height={active?.height || 2998}
        />

        {/* Rodape curto */}
        <p className="mt-8 text-center text-xs text-white/50">
          Para reproducao, consulte Acesso a informacao. A leitura completa tambem esta disponivel na pagina da edicao.
        </p>
      </motion.div>
    </section>
  );
}
