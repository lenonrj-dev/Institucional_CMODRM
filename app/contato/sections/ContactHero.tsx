"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactHero() {
  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-widest text-white/50">
          Fale conosco
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          Contato — Banco de Memória
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Estamos à disposição para demandas de pesquisa, doações de acervo, imprensa e atendimento ao trabalhador.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#form"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Enviar mensagem <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:+551100000000"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <Phone className="h-4 w-4" /> (11) 0000-0000
          </a>
          <a
            href="mailto:contato@sintracon.org.br"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <Mail className="h-4 w-4" /> contato@sintracon.org.br
          </a>
        </div>
      </motion.div>
    </section>
  );
}
