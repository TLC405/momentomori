import { useState, useMemo, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";
import { Maximize2, Minimize2, MapPin, Navigation, Layers, Compass } from "lucide-react";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  itineraryMissions?: Mission[];
}

const OKC_CENTER: [number, number] = [35.4676, -97.5164];

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { bg: "hsl(150,50%,42%)", border: "hsl(150,45%,32%)", text: "hsl(150,40%,92%)", glow: "hsl(150,60%,50%)" };
    case "MEDIUM": return { bg: "hsl(40,90%,50%)", border: "hsl(40,80%,38%)", text: "hsl(40,60%,92%)", glow: "hsl(40,95%,58%)" };
    case "HIGH": return { bg: "hsl(24,95%,50%)", border: "hsl(24,85%,38%)", text: "hsl(24,55%,92%)", glow: "hsl(24,100%,60%)" };
    case "EXTREME": return { bg: "hsl(0,70%,48%)", border: "hsl(0,60%,35%)", text: "hsl(0,50%,92%)", glow: "hsl(0,80%,58%)" };
  }
};

const createMissionIcon = (mission: Mission, isInItinerary: boolean) => {
  const colors = getDangerColor(mission.dangerLevel);
  return L.divIcon({
    className: "mission-marker-icon",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -44],
    html: `
      <div class="mission-pin-wrapper" style="position:relative;width:32px;height:42px;cursor:pointer;filter:drop-shadow(0 3px 6px hsl(0 0% 0%/0.5));">
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pin-grad-${mission.id}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${colors.glow}"/>
              <stop offset="100%" stop-color="${colors.bg}"/>
            </linearGradient>
            <filter id="pin-glow-${mission.id}">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dy="1"/>
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feFlood flood-color="${colors.glow}" flood-opacity="0.4"/>
              <feComposite in2="SourceGraphic" operator="in"/>
              <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" 
                fill="url(#pin-grad-${mission.id})" stroke="${colors.border}" stroke-width="1.5"
                filter="url(#pin-glow-${mission.id})"/>
          <circle cx="16" cy="15" r="7" fill="${colors.text}" opacity="0.95"/>
          <circle cx="16" cy="15" r="3.5" fill="${colors.bg}"/>
          <circle cx="16" cy="15" r="1.5" fill="${colors.text}" opacity="0.8"/>
        </svg>
        ${isInItinerary ? `
          <div style="position:absolute;top:-5px;right:-5px;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,hsl(24,80%,52%),hsl(24,90%,42%));border:2px solid hsl(38,25%,90%);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px hsl(0 0% 0%/0.4);">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="hsl(38,25%,95%)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        ` : ""}
      </div>
    `,
  });
};

const createHQIcon = () => {
  return L.divIcon({
    className: "hq-marker-icon",
    iconSize: [52, 52],
    iconAnchor: [26, 26],
    html: `
      <div style="position:relative;width:52px;height:52px;">
        <div class="hq-sonar-ring" style="position:absolute;inset:-4px;border-radius:50%;border:1.5px solid hsl(24,80%,52%,0.2);animation:hq-sonar 3s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div class="hq-sonar-ring" style="position:absolute;inset:-4px;border-radius:50%;border:1.5px solid hsl(24,80%,52%,0.15);animation:hq-sonar 3s cubic-bezier(0,0,0.2,1) 1s infinite;"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 30% 30%, hsl(30,12%,18%), hsl(30,10%,8%));border:2px solid hsl(24,80%,52%,0.5);display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px hsl(24,80%,52%,0.2), inset 0 1px 0 hsl(0,0%,100%,0.08);">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:50%;background:conic-gradient(from 0deg, hsl(24,80%,52%,0.05), transparent 90%, hsl(24,80%,52%,0.05));">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
        </div>
        <div style="position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:8px;font-weight:700;font-family:'Orbitron',sans-serif;color:hsl(24,80%,52%);letter-spacing:2px;text-transform:uppercase;text-shadow:0 1px 4px hsl(0,0%,0%,0.8);">HQ</div>
      </div>
    `,
  });
};

const DistanceRings = () => {
  const rings = [
    { radius: 95000, opacity: 0.18, label: "1h" },
    { radius: 290000, opacity: 0.1, label: "3h" },
    { radius: 500000, opacity: 0.06, label: "5h+" },
  ];
  return (
    <>
      {rings.map((ring, i) => (
        <Circle
          key={i}
          center={OKC_CENTER}
          radius={ring.radius}
          pathOptions={{
            color: "hsl(24, 80%, 52%)",
            weight: 0.8,
            dashArray: "6,10",
            fillColor: "hsl(24, 80%, 52%)",
            fillOpacity: ring.opacity * 0.08,
            opacity: ring.opacity * 2.5,
          }}
        />
      ))}
    </>
  );
};

const getArcPoints = (start: [number, number], end: [number, number], segments = 40): [number, number][] => {
  const points: [number, number][] = [];
  const dist = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
  const bulge = dist * 0.18;

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
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 7, animate: true, duration: 0.8 });
  }, [displayedMissions, map]);
  return null;
};

const renderStars = (rating: number) => {
  let html = '';
  for (let i = 0; i < 5; i++) {
    const filled = i < rating;
    html += `<svg width="11" height="11" viewBox="0 0 24 24" style="filter:${filled ? 'drop-shadow(0 0 3px hsl(24,80%,52%,0.6))' : 'none'}">
      <defs><linearGradient id="star-g-${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${filled ? 'hsl(40,95%,65%)' : 'hsl(30,8%,22%)'}"/>
        <stop offset="100%" stop-color="${filled ? 'hsl(24,80%,52%)' : 'hsl(30,8%,16%)'}"/>
      </linearGradient></defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#star-g-${i})" stroke="${filled ? 'hsl(24,70%,45%)' : 'hsl(30,8%,25%)'}" stroke-width="1.5"/>
    </svg>`;
  }
  return html;
};

const WarRoomMap = ({ selectedRealm, onMissionSelect, onAddToItinerary, itineraryMissions = [] }: WarRoomMapProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'dark' | 'terrain'>('dark');

  const displayedMissions = useMemo(() =>
    selectedRealm ? missions.filter((m) => m.realmId === selectedRealm.id) : missions,
    [selectedRealm]
  );

  const isInItinerary = (missionId: string) => itineraryMissions.some(m => m.id === missionId);

  const tileUrl = mapStyle === 'dark'
    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    : "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png";

  const difficultyLevels = [
    { color: "hsl(150,50%,42%)", label: "Easy", count: displayedMissions.filter(m => m.dangerLevel === "LOW").length },
    { color: "hsl(40,90%,50%)", label: "Moderate", count: displayedMissions.filter(m => m.dangerLevel === "MEDIUM").length },
    { color: "hsl(24,95%,50%)", label: "Hard", count: displayedMissions.filter(m => m.dangerLevel === "HIGH").length },
    { color: "hsl(0,70%,48%)", label: "Extreme", count: displayedMissions.filter(m => m.dangerLevel === "EXTREME").length },
  ];

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-[55]" : ""}`} id="map-section">
      <div className={`relative w-full overflow-hidden rounded-2xl border border-border/20 shadow-[0_8px_40px_hsl(0_0%_0%/0.35),inset_0_1px_0_hsl(0_0%_100%/0.03)] ${isFullscreen ? "h-full rounded-none" : "h-[85vh] min-h-[500px]"}`}>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 z-[400] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(30,10%,6%,0.4) 100%)',
        }} />

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
            url={tileUrl}
          />

          <DistanceRings />
          <FitBounds missions={displayedMissions} />

          {displayedMissions.map((mission) => (
            <Polyline
              key={`arc-${mission.id}`}
              positions={getArcPoints(OKC_CENTER, [mission.coordinates.lat, mission.coordinates.lng])}
              pathOptions={{
                color: getDangerColor(mission.dangerLevel).bg,
                weight: 1.2,
                opacity: 0.2,
                dashArray: "3,8",
              }}
            />
          ))}

          <Marker position={OKC_CENTER} icon={createHQIcon()}>
            <Popup className="dark-popup">
              <div style={{ padding: 14, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                  <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'hsl(35,15%,88%)', letterSpacing: '2px', textTransform: 'uppercase' }}>OKC Basecamp</p>
                </div>
                <p style={{ fontSize: 10, color: 'hsl(35,10%,50%)', fontFamily: "'Source Sans 3', sans-serif" }}>Mission Control · Ground Zero</p>
                <div style={{ marginTop: 8, height: 1, background: 'linear-gradient(90deg, transparent, hsl(24,80%,52%,0.3), transparent)' }} />
                <p style={{ fontSize: 9, color: 'hsl(35,10%,40%)', marginTop: 6 }}>35.47°N · 97.52°W</p>
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
              <Popup className="dark-popup" maxWidth={270}>
                <div style={{ width: 250, overflow: 'hidden', borderRadius: 12 }}>
                  <div style={{ height: 110, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', backgroundImage: `url(${getMissionImage(mission.id)})` }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(30,12%,9%) 0%, hsl(30,12%,9%,0.4) 40%, transparent 100%)' }} />
                    {/* Danger badge */}
                    <div style={{ position: 'absolute', top: 8, right: 8, padding: '2px 8px', borderRadius: 20, fontSize: 8, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", letterSpacing: '1px', textTransform: 'uppercase', background: getDangerColor(mission.dangerLevel).bg, color: getDangerColor(mission.dangerLevel).text, boxShadow: `0 0 10px ${getDangerColor(mission.dangerLevel).glow}40` }}>
                      {mission.dangerLevel}
                    </div>
                    <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10 }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: 'hsl(35,15%,92%)', lineHeight: 1.2, textShadow: '0 2px 8px hsl(0,0%,0%,0.6)' }}>{mission.name}</h4>
                    </div>
                  </div>
                  <div style={{ padding: 12, background: 'hsl(30,12%,9%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ fontSize: 11, color: 'hsl(35,10%,55%)', fontFamily: "'Source Sans 3', sans-serif" }}>{mission.city}, {mission.state}</span>
                      <span style={{ fontSize: 9, color: 'hsl(35,10%,35%)', marginLeft: 'auto', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.5px' }}>{mission.distanceFromOKC}h drive</span>
                    </div>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(30,12%,22%), transparent)', marginBottom: 8 }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Orbitron', sans-serif", color: 'hsl(24,80%,52%)', textShadow: '0 0 8px hsl(24,80%,52%,0.3)' }}>{mission.priceEstimate}</span>
                      <span style={{ display: 'flex', gap: 2, alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: renderStars(mission.broRating) }} />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedMission(mission); }}
                      style={{ marginTop: 10, width: '100%', padding: '8px 14px', fontSize: 11, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: '1px', textTransform: 'uppercase', borderRadius: 8, background: 'linear-gradient(135deg, hsl(24,80%,52%), hsl(24,90%,42%))', color: 'hsl(38,25%,95%)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px hsl(24,80%,52%,0.3), inset 0 1px 0 hsl(0,0%,100%,0.15)', transition: 'all 0.2s ease' }}
                      onMouseOver={(e) => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 6px 20px hsl(24,80%,52%,0.45)'; }}
                      onMouseOut={(e) => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = '0 4px 12px hsl(24,80%,52%,0.3)'; }}
                    >
                      View Mission Brief
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* HUD: Title — top left */}
        <div className="absolute top-3 left-3 z-[1000]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_16px_hsl(var(--primary)/0.3)] animate-pulse-glow" style={{ animationDuration: '4s' }}>
                <Compass className="w-[18px] h-[18px] text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-orbitron text-[10px] font-bold text-foreground tracking-[3px] uppercase">Adventure Map</h2>
                <p className="text-[9px] text-muted-foreground tracking-wide mt-0.5 font-sans">
                  {selectedRealm?.name || "All Regions"} · <span className="text-primary font-semibold">{displayedMissions.length}</span> Experiences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HUD: Controls — top right */}
        <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2">
          <button
            onClick={() => setMapStyle(s => s === 'dark' ? 'terrain' : 'dark')}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group"
            title="Toggle map style"
          >
            <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          </button>
        </div>

        {/* HUD: Legend — bottom left */}
        <div className="absolute bottom-3 left-3 z-[1000]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <p className="text-[7px] text-muted-foreground tracking-[3px] uppercase mb-2 font-orbitron font-medium">Difficulty</p>
            <div className="flex items-center gap-3">
              {difficultyLevels.map((level) => (
                <div key={level.label} className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color, boxShadow: `0 0 6px ${level.color}60` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-medium font-sans">
                    {level.label}
                    {level.count > 0 && <span className="text-primary/60 ml-0.5">({level.count})</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HUD: Coordinates / CTA — bottom right */}
        <div className="absolute bottom-3 right-3 z-[1000]">
          <div className="glass-premium rounded-xl px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Navigation className="w-2.5 h-2.5 text-primary/70" />
              </div>
              <div>
                <p className="text-[8px] text-muted-foreground font-orbitron tracking-wider uppercase">Explore</p>
                <p className="text-[9px] text-muted-foreground/60 font-sans">Click pins for details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission count badge */}
        {itineraryMissions && itineraryMissions.length > 0 && (
          <div className="absolute top-14 right-3 z-[1000]">
            <div className="glass-premium rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] font-orbitron font-bold text-primary">{itineraryMissions.length}</span>
              <span className="text-[9px] text-muted-foreground font-sans">saved</span>
            </div>
          </div>
        )}
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
