import { useState, useEffect } from "react";
import { Compass, Map, Mountain, Backpack } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingNavProps {
  itineraryCount: number;
  onItineraryToggle: () => void;
}

const FloatingNav = ({ itineraryCount, onItineraryToggle }: FloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
    )}>
      <div className="bg-background/85 backdrop-blur-xl border-b border-primary/10 shadow-[0_8px_30px_-10px_hsl(0_0%_0%/0.6)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
              style={{ background: 'var(--gradient-gold)' }}>
              <Compass className="w-4 h-4 text-[hsl(225_12%_8%)] animate-compass-wobble" />
            </div>
            <span className="font-display text-base font-bold tracking-wide hidden sm:block gold-gradient-text">
              LEGENDS
            </span>
          </div>

          <div className="flex items-center gap-1 bg-card/60 border border-border/30 rounded-full px-1 py-1 backdrop-blur-md">
            {[
              { label: "Map", icon: Map, id: "map-section" },
              { label: "Adventures", icon: Mountain, id: "adventures-section" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all font-sans tracking-[0.15em] uppercase">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>

          <button onClick={onItineraryToggle}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/60 hover:border-primary/50 hover:bg-primary/10 transition-all text-sm backdrop-blur-md group">
            <Backpack className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
            <span className="text-xs text-foreground/80 hidden sm:inline font-sans tracking-[0.15em] uppercase font-semibold">Your Trip</span>
            {itineraryCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-[0_0_12px_hsl(var(--gold)/0.5)]"
                style={{ background: 'var(--gradient-gold)', color: 'hsl(225 12% 8%)' }}>
                {itineraryCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;
