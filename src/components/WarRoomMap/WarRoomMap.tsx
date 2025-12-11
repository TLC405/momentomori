import { useState } from "react";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import MapMarker from "./MapMarker";
import MissionDetail from "../MissionDeck/MissionDetail";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
}

// Convert lat/lng to SVG coordinates
const projectCoordinates = (lat: number, lng: number) => {
  const minLat = 28;
  const maxLat = 38;
  const minLng = -104;
  const maxLng = -93;
  
  const width = 800;
  const height = 400;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
  
  return { x, y };
};

const OKC = projectCoordinates(35.4676, -97.5164);

const WarRoomMap = ({ selectedRealm, onMissionSelect }: WarRoomMapProps) => {
  const [hoveredMission, setHoveredMission] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const displayedMissions = selectedRealm
    ? missions.filter((m) => m.realmId === selectedRealm.id)
    : missions;

  const handleMissionClick = (mission: Mission) => {
    if (onMissionSelect) {
      onMissionSelect(mission);
    } else {
      setSelectedMission(mission);
    }
  };

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-tactical-dark via-tactical-black to-tactical-darker">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Definitions */}
          <defs>
            {/* Grid pattern - more subtle */}
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(0 0% 20%)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            
            {/* Glow filter */}
            <filter id="amberGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Radar gradient */}
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Background grid */}
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          
          {/* State outlines - more subtle */}
          <g stroke="hsl(38 92% 50% / 0.15)" strokeWidth="1" fill="none">
            <path d="M 150 140 L 550 140 L 550 220 L 480 220 L 480 260 L 150 260 Z" />
            <path d="M 150 260 L 480 260 L 480 220 L 550 220 L 550 380 L 150 380 Z" />
            <path d="M 150 60 L 550 60 L 550 140 L 150 140 Z" />
            <path d="M 550 140 L 700 140 L 700 280 L 550 280 Z" />
          </g>
          
          {/* State labels */}
          <text x="350" y="200" fill="hsl(0 0% 30%)" fontSize="20" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="600">
            OKLAHOMA
          </text>
          <text x="350" y="320" fill="hsl(0 0% 25%)" fontSize="20" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="600">
            TEXAS
          </text>
          <text x="350" y="100" fill="hsl(0 0% 25%)" fontSize="14" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            KANSAS
          </text>
          
          {/* Distance rings from OKC */}
          <g opacity="0.3">
            <circle cx={OKC.x} cy={OKC.y} r="40" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx={OKC.x} cy={OKC.y} r="80" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx={OKC.x} cy={OKC.y} r="140" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="1" strokeDasharray="4,4" />
          </g>
          
          {/* OKC HQ marker */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`} filter="url(#amberGlow)">
            <polygon
              points="0,-10 8.7,-5 8.7,5 0,10 -8.7,5 -8.7,-5"
              fill="hsl(38 92% 50%)"
              stroke="hsl(38 92% 60%)"
              strokeWidth="2"
            />
            <text y="3" fill="hsl(0 0% 5%)" fontSize="6" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="bold">
              HQ
            </text>
            <text y="24" fill="hsl(38 92% 50%)" fontSize="9" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="600">
              OKC
            </text>
          </g>
          
          {/* Mission markers */}
          {displayedMissions.map((mission) => {
            const pos = projectCoordinates(mission.coordinates.lat, mission.coordinates.lng);
            return (
              <MapMarker
                key={mission.id}
                mission={mission}
                x={pos.x}
                y={pos.y}
                isHovered={hoveredMission === mission.id}
                onHover={() => setHoveredMission(mission.id)}
                onLeave={() => setHoveredMission(null)}
                onClick={() => handleMissionClick(mission)}
              />
            );
          })}
          
          {/* Radar sweep */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`}>
            <path
              d="M 0 0 L 0 -160 A 160 160 0 0 1 80 -138.6 Z"
              fill="url(#radarGradient)"
              className="origin-center animate-radar-sweep"
              opacity="0.2"
            />
          </g>
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full danger-bg-low" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full danger-bg-medium" />
            <span className="text-xs text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full danger-bg-high" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full danger-bg-extreme" />
            <span className="text-xs text-muted-foreground">Extreme</span>
          </div>
        </div>
        
        {/* Mission count */}
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50">
          <span className="text-xs text-muted-foreground">Missions: </span>
          <span className="text-sm font-orbitron text-primary font-bold">{displayedMissions.length}</span>
        </div>
      </div>
      
      {/* Mission Detail Modal */}
      {selectedMission && !onMissionSelect && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
};

export default WarRoomMap;