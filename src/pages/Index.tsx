import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Bot, ShoppingBag, Building2, Home, Zap,
  TrendingUp, Shield, Users, Award, ArrowRight,
  Star, Mail, ChevronRight,
  Sparkles, Target, Globe
} from "lucide-react";
import { VisaLogo, MastercardLogo, RevolutLogo, SepaLogo, BancontactLogo } from "@/components/PaymentLogos";
import { useSEO } from "@/hooks/useSEO";

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Scroll Reveal wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const words = ["Votre", "carrière", "clés", "en", "main"];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-5xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-primary mb-8 border-primary/20">
            <Sparkles size={14} />
            Lancement Q2 2026 — Rejoignez les pionniers
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-foreground mb-8" style={{ lineHeight: "0.95" }}>
            {words.map((word, i) => (
              <span
                key={i}
                className={`inline-block animate-fade-in ${i === 0 ? "text-primary text-glow-green" : ""}`}
                style={{ animationDelay: `${300 + i * 120}ms`, animationFillMode: "both" }}
              >
                {word}{i < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed" style={{ textWrap: "pretty" as any }}>
            Un écosystème digital complet — 7 produits, 5 sources de revenus, 0 barrière à l'entrée. Construisez votre réseau avec la technologie de demain.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="btn-neon bg-primary text-primary-foreground font-heading font-semibold px-10 h-14 text-base box-glow-green active:scale-[0.97] transition-transform">
                Rejoignez-nous
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="font-heading font-medium px-10 h-14 text-base border-primary/30 hover:border-primary/60 hover:text-primary active:scale-[0.97] transition-transform">
                Découvrir nos services
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={650}>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-2xl p-8 border-primary/10">
            {[
              { value: 7, suffix: "", label: "Produits & services" },
              { value: 8, suffix: "", label: "Rangs de progression" },
              { value: 5, suffix: "", label: "Sources de revenus" },
              { value: 28, suffix: "%", label: "Delta max" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-3xl md:text-4xl text-primary text-glow-green tabular-nums">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FLAGSHIP PRODUCTS ─── */
function FlagshipSection() {
  const products = [
    {
      icon: ShoppingBag,
      name: "Ekonom-IA",
      tagline: "Marketplace locale intelligente",
      desc: "Transformez chaque passant en client fidèle. QR codes, notifications géolocalisées, coupons et fidélisation automatisée par IA pour les commerçants.",
      color: "primary" as const,
      features: ["QR codes dynamiques", "Géolocalisation", "Fidélisation IA", "App consommateur PWA"],
      url: "https://ekonom-ia.com",
    },
    {
      icon: Bot,
      name: "Auxil-IA",
      tagline: "Agent IA pour professionnels",
      desc: "Automatisez la gestion de vos emails, générez du contenu et assistez vos clients 24/7 avec un chatbot intelligent alimenté par l'IA.",
      color: "accent" as const,
      features: ["Chatbot client 24/7", "Automatisation emails", "Génération de contenu", "Rapports IA"],
      url: "https://auxil-ia.io",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Produits phares</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ textWrap: "balance" as any }}>
              Deux solutions qui révolutionnent le terrain
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className={`group glass rounded-2xl p-8 transition-all duration-500 h-full flex flex-col ${
                p.color === "primary" ? "hover:border-primary/40 hover:shadow-[0_0_30px_hsl(145_100%_45%/0.08)]" : "hover:border-accent/40 hover:shadow-[0_0_30px_hsl(187_100%_42%/0.08)]"
              }`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  p.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                } group-hover:scale-105 transition-transform duration-300`}>
                  <p.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{p.name}</h3>
                <p className={`text-sm font-medium mb-4 ${p.color === "primary" ? "text-primary" : "text-accent"}`}>
                  {p.tagline}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {p.desc}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ChevronRight size={12} className={p.color === "primary" ? "text-primary" : "text-accent"} />
                      {f}
                    </div>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className={`font-heading ${p.color === "primary" ? "border-primary/30 text-primary hover:bg-primary/10" : "border-accent/30 text-accent hover:bg-accent/10"} active:scale-[0.97] transition-transform`}>
                    Visiter le site <ArrowRight size={14} />
                  </Button>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ECOSYSTEM ─── */
function EcosystemSection() {
  const services = [
    { icon: Bot, name: "Auxil-IA", desc: "SaaS d'IA pour professionnels", color: "text-accent", border: "hover:border-accent/40" },
    { icon: ShoppingBag, name: "Ekonom-IA", desc: "Marketplace locale & fidélisation", color: "text-primary", border: "hover:border-primary/40" },
    { icon: Building2, name: "Mara-A Construct", desc: "Rénovation énergétique BE/FR", color: "text-orange-400", border: "hover:border-orange-400/40" },
    { icon: Home, name: "Mara-A Invest", desc: "Investissement immobilier belge", color: "text-blue-400", border: "hover:border-blue-400/40" },
    { icon: Zap, name: "Ecofix Énergie", desc: "Fourniture gaz & électricité", color: "text-yellow-400", border: "hover:border-yellow-400/40" },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-card/30">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Écosystème</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ textWrap: "balance" as any }}>
              Un portefeuille complet de services
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className={`group glass rounded-2xl p-6 text-center ${s.border} transition-all duration-400 cursor-default`}>
                <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 bg-muted/50 ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── OPPORTUNITY ─── */
function OpportunitySection() {
  const ranks = [
    "Candidat", "Junior", "Senior", "Coach",
    "Manager", "Directeur", "Président", "Ambassadeur"
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Opportunité</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ textWrap: "balance" as any }}>
              Un plan de rémunération anti-pyramidal et équitable
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[
            { icon: TrendingUp, title: "Système Delta", desc: "Calcul différentiel qui garantit l'équité : vos commissions reflètent vos ventes réelles, pas le recrutement.", color: "primary" },
            { icon: Award, title: "Fast Start 250 € + 250 €", desc: "Atteignez 25 000 BV en 60 jours — bonus versé au membre ET au parrain. Doublé à 50 000 BV.", color: "accent" },
            { icon: Target, title: "Jusqu'à 28 % Delta", desc: "8 rangs de progression avec des taux Delta de 0 % à 28 %, plus Mobility et Home Bonus.", color: "primary" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className={`glass rounded-2xl p-8 text-center transition-all duration-400 hover:border-${item.color}/30 hover:shadow-[0_0_30px_hsl(145_100%_45%/0.06)]`}>
                <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 bg-${item.color}/10 text-${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Ranks progression */}
        <Reveal>
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto border-primary/10">
            <h3 className="font-heading font-semibold text-center text-foreground mb-6">8 rangs de progression</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {ranks.map((rank, i) => (
                <div
                  key={rank}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  {rank}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="text-center mt-10">
            <Link to="/opportunite">
              <Button variant="outline" className="font-heading border-primary/30 text-primary hover:bg-primary/10 active:scale-[0.97] transition-transform">
                Voir le plan complet
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── ADVANTAGES ─── */
function AdvantagesSection() {
  const items = [
    { icon: Globe, title: "Infrastructure scalable", desc: "15+ conteneurs Docker indépendants, SSL auto, APIs REST, bases de données séparées." },
    { icon: Shield, title: "Technologie propriétaire", desc: "Pas des maquettes — du code en production. Complexité technique = avantage compétitif durable." },
    { icon: Users, title: "Réseau structuré", desc: "Chaque consultant vend tous les services via sa boutique personnalisée avec design premium." },
  ];

  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Avantages</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ textWrap: "balance" as any }}>
              Pourquoi Mars Group
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-400 h-full hover:shadow-[0_0_30px_hsl(145_100%_45%/0.06)]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-primary/10 text-primary">
                  <item.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIAL ─── */
function TestimonialSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-primary fill-primary" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-medium mb-8" style={{ textWrap: "balance" as any }}>
              "Mars Group m'a donné accès à un écosystème complet de services que je n'aurais jamais pu construire seul.
              En 3 mois, j'ai atteint le rang de Manager."
            </blockquote>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-heading font-bold mx-auto mb-3">
                SL
              </div>
              <p className="font-heading font-semibold text-foreground">Sophie Laurent</p>
              <p className="text-sm text-muted-foreground">Consultante Manager — Liège, Belgique</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── ACADEMY ─── */
function AcademySection() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto glass rounded-2xl p-10 md:p-14 text-center border-accent/10">
            <div className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-6 bg-accent/10 text-accent">
              <Sparkles size={28} />
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
              Mars Academy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              Formations complètes pour maîtriser chaque service, développer votre réseau et maximiser vos revenus.
              Accès illimité dès votre inscription.
            </p>
            <Link to="/academie">
              <Button className="btn-neon bg-accent text-accent-foreground font-heading font-semibold px-8 h-12 box-glow-cyan active:scale-[0.97] transition-transform">
                Découvrir l'Académie
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PAYMENTS ─── */
function PaymentsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Paiements</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Paiements automatisés
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {[
            { logo: <VisaLogo className="h-8 w-auto" />, name: "Visa" },
            { logo: <MastercardLogo className="h-8 w-auto" />, name: "Mastercard" },
            { logo: <RevolutLogo />, name: "Revolut" },
            { logo: <SepaLogo />, name: "SEPA" },
            { logo: <BancontactLogo />, name: "Bancontact" },
          ].map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <div className="glass rounded-xl px-8 py-6 flex items-center justify-center min-w-[160px] min-h-[80px] hover:border-primary/30 transition-all duration-300">
                {m.logo}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─── */
function NewsletterSection() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <Mail size={32} className="text-primary mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              Restez informé
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Recevez les actualités de l'écosystème Mars Group et les dates de lancement.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 h-12 px-4 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <Button className="btn-neon bg-primary text-primary-foreground font-heading font-semibold h-12 px-6 box-glow-green active:scale-[0.97] transition-transform">
                S'inscrire
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PAGE INDEX ─── */
export default function Index() {
  useSEO({ title: "Accueil", description: "Mars Group : écosystème digital complet — 7 produits, 5 sources de revenus. Ekonom-IA, Auxil-IA, rénovation, immobilier et énergie.", path: "/" });
  return (
    <div className="min-h-screen relative z-10 overflow-hidden">
      <Navbar />
      <HeroSection />
      <FlagshipSection />
      <EcosystemSection />
      <OpportunitySection />
      <AdvantagesSection />
      <TestimonialSection />
      <AcademySection />
      <PaymentsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
