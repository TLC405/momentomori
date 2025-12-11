import { useState } from "react";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import MapMarker from "./MapMarker";
import MissionDetail from "../MissionDeck/MissionDetail";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
}

// Convert lat/lng to SVG coordinates (simplified projection for this region)
const projectCoordinates = (lat: number, lng: number) => {
  // Bounding box for our region (roughly TX/OK/KS/AR area)
  const minLat = 28;
  const maxLat = 38;
  const minLng = -104;
  const maxLng = -93;
  
  const width = 800;
  const height = 500;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
  
  return { x, y };
};

// OKC coordinates
const OKC = projectCoordinates(35.4676, -97.5164);

const WarRoomMap = ({ selectedRealm }: WarRoomMapProps) => {
  const [hoveredMission, setHoveredMission] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const displayedMissions = selectedRealm
    ? missions.filter((m) => m.realmId === selectedRealm.id)
    : missions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono-tactical text-xs text-muted-foreground tracking-widest">
            STRATEGIC OVERVIEW
          </span>
          <h2 className="font-orbitron text-2xl font-bold text-primary tactical-glow">
            WAR ROOM
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-tactical-green" />
            <span className="font-mono-tactical text-xs text-muted-foreground">LOW</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="font-mono-tactical text-xs text-muted-foreground">MED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-tactical-orange" />
            <span className="font-mono-tactical text-xs text-muted-foreground">HIGH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-tactical-red" />
            <span className="font-mono-tactical text-xs text-muted-foreground">EXTREME</span>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="relative border border-primary/30 bg-gradient-to-br from-tactical-dark to-tactical-black overflow-hidden">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-auto"
          style={{ minHeight: "400px" }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="hsl(120 100% 50% / 0.05)"
                strokeWidth="1"
              />
            </pattern>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* State boundaries (simplified) */}
          <g stroke="hsl(120 100% 50% / 0.2)" strokeWidth="1" fill="none">
            {/* Oklahoma outline (simplified) */}
            <path d="M 150 180 L 550 180 L 550 280 L 480 280 L 480 320 L 150 320 Z" />
            {/* Texas partial outline */}
            <path d="M 150 320 L 480 320 L 480 280 L 550 280 L 550 480 L 150 480 Z" />
            {/* Kansas partial */}
            <path d="M 150 100 L 550 100 L 550 180 L 150 180 Z" />
            {/* Arkansas partial */}
            <path d="M 550 180 L 700 180 L 700 350 L 550 350 Z" />
          </g>
          
          {/* State labels */}
          <text x="350" y="250" fill="hsl(120 100% 50% / 0.3)" fontSize="24" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            OKLAHOMA
          </text>
          <text x="350" y="400" fill="hsl(120 100% 50% / 0.3)" fontSize="24" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            TEXAS
          </text>
          <text x="350" y="140" fill="hsl(120 100% 50% / 0.3)" fontSize="18" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            KANSAS
          </text>
          <text x="620" y="270" fill="hsl(120 100% 50% / 0.3)" fontSize="14" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            ARKANSAS
          </text>
          
          {/* Distance rings from OKC */}
          <g filter="url(#glow)">
            <circle cx={OKC.x} cy={OKC.y} r="50" fill="none" stroke="hsl(120 100% 50% / 0.1)" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx={OKC.x} cy={OKC.y} r="100" fill="none" stroke="hsl(120 100% 50% / 0.1)" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx={OKC.x} cy={OKC.y} r="180" fill="none" stroke="hsl(120 100% 50% / 0.1)" strokeWidth="1" strokeDasharray="5,5" />
          </g>
          
          {/* Distance labels */}
          <text x={OKC.x + 55} y={OKC.y - 5} fill="hsl(120 100% 50% / 0.4)" fontSize="8" fontFamily="'Share Tech Mono', monospace">1H</text>
          <text x={OKC.x + 105} y={OKC.y - 5} fill="hsl(120 100% 50% / 0.4)" fontSize="8" fontFamily="'Share Tech Mono', monospace">3H</text>
          <text x={OKC.x + 185} y={OKC.y - 5} fill="hsl(120 100% 50% / 0.4)" fontSize="8" fontFamily="'Share Tech Mono', monospace">6H</text>
          
          {/* OKC HQ marker */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`}>
            {/* HQ hexagon */}
            <polygon
              points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6"
              fill="hsl(120 100% 50%)"
              stroke="hsl(120 100% 50%)"
              strokeWidth="2"
              filter="url(#glow)"
            />
            <text y="4" fill="hsl(0 0% 0%)" fontSize="8" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="bold">
              HQ
            </text>
            <text y="30" fill="hsl(120 100% 50%)" fontSize="10" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
              OKLAHOMA CITY
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
                onClick={() => setSelectedMission(mission)}
              />
            );
          })}
          
          {/* Radar sweep effect */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`}>
            <path
              d="M 0 0 L 0 -200 A 200 200 0 0 1 100 -173.2 Z"
              fill="url(#radarGradient)"
              className="origin-center animate-radar-sweep"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(120 100% 50%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(120 100% 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </g>
        </svg>
        
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary" />
        
        {/* Status overlay */}
        <div className="absolute bottom-4 left-4 font-mono-tactical text-xs text-muted-foreground">
          <div>TARGETS: {displayedMissions.length}</div>
          <div>SECTOR: CENTRAL-US</div>
        </div>
      </div>
      
      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
};

export default WarRoomMap;
