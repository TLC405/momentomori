import MementoTicker from "./MementoTicker";

const AppFooter = () => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="ember-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      {/* Scanline texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.03) 2px, hsl(var(--foreground) / 0.03) 4px)`,
      }} />

      <MementoTicker />

      <div className="relative bg-gradient-to-b from-background via-card/20 to-card/40 border-t border-border/10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <blockquote className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-snug italic">
            "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it matter that you have lived."
          </blockquote>
          <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase font-sans">— Ralph Waldo Emerson</p>

          <div className="pt-8">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              <span className="shimmer-text">LEGENDS</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 tracking-widest uppercase font-sans">
              The Epic Bro Trip Planner by TLC
            </p>
          </div>

          <div className="gradient-divider" />

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground font-sans tracking-wider uppercase">
            <span>Memento Mori</span>
            <div className="w-px h-3 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <span>Based in OKC</span>
            <div className="w-px h-3 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
