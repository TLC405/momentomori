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
  
  if (selectedMissions.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-primary text-primary-foreground font-semibold shadow-2xl",
          "hover:scale-105 transition-all duration-300",
          "animate-pulse-glow"
        )}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="font-orbitron">{selectedMissions.length}</span>
        <span className="hidden sm:inline">Missions</span>
      </button>

      {/* Panel */}
      <div className={cn(
        "fixed bottom-0 right-0 z-50 w-full md:w-96 max-h-[70vh]",
        "bg-card border-t md:border-l border-border shadow-2xl",
        "transform transition-transform duration-300",
        isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0 md:translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div>
            <h3 className="font-orbitron text-lg font-bold text-primary">Mission Itinerary</h3>
            <p className="text-xs text-muted-foreground">{selectedMissions.length} missions selected</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mission List */}
        <div className="overflow-y-auto max-h-[40vh] p-4 space-y-3">
          {selectedMissions.map((mission, index) => (
            <div 
              key={mission.id}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 group hover:border-primary/30 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <span className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {index + 1}
                </span>
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{mission.name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{mission.priceEstimate}</span>
                  <span>•</span>
                  <span>{mission.distanceFromOKC}h</span>
                </div>
              </div>
              <button
                onClick={() => onRemoveMission(mission.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded transition-all"
              >
                <svg className="w-4 h-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-card rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Est. Total Cost</div>
              <div className="font-orbitron text-xl text-primary font-bold">${totalCost.toLocaleString()}+</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Total Drive Time</div>
              <div className="font-orbitron text-xl text-foreground font-bold">{totalTime}h</div>
            </div>
          </div>
          
          <button className="w-full py-3 bg-primary text-primary-foreground font-orbitron font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Share Itinerary
          </button>
        </div>
      </div>
    </>
  );
};

export default ItineraryBuilder;
