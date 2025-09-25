"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navItems } from "./NavItems";
import LanguageMenu from "./LanguageMenu";

const panel = {
  hidden: { x: "100%" },
  show:   { x: 0, transition: { type: "tween", duration: 0.22 } },
  exit:   { x: "100%", transition: { type: "tween", duration: 0.18 } },
};

export default function MobileMenu({ open, onClose }) {
  // bloqueia scroll do body quando o menu abre
  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay com blur forte para leitura */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />

          {/* painel */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-[360px] border-l border-white/10 bg-zinc-950/95 p-4 backdrop-blur"
            variants={panel} initial="hidden" animate="show" exit="exit"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="rounded-lg px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>

            {/* navegação */}
            <div className="space-y-2">
              {navItems.map((item, idx) =>
                item.type === "dropdown" ? (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
                    <div className="px-2 py-1 text-xs uppercase tracking-wide text-white/60">
                      {item.label}
                    </div>
                    <div className="mt-1 space-y-1">
                      {item.items.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/5"
                          onClick={onClose}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* rodapé do menu: seletor de idioma */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="text-xs uppercase tracking-wide text-white/60 mb-2">Idioma</div>
              <LanguageMenu compact={true} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
