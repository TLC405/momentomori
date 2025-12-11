import { cn } from "@/lib/utils";

interface FantasyMapHUDProps {
  missionCount: number;
  hoveredCoords: { lat: number; lng: number } | null;
  selectedRealm?: string;
}

const FantasyMapHUD = ({ missionCount, hoveredCoords, selectedRealm }: FantasyMapHUDProps) => {
  return (
    <>
      {/* Top left - Title cartouche */}
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          {/* Ornate frame */}
          <div className="absolute -inset-2 border border-primary/20 rounded-lg" />
          <div className="absolute -inset-3 border border-primary/10 rounded-xl" />
          
          <div className="bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-md border border-primary/30 rounded-lg p-4 shadow-[0_0_30px_hsl(var(--tactical-amber)/0.2)]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 bg-gradient-to-b from-primary via-primary/70 to-primary/30 rounded-full" />
              <div>
                <h2 className="font-orbitron text-lg font-bold text-primary tracking-wider">
                  THE REALM OF ADVENTURES
                </h2>
                <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase mt-0.5">
                  {selectedRealm || "All Territories"} • {missionCount} Quests Await
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top right - Coordinates */}
      {hoveredCoords && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-primary/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <div className="font-mono text-xs">
                <span className="text-muted-foreground">LAT:</span>
                <span className="text-primary ml-1">{hoveredCoords.lat.toFixed(4)}°</span>
                <span className="text-muted-foreground ml-3">LNG:</span>
                <span className="text-primary ml-1">{hoveredCoords.lng.toFixed(4)}°</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom left - Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg">
          <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">
            Threat Assessment
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-danger-low shadow-[0_0_6px_hsl(var(--danger-low))]" />
              <span className="text-[10px] text-muted-foreground">Safe</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-danger-medium shadow-[0_0_6px_hsl(var(--danger-medium))]" />
              <span className="text-[10px] text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-danger-high shadow-[0_0_6px_hsl(var(--danger-high))]" />
              <span className="text-[10px] text-muted-foreground">Perilous</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-danger-extreme shadow-[0_0_6px_hsl(var(--danger-extreme))]" />
              <span className="text-[10px] text-muted-foreground">Deadly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom right - Instructions */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-[10px] text-muted-foreground flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-primary/20 text-primary text-[8px] font-bold">
              ⬆
            </span>
            Click quest markers to view details
          </p>
        </div>
      </div>
    </>
  );
};

export default FantasyMapHUD;
