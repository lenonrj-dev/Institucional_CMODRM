"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrar com /api/contact (Next.js Route Handler) ou serviço de forms
    setSent(true);
  };

  return (
    <section id="form" className="relative w-full py-8 sm:py-12 lg:py-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Envie uma mensagem</h2>
        <p className="mt-2 text-sm text-white/70">
          Preencha o formulário e retornaremos em até 2 dias úteis.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nome completo" id="nome" required />
            <Field label="E-mail" id="email" type="email" required />
            <Field label="Telefone (opcional)" id="telefone" type="tel" />
            <Select
              label="Assunto"
              id="assunto"
              required
              options={[
                "Atendimento ao Trabalhador",
                "Pesquisa / Acervo",
                "Doação de materiais",
                "Imprensa",
                "Outros",
              ]}
            />
          </div>

          <Textarea label="Mensagem" id="mensagem" required rows={6} />

          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/30 p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-white/70" />
            <p className="text-xs text-white/60">
              Ao enviar, você concorda com nossa{" "}
              <a className="underline hover:text-white" href="/politica-de-privacidade">
                Política de Privacidade (LGPD)
              </a>{" "}
              e com o uso das informações para fins de atendimento.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <Send className="h-4 w-4" />
            Enviar
          </button>

          {sent && (
            <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">
              Mensagem enviada! Obrigado pelo contato.
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
}

/* --- Campos reutilizáveis --- */
type FieldProps = { label: string; id: string; type?: string; required?: boolean };
type SelectProps = { label: string; id: string; options?: string[]; required?: boolean };
type TextareaProps = { label: string; id: string; rows?: number; required?: boolean };
function Field({ label, id, type = "text", required = false }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/80">{label}{required && " *"}</span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        placeholder=""
      />
    </label>
  );
}

function Select({ label, id, options = [], required = false }: SelectProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/80">{label}{required && " *"}</span>
      <select
        id={id}
        name={id}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
        defaultValue=""
      >
        <option value="" disabled>Selecione…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, id, rows = 5, required = false }: TextareaProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/80">{label}{required && " *"}</span>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        placeholder=""
      />
    </label>
  );
}