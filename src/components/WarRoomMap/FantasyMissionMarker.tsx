import { Mission } from "@/data/missions";

interface FantasyMissionMarkerProps {
  mission: Mission;
  x: number;
  y: number;
  isHovered: boolean;
  isInItinerary?: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW":
      return { 
        color: "hsl(142, 70%, 45%)", 
        filter: "url(#glowLow)",
        symbol: "🏕️"
      };
    case "MEDIUM":
      return { 
        color: "hsl(48, 96%, 53%)", 
        filter: "url(#glowMedium)",
        symbol: "⚔️"
      };
    case "HIGH":
      return { 
        color: "hsl(25, 95%, 53%)", 
        filter: "url(#glowHigh)",
        symbol: "🔥"
      };
    case "EXTREME":
      return { 
        color: "hsl(0, 72%, 51%)", 
        filter: "url(#glowExtreme)",
        symbol: "💀"
      };
  }
};

const FantasyMissionMarker = ({ 
  mission, 
  x, 
  y, 
  isHovered, 
  isInItinerary,
  onHover, 
  onLeave, 
  onClick 
}: FantasyMissionMarkerProps) => {
  const config = getDangerConfig(mission.dangerLevel);
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
      style={{ transition: "transform 0.2s ease" }}
    >
      {/* Outer glow rings on hover */}
      {isHovered && (
        <>
          <circle
            r="28"
            fill="none"
            stroke={config.color}
            strokeWidth="1"
            opacity="0.2"
            className="animate-ping"
          />
          <circle
            r="20"
            fill="none"
            stroke={config.color}
            strokeWidth="0.5"
            opacity="0.4"
          />
        </>
      )}
      
      {/* Continuous subtle pulse */}
      <circle
        r={isHovered ? 16 : 12}
        fill="none"
        stroke={config.color}
        strokeWidth="1"
        opacity="0.3"
        style={{
          animation: "marker-pulse 2.5s ease-out infinite",
        }}
      />
      
      {/* Main marker - fantasy shield/banner shape */}
      <g filter={isHovered ? config.filter : undefined}>
        {/* Banner/shield shape */}
        <path
          d={isHovered 
            ? "M 0 -14 L 10 -6 L 10 6 L 0 14 L -10 6 L -10 -6 Z"
            : "M 0 -10 L 7 -4 L 7 4 L 0 10 L -7 4 L -7 -4 Z"
          }
          fill="hsl(0, 0%, 8%)"
          stroke={config.color}
          strokeWidth={isHovered ? 2 : 1.5}
        />
        
        {/* Inner diamond */}
        <polygon
          points={isHovered ? "0,-8 5,0 0,8 -5,0" : "0,-5 3,0 0,5 -3,0"}
          fill={config.color}
          opacity={0.85}
        />
        
        {/* Center emblem */}
        <circle
          r={isHovered ? 3 : 2}
          fill="hsl(0, 0%, 95%)"
        />
      </g>
      
      {/* Itinerary flag indicator */}
      {isInItinerary && (
        <g transform="translate(10, -12)">
          {/* Flag pole */}
          <line x1="0" y1="0" x2="0" y2="12" stroke="hsl(38, 70%, 40%)" strokeWidth="1.5" />
          {/* Flag */}
          <path 
            d="M 0 0 L 10 3 L 0 6 Z" 
            fill="hsl(38, 92%, 50%)"
            stroke="hsl(38, 100%, 60%)"
            strokeWidth="0.5"
          />
        </g>
      )}
      
      {/* Hover tooltip - parchment style */}
      {isHovered && (
        <g transform="translate(18, -40)">
          {/* Tooltip background - parchment scroll */}
          <rect
            x="-4"
            y="-4"
            width="170"
            height="72"
            fill="hsl(30, 20%, 10%)"
            stroke="hsl(38, 50%, 40%)"
            strokeWidth="1.5"
            rx="4"
          />
          
          {/* Decorative corners */}
          <path d="M -4 0 L 0 -4" stroke="hsl(38, 60%, 50%)" strokeWidth="1" />
          <path d="M 162 0 L 166 -4" stroke="hsl(38, 60%, 50%)" strokeWidth="1" />
          <path d="M -4 64 L 0 68" stroke="hsl(38, 60%, 50%)" strokeWidth="1" />
          <path d="M 162 64 L 166 68" stroke="hsl(38, 60%, 50%)" strokeWidth="1" />
          
          {/* Connector line */}
          <line 
            x1="-4" 
            y1="32" 
            x2="-18" 
            y2="40" 
            stroke="hsl(38, 50%, 40%)" 
            strokeWidth="1" 
            strokeDasharray="2,2"
          />
          
          {/* Quest name */}
          <text
            x="8"
            y="16"
            fill="hsl(38, 92%, 55%)"
            fontSize="12"
            fontFamily="'Orbitron', sans-serif"
            fontWeight="700"
          >
            {mission.name.length > 15 ? mission.name.slice(0, 13) + '...' : mission.name}
          </text>
          
          {/* Realm badge */}
          <text
            x="8"
            y="30"
            fill="hsl(38, 70%, 45%)"
            fontSize="8"
            fontFamily="'Inter', sans-serif"
            fontStyle="italic"
          >
            "{mission.codename}"
          </text>
          
          {/* Location */}
          <text
            x="8"
            y="46"
            fill="hsl(0, 0%, 60%)"
            fontSize="10"
            fontFamily="'Inter', sans-serif"
          >
            📍 {mission.city}, {mission.state}
          </text>
          
          {/* Stats row */}
          <text
            x="8"
            y="60"
            fill="hsl(0, 0%, 50%)"
            fontSize="9"
            fontFamily="'Inter', sans-serif"
          >
            <tspan fill={config.color} fontWeight="600">{mission.priceEstimate}</tspan>
            <tspan fill="hsl(0, 0%, 40%)"> • </tspan>
            <tspan>{mission.distanceFromOKC}h journey</tspan>
            <tspan fill="hsl(0, 0%, 40%)"> • </tspan>
            <tspan>{Array(mission.broRating).fill('🔥').join('')}</tspan>
          </text>
          
          {/* Danger indicator */}
          <rect
            x="140"
            y="4"
            width="20"
            height="20"
            fill={config.color}
            opacity="0.2"
            rx="3"
          />
          <text
            x="150"
            y="18"
            fill={config.color}
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            {config.symbol}
          </text>
        </g>
      )}
    </g>
  );
};

export default FantasyMissionMarker;
