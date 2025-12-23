import { Mission } from "@/data/missions";

interface FantasyMissionMarkerProps {
  mission: Mission;
  x: number;
  y: number;
  isHovered: boolean;
  isInItinerary?: boolean;
  itineraryOrder?: number;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

// Major Payne drill sergeant flavor text
const getDrillSergeantQuotes = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW":
      return {
        title: "SUNDAY STROLL",
        subtitle: "Even my grandma could handle this, and she's deceased!",
        icon: "🏕️",
      };
    case "MEDIUM":
      return {
        title: "GETTIN' WARM",
        subtitle: "Now we're startin' to separate the men from the BOYS!",
        icon: "⚔️",
      };
    case "HIGH":
      return {
        title: "PAIN INCOMING",
        subtitle: "If you ain't hurtin', you ain't LIVIN'!",
        icon: "🔥",
      };
    case "EXTREME":
      return {
        title: "KILLIN' TIME",
        subtitle: "Welcome to the HURT LOCKER, maggot!",
        icon: "💀",
      };
  }
};

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW":
      return { 
        color: "hsl(142, 76%, 42%)", 
        bgColor: "hsl(142, 76%, 15%)",
        filter: "url(#glowLow)",
        pulseColor: "hsl(142, 76%, 55%)",
        markerPath: "M 0 -12 C 6 -12 10 -6 10 0 C 10 6 6 12 0 15 C -6 12 -10 6 -10 0 C -10 -6 -6 -12 0 -12",
        hoverPath: "M 0 -16 C 8 -16 14 -8 14 0 C 14 8 8 16 0 20 C -8 16 -14 8 -14 0 C -14 -8 -8 -16 0 -16",
      };
    case "MEDIUM":
      return { 
        color: "hsl(48, 100%, 50%)", 
        bgColor: "hsl(48, 100%, 15%)",
        filter: "url(#glowMedium)",
        pulseColor: "hsl(48, 100%, 65%)",
        markerPath: "M 0 -12 L 8 -4 L 12 0 L 8 4 L 0 12 L -8 4 L -12 0 L -8 -4 Z",
        hoverPath: "M 0 -16 L 11 -5 L 16 0 L 11 5 L 0 16 L -11 5 L -16 0 L -11 -5 Z",
      };
    case "HIGH":
      return { 
        color: "hsl(25, 100%, 50%)", 
        bgColor: "hsl(25, 100%, 12%)",
        filter: "url(#glowHigh)",
        pulseColor: "hsl(25, 100%, 60%)",
        markerPath: "M 0 -14 L 6 -6 L 12 -4 L 8 2 L 10 10 L 0 6 L -10 10 L -8 2 L -12 -4 L -6 -6 Z",
        hoverPath: "M 0 -18 L 8 -8 L 16 -5 L 11 3 L 13 13 L 0 8 L -13 13 L -11 3 L -16 -5 L -8 -8 Z",
      };
    case "EXTREME":
      return { 
        color: "hsl(0, 80%, 50%)", 
        bgColor: "hsl(0, 80%, 12%)",
        filter: "url(#glowExtreme)",
        pulseColor: "hsl(0, 80%, 65%)",
        markerPath: "M 0 -14 L 4 -8 L 10 -10 L 8 -4 L 14 0 L 8 4 L 10 10 L 4 8 L 0 14 L -4 8 L -10 10 L -8 4 L -14 0 L -8 -4 L -10 -10 L -4 -8 Z",
        hoverPath: "M 0 -18 L 5 -10 L 13 -13 L 10 -5 L 18 0 L 10 5 L 13 13 L 5 10 L 0 18 L -5 10 L -13 13 L -10 5 L -18 0 L -10 -5 L -13 -13 L -5 -10 Z",
      };
  }
};

const FantasyMissionMarker = ({ 
  mission, 
  x, 
  y, 
  isHovered, 
  isInItinerary,
  itineraryOrder,
  onHover, 
  onLeave, 
  onClick 
}: FantasyMissionMarkerProps) => {
  const config = getDangerConfig(mission.dangerLevel);
  const quotes = getDrillSergeantQuotes(mission.dangerLevel);
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
      style={{ 
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isHovered ? `translate(${x}px, ${y - 4}px)` : undefined,
      }}
    >
      {/* Outer danger ripples */}
      {isHovered && (
        <>
          <circle r="45" fill="none" stroke={config.color} strokeWidth="0.5" opacity="0.15" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle r="35" fill="none" stroke={config.color} strokeWidth="0.8" opacity="0.25" className="animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
          <circle r="25" fill="none" stroke={config.color} strokeWidth="1" opacity="0.35" className="animate-ping" style={{ animationDuration: '1s', animationDelay: '0.6s' }} />
        </>
      )}
      
      {/* Continuous pulse ring */}
      <circle
        r={isHovered ? 22 : 16}
        fill="none"
        stroke={config.pulseColor}
        strokeWidth="1.5"
        opacity="0.4"
        style={{ animation: "marker-pulse 2.5s ease-out infinite" }}
      />
      
      {/* Secondary pulse */}
      <circle
        r={isHovered ? 18 : 12}
        fill="none"
        stroke={config.color}
        strokeWidth="1"
        opacity="0.6"
        style={{ animation: "marker-pulse 2.5s ease-out infinite 0.8s" }}
      />
      
      {/* Ground shadow */}
      <ellipse
        cx="0"
        cy={isHovered ? 18 : 12}
        rx={isHovered ? 12 : 8}
        ry={isHovered ? 4 : 3}
        fill="hsl(0 0% 0% / 0.4)"
        style={{ filter: "blur(2px)" }}
      />
      
      {/* Main marker with glow */}
      <g filter={isHovered ? config.filter : "url(#innerShadow)"}>
        {/* Outer shell */}
        <path
          d={isHovered ? config.hoverPath : config.markerPath}
          fill={config.bgColor}
          stroke={config.color}
          strokeWidth={isHovered ? 2.5 : 2}
          style={{ transition: "all 0.3s ease" }}
        />
        
        {/* Inner glow gradient */}
        <path
          d={isHovered ? config.hoverPath : config.markerPath}
          fill={`url(#markerGradient-${mission.dangerLevel})`}
          opacity="0.9"
          style={{ transition: "all 0.3s ease", transform: "scale(0.7)" }}
        />
        
        {/* Center emblem */}
        <circle
          r={isHovered ? 5 : 3.5}
          fill={config.color}
          style={{ transition: "all 0.3s ease" }}
        />
        <circle
          r={isHovered ? 2.5 : 1.5}
          fill="hsl(0 0% 95%)"
        />
      </g>
      
      {/* Floating particles on hover */}
      {isHovered && (
        <g opacity="0.7">
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              r="1.5"
              fill={config.color}
              style={{
                animation: `ember-float 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                transform: `rotate(${i * 60}deg) translateY(-20px)`,
              }}
            />
          ))}
        </g>
      )}
      
      {/* Itinerary flag with order number */}
      {isInItinerary && (
        <g transform="translate(14, -18)">
          {/* Flag pole with gold accent */}
          <line x1="0" y1="0" x2="0" y2="20" stroke="hsl(30 50% 25%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="20" stroke="hsl(38 70% 45%)" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Waving flag */}
          <path 
            d="M 0 1 Q 8 3 14 0 Q 8 6 14 9 Q 8 6 0 9 Z" 
            fill="hsl(38 92% 50%)"
            stroke="hsl(38 100% 65%)"
            strokeWidth="0.5"
            style={{ animation: "flag-wave 1.5s ease-in-out infinite" }}
          />
          
          {/* Order number badge */}
          {itineraryOrder !== undefined && (
            <g transform="translate(7, 4)">
              <circle r="6" fill="hsl(0 0% 5%)" stroke="hsl(38 92% 50%)" strokeWidth="1" />
              <text
                x="0"
                y="3"
                fill="hsl(38 92% 50%)"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="'Orbitron', sans-serif"
              >
                {itineraryOrder}
              </text>
            </g>
          )}
          
          {/* Checkmark seal */}
          <circle cx="0" cy="22" r="5" fill="hsl(142 76% 42%)" stroke="hsl(142 76% 55%)" strokeWidth="1" />
          <path d="M -2 22 L -0.5 23.5 L 2.5 20.5" stroke="hsl(0 0% 95%)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      
      {/* Premium tooltip - parchment scroll with Major Payne quotes */}
      {isHovered && (
        <g transform="translate(22, -65)" style={{ animation: "scroll-unroll 0.3s ease-out" }}>
          {/* Scroll shadow */}
          <rect x="-2" y="2" width="210" height="115" fill="hsl(0 0% 0% / 0.5)" rx="6" style={{ filter: "blur(4px)" }} />
          
          {/* Main scroll body */}
          <rect x="0" y="0" width="206" height="112" fill="hsl(25 20% 8%)" stroke="hsl(38 50% 35%)" strokeWidth="2" rx="5" />
          
          {/* Inner parchment texture */}
          <rect x="4" y="4" width="198" height="104" fill="url(#parchmentGradient)" rx="3" opacity="0.15" />
          
          {/* Decorative border */}
          <rect x="6" y="6" width="194" height="100" fill="none" stroke="hsl(38 40% 30%)" strokeWidth="1" rx="2" strokeDasharray="4,2" />
          
          {/* Top ornament line */}
          <path d="M 20 10 L 186 10" stroke="hsl(38 50% 40%)" strokeWidth="1" />
          <circle cx="20" cy="10" r="2" fill="hsl(38 60% 50%)" />
          <circle cx="186" cy="10" r="2" fill="hsl(38 60% 50%)" />
          
          {/* Danger level badge - top right */}
          <g transform="translate(170, 24)">
            <rect x="-18" y="-10" width="36" height="20" fill={config.bgColor} stroke={config.color} strokeWidth="1.5" rx="4" />
            <text x="0" y="5" fill={config.color} fontSize="14" textAnchor="middle">
              {quotes.icon}
            </text>
          </g>
          
          {/* DRILL SERGEANT THREAT LEVEL */}
          <text x="12" y="28" fill={config.color} fontSize="9" fontFamily="'Orbitron', sans-serif" fontWeight="700" letterSpacing="0.1em">
            {quotes.title}
          </text>
          
          {/* Quest name */}
          <text x="12" y="44" fill="hsl(38 92% 58%)" fontSize="13" fontFamily="'Orbitron', sans-serif" fontWeight="700">
            {mission.name.length > 18 ? mission.name.slice(0, 16) + '...' : mission.name}
          </text>
          
          {/* Drill sergeant quote */}
          <text x="12" y="58" fill="hsl(38 70% 45%)" fontSize="8" fontFamily="'Inter', sans-serif" fontStyle="italic">
            "{quotes.subtitle}"
          </text>
          
          {/* Divider */}
          <line x1="12" y1="66" x2="194" y2="66" stroke="hsl(38 40% 25%)" strokeWidth="0.5" />
          
          {/* Location with icon */}
          <text x="12" y="80" fill="hsl(0 0% 60%)" fontSize="10" fontFamily="'Inter', sans-serif">
            <tspan fill="hsl(38 60% 50%)">📍</tspan> {mission.city}, {mission.state}
          </text>
          
          {/* Stats row */}
          <g transform="translate(12, 95)">
            {/* Price */}
            <text fill={config.color} fontSize="11" fontWeight="700" fontFamily="'Orbitron', sans-serif">
              {mission.priceEstimate}
            </text>
            
            {/* Journey time */}
            <text x="55" fill="hsl(0 0% 55%)" fontSize="9" fontFamily="'Inter', sans-serif">
              ⏱ {mission.distanceFromOKC}h march
            </text>
            
            {/* Bro rating */}
            <text x="120" fill="hsl(0 0% 55%)" fontSize="9" fontFamily="'Inter', sans-serif">
              {Array(mission.broRating).fill('🔥').join('')}
            </text>
          </g>
          
          {/* Wax seal */}
          <g transform="translate(190, 100)">
            <circle r="10" fill="hsl(0 60% 30%)" stroke="hsl(0 50% 25%)" strokeWidth="2" />
            <circle r="7" fill="hsl(0 65% 35%)" />
            <text x="0" y="3" fill="hsl(0 0% 90%)" fontSize="8" textAnchor="middle" fontWeight="bold">W</text>
          </g>
          
          {/* Connection line to marker */}
          <path 
            d="M 0 56 Q -15 56 -22 65" 
            stroke="hsl(38 50% 35%)" 
            strokeWidth="1.5" 
            fill="none" 
            strokeDasharray="3,2"
            markerEnd="url(#arrowhead)"
          />
        </g>
      )}
      
      {/* Gradient definitions for this marker */}
      <defs>
        <radialGradient id={`markerGradient-${mission.dangerLevel}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={config.color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={config.bgColor} stopOpacity="0.3" />
        </radialGradient>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="hsl(38 50% 35%)" />
        </marker>
      </defs>
    </g>
  );
};

export default FantasyMissionMarker;
