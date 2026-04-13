import { useEffect, useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, DollarSign, X, Star, AlertTriangle, Plus, Check, Bookmark, Trophy } from "lucide-react";

interface MissionDetailModalProps {
  mission: Mission;
  onClose: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
  isConquered?: boolean;
  onToggleConquered?: () => void;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Moderate", cssVar: "--danger-low", gradient: "from-[hsl(150,55%,38%)] to-[hsl(150,55%,25%)]" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Hard", cssVar: "--danger-medium", gradient: "from-[hsl(40,90%,50%)] to-[hsl(40,90%,35%)]" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "Extreme", cssVar: "--danger-high", gradient: "from-[hsl(24,95%,50%)] to-[hsl(24,95%,35%)]" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Legendary", cssVar: "--danger-extreme", gradient: "from-[hsl(0,72%,50%)] to-[hsl(0,72%,35%)]" };
  }
};

const MissionDetailModal = ({ mission, onClose, onAddToItinerary, isInItinerary, isConquered, onToggleConquered }: MissionDetailModalProps) => {
  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const [isVisible, setIsVisible] = useState(false);
  const [epicScore] = useState(0);
  const targetScore = mission.broRating * 20;

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Animate epic score bar
  const [animatedScore, setAnimatedScore] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 800, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedScore(Math.round(eased * targetScore));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 400);
    return () => clearTimeout(timer);
  }, [isVisible, targetScore]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className={cn("absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0")}
        onClick={onClose} />

      <div className={cn(
        "relative w-full sm:max-w-3xl sm:max-h-[90vh] max-h-[95vh] overflow-y-auto bg-card border-t sm:border border-border/30 sm:rounded-2xl shadow-[0_-10px_60px_hsl(0_0%_0%/0.6)] transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Hero with color-matched gradient */}
        <div className="relative h-64 sm:h-80 md:h-[400px] overflow-hidden sm:rounded-t-2xl">
          <div className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundColor: 'hsl(var(--muted))' }} />
          <div className={cn("absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent")} />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 100px 30px hsl(var(--background) / 0.4)' }} />

          {/* Color-matched hero gradient strip at top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `hsl(var(${dangerConfig.cssVar}))` }} />

          <button onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider", dangerConfig.class)}>
              {dangerConfig.label}
            </span>
            {isConquered && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Conquered
              </span>
            )}
          </div>

          <div className="absolute top-4 right-16 flex items-center gap-2">
            {onToggleConquered && (
              <button onClick={(e) => { e.stopPropagation(); onToggleConquered(); }}
                className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border backdrop-blur-sm active:scale-95",
                  isConquered ? "bg-primary text-primary-foreground border-primary" : "bg-background/30 text-foreground border-border/30 hover:bg-primary/20 hover:border-primary/40"
                )}>
                <Trophy className="w-4 h-4" /> {isConquered ? "Conquered" : "Mark Done"}
              </button>
            )}
            {onAddToItinerary && (
              <button onClick={(e) => { e.stopPropagation(); onAddToItinerary(); }}
                className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border backdrop-blur-sm active:scale-95",
                  isInItinerary ? "bg-primary text-primary-foreground border-primary" : "bg-background/30 text-foreground border-border/30 hover:bg-primary hover:text-primary-foreground"
                )}>
                {isInItinerary ? <><Bookmark className="w-4 h-4 fill-current" /> Saved</> : <><Plus className="w-4 h-4" /> Save</>}
              </button>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase font-sans">{mission.codename}</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-1">{mission.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4 text-primary/60" />
              <span className="text-sm font-sans">{mission.location} · {mission.city}, {mission.state}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Epic Score Bar */}
          <div className="bg-secondary/30 border border-border/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans">Epic Score</span>
              <span className="stat-value text-sm">{animatedScore}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted/30 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700"
                style={{ width: `${animatedScore}%` }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: "Investment", value: mission.priceEstimate },
              { icon: Clock, label: "Duration", value: mission.duration },
              { icon: Users, label: "Group Size", value: mission.groupSize },
              { icon: MapPin, label: "Distance", value: `${mission.distanceFromOKC}h` },
            ].map((stat, i) => (
              <div key={stat.label}
                className="relative bg-secondary/20 border border-border/20 rounded-xl p-4 text-center overflow-hidden animate-count-pop"
                style={{ animationDelay: `${200 + i * 80}ms` }}>
                <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full" style={{ background: `hsl(var(${dangerConfig.cssVar}))` }} />
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-2" />
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-sans">{stat.label}</div>
                <div className="font-semibold text-foreground text-sm">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="parchment-bg border border-border/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 font-display">
              <AlertTriangle className="w-4 h-4 text-primary" /> About This Adventure
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed font-sans">{mission.description}</p>
          </div>

          {/* Rating */}
          <div className="bg-primary/[0.04] border border-primary/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: mission.broRating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary drop-shadow-[0_0_6px_hsl(var(--gold)/0.4)] animate-star-pop" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
                {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
                  <Star key={`e-${i}`} className="w-5 h-5 text-muted-foreground/20 animate-star-pop" style={{ animationDelay: `${(mission.broRating + i) * 100}ms` }} />
                ))}
              </div>
              <span className="stat-value text-sm font-bold">{mission.broRating}/5</span>
            </div>
            <p className="text-sm text-foreground/70 italic font-display">"{mission.broCodeAnalysis}"</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag, i) => (
              <span key={tag} className="px-3 py-1.5 text-xs bg-secondary/30 text-muted-foreground rounded-full border border-border/20 hover:border-primary/30 hover:text-primary transition-all cascade-item font-sans" style={{ animationDelay: `${400 + i * 50}ms` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a href={mission.bookingUrl} target="_blank" rel="noopener noreferrer"
            className="ripple-btn group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-semibold text-lg rounded-xl hover:brightness-110 transition-all shadow-[0_4px_20px_hsl(var(--gold)/0.2)]">
            Book This Adventure
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-center text-xs text-muted-foreground font-sans">Opens official booking site</p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailModal;
