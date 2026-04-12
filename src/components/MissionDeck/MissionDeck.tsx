import { useState } from "react";
import { Mission, missions, getMissionsByRealm } from "@/data/missions";
import { Realm } from "@/data/realms";
import MissionCard from "./MissionCard";
import MissionDetailModal from "./MissionDetailModal";
import { Compass } from "lucide-react";

interface MissionDeckProps {
  selectedRealm: Realm | null;
  itineraryMissions?: Mission[];
  onAddToItinerary?: (mission: Mission) => void;
  filteredMissions?: Mission[];
  conquered?: Set<string>;
  onToggleConquered?: (id: string) => void;
}

const MissionDeck = ({ selectedRealm, itineraryMissions = [], onAddToItinerary, filteredMissions, conquered, onToggleConquered }: MissionDeckProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const displayedMissions = filteredMissions ?? (selectedRealm ? getMissionsByRealm(selectedRealm.id) : missions);
  const isInItinerary = (id: string) => itineraryMissions.some(m => m.id === id);

  const featuredIds = new Set(
    displayedMissions.filter(m => m.isHot || (m.dangerLevel === "EXTREME" && m.broRating === 5)).slice(0, 3).map(m => m.id)
  );

  return (
    <div className="space-y-6" id="adventures-section">
      <div className="flex items-center gap-3 px-1">
        <h2 className="font-display text-lg font-bold text-foreground">
          {selectedRealm ? selectedRealm.name : "All Adventures"}
        </h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
        <span className="text-xs text-muted-foreground font-sans">
          <span className="stat-value text-xs">{displayedMissions.length}</span> experiences
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
        {displayedMissions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onClick={() => setSelectedMission(mission)}
            onAddToItinerary={() => onAddToItinerary?.(mission)}
            isInItinerary={isInItinerary(mission.id)}
            isConquered={conquered?.has(mission.id)}
            onToggleConquered={() => onToggleConquered?.(mission.id)}
            index={index}
            isFeatured={featuredIds.has(mission.id)}
          />
        ))}
      </div>

      {displayedMissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border border-border/20 rounded-xl bg-card/30">
          <div className="animate-float mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
              <Compass className="w-8 h-8 text-primary/50 animate-compass-wobble" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground mb-2 font-display">No adventures match your filters</span>
          <span className="text-xs text-muted-foreground font-sans">Try adjusting your search criteria</span>
        </div>
      )}

      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onAddToItinerary={() => onAddToItinerary?.(selectedMission)}
          isInItinerary={isInItinerary(selectedMission.id)}
          isConquered={conquered?.has(selectedMission.id)}
          onToggleConquered={() => onToggleConquered?.(selectedMission.id)}
        />
      )}
    </div>
  );
};

export default MissionDeck;
