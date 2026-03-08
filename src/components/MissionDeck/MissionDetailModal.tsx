import { useEffect, useState } from "react";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Clock, Users, DollarSign, X, Flame, AlertTriangle } from "lucide-react";

interface MissionDetailModalProps {
  mission: Mission;
  onClose: () => void;
  onAddToItinerary?: () => void;
  isInItinerary?: boolean;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low", label: "Low Risk", icon: "🏕️", color: "text-danger-low" };
    case "MEDIUM": return { class: "danger-bg-medium", label: "Moderate Risk", icon: "⚔️", color: "text-danger-medium" };
    case "HIGH": return { class: "danger-bg-high", label: "High Risk", icon: "🔥", color: "text-danger-high" };
    case "EXTREME": return { class: "danger-bg-extreme", label: "Extreme Danger", icon: "💀", color: "text-danger-extreme" };
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
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Modal container with 3D entrance */}
      <div 
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-primary/30 rounded-2xl shadow-[0_0_60px_hsl(var(--tactical-amber)/0.2)] glass-premium transition-all duration-500",
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-[0.85]"
        )}
        style={{
          transform: isVisible 
            ? 'perspective(800px) rotateX(0deg) scale(1)' 
            : 'perspective(800px) rotateX(8deg) scale(0.85)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
        }}
      >
        {/* Decorative border glow */}
        <div className="absolute inset-0 rounded-2xl border border-primary/10 pointer-events-none" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50 pointer-events-none blur-sm" />
        
        {/* Hero Image Section with Ken Burns */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-card/40" />
          
          <div className="absolute top-0 left-0 right-0 h-1 animate-gradient-sweep" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-primary/80 hover:border-primary transition-all group btn-3d"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
          
          <div className="absolute top-4 left-4">
            <div className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold tracking-wider text-black uppercase flex items-center gap-2 shadow-lg",
              dangerConfig.class
            )}>
              <span className="text-base">{dangerConfig.icon}</span>
              {dangerConfig.label}
            </div>
          </div>
          
          {onAddToItinerary && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToItinerary(); }}
              className={cn(
                "absolute top-4 right-20 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border backdrop-blur-sm btn-3d",
                isInItinerary 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--tactical-amber)/0.5)]" 
                  : "bg-black/50 text-white border-white/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              )}
            >
              {isInItinerary ? "✓ Added" : "+ Add to Quest"}
            </button>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold bg-primary/30 text-primary rounded-full border border-primary/40 tracking-wider">
                {mission.codename}
              </span>
            </div>
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {mission.name}
            </h2>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{mission.location} • {mission.city}, {mission.state}</span>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Stats Grid with staggered pop-in */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: "Investment", value: mission.priceEstimate },
              { icon: Clock, label: "Duration", value: mission.duration },
              { icon: Users, label: "Party Size", value: mission.groupSize },
              { icon: MapPin, label: "Journey", value: `${mission.distanceFromOKC}h from HQ` },
            ].map((stat, i) => (
              <div 
                key={stat.label}
                className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/50 hover:translate-y-[-3px] transition-all duration-300 animate-count-pop"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className={cn(
                  "font-semibold text-foreground",
                  stat.label === "Investment" && "font-orbitron text-lg text-primary font-bold"
                )}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="bg-muted/20 border border-border/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 font-orbitron">
              <AlertTriangle className="w-4 h-4 text-primary" />
              MISSION BRIEFING
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mission.description}
            </p>
          </div>
          
          {/* Bro Analysis */}
          <div className="relative bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border border-primary/30 rounded-xl p-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {Array.from({ length: mission.broRating }).map((_, i) => (
                    <Flame key={i} className="w-5 h-5 text-primary fill-primary/50" />
                  ))}
                  {Array.from({ length: 5 - mission.broRating }).map((_, i) => (
                    <Flame key={i} className="w-5 h-5 text-muted-foreground/30" />
                  ))}
                </div>
                <h3 className="text-sm font-bold text-primary font-orbitron">
                  BRO RATING: {mission.broRating}/5
                </h3>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "{mission.broCodeAnalysis}"
              </p>
            </div>
          </div>
          
          {/* Tags with cascade */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag, i) => (
              <span
                key={tag}
                className="cascade-item px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border/50 hover:border-primary/50 hover:text-primary transition-all cursor-default"
                style={{ animationDelay: `${600 + i * 60}ms` }}
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* CTA Button */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground font-orbitron font-bold text-lg rounded-xl hover:shadow-[0_0_30px_hsl(var(--tactical-amber)/0.5)] transition-all btn-3d"
          >
            <span>EMBARK ON QUEST</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <p className="text-center text-xs text-muted-foreground">
            Opens official booking site in new tab • Plan your adventure wisely, warrior
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailModal;
