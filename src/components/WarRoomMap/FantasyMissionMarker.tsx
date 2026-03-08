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
        color: "hsl(152, 45%, 38%)", 
        bgColor: "hsl(152, 35%, 92%)",
        strokeColor: "hsl(152, 40%, 32%)",
        label: "Easy",
      };
    case "MEDIUM":
      return { 
        color: "hsl(38, 70%, 50%)", 
        bgColor: "hsl(38, 60%, 92%)",
        strokeColor: "hsl(38, 65%, 40%)",
        label: "Moderate",
      };
    case "HIGH":
      return { 
        color: "hsl(16, 70%, 45%)", 
        bgColor: "hsl(16, 55%, 92%)",
        strokeColor: "hsl(16, 65%, 38%)",
        label: "Challenging",
      };
    case "EXTREME":
      return { 
        color: "hsl(0, 60%, 45%)", 
        bgColor: "hsl(0, 50%, 92%)",
        strokeColor: "hsl(0, 55%, 35%)",
        label: "Extreme",
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
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Subtle pulse ring */}
      <circle
        r={isHovered ? 18 : 12}
        fill="none"
        stroke={config.color}
        strokeWidth="1"
        opacity={isHovered ? 0.35 : 0.2}
        style={{ animation: "marker-pulse 3s ease-out infinite" }}
      />
      
      {/* Drop pin shape */}
      <g style={{ transition: "all 0.2s ease", transform: isHovered ? "scale(1.2) translateY(-2px)" : "scale(1)" }}>
        {/* Pin shadow */}
        <ellipse cx="0" cy={isHovered ? 12 : 8} rx={isHovered ? 5 : 4} ry={isHovered ? 2 : 1.5} fill="hsl(0, 0%, 30%)" opacity="0.2" style={{ filter: "blur(1.5px)" }} />
        
        {/* Pin body - teardrop */}
        <path
          d="M 0 -11 C -6 -11 -8 -5 -8 -3 C -8 2 0 10 0 10 C 0 10 8 2 8 -3 C 8 -5 6 -11 0 -11 Z"
          fill={config.color}
          stroke={config.strokeColor}
          strokeWidth="1"
        />
        
        {/* Inner circle */}
        <circle cy="-4" r="3.5" fill={config.bgColor} />
        
        {/* Center dot */}
        <circle cy="-4" r="1.5" fill={config.color} />
      </g>
      
      {/* Itinerary badge */}
      {isInItinerary && (
        <g transform="translate(8, -14)">
          <circle r="6" fill="hsl(16, 55%, 42%)" stroke="hsl(40, 35%, 88%)" strokeWidth="1" />
          <text y="3" fill="hsl(40, 35%, 95%)" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif">
            {itineraryOrder || "✓"}
          </text>
        </g>
      )}
      
      {/* Tooltip on hover */}
      {isHovered && (
        <g transform="translate(14, -40)">
          {/* Tooltip bg */}
          <rect x="0" y="0" width="135" height="52" fill="hsl(40, 30%, 96%)" stroke="hsl(33, 25%, 70%)" strokeWidth="1" rx="4" style={{ filter: "drop-shadow(0 2px 6px hsl(0 0% 0% / 0.12))" }} />
          
          {/* Mission name */}
          <text x="8" y="16" fill="hsl(33, 35%, 22%)" fontSize="10" fontFamily="'Playfair Display', serif" fontWeight="600">
            {mission.name.length > 16 ? mission.name.slice(0, 14) + '…' : mission.name}
          </text>
          
          {/* Location */}
          <text x="8" y="30" fill="hsl(33, 15%, 45%)" fontSize="8" fontFamily="'Source Sans 3', sans-serif">
            📍 {mission.city}
          </text>
          
          {/* Price & rating */}
          <text x="8" y="44" fill="hsl(16, 55%, 42%)" fontSize="9" fontWeight="600" fontFamily="'Source Sans 3', sans-serif">
            {mission.priceEstimate}
          </text>
          <text x="75" y="44" fill="hsl(33, 15%, 50%)" fontSize="8" fontFamily="'Source Sans 3', sans-serif">
            {Array(mission.broRating).fill('★').join('')}
          </text>
          
          {/* Arrow */}
          <path d="M 0 25 L -6 20 L -6 30 Z" fill="hsl(40, 30%, 96%)" stroke="hsl(33, 25%, 70%)" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};

export default FantasyMissionMarker;
