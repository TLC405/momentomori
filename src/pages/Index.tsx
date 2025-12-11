import { useState } from "react";
import { Realm } from "@/data/realms";
import { Mission } from "@/data/missions";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import MissionDetailModal from "@/components/MissionDeck/MissionDetailModal";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>WAR ROOM | Brotherhood Adventure Guide</title>
        <meta name="description" content="Discover legendary adventures across Oklahoma and beyond. Tanks, helicopters, storm chasing, and more. Become a legend with brothers in arms." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header - Premium Redesign */}
        <header className="sticky top-0 z-50 bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-xl border-b border-primary/20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo mark */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-[0_0_25px_hsl(var(--tactical-amber)/0.4)]">
                    <span className="text-2xl">⚔️</span>
                  </div>
                  <div className="absolute -inset-0.5 rounded-xl bg-primary/30 blur-sm -z-10" />
                </div>
                
                <div>
                  <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary tracking-wider">
                    WAR ROOM
                  </h1>
                  <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
                    Brotherhood Adventure Guide
                  </p>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-danger-low animate-pulse shadow-[0_0_6px_hsl(var(--danger-low))]" />
                  <span className="text-xs text-muted-foreground font-medium">Quests Active</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 shadow-lg">
                  <span className="text-sm">🗺️</span>
                  <span className="text-xs text-muted-foreground font-medium">Explorer Mode</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative bottom gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </header>
        
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
          {/* Hero Section with Map */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-orbitron text-lg md:text-xl font-bold text-foreground mb-1">
                  Realm of Adventures
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click on quest markers to explore legendary experiences
                </p>
              </div>
              
              {/* Map legend hint */}
              <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground bg-card/50 px-4 py-2 rounded-lg border border-border/30">
                <span>🏰 HQ</span>
                <span className="text-border/50">•</span>
                <span>🔥 Quest Rating</span>
                <span className="text-border/50">•</span>
                <span>⚔️ Danger Level</span>
              </div>
            </div>
            
            <WarRoomMap 
              selectedRealm={selectedRealm} 
              onMissionSelect={setSelectedMission}
              onAddToItinerary={handleAddToItinerary}
              itineraryMissions={itineraryMissions}
            />
          </section>
          
          {/* Realm Filter */}
          <section className="pt-4">
            <RealmSelector
              selectedRealm={selectedRealm}
              onSelectRealm={setSelectedRealm}
            />
          </section>
          
          {/* Missions Grid */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
              <div>
                <h2 className="font-orbitron text-xl font-bold text-foreground">
                  {selectedRealm ? selectedRealm.name : "All Quests"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedRealm ? selectedRealm.description : "Legendary adventures await the brave"}
                </p>
              </div>
            </div>
            
            <MissionDeck 
              selectedRealm={selectedRealm}
              itineraryMissions={itineraryMissions}
              onAddToItinerary={handleAddToItinerary}
            />
          </section>
        </main>
        
        {/* Footer - Enhanced */}
        <footer className="border-t border-primary/20 mt-16 bg-gradient-to-b from-background to-card/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-xl">⚔️</span>
                  </div>
                  <span className="font-orbitron text-lg font-bold text-primary">WAR ROOM</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A brotherhood adventure guide for men who refuse to live ordinary lives. 
                  Discover extraordinary experiences across Oklahoma and beyond.
                </p>
              </div>
              
              {/* Quick Stats */}
              <div>
                <h4 className="font-orbitron text-sm font-bold text-foreground mb-4">BY THE NUMBERS</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="font-orbitron text-2xl text-primary font-bold">20+</div>
                    <div className="text-xs text-muted-foreground">Quests</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="font-orbitron text-2xl text-primary font-bold">8</div>
                    <div className="text-xs text-muted-foreground">Realms</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="font-orbitron text-2xl text-primary font-bold">5</div>
                    <div className="text-xs text-muted-foreground">States</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="font-orbitron text-2xl text-primary font-bold">∞</div>
                    <div className="text-xs text-muted-foreground">Memories</div>
                  </div>
                </div>
              </div>
              
              {/* Mission */}
              <div>
                <h4 className="font-orbitron text-sm font-bold text-foreground mb-4">THE MISSION</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Every warrior needs a quest. Every brotherhood needs adventures. 
                  This is your tactical guide to experiences that forge legends.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Based in Oklahoma City</span>
                </div>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="pt-8 border-t border-border/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  © 2024 WAR ROOM • Built for brothers, by brothers
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>🔥 Bro-approved adventures only</span>
                  <span className="text-border/50">•</span>
                  <span>No ordinary experiences</span>
                </div>
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
          <MissionDetailModal
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
            onAddToItinerary={() => handleAddToItinerary(selectedMission)}
            isInItinerary={itineraryMissions.some(m => m.id === selectedMission.id)}
          />
        )}
      </div>
    </>
  );
};

export default Index;
