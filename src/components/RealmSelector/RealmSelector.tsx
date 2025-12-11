import { Realm, realms } from "@/data/realms";
import { cn } from "@/lib/utils";

interface RealmSelectorProps {
  selectedRealm: Realm | null;
  onSelectRealm: (realm: Realm | null) => void;
}

const RealmSelector = ({ selectedRealm, onSelectRealm }: RealmSelectorProps) => {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary/50 rounded-full" />
        <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Filter by Realm</span>
      </div>
      
      {/* Realm Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {/* All button */}
        <button
          onClick={() => onSelectRealm(null)}
          className={cn(
            "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
            "border backdrop-blur-sm",
            !selectedRealm
              ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_hsl(var(--tactical-amber)/0.2)]"
              : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card"
          )}
        >
          <span className="font-orbitron">All Missions</span>
        </button>
        
        {/* Divider */}
        <div className="w-px h-6 bg-border/50 flex-shrink-0" />
        
        {/* Realm buttons */}
        {realms.map((realm) => (
          <button
            key={realm.id}
            onClick={() => onSelectRealm(realm)}
            className={cn(
              "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
              "border flex items-center gap-2 backdrop-blur-sm",
              selectedRealm?.id === realm.id
                ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_hsl(var(--tactical-amber)/0.2)]"
                : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card"
            )}
          >
            <span className="text-lg">{realm.icon}</span>
            <span className="hidden sm:inline">{realm.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RealmSelector;
