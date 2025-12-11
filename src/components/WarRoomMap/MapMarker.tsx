import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MapMarkerProps {
  mission: Mission;
  x: number;
  y: number;
  isHovered: boolean;
  isInItinerary?: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  onAddToItinerary?: () => void;
}

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "hsl(142, 70%, 45%)";
    case "MEDIUM": return "hsl(48, 96%, 53%)";
    case "HIGH": return "hsl(25, 95%, 53%)";
    case "EXTREME": return "hsl(0, 72%, 51%)";
  }
};

const MapMarker = ({ mission, x, y, isHovered, isInItinerary, onHover, onLeave, onClick }: MapMarkerProps) => {
  const color = getDangerColor(mission.dangerLevel);
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Pulse ring */}
      <circle
        r={isHovered ? 16 : 10}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity={0.4}
        className="animate-marker-pulse"
      />
      
      {/* Outer ring */}
      <circle
        r={isHovered ? 8 : 5}
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.9}
      />
      
      {/* Inner dot */}
      <circle
        r={isHovered ? 4 : 2.5}
        fill={color}
        className={cn(isHovered && "animate-pulse")}
      />
      
      {/* Hover tooltip */}
      {isHovered && (
        <g transform="translate(12, -25)">
          <rect
            x="0"
            y="0"
            width="140"
            height="40"
            fill="hsl(0 0% 8%)"
            stroke={color}
            strokeWidth="1"
            rx="4"
          />
          <text
            x="8"
            y="16"
            fill="hsl(38 92% 50%)"
            fontSize="10"
            fontFamily="'Orbitron', sans-serif"
            fontWeight="600"
          >
            {mission.name.length > 18 ? mission.name.slice(0, 16) + '...' : mission.name}
          </text>
          <text
            x="8"
            y="30"
            fill="hsl(0 0% 60%)"
            fontSize="9"
            fontFamily="'Inter', sans-serif"
          >
            {mission.city} • {mission.priceEstimate}
          </text>
        </g>
      )}
    </g>
  );
};

export default MapMarker;