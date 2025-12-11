import { Crosshair, Navigation, Target, Zap } from "lucide-react";

interface MapHUDProps {
  missionCount: number;
  hoveredCoords?: { lat: number; lng: number } | null;
  selectedRealm?: string | null;
}

const MapHUD = ({ missionCount, hoveredCoords, selectedRealm }: MapHUDProps) => {
  return (
    <>
      {/* Top Left - Title & Status */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-primary/30 shadow-lg">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-50" />
          </div>
          <span className="font-orbitron text-sm text-primary font-bold tracking-widest">
            WAR ROOM
          </span>
          <span className="text-muted-foreground text-xs">|</span>
          <span className="font-orbitron text-xs text-muted-foreground tracking-wider">
            TACTICAL COMMAND
          </span>
        </div>
        
        {selectedRealm && (
          <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-md px-3 py-1.5 rounded border border-primary/20">
            <Target size={12} className="text-primary" />
            <span className="font-orbitron text-xs text-primary uppercase tracking-wide">
              {selectedRealm}
            </span>
          </div>
        )}
      </div>

      {/* Top Right - Coordinates Display */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        <div className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-border/50 shadow-lg">
          <div className="flex items-center gap-3">
            <Crosshair size={14} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-orbitron text-[10px] text-muted-foreground tracking-wider">
                COORDINATES
              </span>
              <span className="font-orbitron text-xs text-foreground">
                {hoveredCoords 
                  ? `${hoveredCoords.lat.toFixed(4)}°N ${Math.abs(hoveredCoords.lng).toFixed(4)}°W`
                  : "35.4676°N 97.5164°W"
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left - Mission Count */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-md px-4 py-3 rounded-lg border border-border/50 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary" />
            <span className="font-orbitron text-[10px] text-muted-foreground tracking-wider">
              ACTIVE OPS
            </span>
          </div>
          <span className="font-orbitron text-2xl text-primary font-bold">
            {missionCount}
          </span>
        </div>
      </div>

      {/* Bottom Right - Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-md px-4 py-3 rounded-lg border border-border/50 shadow-lg">
        <div className="flex items-center gap-1 mb-2">
          <span className="font-orbitron text-[10px] text-muted-foreground tracking-wider">
            THREAT LEVEL
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rotate-45 bg-danger-low" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rotate-45 bg-danger-medium" />
            <span className="text-xs text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rotate-45 bg-danger-high" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rotate-45 bg-danger-extreme" />
            <span className="text-xs text-muted-foreground">Extreme</span>
          </div>
        </div>
      </div>

      {/* Compass Rose - Bottom Center */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-30">
        <Navigation size={24} className="text-primary rotate-0" />
      </div>

      {/* Scale Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <div className="flex items-center gap-1">
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary/80 to-primary/20" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <span className="font-orbitron text-[8px] text-muted-foreground tracking-wider">
          100 MI
        </span>
      </div>
    </>
  );
};

export default MapHUD;