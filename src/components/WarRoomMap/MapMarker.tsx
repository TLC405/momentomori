import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MapMarkerProps {
  mission: Mission;
  x: number;
  y: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return "#00ff00";
    case "MEDIUM": return "#ffff00";
    case "HIGH": return "#ff6b35";
    case "EXTREME": return "#ff0000";
  }
};

const MapMarker = ({ mission, x, y, isHovered, onHover, onLeave, onClick }: MapMarkerProps) => {
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
        r={isHovered ? 20 : 12}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity={0.3}
        className="animate-marker-pulse"
      />
      
      {/* Outer ring */}
      <circle
        r={isHovered ? 10 : 6}
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.8}
      />
      
      {/* Inner dot */}
      <circle
        r={isHovered ? 5 : 3}
        fill={color}
        className={cn(isHovered && "animate-pulse")}
      />
      
      {/* Hover tooltip */}
      {isHovered && (
        <g transform="translate(15, -30)">
          <rect
            x="0"
            y="0"
            width="160"
            height="50"
            fill="hsl(0 0% 6%)"
            stroke={color}
            strokeWidth="1"
            rx="2"
          />
          <text
            x="10"
            y="18"
            fill={color}
            fontSize="10"
            fontFamily="'Share Tech Mono', monospace"
          >
            [{mission.codename}]
          </text>
          <text
            x="10"
            y="32"
            fill="hsl(120 100% 50%)"
            fontSize="11"
            fontFamily="'Orbitron', sans-serif"
            fontWeight="bold"
          >
            {mission.name}
          </text>
          <text
            x="10"
            y="44"
            fill="hsl(120 40% 60%)"
            fontSize="9"
            fontFamily="'Rajdhani', sans-serif"
          >
            {mission.city}, {mission.state} • {mission.distanceFromOKC}h
          </text>
        </g>
      )}
    </g>
  );
};

export default MapMarker;
