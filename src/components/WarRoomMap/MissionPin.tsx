import { Mission } from "@/data/missions";
import { cn } from "@/lib/utils";

interface MissionPinProps {
  mission: Mission;
  x: number;
  y: number;
  isHovered: boolean;
  isInItinerary?: boolean;
  isSelected?: boolean;
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
        pulseColor: "hsl(142, 70%, 55%)"
      };
    case "MEDIUM":
      return { 
        color: "hsl(48, 96%, 53%)", 
        filter: "url(#glowMedium)",
        pulseColor: "hsl(48, 96%, 63%)"
      };
    case "HIGH":
      return { 
        color: "hsl(25, 95%, 53%)", 
        filter: "url(#glowHigh)",
        pulseColor: "hsl(25, 95%, 63%)"
      };
    case "EXTREME":
      return { 
        color: "hsl(0, 72%, 51%)", 
        filter: "url(#glowExtreme)",
        pulseColor: "hsl(0, 72%, 61%)"
      };
  }
};

const MissionPin = ({ 
  mission, 
  x, 
  y, 
  isHovered, 
  isInItinerary,
  isSelected,
  onHover, 
  onLeave, 
  onClick 
}: MissionPinProps) => {
  const config = getDangerConfig(mission.dangerLevel);
  const isActive = isHovered || isSelected;
  
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="cursor-pointer"
      style={{ transition: "transform 0.2s ease" }}
    >
      {/* Outer pulse ring - only on hover/active */}
      {isActive && (
        <>
          <circle
            r="24"
            fill="none"
            stroke={config.color}
            strokeWidth="1"
            opacity="0.3"
            className="animate-ping"
          />
          <circle
            r="18"
            fill="none"
            stroke={config.color}
            strokeWidth="0.5"
            opacity="0.5"
          />
        </>
      )}
      
      {/* Continuous pulse ring */}
      <circle
        r={isActive ? 14 : 10}
        fill="none"
        stroke={config.color}
        strokeWidth="1"
        opacity="0.4"
        style={{
          animation: "marker-pulse 2s ease-out infinite",
        }}
      />
      
      {/* Tactical diamond shape */}
      <g filter={isActive ? config.filter : undefined}>
        {/* Outer diamond */}
        <polygon
          points={isActive ? "0,-10 10,0 0,10 -10,0" : "0,-7 7,0 0,7 -7,0"}
          fill="hsl(0, 0%, 8%)"
          stroke={config.color}
          strokeWidth={isActive ? 2 : 1.5}
        />
        
        {/* Inner fill */}
        <polygon
          points={isActive ? "0,-6 6,0 0,6 -6,0" : "0,-4 4,0 0,4 -4,0"}
          fill={config.color}
          opacity={0.9}
        />
        
        {/* Center dot */}
        <circle
          r={isActive ? 2 : 1.5}
          fill="hsl(0, 0%, 95%)"
        />
      </g>
      
      {/* Itinerary indicator */}
      {isInItinerary && (
        <g transform="translate(8, -8)">
          <circle r="6" fill="hsl(38, 92%, 50%)" stroke="hsl(0, 0%, 5%)" strokeWidth="1" />
          <text 
            y="3" 
            fill="hsl(0, 0%, 5%)" 
            fontSize="7" 
            fontWeight="bold" 
            textAnchor="middle"
            fontFamily="'Orbitron', sans-serif"
          >
            ✓
          </text>
        </g>
      )}
      
      {/* Premium hover tooltip */}
      {isActive && (
        <g transform="translate(16, -35)">
          {/* Tooltip background with gradient */}
          <rect
            x="-4"
            y="-4"
            width="160"
            height="58"
            fill="hsl(0, 0%, 6%)"
            stroke={config.color}
            strokeWidth="1"
            rx="4"
            filter="url(#innerShadow)"
          />
          
          {/* Connector line */}
          <line 
            x1="-4" 
            y1="20" 
            x2="-16" 
            y2="35" 
            stroke={config.color} 
            strokeWidth="1" 
            opacity="0.5"
          />
          
          {/* Mission name */}
          <text
            x="6"
            y="14"
            fill="hsl(38, 92%, 50%)"
            fontSize="11"
            fontFamily="'Orbitron', sans-serif"
            fontWeight="700"
          >
            {mission.name.length > 16 ? mission.name.slice(0, 14) + '...' : mission.name}
          </text>
          
          {/* Location */}
          <text
            x="6"
            y="28"
            fill="hsl(0, 0%, 65%)"
            fontSize="9"
            fontFamily="'Inter', sans-serif"
          >
            {mission.city}, {mission.state}
          </text>
          
          {/* Stats row */}
          <text
            x="6"
            y="44"
            fill="hsl(0, 0%, 50%)"
            fontSize="9"
            fontFamily="'Inter', sans-serif"
          >
            <tspan fill={config.color}>{mission.priceEstimate}</tspan>
            <tspan fill="hsl(0, 0%, 40%)"> • </tspan>
            <tspan fill="hsl(0, 0%, 60%)">{mission.distanceFromOKC}h drive</tspan>
          </text>
          
          {/* Danger level indicator */}
          <rect
            x="130"
            y="6"
            width="18"
            height="18"
            fill={config.color}
            opacity="0.2"
            rx="2"
          />
          <text
            x="139"
            y="19"
            fill={config.color}
            fontSize="10"
            fontFamily="'Orbitron', sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            {mission.dangerLevel.charAt(0)}
          </text>
        </g>
      )}
    </g>
  );
};

export default MissionPin;