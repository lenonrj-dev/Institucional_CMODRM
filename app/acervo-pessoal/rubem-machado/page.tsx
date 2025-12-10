import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Calendar,
  FileText,
  Images,
  Mic,
  BookOpen,
  Newspaper,
  Download,
  Quote,
  ChevronRight,
  ChevronDown,
  Search,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import type { SiteContent } from "../../../lib/content-types";

const ABOUT_ICON_MAP = {
  newspaper: Newspaper,
  book: BookOpen,
} as const;

const STEP_ICON_MAP = {
  search: Search,
  check: CheckCircle2,
  shield: ShieldCheck,
} as const;

async function loadContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo do site");
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const { personal } = await loadContent();
  const hero = personal.hero;
  return {
    title: `Acervo Pessoal – ${hero.name} | Banco de Memória`,
    description: hero.summary,
    alternates: { canonical: "/acervo-pessoal/rubem-machado" },
    openGraph: {
      title: `Acervo Pessoal – ${hero.name}`,
      description: hero.biography,
      url: "/acervo-pessoal/rubem-machado",
      images: [{ url: hero.cover }],
    },
  };
}

export default async function Page() {
  const { personal } = await loadContent();
  const { hero, gallery, documents, interviews, timeline, about, quote, downloads, navigation, faq, steps } =
    personal;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Acervo Pessoal – ${hero.name}`,
    description: hero.biography,
    hasPart: [
      { "@type": "Collection", name: "Fotografias" },
      { "@type": "Collection", name: "Documentos" },
      { "@type": "Collection", name: "Entrevistas" },
      { "@type": "Collection", name: "Boletins" },
    ],
    about: {
      "@type": "Person",
      name: hero.name,
      jobTitle: hero.roles.join(", "),
      address: hero.stats[1]?.value,
    },
  };

  return (
    <main className="relative w-full py-10 sm:py-14 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="absolute inset-0">
            <Image
              src={hero.cover}
              alt="Capa do acervo pessoal"
              fill
              sizes="(min-width:1024px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 items-end gap-6 p-5 sm:p-6 lg:grid-cols-12 lg:p-8">
            <div className="lg:col-span-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={hero.portrait}
                  alt={`Retrato de ${hero.name}`}
                  fill
                  sizes="(min-width:1024px) 320px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                {hero.label}
              </div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{hero.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {hero.roles.map((role) => (
                  <Pill key={role}>{role}</Pill>
                ))}
              </div>

              <p className="mt-4 max-w-3xl text-white/80">{hero.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-xl">
                {hero.stats.map((stat) => (
                  <Stat key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  <Images className="h-4 w-4" /> {hero.primaryCta.label}
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" /> {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Calendar}>Linha do tempo</SectionTitle>
              <ol className="relative ml-3 mt-3 border-l border-white/10">
                {timeline.map((entry) => (
                  <li key={entry.year} className="mb-4 ml-4">
                    <div className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full border border-white/20 bg-white/40" />
                    <div className="text-sm font-medium text-white">{entry.year}</div>
                    <p className="text-sm text-white/70">{entry.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Images}>Seleção de fotografias</SectionTitle>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((item, index) => (
                  <figure key={`${item.src}-${index}`} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={item.src} alt={item.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <figcaption className="px-3 py-2 text-xs text-white/60">{item.alt}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/acervo/fotos" className="text-sm text-white/80 hover:underline">
                  Ver todas as fotos
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={FileText}>Documentos digitalizados</SectionTitle>
              <ul className="mt-2 divide-y divide-white/10">
                {documents.map((doc) => (
                  <li key={doc.href} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <Link href={doc.href} className="font-medium text-white hover:underline">
                        {doc.title}
                      </Link>
                      <div className="text-xs text-white/60">{doc.meta}</div>
                    </div>
                    <Link
                      href={doc.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                    >
                      Abrir <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Mic}>História oral</SectionTitle>
              <ul className="mt-2 divide-y divide-white/10">
                {interviews.map((item) => (
                  <li key={item.href} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <Link href={item.href} className="font-medium text-white hover:underline">
                        {item.title}
                      </Link>
                      <div className="text-xs text-white/60">{item.meta}</div>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
                    >
                      Ouvir <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={BookOpen}>{about.heading}</SectionTitle>
              <p className="text-sm leading-relaxed text-white/80">{about.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {about.links.map((link) => {
                  const Icon = ABOUT_ICON_MAP[link.icon];
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white hover:bg-black/60"
                    >
                      <Icon className="h-4 w-4" /> {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                <Quote className="h-4 w-4" /> Depoimento
              </div>
              <blockquote className="text-white/90">
                <p className="text-sm italic">{quote.text}</p>
                <footer className="mt-2 text-xs text-white/60">
                  {quote.author} · {quote.note}
                </footer>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <SectionTitle icon={Download}>Downloads</SectionTitle>
              <ul className="mt-2 space-y-2 text-sm">
                {downloads.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white hover:bg-black/60"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = STEP_ICON_MAP[step.icon];
            return (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="inline-flex items-center gap-2 text-white/80">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{step.title}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{step.text}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <HelpCircle className="h-4 w-4" />
            Perguntas frequentes
          </div>
          <div className="space-y-2">
            {faq.map((item) => (
              <Faq key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">{navigation.backLabel}</h3>
              </div>
              <p className="mt-1 text-sm text-white/70">
                {navigation.note}
                <Link href={navigation.noteLink.href} className="underline hover:text-white">
                  {navigation.noteLink.label}
                </Link>
                .
              </p>
            </div>
            <Link
              href={navigation.backHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              <ChevronRight className="h-4 w-4" /> {navigation.backLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

type SectionTitleProps = {
  icon?: typeof Calendar;
  children: string;
  className?: string;
};

function SectionTitle({ icon: Icon, children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`mb-3 inline-flex items-center gap-2 text-lg font-semibold text-white sm:text-xl ${className}`}>
      {Icon && <Icon className="h-5 w-5" />} {children}
    </h2>
  );
}

type StatProps = { label: string; value: string };
function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 text-base font-medium text-white">{value}</div>
    </div>
  );
}

type PillProps = { children: ReactNode };
function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

type FaqProps = { q: string; a: string };
function Faq({ q, a }: FaqProps) {
  return (
    <details className="rounded-2xl border border-white/10 bg-zinc-950/60">
      <summary className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left">
        <span className="font-medium text-white/90">{q}</span>
        <ChevronDown className="h-5 w-5 text-white/70 transition group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-3 text-sm text-white/70">{a}</div>
    </details>
  );
}
