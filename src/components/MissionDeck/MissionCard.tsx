import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
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

const MissionCard = ({ mission, onClick, onAddToItinerary, isInItinerary, index }: MissionCardProps) => {
  const imageUrl = getMissionImage(mission.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };
  
  return (
    <div
      className={cn(
        "group relative w-full aspect-[4/5] overflow-hidden rounded-xl",
        "bg-card border border-border/30",
        "transition-all duration-500 ease-out",
        "hover:border-primary/50 hover:scale-[1.02]",
        "hover:shadow-[0_20px_60px_-15px_hsl(var(--tactical-amber)/0.4)]",
        "animate-fade-in-up cursor-pointer"
      )}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: 'hsl(var(--muted))'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
        {/* Danger Level */}
        <div className={cn(
          "px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider text-black uppercase",
          getDangerClass(mission.dangerLevel)
        )}>
          {mission.dangerLevel}
        </div>
        
        {/* Add to Itinerary */}
        {onAddToItinerary && (
          <button
            onClick={handleAddClick}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-all",
              isInItinerary 
                ? "bg-primary text-primary-foreground" 
                : "bg-black/50 text-white/70 hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {isInItinerary ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            )}
          </button>
        )}
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-xs text-white/70">
            {mission.city}, {mission.state}
          </span>
          <span className="text-xs text-primary font-medium ml-auto">
            {mission.distanceFromOKC}h
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-orbitron text-base sm:text-lg font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {mission.name}
        </h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-3 text-xs">
          {/* Price */}
          <span className="text-primary font-semibold">{mission.priceEstimate}</span>
          
          {/* Group Size */}
          <div className="flex items-center gap-1 text-white/60">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span>{mission.groupSize}</span>
          </div>
          
          {/* Bro Rating */}
          <div className="flex items-center gap-0.5 ml-auto">
            {Array.from({ length: mission.broRating }).map((_, i) => (
              <span key={i} className="text-[10px]">🔥</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-300 pointer-events-none" />
      
      {/* Itinerary Indicator */}
      {isInItinerary && (
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-primary border-b-[40px] border-b-transparent" />
      )}
    </div>
  );
};

export default MissionCard;
