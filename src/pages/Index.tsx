import { useState, useMemo, useEffect, useRef } from "react";
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

import MissionDetailModal from "@/components/MissionDeck/MissionDetailModal";
import ItineraryBuilder from "@/components/ItineraryBuilder/ItineraryBuilder";
import { useIsMobile } from "@/hooks/use-mobile";
import { useConquered } from "@/hooks/useConquered";
import { Helmet } from "react-helmet";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold });
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
  const { conquered, toggleConquered, isConquered, conqueredCount } = useConquered();
  const [filters, setFilters] = useState<FilterState>({
    search: "", maxDistance: 10, priceRange: [1, 5], dangerLevels: [], maxDuration: "",
  });

  const filteredMissions = useMemo(() => {
    let result = selectedRealm ? missions.filter(m => m.realmId === selectedRealm.id) : missions;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.codename.toLowerCase().includes(q)
      );
    }
    if (filters.maxDistance < 10) result = result.filter(m => m.distanceFromOKC <= filters.maxDistance);
    if (filters.priceRange[0] > 1 || filters.priceRange[1] < 5) result = result.filter(m => m.priceRange >= filters.priceRange[0] && m.priceRange <= filters.priceRange[1]);
    if (filters.dangerLevels.length > 0) result = result.filter(m => filters.dangerLevels.includes(m.dangerLevel));
    return result;
  }, [selectedRealm, filters]);

  const filteredMissionIds = useMemo(() => new Set(filteredMissions.map(m => m.id)), [filteredMissions]);

  const handleAddToItinerary = (mission: Mission) => {
    setItineraryMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) return prev.filter(m => m.id !== mission.id);
      return [...prev, mission];
    });
  };

  const progressPercent = Math.round((conqueredCount / missions.length) * 100);

  const statsReveal = useReveal(0.2);
  const legendaryReveal = useReveal(0.15);
  const searchReveal = useReveal(0.15);
  const realmReveal = useReveal(0.15);
  const missionsReveal = useReveal(0.1);

  return (
    <>
      <Helmet>
        <title>LEGENDS | The Epic Bro Trip Planner by TLC</title>
        <meta name="description" content="Life is short. Make it legendary. Discover extraordinary adventures — tank driving, helicopter hunts, storm chasing, and more across the American heartland." />
      </Helmet>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to content
      </a>

      <div className="min-h-screen bg-background">
        <FloatingNav itineraryCount={itineraryMissions.length} onItineraryToggle={() => setIsItineraryOpen(!isItineraryOpen)} />
        <HeroBanner />

        {/* Legacy Progress */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-sans tracking-wider uppercase">Legacy Progress</span>
            <span className="stat-value text-xs ml-auto">{conqueredCount}/{missions.length}</span>
            <span className="text-xs text-muted-foreground">({progressPercent}%)</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-secondary" />
        </div>

        <section className="w-full px-4 md:px-8 max-w-[1600px] mx-auto mt-8 relative z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(0 70% 18% / 0.55) 0%, transparent 60%)' }} aria-label="Adventure map">
          <WarRoomMap
            selectedRealm={selectedRealm}
            onMissionSelect={setSelectedMission}
            onAddToItinerary={handleAddToItinerary}
            itineraryMissions={itineraryMissions}
            filteredMissionIds={filteredMissionIds}
            conquered={conquered}
          />
        </section>

        <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-0">
          <section ref={statsReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 py-10 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'linear-gradient(180deg, hsl(0 50% 10% / 0.6) 0%, transparent 100%)' }}
            aria-label="Adventure statistics">
            <div className="max-w-7xl mx-auto"><StatsBar conqueredCount={conqueredCount} /></div>
          </section>

          <div className="rune-divider w-80 mx-auto my-2" aria-hidden="true" />

          <section ref={legendaryReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-100 py-10 ${legendaryReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Legendary picks">
            <LegendaryPicks onMissionSelect={setSelectedMission} />
          </section>

          <section ref={searchReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-200 py-10 ${searchReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(0 55% 8% / 0.7) 50%, transparent 100%)' }}
            aria-label="Search and filter adventures">
            <SearchFilter filters={filters} onFiltersChange={setFilters} totalResults={filteredMissions.length} />
          </section>

          <section ref={realmReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-300 py-10 ${realmReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            aria-label="Adventure categories">
            <RealmSelector selectedRealm={selectedRealm} onSelectRealm={setSelectedRealm} />
          </section>

          <div className="rune-divider w-80 mx-auto my-2" aria-hidden="true" />

          <section id="adventures-section" ref={missionsReveal.ref as React.RefObject<HTMLElement>}
            className={`transition-all duration-700 delay-[400ms] py-10 ${missionsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'linear-gradient(180deg, hsl(0 50% 10% / 0.55) 0%, transparent 100%)' }}
            aria-label="Adventure listings">
            <MissionDeck selectedRealm={selectedRealm} itineraryMissions={itineraryMissions} onAddToItinerary={handleAddToItinerary} filteredMissions={filteredMissions}
              conquered={conquered} onToggleConquered={toggleConquered} />
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
            isConquered={isConquered(selectedMission.id)}
            onToggleConquered={() => toggleConquered(selectedMission.id)}
          />
        )}
      </div>
    </>
  );
};

export default Index;
