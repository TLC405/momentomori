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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
              {selectedRealm ? `REALM: ${selectedRealm.codename}` : "ALL OPERATIONS"}
            </span>
            <h2 className="font-orbitron text-2xl font-bold text-primary tactical-glow">
              MISSION DECK
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-mono-tactical text-sm text-muted-foreground">
            AVAILABLE:
          </span>
          <span className="font-orbitron text-xl text-primary">
            {displayedMissions.length}
          </span>
        </div>
      </div>
      
      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="flex flex-col items-center justify-center py-20 border border-primary/20">
          <span className="font-mono-tactical text-sm text-muted-foreground mb-2">
            NO MISSIONS FOUND
          </span>
          <span className="font-rajdhani text-sm text-muted-foreground">
            Select a different realm or clear filters
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
