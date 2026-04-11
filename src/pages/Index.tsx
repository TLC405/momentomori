import { useState, useMemo, lazy, Suspense, useEffect, useRef, useCallback } from "react";
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

// Intersection observer reveal hook
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

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

  // Create a set of filtered IDs for map sync
  const filteredMissionIds = useMemo(() => new Set(filteredMissions.map(m => m.id)), [filteredMissions]);

  const handleAddToItinerary = (mission: Mission) => {
    setItineraryMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) return prev.filter(m => m.id !== mission.id);
      return [...prev, mission];
    });
  };

  // Staggered reveals
  const statsReveal = useReveal(0.2);
  const legendaryReveal = useReveal(0.15);
  const searchReveal = useReveal(0.15);
  const realmReveal = useReveal(0.15);
  const missionsReveal = useReveal(0.1);

  return (
    <>
      <Helmet>
        <title>BEFORE YOU GO | Life is Short. Make it Legendary.</title>
        <meta name="description" content="The Bucket List Engine for the Brotherhood. Discover extraordinary adventures — tank driving, helicopter hunts, storm chasing, and more across the American heartland." />
      </Helmet>

      {/* Skip to content — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to content
      </a>

      <div className="min-h-screen bg-background">
        <FloatingNav
          itineraryCount={itineraryMissions.length}
          onItineraryToggle={() => setIsItineraryOpen(!isItineraryOpen)}
        />

        <HeroBanner />

        {/* Full immersive map — synced with filters */}
        <section className="w-full px-4 md:px-8 max-w-[1600px] mx-auto -mt-16 relative z-10" aria-label="Adventure map">
          <WarRoomMap
            selectedRealm={selectedRealm}
            onMissionSelect={setSelectedMission}
            onAddToItinerary={handleAddToItinerary}
            itineraryMissions={itineraryMissions}
            filteredMissionIds={filteredMissionIds}
          />
        </section>

        <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
          {/* Stats ticker */}
          <section
            ref={statsReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Adventure statistics"
          >
            <StatsBar />
          </section>

          {/* Legendary picks marquee */}
          <section
            ref={legendaryReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-100 ${legendaryReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Legendary picks"
          >
            <LegendaryPicks onMissionSelect={setSelectedMission} />
          </section>

          {/* Search */}
          <section
            ref={searchReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-200 ${searchReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Search and filter adventures"
          >
            <SearchFilter filters={filters} onFiltersChange={setFilters} totalResults={filteredMissions.length} />
          </section>

          {/* Realm selector */}
          <section
            ref={realmReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-300 ${realmReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Adventure categories"
          >
            <RealmSelector selectedRealm={selectedRealm} onSelectRealm={setSelectedRealm} />
          </section>

          {/* Mission cards */}
          <section
            ref={missionsReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-[400ms] ${missionsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Adventure listings"
          >
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
