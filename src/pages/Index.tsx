import { useState, useMemo } from "react";
import { Realm } from "@/data/realms";
import { Mission, missions } from "@/data/missions";
import { FilterState } from "@/components/SearchFilter/SearchFilter";
import HeroBanner from "@/components/Layout/HeroBanner";
import FloatingNav from "@/components/Layout/FloatingNav";
import AppFooter from "@/components/Layout/AppFooter";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import LegendaryPicks from "@/components/LegendaryPicks/LegendaryPicks";
import StatsBar from "@/components/StatsBar/StatsBar";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import SwipeDeck from "@/components/MissionDeck/SwipeDeck";
import MissionDetailModal from "@/components/MissionDeck/MissionDetailModal";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const Index = () => {
  const isMobile = useIsMobile();
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
        <title>BEFORE YOU GO | Life is Short. Make it Legendary.</title>
        <meta name="description" content="The Bucket List Engine for the Brotherhood. Discover extraordinary adventures — tank driving, helicopter hunts, storm chasing, and more across the American heartland." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Floating nav appears on scroll */}
        <FloatingNav
          itineraryCount={itineraryMissions.length}
          onItineraryToggle={() => setIsItineraryOpen(!isItineraryOpen)}
        />

        {/* Cinematic hero — no traditional header */}
        <HeroBanner />

        {/* Full immersive map */}
        <section className="w-full px-4 md:px-8 max-w-[1600px] mx-auto -mt-16 relative z-10">
          <WarRoomMap
            selectedRealm={selectedRealm}
            onMissionSelect={setSelectedMission}
            onAddToItinerary={handleAddToItinerary}
            itineraryMissions={itineraryMissions}
          />
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
          {/* Stats ticker */}
          <section className="animate-fade-in-up">
            <StatsBar />
          </section>

          {/* Legendary picks marquee */}
          <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <LegendaryPicks onMissionSelect={setSelectedMission} />
          </section>

          {/* Search (command palette trigger) */}
          <section>
            <SearchFilter filters={filters} onFiltersChange={setFilters} totalResults={filteredMissions.length} />
          </section>

          {/* Realm selector — visual grid */}
          <section>
            <RealmSelector selectedRealm={selectedRealm} onSelectRealm={setSelectedRealm} />
          </section>

          {/* Mission cards — editorial grid or swipe deck on mobile */}
          <section>
            {isMobile ? (
              <SwipeDeck
                missions={filteredMissions}
                onAddToItinerary={handleAddToItinerary}
                onViewDetail={setSelectedMission}
                itineraryMissions={itineraryMissions}
              />
            ) : (
              <MissionDeck
                selectedRealm={selectedRealm}
                itineraryMissions={itineraryMissions}
                onAddToItinerary={handleAddToItinerary}
                filteredMissions={filteredMissions}
              />
            )}
          </section>
        </main>

        {/* "The Last Word" footer */}
        <AppFooter />

        {/* Itinerary side drawer */}
        <ItineraryBuilder
          selectedMissions={itineraryMissions}
          onRemoveMission={(id) => setItineraryMissions(prev => prev.filter(m => m.id !== id))}
          onClearAll={() => { setItineraryMissions([]); setIsItineraryOpen(false); }}
          isOpen={isItineraryOpen}
          onToggle={() => setIsItineraryOpen(!isItineraryOpen)}
        />

        {/* Mission detail from map/marquee clicks */}
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