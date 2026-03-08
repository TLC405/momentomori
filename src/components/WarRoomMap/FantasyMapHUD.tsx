interface FantasyMapHUDProps {
  missionCount: number;
  hoveredCoords: { lat: number; lng: number } | null;
  selectedRealm?: string;
}

const getDifficultyLevels = () => [
  { level: "easy", color: "hsl(152, 45%, 38%)", label: "Easy" },
  { level: "moderate", color: "hsl(38, 70%, 50%)", label: "Moderate" },
  { level: "challenging", color: "hsl(16, 70%, 45%)", label: "Hard" },
  { level: "extreme", color: "hsl(0, 60%, 45%)", label: "Extreme" },
];

const FantasyMapHUD = ({ missionCount, hoveredCoords, selectedRealm }: FantasyMapHUDProps) => {
  const levels = getDifficultyLevels();
  
  return (
    <>
      {/* TOP LEFT - Title */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-[hsl(40,30%,96%)]/95 backdrop-blur-md border border-[hsl(33,25%,75%)] rounded-lg px-4 py-2.5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(16,55%,42%)] to-[hsl(33,40%,35%)] flex items-center justify-center">
              <span className="text-[hsl(40,35%,95%)] text-sm font-bold font-display">⛰</span>
            </div>
            <div>
              <h2 className="font-display text-xs font-bold text-[hsl(33,35%,22%)] tracking-wide leading-tight uppercase">
                Adventure Map
              </h2>
              <p className="text-[9px] text-[hsl(33,15%,50%)] tracking-wide mt-0.5 font-sans">
                {selectedRealm || "All Regions"} · {missionCount} Experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RIGHT - Coordinates */}
      <div className="absolute top-3 right-3 z-10 hidden md:block">
        <div className="bg-[hsl(40,30%,96%)]/90 backdrop-blur-md border border-[hsl(33,25%,75%)] rounded-lg px-3 py-2 shadow-sm">
          {hoveredCoords ? (
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[8px] text-[hsl(33,15%,50%)] tracking-wider uppercase">Lat</p>
                <p className="font-mono text-xs text-[hsl(33,35%,25%)] font-semibold">
                  {hoveredCoords.lat.toFixed(2)}°N
                </p>
              </div>
              <div className="w-px h-5 bg-[hsl(33,20%,80%)]" />
              <div>
                <p className="text-[8px] text-[hsl(33,15%,50%)] tracking-wider uppercase">Lng</p>
                <p className="font-mono text-xs text-[hsl(33,35%,25%)] font-semibold">
                  {Math.abs(hoveredCoords.lng).toFixed(2)}°W
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-[hsl(33,15%,55%)] italic font-sans">
              Hover to track coordinates
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM LEFT - Legend */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="bg-[hsl(40,30%,96%)]/90 backdrop-blur-md border border-[hsl(33,25%,75%)] rounded-lg px-3 py-2 shadow-sm">
          <p className="text-[8px] text-[hsl(33,15%,50%)] tracking-wider uppercase mb-1.5 font-sans font-medium">Difficulty</p>
          <div className="flex items-center gap-3">
            {levels.map((level) => (
              <div key={level.level} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full border border-white/50" style={{ backgroundColor: level.color }} />
                <span className="text-[9px] text-[hsl(33,20%,40%)] font-medium font-sans">
                  {level.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT - CTA */}
      <div className="absolute bottom-3 right-3 z-10">
        <div className="bg-[hsl(40,30%,96%)]/85 backdrop-blur-md border border-[hsl(33,25%,75%)] rounded-lg px-3 py-2 shadow-sm">
          <p className="text-[10px] text-[hsl(33,15%,50%)] font-sans">
            📍 Click a pin to explore
          </p>
        </div>
      </div>
    </>
  );
};

export default FantasyMapHUD;
