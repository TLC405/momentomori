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
    
    const lng = -105 + (x / 800) * (-91 - -105);
    const lat = 28 + ((400 - y) / 400) * (39 - 28);
    
    setHoveredCoords({ lat, lng });
  };

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-[hsl(35,25%,8%)] via-[hsl(30,20%,6%)] to-[hsl(25,15%,5%)] shadow-[0_0_60px_hsl(var(--tactical-amber)/0.15),inset_0_0_100px_hsl(0,0%,0%,0.5)]">
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-2xl pointer-events-none" />
        
        {/* Atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_hsl(38_50%_40%_/_0.05)_0%,_transparent_60%)]" />
        
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
          
          {/* Apply parchment texture over background */}
          <rect width="100%" height="100%" filter="url(#parchmentTexture)" opacity="0.6" />
          
          {/* Vignette */}
          <rect width="100%" height="100%" fill="url(#vignette)" />
          
          {/* State backgrounds with hand-drawn inner borders */}
          <g id="states">
            {/* Colorado */}
            <path d={fantasyStatePaths.colorado.path} fill="url(#stateGradient)" stroke="hsl(38, 30%, 20%)" strokeWidth="0.8" opacity="0.3" />
            
            {/* New Mexico */}
            <path d={fantasyStatePaths.newMexico.path} fill="url(#stateGradient)" stroke="hsl(38, 30%, 20%)" strokeWidth="0.8" opacity="0.3" />
            
            {/* Kansas */}
            <path d={fantasyStatePaths.kansas.path} fill="url(#stateGradient)" stroke="hsl(38, 35%, 22%)" strokeWidth="0.8" opacity="0.35" />
            
            {/* Missouri */}
            <path d={fantasyStatePaths.missouri.path} fill="url(#stateGradient)" stroke="hsl(38, 30%, 20%)" strokeWidth="0.8" opacity="0.3" />
            
            {/* Arkansas */}
            <path d={fantasyStatePaths.arkansas.path} fill="url(#stateGradient)" stroke="hsl(38, 35%, 22%)" strokeWidth="0.8" opacity="0.35" />
            
            {/* Texas */}
            <path d={fantasyStatePaths.texas.path} fill="url(#stateGradient)" stroke="hsl(38, 40%, 25%)" strokeWidth="1.2" opacity="0.4" />
            
            {/* Oklahoma - Primary with inner path for depth */}
            <path d={fantasyStatePaths.oklahoma.path} fill="url(#oklahomaGradient)" stroke="hsl(38, 80%, 45%)" strokeWidth="2" filter="url(#territoryGlow)" />
            <path d={fantasyStatePaths.oklahoma.innerPath} fill="none" stroke="hsl(38, 60%, 35%)" strokeWidth="0.5" strokeDasharray="4,3" opacity="0.4" />
          </g>
          
          {/* Hand-drawn border hatching along state borders */}
          <g id="border-hatching" opacity="0.15">
            <path d={fantasyStatePaths.oklahoma.path} fill="url(#handDrawnBorder)" stroke="none" opacity="0.3" />
          </g>
          
          {/* Rivers with tributaries */}
          <g id="rivers" opacity="0.4">
            {fantasyRivers.map((river, i) => (
              <g key={i}>
                <path
                  d={river.path}
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth={river.width * 0.8}
                  strokeLinecap="round"
                  opacity={river.importance === "major" ? 0.6 : 0.35}
                />
                {/* Tributaries */}
                {river.tributaries?.map((trib, j) => (
                  <path
                    key={j}
                    d={trib}
                    fill="none"
                    stroke="url(#riverGradient)"
                    strokeWidth={river.width * 0.4}
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                ))}
                {/* River name label */}
                {river.importance === "major" && (
                  <text opacity="0.3" fontSize="5" fill="hsl(200, 50%, 50%)" fontFamily="'Times New Roman', serif" fontStyle="italic">
                    <textPath href={`#river-path-${i}`} startOffset="30%">
                      {river.fantasyName}
                    </textPath>
                  </text>
                )}
                <path id={`river-path-${i}`} d={river.path} fill="none" stroke="none" />
              </g>
            ))}
          </g>
          
          {/* === TERRAIN ELEMENTS - Mountains, Forests, Lakes, Creatures === */}
          <FantasyTerrainElements animate={true} />
          
          {/* Fantasy state labels with titles */}
          <g id="state-labels">
            {/* Oklahoma - primary label */}
            <text x={fantasyStatePaths.oklahoma.label.x} y={fantasyStatePaths.oklahoma.label.y - 8} fill="hsl(38, 70%, 50%)" fontSize="14" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="700" opacity="0.5" letterSpacing="6" filter="url(#textGlow)">
              {fantasyStatePaths.oklahoma.fantasyName}
            </text>
            <text x={fantasyStatePaths.oklahoma.label.x} y={fantasyStatePaths.oklahoma.label.y + 6} fill="hsl(38, 50%, 40%)" fontSize="6" fontFamily="'Times New Roman', serif" textAnchor="middle" fontStyle="italic" opacity="0.4" letterSpacing="2">
              {fantasyStatePaths.oklahoma.fantasySubtitle}
            </text>
            
            {/* Texas */}
            <text x={fantasyStatePaths.texas.label.x} y={fantasyStatePaths.texas.label.y - 5} fill="hsl(38, 40%, 35%)" fontSize="16" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="600" opacity="0.3" letterSpacing="8">
              {fantasyStatePaths.texas.fantasyName}
            </text>
            <text x={fantasyStatePaths.texas.label.x} y={fantasyStatePaths.texas.label.y + 8} fill="hsl(38, 30%, 30%)" fontSize="5" fontFamily="'Times New Roman', serif" textAnchor="middle" fontStyle="italic" opacity="0.25" letterSpacing="1">
              {fantasyStatePaths.texas.fantasySubtitle}
            </text>
            
            {/* Kansas */}
            <text x={fantasyStatePaths.kansas.label.x} y={fantasyStatePaths.kansas.label.y} fill="hsl(38, 35%, 30%)" fontSize="11" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="500" letterSpacing="5" opacity="0.3">
              {fantasyStatePaths.kansas.fantasyName}
            </text>
            
            {/* Arkansas */}
            <text x={fantasyStatePaths.arkansas.label.x} y={fantasyStatePaths.arkansas.label.y} fill="hsl(38, 30%, 28%)" fontSize="9" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="500" letterSpacing="3" opacity="0.25">
              {fantasyStatePaths.arkansas.fantasyName}
            </text>
            
            {/* Missouri */}
            <text x={fantasyStatePaths.missouri.label.x} y={fantasyStatePaths.missouri.label.y} fill="hsl(38, 30%, 28%)" fontSize="9" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="500" letterSpacing="3" opacity="0.25">
              {fantasyStatePaths.missouri.fantasyName}
            </text>
            
            {/* Colorado */}
            <text x={fantasyStatePaths.colorado.label.x} y={fantasyStatePaths.colorado.label.y} fill="hsl(38, 25%, 25%)" fontSize="8" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="500" letterSpacing="2" opacity="0.2">
              COLORADO
            </text>
            
            {/* New Mexico */}
            <text x={fantasyStatePaths.newMexico.label.x} y={fantasyStatePaths.newMexico.label.y} fill="hsl(38, 25%, 25%)" fontSize="7" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="500" letterSpacing="2" opacity="0.2">
              NEW MEXICO
            </text>
          </g>
          
          {/* Fantasy Cities */}
          <g id="cities">
            {fantasyCities.map((city, i) => {
              const pos = projectCoordinates(city.lat, city.lng);
              const isMetropolis = city.population === "metropolis";
              const isLarge = city.population === "large";
              return (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                  {/* City marker */}
                  {isMetropolis && (
                    <>
                      <circle r="6" fill="none" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" opacity="0.4" />
                      <rect x="-4" y="-4" width="8" height="8" fill="hsl(30, 25%, 15%)" stroke="hsl(38, 60%, 45%)" strokeWidth="1" rx="1" opacity="0.7" />
                    </>
                  )}
                  {isLarge && !isMetropolis && (
                    <circle r="3" fill="hsl(30, 20%, 18%)" stroke="hsl(38, 50%, 40%)" strokeWidth="0.8" opacity="0.6" />
                  )}
                  {!isLarge && !isMetropolis && (
                    <circle r="2" fill="hsl(30, 15%, 20%)" stroke="hsl(38, 40%, 35%)" strokeWidth="0.5" opacity="0.5" />
                  )}
                  {/* City name */}
                  <text
                    x={city.importance === "major" ? 0 : 5}
                    y={city.importance === "major" ? -9 : -5}
                    fill={city.importance === "major" ? "hsl(38, 60%, 50%)" : "hsl(38, 40%, 40%)"}
                    fontSize={city.importance === "major" ? "7" : "5.5"}
                    fontFamily={city.importance === "major" ? "'Orbitron', sans-serif" : "'Inter', sans-serif"}
                    textAnchor={city.importance === "major" ? "middle" : "start"}
                    fontWeight={city.importance === "major" ? "600" : "400"}
                    opacity={city.importance === "major" ? 0.7 : 0.45}
                    letterSpacing={city.importance === "major" ? "1" : "0"}
                  >
                    {city.fantasyName}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Distance rings from HQ */}
          <g id="distance-rings" opacity="0.15">
            {[
              { r: 35, label: "1hr" },
              { r: 90, label: "3hr" },
              { r: 150, label: "6hr" },
            ].map((ring, i) => (
              <g key={i}>
                <circle cx={OKC.x} cy={OKC.y} r={ring.r} fill="none" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" strokeDasharray="3,5" />
                <text x={OKC.x + ring.r + 3} y={OKC.y - 3} fill="hsl(38, 40%, 40%)" fontSize="5" fontFamily="'Inter', sans-serif" opacity="0.6">
                  {ring.label}
                </text>
              </g>
            ))}
          </g>
          
          {/* OKC Headquarters */}
          <g id="hq" transform={`translate(${OKC.x}, ${OKC.y})`}>
            <circle r="20" fill="none" stroke="hsl(38, 80%, 50%)" strokeWidth="1" className="animate-ping" opacity="0.1" />
            <g filter="url(#hqGlow)">
              <path d="M 0 -12 L 9 -5 L 9 5 L 0 12 L -9 5 L -9 -5 Z" fill="hsl(38, 85%, 50%)" stroke="hsl(38, 100%, 60%)" strokeWidth="1.5" />
              <path d="M 0 -7 L 5 -3 L 5 3 L 0 7 L -5 3 L -5 -3 Z" fill="hsl(25, 70%, 15%)" stroke="hsl(38, 85%, 50%)" strokeWidth="0.5" />
              <text y="3" fill="hsl(38, 100%, 60%)" fontSize="8" textAnchor="middle">🏰</text>
            </g>
            <text y="22" fill="hsl(38, 85%, 55%)" fontSize="8" fontFamily="'Orbitron', serif" textAnchor="middle" fontWeight="700" letterSpacing="2">
              OKC HQ
            </text>
            <text y="30" fill="hsl(38, 50%, 40%)" fontSize="5" fontFamily="'Times New Roman', serif" textAnchor="middle" fontStyle="italic" opacity="0.5">
              Command Center
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
          
          {/* Atmosphere overlay */}
          <rect width="100%" height="100%" fill="url(#atmosphereGlow)" style={{ pointerEvents: "none" }} />
        </svg>
        
        {/* HUD */}
        <FantasyMapHUD 
          missionCount={displayedMissions.length}
          hoveredCoords={hoveredCoords}
          selectedRealm={selectedRealm?.name}
        />
      </div>
      
      {/* Hover preview panel */}
      {hoveredMission && (
        <div className="absolute top-20 right-4 z-10 w-72 bg-gradient-to-br from-[hsl(30,20%,10%)] to-[hsl(25,15%,8%)] backdrop-blur-lg border border-primary/30 rounded-xl shadow-[0_0_30px_hsl(var(--tactical-amber)/0.2)] overflow-hidden animate-scale-in">
          {(() => {
            const mission = displayedMissions.find(m => m.id === hoveredMission);
            if (!mission) return null;
            return (
              <>
                <div 
                  className="h-28 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,20%,10%)] via-[hsl(30,20%,10%)/50%] to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="font-orbitron text-sm font-bold text-foreground drop-shadow-lg">
                      {mission.name}
                    </h4>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>📍</span>
                    <span>{mission.city}, {mission.state}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron text-sm text-primary font-bold">
                      {mission.priceEstimate}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: mission.broRating }).map((_, i) => (
                        <span key={i} className="text-xs">🔥</span>
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
