import { useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { getSeasonalInfo } from "@/data/seasonalData";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Star, Plus, Check, Leaf, Sun, CloudLightning, Snowflake, Calendar, Users, Trophy } from "lucide-react";

const SeasonIcon = ({ icon }: { icon: string }) => {
  const props = { className: "w-3 h-3" };
  switch (icon) {
    case "leaf": return <Leaf {...props} />;
    case "sun": return <Sun {...props} />;
    case "cloud-lightning": return <CloudLightning {...props} />;
    case "snowflake": return <Snowflake {...props} />;
    case "calendar": return <Calendar {...props} />;
    default: return <Clock {...props} />;
  }
};

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
  isConquered?: boolean;
  onToggleConquered?: () => void;
  index: number;
  isFeatured?: boolean;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Moderate", cssVar: "--danger-low" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Hard", cssVar: "--danger-medium" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "Extreme", cssVar: "--danger-high" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Legendary", cssVar: "--danger-extreme" };
  }
};

const getBookingCount = (id: string): number => {
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return 8 + (hash % 45);
};

const MissionCard = ({ mission, onClick, onAddToItinerary, isInItinerary, isConquered, onToggleConquered, index, isFeatured }: MissionCardProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const seasonal = getSeasonalInfo(mission.id);
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const bookings = getBookingCount(mission.id);

  const handleAddClick = (e: React.MouseEvent) => { e.stopPropagation(); onAddToItinerary?.(); };
  const handleConquerClick = (e: React.MouseEvent) => { e.stopPropagation(); onToggleConquered?.(); };

  return (
    <div
      className={cn(
        "animate-fade-in-up group relative overflow-hidden rounded-xl bg-card border border-border/30 cursor-pointer transition-all duration-500",
        "hover:border-primary/30 hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.15)] hover:translate-y-[-4px]",
        isConquered && "ring-2 ring-primary/40",
        isFeatured && "md:col-span-2 md:row-span-1"
      )}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${mission.name} — ${dangerConfig.label} difficulty, ${mission.priceEstimate}`}
    >
      {/* Left danger strip */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] z-20"
        style={{ background: `hsl(var(${dangerConfig.cssVar}))` }} aria-hidden="true" />

      <div className={cn("relative overflow-hidden", isFeatured ? "aspect-[16/9]" : "aspect-[4/3]")}>
        {!imgLoaded && <div className="absolute inset-0 animate-shimmer bg-muted/20" aria-hidden="true" />}
        <img src={imageUrl} alt={mission.name} onLoad={() => setImgLoaded(true)}
          className={cn("absolute inset-0 w-full h-full object-cover transition-all duration-700",
            imgLoaded ? "opacity-100" : "opacity-0", isHovered && "scale-[1.08]",
            isConquered && "brightness-110"
          )} />
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
            {seasonal && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-accent/80 text-accent-foreground">
                <SeasonIcon icon={seasonal.seasonIcon} />
                {seasonal.seasonBadge}
              </span>
            )}
            {isConquered && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">
                <Trophy className="w-3 h-3" /> Conquered
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onToggleConquered && (
              <button onClick={handleConquerClick} aria-label={isConquered ? "Unmark conquered" : "Mark conquered"}
                className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-all border backdrop-blur-sm active:scale-90",
                  isConquered ? "bg-primary text-primary-foreground border-primary" : "bg-background/30 text-foreground/60 border-border/20 hover:bg-primary/20 hover:text-primary hover:border-primary/40"
                )}>
                <Trophy className="w-4 h-4" />
              </button>
            )}
            {onAddToItinerary && (
              <button onClick={handleAddClick} aria-label={isInItinerary ? "Remove from itinerary" : "Add to itinerary"}
                className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-all border backdrop-blur-sm active:scale-90",
                  isInItinerary ? "bg-primary text-primary-foreground border-primary" : "bg-background/30 text-foreground/60 border-border/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                )}>
                {isInItinerary ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Distance gauge */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/20">
            <div className="w-12 h-1.5 rounded-full bg-muted/30 overflow-hidden" role="meter" aria-valuenow={mission.distanceFromOKC} aria-valuemax={10} aria-label={`${mission.distanceFromOKC} hours drive`}>
              <div className="h-full rounded-full bg-primary/60 transition-all" style={{ width: `${Math.min((mission.distanceFromOKC / 10) * 100, 100)}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{mission.distanceFromOKC}h</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pl-5 space-y-2">
        <div className="flex items-center gap-1.5 text-sm text-foreground/70">
          <MapPin className="w-3.5 h-3.5 text-primary/60" />
          <span>{mission.city}, {mission.state}</span>
        </div>

        <h3 className="font-display text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {mission.name}
        </h3>

        {(mission.isHot || bookings > 30) && (
          <div className="flex items-center gap-1 text-[10px] text-primary/60 font-medium font-sans">
            <Users className="w-3 h-3" />
            <span>Added {bookings}x this month</span>
          </div>
        )}

        {isFeatured && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{mission.description}</p>
        )}

        <div className="flex items-center justify-between pt-2.5 border-t border-border/20">
          <span className="text-base font-bold text-primary">{mission.priceEstimate}</span>
          <div className="flex items-center gap-1 text-sm text-foreground/60">
            <Clock className="w-3.5 h-3.5" />
            <span>{mission.duration}</span>
          </div>
          <div className="flex items-center gap-0.5" aria-label={`Rating: ${mission.broRating} out of 5`}>
            {Array.from({ length: mission.broRating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary drop-shadow-[0_0_4px_hsl(var(--gold)/0.4)]" />
            ))}
            {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
              <Star key={`e-${i}`} className="w-3.5 h-3.5 text-muted-foreground/20" />
            ))}
          </div>
        </div>
      </div>

      {isInItinerary && (
        <div className="absolute top-0 right-0" aria-hidden="true">
          <div className="w-0 h-0 border-t-[30px] border-t-primary border-l-[30px] border-l-transparent">
            <Check className="absolute -top-[26px] right-[4px] w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
