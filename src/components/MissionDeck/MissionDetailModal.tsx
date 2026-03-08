import { useEffect, useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, DollarSign, X, Star, AlertTriangle } from "lucide-react";

interface MissionDetailModalProps {
  mission: Mission;
  onClose: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Easy Going" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Moderate Challenge" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "High Intensity" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Extreme Danger" };
  }
};

const MissionDetailModal = ({ mission, onClose, onAddToItinerary, isInItinerary }: MissionDetailModalProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className={cn("absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      
      <div 
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-2xl shadow-2xl transition-all duration-500",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        }}
      >
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundColor: 'hsl(var(--muted))' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all btn-3d"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute top-4 left-4">
            <span className={cn("px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2", dangerConfig.class)}>
              {dangerConfig.label}
            </span>
          </div>
          
          {onAddToItinerary && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToItinerary(); }}
              className={cn(
                "absolute top-4 right-16 px-4 py-2 rounded-lg text-sm font-medium transition-all border backdrop-blur-sm btn-3d",
                isInItinerary 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-black/40 text-white border-white/20 hover:bg-primary hover:text-primary-foreground"
              )}
            >
              {isInItinerary ? "✓ Saved" : "+ Save"}
            </button>
          )}
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">{mission.codename}</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mt-1">{mission.name}</h2>
            <div className="flex items-center gap-2 text-white/70 mt-2">
              <MapPin className="w-4 h-4 text-primary/80" />
              <span className="text-sm">{mission.location} · {mission.city}, {mission.state}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: "Investment", value: mission.priceEstimate },
              { icon: Clock, label: "Duration", value: mission.duration },
              { icon: Users, label: "Group Size", value: mission.groupSize },
              { icon: MapPin, label: "Distance", value: `${mission.distanceFromOKC}h` },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-muted/30 border border-border/30 rounded-xl p-4 text-center group hover:border-primary/30 transition-all animate-count-pop" style={{ animationDelay: `${200 + i * 80}ms` }}>
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-2" />
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className="font-semibold text-foreground text-sm">{stat.value}</div>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="bg-muted/20 border border-border/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 font-display">
              <AlertTriangle className="w-4 h-4 text-primary" />
              About This Adventure
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
          </div>
          
          {/* Rating */}
          <div className="relative bg-primary/8 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex">
                {Array.from({ length: mission.broRating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary/60" />
                ))}
                {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-muted-foreground/20" />
                ))}
              </div>
              <span className="text-sm font-bold text-primary">{mission.broRating}/5</span>
            </div>
            <p className="text-sm text-muted-foreground italic">"{mission.broCodeAnalysis}"</p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag, i) => (
              <span key={tag} className="cascade-item px-3 py-1.5 text-xs bg-muted/40 text-muted-foreground rounded-full border border-border/30 hover:border-primary/40 hover:text-primary transition-all" style={{ animationDelay: `${400 + i * 50}ms` }}>
                {tag}
              </span>
            ))}
          </div>
          
          {/* CTA */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:brightness-110 transition-all btn-3d"
          >
            Book This Adventure
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="text-center text-xs text-muted-foreground">Opens official booking site</p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailModal;
