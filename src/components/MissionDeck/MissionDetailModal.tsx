import { useEffect, useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, DollarSign, X, Star, AlertTriangle, Plus, Check, Bookmark } from "lucide-react";

interface MissionDetailModalProps {
  mission: Mission;
  onClose: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Easy Going", cssVar: "--danger-low" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Moderate Challenge", cssVar: "--danger-medium" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "High Intensity", cssVar: "--danger-high" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Extreme Danger", cssVar: "--danger-extreme" };
  }
};

const MissionDetailModal = ({ mission, onClose, onAddToItinerary, isInItinerary }: MissionDetailModalProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div
        className={cn("absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />

      <div
        className={cn(
          "relative w-full sm:max-w-3xl sm:max-h-[90vh] max-h-[95vh] overflow-y-auto bg-card border-t sm:border border-border/30 sm:rounded-2xl shadow-[0_-10px_60px_hsl(0_0%_0%/0.5)] transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-[400px] overflow-hidden sm:rounded-t-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundColor: 'hsl(var(--muted))' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 100px 30px hsl(var(--background) / 0.3)' }} />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4">
            <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider", dangerConfig.class)}>
              {dangerConfig.label}
            </span>
          </div>

          {onAddToItinerary && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToItinerary(); }}
              className={cn(
                "absolute top-4 right-16 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border backdrop-blur-sm active:scale-95",
                isInItinerary
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/40 text-foreground border-border/30 hover:bg-primary hover:text-primary-foreground"
              )}
            >
              {isInItinerary ? <><Bookmark className="w-4 h-4 fill-current" /> Saved</> : <><Plus className="w-4 h-4" /> Save</>}
            </button>
          )}

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">{mission.codename}</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-1">{mission.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4 text-primary/70" />
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
              <div
                key={stat.label}
                className="relative bg-muted/20 border border-border/20 rounded-xl p-4 text-center overflow-hidden animate-count-pop"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full" style={{ background: `hsl(var(${dangerConfig.cssVar}))` }} />
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-2" />
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className="font-semibold text-foreground text-sm">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="parchment-bg border border-border/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 font-display">
              <AlertTriangle className="w-4 h-4 text-primary" />
              About This Adventure
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
          </div>

          {/* Rating — premium gradient stars */}
          <div className="bg-primary/[0.06] border border-primary/15 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: mission.broRating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] animate-star-pop" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
                {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
                  <Star key={`e-${i}`} className="w-5 h-5 text-muted-foreground/20 animate-star-pop" style={{ animationDelay: `${(mission.broRating + i) * 100}ms` }} />
                ))}
              </div>
              <span className="stat-value text-sm font-bold">{mission.broRating}/5</span>
            </div>
            <p className="text-sm text-muted-foreground italic">"{mission.broCodeAnalysis}"</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag, i) => (
              <span key={tag} className="px-3 py-1.5 text-xs bg-muted/30 text-muted-foreground rounded-full border border-border/20 hover:border-primary/40 hover:text-primary transition-all cascade-item" style={{ animationDelay: `${400 + i * 50}ms` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ripple-btn group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg rounded-xl hover:brightness-110 transition-all shadow-[0_4px_20px_hsl(var(--primary)/0.3)]"
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
