// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { getSiteContent } from "../lib/get-site-content";

export const metadata: Metadata = {
  title: "Centro de Memória Operária Digitalizada Rubem Machado",
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
  const { global } = await getSiteContent();

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
