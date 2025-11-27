"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

const qa = [
  {
    q: "Qual o prazo de resposta?",
    a: "Até 2 dias úteis, dependendo do volume de solicitações.",
  },
  {
    q: "Posso solicitar cópias digitalizadas?",
    a: "Sim, conforme política de uso e direitos. Alguns materiais exigem autorização.",
  },
  {
    q: "Como doar materiais ao acervo?",
    a: "Envie detalhes pelo formulário ou e-mail. A equipe orienta a avaliação e os trâmites.",
  },
  {
    q: "Há atendimento presencial para pesquisa?",
    a: "Sim, com agendamento e disponibilidade. Consulte horários e traga documento.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-white/70" />
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Perguntas frequentes</h2>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60">
          {qa.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="p-4 sm:p-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-base font-medium text-white/90">{item.q}</span>
                  <span className="text-white/60">{isOpen ? "–" : "+"}</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 text-sm leading-relaxed text-white/70"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-white/50">
          Para outros assuntos, consulte nossa{" "}
          <a className="underline hover:text-white" href="/acesso-a-informacao/politica">
            Política de Transparência
          </a>
          .
        </p>
      </div>
    </section>
  );
}
