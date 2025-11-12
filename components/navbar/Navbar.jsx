"use client";

// components/navbar/Navbar.jsx
// Barra topo com layout denso porém limpo, search global e menus. Mantém imports relativos.

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LanguageMenu from "./LanguageMenu";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>

      <header
        className={`sticky top-0 z-40 w-full border-b border-white/10 ${
          scrolled ? "bg-black/60 backdrop-blur" : "bg-black/30 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Página inicial — Sintracon"
            className="group inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <div className="leading-none">
              <span className="block text-[1.25rem] sm:text-[1.35rem] font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">SINTRACON</span>
              <span className="mt-[1px] block text-[10px] uppercase tracking-[0.20em] text-white/60">Banco de Memória</span>
            </div>
          </Link>

          {/* Navegação desktop */}
          <DesktopMenu />

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* Busca (desktop) */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Idioma */}
            <LanguageMenu />

            {/* Botão mobile */}
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-slate-200 hover:bg-white/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu móvel */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
