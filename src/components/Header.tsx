import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/siteContent";

type HeaderProps = {
  onOpenCalendly: () => void;
};

export function Header({ onOpenCalendly }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const openCalendly = () => {
    closeMenu();
    onOpenCalendly();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-stone-200/80 bg-white/86 px-3 py-2 shadow-sm backdrop-blur-xl sm:px-4">
        <a href="#top" className="brand-logo-link focus-ring" onClick={closeMenu}>
          <img
            src="/assets/nplusone-logo.svg"
            alt="NplusOne"
            className="brand-logo-image"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary header-primary-cta"
            onClick={openCalendly}
          >
            Let&apos;s discuss your idea
          </button>
          <button
            type="button"
            className="btn btn-primary header-compact-cta px-4 py-2 text-sm"
            onClick={openCalendly}
          >
            Discuss
          </button>
          <button
            type="button"
            className="icon-button header-menu-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-6xl rounded-3xl border border-stone-200 bg-white p-3 shadow-xl md:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
