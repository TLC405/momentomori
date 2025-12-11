import { Realm, realms } from "@/data/realms";
import { cn } from "@/lib/utils";

interface RealmSelectorProps {
  selectedRealm: Realm | null;
  onSelectRealm: (realm: Realm | null) => void;
}

const RealmSelector = ({ selectedRealm, onSelectRealm }: RealmSelectorProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {/* All button */}
      <button
        onClick={() => onSelectRealm(null)}
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          "border",
          !selectedRealm
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
        )}
      >
        All Missions
      </button>
      
      {/* Realm buttons */}
      {realms.map((realm) => (
        <button
          key={realm.id}
          onClick={() => onSelectRealm(realm)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
            "border flex items-center gap-2",
            selectedRealm?.id === realm.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          <span className="text-base">{realm.icon}</span>
          <span className="hidden sm:inline">{realm.name}</span>
        </button>
      ))}
    </div>
  );
};

export default RealmSelector;