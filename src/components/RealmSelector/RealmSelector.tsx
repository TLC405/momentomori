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
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-primary/50 rounded-full" />
        <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Filter by Realm</span>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => onSelectRealm(null)}
          className={cn(
            "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 btn-3d",
            "border backdrop-blur-sm",
            !selectedRealm
              ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_hsl(var(--tactical-amber)/0.2)] translate-y-[-2px]"
              : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card hover:translate-y-[-2px]"
          )}
        >
          <span className="font-orbitron">All ({missions.length})</span>
        </button>
        
        <div className="w-px h-6 bg-border/50 flex-shrink-0" />
        
        {realms.map((realm) => {
          const count = getRealmMissionCount(realm.id);
          const isSelected = selectedRealm?.id === realm.id;
          return (
            <button
              key={realm.id}
              onClick={() => onSelectRealm(realm)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 btn-3d",
                "border flex items-center gap-2 backdrop-blur-sm relative",
                isSelected
                  ? "border-primary bg-primary/15 text-primary shadow-[0_0_15px_hsl(var(--tactical-amber)/0.2)] translate-y-[-2px]"
                  : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card hover:translate-y-[-2px]"
              )}
            >
              <span className={cn(
                "text-lg transition-transform duration-300",
                isSelected && "scale-125"
              )}>
                {realm.icon}
              </span>
              <span className="hidden sm:inline">{realm.name}</span>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all",
                isSelected
                  ? "bg-primary/30 text-primary"
                  : "bg-muted/50 text-muted-foreground"
              )}>
                {count}
              </span>
              {realm.isNew && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger-low rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RealmSelector;
