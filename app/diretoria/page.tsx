// app/diretoria/page.js — Pirâmide da Diretoria (hierarquia 1–2–3–4)
// Server Component (sem "use client"), estilização com Tailwind v4 e imagens Cloudinary

import Image from "next/image";

export const metadata = {
  title: "Diretoria — Banco de Memória | Sintracon",
  description:
    "Estrutura diretiva apresentada em formato de pirâmide: Presidência, Vice/Secretaria, Diretoria Executiva e Conselho.",
  alternates: { canonical: "/diretoria" },
};

// =====================================================
// DADOS (fictícios para demonstração)
// =====================================================
const BOARD = {
  title: "Diretoria",
  subtitle: "Gestão 2025–2028",
  levels: [
    {
      key: "presidencia",
      label: "Presidência",
      members: [
        {
          name: "Rubens Almeida",
          role: "Presidente",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        },
      ],
    },
    {
      key: "vice-sec",
      label: "Vice-Presidência & Secretaria",
      members: [
        {
          name: "Marina Duarte",
          role: "Vice-Presidente",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
        {
          name: "Edson Ribeiro",
          role: "Secretário-Geral",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
      ],
    },
    {
      key: "executiva",
      label: "Diretoria Executiva",
      members: [
        {
          name: "Lívia Nascimento",
          role: "Diretora de Comunicação",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        },
        {
          name: "Carlos Menezes",
          role: "Diretor Financeiro",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        },
        {
          name: "Juliana Pires",
          role: "Diretora de Formação",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
        },
      ],
    },
    {
      key: "conselho",
      label: "Conselho",
      members: [
        {
          name: "André Souza",
          role: "Conselheiro",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
        {
          name: "Bianca Monteiro",
          role: "Conselheira",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
        {
          name: "Felipe Araújo",
          role: "Conselheiro",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
        {
          name: "Renata Carvalho",
          role: "Conselheira",
          photo:
            "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
        },
      ],
    },
  ],
};

// =====================================================
// COMPONENTES
// =====================================================
function SectionHeader({ title, subtitle }) {
  return (
    <header className="mb-8 sm:mb-10">
      {subtitle && (
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">
          {subtitle}
        </p>
      )}
      <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
        {title}
      </h1>
    </header>
  );
}

function PersonNode({ name, role, photo }) {
  return (
    <div
      className="group relative flex w-full min-w-[200px] max-w-[260px] flex-col items-center rounded-2xl border border-white/10 bg-zinc-950/60 p-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
      role="listitem"
    >
      {/* conector vertical superior */}
      <span
        className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-white/12 md:block"
        aria-hidden
      />

      <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/10">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="px-1">
        <div className="text-base font-semibold text-white">{name}</div>
        <div className="mt-0.5 text-xs text-white/70">{role}</div>
      </div>

      {/* glow hover sutil */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" style={{background:"radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent)"}} />
    </div>
  );
}

function Tier({ label, members, columns }) {
  const col = columns ?? Math.min(4, Math.max(1, members.length));
  return (
    <section className="relative mx-auto w-full max-w-6xl py-4">
      {/* linha horizontal atrás das cards (conector) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 hidden h-px w-[72%] -translate-x-1/2 bg-white/10 md:block"
        aria-hidden
      />

      {label && (
        <h2 className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.20em] text-white/60">
          {label}
        </h2>
      )}

      <ul
        role="list"
        className={`mx-auto grid max-w-6xl place-items-center gap-3 sm:gap-4 [--col:${col}]`} // col calculada
        style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
      >
        {members.map((m, i) => (
          <li key={i} className="flex w-full justify-center">
            <PersonNode {...m} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// =====================================================
// PÁGINA
// =====================================================
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sintracon — Diretoria",
    department: BOARD.levels.map((l) => ({
      "@type": "Organization",
      name: l.label,
      member: l.members.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role })),
    })),
  };

  return (
    <main id="main" className="relative w-full py-10 sm:py-12 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={BOARD.title} subtitle={BOARD.subtitle} />

        {/* Pirâmide */}
        <div className="relative">
          {/* fundo com grid sutil */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-0 rounded-3xl border border-white/5 bg-black/30"
            style={{
              backgroundImage:
                "linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)",
              backgroundSize: "28px_28px,28px_28px",
              maskImage: "radial-gradient(120%_80%_at_50%_0%,black,transparent)",
            }}
            aria-hidden
          />

          {/* Nível 1 */}
          <Tier label={BOARD.levels[0].label} members={BOARD.levels[0].members} columns={1} />

          {/* Nível 2 */}
          <Tier label={BOARD.levels[1].label} members={BOARD.levels[1].members} columns={2} />

          {/* Nível 3 */}
          <Tier label={BOARD.levels[2].label} members={BOARD.levels[2].members} columns={3} />

          {/* Nível 4 */}
          <Tier label={BOARD.levels[3].label} members={BOARD.levels[3].members} columns={4} />
        </div>

        {/* Rodapé curto */}
        <p className="mt-8 text-center text-xs text-white/50">
          Estrutura organizacional fictícia para demonstração. Substitua nomes, cargos e fotos quando desejar.
        </p>
      </div>
    </main>
  );
}
