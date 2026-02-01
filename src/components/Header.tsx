import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
import fenixLogo from "@/assets/fenix-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#impacto", label: "Nosso Impacto" },
    { href: "#historias", label: "Histórias" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber flex items-center justify-center glow-gold transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <img
                src={fenixLogo}
                alt="Fênix Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-foreground tracking-wide">
                FÊNIX
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5">
                Projeto Social
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a href="#donation-form" className="btn-luminis py-2.5 px-5 text-sm">
              Doar Agora
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 flex flex-col gap-1.5 ${
              isMenuOpen ? "hamburger-open" : ""
            }`}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            {/* Theme Toggle */}
            <div className="mb-4">
              <ThemeToggle />
            </div>

            {/* Mobile nav links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-2xl font-serif text-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              href="#donation-form"
              onClick={handleLinkClick}
              className="btn-luminis py-4 px-8 text-lg mt-4"
            >
              Doar Agora
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
