// app/transparencia/page.js
import Link from "next/link";

export const metadata = {
  title: "Transparência | Sintracon",
  description:
    "Relatórios, plano de dados abertos, política de privacidade e diretrizes de publicação.",
  alternates: { canonical: "/transparencia" },
  robots: { index: true, follow: true },
};

const LINKS = [
  { title: "Relatório de Transparência 2024", desc: "Indicadores, prazos e entregas do ano.", href: "/transparencia/relatorio-2024" },
  { title: "Plano de Dados Abertos", desc: "Datasets priorizados, formato e frequência.", href: "/transparencia/plano-dados" },
  { title: "Política de Privacidade", desc: "Bases legais e direitos do titular.", href: "/transparencia/privacidade" },
  { title: "Política de Transparência", desc: "Diretrizes de publicação e prazos de resposta.", href: "/transparencia/politica" },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Transparência | Sintracon",
    url: "/transparencia",
  };

  return (
    <main className="relative w-full py-10 sm:py-14 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">
            Transparência
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Hub de transparência
          </h1>
          <p className="mt-2 max-w-3xl text-white/70">
            Acesse relatórios, políticas e o plano de dados abertos do banco de
            memória.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <article
              key={l.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-lg font-semibold text-white">{l.title}</h2>
              <p className="mt-1 text-sm text-white/70">{l.desc}</p>
              <Link
                href={l.href}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
              >
                Abrir
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
