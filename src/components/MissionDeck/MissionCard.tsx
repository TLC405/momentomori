import { useState, useRef, useCallback } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Star } from "lucide-react";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
  index: number;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Easy" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Moderate" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "Intense" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Extreme" };
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
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    setMousePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };
  
  return (
    <div
      className="card-3d animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <div
        ref={cardRef}
        className={cn(
          "card-3d-inner group relative w-full overflow-hidden rounded-xl",
          "bg-card border border-border/40",
          "cursor-pointer transition-shadow duration-500",
          isHovered && "shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.3)]"
        )}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))',
              transform: isHovered
                ? `scale(1.08) translate(${(mousePos.x - 50) * -0.05}%, ${(mousePos.y - 50) * -0.05}%)`
                : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          
          {/* Holographic shine */}
          <div 
            className="holographic-shine rounded-xl"
            style={{ opacity: isHovered ? 1 : 0, backgroundPosition: `${mousePos.x}% ${mousePos.y}%` }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", dangerConfig.class)}>
                {dangerConfig.label}
              </span>
              {mission.isNew && (
                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-earth-forest text-white">New</span>
              )}
            </div>
            
            {onAddToItinerary && (
              <button
                onClick={handleAddClick}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg transition-all border backdrop-blur-sm btn-3d",
                  isInItinerary 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-black/40 text-white/80 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                )}
              >
                {isInItinerary ? "✓" : "+"}
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary/70" />
            <span>{mission.city}, {mission.state}</span>
            <span className="ml-auto text-primary/60 font-medium">{mission.distanceFromOKC}h</span>
          </div>
          
          <h3 className="font-display text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {mission.name}
          </h3>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-sm font-semibold text-primary">{mission.priceEstimate}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{mission.duration}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: mission.broRating }).map((_, i) => (
                <Star key={i} className="w-3 h-3 text-primary fill-primary/50" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Saved flag */}
        {isInItinerary && (
          <div className="absolute top-0 right-0">
            <div className="w-0 h-0 border-t-[35px] border-t-primary border-l-[35px] border-l-transparent">
              <span className="absolute -top-[28px] right-[6px] text-primary-foreground text-[10px] font-bold">✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionCard;
