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

const projectCoordinates = (lat: number, lng: number) => {
  const minLat = 28, maxLat = 39, minLng = -105, maxLng = -91;
  const width = 800, height = 400;
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
    selectedRealm ? missions.filter((m) => m.realmId === selectedRealm.id) : missions,
    [selectedRealm]
  );

  const handleMissionClick = (mission: Mission) => setSelectedMission(mission);
  const isInItinerary = (missionId: string) => itineraryMissions.some(m => m.id === missionId);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 400;
    const lng = -105 + (x / 800) * 14;
    const lat = 28 + ((400 - y) / 400) * 11;
    setHoveredCoords({ lat, lng });
  };

  return (
    <div className="relative w-full">
      {/* Map Container — warm parchment/cream style */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden rounded-2xl border border-[hsl(33,25%,72%)] bg-[hsl(40,30%,85%)] shadow-[0_4px_24px_hsl(33,20%,30%,0.12)]">
        
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-l border-t border-[hsl(33,30%,60%)] rounded-tl-2xl pointer-events-none opacity-40" />
        <div className="absolute top-0 right-0 w-10 h-10 border-r border-t border-[hsl(33,30%,60%)] rounded-tr-2xl pointer-events-none opacity-40" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-l border-b border-[hsl(33,30%,60%)] rounded-bl-2xl pointer-events-none opacity-40" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-[hsl(33,30%,60%)] rounded-br-2xl pointer-events-none opacity-40" />
        
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCoords(null)}
        >
          <FantasyMapFilters />
          
          {/* Cream/tan background */}
          <rect width="100%" height="100%" fill="url(#parchmentGradient)" />
          
          {/* Subtle paper grain */}
          <rect width="100%" height="100%" filter="url(#parchmentTexture)" opacity="0.5" />

          {/* Topographic contour pattern overlay */}
          <rect width="100%" height="100%" fill="url(#topoPattern)" opacity="0.35" />
          
          {/* Soft vignette */}
          <rect width="100%" height="100%" fill="url(#vignette)" />
          
          {/* State regions */}
          <g id="states">
            <path d={fantasyStatePaths.colorado.path} fill="url(#stateGradient)" stroke="hsl(33, 25%, 62%)" strokeWidth="0.8" opacity="0.35" />
            <path d={fantasyStatePaths.newMexico.path} fill="url(#stateGradient)" stroke="hsl(33, 25%, 62%)" strokeWidth="0.8" opacity="0.35" />
            <path d={fantasyStatePaths.kansas.path} fill="url(#stateGradient)" stroke="hsl(33, 28%, 60%)" strokeWidth="0.8" opacity="0.4" />
            <path d={fantasyStatePaths.missouri.path} fill="url(#stateGradient)" stroke="hsl(33, 25%, 62%)" strokeWidth="0.8" opacity="0.35" />
            <path d={fantasyStatePaths.arkansas.path} fill="url(#stateGradient)" stroke="hsl(33, 28%, 60%)" strokeWidth="0.8" opacity="0.4" />
            <path d={fantasyStatePaths.texas.path} fill="url(#stateGradient)" stroke="hsl(33, 30%, 58%)" strokeWidth="1" opacity="0.4" />
            
            {/* Oklahoma — highlighted */}
            <path d={fantasyStatePaths.oklahoma.path} fill="url(#oklahomaGradient)" stroke="hsl(33, 40%, 48%)" strokeWidth="1.5" filter="url(#territoryGlow)" />
            <path d={fantasyStatePaths.oklahoma.innerPath} fill="none" stroke="hsl(33, 30%, 55%)" strokeWidth="0.4" strokeDasharray="6,4" opacity="0.3" />
          </g>
          
          {/* Rivers */}
          <g id="rivers" opacity="0.5">
            {fantasyRivers.map((river, i) => (
              <g key={i}>
                <path d={river.path} fill="none" stroke="url(#riverGradient)" strokeWidth={river.width * 0.7} strokeLinecap="round" opacity={river.importance === "major" ? 0.7 : 0.4} />
                {river.tributaries?.map((trib, j) => (
                  <path key={j} d={trib} fill="none" stroke="url(#riverGradient)" strokeWidth={river.width * 0.35} strokeLinecap="round" opacity="0.35" />
                ))}
                {river.importance === "major" && (
                  <text opacity="0.35" fontSize="4.5" fill="hsl(210, 40%, 45%)" fontFamily="'Playfair Display', serif" fontStyle="italic">
                    <textPath href={`#river-path-${i}`} startOffset="35%">{river.name}</textPath>
                  </text>
                )}
                <path id={`river-path-${i}`} d={river.path} fill="none" stroke="none" />
              </g>
            ))}
          </g>
          
          {/* Terrain */}
          <FantasyTerrainElements animate={true} />
          
          {/* State labels — cartographic serif style */}
          <g id="state-labels">
            <text x={fantasyStatePaths.oklahoma.label.x} y={fantasyStatePaths.oklahoma.label.y - 6} fill="hsl(33, 40%, 38%)" fontSize="13" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="700" opacity="0.55" letterSpacing="5" filter="url(#textGlow)">
              OKLAHOMA
            </text>
            <text x={fantasyStatePaths.oklahoma.label.x} y={fantasyStatePaths.oklahoma.label.y + 6} fill="hsl(33, 25%, 48%)" fontSize="5.5" fontFamily="'Playfair Display', serif" textAnchor="middle" fontStyle="italic" opacity="0.4" letterSpacing="1.5">
              The Heartlands
            </text>
            
            <text x={fantasyStatePaths.texas.label.x} y={fantasyStatePaths.texas.label.y - 3} fill="hsl(33, 28%, 45%)" fontSize="14" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="600" opacity="0.3" letterSpacing="7">
              TEXAS
            </text>
            <text x={fantasyStatePaths.texas.label.x} y={fantasyStatePaths.texas.label.y + 9} fill="hsl(33, 20%, 50%)" fontSize="5" fontFamily="'Playfair Display', serif" textAnchor="middle" fontStyle="italic" opacity="0.22">
              The Lone Star State
            </text>
            
            <text x={fantasyStatePaths.kansas.label.x} y={fantasyStatePaths.kansas.label.y} fill="hsl(33, 22%, 48%)" fontSize="10" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="500" letterSpacing="4" opacity="0.3">
              KANSAS
            </text>
            
            <text x={fantasyStatePaths.arkansas.label.x} y={fantasyStatePaths.arkansas.label.y} fill="hsl(33, 20%, 50%)" fontSize="8" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="500" letterSpacing="2" opacity="0.25">
              ARKANSAS
            </text>
            
            <text x={fantasyStatePaths.missouri.label.x} y={fantasyStatePaths.missouri.label.y} fill="hsl(33, 20%, 50%)" fontSize="8" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="500" letterSpacing="2" opacity="0.25">
              MISSOURI
            </text>
            
            <text x={fantasyStatePaths.colorado.label.x} y={fantasyStatePaths.colorado.label.y} fill="hsl(33, 18%, 52%)" fontSize="7" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="500" letterSpacing="2" opacity="0.2">
              COLORADO
            </text>
            
            <text x={fantasyStatePaths.newMexico.label.x} y={fantasyStatePaths.newMexico.label.y} fill="hsl(33, 18%, 52%)" fontSize="6.5" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="500" letterSpacing="1.5" opacity="0.2">
              NEW MEXICO
            </text>
          </g>
          
          {/* Cities — clean cartographic marks */}
          <g id="cities">
            {fantasyCities.map((city, i) => {
              const pos = projectCoordinates(city.lat, city.lng);
              const isMetropolis = city.population === "metropolis";
              const isLarge = city.population === "large";
              return (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                  {isMetropolis && (
                    <>
                      <circle r="4.5" fill="none" stroke="hsl(33, 30%, 48%)" strokeWidth="0.6" opacity="0.5" />
                      <circle r="2.5" fill="hsl(33, 25%, 42%)" opacity="0.7" />
                    </>
                  )}
                  {isLarge && !isMetropolis && (
                    <circle r="2" fill="hsl(33, 22%, 45%)" opacity="0.6" />
                  )}
                  {!isLarge && !isMetropolis && (
                    <circle r="1.5" fill="hsl(33, 18%, 50%)" opacity="0.45" />
                  )}
                  <text
                    x={city.importance === "major" ? 0 : 5}
                    y={city.importance === "major" ? -8 : -4}
                    fill={city.importance === "major" ? "hsl(33, 35%, 30%)" : "hsl(33, 20%, 42%)"}
                    fontSize={city.importance === "major" ? "6.5" : "5"}
                    fontFamily="'Source Sans 3', sans-serif"
                    textAnchor={city.importance === "major" ? "middle" : "start"}
                    fontWeight={city.importance === "major" ? "600" : "400"}
                    opacity={city.importance === "major" ? 0.7 : 0.5}
                  >
                    {city.fantasyName}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Distance rings from HQ */}
          <g id="distance-rings" opacity="0.18">
            {[
              { r: 35, label: "1hr" },
              { r: 90, label: "3hr" },
              { r: 150, label: "6hr" },
            ].map((ring, i) => (
              <g key={i}>
                <circle cx={OKC.x} cy={OKC.y} r={ring.r} fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.5" strokeDasharray="4,6" />
                <text x={OKC.x + ring.r + 3} y={OKC.y - 3} fill="hsl(33, 25%, 45%)" fontSize="4.5" fontFamily="'Source Sans 3', sans-serif" opacity="0.6">
                  {ring.label}
                </text>
              </g>
            ))}
          </g>
          
          {/* OKC Basecamp */}
          <g id="hq" transform={`translate(${OKC.x}, ${OKC.y})`}>
            <circle r="16" fill="none" stroke="hsl(16, 50%, 45%)" strokeWidth="0.8" opacity="0.15" className="animate-ping" />
            <g filter="url(#hqGlow)">
              <circle r="6" fill="hsl(16, 55%, 42%)" stroke="hsl(16, 60%, 50%)" strokeWidth="1.5" />
              <circle r="3" fill="hsl(40, 35%, 90%)" />
              <circle r="1.5" fill="hsl(16, 55%, 42%)" />
            </g>
            <text y="16" fill="hsl(33, 40%, 30%)" fontSize="7" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="700" letterSpacing="1.5">
              OKC
            </text>
            <text y="23" fill="hsl(33, 25%, 48%)" fontSize="4.5" fontFamily="'Source Sans 3', sans-serif" textAnchor="middle" opacity="0.6">
              Basecamp
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
          
          {/* Atmosphere */}
          <rect width="100%" height="100%" fill="url(#atmosphereGlow)" style={{ pointerEvents: "none" }} />
        </svg>
        
        <FantasyMapHUD 
          missionCount={displayedMissions.length}
          hoveredCoords={hoveredCoords}
          selectedRealm={selectedRealm?.name}
        />
      </div>
      
      {/* Hover preview panel */}
      {hoveredMission && (
        <div className="absolute top-20 right-4 z-10 w-72 bg-[hsl(40,30%,96%)] backdrop-blur-lg border border-[hsl(33,25%,75%)] rounded-xl shadow-lg overflow-hidden animate-scale-in">
          {(() => {
            const mission = displayedMissions.find(m => m.id === hoveredMission);
            if (!mission) return null;
            return (
              <>
                <div className="h-28 bg-cover bg-center relative" style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(40,30%,96%)] via-[hsl(40,30%,96%)/40%] to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="font-display text-sm font-bold text-[hsl(33,35%,18%)] drop-shadow-sm">
                      {mission.name}
                    </h4>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 text-xs text-[hsl(33,15%,45%)] mb-2">
                    <span>📍</span>
                    <span>{mission.city}, {mission.state}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[hsl(16,55%,42%)]">
                      {mission.priceEstimate}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: mission.broRating }).map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
      
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
