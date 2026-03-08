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
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.25)]">
              <Compass className="w-4 h-4 text-primary-foreground animate-compass-wobble" />
            </div>
            <span className="font-display text-sm font-bold text-foreground tracking-wide hidden sm:block">
              BEFORE <span className="shimmer-text">YOU GO</span>
            </span>
          </div>

          <div className="flex items-center gap-1 bg-card/50 border border-border/30 rounded-full px-1 py-1">
            {[
              { label: "Map", icon: Map, id: "map-section" },
              { label: "Adventures", icon: Mountain, id: "adventures-section" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={onItineraryToggle}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/50 hover:border-primary/40 transition-all text-sm"
          >
            <Backpack className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground hidden sm:inline">Your Trip</span>
            {itineraryCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-[0_0_10px_hsl(var(--primary)/0.4)]">
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