import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Video, Users, Award, ArrowRight, ChevronRight } from "lucide-react";
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

const modules = [
  {
    icon: BookOpen,
    title: "Fondamentaux du réseau",
    topics: ["Comprendre le modèle MLM", "Plan de rémunération détaillé", "Stratégies de recrutement", "Éthique et bonnes pratiques"],
  },
  {
    icon: Video,
    title: "Maîtriser les produits",
    topics: ["Ekonom-IA : vendre la marketplace", "Auxil-IA : démonstration SaaS", "Mara-A : dossiers rénovation", "Argumentaires par service"],
  },
  {
    icon: Users,
    title: "Leadership & équipe",
    topics: ["Accompagner vos filleuls", "Structurer votre réseau", "Motivation et rétention", "Objectifs et suivi"],
  },
  {
    icon: Award,
    title: "Croissance avancée",
    topics: ["Stratégies digitales", "Réseaux sociaux & contenu", "Présentation publique", "Scaling et automatisation"],
  },
];

export default function Academie() {
  useSEO({ title: "Académie", description: "Mars Academy : formations complètes pour maîtriser les produits, développer votre réseau et maximiser vos revenus.", path: "/academie" });
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Mars Academy</p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6" style={{ textWrap: "balance" }}>
              Formez-vous pour réussir
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Des formations complètes, conçues pour vous accompagner du premier jour jusqu'au sommet. Accès illimité dès votre inscription.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-8">
            {modules.map((m, i) => (
              <Reveal key={m.title} delay={i * 100}>
                <div className="glass rounded-2xl p-8 hover:border-accent/30 transition-all duration-400 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-accent/10 text-accent">
                    <m.icon size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">{m.title}</h3>
                  <div className="space-y-2">
                    {m.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight size={14} className="text-accent" /> {t}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center mt-16">
              <Link to="/contact">
                <Button size="lg" className="btn-neon bg-accent text-accent-foreground font-heading font-semibold px-8 h-12 box-glow-cyan active:scale-[0.97] transition-transform">
                  S'inscrire à l'Académie <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
