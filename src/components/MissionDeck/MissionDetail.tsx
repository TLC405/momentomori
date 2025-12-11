import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { cn } from "@/lib/utils";

interface MissionDetailProps {
  mission: Mission;
  onClose: () => void;
}

const getDangerClass = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "danger-bg-low";
    case "MEDIUM": return "danger-bg-medium";
    case "HIGH": return "danger-bg-high";
    case "EXTREME": return "danger-bg-extreme";
  }
};

const MissionDetail = ({ mission, onClose }: MissionDetailProps) => {
  const imageUrl = getMissionImage(mission.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-xl animate-scale-in shadow-2xl">
        {/* Header Image */}
        <div className="relative h-56 md:h-72">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          {/* Danger badge */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider text-black uppercase",
              getDangerClass(mission.dangerLevel)
            )}>
              {mission.dangerLevel} RISK
            </div>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                {mission.codename}
              </span>
            </div>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-2">
              {mission.name}
            </h2>
            <p className="text-sm text-white/70 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {mission.location} • {mission.city}, {mission.state}
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Price</div>
              <div className="font-orbitron text-lg text-primary font-bold">{mission.priceEstimate}</div>
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Duration</div>
              <div className="text-sm font-semibold text-foreground">{mission.duration}</div>
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Group Size</div>
              <div className="text-sm font-semibold text-foreground">{mission.groupSize}</div>
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Distance</div>
              <div className="text-sm font-semibold text-foreground">{mission.distanceFromOKC}h from OKC</div>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Mission Brief
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mission.description}
            </p>
          </div>
          
          {/* Bro Analysis */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: mission.broRating }).map((_, i) => (
                  <span key={i} className="text-base">🔥</span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-primary">Bro Rating: {mission.broRating}/5</h3>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{mission.broCodeAnalysis}"
            </p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* CTA */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 bg-primary text-primary-foreground font-orbitron font-bold text-center rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(var(--tactical-amber)/0.4)]"
          >
            Initiate Mission
          </a>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
