"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Book, Quote, Copy, X, Tag, Search } from "lucide-react";
import clsx from "clsx";

export type BreadcrumbItem = { label: string; href?: string };

export function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={clsx("relative w-full py-10 sm:py-14 lg:py-16", className)}>
      <ContentContainer>{children}</ContentContainer>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{title}</h2>
        {description && <p className="max-w-3xl text-sm text-white/70 sm:text-base">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function HeroBanner({
  eyebrow,
  title,
  description,
  image,
  badge,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60">
      <div className="grid gap-0 lg:grid-cols-[1.25fr_1.1fr]">
        <div className="p-6 sm:p-8 lg:p-10 space-y-4">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
              {badge}
            </div>
          )}
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.28em] text-white/60">{eyebrow}</div>
          )}
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="max-w-3xl text-base text-white/75 sm:text-lg">{description}</p>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
        <div className="relative h-64 w-full lg:h-full">
          <Image src={image} alt={title} fill className="object-cover" sizes="(min-width:1024px) 45vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/60">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white/75">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="text-white/40">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type DocumentCardProps = {
  title: string;
  summary: string;
  date: string;
  location?: string;
  tags?: string[];
  href?: string;
};

export function DocumentCard({ title, summary, date, location, tags, href }: DocumentCardProps) {
  const body = (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
      <div className="flex items-center gap-2 text-[11px] text-white/60">
        <Calendar className="h-3.5 w-3.5" />
        <span>{date}</span>
        {location && (
          <>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
          </>
        )}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{summary}</p>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/70">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{body}</Link> : body;
}

export type DepoimentoCardProps = {
  author: string;
  role: string;
  excerpt: string;
  date: string;
  theme: string;
  avatar: string;
  href?: string;
};

export function DepoimentoCard({ author, role, excerpt, date, theme, avatar, href }: DepoimentoCardProps) {
  const content = (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-black/40">
          <Image src={avatar} alt={author} fill className="object-cover" sizes="48px" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{author}</p>
          <p className="text-xs text-white/60">{role}</p>
          <p className="text-[11px] text-white/60">{date}</p>
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2 text-white/80">
        <Quote className="mt-1 h-4 w-4 text-white/40" />
        <p className="text-sm leading-relaxed">{excerpt}</p>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
        <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1">Tema: {theme}</span>
      </div>
      <div className="mt-3">
        <span className="inline-flex items-center gap-2 text-sm text-white/80">
          <ArrowRight className="h-4 w-4" />
          Ler depoimento completo
        </span>
      </div>
    </article>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export type ReferenciaCardProps = {
  title: string;
  authors: string;
  year: string;
  type: "Livro" | "Artigo" | "Tese";
  source: string;
  citation: string;
};

export function ReferenciaCard({ title, authors, year, type, source, citation }: ReferenciaCardProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(citation).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
      <div className="flex items-center gap-2 text-[11px] text-white/60">
        <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1">{type}</span>
        <span>{year}</span>
      </div>
      <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{authors}</p>
      <p className="mt-1 text-xs text-white/60">{source}</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copiado" : "Copiar citação"}
        </button>
      </div>
    </article>
  );
}

export type PhotoItem = {
  src: string;
  alt: string;
  year: string;
  location: string;
  description: string;
  tags?: string[];
};

export function PhotoCard({ photo, onClick }: { photo: PhotoItem; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50"
    >
      <div className="relative h-56 w-full">
        <Image src={photo.src} alt={photo.alt} fill className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-left">
        <p className="text-xs text-white/70">{photo.year} • {photo.location}</p>
        <h3 className="text-sm font-semibold text-white">{photo.alt}</h3>
        <p className="text-xs text-white/65 line-clamp-2">{photo.description}</p>
      </div>
    </button>
  );
}

export function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: PhotoItem | null;
  onClose: () => void;
}) {
  if (!photo) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-5xl w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
        <button
          className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 p-2 text-white hover:bg-black/80"
          onClick={onClose}
          aria-label="Fechar visualização"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative h-[70vh] w-full">
          <Image src={photo.src} alt={photo.alt} fill className="object-contain" sizes="90vw" />
        </div>
        <div className="border-t border-white/10 p-4 text-white/80">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Calendar className="h-4 w-4" />
            <span>{photo.year}</span>
            <span>•</span>
            <MapPin className="h-4 w-4" />
            <span>{photo.location}</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">{photo.alt}</p>
          <p className="text-sm text-white/75">{photo.description}</p>
          {photo.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {photo.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-white/70">
                  <Tag className="h-3.5 w-3.5" />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PhotoMasonryGrid({ photos }: { photos: PhotoItem[] }) {
  const [active, setActive] = useState<PhotoItem | null>(null);
  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, idx) => (
          <div key={`${photo.src}-${idx}`} className="mb-4 break-inside-avoid">
            <PhotoCard photo={photo} onClick={() => setActive(photo)} />
          </div>
        ))}
      </div>
      <PhotoLightbox photo={active} onClose={() => setActive(null)} />
    </>
  );
}

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function DocumentTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-white/40 via-white/15 to-transparent" aria-hidden />
      {items.map((item, idx) => (
        <div key={`${item.year}-${idx}`} className="relative pl-10">
          <div className="absolute left-2 top-1 h-3 w-3 rounded-full bg-white" />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">{item.year}</div>
            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            <p className="text-sm text-white/70">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FilterSidebar({
  filters,
  title = "Filtros",
}: {
  filters: { label: string; options: string[] };
  title?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="flex flex-wrap gap-2">
        {filters.options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(selected === opt ? null : opt)}
            className={clsx(
              "rounded-lg border px-2.5 py-1.5 text-xs transition",
              selected === opt ? "border-white/20 bg-white/15 text-white" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            )}
            aria-pressed={selected === opt}
          >
            {opt}
          </button>
        ))}
      </div>
    </aside>
  );
}

export function SearchBar({
  placeholder,
  ariaLabel,
}: {
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
      <Search className="h-4 w-4 text-white/60" />
      <input
        aria-label={ariaLabel || "Buscar"}
        placeholder={placeholder || "Buscar..."}
        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
    </div>
  );
}

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
      <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">Anterior</button>
      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">1</span>
      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">2</span>
      <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">Próxima</button>
    </div>
  );
}
