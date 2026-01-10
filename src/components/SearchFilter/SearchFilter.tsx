import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X, MapPin, Clock, DollarSign, AlertTriangle } from "lucide-react";

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
  { value: "LOW", label: "Low", icon: "🏕️", color: "danger-bg-low" },
  { value: "MEDIUM", label: "Medium", icon: "⚔️", color: "danger-bg-medium" },
  { value: "HIGH", label: "High", icon: "🔥", color: "danger-bg-high" },
  { value: "EXTREME", label: "Extreme", icon: "💀", color: "danger-bg-extreme" },
];

const DURATION_OPTIONS = [
  { value: "", label: "Any" },
  { value: "2", label: "< 2 hours" },
  { value: "4", label: "< Half day" },
  { value: "8", label: "< Full day" },
  { value: "24", label: "Multi-day" },
];

const SearchFilter = ({ filters, onFiltersChange, totalResults }: SearchFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasActiveFilters = 
    filters.search !== "" ||
    filters.maxDistance < 10 ||
    filters.priceRange[0] > 1 ||
    filters.priceRange[1] < 5 ||
    filters.dangerLevels.length > 0 ||
    filters.maxDuration !== "";

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      maxDistance: 10,
      priceRange: [1, 5],
      dangerLevels: [],
      maxDuration: "",
    });
  };

  const toggleDangerLevel = (level: string) => {
    const newLevels = filters.dangerLevels.includes(level)
      ? filters.dangerLevels.filter(l => l !== level)
      : [...filters.dangerLevels, level];
    onFiltersChange({ ...filters, dangerLevels: newLevels });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar Row */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Search quests, locations, activities..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFiltersChange({ ...filters, search: "" })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl border font-medium transition-all",
            isExpanded || hasActiveFilters
              ? "bg-primary/15 border-primary text-primary"
              : "bg-card border-border text-muted-foreground hover:border-primary/50"
          )}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </button>

        {/* Results Count */}
        <div className="hidden md:flex items-center gap-2 px-4 py-3 bg-muted/30 rounded-xl border border-border/50">
          <span className="text-sm text-muted-foreground">{totalResults}</span>
          <span className="text-sm text-muted-foreground">quests</span>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-5 bg-card border border-border rounded-xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-orbitron font-bold text-foreground">Advanced Filters</h4>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-destructive hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Distance Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                Max Distance
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.maxDistance}
                  onChange={(e) => onFiltersChange({ ...filters, maxDistance: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1h</span>
                  <span className="text-primary font-bold">{filters.maxDistance}h from HQ</span>
                  <span>10h+</span>
                </div>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                Price Range
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      const [min, max] = filters.priceRange;
                      if (price < min) {
                        onFiltersChange({ ...filters, priceRange: [price, max] });
                      } else if (price > max) {
                        onFiltersChange({ ...filters, priceRange: [min, price] });
                      } else if (price === min && min < max) {
                        onFiltersChange({ ...filters, priceRange: [price + 1, max] });
                      } else if (price === max && max > min) {
                        onFiltersChange({ ...filters, priceRange: [min, price - 1] });
                      }
                    }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border",
                      price >= filters.priceRange[0] && price <= filters.priceRange[1]
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {"$".repeat(price)}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Duration
              </label>
              <select
                value={filters.maxDuration}
                onChange={(e) => onFiltersChange({ ...filters, maxDuration: e.target.value })}
                className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Danger Level Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                Danger Level
              </label>
              <div className="flex flex-wrap gap-2">
                {DANGER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleDangerLevel(opt.value)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      filters.dangerLevels.includes(opt.value)
                        ? `${opt.color} border-transparent text-black`
                        : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <span>{opt.icon}</span>
                    <span className="hidden xl:inline">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
