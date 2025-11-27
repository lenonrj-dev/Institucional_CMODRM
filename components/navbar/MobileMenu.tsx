"use client";

// components/navbar/MobileMenu.jsx
// Painel móvel com overlay, blur forte e busca global compacta.

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navItems, NavItem, NavSubItem } from "./NavItems";
import LanguageMenu from "./LanguageMenu";
import SearchBar from "./SearchBar";

const panel = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { type: "tween" as const, duration: 0.24 } },
  exit: { x: "100%", transition: { type: "tween" as const, duration: 0.18 } },
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-[360px] border-l border-white/10 bg-zinc-950/95 p-4 backdrop-blur"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button className="rounded-lg px-3 py-1.5 text-xs text-white/70 hover:bg-white/5" onClick={onClose}>
                Fechar
              </button>
            </div>

            {/* Busca compacta */}
            <SearchBar compact className="mb-3" />

            {/* Navegação */}
            <div className="space-y-2">
              {navItems.map((item: NavItem, idx) =>
                item.type === "dropdown" ? (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
                    <div className="px-2 py-1 text-xs uppercase tracking-wide text-white/60">{item.label}</div>
                    <div className="mt-1 space-y-1">
                      {item.items.map((sub: NavSubItem, i) => (
                        <div key={`${sub.label}-${i}`} className="space-y-1 rounded-md px-1 py-1">
                          <Link
                            href={sub.href}
                            className="block rounded-md px-2.5 py-2 text-sm text-white/90 hover:bg-white/5"
                            onClick={onClose}
                          >
                            {sub.label}
                          </Link>
                          {sub.children?.length ? (
                            <div className="ml-2 space-y-1 border-l border-white/10 pl-2">
                              {sub.children.map((leaf) => (
                                <Link
                                  key={leaf.href}
                                  href={leaf.href}
                                  className="block rounded-md px-2.5 py-1.5 text-xs text-white/80 hover:bg-white/5"
                                  onClick={onClose}
                                >
                                  {leaf.label}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
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

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-2 text-xs uppercase tracking-wide text-white/60">Idioma</div>
              <LanguageMenu compact={true} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
