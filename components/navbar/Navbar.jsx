"use client";

// components/navbar/Navbar.jsx
// Layout 3-colunas: logo (esquerda), navegação (centro), ações (direita)
// Inclui SearchBar à direita, ícones sociais (Instagram/Facebook/YouTube)
// e seletor de idioma. Mantém imports relativos.

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Instagram, Facebook, Youtube } from "lucide-react";
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
      {/* Acessibilidade: pular para conteúdo */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>

      <header
        className={`sticky top-0 z-40 w-full border-b border-white/10 transition-colors ${
          scrolled ? "bg-black/70 backdrop-blur" : "bg-black/40 backdrop-blur"
        }`}
      >
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:px-6 lg:px-8">
          {/* ESQUERDA — LOGO mais próxima da borda esquerda */}
          <div className="min-w-[164px] pr-2">
            <Link
              href="/"
              aria-label="Página inicial — Sintracon"
              className="group inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="leading-none">
                <span className="block text-[1.25rem] sm:text-[1.35rem] font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
                  SINTRACON
                </span>
                <span className="mt-[1px] block text-[10px] uppercase tracking-[0.20em] text-white/60">
                  Banco de Memória
                </span>
              </div>
            </Link>
          </div>

          {/* CENTRO — Navegação desktop centralizada */}
          <div className="hidden flex-1 justify-center lg:flex">
            <DesktopMenu />
          </div>

          {/* DIREITA — Ações: redes sociais, busca e idioma */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Ícones sociais (desktop/tablet) */}
            <div className="hidden md:flex items-center gap-1.5">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Sintracon"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook do Sintracon"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube do Sintracon"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>

            {/* Busca (desktop) — deslocada para a borda direita */}
            <div className="hidden lg:block w-[320px] xl:w-[360px]">
              <SearchBar />
            </div>

            {/* Idioma */}
            <div className="hidden md:block">
              <LanguageMenu />
            </div>

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

      {/* Menu móvel (com busca compacta dentro) */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
