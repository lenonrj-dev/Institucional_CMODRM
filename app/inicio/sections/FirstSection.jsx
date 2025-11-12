"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function FirstSection({
  title,
  subtitle,
  description,
  imageSrc,
  alt,
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");

  useEffect(() => setMounted(true), []);

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  function onSearch(e) {
    e.preventDefault();
    // TODO: Substituir com a navegação/busca real do projeto quando disponível
    // Ex.: router.push(`/busca?scope=${scope}&q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div className="relative h-[min(90svh,800px)] min-h-[520px]">
        {/* BG com zoom sutil (sem mismatch) */}
        <motion.div
          aria-hidden
          initial={false}
          animate={mounted && !reduce ? { scale: [1, 1.05, 1] } : undefined}
          transition={
            mounted && !reduce
              ? { duration: 18, ease: "linear", repeat: Infinity }
              : undefined
          }
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover will-change-transform"
          />
        </motion.div>

        {/* Vignette/fades para legibilidade no rodapé */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px, 36px 36px",
          }}
        />

        {/* Título central padrão */}
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8">
          <motion.div
            className="max-w-3xl text-center"
            initial={false}
            {...(mounted
              ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
              : {})}
          >
            {subtitle && (
              <motion.p
                variants={fadeUp}
                className="text-lg mb-4 font-medium uppercase tracking-[0.28em] text-white/70"
              >
                {subtitle}
              </motion.p>
            )}

            {title && (
              <motion.div variants={fadeUp} className="mb-4 mt-2 flex items-center justify-center gap-4">
                <h1 className="title-font text-6xl font-extrabold leading-tight text-white sm:text-5xl lg:text-8xl">
                  {title}
                </h1>
              </motion.div>
            )}

            {description && (
              <motion.p
                variants={fadeUp}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                className="mx-auto mt-2 text-base leading-relaxed text-white/80 sm:text-lg"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>


        {/* Elementos decorativos existentes */}
        <motion.div
          aria-hidden
          className="absolute select-none pointer-events-none h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 opacity-90"
          style={{ top: "53%", left: "14%" }}
          initial={false}
          animate={mounted && !reduce ? { y: [0, -6, 0] } : undefined}
          transition={
            mounted && !reduce
              ? { duration: 5, ease: "easeInOut", repeat: Infinity }
              : undefined
          }
        >
          <Image src="/CUT.png" alt="" width={256} height={256} className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute select-none pointer-events-none h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 opacity-90"
          style={{ top: "53%", right: "18%" }}
          initial={false}
          animate={mounted && !reduce ? { y: [0, 6, 0] } : undefined}
          transition={
            mounted && !reduce
              ? { duration: 5.5, ease: "easeInOut", repeat: Infinity }
              : undefined
          }
        >
          <Image src="/CUT.png" alt="" width={256} height={256} className="h-full w-full" />
        </motion.div>

        {/* Fade preto inferior onde o bloco fica ancorado */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
