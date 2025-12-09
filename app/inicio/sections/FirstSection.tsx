"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type FirstSectionProps = {
  imageSrc: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  logos?: { src: string; alt: string; wrapperClassName?: string; className?: string }[];
};

export default function FirstSection({
  imageSrc,
  alt = "Imagem de fundo",
  logos = [],
}: FirstSectionProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="relative mt-10 mx-auto h-[min(57svh,585px)] min-h-[340px] max-w-6xl">
        <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
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
              sizes="(min-width:1280px) 1200px, 100vw"
              className="object-cover will-change-transform"
            />
          </motion.div>

          {/* Grid overlay sutil */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-screen"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "36px 36px, 36px 36px",
            }}
          />

          {/* Fade inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Logotipos sobre o hero, posicionados fora do quadro da imagem */}
        {logos.length > 0 && (
          <div className="pointer-events-none absolute left-0 right-0 top-6px z-10 flex items-center justify-center gap-4 opacity-95 sm:top-[158px]">
            {logos.map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className={logo.wrapperClassName || "relative h-16 w-16 sm:h-20 sm:w-20 "}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={340}
                  height={350}
                  className={logo.className || "object-contain drop-shadow-lg "}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
