// app/acesso-a-informacao/despesas/page.js
import Link from "next/link";

export const metadata = {
  title: "Despesas e custos operacionais — Acesso à Informação | Sintracon",
  description:
    "Notas, empenhos e categorias de gasto com critérios de classificação. Atualização periódica.",
  alternates: { canonical: "/acesso-a-informacao/despesas" },
  robots: { index: true, follow: true },
};

const DESPESAS = [
  {
    title: "Digitalização e restauração",
    mes: "out/2025",
    valor: "R$ 12.800,00",
    categoria: "Preservação",
  },
  {
    title: "Hospedagem e CDN",
    mes: "out/2025",
    valor: "R$ 6.200,00",
    categoria: "Infraestrutura",
  },
  {
    title: "Produção editorial",
    mes: "set/2025",
    valor: "R$ 4.150,00",
    categoria: "Comunicação",
  },
];

const CATEGORIAS = [
  { label: "Preservação", perc: "42%" },
  { label: "Infraestrutura", perc: "33%" },
  { label: "Comunicação", perc: "25%" },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Despesas e custos",
    url: "/acesso-a-informacao/despesas",
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
            Despesas e custos operacionais
          </h1>
          <p className="mt-2 max-w-3xl text-white/70">
            Visão rápida dos principais gastos por mês e por categoria. Planilha
            completa e notas fiscais ficam disponíveis mediante pedido formal.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CATEGORIAS.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                {c.label}
              </div>
              <div className="text-lg font-semibold text-white">{c.perc}</div>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="text-sm font-medium text-white">Despesas recentes</div>
            <div className="text-xs text-white/60">
              Valores em regime de competência. Para empenhos/anexos, solicite
              via Contato.
            </div>
          </div>
          <ul className="divide-y divide-white/10">
            {DESPESAS.map((d) => (
              <li key={d.title} className="px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {d.title}
                    </h2>
                    <p className="text-sm text-white/70">
                      {d.categoria} • {d.mes}
                    </p>
                  </div>
                  <span className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white">
                    {d.valor}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white">Planilha detalhada</h2>
          <p className="mt-2 text-sm text-white/70">
            Envie um protocolo na área{" "}
            <Link href="/acesso-a-informacao" className="underline">
              Acesso à Informação
            </Link>{" "}
            ou solicite a planilha de execução orçamentária pelo{" "}
            <Link href="/contato" className="underline">
              Contato
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
