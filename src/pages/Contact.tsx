import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
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

export default function Contact() {
  useSEO({ title: "Contact", description: "Contactez Mars Group pour rejoindre le réseau ou en savoir plus sur nos services digitaux, immobiliers et énergétiques.", path: "/contact" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message envoyé ! Nous vous répondrons rapidement.");
  };

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Contact</p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6" style={{ textWrap: "balance" }}>
              Parlons de votre projet
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Une question sur nos services ou sur l'opportunité Mars Group ? Contactez-nous.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Info */}
            <div className="md:col-span-2 space-y-6">
              <Reveal>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Mail size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">Email</p>
                      <a href="mailto:contact@mars-lgc.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        contact@mars-lgc.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">Zone d'activité</p>
                      <p className="text-sm text-muted-foreground">Belgique & France</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <Reveal delay={100}>
                <div className="glass rounded-2xl p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                      <h3 className="font-heading font-bold text-xl text-foreground mb-2">Message envoyé !</h3>
                      <p className="text-sm text-muted-foreground">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">Prénom</label>
                          <Input required placeholder="Votre prénom" className="bg-muted/30 border-border/50 focus:border-primary/50" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">Nom</label>
                          <Input required placeholder="Votre nom" className="bg-muted/30 border-border/50 focus:border-primary/50" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                        <Input required type="email" placeholder="votre@email.com" className="bg-muted/30 border-border/50 focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block">Sujet</label>
                        <Input placeholder="Ex: Devenir consultant" className="bg-muted/30 border-border/50 focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
                        <Textarea required placeholder="Votre message..." rows={5} className="bg-muted/30 border-border/50 focus:border-primary/50 resize-none" />
                      </div>
                      <Button type="submit" className="w-full btn-neon bg-primary text-primary-foreground font-heading font-semibold h-12 box-glow-green active:scale-[0.97] transition-transform">
                        Envoyer <Send size={16} />
                      </Button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
