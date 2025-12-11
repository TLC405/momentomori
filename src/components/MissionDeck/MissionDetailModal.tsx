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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-card via-card to-card/95 border border-primary/30 rounded-2xl animate-scale-in shadow-[0_0_60px_hsl(var(--tactical-amber)/0.2)]">
        
        {/* Decorative border glow */}
        <div className="absolute inset-0 rounded-2xl border border-primary/10 pointer-events-none" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50 pointer-events-none blur-sm" />
        
        {/* Hero Image Section */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-card/40" />
          
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-primary/80 hover:border-primary transition-all group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
          
          {/* Danger badge - prominent */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold tracking-wider text-black uppercase flex items-center gap-2 shadow-lg",
              dangerConfig.class
            )}>
              <span className="text-base">{dangerConfig.icon}</span>
              {dangerConfig.label}
            </div>
          </div>
          
          {/* Add to itinerary button */}
          {onAddToItinerary && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToItinerary();
              }}
              className={cn(
                "absolute top-4 right-20 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border backdrop-blur-sm",
                isInItinerary 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--tactical-amber)/0.5)]" 
                  : "bg-black/50 text-white border-white/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              )}
            >
              {isInItinerary ? "✓ Added" : "+ Add to Quest"}
            </button>
          )}
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Codename */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold bg-primary/30 text-primary rounded-full border border-primary/40 tracking-wider">
                {mission.codename}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {mission.name}
            </h2>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{mission.location} • {mission.city}, {mission.state}</span>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 space-y-6">
          
          {/* Stats Grid - Premium design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/50 transition-all">
              <DollarSign className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Investment</div>
              <div className="font-orbitron text-lg text-primary font-bold">{mission.priceEstimate}</div>
            </div>
            
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/50 transition-all">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Duration</div>
              <div className="text-sm font-semibold text-foreground">{mission.duration}</div>
            </div>
            
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/50 transition-all">
              <Users className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Party Size</div>
              <div className="text-sm font-semibold text-foreground">{mission.groupSize}</div>
            </div>
            
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-xl p-4 text-center group hover:border-primary/50 transition-all">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Journey</div>
              <div className="text-sm font-semibold text-foreground">{mission.distanceFromOKC}h from HQ</div>
            </div>
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
          
          {/* Bro Analysis - Premium card */}
          <div className="relative bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border border-primary/30 rounded-xl p-5 overflow-hidden">
            {/* Decorative elements */}
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
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border/50 hover:border-primary/50 hover:text-primary transition-all cursor-default"
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
            className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground font-orbitron font-bold text-lg rounded-xl hover:shadow-[0_0_30px_hsl(var(--tactical-amber)/0.5)] transition-all"
          >
            <span>EMBARK ON QUEST</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground">
            Opens official booking site in new tab • Plan your adventure wisely, warrior
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailModal;
