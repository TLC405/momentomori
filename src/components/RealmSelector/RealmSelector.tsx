import { realms, Realm } from "@/data/realms";
import RealmCard from "./RealmCard";

interface RealmSelectorProps {
  selectedRealm: Realm | null;
  onSelectRealm: (realm: Realm | null) => void;
}

const RealmSelector = ({ selectedRealm, onSelectRealm }: RealmSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
              SELECT OPERATIONAL REALM
            </span>
            <h2 className="font-orbitron text-2xl font-bold text-primary tactical-glow">
              LOADOUT
            </h2>
          </div>
        </div>
        
        {selectedRealm && (
          <button
            onClick={() => onSelectRealm(null)}
            className="font-mono-tactical text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <span className="w-4 h-px bg-current" />
            CLEAR SELECTION
          </button>
        )}
      </div>
      
      {/* Realm Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {realms.map((realm, index) => (
          <RealmCard
            key={realm.id}
            realm={realm}
            isSelected={selectedRealm?.id === realm.id}
            onClick={() => onSelectRealm(selectedRealm?.id === realm.id ? null : realm)}
            index={index}
          />
        ))}
      </div>
      
      {/* Selected realm indicator */}
      {selectedRealm && (
        <div className="flex items-center justify-center gap-3 py-4 border-t border-primary/20 animate-fade-in">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <span className="font-mono-tactical text-sm text-muted-foreground">
            REALM ACTIVE:
          </span>
          <span className="font-orbitron text-sm text-primary">
            {selectedRealm.name.toUpperCase()}
          </span>
          <span className="font-mono-tactical text-sm text-muted-foreground">
            [{selectedRealm.missionCount} MISSIONS AVAILABLE]
          </span>
        </div>
      )}
    </div>
  );
};

export default RealmSelector;
