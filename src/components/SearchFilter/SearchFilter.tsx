import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X, MapPin, Clock, DollarSign, AlertTriangle } from "lucide-react";
import { missions } from "@/data/missions";
import { Slider } from "@/components/ui/slider";

export interface FilterState {
  search: string;
  maxDistance: number;
  priceRange: [number, number];
  dangerLevels: string[];
  maxDuration: string;
}

interface SearchFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
}

const DANGER_OPTIONS = [
  { value: "LOW", label: "Easy", cssVar: "--danger-low" },
  { value: "MEDIUM", label: "Moderate", cssVar: "--danger-medium" },
  { value: "HIGH", label: "Intense", cssVar: "--danger-high" },
  { value: "EXTREME", label: "Extreme", cssVar: "--danger-extreme" },
];

const DURATION_OPTIONS = [
  { value: "", label: "Any" },
  { value: "2", label: "< 2h" },
  { value: "4", label: "< Half day" },
  { value: "8", label: "< Full day" },
  { value: "24", label: "Multi-day" },
];

const SearchFilter = ({ filters, onFiltersChange, totalResults }: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasActiveFilters = filters.search !== "" || filters.maxDistance < 10 || filters.priceRange[0] > 1 || filters.priceRange[1] < 5 || filters.dangerLevels.length > 0 || filters.maxDuration !== "";
  const clearFilters = () => onFiltersChange({ search: "", maxDistance: 10, priceRange: [1, 5], dangerLevels: [], maxDuration: "" });

  const toggleDangerLevel = (level: string) => {
    const newLevels = filters.dangerLevels.includes(level)
      ? filters.dangerLevels.filter(l => l !== level)
      : [...filters.dangerLevels, level];
    onFiltersChange({ ...filters, dangerLevels: newLevels });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const popularTags = ["bucket-list", "extreme", "hunting", "aviation", "tanks", "racing"];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 px-5 py-3.5 bg-card/50 border border-border/30 rounded-xl text-muted-foreground hover:border-primary/40 transition-all group"
      >
        <Search className="w-5 h-5 group-hover:text-primary transition-colors" />
        <span className="flex-1 text-left text-sm">Search adventures, locations, tags...</span>
        <kbd className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono bg-muted/30 border border-border/30 rounded text-muted-foreground">/</kbd>
        {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
        <span className="text-xs text-muted-foreground"><span className="stat-value text-xs">{totalResults}</span> results</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-2xl mx-4 bg-card border border-border/50 rounded-2xl shadow-[0_20px_60px_hsl(0_0%_0%/0.5)] overflow-hidden animate-scale-in">
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
              <Search className="w-5 h-5 text-primary" />
              <input
                ref={inputRef}
                type="text"
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                placeholder="Search adventures..."
                className="flex-1 bg-transparent text-foreground text-lg placeholder:text-muted-foreground focus:outline-none"
              />
              {filters.search && (
                <button onClick={() => onFiltersChange({ ...filters, search: "" })} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="px-2 py-1 text-xs text-muted-foreground border border-border/30 rounded hover:bg-muted/20">
                ESC
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[50vh] overflow-y-auto">
              {/* Popular tags */}
              <div className="space-y-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Popular</span>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onFiltersChange({ ...filters, search: tag })}
                      className="px-3 py-1.5 text-xs bg-muted/20 text-muted-foreground rounded-lg border border-border/30 hover:border-primary/40 hover:text-primary transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="gradient-divider" />

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Distance slider — custom styled */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" /> Max Distance
                  </label>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[filters.maxDistance]}
                    onValueChange={([v]) => onFiltersChange({ ...filters, maxDistance: v })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1h</span><span className="text-primary font-medium">{filters.maxDistance}h</span><span>10h+</span>
                  </div>
                </div>

                {/* Price pills */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                    <DollarSign className="w-3.5 h-3.5" /> Price
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((price) => {
                      const isActive = price >= filters.priceRange[0] && price <= filters.priceRange[1];
                      return (
                        <button key={price} onClick={() => {
                          const [min, max] = filters.priceRange;
                          if (price < min) onFiltersChange({ ...filters, priceRange: [price, max] });
                          else if (price > max) onFiltersChange({ ...filters, priceRange: [min, price] });
                          else if (price === min && min < max) onFiltersChange({ ...filters, priceRange: [price + 1, max] });
                          else if (price === max && max > min) onFiltersChange({ ...filters, priceRange: [min, price - 1] });
                        }}
                        className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                          isActive
                            ? "bg-primary/15 border-primary/40 text-primary"
                            : "bg-muted/20 border-border/30 text-muted-foreground hover:border-primary/40"
                        )}>{"$".repeat(price)}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration — pill buttons instead of select */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DURATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => onFiltersChange({ ...filters, maxDuration: opt.value })}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                          filters.maxDuration === opt.value
                            ? "bg-primary/15 border-primary/40 text-primary"
                            : "bg-muted/20 border-border/30 text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" /> Intensity
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DANGER_OPTIONS.map((opt) => {
                      const isActive = filters.dangerLevels.includes(opt.value);
                      return (
                        <button key={opt.value} onClick={() => toggleDangerLevel(opt.value)}
                          className={cn("px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border",
                            isActive
                              ? "border-transparent text-black"
                              : "bg-muted/20 border-l-[3px] border-border/30 text-muted-foreground hover:border-primary/40"
                          )}
                          style={isActive
                            ? { backgroundColor: `hsl(var(${opt.cssVar}))` }
                            : { borderLeftColor: `hsl(var(${opt.cssVar}))` }
                          }
                        >{opt.label}</button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground"><span className="stat-value text-sm">{totalResults}</span> results</span>
                  <button onClick={clearFilters} className="text-xs text-destructive hover:underline">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilter;
