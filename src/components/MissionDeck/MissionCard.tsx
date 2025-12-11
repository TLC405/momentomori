import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  index: number;
}

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "text-tactical-green";
    case "MEDIUM": return "text-yellow-500";
    case "HIGH": return "text-tactical-orange";
    case "EXTREME": return "text-tactical-red";
  }
};

const MissionCard = ({ mission, onClick, index }: MissionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left overflow-hidden transition-all duration-300",
        "border border-primary/20 hover:border-primary/60",
        "bg-gradient-to-br from-card to-background",
        "hover:translate-y-[-2px] hover:shadow-[0_0_30px_hsl(var(--tactical-green)/0.2)]",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="font-mono-tactical text-[10px] text-muted-foreground tracking-wider">
              [ {mission.codename} ]
            </span>
            <h3 className="font-orbitron text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {mission.name}
            </h3>
          </div>
          
          {/* Danger indicator */}
          <div className={cn("flex items-center gap-1", getDangerColor(mission.dangerLevel))}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="font-mono-tactical text-[10px]">
              {mission.dangerLevel}
            </span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-rajdhani text-xs text-muted-foreground">
            {mission.city}, {mission.state}
          </span>
          <span className="font-mono-tactical text-[10px] text-primary">
            {mission.distanceFromOKC}h
          </span>
        </div>
        
        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3">
          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="font-mono-tactical text-[10px] text-muted-foreground">$</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 h-2",
                    i < mission.priceRange ? "bg-primary" : "bg-primary/20"
                  )}
                />
              ))}
            </div>
          </div>
          
          {/* Bro Rating */}
          <div className="flex items-center gap-1">
            <span className="font-mono-tactical text-[10px] text-muted-foreground">BRO</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-[10px]",
                    i < mission.broRating ? "opacity-100" : "opacity-30"
                  )}
                >
                  🔥
                </span>
              ))}
            </div>
          </div>
          
          {/* Group size */}
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="font-mono-tactical text-[10px] text-muted-foreground">
              {mission.groupSize}
            </span>
          </div>
        </div>
        
        {/* Description preview */}
        <p className="font-rajdhani text-xs text-muted-foreground line-clamp-2">
          {mission.description}
        </p>
        
        {/* Price estimate */}
        <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between">
          <span className="font-mono-tactical text-[10px] text-muted-foreground">
            EST. COST
          </span>
          <span className="font-orbitron text-sm text-primary">
            {mission.priceEstimate}
          </span>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/30 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/30 group-hover:border-primary transition-colors" />
      
      {/* Hover reveal line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </button>
  );
};

export default MissionCard;
