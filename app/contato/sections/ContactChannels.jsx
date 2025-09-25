"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MessageSquare, Building2, Newspaper } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const cards = [
  {
    title: "Atendimento ao Trabalhador",
    subtitle: "Dúvidas e orientações",
    href: "mailto:atendimento@sintracon.org.br",
    icon: Phone,
    desc: "Direitos, documentos e encaminhamentos. Resposta em até 2 dias úteis.",
  },
  {
    title: "Pesquisa & Acervo",
    subtitle: "Solicitações de pesquisa",
    href: "mailto:acervo@sintracon.org.br",
    icon: Mail,
    desc: "Consulta ao banco de memória, doações, reproduções e uso de imagem.",
  },
  {
    title: "WhatsApp",
    subtitle: "Mensagens rápidas",
    href: "https://wa.me/5500000000000",
    icon: MessageSquare,
    desc: "Atendimento em horário comercial. Não enviar documentos sensíveis.",
  },
  {
    title: "Imprensa",
    subtitle: "Assessoria",
    href: "mailto:imprensa@sintracon.org.br",
    icon: Newspaper,
    desc: "Entrevistas, dados e imagens com crédito institucional.",
  },
  {
    title: "Atendimento Presencial",
    subtitle: "Matriz",
    href: "#enderecos",
    icon: Building2,
    desc: "Endereço, horários e agendamento para consulta local.",
  },
];

export default function ContactChannels() {
  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Canais oficiais
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Escolha o canal de acordo com sua demanda para agilizar o atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <c.icon className="h-5 w-5 text-white/80" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white/90">
                    {c.title}
                  </h3>
                  <p className="text-sm text-white/60">{c.subtitle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{c.desc}</p>
              <div className="mt-3 text-sm text-white/80 underline-offset-2 group-hover:underline">
                Acessar canal
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
