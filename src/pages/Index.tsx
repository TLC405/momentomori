import { useState, useMemo } from "react";
import { Realm } from "@/data/realms";
import { Mission, missions } from "@/data/missions";
import { FilterState } from "@/components/SearchFilter/SearchFilter";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import MissionDetailModal from "@/components/MissionDeck/MissionDetailModal";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";
import FeaturedQuest from "@/components/FeaturedQuest/FeaturedQuest";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import StatsBar from "@/components/StatsBar/StatsBar";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
import { Helmet } from "react-helmet";

const Index = () => {
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [itineraryMissions, setItineraryMissions] = useState<Mission[]>([]);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    maxDistance: 10,
    priceRange: [1, 5],
    dangerLevels: [],
    maxDuration: "",
  });

  const filteredMissions = useMemo(() => {
    let result = selectedRealm
      ? missions.filter(m => m.realmId === selectedRealm.id)
      : missions;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.codename.toLowerCase().includes(q)
      );
    }
    if (filters.maxDistance < 10) {
      result = result.filter(m => m.distanceFromOKC <= filters.maxDistance);
    }
    if (filters.priceRange[0] > 1 || filters.priceRange[1] < 5) {
      result = result.filter(m => m.priceRange >= filters.priceRange[0] && m.priceRange <= filters.priceRange[1]);
    }
    if (filters.dangerLevels.length > 0) {
      result = result.filter(m => filters.dangerLevels.includes(m.dangerLevel));
    }
    return result;
  }, [selectedRealm, filters]);

  const handleAddToItinerary = (mission: Mission) => {
    setItineraryMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) return prev.filter(m => m.id !== mission.id);
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
        <title>REMEMBER YOU MUST DIE | Epic Adventures Await</title>
        <meta name="description" content="Memento Mori. Epic adventures for the bold. Remember you must die — so LIVE first! Tanks, helicopters, storm chasing, and legendary experiences across Oklahoma and Texas." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <AppHeader />
        
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
          {/* Stats Dashboard */}
          <section className="animate-fade-in-up">
            <StatsBar />
          </section>

          {/* Featured Quest */}
          <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <FeaturedQuest
              onSelectMission={setSelectedMission}
              onAddToItinerary={handleAddToItinerary}
              isInItinerary={false}
            />
          </section>

          {/* Map */}
          <section className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-orbitron text-lg md:text-xl font-bold text-foreground mb-1">
                  Choose Your Adventure
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click on quest markers to explore legendary experiences
                </p>
              </div>
            </div>
            <WarRoomMap 
              selectedRealm={selectedRealm} 
              onMissionSelect={setSelectedMission}
              onAddToItinerary={handleAddToItinerary}
              itineraryMissions={itineraryMissions}
            />
          </section>
          
          {/* Search & Filter */}
          <section>
            <SearchFilter
              filters={filters}
              onFiltersChange={setFilters}
              totalResults={filteredMissions.length}
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
              filteredMissions={filteredMissions}
            />
          </section>
        </main>
        
        <AppFooter />
        
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
