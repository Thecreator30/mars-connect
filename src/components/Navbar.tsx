import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import marsLogo from "@/assets/mars-logo.png";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Opportunité", to: "/opportunite" },
  { label: "Académie", to: "/academie" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={marsLogo}
            alt="MARS Group"
            className="h-8 w-auto transition-all duration-300 group-hover:brightness-110"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-medium tracking-wide uppercase rounded-lg transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://crm.mars-lgc.com" target="_blank" rel="noopener noreferrer">
            <Button
              className="btn-neon bg-primary text-primary-foreground font-heading font-semibold tracking-wide hover:bg-primary/90 box-glow-green"
              size="sm"
            >
              Me connecter
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/30 animate-fade-in-up">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 text-sm font-medium uppercase tracking-wide rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="https://crm.mars-lgc.com" target="_blank" rel="noopener noreferrer">
              <Button className="mt-3 w-full btn-neon bg-primary text-primary-foreground font-heading font-semibold">
                Me connecter
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
