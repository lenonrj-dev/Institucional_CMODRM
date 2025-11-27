"use client";

// components/navbar/Navbar.tsx
// Layout em 3 colunas usando grid, logo à esquerda, menu central com mais respiro
// e bloco de ações (redes + busca + idioma) ancorado à direita.

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
        className={`sticky top-0 z-40 w-full border-b border-white/10 ${
          scrolled ? "bg-black/60 backdrop-blur" : "bg-black/30 backdrop-blur"
        }`}
      >
        {/* Contêiner mais largo para usar as bordas laterais em telas grandes */}
        <div className="mx-auto w-full max-w-[1760px] 2xl:max-w-[1880px] px-3 sm:px-6">
          {/* Grid em 3 colunas bem definidas */}
          <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 2xl:gap-x-10">
            {/* LOGO: colada mais à esquerda */}
            <Link
              href="/"
              aria-label="Página inicial – Sintracon"
              className="group inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="leading-none">
                <span className="block text-[1.25rem] sm:text-[1.35rem] font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
                  SINTRACON
                </span>
                <span className="mt-[1px] block text-[10px] uppercase tracking-[0.20em] text-white/60">
                  Centro de Memória
                </span>
              </div>
            </Link>

            {/* MENU CENTRAL – centralizado e com mais respiro entre itens */}
            <div className="flex items-center justify-center">
              <DesktopMenu />
            </div>

            {/* AÇÕES À DIREITA: redes, busca e idioma */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 2xl:gap-5">
              {/* Redes sociais (desktop) */}
              <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Youtube className="h-4.5 w-4.5" />
                </a>
              </div>

              {/* Busca (desktop) */}
              <div className="hidden md:block w-[360px] lg:w-[520px] 2xl:w-[640px]">
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
        </div>
      </header>

      {/* Menu móvel */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
