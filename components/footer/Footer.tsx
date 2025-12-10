import Link from "next/link";
import { useMemo } from "react";
import type { GlobalContent } from "../../lib/content-types";
type FooterProps = {
  content?: GlobalContent["footer"];
};

export default function Footer({ content }: FooterProps) {
  const year = useMemo(() => new Date().getFullYear(), []);
  const links = content?.links || [
    { label: "Privacidade", href: "/privacy" },
    { label: "Termos", href: "/terms" },
    { label: "Contato", href: "/contact" },
  ];
  const copyright = content?.copyright || `© ${year} Sintracon. Todos os direitos reservados.`;

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/60">{copyright}</p>
          <nav className="flex gap-4 text-sm text-white/70">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
