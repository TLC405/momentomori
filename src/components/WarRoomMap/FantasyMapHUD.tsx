interface FantasyMapHUDProps {
  missionCount: number;
  hoveredCoords: { lat: number; lng: number } | null;
  selectedRealm?: string;
}

const getThreatLabels = () => [
  { level: "low", color: "hsl(142 76% 42%)", label: "LOW" },
  { level: "medium", color: "hsl(48 100% 50%)", label: "MED" },
  { level: "high", color: "hsl(25 100% 50%)", label: "HIGH" },
  { level: "extreme", color: "hsl(0 80% 50%)", label: "MAX" },
];

const FantasyMapHUD = ({ missionCount, hoveredCoords, selectedRealm }: FantasyMapHUDProps) => {
  const threats = getThreatLabels();
  
  return (
    <>
      {/* TOP LEFT - Compact Title Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg px-4 py-2.5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-danger-extreme/20 flex items-center justify-center border border-primary/40">
              <span className="text-lg">💀</span>
            </div>
            <div>
              <h2 className="font-orbitron text-xs font-bold text-primary tracking-wider leading-tight">
                REMEMBER YOU
                <span className="text-danger-extreme ml-1">MUST DIE</span>
              </h2>
              <p className="text-[9px] text-muted-foreground tracking-wider mt-0.5">
                {selectedRealm || "All Territories"} • {missionCount} Quests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RIGHT - Coordinates (hidden on mobile) */}
      <div className="absolute top-3 right-3 z-10 hidden md:block">
        <div className="bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
          {hoveredCoords ? (
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[8px] text-muted-foreground tracking-wider">LAT</p>
                <p className="font-orbitron text-xs text-primary font-bold">
                  {hoveredCoords.lat.toFixed(2)}°N
                </p>
              </div>
              <div className="w-px h-6 bg-border/50" />
              <div>
                <p className="text-[8px] text-muted-foreground tracking-wider">LNG</p>
                <p className="font-orbitron text-xs text-primary font-bold">
                  {Math.abs(hoveredCoords.lng).toFixed(2)}°W
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-muted-foreground italic">
              Hover to track position
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM LEFT - Compact Legend */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            {threats.map((threat) => (
              <div key={threat.level} className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: threat.color }}
                />
                <span className="text-[9px] text-muted-foreground font-medium">
                  {threat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT - Action hint */}
      <div className="absolute bottom-3 right-3 z-10">
        <div className="bg-card/85 backdrop-blur-md border border-primary/15 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-[10px] text-muted-foreground">
            👆 Click markers to explore
          </p>
        </div>
      </div>
    </>
  );
};

export default FantasyMapHUD;