"use client";

import { motion } from "framer-motion";
import { MapPin, Clock3, Accessibility } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactAddresses() {
  return (
    <section id="enderecos" className="relative w-full py-8 sm:py-12 lg:py-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Endereços & horários</h2>
        <p className="mt-2 text-sm text-white/70">
          Atendimento presencial mediante disponibilidade. Traga documento com foto.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            title="Matriz — Centro de Memória"
            address="Rua Exemplo, 123 — Centro, São Paulo/SP"
            hours="Seg a Sex, 9h–17h"
            a11y="Acesso facilitado, elevador, sanitários"
          />
          <Card
            title="Unidade de Atendimento"
            address="Av. Modelo, 456 — Bairro, São Paulo/SP"
            hours="Seg a Sex, 10h–16h"
            a11y="Rampa de acesso, balcão prioritário"
          />
        </div>
      </motion.div>
    </section>
  );
}

function Card({ title, address, hours, a11y }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
      <h3 className="text-base font-semibold text-white/90">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-white/70">
        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{address}</p>
        <p className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{hours}</p>
        <p className="flex items-center gap-2"><Accessibility className="h-4 w-4" />{a11y}</p>
      </div>
    </div>
  );
}
