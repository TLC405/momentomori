import { useState, useMemo } from "react";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import { fantasyStatePaths, fantasyRivers, fantasyCities } from "./FantasyStatePaths";
import FantasyMapFilters from "./FantasyMapFilters";
import FantasyTerrainElements from "./FantasyTerrainElements";
import FantasyMissionMarker from "./FantasyMissionMarker";
import FantasyMapHUD from "./FantasyMapHUD";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";

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
    setSelectedMission(mission);
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
      {/* Map Container - Fantasy Parchment Style */}
      <div className="relative w-full h-[60vh] min-h-[550px] overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-[hsl(35,25%,8%)] via-[hsl(30,20%,6%)] to-[hsl(25,15%,5%)] shadow-[0_0_60px_hsl(var(--tactical-amber)/0.15),inset_0_0_100px_hsl(0,0%,0%,0.5)]">
        
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/40 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/40 rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/40 rounded-br-2xl pointer-events-none" />
        
        {/* Atmospheric Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_hsl(38_70%_50%_/_0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_hsl(38_60%_40%_/_0.05)_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_hsl(30_50%_30%_/_0.03)_0%,_transparent_70%)]" />
        
        {/* Subtle paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCoords(null)}
        >
          <FantasyMapFilters />
          
          {/* Parchment background */}
          <rect width="100%" height="100%" fill="url(#parchmentGradient)" />
          
          {/* Vignette effect */}
          <rect width="100%" height="100%" fill="url(#vignette)" />
          
          {/* State backgrounds with fantasy styling */}
          <g id="states">
            {/* Colorado */}
            <path
              d={fantasyStatePaths.colorado.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 40%, 25%)"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* New Mexico */}
            <path
              d={fantasyStatePaths.newMexico.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 40%, 25%)"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Kansas */}
            <path
              d={fantasyStatePaths.kansas.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 50%, 30%)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            
            {/* Missouri */}
            <path
              d={fantasyStatePaths.missouri.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 40%, 25%)"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Arkansas */}
            <path
              d={fantasyStatePaths.arkansas.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 50%, 30%)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            
            {/* Texas */}
            <path
              d={fantasyStatePaths.texas.path}
              fill="url(#stateGradient)"
              stroke="hsl(38, 60%, 35%)"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Oklahoma - Primary focus with golden highlight */}
            <path
              d={fantasyStatePaths.oklahoma.path}
              fill="url(#oklahomaGradient)"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth="2.5"
              filter="url(#territoryGlow)"
            />
            
            {/* Oklahoma decorative inner border */}
            <path
              d={fantasyStatePaths.oklahoma.path}
              fill="none"
              stroke="hsl(38, 80%, 55%)"
              strokeWidth="0.5"
              strokeDasharray="6,4"
              opacity="0.4"
              transform="translate(3, 3)"
            />
          </g>
          
          {/* Rivers - hand-drawn style */}
          <g id="rivers">
            {fantasyRivers.map((river, i) => (
              <g key={i}>
                {/* River glow */}
                <path
                  d={river.path}
                  fill="none"
                  stroke="hsl(200, 60%, 40%)"
                  strokeWidth={river.width + 2}
                  strokeLinecap="round"
                  opacity="0.1"
                />
                {/* Main river */}
                <path
                  d={river.path}
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth={river.width}
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
          
          {/* Terrain elements - mountains, forests */}
          <FantasyTerrainElements animate={true} />
          
          {/* State labels with fantasy typography */}
          <g id="state-labels">
            <g filter="url(#textGlow)">
              <text 
                x={fantasyStatePaths.oklahoma.label.x} 
                y={fantasyStatePaths.oklahoma.label.y} 
                fill="hsl(38, 92%, 55%)" 
                fontSize="18" 
                fontFamily="'Orbitron', serif" 
                textAnchor="middle" 
                fontWeight="700"
                opacity="0.8"
                letterSpacing="6"
              >
                {fantasyStatePaths.oklahoma.fantasyName}
              </text>
              <text 
                x={fantasyStatePaths.oklahoma.label.x} 
                y={fantasyStatePaths.oklahoma.label.y + 14} 
                fill="hsl(38, 70%, 45%)" 
                fontSize="8" 
                fontFamily="'Inter', serif" 
                textAnchor="middle" 
                fontStyle="italic"
                opacity="0.6"
                letterSpacing="2"
              >
                {fantasyStatePaths.oklahoma.fantasySubtitle}
              </text>
            </g>
            
            <text 
              x={fantasyStatePaths.texas.label.x} 
              y={fantasyStatePaths.texas.label.y} 
              fill="hsl(38, 50%, 35%)" 
              fontSize="20" 
              fontFamily="'Orbitron', serif" 
              textAnchor="middle" 
              fontWeight="600"
              letterSpacing="8"
              opacity="0.6"
            >
              {fantasyStatePaths.texas.fantasyName}
            </text>
            
            <text 
              x={fantasyStatePaths.kansas.label.x} 
              y={fantasyStatePaths.kansas.label.y} 
              fill="hsl(38, 40%, 30%)" 
              fontSize="12" 
              fontFamily="'Orbitron', serif" 
              textAnchor="middle" 
              fontWeight="500"
              letterSpacing="4"
              opacity="0.5"
            >
              {fantasyStatePaths.kansas.fantasyName}
            </text>
            
            <text 
              x={fantasyStatePaths.arkansas.label.x} 
              y={fantasyStatePaths.arkansas.label.y} 
              fill="hsl(38, 35%, 28%)" 
              fontSize="10" 
              fontFamily="'Orbitron', serif" 
              textAnchor="middle" 
              fontWeight="500"
              letterSpacing="3"
              opacity="0.45"
            >
              {fantasyStatePaths.arkansas.fantasyName}
            </text>
            
            <text 
              x={fantasyStatePaths.missouri.label.x} 
              y={fantasyStatePaths.missouri.label.y} 
              fill="hsl(38, 30%, 25%)" 
              fontSize="9" 
              fontFamily="'Orbitron', serif" 
              textAnchor="middle" 
              fontWeight="500"
              letterSpacing="2"
              opacity="0.4"
            >
              {fantasyStatePaths.missouri.fantasyName}
            </text>
          </g>
          
          {/* Distance rings from HQ - journey markers */}
          <g id="distance-rings">
            {/* 1 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="35" 
              fill="none" 
              stroke="hsl(38, 70%, 45%)" 
              strokeWidth="1" 
              strokeDasharray="4,6"
              opacity="0.25"
            />
            <text 
              x={OKC.x + 38} 
              y={OKC.y - 5} 
              fill="hsl(38, 60%, 45%)" 
              fontSize="7" 
              fontFamily="'Inter', sans-serif"
              opacity="0.5"
              fontStyle="italic"
            >
              1 day
            </text>
            
            {/* 3 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="90" 
              fill="url(#distanceRing)" 
              stroke="hsl(38, 60%, 40%)" 
              strokeWidth="1" 
              strokeDasharray="6,8"
              opacity="0.2"
            />
            <text 
              x={OKC.x + 93} 
              y={OKC.y - 5} 
              fill="hsl(38, 50%, 40%)" 
              fontSize="7" 
              fontFamily="'Inter', sans-serif"
              opacity="0.4"
              fontStyle="italic"
            >
              3 days
            </text>
            
            {/* 6 hour ring */}
            <circle 
              cx={OKC.x} 
              cy={OKC.y} 
              r="150" 
              fill="none" 
              stroke="hsl(38, 50%, 35%)" 
              strokeWidth="1" 
              strokeDasharray="8,10"
              opacity="0.12"
            />
            <text 
              x={OKC.x + 153} 
              y={OKC.y - 5} 
              fill="hsl(38, 40%, 35%)" 
              fontSize="7" 
              fontFamily="'Inter', sans-serif"
              opacity="0.3"
              fontStyle="italic"
            >
              6 days
            </text>
          </g>
          
          {/* Major cities */}
          <g id="cities">
            {fantasyCities.map(city => {
              const pos = projectCoordinates(city.lat, city.lng);
              const size = city.importance === "major" ? 5 : city.importance === "secondary" ? 4 : 3;
              const opacity = city.importance === "major" ? 0.7 : city.importance === "secondary" ? 0.5 : 0.4;
              
              return (
                <g key={city.name} opacity={opacity}>
                  {/* City glow */}
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={size + 2} 
                    fill="hsl(38, 50%, 40%)"
                    opacity="0.15"
                  />
                  {/* City marker */}
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={size} 
                    fill="hsl(35, 30%, 20%)"
                    stroke="hsl(38, 60%, 45%)"
                    strokeWidth="1"
                  />
                  {/* City symbol */}
                  <text 
                    x={pos.x} 
                    y={pos.y + 3} 
                    fontSize="6" 
                    textAnchor="middle"
                  >
                    {city.symbol}
                  </text>
                  {/* City name */}
                  <text 
                    x={pos.x} 
                    y={pos.y - size - 5} 
                    fill="hsl(38, 50%, 50%)" 
                    fontSize={city.importance === "major" ? "9" : "7"} 
                    fontFamily="'Inter', serif" 
                    textAnchor="middle"
                    fontWeight={city.importance === "major" ? "500" : "400"}
                    fontStyle="italic"
                  >
                    {city.fantasyName}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Connection lines to missions */}
          <g id="connections" opacity="0.1">
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
                  stroke={isHovered ? "hsl(38, 92%, 50%)" : "hsl(38, 50%, 35%)"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray={isHovered ? "none" : "4,8"}
                  opacity={isHovered ? 0.6 : 0.3}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}
          </g>
          
          {/* OKC Headquarters - Fortress design */}
          <g id="hq" transform={`translate(${OKC.x}, ${OKC.y})`}>
            {/* Outer pulse rings */}
            <circle 
              r="30" 
              fill="none" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth="1" 
              className="animate-ping" 
              opacity="0.15" 
            />
            <circle 
              r="22" 
              fill="none" 
              stroke="hsl(38, 80%, 50%)" 
              strokeWidth="0.5" 
              opacity="0.3" 
            />
            
            {/* HQ marker with premium glow */}
            <g filter="url(#hqGlow)">
              {/* Fortress/castle shape */}
              <path
                d="M 0 -16 L 12 -8 L 12 8 L 0 16 L -12 8 L -12 -8 Z"
                fill="hsl(38, 92%, 50%)"
                stroke="hsl(38, 100%, 65%)"
                strokeWidth="2"
              />
              
              {/* Inner keep */}
              <path
                d="M 0 -10 L 7 -5 L 7 5 L 0 10 L -7 5 L -7 -5 Z"
                fill="hsl(25, 80%, 15%)"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth="1"
              />
              
              {/* Fortress symbol */}
              <text 
                y="4" 
                fill="hsl(38, 100%, 60%)" 
                fontSize="10" 
                textAnchor="middle"
              >
                🏰
              </text>
            </g>
            
            {/* HQ Label */}
            <text 
              y="36" 
              fill="hsl(38, 92%, 55%)" 
              fontSize="11" 
              fontFamily="'Orbitron', serif" 
              textAnchor="middle" 
              fontWeight="800"
              letterSpacing="2"
            >
              WAR ROOM HQ
            </text>
            <text 
              y="48" 
              fill="hsl(38, 60%, 40%)" 
              fontSize="7" 
              fontFamily="'Inter', serif" 
              textAnchor="middle"
              fontStyle="italic"
              letterSpacing="1"
            >
              Command Citadel
            </text>
          </g>
          
          {/* Mission markers */}
          <g id="missions">
            {displayedMissions.map((mission) => {
              const pos = projectCoordinates(mission.coordinates.lat, mission.coordinates.lng);
              return (
                <FantasyMissionMarker
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
          
          {/* Subtle radar sweep */}
          <g id="radar" transform={`translate(${OKC.x}, ${OKC.y})`}>
            <path
              d="M 0 0 L 0 -180 A 180 180 0 0 1 90 -156 Z"
              fill="url(#radarSweep)"
              className="origin-center animate-radar-sweep"
              opacity="0.08"
            />
          </g>
          
          {/* Atmosphere overlay */}
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#atmosphereGlow)" 
            style={{ pointerEvents: "none" }}
          />
        </svg>
        
        {/* HUD Elements */}
        <FantasyMapHUD 
          missionCount={displayedMissions.length}
          hoveredCoords={hoveredCoords}
          selectedRealm={selectedRealm?.name}
        />
      </div>
      
      {/* Hover preview panel - parchment style */}
      {hoveredMission && (
        <div className="absolute top-24 right-6 z-10 w-80 bg-gradient-to-br from-[hsl(30,20%,10%)] to-[hsl(25,15%,8%)] backdrop-blur-lg border-2 border-primary/40 rounded-xl shadow-[0_0_40px_hsl(var(--tactical-amber)/0.3)] overflow-hidden animate-scale-in">
          {/* Decorative top border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          {(() => {
            const mission = displayedMissions.find(m => m.id === hoveredMission);
            if (!mission) return null;
            return (
              <>
                <div 
                  className="h-36 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,20%,10%)] via-[hsl(30,20%,10%)/60%] to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-[10px] text-primary/80 font-medium tracking-wider mb-1">
                      "{mission.codename}"
                    </div>
                    <h4 className="font-orbitron text-lg font-bold text-foreground drop-shadow-lg">
                      {mission.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>📍</span>
                    <span>{mission.city}, {mission.state}</span>
                    <span className="text-primary/60">•</span>
                    <span>{mission.distanceFromOKC}h journey</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron text-base text-primary font-bold">
                      {mission.priceEstimate}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: mission.broRating }).map((_, i) => (
                        <span key={i} className="text-sm">🔥</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground text-center">
                    Click to view quest details
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
      
      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onAddToItinerary={onAddToItinerary ? () => onAddToItinerary(selectedMission) : undefined}
          isInItinerary={isInItinerary(selectedMission.id)}
        />
      )}
    </div>
  );
};

export default WarRoomMap;
