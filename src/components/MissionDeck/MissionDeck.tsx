import { useState } from "react";
import { Mission, missions, getMissionsByRealm } from "@/data/missions";
import { Realm } from "@/data/realms";
import MissionCard from "./MissionCard";
import MissionDetail from "./MissionDetail";

interface MissionDeckProps {
  selectedRealm: Realm | null;
}

const MissionDeck = ({ selectedRealm }: MissionDeckProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const displayedMissions = selectedRealm 
    ? getMissionsByRealm(selectedRealm.id)
    : missions;

  return (
    <div className="space-y-6">
      {/* Mission Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedMissions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onClick={() => setSelectedMission(mission)}
            index={index}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {displayedMissions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border border-border rounded-lg bg-card/50">
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