import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";

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
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-primary text-primary-foreground font-semibold shadow-xl",
          "hover:scale-105 transition-all duration-300 btn-3d animate-orbital-glow"
        )}
      >
        <span className="text-lg">🎒</span>
        <span>{selectedMissions.length}</span>
        <span className="hidden sm:inline">Saved</span>
      </button>

      <div className={cn(
        "fixed bottom-0 right-0 z-50 w-full md:w-96 max-h-[70vh]",
        "bg-card/95 backdrop-blur-xl border-t md:border-l border-border/50 shadow-2xl",
        "transform transition-all duration-400",
        isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Your Trip</h3>
            <p className="text-xs text-muted-foreground">{selectedMissions.length} adventures saved</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClearAll} className="px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded transition-colors">Clear</button>
            <button onClick={onToggle} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <X />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[40vh] p-4 space-y-3">
          {selectedMissions.map((mission, index) => (
            <div key={mission.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/30 group hover:border-primary/30 transition-all animate-slide-in-3d" style={{ animationDelay: `${index * 60}ms` }}>
              <div className="relative flex-shrink-0">
                <span className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">{index + 1}</span>
                <div className="w-11 h-11 rounded-lg bg-cover bg-center border border-border/30" style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{mission.name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{mission.priceEstimate}</span><span>·</span><span>{mission.distanceFromOKC}h</span>
                </div>
              </div>
              <button onClick={() => onRemoveMission(mission.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded transition-all">
                <svg className="w-4 h-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border/30">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Est. Cost", value: `$${totalCost.toLocaleString()}+`, color: "text-primary" },
              { label: "Drive Time", value: `${totalTime}h`, color: "text-foreground" },
              { label: "Extreme", value: `${extremeCount}`, color: "text-danger-extreme" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-muted/20 rounded-lg border border-border/30">
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className={cn("font-display text-lg font-bold", stat.color)}>{stat.value}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:brightness-110 transition-all btn-3d">
            Share Trip Plan
          </button>
        </div>
      </div>
    </>
  );
};

const X = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ItineraryBuilder;
