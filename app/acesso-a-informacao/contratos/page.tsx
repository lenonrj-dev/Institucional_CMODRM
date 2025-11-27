// app/acesso-a-informacao/contratos/page.js
import Link from "next/link";

export const metadata = {
  title: "Contratos e Parcerias — Acesso à Informação | Sintracon",
  description:
    "Instrumentos firmados com fornecedores e instituições. Objetos, vigência, valores e situação de execução.",
  alternates: { canonical: "/acesso-a-informacao/contratos" },
  robots: { index: true, follow: true },
};

const CONTRACTS = [
  {
    title: "Contrato 01/2024 — Digitalização e Preservação",
    partner: "Memória Digital Ltda.",
    term: "jan/2024 — dez/2025",
    value: "R$ 210.000,00",
    status: "Em execução",
    link: "#",
  },
  {
    title: "Acordo 03/2023 — Hospedagem e CDN",
    partner: "InfraCloud S.A.",
    term: "jul/2023 — jul/2026",
    value: "R$ 86.400,00",
    status: "Vigente",
    link: "#",
  },
  {
    title: "Convênio 07/2022 — Digitalização histórica",
    partner: "Universidade Popular",
    term: "ago/2022 — fev/2024",
    value: "R$ 0,00 (cooperação)",
    status: "Encerrado",
    link: "#",
  },
];

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Contratos e parcerias",
    url: "/acesso-a-informacao/contratos",
    license: "CC-BY 4.0",
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
            Acesso à Informação
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Contratos e parcerias
          </h1>
          <p className="mt-2 max-w-3xl text-white/70">
            Consulte objeto, valor estimado, vigência e situação. Versões
            assinadas e aditivos serão publicados aqui após conferência
            jurídica.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Instrumentos ativos" value="2" />
          <Stat label="Em cooperação" value="1" />
          <Stat label="Última atualização" value="nov/2025" />
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="text-sm font-medium text-white">
              Listagem resumida
            </div>
            <div className="text-xs text-white/60">
              Para cópias integrais, use Contato ou o protocolo oficial de
              pedidos.
            </div>
          </div>

          <ul className="divide-y divide-white/10">
            {CONTRACTS.map((c) => (
              <li key={c.title} className="px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-white">
                      {c.title}
                    </h2>
                    <p className="text-sm text-white/70">{c.partner}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/60">
                      <span className="rounded border border-white/15 bg-white/5 px-2 py-1">
                        {c.term}
                      </span>
                      <span className="rounded border border-white/15 bg-white/5 px-2 py-1">
                        {c.value}
                      </span>
                      <span className="rounded border border-white/15 bg-white/5 px-2 py-1">
                        {c.status}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={c.link || "#"}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white">Como solicitar</h2>
          <p className="mt-2 text-sm text-white/70">
            Caso precise de cópias integrais ou esclarecimentos, envie protocolo
            pela seção{" "}
            <Link href="/contato" className="underline underline-offset-2">
              Contato
            </Link>{" "}
            ou abra um pedido formal em{" "}
            <Link
              href="/acesso-a-informacao"
              className="underline underline-offset-2"
            >
              Acesso à Informação
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
