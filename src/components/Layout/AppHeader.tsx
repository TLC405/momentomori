import { Compass } from "lucide-react";
import headerGuys from "@/assets/header-guys-adventure.png";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      {/* Ambient gradient behind header */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-10 rounded-lg overflow-hidden ring-2 ring-primary/30 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.25)]">
                <img src={headerGuys} alt="Adventure crew" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide leading-tight">
                Remember You
                <span className="shimmer-text ml-2 font-extrabold">Must Live</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">
                Memento Mori · Extraordinary Adventures
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 warm-glow-border">
              <Compass className="w-3.5 h-3.5 text-primary animate-compass-wobble" />
              <span className="w-2 h-2 rounded-full bg-earth-forest animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Adventures Active</span>
            </div>
          </div>
        </div>
      </div>
      {/* Pulsing gradient underline */}
      <div className="h-[2px] animate-gradient-pulse-line" />
    </header>
  );
};

export default AppHeader;
