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

const ItineraryBuilder = ({ 
  selectedMissions, 
  onRemoveMission, 
  onClearAll,
  isOpen,
  onToggle
}: ItineraryBuilderProps) => {
  const totalCost = selectedMissions.reduce((acc, m) => {
    const match = m.priceEstimate.match(/\$?([\d,]+)/);
    return acc + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0);
  
  const totalTime = selectedMissions.reduce((acc, m) => acc + m.distanceFromOKC, 0);
  const extremeCount = selectedMissions.filter(m => m.dangerLevel === "EXTREME").length;
  
  if (selectedMissions.length === 0) return null;

  return (
    <>
      {/* Floating Button with orbital glow */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-primary text-primary-foreground font-semibold shadow-2xl",
          "hover:scale-105 transition-all duration-300 btn-3d",
          "animate-orbital-glow"
        )}
      >
        <span className="text-lg">💀</span>
        <span className="font-orbitron">{selectedMissions.length}</span>
        <span className="hidden sm:inline">Quests</span>
        {extremeCount > 0 && (
          <span className="w-5 h-5 flex items-center justify-center bg-danger-extreme text-white text-[10px] font-bold rounded-full animate-danger-throb">
            {extremeCount}
          </span>
        )}
      </button>

      {/* Panel with 3D slide */}
      <div className={cn(
        "fixed bottom-0 right-0 z-50 w-full md:w-96 max-h-[70vh]",
        "glass-premium border-t md:border-l border-primary/30 shadow-[0_0_60px_hsl(var(--tactical-amber)/0.15)]",
        "transform transition-all duration-500 ease-out",
        isOpen 
          ? "translate-y-0 md:translate-x-0 opacity-100" 
          : "translate-y-full md:translate-y-0 md:translate-x-full opacity-0"
      )}
      style={{
        transform: isOpen 
          ? 'perspective(800px) rotateY(0deg) translateX(0)' 
          : undefined,
      }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
          <div>
            <h3 className="font-orbitron text-lg font-bold text-primary flex items-center gap-2">
              💀 Quest Itinerary
            </h3>
            <p className="text-xs text-muted-foreground">{selectedMissions.length} quests selected</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded transition-colors btn-3d"
            >
              Clear All
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors btn-3d"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mission List with staggered slide-in */}
        <div className="overflow-y-auto max-h-[40vh] p-4 space-y-3">
          {selectedMissions.map((mission, index) => (
            <div 
              key={mission.id}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 group hover:border-primary/30 transition-all animate-slide-in-3d"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative flex-shrink-0">
                <span className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                  {index + 1}
                </span>
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center border border-border/50"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{mission.name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{mission.priceEstimate}</span>
                  <span>•</span>
                  <span>{mission.distanceFromOKC}h</span>
                  {mission.dangerLevel === "EXTREME" && <span className="text-danger-extreme">💀</span>}
                </div>
              </div>
              <button
                onClick={() => onRemoveMission(mission.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded transition-all btn-3d"
              >
                <svg className="w-4 h-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 border-t border-primary/20 bg-gradient-to-t from-card to-transparent">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Cost", value: `$${totalCost.toLocaleString()}+`, color: "text-primary" },
              { label: "Drive", value: `${totalTime}h`, color: "text-foreground" },
              { label: "Danger", value: `${extremeCount}💀`, color: "text-danger-extreme" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 hover:translate-y-[-2px] transition-all duration-300">
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className={cn("font-orbitron text-lg font-bold", stat.color)}>{stat.value}</div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-3 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground font-orbitron font-bold rounded-xl hover:shadow-[0_0_30px_hsl(var(--tactical-amber)/0.5)] transition-all btn-3d">
            Share Itinerary 💀
          </button>
        </div>
      </div>
    </>
  );
};

export default ItineraryBuilder;
