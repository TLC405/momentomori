import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MissionDetailProps {
  mission: Mission;
  onClose: () => void;
}

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "text-tactical-green bg-tactical-green/10";
    case "MEDIUM": return "text-yellow-500 bg-yellow-500/10";
    case "HIGH": return "text-tactical-orange bg-tactical-orange/10";
    case "EXTREME": return "text-tactical-red bg-tactical-red/10";
  }
};

const MissionDetail = ({ mission, onClose }: MissionDetailProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-primary/30 bg-gradient-to-br from-card to-background animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
        >
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="p-6 border-b border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
                  MISSION BRIEFING
                </span>
                <div className={cn(
                  "px-2 py-0.5 font-mono-tactical text-[10px] tracking-wider",
                  getDangerColor(mission.dangerLevel)
                )}>
                  {mission.dangerLevel} THREAT
                </div>
              </div>
              <span className="font-mono-tactical text-sm text-primary tracking-wider">
                [ {mission.codename} ]
              </span>
              <h2 className="font-orbitron text-2xl font-bold text-foreground mt-1">
                {mission.name}
              </h2>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border border-primary/20 bg-primary/5">
              <span className="font-mono-tactical text-[10px] text-muted-foreground">LOCATION</span>
              <p className="font-rajdhani text-sm text-foreground mt-1">{mission.city}, {mission.state}</p>
            </div>
            <div className="p-3 border border-primary/20 bg-primary/5">
              <span className="font-mono-tactical text-[10px] text-muted-foreground">DISTANCE</span>
              <p className="font-rajdhani text-sm text-foreground mt-1">{mission.distanceFromOKC}h from OKC</p>
            </div>
            <div className="p-3 border border-primary/20 bg-primary/5">
              <span className="font-mono-tactical text-[10px] text-muted-foreground">DURATION</span>
              <p className="font-rajdhani text-sm text-foreground mt-1">{mission.duration}</p>
            </div>
            <div className="p-3 border border-primary/20 bg-primary/5">
              <span className="font-mono-tactical text-[10px] text-muted-foreground">SQUAD SIZE</span>
              <p className="font-rajdhani text-sm text-foreground mt-1">{mission.groupSize} bros</p>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-primary mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-primary" />
              MISSION INTEL
            </h3>
            <p className="font-rajdhani text-sm text-muted-foreground leading-relaxed">
              {mission.description}
            </p>
          </div>
          
          {/* Bro Code Analysis */}
          <div className="p-4 border border-tactical-orange/30 bg-tactical-orange/5">
            <h3 className="font-orbitron text-sm font-bold text-tactical-orange mb-2 flex items-center gap-2">
              <span>🔥</span>
              BRO CODE ANALYSIS
            </h3>
            <p className="font-rajdhani text-sm text-foreground/80 leading-relaxed italic">
              "{mission.broCodeAnalysis}"
            </p>
          </div>
          
          {/* Rating bars */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tactical text-xs text-muted-foreground">COST FACTOR</span>
                <span className="font-orbitron text-sm text-primary">{mission.priceEstimate}</span>
              </div>
              <div className="h-2 bg-primary/10 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-full transition-all",
                      i < mission.priceRange ? "bg-primary" : "bg-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tactical text-xs text-muted-foreground">BRO RATING</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn("text-sm", i < mission.broRating ? "opacity-100" : "opacity-30")}>
                      🔥
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-2 bg-tactical-orange/10 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-full transition-all",
                      i < mission.broRating ? "bg-tactical-orange" : "bg-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 font-mono-tactical text-[10px] text-muted-foreground border border-primary/20 hover:border-primary/50 transition-colors"
              >
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
          
          {/* Action button */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-primary text-primary-foreground font-orbitron text-center text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            INITIATE BOOKING SEQUENCE →
          </a>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary" />
      </div>
    </div>
  );
};

export default MissionDetail;
