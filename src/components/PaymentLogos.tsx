/* Inline SVG payment logos — no external deps */

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 780 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M293.2 348.73l33.36-195.76h53.34l-33.38 195.76H293.2zm246.11-191.54c-10.57-3.98-27.17-8.22-47.89-8.22-52.83 0-90.06 26.69-90.33 64.94-.27 28.28 26.58 44.06 46.88 53.48 20.83 9.64 27.84 15.81 27.75 24.43-.14 13.19-16.63 19.22-32.02 19.22-21.4 0-32.76-2.97-50.32-10.3l-6.9-3.13-7.51 44.1c12.5 5.49 35.6 10.25 59.61 10.5 56.17 0 92.64-26.37 93.03-67.22.19-22.39-14.04-39.42-44.87-53.47-18.68-9.11-30.13-15.18-30.01-24.42 0-8.18 9.69-16.94 30.6-16.94 17.47-.27 30.14 3.55 40.01 7.52l4.79 2.27 7.18-42.78zm139.63-4.22h-41.31c-12.81 0-22.39 3.5-28.01 16.31L508.75 348.73h56.14s9.17-24.21 11.25-29.53h68.57c1.6 6.89 6.51 29.53 6.51 29.53h49.63l-43.31-195.76h-.6zM589.1 289.87c4.43-11.36 21.37-55.07 21.37-55.07-.31.52 4.4-11.42 7.11-18.83l3.63 17.03s10.26 47.08 12.41 56.87h-44.52z" fill="hsl(var(--accent))"/>
      <path d="M247.16 152.97l-52.42 133.53-5.6-27.26c-9.74-31.41-40.12-65.47-74.1-82.5l47.82 171.93h56.56l84.15-195.7h-56.41z" fill="hsl(var(--primary))"/>
      <path d="M145.4 152.97H58.93l-.68 3.72c67.06 16.28 111.47 55.6 129.83 102.83l-18.73-90.34c-3.23-12.42-12.62-15.84-23.95-16.21z" fill="hsl(var(--muted-foreground))"/>
    </svg>
  );
}

export function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 780 500" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="312" cy="250" r="150" fill="hsl(0 84% 60%)" opacity="0.9"/>
      <circle cx="468" cy="250" r="150" fill="hsl(45 100% 50%)" opacity="0.8"/>
      <path d="M390 130.7c-30.3 24.4-51.6 58.4-58.5 97.3h117c-6.9-38.9-28.2-72.9-58.5-97.3zm0 238.6c30.3-24.4 51.6-58.4 58.5-97.3h-117c6.9 38.9 28.2 72.9 58.5 97.3z" fill="hsl(25 100% 50%)" opacity="0.9"/>
    </svg>
  );
}

export function RevolutLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-6 h-6 rounded-full bg-foreground/90 flex items-center justify-center">
        <span className="text-background font-bold text-xs">R</span>
      </div>
      <span className="font-heading font-bold text-sm text-foreground/80 tracking-tight">Revolut</span>
    </div>
  );
}

export function SepaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-7 h-5 rounded-sm bg-accent/80 flex items-center justify-center">
        <span className="text-accent-foreground font-bold text-[9px] tracking-wider">€</span>
      </div>
      <span className="font-heading font-bold text-sm text-foreground/80 tracking-tight">SEPA</span>
    </div>
  );
}

export function BancontactLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex">
        <div className="w-3 h-5 rounded-l-sm bg-accent/90" />
        <div className="w-3 h-5 rounded-r-sm bg-primary/90" />
      </div>
      <span className="font-heading font-bold text-sm text-foreground/80 tracking-tight">Bancontact</span>
    </div>
  );
}
