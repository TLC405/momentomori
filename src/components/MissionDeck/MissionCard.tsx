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
  isFeatured?: boolean;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Easy", cssVar: "--danger-low" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Moderate", cssVar: "--danger-medium" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "Intense", cssVar: "--danger-high" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Extreme", cssVar: "--danger-extreme" };
  }
};

const MissionCard = ({ mission, onClick, onAddToItinerary, isInItinerary, index, isFeatured }: MissionCardProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };

  // Distance gauge (0-10h mapped to percentage)
  const distPercent = Math.min((mission.distanceFromOKC / 10) * 100, 100);

  return (
    <div
      className={cn(
        "animate-fade-in-up group relative overflow-hidden rounded-xl bg-card border border-border/30 cursor-pointer transition-all duration-500",
        "hover:border-primary/40 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.25)] hover:translate-y-[-4px]",
        isFeatured && "md:col-span-2 md:row-span-1"
      )}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left danger strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[4px] z-20"
        style={{ background: `hsl(var(${dangerConfig.cssVar}))` }}
      />

      <div className={cn("relative overflow-hidden", isFeatured ? "aspect-[16/9]" : "aspect-[4/3]")}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundColor: 'hsl(var(--muted))',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 left-5 right-3 flex items-start justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", dangerConfig.class)}>
              {dangerConfig.label}
            </span>
            {mission.isNew && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-earth-forest text-white">New</span>
            )}
          </div>

          {onAddToItinerary && (
            <button
              onClick={handleAddClick}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg transition-all border backdrop-blur-sm",
                isInItinerary
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/40 text-foreground/80 border-border/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              )}
            >
              {isInItinerary ? "✓" : "+"}
            </button>
          )}
        </div>

        {/* Distance gauge — bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center gap-1.5 bg-background/60 backdrop-blur-sm rounded-full px-2 py-1 border border-border/20">
            <div className="w-12 h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <div className="h-full rounded-full bg-primary/70 transition-all" style={{ width: `${distPercent}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{mission.distanceFromOKC}h</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pl-5 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 text-primary/60" />
          <span>{mission.city}, {mission.state}</span>
        </div>

        <h3 className="font-display text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {mission.name}
        </h3>

        {isFeatured && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{mission.description}</p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/20">
          <span className="text-sm font-semibold text-primary" style={{ textShadow: '0 0 12px hsl(var(--primary) / 0.3)' }}>
            {mission.priceEstimate}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{mission.duration}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: mission.broRating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 text-primary fill-primary" />
            ))}
            {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
              <Star key={`e-${i}`} className="w-3 h-3 text-muted-foreground/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Saved flag */}
      {isInItinerary && (
        <div className="absolute top-0 right-0">
          <div className="w-0 h-0 border-t-[30px] border-t-primary border-l-[30px] border-l-transparent">
            <span className="absolute -top-[24px] right-[5px] text-primary-foreground text-[10px] font-bold">✓</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionCard;