'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Search } from 'lucide-react';

export default function SearchBarSection() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('type', category);
    router.push(`/acervo?${params.toString()}`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    // Sobrepõe levemente o rodapé do hero (FirstSection), ficando ENTRE as seções
    <section
      aria-label="Busca do acervo"
      className="relative z-[5] -mt-16 sm:-mt-24 lg:-mt-28 mb-6 sm:mb-10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={false}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.5 }}
          variants={reduce ? undefined : fadeUp}
          className="rounded-2xl border border-white/10 bg-black/75 p-5 sm:p-7 shadow-2xl ring-1 ring-white/5 backdrop-saturate-150"
        >
          {/* Logo + CMODRM */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="relative h-10 w-10 shrink-0 select-none" aria-hidden>
              <Image src="/CUT.png" alt="Logo CUT" fill className="rounded" />
            </div>
            <p className="text-lg font-semibold text-white/90">
              Banco de Memória Rubem Machado
            </p>
          </div>

          {/* Formulário de busca */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-3xl items-center gap-3"
            role="search"
            aria-label="Pesquisar no acervo"
          >
            <label htmlFor="category" className="sr-only">
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-zinc-900/80 px-3 text-sm text-white shadow-inner outline-none ring-0 transition focus:border-white/30 focus:outline-none sm:min-w-[170px]"
              aria-label="Filtrar por tipo de conteúdo"
            >
              <option value="all">Todo o conteúdo</option>
              <option value="imagens">Imagens</option>
              <option value="videos">Vídeos</option>
              <option value="documentos">Documentos</option>
              <option value="pessoas">Pessoas</option>
            </select>

            <label htmlFor="query" className="sr-only">
              Termos de busca
            </label>
            <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 pl-3">
              <Search aria-hidden className="h-4 w-4 opacity-70" />
              <input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por termos, nomes, datas…"
                className="h-11 w-full bg-transparent px-3 text-sm text-white placeholder-white/50 outline-none"
                aria-label="Campo de pesquisa"
              />
            </div>

            <button
              type="submit"
              className="h-11 whitespace-nowrap rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white shadow hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:opacity-90"
            >
              Pesquisar
            </button>
          </form>

          {/* Descrição + Quem somos + Redes */}
          <div className="mt-3 text-center">
            <p className="text-xs text-white/70">
              Bem-vindos e bem-vindas ao nosso acervo virtual. Boa pesquisa!
            </p>

            <div className="mt-3">
              <p className="text-[11px] font-semibold tracking-widest text-white/80">
                QUEM SOMOS
              </p>
              <div className="mt-2 flex items-center justify-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="rounded-full p-2 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="rounded-full p-2 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="YouTube"
                  className="rounded-full p-2 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
