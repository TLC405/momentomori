import { useState, useRef, useCallback } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -12;
    const tiltY = (x - 0.5) * 12;
    setTilt({ x: tiltX, y: tiltY });
    setMousePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };
  
  return (
    <div
      className="card-3d animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div
        ref={cardRef}
        className={cn(
          "card-3d-inner group relative w-full aspect-[4/5] overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-card via-card to-card/90 border-2 border-border/40",
          "cursor-pointer",
          "hover:border-primary/60",
          isHovered && "shadow-[0_30px_80px_-20px_hsl(var(--tactical-amber)/0.5)]"
        )}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image with parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            backgroundColor: 'hsl(var(--muted))',
            transform: isHovered
              ? `scale(1.12) translate(${(mousePos.x - 50) * -0.08}%, ${(mousePos.y - 50) * -0.08}%)`
              : 'scale(1)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Holographic shine overlay */}
        <div 
          className="holographic-shine"
          style={{ 
            opacity: isHovered ? 1 : 0,
            backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
          }}
        />

        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-black uppercase flex items-center gap-1.5 shadow-lg",
              dangerConfig.class
            )}>
              <span className="text-sm">{dangerConfig.icon}</span>
              {mission.dangerLevel}
            </div>
            
            {mission.isNew && (
              <div className="px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase bg-danger-low text-primary-foreground shadow-lg animate-pulse">
                NEW
              </div>
            )}
            
            {mission.isHot && !mission.isNew && (
              <div className="px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase bg-danger-extreme text-white shadow-lg animate-danger-throb">
                🔥 HOT
              </div>
            )}
          </div>
          
          {onAddToItinerary && (
            <button
              onClick={handleAddClick}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border backdrop-blur-sm btn-3d",
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
        
        {/* Content Overlay with parallax */}
        <div 
          className="absolute inset-x-0 bottom-0 p-4 z-10 transition-transform duration-300"
          style={{
            transform: isHovered
              ? `translate(${(mousePos.x - 50) * 0.04}%, ${(mousePos.y - 50) * 0.04}%)`
              : 'translate(0, 0)',
          }}
        >
          <div className="inline-block px-2.5 py-1 mb-2 text-[9px] font-bold bg-primary/30 text-primary rounded-md border border-primary/40 tracking-wider">
            {mission.codename}
          </div>
          
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="text-xs text-white/70">
              {mission.city}, {mission.state}
            </span>
            <span className="text-xs text-primary/80 font-semibold ml-auto">
              {mission.distanceFromOKC}h
            </span>
          </div>
          
          <h3 className="font-orbitron text-base sm:text-lg font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {mission.name}
          </h3>
          
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
    </div>
  );
};

export default MissionCard;
