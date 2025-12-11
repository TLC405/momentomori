import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  index: number;
}

const getDangerClass = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "danger-bg-low";
    case "MEDIUM": return "danger-bg-medium";
    case "HIGH": return "danger-bg-high";
    case "EXTREME": return "danger-bg-extreme";
  }
};

const MissionCard = ({ mission, onClick, index }: MissionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full aspect-[4/5] overflow-hidden rounded-lg",
        "bg-card border border-border/50",
        "transition-all duration-500 ease-out",
        "hover:border-primary/50 hover:scale-[1.02]",
        "hover:shadow-[0_20px_60px_-15px_hsl(var(--tactical-amber)/0.4)]",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${mission.imageUrl})`,
          backgroundColor: 'hsl(var(--muted))'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 image-overlay" />
      
      {/* Top Badge - Danger Level */}
      <div className="absolute top-3 right-3 z-10">
        <div className={cn(
          "px-2 py-1 rounded text-[10px] font-bold tracking-wider text-black",
          getDangerClass(mission.dangerLevel)
        )}>
          {mission.dangerLevel}
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-xs text-muted-foreground">
            {mission.city}, {mission.state}
          </span>
          <span className="text-xs text-primary font-medium ml-auto">
            {mission.distanceFromOKC}h
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-orbitron text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
          {mission.name}
        </h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-3 text-xs">
          {/* Price */}
          <span className="text-primary font-semibold">{mission.priceEstimate}</span>
          
          {/* Group Size */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span>{mission.groupSize}</span>
          </div>
          
          {/* Bro Rating */}
          <div className="flex items-center gap-0.5 ml-auto">
            {Array.from({ length: mission.broRating }).map((_, i) => (
              <span key={i} className="text-xs">🔥</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
    </button>
  );
};

export default MissionCard;