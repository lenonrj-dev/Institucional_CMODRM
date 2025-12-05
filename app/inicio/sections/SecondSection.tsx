"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DocCard from "../../../components/sections/DocCard";
// (opcional) variantes simples; se quiser usar seu lib/motion.js,
// ajuste para importar de ../../lib/motion.js
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const stagger = {
  show: { transition: { staggerChildren: 0.06 } },
};

export default function SecondSection() {
  // dados de exemplo — troque pelos seus conteúdos reais quando quiser
  const items = [
    {
      title: "Funcionários da Metalúrgica Barbará (1950)",
      description:
        "Registro histórico dos Trabalhadores Metalúrgicos da Barbará na decada de 1950",
      href: "/producao-bibliografica/ata-1964",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821839/Funcion%C3%A1rios_metal%C3%BArgicos_da_Barbar%C3%A1_vka9kq.jpg"
    },
    {
      title: "Funcionários da Siderurgica de Barra msansa (1950)",
      description:
        "Registro Histórico de Trabalhadores da Siderurgia de Barra Mansa na decada de 1950",
      href: "/producao-bibliografica/boletim-1978",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg"
    },
    {
      title: "Obelisco em Homenagem aos operários de Barra Mansa (1933)",
      description:
        "Obelisco em Homenagem aos operários de Barra Mansa inaugurado em 1 de Maio de 1933. Fonte: Academia Barramansense de História.",
      href: "/producao-bibliografica/cartaz-1985",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821814/Obelisco_em_Homenagem_aos_oper%C3%A1rios_de_Barra_Mansa_inaugurado_em_1_de_Maio_de_1933_doyk04.jpg",
    },
    {
      title: "Lançamento da Pedra Fundamental da Siderúrgica Barra Mansa (1935)",
      description:
        "1935: Lançamento da Pedra Fundamental da Siderúrgica Barra Mansa. Assinado o Dr. Dario Aragão",
      href: "/producao-bibliografica/memorial-fotografico",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821776/1935_Lan%C3%A7amento_da_pedra_fundamental_sbm_assinando_dr_dario_aragao_upoqze.jpg",
    },
    {
      title: "Construção da Companhia Néstle em (1936)",
      description:
        "Ano que caracteriza a construção de toda companhia da néstle na decada de 1936",
      href: "/producao-bibliografica/relatorio-gestao",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821783/construcao_da_cia_nestle_1936_t6voez.jpg",
    },
    {
      title: "Tropas policiais de Barra Mansa, Nova Iguaçu e Niterói reprimem manifestação popular.",
      description:
        "ocasião do assassinato do líder sindical Rubem Machado, presidente do Sindicato dos Trabalhadores da Construção Civil de Volta Redonda-RJ e região",
      href: "/producao-bibliografica/entrevistas",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821799/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_2_fpkf7o.png",
    },
    {
      title: "O Movimento Operário no Sul Fluminense. (2025)",
      description:
        "Todo nosso agradecimento é pouco pela enorme ajuda até aqui. Os trabalhadores e o Sindicato dos trabalhadores da Construção Civil de Volta Redonda-RJ e região agradecem.",
      href: "/producao-bibliografica/clipping",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821745/Movimento_Oper%C3%A1rio_no_Sul_Fluminense_ksjauk.jpg",
    },
    {
      title: "Tropas policiais de Barra Mansa, Nova Iguaçu e Niterói reprimem manifestação popular",
      description:
        "ocasião do assassinato do líder sindical Rubem Machado, presidente do Sindicato dos Trabalhadores da Construção Civil de Volta Redonda-RJ e região",
      href: "/producao-bibliografica/linha-do-tempo",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-12">
      {/* Cabeçalho */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-2 text-xs uppercase tracking-widest text-white/50">
          Fundos de Acervo Pessoal
        </p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          Dom Waldyr Calheiros
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
          Documentação, relatos e publicações que registram a presença pastoral de Dom Waldyr junto aos trabalhadores de Volta Redonda e Barra Mansa. Um acervo para pesquisa, mediação e inspiração de novas leituras.
        </p>

        {/* CTA principal */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/producao-bibliografica"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Ver produção bibliográfica
          </Link>
          <Link
            href="/acervo/fundos/dom-waldyr"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            Sobre o Fundo
          </Link>
        </div>
      </motion.div>

      {/* Grade de documentos */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((it, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="h-full">
            <DocCard
              title={it.title}
              description={it.description}
              href={it.href}
              cover={it.cover}
              alt={it.title}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Rodapé da seção (sinalização/legenda) */}
      <div className="mx-auto mt-8 max-w-3xl text-center text-xs text-white/50">
        Conteúdos ilustrativos. A organização final seguirá o
        catálogo oficial do acervo.
      </div>
    </section>
  );
}
