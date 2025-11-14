"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FirstSection({
  imageSrc,
  alt = "Imagem de fundo",
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div className="relative h-[min(90svh,1080px)] min-h-[520px]">
        {/* Fundo com zoom sutil */}
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

        {/* Grid overlay sutil (mantido) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px, 36px 36px",
          }}
        />

        {/* Fade inferior (único fade) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
