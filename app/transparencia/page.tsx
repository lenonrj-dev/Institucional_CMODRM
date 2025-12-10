import Link from "next/link";
import { getSiteContent } from "../../lib/get-site-content";

export const metadata = {
  title: "Transparência | Sintracon",
  description:
    "Relatórios, plano de dados abertos, política de privacidade e diretrizes de publicação.",
  alternates: { canonical: "/transparencia" },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const { transparency } = await getSiteContent();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: transparency.hero.title,
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
            {transparency.hero.eyebrow}
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {transparency.hero.title}
          </h1>
          <p className="mt-2 max-w-3xl text-white/70">{transparency.hero.description}</p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transparency.portalLinks.map((link) => (
            <article
              key={link.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-lg font-semibold text-white">{link.title}</h2>
              <p className="mt-1 text-sm text-white/70">{link.description}</p>
              <Link
                href={link.href}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
              >
                {link.actionLabel ?? "Abrir"}
              </Link>
            </article>
          ))}
        </section>

        <p className="mt-6 text-sm text-white/60">{transparency.footerNote}</p>
      </div>
    </main>
  );
}
