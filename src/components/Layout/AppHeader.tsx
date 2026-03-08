import headerGuys from "@/assets/header-guys-adventure.png";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-xl border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative animate-float-gentle">
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-[0_0_25px_hsl(var(--tactical-amber)/0.4)]">
                <img src={headerGuys} alt="Adventure crew" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-primary/30 blur-sm -z-10" />
            </div>
            <div>
              <h1 className="font-orbitron text-xl md:text-2xl font-bold tracking-wider leading-tight">
                <span className="shimmer-text">REMEMBER YOU</span>
                <span className="text-danger-extreme ml-2">MUST DIE</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase italic">
                Memento Mori • Live Legendary
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 shadow-lg hover:border-primary/30 transition-all">
              <span className="w-2 h-2 rounded-full bg-danger-extreme animate-pulse shadow-[0_0_6px_hsl(var(--danger-extreme))]" />
              <span className="text-xs text-muted-foreground font-medium">Quests Active</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px animate-gradient-sweep" />
    </header>
  );
};

export default AppHeader;
