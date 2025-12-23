interface FantasyMapHUDProps {
  missionCount: number;
  hoveredCoords: { lat: number; lng: number } | null;
  selectedRealm?: string;
}

// Major Payne drill sergeant realm quotes
const getRealmQuote = (realm?: string): string => {
  if (!realm) return "FALL IN, MAGGOTS! Pick a territory or I'll pick one FOR ya!";
  
  const quotes: Record<string, string> = {
    "Armory": "Time to make some NOISE! If it ain't loud, it ain't RIGHT!",
    "Adrenaline Junkies": "You think you're tough? We'll see about THAT!",
    "Nature & Survival": "Mother Nature don't care about your FEELINGS!",
    "Velocity Demons": "Speed is LIFE! Slow is DEATH! Which one are YOU?!",
    "Tactical Ops": "Think FAST or think DEAD! Your choice, recruit!",
    "Storm Lords": "When the thunder ROARS, real warriors CHARGE!",
    "default": "What are you WAITING for?! Adventure ain't gonna FIND ITSELF!"
  };
  
  return quotes[realm] || quotes.default;
};

const getThreatLabels = () => [
  { level: "low", color: "hsl(142 76% 42%)", glow: "hsl(142 76% 55%)", label: "MILK RUN", desc: "Your grandma's bridge club could handle this" },
  { level: "medium", color: "hsl(48 100% 50%)", glow: "hsl(48 100% 65%)", label: "WARM UP", desc: "Now we're gettin' somewhere!" },
  { level: "high", color: "hsl(25 100% 50%)", glow: "hsl(25 100% 60%)", label: "HURT LOCKER", desc: "Pain is weakness LEAVING the body!" },
  { level: "extreme", color: "hsl(0 80% 50%)", glow: "hsl(0 80% 65%)", label: "KILLIN' TIME", desc: "Only legends survive this!" },
];

const FantasyMapHUD = ({ missionCount, hoveredCoords, selectedRealm }: FantasyMapHUDProps) => {
  const quote = getRealmQuote(selectedRealm);
  const threats = getThreatLabels();
  
  return (
    <>
      {/* TOP LEFT - Royal Command Banner */}
      <div className="absolute top-4 left-4 z-10">
        <div className="relative group">
          {/* Decorative outer frames */}
          <div className="absolute -inset-3 border border-primary/10 rounded-xl" />
          <div className="absolute -inset-2 border border-primary/20 rounded-lg" />
          
          {/* Corner ornaments */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary/50 rounded-tl" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary/50 rounded-tr" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary/50 rounded-bl" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary/50 rounded-br" />
          
          <div className="bg-gradient-to-br from-card/98 via-card/95 to-card/90 backdrop-blur-md border-2 border-primary/40 rounded-lg p-5 shadow-[0_0_40px_hsl(var(--tactical-amber)/0.25),inset_0_1px_0_hsl(var(--tactical-amber)/0.1)]">
            {/* Title section */}
            <div className="flex items-center gap-4">
              {/* Decorative emblem */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/40 shadow-[0_0_20px_hsl(var(--tactical-amber)/0.3)]">
                  <span className="text-2xl">⚔️</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-danger-extreme flex items-center justify-center border border-danger-extreme shadow-[0_0_10px_hsl(var(--danger-extreme)/0.5)]">
                  <span className="text-[10px] font-bold text-foreground">{missionCount}</span>
                </div>
              </div>
              
              <div>
                {/* Main title with shimmer */}
                <div className="relative">
                  <h2 className="font-orbitron text-xl font-black text-primary tracking-wider">
                    WAR ROOM
                  </h2>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
                </div>
                
                {/* Subtitle */}
                <p className="text-xs text-primary/80 font-orbitron tracking-[0.2em] mt-0.5">
                  TACTICAL COMMAND CENTER
                </p>
                
                {/* Realm indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
                    {selectedRealm || "All Territories"} • Active
                  </p>
                </div>
              </div>
            </div>
            
            {/* Drill Sergeant Quote Banner */}
            <div className="mt-4 pt-3 border-t border-primary/20">
              <div className="flex items-start gap-2">
                <span className="text-lg">🎖️</span>
                <p className="text-[11px] text-primary/90 font-medium italic leading-relaxed">
                  "{quote}"
                </p>
              </div>
              <p className="text-[8px] text-muted-foreground mt-1 text-right tracking-widest">
                — SGT. PAYNE, COMMANDING
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RIGHT - Astrolabe Coordinate Display */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          {/* Outer ring decoration */}
          <div className="absolute -inset-2 rounded-full border border-primary/15" />
          
          <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-xl p-4 shadow-[0_0_30px_hsl(var(--tactical-amber)/0.15)]">
            {/* Compass/astrolabe header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/40" style={{ animation: "compass-spin 20s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-primary rounded-full" />
                </div>
                {/* Inner compass */}
                <div className="absolute inset-1 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-sm">🧭</span>
                </div>
              </div>
              <div>
                <p className="font-orbitron text-[10px] text-primary/70 tracking-[0.3em] uppercase">
                  Position Lock
                </p>
                <p className="text-[8px] text-muted-foreground tracking-wider">
                  TACTICAL GPS ONLINE
                </p>
              </div>
            </div>
            
            {/* Coordinate display */}
            <div className="bg-background/50 rounded-lg p-3 border border-border/50">
              {hoveredCoords ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] text-muted-foreground tracking-wider mb-1">LATITUDE</p>
                    <p className="font-orbitron text-sm text-primary font-bold">
                      {hoveredCoords.lat.toFixed(4)}°
                      <span className="text-primary/60 text-xs ml-1">N</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-foreground tracking-wider mb-1">LONGITUDE</p>
                    <p className="font-orbitron text-sm text-primary font-bold">
                      {Math.abs(hoveredCoords.lng).toFixed(4)}°
                      <span className="text-primary/60 text-xs ml-1">W</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-[10px] text-muted-foreground italic">
                    Move cursor to track position
                  </p>
                  <p className="font-orbitron text-xs text-primary/50 mt-1">
                    35.4676°N • 97.5164°W
                  </p>
                  <p className="text-[8px] text-muted-foreground mt-0.5">
                    HQ COORDINATES
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT - Shield Threat Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg p-4 shadow-[0_0_25px_hsl(var(--tactical-amber)/0.15)]">
          {/* Header with shield icon */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🛡️</span>
            <div>
              <p className="font-orbitron text-xs text-primary font-bold tracking-wider">
                THREAT ASSESSMENT
              </p>
              <p className="text-[8px] text-muted-foreground tracking-wider">
                KNOW WHAT YOU'RE GETTING INTO, SOLDIER
              </p>
            </div>
          </div>
          
          {/* Threat level shields */}
          <div className="grid grid-cols-2 gap-2">
            {threats.map((threat) => (
              <div 
                key={threat.level}
                className="group relative bg-background/50 rounded-lg p-2 border border-border/50 hover:border-primary/30 transition-all cursor-default"
              >
                <div className="flex items-center gap-2">
                  {/* Danger indicator dot with glow */}
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: threat.color,
                      boxShadow: `0 0 8px ${threat.glow}`
                    }}
                  />
                  <div>
                    <p className="font-orbitron text-[10px] font-bold" style={{ color: threat.color }}>
                      {threat.label}
                    </p>
                    <p className="text-[7px] text-muted-foreground leading-tight hidden group-hover:block">
                      {threat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT - Action Instructions */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-card/90 backdrop-blur-md border border-primary/20 rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-xl">👆</span>
            </div>
            <div>
              <p className="text-xs text-foreground font-medium">
                Click markers to deploy!
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                "Hesitation is the ENEMY!" — Sgt. Payne
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER BOTTOM - Mission Counter */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-card/80 backdrop-blur-md border border-primary/30 rounded-full px-6 py-2 shadow-lg flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-danger-extreme animate-pulse" />
          <p className="font-orbitron text-sm">
            <span className="text-primary font-bold">{missionCount}</span>
            <span className="text-muted-foreground ml-2 text-xs tracking-wider">ACTIVE OPS</span>
          </p>
          <div className="w-2 h-2 rounded-full bg-danger-extreme animate-pulse" />
        </div>
      </div>
    </>
  );
};

export default FantasyMapHUD;
