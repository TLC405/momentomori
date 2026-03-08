import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
  index: number;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low", icon: "🏕️" };
    case "MEDIUM": return { class: "danger-bg-medium", icon: "⚔️" };
    case "HIGH": return { class: "danger-bg-high", icon: "🔥" };
    case "EXTREME": return { class: "danger-bg-extreme", icon: "💀" };
  }
};

const MissionCard = ({ mission, onClick, onAddToItinerary, isInItinerary, index }: MissionCardProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };
  
  return (
    <div
      className={cn(
        "group relative w-full aspect-[4/5] overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-card via-card to-card/90 border-2 border-border/40",
        "transition-all duration-500 ease-out cursor-pointer",
        "hover:border-primary/60 hover:scale-[1.02]",
        "hover:shadow-[0_30px_80px_-20px_hsl(var(--tactical-amber)/0.4)]",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
        <div className="flex items-center gap-1.5">
          {/* Danger Level */}
          <div className={cn(
            "px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-black uppercase flex items-center gap-1.5 shadow-lg",
            dangerConfig.class
          )}>
            <span className="text-sm">{dangerConfig.icon}</span>
            {mission.dangerLevel}
          </div>
          
          {/* NEW badge */}
          {mission.isNew && (
            <div className="px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase bg-danger-low text-primary-foreground shadow-lg animate-pulse">
              NEW
            </div>
          )}
          
          {/* HOT badge */}
          {mission.isHot && !mission.isNew && (
            <div className="px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase bg-danger-extreme text-white shadow-lg animate-danger-throb">
              🔥 HOT
            </div>
          )}
        </div>
        
        {/* Add to Itinerary */}
        {onAddToItinerary && (
          <button
            onClick={handleAddClick}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border backdrop-blur-sm",
              isInItinerary 
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--tactical-amber)/0.5)]" 
                : "bg-black/60 text-white/80 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_15px_hsl(var(--tactical-amber)/0.3)]"
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
        {/* Codename badge */}
        <div className="inline-block px-2.5 py-1 mb-2 text-[9px] font-bold bg-primary/30 text-primary rounded-md border border-primary/40 tracking-wider">
          {mission.codename}
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-xs text-white/70">
            {mission.city}, {mission.state}
          </span>
          <span className="text-xs text-primary/80 font-semibold ml-auto">
            {mission.distanceFromOKC}h
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-orbitron text-base sm:text-lg font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {mission.name}
        </h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-3 text-xs pt-3 border-t border-white/10">
          <span className="text-primary font-bold text-sm">{mission.priceEstimate}</span>
          <div className="flex items-center gap-1 text-white/50">
            <Clock className="w-3 h-3" />
            <span>{mission.duration}</span>
          </div>
          <div className="flex items-center gap-0.5 ml-auto">
            {Array.from({ length: mission.broRating }).map((_, i) => (
              <span key={i} className="text-xs">🔥</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_hsl(var(--tactical-amber)/0.1)]" />
      
      {/* Itinerary Flag */}
      {isInItinerary && (
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[45px] border-l-primary border-b-[45px] border-b-transparent shadow-lg">
          <span className="absolute -left-[38px] top-[10px] text-primary-foreground text-[10px] font-bold rotate-[-45deg]">
            ✓
          </span>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
