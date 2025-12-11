import { useState } from "react";
import { Mission, missions, getMissionsByRealm } from "@/data/missions";
import { Realm } from "@/data/realms";
import MissionCard from "./MissionCard";
import MissionDetail from "./MissionDetail";

interface MissionDeckProps {
  selectedRealm: Realm | null;
  itineraryMissions?: Mission[];
  onAddToItinerary?: (mission: Mission) => void;
}

const MissionDeck = ({ selectedRealm, itineraryMissions = [], onAddToItinerary }: MissionDeckProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const displayedMissions = selectedRealm 
    ? getMissionsByRealm(selectedRealm.id)
    : missions;

  const isInItinerary = (missionId: string) => 
    itineraryMissions.some(m => m.id === missionId);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <div>
            <h2 className="font-orbitron text-lg font-bold text-foreground">
              {selectedRealm ? selectedRealm.name : "All Missions"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {displayedMissions.length} operations available
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
          <svg className="w-12 h-12 text-muted-foreground/30 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm text-muted-foreground mb-2">
            No missions found
          </span>
          <span className="text-xs text-muted-foreground">
            Select a different realm
          </span>
        </div>
      )}
      
      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
};

export default MissionDeck;
