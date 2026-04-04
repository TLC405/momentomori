import { useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Star, Plus, Check } from "lucide-react";

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
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToItinerary?.();
  };

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
        {/* Shimmer skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-shimmer bg-muted/40" />
        )}
        <img
          src={imageUrl}
          alt={mission.name}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700",
            imgLoaded ? "opacity-100" : "opacity-0",
            isHovered && "scale-[1.08]"
          )}
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
                "w-8 h-8 flex items-center justify-center rounded-lg transition-all border backdrop-blur-sm active:scale-90",
                isInItinerary
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/40 text-foreground/80 border-border/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              )}
            >
              {isInItinerary ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Distance gauge */}
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
              <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" />
            ))}
            {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
              <Star key={`e-${i}`} className="w-3.5 h-3.5 text-muted-foreground/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Saved flag */}
      {isInItinerary && (
        <div className="absolute top-0 right-0">
          <div className="w-0 h-0 border-t-[30px] border-t-primary border-l-[30px] border-l-transparent">
            <Check className="absolute -top-[26px] right-[4px] w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
