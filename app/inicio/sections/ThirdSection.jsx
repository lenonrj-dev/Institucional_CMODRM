"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

// conteúdo exemplo (substitua títulos/links quando tiver os definitivos)
const ITEMS = [
  {
    title: "Infância e Primeiros Passos",
    description:
      "Origens, família e os primeiros contatos com a realidade do trabalho e organização coletiva.",
    href: "/acervo-pessoal/infancia",
  },
  {
    title: "Entrada no Movimento",
    description:
      "O início da militância sindical e a construção de uma consciência de classe prática.",
    href: "/acervo-pessoal/entrada-no-movimento",
  },
  {
    title: "Campanhas Iniciais",
    description:
      "Mobilizações de base, panfletagem e as primeiras vitórias que consolidaram confiança.",
    href: "/acervo-pessoal/campanhas-iniciais",
  },
  {
    title: "Greves Históricas",
    description:
      "Articulações, bastidores e a estratégia por trás dos principais movimentos paredistas.",
    href: "/acervo-pessoal/greves-historicas",
  },
  {
    title: "Formação e Estudos",
    description:
      "Cursos, leituras e referências que formaram o repertório político e organizativo.",
    href: "/acervo-pessoal/formacao",
  },
  {
    title: "Gestão no Sindicato",
    description:
      "Projetos, prestação de contas e a busca por transparência e serviços ao trabalhador.",
    href: "/acervo-pessoal/gestao",
  },
  {
    title: "Relações e Parcerias",
    description:
      "Frentes com outras entidades, diálogo social e redes de apoio à categoria.",
    href: "/acervo-pessoal/parcerias",
  },
  {
    title: "Comunicação e Imagem",
    description:
      "Boletins, cartazes e mídia: como contar a história e fortalecer a memória coletiva.",
    href: "/acervo-pessoal/comunicacao",
  },
  {
    title: "Reconhecimentos",
    description:
      "Homenagens, prêmios e registros oficiais do legado construído.",
    href: "/acervo-pessoal/reconhecimentos",
  },
  {
    title: "Legado e Futuro",
    description:
      "O que permanece, o que inspira e como a próxima geração pode avançar.",
    href: "/acervo-pessoal/legado",
  },
];

const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

const cardVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -28,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ThirdSection() {
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);
  const boxRef = useRef(null);
  const activeRef = useRef(false); // true quando mouse/foco está dentro da caixa

  // bloqueio simples pra não pular itens rápido demais
  const step = useCallback((dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIndex((i) => clamp(i + dir, 0, ITEMS.length - 1));
    setTimeout(() => (lockRef.current = false), 450);
  }, []);

  const onWheel = (e) => {
    // impede o scroll padrão (tanto da página quanto de qualquer contêiner)
    e.preventDefault();
    e.stopPropagation();
    const dy = e.deltaY;
    if (dy > 8) step(1);
    else if (dy < -8) step(-1);
  };

  const onKeyDown = (e) => {
    // impede que Space/PageUp/PageDown rolem a página enquanto interagimos
    const blocker = [" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
    if (blocker.includes(e.key)) e.preventDefault();
    if (e.key === "ArrowDown" || e.key === "PageDown") step(1);
    if (e.key === "ArrowUp" || e.key === "PageUp") step(-1);
  };

  // Ativa/desativa o lock de rolagem da PÁGINA quando a caixa recebe/solta mouse/foco
  const enablePageLock = () => {
    if (activeRef.current) return;
    activeRef.current = true;
    // trava rolagem da página (sem overlay estranho)
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
  };
  const disablePageLock = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    document.body.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "auto";
  };

  // Bloqueia gestos globais enquanto a caixa está ativa (trackpad/wheel/touch/spacebar)
  useEffect(() => {
    const stopIfActive = (e) => {
      if (!activeRef.current) return;
      e.preventDefault();
    };

    // wheel/touch devem ser não-passive para permitir preventDefault
    window.addEventListener("wheel", stopIfActive, { passive: false, capture: true });
    window.addEventListener("touchmove", stopIfActive, { passive: false, capture: true });

    const keyTrap = (e) => {
      if (!activeRef.current) return;
      const keys = [" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
      if (keys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", keyTrap, { capture: true });

    return () => {
      window.removeEventListener("wheel", stopIfActive, { capture: true });
      window.removeEventListener("touchmove", stopIfActive, { capture: true });
      window.removeEventListener("keydown", keyTrap, { capture: true });
      // garante restauração (ex.: navegação rápida)
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "auto";
    };
  }, []);

  // focar a área navegável quando a seção entra na tela
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) el.focus();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Bloco de texto / navegação (esquerda) */}
        <div className="lg:col-span-8">
          <div className="mb-4 text-xs uppercase tracking-widest text-white/50">
            Acervo Pessoal
          </div>
          <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            História do Guardião do Acervo
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Uma trajetória dedicada à organização dos trabalhadores, à defesa de
            direitos e à preservação da memória. Explore, abaixo, capítulos
            curtos e navegáveis — cada rolagem mostra um tópico com resumo e um
            acesso direto para saber mais.
          </p>

          {/* Área navegável por “roll” — mostra 1 item por vez */}
          <div
            ref={boxRef}
            tabIndex={0}
            onWheel={onWheel}
            onKeyDown={onKeyDown}
            onMouseEnter={enablePageLock}
            onMouseLeave={disablePageLock}
            onFocus={enablePageLock}
            onBlur={disablePageLock}
            aria-live="polite"
            role="region"
            aria-label="Tópicos do acervo pessoal (role para navegar)"
            className="mt-8 select-none rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 outline-none overscroll-contain touch-none"
            style={{ height: "18rem" }}
          >
            <div className="flex items-center justify-between pb-3 text-xs text-white/60">
              <span>
                {String(index + 1).padStart(2, "0")}/{String(ITEMS.length).padStart(2, "0")}
              </span>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => step(-1)}
                  aria-label="Anterior"
                  className="rounded-md border border-white/10 bg-white/5 p-1 hover:bg-white/10"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Próximo"
                  className="rounded-md border border-white/10 bg-white/5 p-1 hover:bg-white/10"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative h-[calc(100%-1.75rem)] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <article className="flex h-full flex-col justify-between rounded-xl bg-zinc-950/60 p-4 sm:p-5">
                    <div>
                      <h4 className="text-lg font-medium text-white sm:text-xl">
                        {ITEMS[index].title}
                      </h4>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                        {ITEMS[index].description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={ITEMS[index].href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        Saiba mais <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-7 text-center text-[11px] text-white/50">
              Role dentro desta caixa para navegar entre os tópicos.
            </p>
          </div>
        </div>

        {/* Retrato / cartão lateral (direita) */}
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                <Image
                  src="/hero.png" // troque pela foto do rosto (ex: /portrait.jpg)
                  alt="Retrato do guardião do acervo"
                  fill
                  className="object-cover"
                  sizes="120px"
                  priority={false}
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Guardião do Acervo
                </p>
                <h5 className="text-lg font-semibold text-white">
                  Rubem Machado
                </h5>
                <p className="mt-1 text-sm text-white/60">
                  Curadoria, pesquisa e preservação
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-white/60">
              <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                30+ anos de atuação
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                Projetos premiados
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                Pesquisa histórica
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                Acesso público
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
