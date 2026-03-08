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
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
          <div>
            <h2 className="font-orbitron text-xl font-bold text-foreground">
              {selectedRealm ? selectedRealm.name : "All Quests"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {displayedMissions.length} legendary adventures available
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Grid */}
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
      
      {/* Empty state */}
      {displayedMissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border border-border rounded-xl bg-card/50">
          <span className="text-4xl mb-4">💀</span>
          <span className="text-sm text-muted-foreground mb-2 font-orbitron">
            No quests match your filters
          </span>
          <span className="text-xs text-muted-foreground">
            Try adjusting your search or filters, warrior
          </span>
        </div>
      )}
      
      {/* Mission Detail Modal */}
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
