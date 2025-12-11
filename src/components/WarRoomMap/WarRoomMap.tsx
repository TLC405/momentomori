import { useState } from "react";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import MapMarker from "./MapMarker";
import MissionDetail from "../MissionDeck/MissionDetail";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  itineraryMissions?: Mission[];
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

// Major cities for map detail
const cities = [
  { name: "Tulsa", lat: 36.1540, lng: -95.9928 },
  { name: "Dallas", lat: 32.7767, lng: -96.7970 },
  { name: "Wichita", lat: 37.6872, lng: -97.3301 },
  { name: "Austin", lat: 30.2672, lng: -97.7431 },
  { name: "Fort Worth", lat: 32.7555, lng: -97.3308 },
];

const WarRoomMap = ({ selectedRealm, onMissionSelect, onAddToItinerary, itineraryMissions = [] }: WarRoomMapProps) => {
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

  const isInItinerary = (missionId: string) => 
    itineraryMissions.some(m => m.id === missionId);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative w-full h-[50vh] min-h-[450px] overflow-hidden rounded-xl border border-border/30 bg-gradient-to-br from-tactical-dark via-tactical-black to-tactical-darker shadow-2xl">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_92%_50%_/_0.05)_0%,_transparent_70%)]" />
        
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Definitions */}
          <defs>
            {/* Hex grid pattern */}
            <pattern id="hexGrid" width="30" height="26" patternUnits="userSpaceOnUse">
              <path
                d="M15 0 L30 7.5 L30 18.5 L15 26 L0 18.5 L0 7.5 Z"
                fill="none"
                stroke="hsl(38 92% 50% / 0.05)"
                strokeWidth="0.5"
              />
            </pattern>
            
            {/* Fine grid pattern */}
            <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="hsl(0 0% 25%)"
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
            
            {/* Glow filter for markers */}
            <filter id="amberGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Radar gradient */}
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
            </linearGradient>
            
            {/* Distance ring gradient */}
            <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
              <stop offset="80%" stopColor="hsl(38 92% 50%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Background layers */}
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
          <rect width="100%" height="100%" fill="url(#fineGrid)" />
          
          {/* State outlines with glow */}
          <g stroke="hsl(38 92% 50% / 0.12)" strokeWidth="1.5" fill="hsl(38 92% 50% / 0.02)">
            {/* Oklahoma */}
            <path d="M 150 140 L 550 140 L 550 220 L 480 220 L 480 260 L 150 260 Z" />
            {/* Texas */}
            <path d="M 150 260 L 480 260 L 480 220 L 550 220 L 550 380 L 150 380 Z" />
            {/* Kansas */}
            <path d="M 150 60 L 550 60 L 550 140 L 150 140 Z" />
            {/* Arkansas */}
            <path d="M 550 140 L 700 140 L 700 280 L 550 280 Z" />
          </g>
          
          {/* State labels */}
          <text x="350" y="195" fill="hsl(38 92% 50% / 0.4)" fontSize="24" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="700">
            OKLAHOMA
          </text>
          <text x="350" y="330" fill="hsl(0 0% 30%)" fontSize="24" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="700">
            TEXAS
          </text>
          <text x="350" y="100" fill="hsl(0 0% 25%)" fontSize="16" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            KANSAS
          </text>
          <text x="620" y="210" fill="hsl(0 0% 25%)" fontSize="14" fontFamily="'Orbitron', sans-serif" textAnchor="middle">
            ARK
          </text>
          
          {/* Distance rings from OKC with labels */}
          <g>
            {/* 1 hour */}
            <circle cx={OKC.x} cy={OKC.y} r="35" fill="url(#ringGradient)" stroke="hsl(38 92% 50% / 0.25)" strokeWidth="1" strokeDasharray="4,4" />
            <text x={OKC.x + 38} y={OKC.y - 5} fill="hsl(38 92% 50% / 0.5)" fontSize="8" fontFamily="'Orbitron', sans-serif">1H</text>
            
            {/* 3 hours */}
            <circle cx={OKC.x} cy={OKC.y} r="85" fill="none" stroke="hsl(38 92% 50% / 0.2)" strokeWidth="1" strokeDasharray="6,4" />
            <text x={OKC.x + 88} y={OKC.y - 5} fill="hsl(38 92% 50% / 0.4)" fontSize="8" fontFamily="'Orbitron', sans-serif">3H</text>
            
            {/* 6 hours */}
            <circle cx={OKC.x} cy={OKC.y} r="150" fill="none" stroke="hsl(38 92% 50% / 0.15)" strokeWidth="1" strokeDasharray="8,4" />
            <text x={OKC.x + 153} y={OKC.y - 5} fill="hsl(38 92% 50% / 0.3)" fontSize="8" fontFamily="'Orbitron', sans-serif">6H</text>
          </g>
          
          {/* Major cities */}
          {cities.map(city => {
            const pos = projectCoordinates(city.lat, city.lng);
            return (
              <g key={city.name} opacity="0.5">
                <circle cx={pos.x} cy={pos.y} r="3" fill="hsl(0 0% 50%)" />
                <text x={pos.x} y={pos.y - 8} fill="hsl(0 0% 50%)" fontSize="9" fontFamily="'Inter', sans-serif" textAnchor="middle">
                  {city.name}
                </text>
              </g>
            );
          })}
          
          {/* OKC HQ marker */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`} filter="url(#strongGlow)">
            {/* Pulsing ring */}
            <circle r="20" fill="none" stroke="hsl(38 92% 50%)" strokeWidth="1" className="animate-ping" opacity="0.3" />
            
            {/* Main hexagon */}
            <polygon
              points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6"
              fill="hsl(38 92% 50%)"
              stroke="hsl(38 100% 60%)"
              strokeWidth="2"
            />
            <text y="4" fill="hsl(0 0% 5%)" fontSize="7" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="bold">
              HQ
            </text>
            <text y="28" fill="hsl(38 92% 50%)" fontSize="10" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="600">
              OKLAHOMA CITY
            </text>
          </g>
          
          {/* Connection lines to missions */}
          {displayedMissions.slice(0, 8).map((mission) => {
            const pos = projectCoordinates(mission.coordinates.lat, mission.coordinates.lng);
            return (
              <line
                key={`line-${mission.id}`}
                x1={OKC.x}
                y1={OKC.y}
                x2={pos.x}
                y2={pos.y}
                stroke="hsl(38 92% 50% / 0.08)"
                strokeWidth="1"
                strokeDasharray="4,8"
              />
            );
          })}
          
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
                isInItinerary={isInItinerary(mission.id)}
                onHover={() => setHoveredMission(mission.id)}
                onLeave={() => setHoveredMission(null)}
                onClick={() => handleMissionClick(mission)}
                onAddToItinerary={() => onAddToItinerary?.(mission)}
              />
            );
          })}
          
          {/* Radar sweep */}
          <g transform={`translate(${OKC.x}, ${OKC.y})`}>
            <path
              d="M 0 0 L 0 -170 A 170 170 0 0 1 85 -147.2 Z"
              fill="url(#radarGradient)"
              className="origin-center animate-radar-sweep"
              opacity="0.15"
            />
          </g>
        </svg>
        
        {/* Map Title */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="font-orbitron text-sm text-primary font-semibold tracking-wider">TACTICAL OVERVIEW</span>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-border/50 shadow-lg">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full danger-bg-low" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full danger-bg-medium" />
            <span className="text-xs text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full danger-bg-high" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full danger-bg-extreme" />
            <span className="text-xs text-muted-foreground">Extreme</span>
          </div>
        </div>
        
        {/* Mission count */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-border/50 shadow-lg">
          <span className="text-xs text-muted-foreground">Active Missions: </span>
          <span className="font-orbitron text-sm text-primary font-bold">{displayedMissions.length}</span>
        </div>
      </div>
      
      {/* Hover tooltip */}
      {hoveredMission && (
        <div className="absolute top-4 right-4 z-10 w-64 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden animate-fade-in">
          {(() => {
            const mission = displayedMissions.find(m => m.id === hoveredMission);
            if (!mission) return null;
            return (
              <>
                <div 
                  className="h-24 bg-cover bg-center"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                />
                <div className="p-3">
                  <h4 className="font-orbitron text-sm font-bold text-foreground">{mission.name}</h4>
                  <p className="text-xs text-muted-foreground">{mission.city}, {mission.state} • {mission.distanceFromOKC}h</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary font-semibold">{mission.priceEstimate}</span>
                    <span className="text-xs">{"🔥".repeat(mission.broRating)}</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
      
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
