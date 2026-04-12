import { Compass } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_20px_hsl(var(--gold)/0.2)]">
                <Compass className="w-5 h-5 text-primary-foreground animate-compass-wobble" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide leading-tight">
                <span className="shimmer-text">LEGENDS</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-sans">
                The Epic Bro Trip Planner · by TLC
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/30 warm-glow-border">
              <Compass className="w-3.5 h-3.5 text-primary animate-compass-wobble" />
              <span className="w-2 h-2 rounded-full bg-danger-low animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium font-sans tracking-wider uppercase">Adventures Active</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] animate-gradient-pulse-line" />
    </header>
  );
};

export default AppHeader;
