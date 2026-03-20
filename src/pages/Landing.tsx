import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ArrowDown } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import marsLogo from "@/assets/mars-logo.png";

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

export default function Landing() {
  useSEO({
    title: "Découvrez Mars Group",
    description: "Regardez la présentation complète de Mars Group et réservez votre appel découverte 1-to-1.",
    path: "/landing",
  });

  const scrollToCalendly = () => {
    document.getElementById("calendly-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative z-10 bg-background">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          <a href="/">
            <img src={marsLogo} alt="MARS Group" className="h-8 w-auto" />
          </a>
          <Button
            onClick={scrollToCalendly}
            className="btn-neon bg-primary text-primary-foreground font-heading font-semibold box-glow-green active:scale-[0.97] transition-transform"
            size="sm"
          >
            <Calendar size={16} />
            Réserver mon call
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
              Présentation exclusive
            </p>
            <h1
              className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-5 leading-[1.1]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Découvrez l'écosystème Mars Group
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
              Vous avez vu la partie 1 ? Voici la suite. Regardez la vidéo complète puis réservez un appel pour en discuter.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <button
              onClick={scrollToCalendly}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowDown size={14} className="animate-bounce" />
              Voir la vidéo & réserver
            </button>
          </Reveal>
        </div>
      </section>

      {/* Video section */}
      <section className="pb-14 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-card/60 shadow-2xl shadow-primary/5">
              {/* Video placeholder — replace src with your real video embed */}
              <div className="aspect-video flex items-center justify-center bg-secondary/30 relative group cursor-pointer">
                {/* Replace this div with your real video embed, e.g.:
                    <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... />
                */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                    <Play size={32} className="text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Vidéo de présentation — Partie 2
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    Remplacez ce placeholder par votre vidéo YouTube ou Vimeo
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA + Calendly */}
      <section id="calendly-section" className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
                Prêt à passer à l'action ?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Réservez un appel découverte de 30 minutes avec notre équipe. Sans engagement, 100% personnalisé.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="glass rounded-2xl overflow-hidden border border-border/40">
              {/* 
                CALENDLY EMBED — Remplacez YOUR_CALENDLY_LINK par votre vrai lien.
                Ex: https://calendly.com/votrenom/30min 
              */}
              <iframe
                src="https://calendly.com/YOUR_CALENDLY_LINK?hide_gdpr_banner=1&background_color=0d1117&text_color=e8edf3&primary_color=00c853"
                width="100%"
                height="700"
                frameBorder="0"
                title="Réserver un appel découverte"
                className="w-full min-h-[600px] md:min-h-[700px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MARS Legacy Group SA. Tous droits réservés.
          </p>
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Visiter le site principal →
          </a>
        </div>
      </footer>
    </div>
  );
}
