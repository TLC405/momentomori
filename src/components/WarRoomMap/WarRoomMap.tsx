import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";
import { Maximize2, Minimize2, MapPin, Star } from "lucide-react";

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
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

const getArcPoints = (start: [number, number], end: [number, number], segments = 30): [number, number][] => {
  const points: [number, number][] = [];
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

// Render star SVGs as HTML for popup
const renderStars = (rating: number) => {
  let html = '';
  for (let i = 0; i < 5; i++) {
    const fill = i < rating ? 'hsl(24, 80%, 52%)' : 'hsl(30, 10%, 20%)';
    const stroke = i < rating ? 'hsl(24, 80%, 52%)' : 'hsl(30, 10%, 25%)';
    html += `<svg width="12" height="12" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return html;
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
            <Popup className="dark-popup">
              <div className="text-center p-2">
                <p className="font-bold text-sm" style={{ color: 'hsl(35,15%,88%)' }}>OKC Basecamp</p>
                <p className="text-xs" style={{ color: 'hsl(35,10%,50%)' }}>Mission HQ</p>
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
              <Popup className="dark-popup" maxWidth={260}>
                <div style={{ width: 240, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ height: 96, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', backgroundImage: `url(${getMissionImage(mission.id)})` }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(30,12%,9%) 0%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 6, left: 8, right: 8 }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: 'hsl(35,15%,88%)', lineHeight: 1.2 }}>{mission.name}</h4>
                    </div>
                  </div>
                  <div style={{ padding: 10, background: 'hsl(30,12%,9%)' }}>
                    <p style={{ fontSize: 11, color: 'hsl(35,10%,50%)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {mission.city}, {mission.state} · {mission.distanceFromOKC}h
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: getDangerColor(mission.dangerLevel).bg }}>{mission.priceEstimate}</span>
                      <span style={{ display: 'flex', gap: 1 }} dangerouslySetInnerHTML={{ __html: renderStars(mission.broRating) }} />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedMission(mission); }}
                      style={{ marginTop: 8, width: '100%', padding: '6px 12px', fontSize: 11, fontWeight: 600, borderRadius: 6, background: 'hsl(24,80%,52%)', color: 'hsl(30,10%,6%)', border: 'none', cursor: 'pointer' }}
                    >
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

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-3 right-3 z-[1000] w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-md border border-border/30 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

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

        <div className="absolute bottom-3 right-3 z-[1000]">
          <div className="bg-background/70 backdrop-blur-md border border-border/30 rounded-lg px-3 py-2 shadow-sm">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-primary/60" />
              <span className="animate-typewriter">Click pins to explore adventures</span>
            </p>
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
