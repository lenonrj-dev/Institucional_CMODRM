"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type PreviewItem = {
  label: string;
  description?: string;
  href: string;
  previewSrc?: string;
};

export function InlinePreviewModal({ items, title }: { items: PreviewItem[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<PreviewItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const onOpen = (item: PreviewItem) => {
    setActive(item);
    setOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const onClose = () => {
    setOpen(false);
    setActive(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleZoom = (value: number) => {
    const clamped = Math.min(3, Math.max(1, value));
    setZoom(clamped);
    if (clamped === 1) {
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    handleZoom(zoom + delta);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (zoom <= 1 || event.button !== 0) return;
    setDragging(true);
    setDragStart({ x: event.clientX - offset.x, y: event.clientY - offset.y });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging || !dragStart || event.buttons !== 1) return;
    setOffset({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDragStart(null);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onOpen(item)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-left text-sm text-white/80 hover:border-white/20 hover:text-white"
          >
            <div className="font-medium text-white">{item.label}</div>
            {item.description && <p className="text-xs text-white/60">{item.description}</p>}
          </button>
        ))}
      </div>

      {open && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c10] shadow-2xl">
            <button
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Fechar visualização"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Visualização</p>
              <h4 className="mt-1 text-lg font-semibold text-white">{active.label}</h4>
              {active.description && <p className="mt-1 text-sm text-white/70">{active.description}</p>}
            </div>
            <div
              className="relative w-full max-h-[82vh] min-h-[460px] h-[70vh] bg-black/40"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              aria-label="Área de visualização do documento"
            >
              {active.previewSrc ? (
                <div className="h-full w-full overflow-auto">
                  <div
                    className={`relative flex h-full min-h-[460px] w-full items-center justify-center ${
                      zoom > 1 ? "cursor-grab" : ""
                    }`}
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transformOrigin: "center center",
                    }}
                      style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                        transformOrigin: "center center",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                    <Image
                      src={active.previewSrc}
                      alt={active.label}
                      fill
                      sizes="(min-width:1280px) 1100px, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <iframe
                  title={active.label}
                  src={active.href}
                  className="h-full w-full border-0 bg-black/40 text-white"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleZoom(zoom - 0.25)}
                  className="rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/15"
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.25"
                  value={zoom}
                  onChange={(e) => handleZoom(Number(e.target.value))}
                  className="h-1 w-28 accent-white/80"
                  aria-label="Zoom"
                />
                <button
                  onClick={() => handleZoom(zoom + 0.25)}
                  className="rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/15"
                >
                  +
                </button>
                <button
                  onClick={() => handleZoom(1)}
                  className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/15"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span>Para ler completo, acesse o acervo.</span>
                <a
                  href={active.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Abrir no acervo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
