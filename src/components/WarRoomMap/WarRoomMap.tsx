import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";
import { Maximize2, Minimize2 } from "lucide-react";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  itineraryMissions?: Mission[];
}

const OKC_CENTER: [number, number] = [35.4676, -97.5164];

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { bg: "#2d7a4f", border: "#1e5c3a", text: "#e8f5ee" };
    case "MEDIUM": return { bg: "#c4851c", border: "#9a6a15", text: "#fef3e2" };
    case "HIGH": return { bg: "#c44b1c", border: "#9a3a15", text: "#feeee2" };
    case "EXTREME": return { bg: "#b33030", border: "#8a2424", text: "#fde8e8" };
  }
};

const createMissionIcon = (mission: Mission, isInItinerary: boolean) => {
  const colors = getDangerColor(mission.dangerLevel);
  return L.divIcon({
    className: "mission-marker-icon",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
    html: `
      <div style="position:relative;width:28px;height:36px;cursor:pointer;">
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" 
                fill="${colors.bg}" stroke="${colors.border}" stroke-width="1.5"/>
          <circle cx="14" cy="13" r="6" fill="${colors.text}" opacity="0.9"/>
          <circle cx="14" cy="13" r="3" fill="${colors.bg}"/>
        </svg>
        ${isInItinerary ? `
          <div style="position:absolute;top:-6px;right:-6px;width:16px;height:16px;border-radius:50%;background:#c44b1c;border:2px solid #fef3e2;display:flex;align-items:center;justify-content:center;">
            <span style="color:#fff;font-size:9px;font-weight:bold;">✓</span>
          </div>
        ` : ""}
      </div>
    `,
  });
};

const createHQIcon = () => {
  return L.divIcon({
    className: "hq-marker-icon",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(180,100,40,0.3);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div style="position:absolute;inset:6px;border-radius:50%;background:linear-gradient(135deg,#8b5e34,#6b4423);border:2.5px solid #c49a6c;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
          <span style="color:#fef3e2;font-size:14px;font-weight:800;font-family:'Playfair Display',serif;letter-spacing:1px;">HQ</span>
        </div>
      </div>
    `,
  });
};

const DistanceRings = () => {
  const rings = [
    { radius: 95000, opacity: 0.12 },
    { radius: 290000, opacity: 0.08 },
    { radius: 500000, opacity: 0.05 },
  ];
  return (
    <>
      {rings.map((ring, i) => (
        <Circle
          key={i}
          center={OKC_CENTER}
          radius={ring.radius}
          pathOptions={{ color: "hsl(33, 30%, 45%)", weight: 1, dashArray: "8,12", fillOpacity: 0, opacity: ring.opacity * 3 }}
        />
      ))}
    </>
  );
};

// Curved arc between two points
const getArcPoints = (start: [number, number], end: [number, number], segments = 30): [number, number][] => {
  const points: [number, number][] = [];
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  const dist = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
  const bulge = dist * 0.15;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat = start[0] * (1 - t) + end[0] * t + bulge * Math.sin(Math.PI * t);
    const lng = start[1] * (1 - t) + end[1] * t;
    points.push([lat, lng]);
  }
  return points;
};

const FitBounds = ({ missions: displayedMissions }: { missions: Mission[] }) => {
  const map = useMap();
  useEffect(() => {
    if (displayedMissions.length === 0) return;
    const bounds = L.latLngBounds(
      displayedMissions.map(m => [m.coordinates.lat, m.coordinates.lng] as [number, number])
    );
    bounds.extend(OKC_CENTER);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
  }, [displayedMissions, map]);
  return null;
};

const WarRoomMap = ({ selectedRealm, onMissionSelect, onAddToItinerary, itineraryMissions = [] }: WarRoomMapProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayedMissions = useMemo(() =>
    selectedRealm ? missions.filter((m) => m.realmId === selectedRealm.id) : missions,
    [selectedRealm]
  );

  const isInItinerary = (missionId: string) => itineraryMissions.some(m => m.id === missionId);

  const difficultyLevels = [
    { color: "#2d7a4f", label: "Easy" },
    { color: "#c4851c", label: "Moderate" },
    { color: "#c44b1c", label: "Hard" },
    { color: "#b33030", label: "Extreme" },
  ];

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-[55]" : ""}`} id="map-section">
      <div className={`relative w-full overflow-hidden rounded-2xl border border-border/30 shadow-[0_4px_30px_hsl(0_0%_0%/0.2)] ${isFullscreen ? "h-full rounded-none" : "h-[85vh] min-h-[500px]"}`}>
        <MapContainer
          center={OKC_CENTER}
          zoom={6}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
          className="leaflet-terrain-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />

          <DistanceRings />
          <FitBounds missions={displayedMissions} />

          {/* Flight path arcs from HQ */}
          {displayedMissions.map((mission) => (
            <Polyline
              key={`arc-${mission.id}`}
              positions={getArcPoints(OKC_CENTER, [mission.coordinates.lat, mission.coordinates.lng])}
              pathOptions={{
                color: getDangerColor(mission.dangerLevel).bg,
                weight: 1,
                opacity: 0.25,
                dashArray: "4,8",
              }}
            />
          ))}

          <Marker position={OKC_CENTER} icon={createHQIcon()}>
            <Popup className="hq-popup">
              <div className="text-center p-1">
                <p className="font-display font-bold text-sm text-[hsl(33,35%,22%)]">OKC Basecamp</p>
                <p className="text-xs text-[hsl(33,15%,50%)]">Mission HQ</p>
              </div>
            </Popup>
          </Marker>

          {displayedMissions.map((mission) => (
            <Marker
              key={mission.id}
              position={[mission.coordinates.lat, mission.coordinates.lng]}
              icon={createMissionIcon(mission, isInItinerary(mission.id))}
              eventHandlers={{ click: () => setSelectedMission(mission) }}
            >
              <Popup className="mission-popup" maxWidth={260}>
                <div className="w-[240px] overflow-hidden rounded-lg">
                  <div className="h-24 bg-cover bg-center relative" style={{ backgroundImage: `url(${getMissionImage(mission.id)})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2">
                      <h4 className="font-display text-sm font-bold text-[hsl(33,35%,18%)] leading-tight">{mission.name}</h4>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs text-[hsl(33,15%,45%)] mb-1.5">📍 {mission.city}, {mission.state} · {mission.distanceFromOKC}h drive</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: getDangerColor(mission.dangerLevel).bg }}>{mission.priceEstimate}</span>
                      <span className="text-xs text-[hsl(33,15%,55%)]">{"★".repeat(mission.broRating)}{"☆".repeat(5 - mission.broRating)}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedMission(mission); }} className="mt-2 w-full py-1.5 px-3 text-xs font-semibold rounded-md bg-[hsl(16,55%,42%)] text-white hover:bg-[hsl(16,55%,36%)] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* HUD: Title */}
        <div className="absolute top-3 left-3 z-[1000]">
          <div className="bg-background/80 backdrop-blur-md border border-border/30 rounded-lg px-4 py-2.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_0_12px_hsl(var(--primary)/0.25)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-xs font-bold text-foreground tracking-wide uppercase">Adventure Map</h2>
                <p className="text-[9px] text-muted-foreground tracking-wide mt-0.5">
                  {selectedRealm?.name || "All Regions"} · {displayedMissions.length} Experiences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-3 right-3 z-[1000] w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-md border border-border/30 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 z-[1000]">
          <div className="bg-background/80 backdrop-blur-md border border-border/30 rounded-lg px-3.5 py-2.5 shadow-sm">
            <p className="text-[8px] text-muted-foreground tracking-wider uppercase mb-1.5 font-medium">Difficulty</p>
            <div className="flex items-center gap-3">
              {difficultyLevels.map((level) => (
                <div key={level.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: level.color, animationDuration: '3s' }} />
                  <span className="text-[9px] text-muted-foreground font-medium">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="absolute bottom-3 right-3 z-[1000]">
          <div className="bg-background/70 backdrop-blur-md border border-border/30 rounded-lg px-3 py-2 shadow-sm">
            <p className="text-[10px] text-muted-foreground animate-typewriter">📍 Click pins to explore adventures</p>
          </div>
        </div>
      </div>

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