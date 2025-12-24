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

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW":
      return { 
        color: "hsl(142, 76%, 42%)", 
        bgColor: "hsl(142, 76%, 15%)",
        glowColor: "hsl(142, 76%, 55%)",
      };
    case "MEDIUM":
      return { 
        color: "hsl(48, 100%, 50%)", 
        bgColor: "hsl(48, 100%, 15%)",
        glowColor: "hsl(48, 100%, 65%)",
      };
    case "HIGH":
      return { 
        color: "hsl(25, 100%, 50%)", 
        bgColor: "hsl(25, 100%, 12%)",
        glowColor: "hsl(25, 100%, 60%)",
      };
    case "EXTREME":
      return { 
        color: "hsl(0, 80%, 50%)", 
        bgColor: "hsl(0, 80%, 12%)",
        glowColor: "hsl(0, 80%, 65%)",
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
  const size = isHovered ? 14 : 10;
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Outer glow pulse */}
      <circle
        r={isHovered ? 28 : 18}
        fill="none"
        stroke={config.glowColor}
        strokeWidth="1.5"
        opacity={isHovered ? 0.5 : 0.3}
        style={{ animation: "marker-pulse 2s ease-out infinite" }}
      />
      
      {/* Secondary pulse */}
      <circle
        r={isHovered ? 22 : 14}
        fill="none"
        stroke={config.color}
        strokeWidth="1"
        opacity={isHovered ? 0.6 : 0.4}
        style={{ animation: "marker-pulse 2s ease-out infinite 0.5s" }}
      />
      
      {/* Ground shadow */}
      <ellipse
        cx="0"
        cy={isHovered ? 16 : 10}
        rx={isHovered ? 10 : 7}
        ry={isHovered ? 3 : 2}
        fill="hsl(0 0% 0% / 0.3)"
        style={{ filter: "blur(2px)" }}
      />
      
      {/* Main marker circle */}
      <circle
        r={size}
        fill={config.bgColor}
        stroke={config.color}
        strokeWidth={isHovered ? 2.5 : 2}
        style={{ 
          transition: "all 0.2s ease",
          filter: isHovered ? `drop-shadow(0 0 8px ${config.glowColor})` : "none",
        }}
      />
      
      {/* Inner highlight */}
      <circle
        r={size * 0.6}
        fill={config.color}
        opacity={isHovered ? 0.9 : 0.7}
        style={{ transition: "all 0.2s ease" }}
      />
      
      {/* Center dot */}
      <circle
        r={isHovered ? 3 : 2}
        fill="hsl(0 0% 95%)"
      />
      
      {/* Itinerary indicator */}
      {isInItinerary && (
        <g transform="translate(10, -12)">
          <circle r="7" fill="hsl(38 92% 50%)" stroke="hsl(38 100% 65%)" strokeWidth="1.5" />
          <text
            x="0"
            y="3"
            fill="hsl(0 0% 5%)"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="'Orbitron', sans-serif"
          >
            {itineraryOrder || "✓"}
          </text>
        </g>
      )}
      
      {/* Compact tooltip on hover */}
      {isHovered && (
        <g transform="translate(18, -35)">
          {/* Tooltip background */}
          <rect 
            x="0" 
            y="0" 
            width="120" 
            height="50" 
            fill="hsl(25 20% 8%)" 
            stroke={config.color}
            strokeWidth="1.5" 
            rx="4" 
          />
          
          {/* Mission name */}
          <text 
            x="8" 
            y="16" 
            fill="hsl(38 92% 58%)" 
            fontSize="10" 
            fontFamily="'Orbitron', sans-serif" 
            fontWeight="600"
          >
            {mission.name.length > 14 ? mission.name.slice(0, 12) + '...' : mission.name}
          </text>
          
          {/* Location */}
          <text x="8" y="30" fill="hsl(0 0% 60%)" fontSize="8" fontFamily="'Inter', sans-serif">
            📍 {mission.city}
          </text>
          
          {/* Price */}
          <text x="8" y="43" fill={config.color} fontSize="9" fontWeight="600" fontFamily="'Orbitron', sans-serif">
            {mission.priceEstimate}
          </text>
          
          {/* Fire rating */}
          <text x="70" y="43" fill="hsl(0 0% 55%)" fontSize="8" fontFamily="'Inter', sans-serif">
            {Array(mission.broRating).fill('🔥').join('')}
          </text>
          
          {/* Arrow pointer */}
          <path 
            d="M 0 25 L -8 20 L -8 30 Z" 
            fill="hsl(25 20% 8%)" 
            stroke={config.color}
            strokeWidth="1"
          />
        </g>
      )}
    </g>
  );
};

export default FantasyMissionMarker;