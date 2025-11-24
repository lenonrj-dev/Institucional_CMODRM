 // components/footer/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Sintracon. Todos os direitos reservados.
          </p>
          <nav className="flex gap-4 text-sm text-white/70">
            <a href="/privacy" className="hover:text-white">Privacidade</a>
            <a href="/terms" className="hover:text-white">Termos</a>
            <a href="/contact" className="hover:text-white">Contato</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
