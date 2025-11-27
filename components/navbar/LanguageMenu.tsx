"use client";

// components/navbar/LanguageMenu.tsx
// UI de idioma (apenas visual) com micro-anima��ǜo.

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Lang = { code: string; label: string; short: string };

const langs: Lang[] = [
  { code: "pt-BR", label: "Brasil - PT-BR", short: "BR" },
  { code: "pt-PT", label: "Portugal - PT", short: "PT" },
  { code: "es", label: "Espanhol - ES", short: "ES" },
  { code: "en", label: "English - EN", short: "EN" },
];

const pop = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const } },
};

type LanguageMenuProps = {
  compact?: boolean;
};

export default function LanguageMenu({ compact = false }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<Lang>(langs[0]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-slate-200 hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        {!compact && <span className="hidden sm:inline">{sel.short}</span>}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={pop}
            className="absolute right-0 z-40 mt-2 w-56 rounded-xl border border-white/10 bg-zinc-900/90 p-1 backdrop-blur"
          >
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setSel(l);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-200/90 hover:bg-white/5"
              >
                <span>{l.label}</span>
                {sel.code === l.code && <Check className="h-4 w-4 text-white/80" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
