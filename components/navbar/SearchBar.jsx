"use client";

// components/navbar/SearchBar.jsx
// Busca rápida global do acervo (client-only) com sugestões, setas do teclado e foco acessível.

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowRight, FileText, Newspaper, Images, Mic2, Megaphone } from "lucide-react";
import { searchItems, COLLECTION_META } from "../../app/acervo/api";

const ICON = {
  documentos: FileText,
  boletins: Newspaper,
  fotos: Images,
  entrevistas: Mic2,
  cartazes: Megaphone,
};

export default function SearchBar({ placeholder = "Buscar no acervo…", compact = false, className = "" }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const listRef = useRef(null);

  // debounce simples
  const [deb, setDeb] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDeb(q.trim()), 220);
    return () => clearTimeout(t);
  }, [q]);

  const results = useMemo(() => (deb ? searchItems(deb) : []), [deb]);

  useEffect(() => {
    const onClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const goResult = (idx) => {
    const it = results[idx];
    if (!it) return;
    router.push(`/acervo/${it.id}`);
    setOpen(false);
    setQ("");
    setActive(-1);
  };

  const onKeyDown = (e) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) setOpen(true);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min((results?.length ?? 0) - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) return goResult(active);
      if (results.length > 0) {
        router.push(`/acervo/${results[0].id}`);
      } else {
        router.push(`/acervo?q=${encodeURIComponent(q)}`);
      }
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  useEffect(() => {
    // rolar item ativo para a vista
    if (active < 0 || !listRef.current) return;
    const el = listRef.current.children[active];
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 ${compact ? "px-2.5 py-1.5" : "px-3 py-2"}`}>
        <SearchIcon className="h-4 w-4 text-white/60" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-56 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none md:w-72 lg:w-[22rem]"
          aria-expanded={open}
          aria-controls="global-search-panel"
        />
      </div>

      {open && (
        <div
          id="global-search-panel"
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,34rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur shadow-2xl"
        >
          {results.length > 0 ? (
            <ul ref={listRef} className="max-h-80 overflow-auto divide-y divide-white/10">
              {results.slice(0, 8).map((it, i) => {
                const Ico = ICON[it.collection] ?? FileText;
                const meta = COLLECTION_META[it.collection];
                return (
                  <li key={it.id}>
                    <button
                      onClick={() => goResult(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-left ${
                        active === i ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                      role="option"
                      aria-selected={active === i}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <Ico className="h-4 w-4 text-white/80" />
                      </span>
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-sm font-medium text-white">{it.title}</div>
                        <div className="text-[11px] text-white/60">{meta?.typeLabel} • {it.date}</div>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-sm text-white/70">Nenhum resultado. Tente outros termos.</div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/30 px-3 py-2">
            <span className="text-[11px] text-white/50">Enter abre o primeiro resultado • Esc fecha</span>
            <button
              onClick={() => { router.push(`/acervo?q=${encodeURIComponent(q)}`); setOpen(false); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white hover:bg-white/15"
            >
              Ver tudo no acervo <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
