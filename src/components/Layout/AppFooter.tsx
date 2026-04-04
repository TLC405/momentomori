const AppFooter = () => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="ember-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle noise/scanline texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 4px)`,
      }} />

      <div className="relative bg-gradient-to-b from-background via-card/30 to-card/60 border-t border-border/20 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <blockquote className="font-display text-2xl md:text-4xl font-bold text-foreground leading-snug italic">
            "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it matter that you have lived."
          </blockquote>
          <p className="text-sm text-muted-foreground tracking-wider uppercase">— Ralph Waldo Emerson</p>

          <div className="pt-8">
            <h2 className="font-display text-3xl md:text-5xl font-black text-foreground tracking-tight">
              BEFORE <span className="shimmer-text">YOU GO</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 tracking-wide">
              The Bucket List Engine for the Brotherhood
            </p>
          </div>

          <div className="gradient-divider" />

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>Memento Mori</span>
            <div className="w-px h-3 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
            <span>Based in OKC</span>
            <div className="w-px h-3 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
