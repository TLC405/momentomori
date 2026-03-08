import { useState, useRef, useCallback } from "react";
import { Mission, getFeaturedMission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, Star } from "lucide-react";

interface FeaturedQuestProps {
  onSelectMission: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  isInItinerary?: boolean;
}

const FeaturedQuest = ({ onSelectMission, onAddToItinerary, isInItinerary }: FeaturedQuestProps) => {
  const mission = getFeaturedMission();
  const imageUrl = getMissionImage(mission.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
      <div
        ref={containerRef}
        className="relative grid md:grid-cols-[1.2fr_1fr] min-h-[380px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hero Image — editorial full-bleed */}
        <div 
          className="relative aspect-[16/10] md:aspect-auto overflow-hidden cursor-pointer group"
          onClick={() => onSelectMission(mission)}
        >
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s]",
              isHovered ? "scale-110" : "scale-100"
            )}
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
          
          {/* Featured pill */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              Featured
            </div>
          </div>

          {/* Danger badge */}
          <div className={cn(
            "absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5",
            mission.dangerLevel === "LOW" && "danger-bg-low text-black",
            mission.dangerLevel === "MEDIUM" && "danger-bg-medium text-black",
            mission.dangerLevel === "HIGH" && "danger-bg-high text-black",
            mission.dangerLevel === "EXTREME" && "danger-bg-extreme text-white",
          )}>
            {mission.dangerLevel}
          </div>
        </div>

        {/* Editorial Content */}
        <div className="flex flex-col justify-center p-6 md:p-8 space-y-5">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            {mission.codename}
          </span>

          <h3 
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={() => onSelectMission(mission)}
          >
            {mission.name}
          </h3>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span className="text-sm">{mission.city}, {mission.state} · {mission.distanceFromOKC}h from base</span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {mission.description}
          </p>

          {/* Clean stats */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pt-1">
            <span className="font-semibold text-foreground">{mission.priceEstimate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{mission.duration}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{mission.groupSize}</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: mission.broRating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary/60" />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={mission.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:brightness-110 transition-all btn-3d"
            >
              Book This Adventure
              <ExternalLink className="w-4 h-4" />
            </a>
            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary(mission)}
                className={cn(
                  "px-5 py-3 rounded-xl font-medium transition-all border btn-3d",
                  isInItinerary 
                    ? "bg-primary/15 text-primary border-primary/30" 
                    : "text-foreground border-border hover:border-primary/50 hover:text-primary"
                )}
              >
                {isInItinerary ? "✓ Saved" : "+ Save Trip"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedQuest;
