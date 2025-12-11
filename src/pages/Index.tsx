import { useState } from "react";
import { Realm } from "@/data/realms";
import { cn } from "@/lib/utils";
import Scanlines from "@/components/HUD/Scanlines";
import StatusBar from "@/components/HUD/StatusBar";
import ViewToggle, { ViewMode } from "@/components/Navigation/ViewToggle";
import RealmSelector from "@/components/RealmSelector/RealmSelector";
import MissionDeck from "@/components/MissionDeck/MissionDeck";
import WarRoomMap from "@/components/WarRoomMap/WarRoomMap";
import { realms } from "@/data/realms";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("loadout");
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);

  const handleRealmSelect = (realm: Realm | null) => {
    setSelectedRealm(realm);
    if (realm && currentView === "loadout") {
      setCurrentView("deck");
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid-tactical">
      <Scanlines />
      <StatusBar />
      
      <main className="pt-20 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-primary" />
            <div>
              <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
                OKC MENTAL HEALTH SQUAD
              </span>
              <h1 className="font-orbitron text-xl md:text-2xl font-bold text-primary tactical-glow">
                BRO-IMPOSSIBLE QUEST
              </h1>
            </div>
          </div>
          
          <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
        </div>
        
        {/* Content Area */}
        <div className="space-y-8">
          {currentView === "loadout" && (
            <RealmSelector
              selectedRealm={selectedRealm}
              onSelectRealm={handleRealmSelect}
            />
          )}
          
          {currentView === "deck" && (
            <>
              {/* Compact realm selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
                <button
                  onClick={() => setSelectedRealm(null)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 border font-mono-tactical text-xs transition-all",
                    !selectedRealm
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-primary/30 text-muted-foreground hover:border-primary/60"
                  )}
                >
                  ALL
                </button>
                {realms.map((realm) => (
                  <button
                    key={realm.id}
                    onClick={() => setSelectedRealm(realm)}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 border font-mono-tactical text-xs transition-all flex items-center gap-2",
                      selectedRealm?.id === realm.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-primary/30 text-muted-foreground hover:border-primary/60"
                    )}
                  >
                    <span>{realm.icon}</span>
                    <span className="hidden sm:inline">{realm.codename}</span>
                  </button>
                ))}
              </div>
              <MissionDeck selectedRealm={selectedRealm} />
            </>
          )}
          
          {currentView === "map" && (
            <WarRoomMap selectedRealm={selectedRealm} />
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono-tactical text-xs text-muted-foreground">
              CLASSIFIED • FOR AUTHORIZED BROS ONLY • v2.0.0
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-tactical text-xs text-muted-foreground">
                TOTAL MISSIONS: 41
              </span>
              <span className="font-mono-tactical text-xs text-muted-foreground">
                REALMS: 8
              </span>
              <span className="font-mono-tactical text-xs text-primary animate-pulse">
                ● SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;