import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { X, Backpack, Share2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ItineraryBuilderProps {
  selectedMissions: Mission[];
  onRemoveMission: (missionId: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ItineraryBuilder = ({ selectedMissions, onRemoveMission, onClearAll, isOpen, onToggle }: ItineraryBuilderProps) => {
  const totalCost = selectedMissions.reduce((acc, m) => {
    const match = m.priceEstimate.match(/\$?([\d,]+)/);
    return acc + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0);
  const totalTime = selectedMissions.reduce((acc, m) => acc + m.distanceFromOKC, 0);
  const extremeCount = selectedMissions.filter(m => m.dangerLevel === "EXTREME").length;

  if (selectedMissions.length === 0) return null;

  return (
    <>
      {/* FAB */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-primary text-primary-foreground font-semibold",
          "shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.5)]",
          "hover:scale-105 transition-all duration-300 animate-bounce-appear"
        )}
      >
        <Backpack className="w-5 h-5" />
        <span className="stat-value text-sm">{selectedMissions.length}</span>
        <span className="hidden sm:inline text-sm">Saved</span>
      </button>

      {/* Side drawer */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent className="w-full sm:max-w-md bg-card border-l border-border/30 p-0 flex flex-col">
          <SheetHeader className="p-5 pb-4 border-b border-border/20 relative">
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
            <SheetTitle className="font-display text-lg font-bold text-foreground text-left">Your Trip</SheetTitle>
            <p className="text-xs text-muted-foreground text-left">{selectedMissions.length} adventures saved</p>
          </SheetHeader>

          {/* Mission list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedMissions.map((mission, index) => (
              <div
                key={mission.id}
                className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg border border-border/20 group hover:border-primary/30 transition-all warm-glow-border"
              >
                <div className="relative flex-shrink-0">
                  <span className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full ring-2 ring-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
                    {index + 1}
                  </span>
                  <div className="w-11 h-11 rounded-lg bg-cover bg-center border border-border/20" style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{mission.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{mission.priceEstimate}</span><span>·</span><span>{mission.distanceFromOKC}h</span>
                  </div>
                </div>
                <button onClick={() => onRemoveMission(mission.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded transition-all">
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-border/20 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Est. Cost", value: `$${totalCost.toLocaleString()}+`, color: "text-primary" },
                { label: "Drive Time", value: `${totalTime}h`, color: "text-foreground" },
                { label: "Extreme", value: `${extremeCount}`, color: "text-destructive" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-muted/10 rounded-lg border border-border/20 warm-glow-border">
                  <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                  <div className={cn("stat-value text-lg font-bold", stat.color)}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClearAll}
                className="px-4 py-3 text-sm text-destructive border border-destructive/20 rounded-xl hover:bg-destructive/10 transition-colors"
              >
                Clear
              </button>
              <button className="ripple-btn flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl hover:brightness-110 transition-all shadow-[0_4px_16px_hsl(var(--primary)/0.25)]">
                <Share2 className="w-4 h-4" />
                Share Trip Plan
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ItineraryBuilder;