import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import { FilterState } from "@/components/SearchFilter/SearchFilter";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";
import { Maximize2, Minimize2, MapPin, Navigation, Layers, Compass, Filter } from "lucide-react";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  itineraryMissions?: Mission[];
  filters?: FilterState;
  filteredMissionIds?: Set<string>;
}

const OKC_CENTER: [number, number] = [35.4676, -97.5164];

const TILE_PROVIDERS = {
  light: {
    url: "https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png",
    attr: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
  },
  terrain: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
    attr: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
};

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { bg: "hsl(150,50%,42%)", border: "hsl(150,45%,32%)", text: "hsl(150,40%,92%)", glow: "hsl(150,60%,50%)" };
    case "MEDIUM": return { bg: "hsl(40,90%,50%)", border: "hsl(40,80%,38%)", text: "hsl(40,60%,92%)", glow: "hsl(40,95%,58%)" };
    case "HIGH": return { bg: "hsl(24,95%,50%)", border: "hsl(24,85%,38%)", text: "hsl(24,55%,92%)", glow: "hsl(24,100%,60%)" };
    case "EXTREME": return { bg: "hsl(0,70%,48%)", border: "hsl(0,60%,35%)", text: "hsl(0,50%,92%)", glow: "hsl(0,80%,58%)" };
  }
};

const createMissionIcon = (mission: Mission, isInItinerary: boolean, isDimmed: boolean) => {
  const colors = getDangerColor(mission.dangerLevel);
  const uid = mission.id.replace(/[^a-zA-Z0-9]/g, "");
  const opacity = isDimmed ? 0.3 : 1;
  return L.divIcon({
    className: "mission-marker-icon",
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -50],
    html: `
      <div class="mission-pin-wrapper" style="opacity:${opacity}; ${isDimmed ? 'filter:grayscale(0.6);' : ''}">
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pg-${uid}" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="${colors.glow}" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="${colors.bg}"/>
            </radialGradient>
            <filter id="gs-${uid}" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
            </filter>
          </defs>
          <ellipse cx="18" cy="44" rx="8" ry="3" fill="${colors.bg}" opacity="0.3" filter="url(#gs-${uid})"/>
          <path d="M18 2C9.163 2 2 9.163 2 18c0 13 16 28 16 28s16-15 16-28C34 9.163 26.837 2 18 2z"
                fill="url(#pg-${uid})" stroke="${colors.border}" stroke-width="1.5"/>
          <path d="M10 12 A 10 10 0 0 1 26 12" fill="none" stroke="white" stroke-width="1" opacity="0.15" stroke-linecap="round"/>
          <circle cx="18" cy="17" r="8" fill="${colors.text}" opacity="0.95" stroke="${colors.border}" stroke-width="0.5"/>
          <circle cx="18" cy="17" r="4" fill="${colors.bg}"/>
          <circle cx="18" cy="17" r="2" fill="${colors.text}" opacity="0.7"/>
          <circle cx="15" cy="14" r="1.5" fill="white" opacity="0.25"/>
        </svg>
        ${isInItinerary ? `
          <div class="mission-pin-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(38,25%,95%)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        ` : ""}
        ${isInItinerary ? '<div class="mission-pin-itinerary-ring"></div>' : ''}
      </div>
    `,
  });
};

const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 44 : count < 20 ? 52 : 58;
  const ring = size + 12;
  return L.divIcon({
    className: "custom-cluster-icon",
    iconSize: [ring, ring],
    html: `
      <div class="cluster-marker" style="width:${ring}px;height:${ring}px;">
        <div class="cluster-ring" style="width:${ring}px;height:${ring}px;"></div>
        <div class="cluster-core" style="width:${size}px;height:${size}px;">
          <span class="cluster-count">${count}</span>
        </div>
      </div>
    `,
  });
};

const createHQIcon = () => {
  return L.divIcon({
    className: "hq-marker-icon",
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    html: `
      <div class="hq-marker">
        <div class="hq-sonar"></div>
        <div class="hq-sonar hq-sonar-delayed"></div>
        <div class="hq-body">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </div>
        <div class="hq-label">HQ</div>
      </div>
    `,
  });
};

const DistanceRings = () => {
  const rings = [
    { radius: 95000, opacity: 0.15 },
    { radius: 290000, opacity: 0.08 },
    { radius: 500000, opacity: 0.04 },
  ];
  return (
    <>
      {rings.map((ring, i) => (
        <Circle key={i} center={OKC_CENTER} radius={ring.radius}
          pathOptions={{ color: "hsl(24,80%,52%)", weight: 0.7, dashArray: "5,12", fillColor: "hsl(24,80%,52%)", fillOpacity: ring.opacity * 0.06, opacity: ring.opacity * 2 }}
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
    points.push([
      start[0] * (1 - t) + end[0] * t + bulge * Math.sin(Math.PI * t),
      start[1] * (1 - t) + end[1] * t,
    ]);
  }
  return points;
};

const FitBounds = ({ missions: m }: { missions: Mission[] }) => {
  const map = useMap();
  useEffect(() => {
    if (m.length === 0) return;
    const bounds = L.latLngBounds(m.map(x => [x.coordinates.lat, x.coordinates.lng] as [number, number]));
    bounds.extend(OKC_CENTER);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 7, animate: true, duration: 0.8 });
  }, [m, map]);
  return null;
};

const renderStars = (rating: number) => {
  let html = '';
  for (let i = 0; i < 5; i++) {
    const f = i < rating;
    html += `<svg width="11" height="11" viewBox="0 0 24 24" style="filter:${f ? 'drop-shadow(0 0 3px hsl(24,80%,52%,0.6))' : 'none'}">
      <defs><linearGradient id="sg${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${f ? 'hsl(40,95%,65%)' : 'hsl(30,8%,22%)'}"/>
        <stop offset="100%" stop-color="${f ? 'hsl(24,80%,52%)' : 'hsl(30,8%,16%)'}"/>
      </linearGradient></defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#sg${i})" stroke="${f ? 'hsl(24,70%,45%)' : 'hsl(30,8%,25%)'}" stroke-width="1.5"/>
    </svg>`;
  }
  return html;
};

// Social proof mock data
const getBookingCount = (id: string): number => {
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return 8 + (hash % 45);
};

const WarRoomMap = ({ selectedRealm, onAddToItinerary, itineraryMissions = [], filteredMissionIds }: WarRoomMapProps) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'light' | 'terrain'>('light');
  const [showFilterSync, setShowFilterSync] = useState(true);

  // All missions (for showing dimmed)
  const allMissions = useMemo(() =>
    selectedRealm ? missions.filter(m => m.realmId === selectedRealm.id) : missions,
    [selectedRealm]
  );

  // Filtered subset (highlighted)
  const hasActiveFilter = filteredMissionIds !== undefined && filteredMissionIds.size < allMissions.length;

  const isInItinerary = (id: string) => itineraryMissions.some(m => m.id === id);
  const isFiltered = (id: string) => !filteredMissionIds || filteredMissionIds.has(id);
  const tile = TILE_PROVIDERS[mapStyle];

  const filteredCount = hasActiveFilter ? allMissions.filter(m => isFiltered(m.id)).length : allMissions.length;

  const difficultyLevels = [
    { color: "hsl(150,50%,42%)", label: "Easy", count: allMissions.filter(m => m.dangerLevel === "LOW" && isFiltered(m.id)).length },
    { color: "hsl(40,90%,50%)", label: "Moderate", count: allMissions.filter(m => m.dangerLevel === "MEDIUM" && isFiltered(m.id)).length },
    { color: "hsl(24,95%,50%)", label: "Hard", count: allMissions.filter(m => m.dangerLevel === "HIGH" && isFiltered(m.id)).length },
    { color: "hsl(0,70%,48%)", label: "Extreme", count: allMissions.filter(m => m.dangerLevel === "EXTREME" && isFiltered(m.id)).length },
  ];

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-[55]" : ""}`} id="map-section" role="region" aria-label="Adventure map showing mission locations across Oklahoma and Texas">
      <div className={`relative w-full overflow-hidden rounded-2xl border border-border/20 shadow-[0_8px_40px_hsl(0_0%_0%/0.35),inset_0_1px_0_hsl(0_0%_100%/0.03)] ${isFullscreen ? "h-full rounded-none" : "h-[85vh] min-h-[500px]"}`}>

        {/* Vignette */}
        <div className="absolute inset-0 z-[400] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, hsl(36,33%,97%,0.4) 100%)' }} />

        <MapContainer center={OKC_CENTER} zoom={6} scrollWheelZoom={true} zoomControl={false} style={{ height: "100%", width: "100%" }} className="leaflet-terrain-map">
          <TileLayer attribution={tile.attr} url={tile.url} />
          <DistanceRings />
          <FitBounds missions={allMissions} />

          {/* Flight arcs — only for filtered missions */}
          {allMissions.map(mission => {
            const active = isFiltered(mission.id);
            return (
              <Polyline key={`arc-${mission.id}`}
                positions={getArcPoints(OKC_CENTER, [mission.coordinates.lat, mission.coordinates.lng])}
                pathOptions={{ color: getDangerColor(mission.dangerLevel).bg, weight: active ? 1 : 0.5, opacity: active ? 0.18 : 0.04, dashArray: "3,8" }}
              />
            );
          })}

          {/* HQ */}
          <Marker position={OKC_CENTER} icon={createHQIcon()}>
            <Popup className="dark-popup">
              <div style={{ padding: 14, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(24,80%,52%)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                  <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: 'hsl(30,15%,12%)', letterSpacing: '2px', textTransform: 'uppercase' as const }}>OKC Basecamp</p>
                </div>
                <p style={{ fontSize: 10, color: 'hsl(30,8%,46%)' }}>Mission Control · Ground Zero</p>
                <div style={{ marginTop: 8, height: 1, background: 'linear-gradient(90deg, transparent, hsl(24,85%,48%,0.3), transparent)' }} />
                <p style={{ fontSize: 9, color: 'hsl(30,8%,46%)', marginTop: 6, fontFamily: "'Orbitron', sans-serif" }}>35.47°N · 97.52°W</p>
              </div>
            </Popup>
          </Marker>

          {/* Clustered mission markers */}
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}
            maxClusterRadius={45} spiderfyOnMaxZoom disableClusteringAtZoom={9}
            animate animateAddingMarkers
          >
            {allMissions.map(mission => {
              const inItinerary = isInItinerary(mission.id);
              const isDimmed = hasActiveFilter && !isFiltered(mission.id);
              const bookings = getBookingCount(mission.id);
              return (
                <Marker key={mission.id}
                  position={[mission.coordinates.lat, mission.coordinates.lng]}
                  icon={createMissionIcon(mission, inItinerary, isDimmed)}
                  eventHandlers={{ click: () => setSelectedMission(mission) }}
                >
                  <Popup className="dark-popup" maxWidth={270}>
                    <div style={{ width: 250, overflow: 'hidden', borderRadius: 12 }}>
                      <div style={{ height: 110, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', backgroundImage: `url(${getMissionImage(mission.id)})` }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(36,30%,99%) 0%, hsl(36,30%,99%,0.4) 40%, transparent 100%)' }} />
                        <div style={{ position: 'absolute', top: 8, right: 8, padding: '2px 8px', borderRadius: 20, fontSize: 8, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", letterSpacing: '1px', textTransform: 'uppercase' as const, background: getDangerColor(mission.dangerLevel).bg, color: getDangerColor(mission.dangerLevel).text, boxShadow: `0 0 12px ${getDangerColor(mission.dangerLevel).glow}50` }}>
                          {mission.dangerLevel}
                        </div>
                        <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10 }}>
                          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: 'hsl(30,15%,12%)', lineHeight: 1.2, textShadow: '0 2px 8px hsl(0,0%,100%,0.5)' }}>{mission.name}</h4>
                        </div>
                      </div>
                      <div style={{ padding: 12, background: 'hsl(36,30%,99%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(24,85%,48%)" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span style={{ fontSize: 11, color: 'hsl(30,8%,46%)' }}>{mission.city}, {mission.state}</span>
                          <span style={{ fontSize: 9, color: 'hsl(30,8%,55%)', marginLeft: 'auto', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.5px' }}>{mission.distanceFromOKC}h</span>
                        </div>
                        {/* Social proof */}
                        <div style={{ fontSize: 9, color: 'hsl(24,85%,48%)', marginBottom: 6, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          Added {bookings}x this month
                        </div>
                        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(30,15%,88%), transparent)', marginBottom: 8 }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Orbitron', sans-serif", color: 'hsl(24,85%,48%)', textShadow: '0 0 8px hsl(24,85%,48%,0.3)' }}>{mission.priceEstimate}</span>
                          <span style={{ display: 'flex', gap: 2, alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: renderStars(mission.broRating) }} />
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedMission(mission); }}
                          className="map-popup-cta">
                          View Mission Brief
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>

        {/* ── HUD: Title ── */}
        <div className="absolute top-3 left-3 z-[1000]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_16px_hsl(var(--primary)/0.3)] animate-pulse-glow" style={{ animationDuration: '4s' }}>
                <Compass className="w-[18px] h-[18px] text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-orbitron text-[10px] font-bold text-foreground tracking-[3px] uppercase">Adventure Map</h2>
                <p className="text-[9px] text-muted-foreground tracking-wide mt-0.5 font-sans">
                  {selectedRealm?.name || "All Regions"} · <span className="text-primary font-semibold">{filteredCount}</span> Experiences
                  {hasActiveFilter && <span className="text-muted-foreground/60"> / {allMissions.length}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── HUD: Filter sync indicator ── */}
        {hasActiveFilter && (
          <div className="absolute top-16 left-3 z-[1000]">
            <div className="glass-premium rounded-lg px-3 py-2 flex items-center gap-2 animate-fade-in-up">
              <Filter className="w-3 h-3 text-primary" />
              <span className="text-[9px] text-muted-foreground font-sans">Filters active · dimmed pins excluded</span>
            </div>
          </div>
        )}

        {/* ── HUD: Controls ── */}
        <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2">
          <button onClick={() => setMapStyle(s => s === 'light' ? 'terrain' : 'light')}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group" title="Toggle style" aria-label="Toggle map style">
            <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group" aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            {isFullscreen ? <Minimize2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          </button>
        </div>

        {/* ── HUD: Legend ── */}
        <div className="absolute bottom-3 left-3 z-[1000]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <p className="text-[7px] text-muted-foreground tracking-[3px] uppercase mb-2 font-orbitron font-medium">Difficulty</p>
            <div className="flex items-center gap-3">
              {difficultyLevels.map(level => (
                <div key={level.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color, boxShadow: `0 0 6px ${level.color}60` }} />
                  <span className="text-[9px] text-muted-foreground font-medium font-sans">
                    {level.label}{level.count > 0 && <span className="text-primary/60 ml-0.5">({level.count})</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HUD: Explore ── */}
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

        {/* ── Trip count ── */}
        {itineraryMissions.length > 0 && (
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
        <MissionDetailModal mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onAddToItinerary={onAddToItinerary ? () => onAddToItinerary(selectedMission) : undefined}
          isInItinerary={isInItinerary(selectedMission.id)}
        />
      )}
    </div>
  );
};

export default WarRoomMap;
