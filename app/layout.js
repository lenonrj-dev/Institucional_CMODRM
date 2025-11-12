// app/layout.js
export const metadata = {
  title: "Sintracon",
  description: "Site Sintracon",
};

import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-black text-slate-200 antialiased">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
