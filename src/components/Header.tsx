import { Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber flex items-center justify-center glow-gold transition-all duration-300 group-hover:scale-105">
            <Sun className="w-5 h-5 text-deep-brown" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold text-foreground tracking-wide">
              LUMINIS
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">
              Projeto Social
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#sobre"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </a>
          <a
            href="#impacto"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Nosso Impacto
          </a>
          <a
            href="#historias"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Histórias
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA */}
        <button className="btn-luminis py-2.5 px-5 text-sm">
          Doar Agora
        </button>
      </nav>
    </header>
  );
};

export default Header;
