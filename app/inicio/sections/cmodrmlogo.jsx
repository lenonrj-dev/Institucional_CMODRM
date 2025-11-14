"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * CMODRMLogo — wordmark inspirado no estilo dos blocos vermelhos com letras amarelas
 * contornadas em preto (imagem de referência enviada). Sem fontes externas.
 *
 * • Responsivo: escala por clamp() e aceita override via props
 * • A11y: role="img" + aria-label; texto real em <span className="sr-only">
 * • Estética: tiles vermelhos irregulares, borda/preenchimento, letras com stroke preto
 * • Animação sutil: wobble ao montar/hover, com respeito a prefers-reduced-motion
 */

const TILE_ROT = [-2.5, 1.5, 0.8, -1.2, 1.2, -2.2];

function LetterTile({ ch, i, sizeRem }) {
  // Ajuste de rotação por letra p/ parecer "handmade"
  const rot = TILE_ROT[i % TILE_ROT.length];
  return (
    <motion.span
      aria-hidden
      initial={{ rotate: rot * 0.6, y: 4, opacity: 0 }}
      animate={{ rotate: rot, y: 0, opacity: 1 }}
      whileHover={{ rotate: rot + 2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative inline-flex select-none items-center justify-center align-baseline"
      style={{
        fontSize: `clamp(40px, ${sizeRem}vw, 140px)`,
        lineHeight: 1,
        padding: "0.14em 0.18em 0.18em",
        marginInline: "0.06em",
        borderRadius: "12% 10% 14% 9% / 16% 18% 12% 14%", // orgânico
        background: "#c31919",
        border: "6px solid #000",
        boxShadow:
          "0 4px 0 rgba(0,0,0,.55), inset 0 0 0 4px rgba(0,0,0,.45), inset 0 -8px 18px rgba(0,0,0,.35)",
      }}
    >
      {/* brilho sutil do tile */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[12%]"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,.14), transparent 55%), radial-gradient(120% 80% at 70% 90%, rgba(0,0,0,.25), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Letra com stroke preto grosso e preenchimento amarelo */}
      <span
        className="relative font-black uppercase tracking-[0.04em]"
        style={{
          color: "#f6d56b",
          WebkitTextStroke: "8px #000",
          paintOrder: "stroke fill",
          textShadow:
            "0 1px 0 #000, 0 -1px 0 #000, 1px 0 0 #000, -1px 0 0 #000, 0 0 2px #000",
        }}
      >
        {ch}
      </span>
    </motion.span>
  );
}

function sanitize(text) {
  return (text || "CMODRM").replace(/\s+/g, "").toUpperCase();
}

function CMODRMLogo({ text = "CMODRM", size = 8, className = "" }) {
  // size: fator em vw usado no clamp (8 → bom para hero)
  const reduce = useReducedMotion();
  const letters = sanitize(text).split("");

  return (
    <div
      role="img"
      aria-label={sanitize(text)}
      className={`inline-flex items-end justify-center ${className}`}
      style={{
        // gap proporcional ao tamanho
        
        filter: "drop-shadow(0 6px 0 rgba(0,0,0,.55))",
      }}
    >
      <span className="sr-only">{sanitize(text)}</span>
      {letters.map((ch, i) => (
        <LetterTile key={`${ch}-${i}`} ch={ch} i={i} sizeRem={size} />
      ))}
    </div>
  );
}

export default memo(CMODRMLogo);
