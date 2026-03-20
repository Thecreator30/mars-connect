import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/40">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
                M
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                MARS <span className="text-primary">GROUP</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              L'écosystème digital qui connecte consultants indépendants à un portefeuille complet de services innovants.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {["Accueil", "Services", "Opportunité", "Académie", "Contact"].map((label, i) => (
                <Link
                  key={label}
                  to={["/ ", "/services", "/opportunite", "/academie", "/contact"][i]}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
              Nos Services
            </h4>
            <div className="flex flex-col gap-2">
              {["Ekonom-IA", "Auxil-IA", "Mara-A Construct", "Mara-A Invest", "Énergie"].map((s) => (
                <span key={s} className="text-sm text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@mars-lgc.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> contact@mars-lgc.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> Belgique & France
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mars Group. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
