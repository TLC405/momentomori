import { Realm, realms } from "@/data/realms";
import { missions } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";

interface RealmSelectorProps {
  selectedRealm: Realm | null;
  onSelectRealm: (realm: Realm | null) => void;
}

// Get a representative image for each realm
const getRealmImage = (realmId: string): string => {
  const realmMission = missions.find(m => m.realmId === realmId);
  return realmMission ? getMissionImage(realmMission.id) : "";
};

const RealmSelector = ({ selectedRealm, onSelectRealm }: RealmSelectorProps) => {
  const getRealmMissionCount = (realmId: string) =>
    missions.filter(m => m.realmId === realmId).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-1">
        <h2 className="font-display text-lg font-bold text-foreground">Adventure Realms</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/40 to-transparent rounded-full" />
      </div>

      {/* "All" button + visual grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onSelectRealm(null)}
          className={cn(
            "relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 group",
            !selectedRealm
              ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              : "border-border/30 hover:border-primary/40 hover:translate-y-[-2px]"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-card" />
          <div className="relative h-full flex flex-col items-center justify-center gap-1.5 p-3">
            <span className="text-2xl">🌍</span>
            <span className="text-xs font-semibold text-foreground">All</span>
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-bold",
              !selectedRealm ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            )}>
              {missions.length}
            </span>
          </div>
        </button>

        {realms.map((realm) => {
          const count = getRealmMissionCount(realm.id);
          const isSelected = selectedRealm?.id === realm.id;
          const imageUrl = getRealmImage(realm.id);

          return (
            <button
              key={realm.id}
              onClick={() => onSelectRealm(realm)}
              className={cn(
                "relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 group",
                isSelected
                  ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "border-border/30 hover:border-primary/40 hover:translate-y-[-2px]"
              )}
            >
              {/* Background image */}
              <div
                className={cn(
                  "absolute inset-0 bg-cover bg-center transition-all duration-500",
                  !isSelected && "grayscale-[60%] group-hover:grayscale-0"
                )}
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-end gap-1 p-3 pb-2.5">
                <span className={cn("text-xl transition-transform duration-300", isSelected && "scale-125")}>{realm.icon}</span>
                <span className="text-[11px] font-semibold text-foreground leading-tight text-center line-clamp-1">{realm.name}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold transition-all",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-background/60 text-muted-foreground"
                )}>
                  {count}
                </span>
              </div>

              {/* New badge */}
              {realm.isNew && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-earth-forest rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="gradient-divider" />
    </div>
  );
};

export default RealmSelector;