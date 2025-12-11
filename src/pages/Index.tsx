import { useState } from "react";
import { Realm } from "@/data/realms";
import { Mission } from "@/data/missions";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import MissionDetail from "@/components/MissionDeck/MissionDetail";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";

const Index = () => {
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [itineraryMissions, setItineraryMissions] = useState<Mission[]>([]);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);

  const handleAddToItinerary = (mission: Mission) => {
    setItineraryMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) {
        return prev.filter(m => m.id !== mission.id);
      }
      return [...prev, mission];
    });
  };

  const handleRemoveFromItinerary = (missionId: string) => {
    setItineraryMissions(prev => prev.filter(m => m.id !== missionId));
  };

  const handleClearItinerary = () => {
    setItineraryMissions([]);
    setIsItineraryOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <div>
                <h1 className="font-orbitron text-xl md:text-2xl font-bold text-primary amber-glow tracking-wide">
                  WAR ROOM
                </h1>
                <p className="text-xs text-muted-foreground tracking-wider">
                  Become a legend with brothers in arms
                </p>
              </div>
            </div>
            
            {/* Status */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                <span className="w-2 h-2 rounded-full bg-danger-low animate-pulse" />
                <span className="text-xs text-muted-foreground font-medium">Systems Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* Map Section - 50% of viewport */}
        <section>
          <WarRoomMap 
            selectedRealm={selectedRealm} 
            onMissionSelect={setSelectedMission}
            onAddToItinerary={handleAddToItinerary}
            itineraryMissions={itineraryMissions}
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
          <MissionDeck 
            selectedRealm={selectedRealm}
            itineraryMissions={itineraryMissions}
            onAddToItinerary={handleAddToItinerary}
          />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary/50 rounded-full" />
              <span className="font-orbitron text-sm text-muted-foreground">WAR ROOM</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              A brotherhood adventure guide for men who refuse to live ordinary lives.
            </p>
            <div className="text-xs text-muted-foreground">
              OKC Based • Est. 2024
            </div>
          </div>
        </div>
      </footer>
      
      {/* Itinerary Builder */}
      <ItineraryBuilder
        selectedMissions={itineraryMissions}
        onRemoveMission={handleRemoveFromItinerary}
        onClearAll={handleClearItinerary}
        isOpen={isItineraryOpen}
        onToggle={() => setIsItineraryOpen(!isItineraryOpen)}
      />
      
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
