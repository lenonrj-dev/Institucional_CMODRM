"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import {Paperclip} from "lucide-react";

export default function DocCard({title, description, href, cover, alt = ""}) {
  return (
    <motion.article
      initial={{opacity: 0, y: 12}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.25}}
      whileHover={{y: -4}}
      className="relative h-full rounded-2xl border border-white/10 bg-zinc-950/60 p-3 shadow-sm"
    >
      {/* Imagem / capa */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative aspect-[4/3]">
          {cover ? (
            <Image
              src={cover}
              alt={alt || title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900" />
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-3 pb-10">
        <h3 className="text-base font-semibold text-white/90">
          {title}
        </h3>
        <p
          className="mt-1 text-sm leading-relaxed text-white/70"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,        // 2 linhas, sem quebrar o card
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {description}
        </p>
      </div>

      {/* Botão ação (canto inferior direito) */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        aria-label={`Abrir ${title}`}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <Paperclip className="h-4 w-4" />
        <span className="hidden sm:inline">Abrir</span>
      </motion.a>
    </motion.article>
  );
}
