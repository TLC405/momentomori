import { useState } from "react";
import { Mission, missions, getMissionsByRealm } from "@/data/missions";
import { Realm } from "@/data/realms";
import MissionCard from "./MissionCard";
import MissionDetailModal from "./MissionDetailModal";

interface MissionDeckProps {
  selectedRealm: Realm | null;
  itineraryMissions?: Mission[];
  onAddToItinerary?: (mission: Mission) => void;
  filteredMissions?: Mission[];
}

const MissionDeck = ({ selectedRealm, itineraryMissions = [], onAddToItinerary, filteredMissions }: MissionDeckProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const displayedMissions = filteredMissions ?? (selectedRealm 
    ? getMissionsByRealm(selectedRealm.id)
    : missions);

  const isInItinerary = (missionId: string) => 
    itineraryMissions.some(m => m.id === missionId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            {selectedRealm ? selectedRealm.name : "All Adventures"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {displayedMissions.length} experiences available
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedMissions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onClick={() => setSelectedMission(mission)}
            onAddToItinerary={() => onAddToItinerary?.(mission)}
            isInItinerary={isInItinerary(mission.id)}
            index={index}
          />
        ))}
      </div>
      
      {displayedMissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border border-border/30 rounded-xl bg-card/50">
          <span className="text-4xl mb-4">🏔️</span>
          <span className="text-sm text-muted-foreground mb-2 font-display">No adventures match your filters</span>
          <span className="text-xs text-muted-foreground">Try adjusting your search criteria</span>
        </div>
      )}
      
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onAddToItinerary={() => onAddToItinerary?.(selectedMission)}
          isInItinerary={isInItinerary(selectedMission.id)}
        />
      )}
    </div>
  );
};

export default MissionDeck;
