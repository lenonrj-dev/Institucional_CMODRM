"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

export type TimelineContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: { title: string; description: string; href: string }[];
  aside: { label: string; name: string; role: string; avatar: string; highlights: string[] };
  footnote: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

const cardVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -28,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const },
  },
};

type Props = { content: TimelineContent };

export default function ThirdSection({ content }: Props) {
  const [index, setIndex] = useState(0);
  const lockRef = useRef(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(false); // true quando mouse/foco está dentro da caixa

  // bloqueio simples pra não pular itens rápido demais
  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setIndex((i) => clamp(i + dir, 0, content.items.length - 1));
      setTimeout(() => (lockRef.current = false), 450);
    },
    [content.items.length]
  );

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dy = e.deltaY;
    if (dy > 8) step(1);
    else if (dy < -8) step(-1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const blocker = [" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
    if (blocker.includes(e.key)) e.preventDefault();
    if (e.key === "ArrowDown" || e.key === "PageDown") step(1);
    if (e.key === "ArrowUp" || e.key === "PageUp") step(-1);
  };

  // Ativa/desativa o lock de rolagem da página quando a caixa recebe/solta mouse/foco
  const enablePageLock = () => {
    if (activeRef.current) return;
    activeRef.current = true;
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
    const stopIfActive = (e: Event) => {
      if (!activeRef.current) return;
      e.preventDefault();
    };

    const handleWheel = (e: WheelEvent) => stopIfActive(e);
    const handleTouch = (e: TouchEvent) => stopIfActive(e);
    const handleKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      const keys = [" ", "Spacebar", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", handleTouch, { passive: false, capture: true });
    window.addEventListener("keydown", handleKey, { capture: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchmove", handleTouch, { capture: true });
      window.removeEventListener("keydown", handleKey, { capture: true });
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
            {content.eyebrow}
          </div>
          <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {content.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {content.description}
          </p>

          {/* Área navegável por scroll – mostra 1 item por vez */}
          <div
            ref={boxRef}
            tabIndex={0}
            onWheel={onWheel as any}
            onKeyDown={(e) => onKeyDown(e.nativeEvent)}
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
                {String(index + 1).padStart(2, "0")}/{String(content.items.length).padStart(2, "0")}
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
                        {content.items[index].title}
                      </h4>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                        {content.items[index].description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={content.items[index].href}
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
              {content.footnote}
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
                  src={content.aside.avatar}
                  alt={`Retrato de ${content.aside.name}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  priority={false}
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  {content.aside.label}
                </p>
                <h5 className="text-lg font-semibold text-white">
                  {content.aside.name}
                </h5>
                <p className="mt-1 text-sm text-white/60">
                  {content.aside.role}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-white/60">
              {content.aside.highlights.map((h) => (
                <div key={h} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                  {h}
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
