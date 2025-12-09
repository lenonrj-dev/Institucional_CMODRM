// app/layout.js
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sintracon",
  description: "Site Sintracon",
};

import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import type { SiteContent } from "./api/content/route";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-black text-slate-200 antialiased">
        {/* Conteúdo global para navbar/footer */}
        
        <ContentShell>{children}</ContentShell>
      </body>
    </html>
  );
}

async function ContentShell({ children }: { children: ReactNode }) {
  const { global } = await loadContent();
  return (
    <>
      <Navbar items={global.navbar.items} socials={global.navbar.socials} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer content={global.footer} />
    </>
  );
}

const base =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

async function loadContent(): Promise<SiteContent> {
  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Não foi possível carregar o conteúdo global");
  return res.json();
}
