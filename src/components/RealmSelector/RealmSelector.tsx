import { Realm, realms } from "@/data/realms";
import { missions } from "@/data/missions";
import { cn } from "@/lib/utils";

interface RealmSelectorProps {
  selectedRealm: Realm | null;
  onSelectRealm: (realm: Realm | null) => void;
}

const RealmSelector = ({ selectedRealm, onSelectRealm }: RealmSelectorProps) => {
  const getRealmMissionCount = (realmId: string) =>
    missions.filter(m => m.realmId === realmId).length;

  return (
    <div className="space-y-3">
      <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Filter by Region</span>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => onSelectRealm(null)}
          className={cn(
            "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border btn-3d",
            !selectedRealm
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/50 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          All ({missions.length})
        </button>
        
        <div className="w-px h-5 bg-border/50 flex-shrink-0" />
        
        {realms.map((realm) => {
          const count = getRealmMissionCount(realm.id);
          const isSelected = selectedRealm?.id === realm.id;
          return (
            <button
              key={realm.id}
              onClick={() => onSelectRealm(realm)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border flex items-center gap-2 relative btn-3d",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <span className="text-lg">{realm.icon}</span>
              <span className="hidden sm:inline">{realm.name}</span>
              <span className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                isSelected ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
              )}>
                {count}
              </span>
              {realm.isNew && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-earth-forest rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RealmSelector;
