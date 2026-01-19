import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  FileText,
  Mic2,
  BookOpen,
  Newspaper,
  ImageIcon,
  ScrollText,
} from "lucide-react";
import type { AcervoContent } from "../../../lib/content-types";

type CitySection = {
  title: string;
  description: string;
  href: string;
  thumb: string;
};

type CityCard = {
  name: string;
  description: string;
  coverage: string;
  focus: string[];
  image: string;
  sections: CitySection[];
};

type Badge = { label: string; icon: "newspaper" | "photo" | "documents" };

type NavItem = {
  title: string;
  description: string;
  href: string;
  icon: typeof FileText;
};

type HighlightItem = {
  type: string;
  title: string;
  href: string;
};

const BADGE_ICONS: Record<Badge["icon"], typeof Newspaper | typeof ImageIcon | typeof Book> = {
  newspaper: Newspaper,
  photo: ImageIcon,
  documents: Book,
};

const DOM_WALDYR_BASE = "/acervo/fundos/dom-waldyr";

const NAV_ITEMS: NavItem[] = [
  {
    title: "Documentos",
    description: "Cartas, relatorios e notas pastorais.",
    href: `${DOM_WALDYR_BASE}#documentos`,
    icon: FileText,
  },
  {
    title: "Depoimentos",
    description: "Historia oral e memorias de base.",
    href: `${DOM_WALDYR_BASE}#depoimentos`,
    icon: Mic2,
  },
  {
    title: "Referencias",
    description: "Bibliografia e estudos do fundo.",
    href: `${DOM_WALDYR_BASE}#referencias`,
    icon: BookOpen,
  },
  {
    title: "Jornais de epoca",
    description: "Boletins, circulares e imprensa.",
    href: `${DOM_WALDYR_BASE}#jornais`,
    icon: Newspaper,
  },
  {
    title: "Fotografias",
    description: "Iconografia e registros visuais.",
    href: `${DOM_WALDYR_BASE}#acervo-fotografico`,
    icon: ImageIcon,
  },
  {
    title: "Historias",
    description: "Narrativas e cronologias do fundo.",
    href: `${DOM_WALDYR_BASE}#historias`,
    icon: ScrollText,
  },
];

const QUICK_TAGS = [
  "Movimento Operario",
  "Ditadura civil-militar",
  "Pastoral Operaria",
  "Volta Redonda",
  "Barra Mansa",
  "Barra do Pirai",
];

const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    type: "Documento",
    title: "Cartas e relatorios pastorais",
    href: `${DOM_WALDYR_BASE}#documentos`,
  },
  {
    type: "Depoimento",
    title: "Historia oral e memoria comunitaria",
    href: `${DOM_WALDYR_BASE}#depoimentos`,
  },
  {
    type: "Jornal",
    title: "Boletins e circulares de epoca",
    href: `${DOM_WALDYR_BASE}#jornais`,
  },
  {
    type: "Foto",
    title: "Iconografia e registros visuais",
    href: `${DOM_WALDYR_BASE}#acervo-fotografico`,
  },
];

const BADGE_LINKS: Record<string, string> = {
  Jornais: `${DOM_WALDYR_BASE}#jornais`,
  Fotos: `${DOM_WALDYR_BASE}#acervo-fotografico`,
  "Documentos & Bibliografia": `${DOM_WALDYR_BASE}#referencias`,
};

type CityShowcaseProps = {
  content: AcervoContent["cityShowcase"];
};

function NavTile({ item }: { item: NavItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/50">
          <Icon className="h-5 w-5 text-white/75" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="text-xs text-white/65">{item.description}</p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-white/60 transition group-hover:text-white">
        Abrir <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

function HighlightCard({ item, meta }: { item: HighlightItem; meta: string }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
    >
      <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70">
        {item.type}
      </span>
      <h5 className="text-base font-semibold text-white">{item.title}</h5>
      <p className="text-xs text-white/60">{meta}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-xs text-white/70 transition group-hover:text-white">
        Ver item <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export default function CityShowcase({ content }: CityShowcaseProps) {
  return (
    <section className="relative w-full overflow-x-hidden bg-black py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/60">
            <Book className="h-3.5 w-3.5" />
            {content.eyebrow}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Hub do Fundo</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{content.title}</h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">{content.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.badges.map((badge) => {
                const Icon = BADGE_ICONS[badge.icon];
                const href = BADGE_LINKS[badge.label] ?? DOM_WALDYR_BASE;

                return (
                  <Link
                    key={badge.label}
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {badge.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {content.cities.map((city) => {
            const heroHref = city.sections[0]?.href ?? DOM_WALDYR_BASE;

            return (
              <article
                key={city.name}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-4 shadow-[0_25px_60px_-50px_rgba(0,0,0,0.8)] sm:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_25px_50px_-35px_rgba(0,0,0,0.9)] sm:p-8">
                      <div className="absolute inset-0">
                        <Image
                          src={city.image}
                          alt={city.name}
                          fill
                          className="object-cover"
                          sizes="(min-width:1024px) 55vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/35 to-black/90" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
                      </div>

                      <div className="relative z-10 flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
                          Fundo em destaque
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Fundo</p>
                          <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{city.name}</h3>
                          <p className="mt-3 text-sm text-white/80 sm:text-base">{city.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {city.focus.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/75"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">{city.coverage}</p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Link
                            href={heroHref}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                          >
                            Explorar Fundo <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`${DOM_WALDYR_BASE}/historias/introducao`}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                          >
                            Ver linha do tempo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-span-5">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.26em] text-white/50">Navegar por colecoes</p>
                          <h4 className="mt-2 text-lg font-semibold text-white">Explorar</h4>
                        </div>
                        <span className="text-xs text-white/50">{NAV_ITEMS.length} colecoes</span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {NAV_ITEMS.map((item) => (
                          <NavTile key={item.title} item={item} />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <p className="text-xs uppercase tracking-[0.26em] text-white/50">Atalhos rapidos</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {QUICK_TAGS.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-white/50">Destaques do fundo</p>
                      <h4 className="mt-2 text-lg font-semibold text-white">Destaques do Fundo</h4>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {HIGHLIGHT_ITEMS.map((item) => (
                      <HighlightCard key={item.type} item={item} meta={city.coverage} />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


