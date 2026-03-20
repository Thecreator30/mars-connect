import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  TrendingUp, Award, Target, Users, ArrowRight,
  ChevronRight, DollarSign, Layers, Gift, Handshake, FileText, Zap
} from "lucide-react";

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

const ranks = [
  { name: "Candidat", bv: "0", perk: "Accès à la boutique" },
  { name: "Consultant", bv: "1 000", perk: "Commissions directes" },
  { name: "Manager", bv: "5 000", perk: "Bonus équipe Niv.1" },
  { name: "Directeur", bv: "15 000", perk: "Bonus équipe Niv.2" },
  { name: "Vice-Président", bv: "40 000", perk: "Matching bonus" },
  { name: "Président", bv: "100 000", perk: "Bonus leadership" },
  { name: "Diamant", bv: "250 000", perk: "Pool global" },
  { name: "Ambassadeur", bv: "500 000+", perk: "Revenus élite" },
];

const commissionTypes = [
  { icon: DollarSign, name: "Commissions directes", desc: "Gagnez sur chaque vente personnelle réalisée via votre boutique." },
  { icon: Layers, name: "Commissions par niveau", desc: "Revenus sur les ventes de votre réseau, sur plusieurs niveaux de profondeur." },
  { icon: Award, name: "Bonus de rang", desc: "Primes supplémentaires débloquées à chaque progression de rang." },
  { icon: Handshake, name: "Matching bonus", desc: "Pourcentage sur les commissions des leaders que vous avez formés." },
  { icon: FileText, name: "Commissions dossier", desc: "Rémunération spécifique sur les dossiers Mara-A (rénovation, immobilier)." },
];

/* Revenue Simulator */
function RevenueSimulator() {
  const [products, setProducts] = useState(10);
  const [teamSize, setTeamSize] = useState(5);

  const baseCommission = products * 25;
  const teamCommission = teamSize * products * 5;
  const multiplier = products >= 51 ? 1.5 : 1;
  const total = (baseCommission + teamCommission) * multiplier;

  return (
    <div className="glass rounded-2xl p-8 md:p-10">
      <h3 className="font-heading font-bold text-xl text-foreground mb-6 text-center">Simulateur de revenus</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Vos ventes mensuelles</span>
              <span className="text-foreground font-semibold">{products} produits</span>
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={products}
              onChange={(e) => setProducts(+e.target.value)}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Taille de votre équipe</span>
              <span className="text-foreground font-semibold">{teamSize} personnes</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={teamSize}
              onChange={(e) => setTeamSize(+e.target.value)}
              className="w-full accent-primary"
            />
          </div>
          {multiplier > 1 && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Zap size={14} /> Boost x1.5 activé !
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center glass rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Revenus mensuels estimés</p>
          <p className="font-heading font-bold text-4xl text-primary text-glow-green">
            {Math.round(total).toLocaleString("fr-BE")} €
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Simulation indicative — résultats réels variables
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Opportunite() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Opportunité</p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6" style={{ textWrap: "balance" }}>
              Construisez votre avenir avec Mars Group
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Un plan de rémunération transparent, structuré et ambitieux. 8 rangs, 5 types de commissions, des bonus de démarrage et un multiplicateur de performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Commission types */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-12">5 types de commissions</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commissionTypes.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-400 h-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary">
                    <c.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{c.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
            {/* Fast Start card */}
            <Reveal delay={5 * 80}>
              <div className="glass rounded-2xl p-6 border-primary/30 h-full">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary">
                  <Gift size={20} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Fast Start 500€</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Atteignez 25 000 BV en 15 jours et décrochez votre prime de démarrage rapide.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ranks */}
      <section className="pb-24 bg-card/30 py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-12">8 rangs de progression</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ranks.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <div className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 text-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{r.name}</h3>
                  <p className="text-xs text-primary mt-1">{r.bv} BV</p>
                  <p className="text-xs text-muted-foreground mt-2">{r.perk}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <RevenueSimulator />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Prêt à démarrer ?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Rejoignez Mars Group dès maintenant et commencez à construire votre réseau.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-neon bg-primary text-primary-foreground font-heading font-semibold px-8 h-12 box-glow-green active:scale-[0.97] transition-transform">
                Nous contacter <ArrowRight size={18} />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
