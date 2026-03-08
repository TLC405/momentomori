import headerGuys from "@/assets/header-guys-adventure.png";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                <img src={headerGuys} alt="Adventure crew" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide leading-tight">
                Remember You
                <span className="text-primary ml-2">Must Live</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">
                Memento Mori · Extraordinary Adventures
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50">
              <span className="w-2 h-2 rounded-full bg-earth-forest animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Adventures Active</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};

export default AppHeader;
