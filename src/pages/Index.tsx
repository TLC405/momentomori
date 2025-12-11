import { useState } from "react";
import { Realm } from "@/data/realms";
import { Mission } from "@/data/missions";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import MissionDetail from "@/components/MissionDeck/MissionDetail";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";

const Index = () => {
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-primary rounded-full" />
              <div>
                <h1 className="font-orbitron text-xl md:text-2xl font-bold text-primary amber-glow">
                  WAR ROOM
                </h1>
                <p className="text-xs text-muted-foreground">
                  Become a legend with brothers in arms
                </p>
              </div>
            </div>
            
            {/* Status */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-danger-low animate-pulse" />
              <span>Systems Active</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Map Section - 50% of viewport */}
        <section>
          <WarRoomMap 
            selectedRealm={selectedRealm} 
            onMissionSelect={setSelectedMission}
          />
        </section>
        
        {/* Realm Filter */}
        <section>
          <RealmSelector
            selectedRealm={selectedRealm}
            onSelectRealm={setSelectedRealm}
          />
        </section>
        
        {/* Missions Grid */}
        <section>
          <MissionDeck selectedRealm={selectedRealm} />
        </section>
      </main>
      
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

export default Index;