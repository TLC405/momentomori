import { Mission, getFeaturedMission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, Flame, Zap } from "lucide-react";

interface FeaturedQuestProps {
  onSelectMission: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  isInItinerary?: boolean;
}

const FeaturedQuest = ({ onSelectMission, onAddToItinerary, isInItinerary }: FeaturedQuestProps) => {
  const mission = getFeaturedMission();
  const imageUrl = getMissionImage(mission.id);

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--tactical-amber)/0.1),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Featured badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-orbitron text-sm font-bold shadow-lg animate-pulse-glow">
          <Zap className="w-4 h-4" />
          <span>FEATURED QUEST</span>
        </div>
        {mission.isNew && (
          <div className="px-3 py-1.5 bg-tactical-green text-black rounded-full text-xs font-bold">
            NEW
          </div>
        )}
      </div>

      <div className="relative grid md:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Image Section */}
        <div 
          className="relative aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => onSelectMission(mission)}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Danger badge */}
          <div className={cn(
            "absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5",
            mission.dangerLevel === "LOW" && "danger-bg-low text-black",
            mission.dangerLevel === "MEDIUM" && "danger-bg-medium text-black",
            mission.dangerLevel === "HIGH" && "danger-bg-high text-black",
            mission.dangerLevel === "EXTREME" && "danger-bg-extreme text-black",
          )}>
            {mission.dangerLevel === "LOW" && "🏕️"}
            {mission.dangerLevel === "MEDIUM" && "⚔️"}
            {mission.dangerLevel === "HIGH" && "🔥"}
            {mission.dangerLevel === "EXTREME" && "💀"}
            {mission.dangerLevel}
          </div>
          
          {/* View Details overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-orbitron font-bold">
              View Details
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-5">
          {/* Codename */}
          <div className="inline-flex">
            <span className="px-3 py-1.5 text-xs font-bold bg-primary/20 text-primary rounded-lg border border-primary/30 tracking-wider">
              {mission.codename}
            </span>
          </div>

          {/* Title */}
          <h3 
            className="font-orbitron text-2xl md:text-3xl font-bold text-foreground leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={() => onSelectMission(mission)}
          >
            {mission.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{mission.city}, {mission.state} • {mission.distanceFromOKC}h from HQ</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {mission.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
              <span className="text-primary font-orbitron font-bold">{mission.priceEstimate}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-foreground">{mission.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-foreground">{mission.groupSize}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: mission.broRating }).map((_, i) => (
                <Flame key={i} className="w-4 h-4 text-primary fill-primary/50" />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={mission.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-orbitron font-bold rounded-xl hover:shadow-[0_0_30px_hsl(var(--tactical-amber)/0.5)] transition-all group"
            >
              <span>BOOK NOW</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary(mission)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all border",
                  isInItinerary 
                    ? "bg-primary/20 text-primary border-primary" 
                    : "bg-muted/50 text-foreground border-border hover:border-primary hover:text-primary"
                )}
              >
                {isInItinerary ? "✓ Added" : "+ Add to Quest"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedQuest;
