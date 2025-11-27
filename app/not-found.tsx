// app/not-found.js
import Link from "next/link";

const STATUS = [
  {
    label: "Arquitetura de navegação",
    value: "Concluída",
    note: "Fluxos e rotas já mapeados.",
  },
  {
    label: "Interface e tipografia",
    value: "Polindo detalhes",
    note: "Ajustando contrastes e microinterações.",
  },
  {
    label: "Conteúdo editorial",
    value: "Em curadoria",
    note: "Organizando textos, créditos e fontes.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Experiência contínua",
    text:
      "Esta página seguirá o mesmo traço visual do projeto: fundo escuro, brilho suave e componentes respiráveis.",
  },
  {
    title: "Acesso antecipado",
    text:
      "Enquanto finalizamos, você pode navegar pelo acervo, consultar a política nacional ou falar com a equipe.",
  },
  {
    title: "Linha direta",
    text:
      "Precisa do conteúdo agora? Envie uma mensagem pelo Contato e priorizaremos o que for urgente.",
  },
];

export default function NotFound() {
  return (
    <section className="relative w-full bg-black py-12 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            404
          </span>
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Página em construção
            </p>
            <p className="text-sm text-white/70">
              Estamos lapidando esta área para entrar no ar em breve.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Ainda não disponível
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Em construção, mas quase lá.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/70">
                A estrutura já está pronta. Agora estamos refinando narrativa, acessibilidade
                e performance para entregar uma experiência consistente com o restante do site.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/inicio"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/90 px-4 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Voltar ao início
                </Link>
                <Link
                  href="/acervo"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-black/50 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-black/60 hover:text-white"
                >
                  Explorar o acervo
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Avisar a equipe
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Próximos passos
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                      Revisão editorial e créditos.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                      Testes de acessibilidade e leitura.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                      Ajustes finais de performance e SEO.
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Status geral
                  </p>
                  <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-white/70" />
                  </div>
                  <p className="mt-2 text-xs text-white/60">
                    72% concluído · polimento de interface e conteúdo em andamento.
                  </p>
                </div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
                    <span className="flex h-2 w-2 animate-pulse rounded-full bg-white/80" />
                    Atualizando artefatos e microanimações.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 bg-black/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Linha de construção
                    </p>
                    <p className="text-lg font-semibold text-white">Evolução em camadas</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    Online
                  </span>
                </div>

                <ul className="mt-4 space-y-3">
                  {STATUS.map((item) => (
                    <li
                      key={item.label}
                      className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/80" />
                          <div>
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="text-xs text-white/60">{item.note}</p>
                          </div>
                        </div>
                        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
                          {item.value}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Atalhos úteis
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Link
                    href="/politica-nacional"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-black/40 hover:text-white"
                  >
                    Política Nacional de Arquivos
                  </Link>
                  <Link
                    href="/transparencia"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-black/40 hover:text-white"
                  >
                    Transparência e relatórios
                  </Link>
                  <Link
                    href="/jornais-de-epoca"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-black/40 hover:text-white"
                  >
                    Jornais de época
                  </Link>
                  <Link
                    href="/acervo-pessoal/rubem-machado"
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-black/40 hover:text-white"
                  >
                    Acervo pessoal: Rubem Machado
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 bg-black/30 px-6 py-6 sm:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.7)]"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
