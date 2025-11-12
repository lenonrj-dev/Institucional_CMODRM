"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, Minus, Plus, RotateCcw, Maximize2, ExternalLink } from "lucide-react";

// Modal de zoom com pan/drag, acessível, sem dependências externas.
// - ESC fecha
// - TAB faz trap de foco
// - Clique no overlay fecha
// - Duplo clique alterna zoom
// - Scroll do mouse (ou trackpad) ajusta zoom
// - Arraste para mover quando com zoom > 1
// - Botões: + / - / Ajustar / 100% / Abrir original

export default function ZoomModal({ open, onClose, src, title = "", caption = "", hrefFull = "#" }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  // estado do zoom/pan
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  // bloquear scroll de fundo quando aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // foco inicial
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.documentElement.style.overflow = prev || "";
      setScale(1); setTx(0); setTy(0);
    };
  }, [open]);

  // handlers
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const setZoom = (z, cx, cy) => {
    // centro de zoom: ajusta pan para ficar "sob o cursor"
    const dz = z - scale;
    const nx = tx - (cx - (dialogRef.current?.clientWidth || 0) / 2) * dz / z;
    const ny = ty - (cy - (dialogRef.current?.clientHeight || 0) / 2) * dz / z;
    setScale(z);
    setTx(nx);
    setTy(ny);
  };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    const next = clamp(scale + delta, 1, 5);
    const rect = dialogRef.current?.getBoundingClientRect();
    const cx = rect ? e.clientX - rect.left : 0;
    const cy = rect ? e.clientY - rect.top : 0;
    setZoom(next, cx, cy);
  };

  const onPointerDown = (e) => {
    if (scale <= 1) return; // sem pan no tamanho natural
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setTx((v) => v + dx);
    setTy((v) => v + dy);
  };
  const onPointerUp = () => { dragging.current = false; };

  const onDblClick = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    const cx = rect ? e.clientX - rect.left : 0;
    const cy = rect ? e.clientY - rect.top : 0;
    const next = scale > 1 ? 1 : 2.5;
    setZoom(next, cx, cy);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "+" || e.key === "=") { e.preventDefault(); setZoom(clamp(scale + 0.2, 1, 5), (dialogRef.current?.clientWidth||0)/2, (dialogRef.current?.clientHeight||0)/2); }
    else if (e.key === "-") { e.preventDefault(); setZoom(clamp(scale - 0.2, 1, 5), (dialogRef.current?.clientWidth||0)/2, (dialogRef.current?.clientHeight||0)/2); }
    else if (e.key === "0") { e.preventDefault(); setScale(1); setTx(0); setTy(0); }
  };

  // trap de foco simples
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key !== "Tab") return;
      const f = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = f ? Array.from(f) : [];
      if (list.length === 0) return;
      const first = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur"
      aria-hidden={!open}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zoommodal-title"
        aria-describedby="zoommodal-desc"
        className="relative mx-4 w-[min(1200px,96vw)] rounded-2xl border border-white/15 bg-zinc-950/90 shadow-2xl"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 p-3 sm:p-4">
          <div className="min-w-0">
            <h2 id="zoommodal-title" className="truncate text-sm font-semibold text-white sm:text-base">
              {title || "Leitura em alta resolução"}
            </h2>
            {caption && (
              <p id="zoommodal-desc" className="mt-0.5 line-clamp-1 text-xs text-white/60">
                {caption}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setScale((s) => clamp(s - 0.2, 1, 5))}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10"
              aria-label="Diminuir zoom"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={() => setScale((s) => clamp(s + 0.2, 1, 5))}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10"
              aria-label="Aumentar zoom"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setScale(1); setTx(0); setTy(0); }}
              className="hidden rounded-lg border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10 sm:inline-flex"
              aria-label="Restaurar 100%"
              title="Restaurar 100%"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <a
              href={hrefFull || src}
              target="_blank" rel="noreferrer"
              className="hidden rounded-lg border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10 sm:inline-flex"
              aria-label="Abrir imagem original em nova aba"
              title="Abrir original"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/15"
            >
              Fechar
            </button>
          </div>
        </div>

        {/* Área de leitura */}
        <div
          className="relative h-[min(82vh,900px)] w-full overflow-hidden bg-black"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={onDblClick}
          aria-label="Área da imagem — role o mouse para dar zoom, arraste para mover. Duplo clique alterna zoom."
        >
          <div
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{ transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${scale})` }}
          >
            {/* Usamos <img> para controle de transform sem restrições do <Image> */}
            <img
              src={src}
              alt={title || "Edição digitalizada"}
              className="block max-h-[82vh] max-w-[90vw] select-none"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Dica de uso */}
        <p className="border-t border-white/10 p-3 text-center text-[11px] text-white/60">
          Dica: use a roda do mouse para aproximar/afastar, arraste para mover a imagem. Pressione <kbd className="rounded bg-white/10 px-1">Esc</kbd> para fechar.
        </p>
      </div>
    </div>
  );
}
