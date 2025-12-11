import { useState, useMemo } from "react";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import { statePaths, majorCities, rivers } from "./StatePaths";
import MapFilters from "./MapFilters";
import MissionPin from "./MissionPin";
import MapHUD from "./MapHUD";
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
  const maxLat = 39;
  const minLng = -105;
  const maxLng = -91;
  
  const width = 800;
  const height = 400;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
  
  return { x, y };
};

const OKC = projectCoordinates(35.4676, -97.5164);

const WarRoomMap = ({ selectedRealm, onMissionSelect, onAddToItinerary, itineraryMissions = [] }: WarRoomMapProps) => {
  const [hoveredMission, setHoveredMission] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [hoveredCoords, setHoveredCoords] = useState<{ lat: number; lng: number } | null>(null);
  
  const displayedMissions = useMemo(() => 
    selectedRealm
      ? missions.filter((m) => m.realmId === selectedRealm.id)
      : missions,
    [selectedRealm]
  );

  const handleMissionClick = (mission: Mission) => {
    if (onMissionSelect) {
      onMissionSelect(mission);
    } else {
      setSelectedMission(mission);
    }
  };

  const isInItinerary = (missionId: string) => 
    itineraryMissions.some(m => m.id === missionId);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 400;
    
    // Reverse projection
    const lng = -105 + (x / 800) * (-91 - -105);
    const lat = 28 + ((400 - y) / 400) * (39 - 28);
    
    setHoveredCoords({ lat, lng });
  };

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative w-full h-[55vh] min-h-[500px] overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-tactical-dark via-tactical-black to-tactical-darker shadow-2xl">
        
        {/* Atmospheric Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_hsl(38_92%_50%_/_0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,_hsl(38_92%_50%_/_0.04)_0%,_transparent_40%)]" />
        
        {/* Scanlines overlay - very subtle */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(0, 0%, 100%) 2px,
              hsl(0, 0%, 100%) 3px
            )`
          }}
        />
        
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCoords(null)}
        >
          <MapFilters />
          
          {/* Background grid */}
          <rect width="100%" height="100%" fill="url(#tacticalGrid)" />
          
          {/* Vignette effect */}
          <rect width="100%" height="100%" fill="url(#vignette)" />
          
          {/* State backgrounds with premium styling */}
          <g id="states">
            {/* Colorado */}
            <path
              d={statePaths.colorado.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 25%)"
              strokeWidth="1"
              opacity="0.6"
            />
            
            {/* New Mexico */}
            <path
              d={statePaths.newMexico.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 25%)"
              strokeWidth="1"
              opacity="0.6"
            />
            
            {/* Kansas */}
            <path
              d={statePaths.kansas.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 30%)"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Missouri */}
            <path
              d={statePaths.missouri.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 25%)"
              strokeWidth="1"
              opacity="0.6"
            />
            
            {/* Arkansas */}
            <path
              d={statePaths.arkansas.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 30%)"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Texas */}
            <path
              d={statePaths.texas.path}
              fill="url(#stateGradient)"
              stroke="hsl(0, 0%, 35%)"
              strokeWidth="2"
              opacity="0.8"
            />
            
            {/* Oklahoma - Primary focus with highlight */}
            <path
              d={statePaths.oklahoma.path}
              fill="url(#oklahomaGradient)"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth="2"
              filter="url(#innerShadow)"
            />
            
            {/* Oklahoma inner glow line */}
            <path
              d={statePaths.oklahoma.path}
              fill="none"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth="0.5"
              strokeDasharray="4,8"
              opacity="0.5"
              transform="translate(2, 2)"
            />
          </g>
          
          {/* Rivers for terrain detail */}
          <g id="rivers" opacity="0.15">
            {rivers.map((river, i) => (
              <path
                key={i}
                d={river.path}
                fill="none"
                stroke="hsl(200, 60%, 40%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </g>
          
          {/* State labels with premium typography */}
          <g id="state-labels">
            <text 
              x={statePaths.oklahoma.label.x} 
              y={statePaths.oklahoma.label.y} 
              fill="hsl(38, 92%, 50%)" 
              fontSize="20" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="800"
              opacity="0.6"
              letterSpacing="8"
            >
              OKLAHOMA
            </text>
            
            <text 
              x={statePaths.texas.label.x} 
              y={statePaths.texas.label.y} 
              fill="hsl(0, 0%, 35%)" 
              fontSize="22" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="700"
              letterSpacing="10"
            >
              TEXAS
            </text>
            
            <text 
              x={statePaths.kansas.label.x} 
              y={statePaths.kansas.label.y} 
              fill="hsl(0, 0%, 30%)" 
              fontSize="14" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="6"
            >
              KANSAS
            </text>
            
            <text 
              x={statePaths.arkansas.label.x} 
              y={statePaths.arkansas.label.y} 
              fill="hsl(0, 0%, 28%)" 
              fontSize="12" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="4"
            >
              ARKANSAS
            </text>
            
            <text 
              x={statePaths.missouri.label.x} 
              y={statePaths.missouri.label.y} 
              fill="hsl(0, 0%, 25%)" 
              fontSize="10" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="3"
            >
              MISSOURI
            </text>
            
            <text 
              x={statePaths.colorado.label.x} 
              y={statePaths.colorado.label.y} 
              fill="hsl(0, 0%, 22%)" 
              fontSize="9" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="2"
            >
              CO
            </text>
            
            <text 
              x={statePaths.newMexico.label.x} 
              y={statePaths.newMexico.label.y} 
              fill="hsl(0, 0%, 22%)" 
              fontSize="9" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="2"
            >
              NM
            </text>
          </g>
          
          {/* Distance rings from OKC */}
          <g id="distance-rings">
            {/* 1 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="30" 
              fill="none" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="1" 
              strokeDasharray="3,6"
              opacity="0.3"
            />
            <text 
              x={OKC.x + 33} 
              y={OKC.y - 3} 
              fill="hsl(38, 92%, 50%)" 
              fontSize="7" 
              fontFamily="'Orbitron', sans-serif"
              opacity="0.5"
            >
              1H
            </text>
            
            {/* 3 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="80" 
              fill="url(#distanceRing)" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="1" 
              strokeDasharray="5,8"
              opacity="0.25"
            />
            <text 
              x={OKC.x + 83} 
              y={OKC.y - 3} 
              fill="hsl(38, 92%, 50%)" 
              fontSize="7" 
              fontFamily="'Orbitron', sans-serif"
              opacity="0.4"
            >
              3H
            </text>
            
            {/* 6 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="140" 
              fill="none" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="1" 
              strokeDasharray="8,10"
              opacity="0.15"
            />
            <text 
              x={OKC.x + 143} 
              y={OKC.y - 3} 
              fill="hsl(38, 92%, 50%)" 
              fontSize="7" 
              fontFamily="'Orbitron', sans-serif"
              opacity="0.3"
            >
              6H
            </text>
          </g>
          
          {/* Major cities */}
          <g id="cities">
            {majorCities.map(city => {
              const pos = projectCoordinates(city.lat, city.lng);
              const size = city.importance === "major" ? 4 : city.importance === "secondary" ? 3 : 2;
              const opacity = city.importance === "major" ? 0.6 : city.importance === "secondary" ? 0.4 : 0.3;
              
              return (
                <g key={city.name} opacity={opacity}>
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={size} 
                    fill="hsl(0, 0%, 50%)"
                    stroke="hsl(0, 0%, 30%)"
                    strokeWidth="1"
                  />
                  <text 
                    x={pos.x} 
                    y={pos.y - size - 4} 
                    fill="hsl(0, 0%, 55%)" 
                    fontSize={city.importance === "major" ? "9" : "7"} 
                    fontFamily="'Inter', sans-serif" 
                    textAnchor="middle"
                    fontWeight={city.importance === "major" ? "500" : "400"}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Connection lines to missions */}
          <g id="connections" opacity="0.15">
            {displayedMissions.map((mission) => {
              const pos = projectCoordinates(mission.coordinates.lat, mission.coordinates.lng);
              const isHovered = hoveredMission === mission.id;
              
              return (
                <line
                  key={`line-${mission.id}`}
                  x1={OKC.x}
                  y1={OKC.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isHovered ? "hsl(38, 92%, 50%)" : "url(#connectionLine)"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray={isHovered ? "none" : "4,8"}
                  opacity={isHovered ? 0.8 : 0.4}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}
          </g>
          
          {/* OKC Headquarters - Premium design */}
          <g id="hq" transform={`translate(${OKC.x}, ${OKC.y})`}>
            {/* Outer pulse rings */}
            <circle 
              r="25" 
              fill="none" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="1" 
              className="animate-ping" 
              opacity="0.2" 
            />
            <circle 
              r="18" 
              fill="none" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="0.5" 
              opacity="0.4" 
            />
            
            {/* HQ marker with glow */}
            <g filter="url(#hqGlow)">
              {/* Hexagon background */}
              <polygon
                points="0,-14 12.1,-7 12.1,7 0,14 -12.1,7 -12.1,-7"
                fill="hsl(38, 92%, 50%)"
                stroke="hsl(38, 100%, 65%)"
                strokeWidth="2"
              />
              
              {/* Inner hexagon */}
              <polygon
                points="0,-9 7.8,-4.5 7.8,4.5 0,9 -7.8,4.5 -7.8,-4.5"
                fill="hsl(0, 0%, 5%)"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth="1"
              />
              
              {/* HQ text */}
              <text 
                y="3" 
                fill="hsl(38, 92%, 50%)" 
                fontSize="8" 
                fontFamily="'Orbitron', sans-serif" 
                textAnchor="middle" 
                fontWeight="900"
              >
                HQ
              </text>
            </g>
            
            {/* City label */}
            <text 
              y="32" 
              fill="hsl(38, 92%, 50%)" 
              fontSize="10" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle" 
              fontWeight="700"
              letterSpacing="1"
            >
              OKLAHOMA CITY
            </text>
            <text 
              y="44" 
              fill="hsl(0, 0%, 50%)" 
              fontSize="7" 
              fontFamily="'Orbitron', sans-serif" 
              textAnchor="middle"
              letterSpacing="3"
            >
              COMMAND CENTER
            </text>
          </g>
          
          {/* Mission pins */}
          <g id="missions">
            {displayedMissions.map((mission) => {
              const pos = projectCoordinates(mission.coordinates.lat, mission.coordinates.lng);
              return (
                <MissionPin
                  key={mission.id}
                  mission={mission}
                  x={pos.x}
                  y={pos.y}
                  isHovered={hoveredMission === mission.id}
                  isInItinerary={isInItinerary(mission.id)}
                  onHover={() => setHoveredMission(mission.id)}
                  onLeave={() => setHoveredMission(null)}
                  onClick={() => handleMissionClick(mission)}
                />
              );
            })}
          </g>
          
          {/* Radar sweep animation */}
          <g id="radar" transform={`translate(${OKC.x}, ${OKC.y})`}>
            <path
              d="M 0 0 L 0 -160 A 160 160 0 0 1 80 -138.6 Z"
              fill="url(#radarSweep)"
              className="origin-center animate-radar-sweep"
              opacity="0.12"
            />
          </g>
          
          {/* Atmosphere glow overlay */}
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#atmosphereGlow)" 
            style={{ pointerEvents: "none" }}
          />
        </svg>
        
        {/* HUD Elements */}
        <MapHUD 
          missionCount={displayedMissions.length}
          hoveredCoords={hoveredCoords}
          selectedRealm={selectedRealm?.name}
        />
      </div>
      
      {/* Hover preview panel */}
      {hoveredMission && (
        <div className="absolute top-20 right-4 z-10 w-72 bg-card/98 backdrop-blur-lg border border-primary/30 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
          {(() => {
            const mission = displayedMissions.find(m => m.id === hoveredMission);
            if (!mission) return null;
            return (
              <>
                <div 
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-orbitron text-base font-bold text-foreground drop-shadow-lg">
                      {mission.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {mission.city}, {mission.state} • {mission.distanceFromOKC}h drive
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron text-sm text-primary font-semibold">
                      {mission.priceEstimate}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: mission.broRating }).map((_, i) => (
                        <span key={i} className="text-sm">🔥</span>
                      ))}
                    </div>
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