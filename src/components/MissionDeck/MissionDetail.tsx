import { Mission } from "@/data/missions";
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg animate-scale-in">
        {/* Header Image */}
        <div className="relative h-48 md:h-64">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${mission.imageUrl})`,
              backgroundColor: 'hsl(var(--muted))'
            }}
          />
          <div className="absolute inset-0 image-overlay" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          {/* Danger badge */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "px-3 py-1.5 rounded text-xs font-bold tracking-wider text-black",
              getDangerClass(mission.dangerLevel)
            )}>
              {mission.dangerLevel} RISK
            </div>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-1">
              {mission.name}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Price</div>
              <div className="font-orbitron text-lg text-primary font-bold">{mission.priceEstimate}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Duration</div>
              <div className="text-sm font-medium text-foreground">{mission.duration}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Group Size</div>
              <div className="text-sm font-medium text-foreground">{mission.groupSize}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Distance</div>
              <div className="text-sm font-medium text-foreground">{mission.distanceFromOKC}h from OKC</div>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Mission Brief</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mission.description}
            </p>
          </div>
          
          {/* Bro Analysis */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔥</span>
              <h3 className="text-sm font-semibold text-primary">Bro Rating: {mission.broRating}/5</h3>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "{mission.broCodeAnalysis}"
            </p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mission.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* CTA */}
          <a
            href={mission.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-primary text-primary-foreground font-orbitron font-bold text-center rounded-lg hover:bg-primary/90 transition-colors"
          >
            Book Mission
          </a>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;