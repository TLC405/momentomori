import { useState, useMemo, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { missions, Mission } from "@/data/missions";
import { Realm } from "@/data/realms";
import { getMissionImage } from "@/data/missionImages";
import MissionDetailModal from "../MissionDeck/MissionDetailModal";
import { Maximize2, Minimize2, Navigation, Layers, Compass, Filter } from "lucide-react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaW5zcGlyZWxhd3RvbiIsImEiOiJjbWxoZmZ3aGwwOTZwM2VvbGoxbjdpa3hnIn0.9h80ip_zXGcA7sfjghG0zw";

interface WarRoomMapProps {
  selectedRealm: Realm | null;
  onMissionSelect?: (mission: Mission) => void;
  onAddToItinerary?: (mission: Mission) => void;
  itineraryMissions?: Mission[];
  filteredMissionIds?: Set<string>;
  conquered?: Set<string>;
}

const OKC_CENTER: [number, number] = [-97.5164, 35.4676];

const MAP_STYLES = {
  dark: "mapbox://styles/mapbox/dark-v11",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

const getDangerColor = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { bg: "#4CAF50", glow: "rgba(76,175,80,0.6)", label: "Moderate" };
    case "MEDIUM": return { bg: "#D4A24C", glow: "rgba(212,162,76,0.6)", label: "Hard" };
    case "HIGH": return { bg: "#E67E22", glow: "rgba(230,126,34,0.6)", label: "Extreme" };
    case "EXTREME": return { bg: "#C0392B", glow: "rgba(192,57,43,0.6)", label: "Legendary" };
  }
};

const getDangerSize = (level: Mission["dangerLevel"]) => {
  switch (level) { case "LOW": return 28; case "MEDIUM": return 32; case "HIGH": return 36; case "EXTREME": return 42; }
};

const getBookingCount = (id: string): number => {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return 8 + (hash % 45);
};

const createMarkerSVG = (mission: Mission, isInItinerary: boolean, isDimmed: boolean, isConquered: boolean) => {
  const colors = getDangerColor(mission.dangerLevel);
  const size = getDangerSize(mission.dangerLevel);
  const h = size * 1.35;
  const r = size * 0.4;
  const opacity = isDimmed ? 0.3 : 1;

  return `
    <svg width="${size}" height="${h}" viewBox="0 0 ${size} ${h}" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity};${isDimmed ? "filter:grayscale(0.6);" : ""}">
      <defs>
        <radialGradient id="g" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${isConquered ? '#D4A24C' : colors.bg}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${isConquered ? '#B8860B' : colors.bg}" stop-opacity="0.7"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="${size / 2}" cy="${h - 3}" rx="${size * 0.25}" ry="3" fill="${isConquered ? '#D4A24C' : colors.bg}" opacity="0.25"/>
      <path d="M${size / 2} 2 C${size * 0.22} 2 2 ${size * 0.32} 2 ${size * 0.55} c0 ${h * 0.45} ${size / 2 - 2} ${h * 0.6} ${size / 2 - 2} ${h * 0.6} s${size / 2 - 2}-${h * 0.15} ${size / 2 - 2}-${h * 0.6} C${size - 2} ${size * 0.32} ${size * 0.78} 2 ${size / 2} 2z"
            fill="url(#g)" stroke="${isConquered ? '#D4A24C' : 'white'}" stroke-width="${isConquered ? 2.5 : 1.5}" filter="url(#glow)"/>
      <circle cx="${size / 2}" cy="${size * 0.48}" r="${r}" fill="${isConquered ? '#D4A24C' : 'white'}" opacity="0.95"/>
      <circle cx="${size / 2}" cy="${size * 0.48}" r="${r * 0.55}" fill="${isConquered ? 'white' : colors.bg}"/>
      ${isConquered ? `<circle cx="${size / 2}" cy="${size * 0.48}" r="${r + 4}" fill="none" stroke="#D4A24C" stroke-width="2" opacity="0.6"/>` : ''}
      ${isInItinerary && !isConquered ? `
        <circle cx="${size - 5}" cy="5" r="7" fill="#D4A24C" stroke="white" stroke-width="1.5"/>
        <polyline points="${size - 8} 5 ${size - 6} 7 ${size - 3} 3" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      ` : ""}
    </svg>
  `;
};

const WarRoomMap = ({ selectedRealm, onAddToItinerary, itineraryMissions = [], filteredMissionIds, conquered = new Set() }: WarRoomMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>("dark");

  const allMissions = useMemo(
    () => (selectedRealm ? missions.filter(m => m.realmId === selectedRealm.id) : missions),
    [selectedRealm]
  );

  const hasActiveFilter = filteredMissionIds !== undefined && filteredMissionIds.size < allMissions.length;
  const isInItinerary = (id: string) => itineraryMissions.some(m => m.id === id);
  const isFiltered = (id: string) => !filteredMissionIds || filteredMissionIds.has(id);
  const filteredCount = hasActiveFilter ? allMissions.filter(m => isFiltered(m.id)).length : allMissions.length;

  const difficultyLevels = [
    { color: "#4CAF50", label: "Moderate", count: allMissions.filter(m => m.dangerLevel === "LOW" && isFiltered(m.id)).length },
    { color: "#D4A24C", label: "Hard", count: allMissions.filter(m => m.dangerLevel === "MEDIUM" && isFiltered(m.id)).length },
    { color: "#E67E22", label: "Extreme", count: allMissions.filter(m => m.dangerLevel === "HIGH" && isFiltered(m.id)).length },
    { color: "#C0392B", label: "Legendary", count: allMissions.filter(m => m.dangerLevel === "EXTREME" && isFiltered(m.id)).length },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, style: MAP_STYLES[mapStyle],
      center: OKC_CENTER, zoom: 5.5, pitch: 45, bearing: -5,
      antialias: true, attributionControl: false,
    });
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true }), "bottom-right");
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    return () => { map.current?.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(MAP_STYLES[mapStyle]);
  }, [mapStyle]);

  useEffect(() => {
    if (!map.current) return;
    const renderMarkers = () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // HQ marker
      const hqEl = document.createElement("div");
      hqEl.innerHTML = `
        <div class="mapbox-hq-marker">
          <div class="hq-sonar-ring"></div>
          <div class="hq-sonar-ring hq-sonar-ring-delayed"></div>
          <div class="hq-core">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(40,72%,52%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span class="hq-tag">HQ</span>
        </div>
      `;
      new mapboxgl.Marker({ element: hqEl, anchor: "center" })
        .setLngLat(OKC_CENTER)
        .setPopup(new mapboxgl.Popup({ offset: 25, className: "mapbox-popup-dark" }).setHTML(`
          <div style="padding:14px;text-align:center;">
            <p style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:hsl(40,20%,90%);letter-spacing:2px;text-transform:uppercase;">OKC Basecamp</p>
            <p style="font-size:10px;color:hsl(220,8%,50%);margin-top:4px;">Mission Control · Ground Zero</p>
            <div style="margin-top:8px;height:1px;background:linear-gradient(90deg,transparent,hsl(40,72%,52%,0.3),transparent)"></div>
            <p style="font-size:9px;color:hsl(220,8%,50%);margin-top:6px;font-family:'Barlow Condensed',sans-serif;">35.47°N · 97.52°W</p>
          </div>
        `))
        .addTo(map.current!);

      allMissions.forEach(mission => {
        const inItin = isInItinerary(mission.id);
        const isDimmed = hasActiveFilter && !isFiltered(mission.id);
        const isConq = conquered.has(mission.id);
        const colors = getDangerColor(mission.dangerLevel);
        const size = getDangerSize(mission.dangerLevel);
        const bookings = getBookingCount(mission.id);

        const el = document.createElement("div");
        el.className = "mapbox-mission-marker";
        el.style.width = `${size}px`;
        el.style.height = `${size * 1.35}px`;
        el.style.cursor = "pointer";
        el.innerHTML = createMarkerSVG(mission, inItin, isDimmed, isConq);

        const popupHTML = `
          <div style="width:260px;overflow:hidden;border-radius:12px;">
            <div style="height:110px;background-size:cover;background-position:center;position:relative;background-image:url(${getMissionImage(mission.id)})">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,hsl(220,12%,9%) 0%,hsl(220,12%,9%,0.4) 40%,transparent 100%)"></div>
              <div style="position:absolute;top:8px;right:8px;padding:2px 8px;border-radius:20px;font-size:8px;font-weight:700;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;background:${colors.bg};color:white;box-shadow:0 0 12px ${colors.glow}">${mission.dangerLevel}</div>
              ${isConq ? '<div style="position:absolute;top:8px;left:8px;padding:2px 8px;border-radius:20px;font-size:8px;font-weight:700;font-family:\'Barlow Condensed\',sans-serif;letter-spacing:1px;text-transform:uppercase;background:#D4A24C;color:#1a1a1a;">✓ CONQUERED</div>' : ''}
              <div style="position:absolute;bottom:8px;left:10px;right:10px;">
                <h4 style="font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:700;color:hsl(40,20%,90%);line-height:1.2;text-shadow:0 2px 8px hsl(0,0%,0%,0.5)">${mission.name}</h4>
              </div>
            </div>
            <div style="padding:12px;background:hsl(220,12%,9%);">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(40,72%,52%)" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style="font-size:11px;color:hsl(220,8%,50%)">${mission.city}, ${mission.state}</span>
                <span style="font-size:9px;color:hsl(220,8%,40%);margin-left:auto;font-family:'Barlow Condensed',sans-serif;letter-spacing:0.5px">${mission.distanceFromOKC}h</span>
              </div>
              <div style="font-size:9px;color:hsl(40,72%,52%);margin-bottom:6px;font-weight:600;display:flex;align-items:center;gap:4px;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Added ${bookings}x this month
              </div>
              <div style="height:1px;background:linear-gradient(90deg,transparent,hsl(220,10%,16%),transparent);margin-bottom:8px;"></div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font-weight:700;font-size:14px;font-family:'Barlow Condensed',sans-serif;color:hsl(40,72%,52%);text-shadow:0 0 8px hsl(40,72%,52%,0.2)">${mission.priceEstimate}</span>
              </div>
              <button class="map-popup-cta" data-mission-id="${mission.id}">View Mission Brief</button>
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: [0, -size * 0.6], maxWidth: "280px", className: "mapbox-popup-dark" }).setHTML(popupHTML);
        popup.on("open", () => {
          setTimeout(() => {
            document.querySelector(`button[data-mission-id="${mission.id}"]`)?.addEventListener("click", () => {
              setSelectedMission(mission); popup.remove();
            });
          }, 50);
        });

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([mission.coordinates.lng, mission.coordinates.lat])
          .setPopup(popup).addTo(map.current!);
        markersRef.current.push(marker);
      });
    };

    if (map.current.isStyleLoaded()) renderMarkers();
    else map.current.once("style.load", renderMarkers);
  }, [allMissions, itineraryMissions, filteredMissionIds, hasActiveFilter, mapStyle, conquered]);

  useEffect(() => {
    if (!map.current || allMissions.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend(OKC_CENTER);
    allMissions.forEach(m => bounds.extend([m.coordinates.lng, m.coordinates.lat]));
    const fitMap = () => map.current!.fitBounds(bounds, { padding: 80, maxZoom: 7, pitch: 45, bearing: -5, duration: 1200 });
    if (map.current.isStyleLoaded()) fitMap();
    else map.current.once("style.load", fitMap);
  }, [allMissions]);

  const cycleStyle = () => {
    const keys = Object.keys(MAP_STYLES) as (keyof typeof MAP_STYLES)[];
    setMapStyle(keys[(keys.indexOf(mapStyle) + 1) % keys.length]);
  };

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-[55]" : ""}`} id="map-section" role="region" aria-label="Adventure map">
      <div className={`relative w-full overflow-hidden rounded-2xl border border-border/20 shadow-[0_8px_40px_hsl(0_0%_0%/0.5)] ${isFullscreen ? "h-full rounded-none" : "h-[85vh] min-h-[500px] max-md:h-[500px]"}`}>
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(220,15%,6%,0.4) 100%)" }} />
        <div ref={mapContainer} className="w-full h-full" />

        {/* HUD: Title */}
        <div className="absolute top-3 left-3 z-[10]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center shadow-[0_0_16px_hsl(var(--gold)/0.2)]">
                <Compass className="w-[18px] h-[18px] text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-orbitron text-[10px] text-foreground tracking-[3px]">ADVENTURE MAP</h2>
                <p className="text-[9px] text-muted-foreground tracking-wide mt-0.5 font-sans">
                  {selectedRealm?.name || "All Regions"} · <span className="text-primary font-semibold">{filteredCount}</span> Experiences
                  {hasActiveFilter && <span className="text-muted-foreground/40"> / {allMissions.length}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {hasActiveFilter && (
          <div className="absolute top-16 left-3 z-[10]">
            <div className="glass-premium rounded-lg px-3 py-2 flex items-center gap-2 animate-fade-in-up">
              <Filter className="w-3 h-3 text-primary" />
              <span className="text-[9px] text-muted-foreground font-sans">Filters active</span>
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 z-[10] flex items-center gap-2">
          <button onClick={cycleStyle}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group" title={`Style: ${mapStyle}`}>
            <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center glass-premium rounded-lg text-muted-foreground hover:text-primary transition-all group">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 z-[10]">
          <div className="glass-premium rounded-xl px-4 py-3">
            <p className="text-[7px] text-muted-foreground tracking-[3px] uppercase mb-2 font-orbitron">Difficulty</p>
            <div className="flex items-center gap-3">
              {difficultyLevels.map(level => (
                <div key={level.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color, boxShadow: `0 0 6px ${level.color}40` }} />
                  <span className="text-[9px] text-muted-foreground font-medium font-sans">
                    {level.label}{level.count > 0 && <span className="text-primary/50 ml-0.5">({level.count})</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-[10]">
          <div className="glass-premium rounded-xl px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Navigation className="w-2.5 h-2.5 text-primary/60" />
              </div>
              <div>
                <p className="text-[8px] text-muted-foreground tracking-wider uppercase font-sans">Explore</p>
                <p className="text-[9px] text-primary font-semibold font-sans">Click pins for details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedMission && (
        <MissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)}
          onAddToItinerary={() => onAddToItinerary?.(selectedMission)}
          isInItinerary={itineraryMissions.some(m => m.id === selectedMission.id)}
          isConquered={conquered.has(selectedMission.id)} />
      )}
    </div>
  );
};

export default WarRoomMap;
