"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Mail, Linkedin, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

// Exemplo ilustrativo — substitua quando tiver os dados reais
const TEAM = [
  {
    name: "Rubem Machado",
    role: "Coordenação Geral & Curadoria",
    bio: "Estratégia do acervo, diretrizes de preservação e validação histórica.",
    photo: "/hero.png",
    tags: ["Curadoria", "Gestão", "Memória"],
    href: "/equipe-tecnica/rubem-machado",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Ana Bezerra",
    role: "Arquivista Chefe",
    bio: "Classificação, descrição e políticas de acesso ao acervo.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    tags: ["Arquivística", "Catalogação", "Acesso"],
    href: "/equipe-tecnica/ana-bezerra",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Carlos Figueiredo",
    role: "Historiador",
    bio: "Contextualização, recorte temporal e verificação de fontes.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["Pesquisa", "Contexto", "Fontes"],
    href: "/equipe-tecnica/carlos-figueiredo",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Marina Lopes",
    role: "Líder de Digitalização",
    bio: "Fluxo de captura, restauração e padrões de imagem.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["Digitalização", "Restauração", "Metadados"],
    href: "/equipe-tecnica/marina-lopes",
    email: "#",
    linkedin: "#",
  },
  {
    name: "João Nascimento",
    role: "Eng. de Software",
    bio: "Aplicação, pesquisa e interface com o banco de memória.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["Full-stack", "Next.js", "UX"],
    href: "/equipe-tecnica/joao-nascimento",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Lívia Rocha",
    role: "Infra & DevOps",
    bio: "Escalabilidade, backups e observabilidade do ambiente.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["Infra", "S3/KVM", "Segurança"],
    href: "/equipe-tecnica/livia-rocha",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Paulo Tavares",
    role: "Design & Acessibilidade",
    bio: "Identidade visual e leitura confortável em todas as telas.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["UI", "A11y", "Sistemas"],
    href: "/equipe-tecnica/paulo-tavares",
    email: "#",
    linkedin: "#",
  },
  {
    name: "Sofia Mendes",
    role: "Gestão de Conteúdo",
    bio: "Padronização editorial, revisão e publicação de coleções.",
    photo: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    tags: ["Editorial", "Padrões", "Publicação"],
    href: "/equipe-tecnica/sofia-mendes",
    email: "#",
    linkedin: "#",
  },
];

export default function FifthSection() {
  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl"
      >
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <Users className="h-4 w-4" />
              Equipe Técnica
            </div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Quem faz o Centro de Memória Operária acontecer
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Um time multidisciplinar dedicado à preservação, pesquisa e acesso público.
              Conheça as funções, competências e frentes de atuação.
            </p>
          </div>

          <Link
            href="/equipe-tecnica"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Ver equipe completa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grade de pessoas */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((p, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
            >
              {/* Foto */}
              <div className="relative overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.photo}
                    alt={`Foto de ${p.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 25vw,(min-width:640px) 50vw,100vw"
                    priority={false}
                  />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="pt-3">
                <h4 className="text-base font-semibold text-white/90">{p.name}</h4>
                <p className="mt-0.5 text-sm text-white/70">{p.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.bio}</p>

                {/* Tags de especialidade */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label={`Ver perfil de ${p.name}`}
                >
                  Ver perfil <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="ml-auto flex items-center gap-2">
                  <a
                    href={p.email}
                    aria-label={`Enviar e-mail para ${p.name}`}
                    className="inline-flex rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={p.linkedin}
                    aria-label={`LinkedIn de ${p.name}`}
                    className="inline-flex rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Glow sutil no hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-white/0 transition group-hover:ring-2 group-hover:ring-white/10" />
            </motion.article>
          ))}
        </motion.div>

        {/* Nota de escopo */}
        <p className="mt-6 text-center text-xs text-white/50">
          Estrutura ilustrativa. A composição e os contatos oficiais serão publicados na página da equipe.
        </p>
      </motion.div>
    </section>
  );
}
