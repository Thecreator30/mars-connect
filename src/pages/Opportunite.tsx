import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  TrendingUp, Award, Target, Users, ArrowRight,
  DollarSign, Layers, Gift, Car, Home as HomeIcon,
  Zap, Info, ChevronRight, ShieldCheck
} from "lucide-react";

/* ─── Reveal ─── */
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

/* ─── Data ─── */
const ranks = [
  { name: "Candidat", level: 1, pv: "0", gv: "0", delta: "0%", mobility: "—", home: "—", potential: "Variable" },
  { name: "Junior", level: 2, pv: "500", gv: "0", delta: "4%", mobility: "—", home: "—", potential: "500 – 2 000 €" },
  { name: "Senior", level: 3, pv: "1 000", gv: "5 000", delta: "8%", mobility: "—", home: "—", potential: "1 000 – 4 000 €" },
  { name: "Coach", level: 4, pv: "2 000", gv: "25 000", delta: "12%", mobility: "500 €", home: "—", potential: "2 000 – 7 000 €" },
  { name: "Manager", level: 5, pv: "3 000", gv: "75 000", delta: "16%", mobility: "1 250 €", home: "1 250 €", potential: "5 000 – 15 000 €" },
  { name: "Directeur", level: 6, pv: "5 000", gv: "200 000", delta: "20%", mobility: "2 250 €", home: "2 250 €", potential: "10 000 – 30 000 €" },
  { name: "Président", level: 7, pv: "7 500", gv: "500 000", delta: "24%", mobility: "3 500 €", home: "3 500 €", potential: "20 000 – 50 000 €" },
  { name: "Ambassadeur", level: 8, pv: "10 000", gv: "1 000 000", delta: "28%", mobility: "6 000 €", home: "6 000 €", potential: "50 000+ €" },
];

const revenueSources = [
  { icon: DollarSign, name: "Commission Directe (Retail)", desc: "Sur chaque vente personnelle. Pas besoin d'équipe, pas besoin de rang. De 4 % à 149 € fixe selon le produit." },
  { icon: Layers, name: "Leadership Delta", desc: "Système différentiel sur les BV de votre downline. Vous percevez la différence entre votre taux et celui de vos filleuls." },
  { icon: Gift, name: "Fast Start Bonus", desc: "250 € membre + 250 € parrain à 25 000 BV en 60 jours. Doublé (500 € + 500 €) à 50 000 BV." },
  { icon: Car, name: "Mobility Bonus", desc: "Prime fixe mensuelle dès Coach (500 €/mois). Calculée en système Delta pour une redistribution équitable." },
  { icon: HomeIcon, name: "Home Bonus", desc: "Prime fixe mensuelle dès Manager (1 250 €/mois). Même logique Delta que le Mobility Bonus." },
];

const productCommissions = [
  { product: "Mara-A Construct", rate: "4 % (Candidat) / 8 % (Junior+)", example: "Dossier 20 000 €", commission: "800 – 1 600 €" },
  { product: "Auxil-IA Setup", rate: "149 € fixe", example: "Setup 199 €", commission: "149 €" },
  { product: "Auxil-IA Recurring", rate: "15 % mensuel", example: "Client 33 €/mois", commission: "4,95 €/mois" },
  { product: "Ekonom-IA", rate: "10 %", example: "Merchant 50 €", commission: "5 €" },
  { product: "Mara-A Invest", rate: "3 %", example: "Transaction 100 000 €", commission: "3 000 €" },
  { product: "Ecofix Énergie", rate: "Forfait ~40 €", example: "Contrat énergie", commission: "~40 €" },
  { product: "Assurances (FSMA)", rate: "1 % prime", example: "Prime 2 000 €", commission: "20 €" },
];

/* ─── Scenario Simulator ─── */
function ScenarioSimulator() {
  const [tab, setTab] = useState<"terrain" | "digital">("terrain");

  const terrainData = [
    { mois: "Mois 1", auxilia: "2 × 149 €", energie: "3 × 30 €", mara: "—", cash: "388 €", recurring: "10 €/mois" },
    { mois: "Mois 3", auxilia: "3 × 149 €", energie: "5 × 30 €", mara: "1 × 1 200 €", cash: "1 797 €", recurring: "45 €/mois" },
    { mois: "Mois 6", auxilia: "4 × 149 €", energie: "5 × 30 €", mara: "1 × 1 200 €", cash: "1 946 €", recurring: "100 €/mois" },
    { mois: "Mois 12", auxilia: "5 × 149 €", energie: "5 × 30 €", mara: "2 × 1 200 €", cash: "3 495 €", recurring: "200 €/mois" },
  ];

  const digitalData = [
    { mois: "Mois 3", ventes: "5/mois", cashSetup: "745 €", clients: "11", recurring: "53 €", total: "798 €" },
    { mois: "Mois 6", ventes: "5/mois", cashSetup: "745 €", clients: "25", recurring: "125 €", total: "870 €" },
    { mois: "Mois 12", ventes: "35/mois réseau", cashSetup: "2 245 €", clients: "300", recurring: "500 €", total: "2 745 €" },
    { mois: "Mois 24", ventes: "100/mois réseau", cashSetup: "5 745 €", clients: "600+", recurring: "1 500 €", total: "7 245 €" },
  ];

  return (
    <div className="glass rounded-2xl p-8 md:p-10">
      <h3 className="font-heading font-bold text-xl text-foreground mb-6 text-center">Scénarios de revenus</h3>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-xl mx-auto">
        Projections indicatives basées sur des hypothèses de ventes régulières. Résultats réels variables.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setTab("terrain")}
          className={`px-5 py-2.5 rounded-lg font-heading font-medium text-sm transition-all duration-300 active:scale-[0.97] ${
            tab === "terrain" ? "bg-primary text-primary-foreground box-glow-green" : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          🏗️ Scénario A — Terrain
        </button>
        <button
          onClick={() => setTab("digital")}
          className={`px-5 py-2.5 rounded-lg font-heading font-medium text-sm transition-all duration-300 active:scale-[0.97] ${
            tab === "digital" ? "bg-accent text-accent-foreground box-glow-cyan" : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          💻 Scénario B — Digital
        </button>
      </div>

      {tab === "terrain" ? (
        <div className="overflow-x-auto">
          <p className="text-xs text-muted-foreground mb-4">Activité terrain classique — ~10h/semaine</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Période</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Auxil-IA</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Énergie</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Mara-A</th>
                <th className="text-right py-3 px-3 text-primary font-semibold">Cash</th>
                <th className="text-right py-3 px-3 text-accent font-semibold">Recurring</th>
              </tr>
            </thead>
            <tbody>
              {terrainData.map((r) => (
                <tr key={r.mois} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{r.mois}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.auxilia}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.energie}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.mara}</td>
                  <td className="py-3 px-3 text-right font-semibold text-primary">{r.cash}</td>
                  <td className="py-3 px-3 text-right text-accent">{r.recurring}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <p className="text-xs text-muted-foreground mb-4">100 % digital — Focus Auxil-IA — 2-3h/jour</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Période</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Ventes</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Cash Setup</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Clients actifs</th>
                <th className="text-right py-3 px-3 text-accent font-semibold">Recurring</th>
                <th className="text-right py-3 px-3 text-primary font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {digitalData.map((r) => (
                <tr key={r.mois} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{r.mois}</td>
                  <td className="py-3 px-3 text-muted-foreground">{r.ventes}</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">{r.cashSetup}</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">{r.clients}</td>
                  <td className="py-3 px-3 text-right text-accent">{r.recurring}</td>
                  <td className="py-3 px-3 text-right font-semibold text-primary">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Delta Example ─── */
function DeltaExplainer() {
  return (
    <div className="glass rounded-2xl p-8 md:p-10">
      <h3 className="font-heading font-bold text-xl text-foreground mb-2 text-center">Le système Delta</h3>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
        Anti-pyramidal par conception. Vous ne percevez que la différence entre votre taux et celui de vos filleuls.
      </p>

      <div className="glass rounded-xl p-6 max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground mb-3">
          <span className="text-foreground font-medium">Exemple :</span> Vous êtes <span className="text-primary font-semibold">Coach (12 %)</span> avec un filleul <span className="text-accent font-semibold">Junior (4 %)</span> générant 10 000 BV.
        </p>
        <div className="flex items-center justify-center gap-2 text-foreground font-heading font-bold text-lg my-4">
          <span className="text-primary">(12 % × 10 000)</span>
          <span>−</span>
          <span className="text-accent">(4 % × 10 000)</span>
          <span>=</span>
          <span className="text-primary text-glow-green text-2xl">800 €</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Si votre filleul monte Senior (8 %), votre Delta = (12 % − 8 %) × 10 000 = 400 €.
          Le système s'ajuste automatiquement.
        </p>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Opportunite() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Plan de Commission 2026</p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6" style={{ textWrap: "balance" }}>
              Construisez votre avenir avec Mars Group
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Un plan de rémunération transparent et anti-pyramidal. 8 rangs, 5 sources de revenus, système Delta équitable et bonus de démarrage rapide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 Sources de revenus */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-12">5 sources de revenus</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {revenueSources.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-400 h-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary">
                    <s.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 text-sm">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delta Explainer */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <DeltaExplainer />
          </Reveal>
        </div>
      </section>

      {/* 8 Rangs */}
      <section className="pb-24 bg-card/30 py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-4">8 rangs de progression</h2>
            <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Progression automatique et mensuelle. Pas de rétrogradation — seule la montée compte.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-x-auto glass rounded-2xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Rang</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">PV Min</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">GV Min</th>
                    <th className="text-right py-3 px-3 text-primary font-semibold">Delta %</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">Mobility</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">Home</th>
                    <th className="text-right py-3 px-3 text-accent font-semibold">Potentiel/mois</th>
                  </tr>
                </thead>
                <tbody>
                  {ranks.map((r, i) => (
                    <tr key={r.name} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                          {r.level}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-heading font-semibold text-foreground">{r.name}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground tabular-nums">{r.pv}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground tabular-nums">{r.gv}</td>
                      <td className="py-3 px-3 text-right text-primary font-semibold tabular-nums">{r.delta}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground tabular-nums">{r.mobility}</td>
                      <td className="py-3 px-3 text-right text-muted-foreground tabular-nums">{r.home}</td>
                      <td className="py-3 px-3 text-right text-accent font-medium tabular-nums">{r.potential}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-start gap-2 mt-6 text-xs text-muted-foreground max-w-2xl mx-auto">
              <Info size={14} className="text-primary mt-0.5 shrink-0" />
              <span>Mobility & Home sont calculés en Delta : vous percevez la différence entre votre montant et le montant le plus élevé parmi vos filleuls directs.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fast Start */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <div className="glass rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <Gift size={24} className="text-primary" />
                <h3 className="font-heading font-bold text-xl text-foreground">Fast Start Bonus</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass rounded-xl p-6 text-center border-primary/20">
                  <p className="text-3xl font-heading font-bold text-primary text-glow-green mb-1">250 € + 250 €</p>
                  <p className="text-sm text-muted-foreground">Membre + Parrain</p>
                  <p className="text-xs text-primary mt-2">25 000 BV en 60 jours</p>
                </div>
                <div className="glass rounded-xl p-6 text-center border-accent/20">
                  <p className="text-3xl font-heading font-bold text-accent text-glow-cyan mb-1">500 € + 500 €</p>
                  <p className="text-sm text-muted-foreground">Membre + Parrain</p>
                  <p className="text-xs text-accent mt-2">50 000 BV en 60 jours</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-heading font-semibold text-foreground">Comment atteindre 25 000 BV ?</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2"><ChevronRight size={14} className="text-primary mt-0.5 shrink-0" /> <span><strong>Scénario A :</strong> 1 dossier rénovation Mara-A de 25 000 € = 25 000 BV</span></div>
                  <div className="flex items-start gap-2"><ChevronRight size={14} className="text-accent mt-0.5 shrink-0" /> <span><strong>Scénario B :</strong> 42 setups Auxil-IA (199 € × 3 BV) = 25 074 BV</span></div>
                  <div className="flex items-start gap-2"><ChevronRight size={14} className="text-foreground/50 mt-0.5 shrink-0" /> <span><strong>Scénario C :</strong> Mix — 1 dossier réno 15 000 € + 17 setups Auxil-IA = 25 149 BV</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commissions par produit */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal>
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-12">Commissions par produit</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto glass rounded-2xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Produit</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Taux / Montant</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Exemple</th>
                    <th className="text-right py-3 px-3 text-primary font-semibold">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {productCommissions.map((p) => (
                    <tr key={p.product} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">{p.product}</td>
                      <td className="py-3 px-3 text-muted-foreground">{p.rate}</td>
                      <td className="py-3 px-3 text-muted-foreground">{p.example}</td>
                      <td className="py-3 px-3 text-right font-semibold text-primary">{p.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Boost Hors-Réseau */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <Reveal>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary mx-auto">
                <Zap size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Boost Hors-Réseau</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Pour les produits hors-réseau (Énergie & Assurances), un multiplicateur s'applique selon votre volume.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-xl font-heading font-bold text-foreground">×1.0</p>
                  <p className="text-xs text-muted-foreground mt-1">1 – 50 dossiers</p>
                </div>
                <div className="glass rounded-xl p-4 border-primary/20">
                  <p className="text-xl font-heading font-bold text-primary">×1.5</p>
                  <p className="text-xs text-muted-foreground mt-1">51 – 100 dossiers</p>
                </div>
                <div className="glass rounded-xl p-4 border-accent/20">
                  <p className="text-xl font-heading font-bold text-accent">×2.0</p>
                  <p className="text-xs text-muted-foreground mt-1">101+ dossiers</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Reveal>
            <ScenarioSimulator />
          </Reveal>
        </div>
      </section>

      {/* Paiement */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <Reveal>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-heading font-bold text-lg text-foreground mb-6 text-center">Conditions de paiement</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-primary font-heading font-bold text-lg">100 €</p>
                  <p className="text-xs text-muted-foreground">Seuil minimum</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-primary font-heading font-bold text-lg">Mensuel</p>
                  <p className="text-xs text-muted-foreground">Fréquence</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-primary font-heading font-bold text-lg">100 BV</p>
                  <p className="text-xs text-muted-foreground">Activité requise/mois</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-primary font-heading font-bold text-lg">Auto</p>
                  <p className="text-xs text-muted-foreground">Fiche de commission</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                100 BV/mois requis uniquement pour les commissions de groupe. Les commissions Retail sont toujours versées.
              </p>
            </div>
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

      {/* Legal */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="glass rounded-xl p-6 border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-muted-foreground" />
              <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Income Disclosure</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Les revenus présentés dans ce document sont des projections indicatives et ne constituent en aucun cas une garantie de gains.
              Les résultats individuels dépendent de l'effort personnel, des compétences en vente, du marché local et des conditions économiques.
              MARS Legacy Group ne promet pas de revenus spécifiques. Comme pour toute activité indépendante, il est possible de ne pas générer de revenus ou de subir des pertes.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Conformité : Code de droit économique belge (CDE), FSMA, Directive 2005/29/CE. Droit de rétractation : 14 jours.
              Système Delta anti-pyramidal certifié.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
