// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import type { SiteContent } from "../lib/content-types";

export const metadata: Metadata = {
  title: "Sintracon",
  description: "Site Sintracon",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-black text-slate-200 antialiased">
        {/* Shell global: navbar, conteúdo e footer */}
        <ContentShell>{children}</ContentShell>
      </body>
    </html>
  );
}

// Server Component que carrega o conteúdo global
async function ContentShell({ children }: { children: ReactNode }) {
  const { global } = await loadContent();

  return (
    <>
      <Navbar items={global.navbar.items} socials={global.navbar.socials} />
      <main
        id="main"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {children}
      </main>
      <Footer content={global.footer} />
    </>
  );
}

// Busca o conteúdo global via rota interna do próprio Next
async function loadContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/content`, {
    // revalida a cada 1h (ajusta se quiser)
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo global");
  }

  return res.json();
}
