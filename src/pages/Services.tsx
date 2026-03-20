import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Bot, ShoppingBag, Building2, Home, Zap,
  ArrowRight, ChevronRight, ExternalLink
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const services = [
  {
    icon: ShoppingBag,
    name: "Ekonom-IA",
    tagline: "Marketplace locale intelligente",
    desc: "Transformez chaque passant en client fidèle grâce aux QR codes dynamiques, notifications géolocalisées et fidélisation automatisée par intelligence artificielle. Commission : 10 %.",
    features: ["QR codes dynamiques par commerçant", "App consommateur PWA", "Coupons et promotions ciblés", "Notifications géolocalisées", "CRM marchands complet", "Fidélisation automatisée par IA"],
    color: "primary",
    url: "https://ekonom-ia.com",
  },
  {
    icon: Bot,
    name: "Auxil-IA",
    tagline: "Agent IA pour professionnels",
    desc: "Automatisez la gestion de vos emails, générez du contenu et assistez vos clients 24/7. Commission : 149 € fixe au setup + 15 % récurrent mensuel. Ratio BV : 1 € = 3 BV.",
    features: ["Chatbot client intégrable 24/7", "Tri et réponse emails automatisés", "Génération de contenu IA", "Rapports et analyses intelligents", "Sauvegarde automatique Drive", "Résumé quotidien"],
    color: "accent",
    url: "https://auxil-ia.io",
  },
  {
    icon: Building2,
    name: "Mara-A Construct",
    tagline: "Rénovation énergétique de A à Z",
    desc: "Isolation, chauffage, panneaux solaires — accompagnement complet pour les primes wallonnes (jusqu'à 70 % remboursé). Commission : 4 % (Candidat) / 8 % (Junior+). Ticket moyen : 15 000 – 25 000 €.",
    features: ["Isolation thermique complète", "Chauffage & pompes à chaleur", "Panneaux solaires", "Accompagnement primes wallonnes", "Devis gratuit personnalisé", "Suivi de chantier dédié"],
    color: "orange",
    url: "https://mara-a.com",
  },
  {
    icon: Home,
    name: "Mara-A Invest",
    tagline: "L'immobilier belge réinventé",
    desc: "Agence immobilière premium. Achat, vente et gestion locative en Belgique. Commission : 3 % de la transaction.",
    features: ["Achat & vente premium", "Gestion locative complète", "Analyse de rentabilité", "Accompagnement personnalisé", "Réseau exclusif de biens", "Conseil fiscal immobilier"],
    color: "blue",
    url: "https://invest.mara-a.com",
  },
  {
    icon: Zap,
    name: "Ecofix Énergie",
    tagline: "Fourniture gaz & électricité",
    desc: "Gaz et électricité aux meilleurs tarifs pour les particuliers et professionnels. Commission : forfait fixe ~40 € par contrat. Produit hors-réseau (pas de BV).",
    features: ["Électricité verte", "Gaz naturel compétitif", "Tarifs négociés réseau", "Facturation transparente"],
    color: "yellow",
    url: "#",
  },
  {
    icon: ExternalLink,
    name: "Assurances",
    tagline: "Couverture complète (FSMA/ORIAS)",
    desc: "Commission : 1 % de la prime annuelle. Réservé aux membres inscrits FSMA/ORIAS (obligation légale). Produit hors-réseau.",
    features: ["Assurance habitation", "Assurance auto", "Assurance vie", "Conformité FSMA"],
    color: "primary",
    url: "#",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "hover:border-primary/40" },
  accent: { bg: "bg-accent/10", text: "text-accent", border: "hover:border-accent/40" },
  orange: { bg: "bg-orange-400/10", text: "text-orange-400", border: "hover:border-orange-400/40" },
  blue: { bg: "bg-blue-400/10", text: "text-blue-400", border: "hover:border-blue-400/40" },
  yellow: { bg: "bg-yellow-400/10", text: "text-yellow-400", border: "hover:border-yellow-400/40" },
};

export default function Services() {
  useSEO({ title: "Nos Services", description: "Ekonom-IA, Auxil-IA, Mara-A Construct, Mara-A Invest, Ecofix Énergie — 7 services digitaux, immobiliers et énergétiques.", path: "/services" });
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Nos Services</p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6" style={{ textWrap: "balance" }}>
              Un portefeuille complet de services innovants
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              5 catégories de services digitaux, immobiliers et énergétiques distribués en réseau. Chaque consultant accède à l'ensemble de l'écosystème.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 space-y-12 max-w-5xl">
          {services.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <Reveal key={s.name} delay={i * 80}>
                <div className={`glass rounded-2xl p-8 md:p-10 ${c.border} transition-all duration-400`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${c.bg} ${c.text}`}>
                        <s.icon size={28} />
                      </div>
                      <h2 className="font-heading font-bold text-2xl text-foreground mb-1">{s.name}</h2>
                      <p className={`text-sm font-medium mb-4 ${c.text}`}>{s.tagline}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                      {s.url !== "#" && (
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className={`font-heading border-border/50 ${c.text} hover:bg-muted/30 active:scale-[0.97] transition-transform`}>
                            Visiter le site <ExternalLink size={14} />
                          </Button>
                        </a>
                      )}
                      {s.url === "#" && (
                        <span className="text-xs text-muted-foreground italic">En cours de développement</span>
                      )}
                    </div>
                    <div className="md:w-72 shrink-0">
                      <h4 className="font-heading font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Fonctionnalités</h4>
                      <div className="space-y-2">
                        {s.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ChevronRight size={14} className={c.text} /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
