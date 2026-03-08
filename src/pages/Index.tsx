import { useState, useMemo } from "react";
import { Realm } from "@/data/realms";
import { Mission, missions } from "@/data/missions";
import { FilterState } from "@/components/SearchFilter/SearchFilter";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import MissionDetailModal from "@/components/MissionDeck/MissionDetailModal";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";
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
    if (filters.maxDistance < 10) result = result.filter(m => m.distanceFromOKC <= filters.maxDistance);
    if (filters.priceRange[0] > 1 || filters.priceRange[1] < 5) result = result.filter(m => m.priceRange >= filters.priceRange[0] && m.priceRange <= filters.priceRange[1]);
    if (filters.dangerLevels.length > 0) result = result.filter(m => filters.dangerLevels.includes(m.dangerLevel));
    return result;
  }, [selectedRealm, filters]);

  const handleAddToItinerary = (mission: Mission) => {
    setItineraryMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) return prev.filter(m => m.id !== mission.id);
      return [...prev, mission];
    });
  };

  return (
    <>
      <Helmet>
        <title>Remember You Must Live | Extraordinary Adventures</title>
        <meta name="description" content="Discover extraordinary outdoor adventures and unforgettable experiences across Oklahoma, Texas, and beyond. From storm chasing to exotic safaris — live before you die." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <AppHeader />
        
        {/* Hero Map — full-width, immersive, first thing visitors see */}
        <section className="w-full px-4 md:px-8 pt-4 pb-2 max-w-7xl mx-auto animate-fade-in-up">
          <WarRoomMap 
            selectedRealm={selectedRealm} 
            onMissionSelect={setSelectedMission}
            onAddToItinerary={handleAddToItinerary}
            itineraryMissions={itineraryMissions}
          />
        </section>
        
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-10">
          <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <StatsBar />
          </section>

          <section>
            <SearchFilter filters={filters} onFiltersChange={setFilters} totalResults={filteredMissions.length} />
          </section>

          <section>
            <RealmSelector selectedRealm={selectedRealm} onSelectRealm={setSelectedRealm} />
          </section>
          
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
        
        <ItineraryBuilder
          selectedMissions={itineraryMissions}
          onRemoveMission={(id) => setItineraryMissions(prev => prev.filter(m => m.id !== id))}
          onClearAll={() => { setItineraryMissions([]); setIsItineraryOpen(false); }}
          isOpen={isItineraryOpen}
          onToggle={() => setIsItineraryOpen(!isItineraryOpen)}
        />
        
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
