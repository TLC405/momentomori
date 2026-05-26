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
    case "LOW": return { bg: "#5BB46B", deep: "#2E6B3A", glow: "rgba(91,180,107,0.55)", label: "Moderate" };
    case "MEDIUM": return { bg: "#E0B255", deep: "#7A5A1E", glow: "rgba(224,178,85,0.55)", label: "Hard" };
    case "HIGH": return { bg: "#EE8A3A", deep: "#7C3F0E", glow: "rgba(238,138,58,0.55)", label: "Extreme" };
    case "EXTREME": return { bg: "#D44A3F", deep: "#651912", glow: "rgba(212,74,63,0.6)", label: "Legendary" };
  }
};

const getDangerSize = (level: Mission["dangerLevel"]) => {
  switch (level) { case "LOW": return 36; case "MEDIUM": return 40; case "HIGH": return 44; case "EXTREME": return 50; }
};

const getBookingCount = (id: string): number => {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return 8 + (hash % 45);
};

const createMarkerSVG = (mission: Mission, isInItinerary: boolean, isDimmed: boolean, isConquered: boolean) => {
  const colors = getDangerColor(mission.dangerLevel);
  const size = getDangerSize(mission.dangerLevel);
  const W = size + 16;
  const H = size + 28;
  const cx = W / 2;
  const cy = size / 2 + 6;
  const r = size / 2;
  const opacity = isDimmed ? 0.28 : 1;
  const uid = mission.id.replace(/[^a-z0-9]/gi, '');

  // Crest icon by difficulty (clean line iconography)
  const ic = isConquered ? '#1a1208' : '#FFF8E7';
  const iconSvg = mission.dangerLevel === "EXTREME"
    ? `<path d="M${cx} ${cy - r * 0.45} L${cx + r * 0.42} ${cy + r * 0.35} L${cx - r * 0.42} ${cy + r * 0.35} Z" fill="none" stroke="${ic}" stroke-width="1.6" stroke-linejoin="round"/>
       <line x1="${cx}" y1="${cy - r * 0.05}" x2="${cx}" y2="${cy + r * 0.15}" stroke="${ic}" stroke-width="1.6" stroke-linecap="round"/>
       <circle cx="${cx}" cy="${cy + r * 0.28}" r="0.9" fill="${ic}"/>`
    : mission.dangerLevel === "HIGH"
    ? `<path d="M${cx - r * 0.5} ${cy + r * 0.3} L${cx - r * 0.18} ${cy - r * 0.3} L${cx + r * 0.05} ${cy + r * 0.05} L${cx + r * 0.3} ${cy - r * 0.45} L${cx + r * 0.5} ${cy + r * 0.3}" fill="none" stroke="${ic}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
    : mission.dangerLevel === "MEDIUM"
    ? `<path d="M${cx - r * 0.5} ${cy + r * 0.3} L${cx - r * 0.15} ${cy - r * 0.25} L${cx + r * 0.1} ${cy + r * 0.05} L${cx + r * 0.5} ${cy - r * 0.4}" fill="none" stroke="${ic}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="${cx + r * 0.5}" cy="${cy - r * 0.4}" r="1.4" fill="${ic}"/>`
    : `<circle cx="${cx}" cy="${cy}" r="${r * 0.32}" fill="none" stroke="${ic}" stroke-width="1.5"/>
       <circle cx="${cx}" cy="${cy}" r="1.4" fill="${ic}"/>`;

  // Ornamental tick marks around the medallion ring
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + 1.5);
    const y1 = cy + Math.sin(a) * (r + 1.5);
    const x2 = cx + Math.cos(a) * (r + 4);
    const y2 = cy + Math.sin(a) * (r + 4);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isConquered ? '#E8C26A' : '#D4A24C'}" stroke-width="0.9" opacity="0.55" stroke-linecap="round"/>`;
  }).join('');

  return `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity};overflow:visible;${isDimmed ? 'filter:grayscale(0.7) brightness(0.6);' : ''}">
      <defs>
        <radialGradient id="bezel-${uid}" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stop-color="#F5D788"/>
          <stop offset="45%" stop-color="#D4A24C"/>
          <stop offset="100%" stop-color="#7A5418"/>
        </radialGradient>
        <radialGradient id="face-${uid}" cx="0.5" cy="0.35" r="0.85">
          <stop offset="0%" stop-color="${colors.bg}" stop-opacity="1"/>
          <stop offset="70%" stop-color="${colors.bg}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${colors.deep}" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="gloss-${uid}" x1="0.2" y1="0" x2="0.5" y2="0.6">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="#ffffff" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="halo-${uid}" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="${colors.bg}" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="${colors.bg}" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
        </radialGradient>
        <filter id="soft-${uid}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6"/>
        </filter>
      </defs>

      <!-- Outer halo glow -->
      <circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="url(#halo-${uid})"/>

      <!-- Animated pulse ring -->
      <circle cx="${cx}" cy="${cy}" r="${r + 3}" fill="none" stroke="${isConquered ? '#E8C26A' : colors.bg}" stroke-width="1" opacity="0.45" class="pin-pulse-ring" style="transform-origin:${cx}px ${cy}px"/>

      <!-- Drop stem (anchor to map) -->
      <path d="M${cx - 4} ${cy + r - 1} Q${cx} ${cy + r + 8} ${cx} ${H - 4} Q${cx} ${cy + r + 8} ${cx + 4} ${cy + r - 1} Z"
        fill="url(#bezel-${uid})" stroke="#3a2a10" stroke-width="0.5"/>
      <circle cx="${cx}" cy="${H - 4}" r="1.6" fill="#1a1208"/>

      <!-- Ground shadow -->
      <ellipse cx="${cx}" cy="${H - 2}" rx="${r * 0.5}" ry="2" fill="#000" opacity="0.45" filter="url(#soft-${uid})"/>

      <!-- Outer bezel (gold ring) -->
      <circle cx="${cx}" cy="${cy}" r="${r + 1}" fill="url(#bezel-${uid})" stroke="#3a2a10" stroke-width="0.6"/>

      <!-- Decorative tick marks -->
      ${ticks}

      <!-- Inner dark groove -->
      <circle cx="${cx}" cy="${cy}" r="${r - 1.5}" fill="none" stroke="#2a1d08" stroke-width="0.8" opacity="0.7"/>

      <!-- Medallion face -->
      <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="url(#face-${uid})"/>

      <!-- Glossy highlight -->
      <ellipse cx="${cx - r * 0.25}" cy="${cy - r * 0.4}" rx="${r * 0.55}" ry="${r * 0.3}" fill="url(#gloss-${uid})"/>

      <!-- Inner rim -->
      <circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="#FFF8E7" stroke-width="0.5" opacity="0.35"/>

      <!-- Crest icon -->
      ${iconSvg}

      ${isConquered ? `
        <!-- Laurel crown for conquered -->
        <g transform="translate(${cx}, ${cy - r - 4})">
          <path d="M-7 4 Q-9 -2 -4 -4 Q-2 -1 -3 3 Z" fill="#E8C26A" stroke="#7A5418" stroke-width="0.5"/>
          <path d="M7 4 Q9 -2 4 -4 Q2 -1 3 3 Z" fill="#E8C26A" stroke="#7A5418" stroke-width="0.5"/>
          <path d="M-3 -2 L0 -7 L3 -2 L1.5 -1 L0 -4 L-1.5 -1 Z" fill="#F5D788" stroke="#7A5418" stroke-width="0.5"/>
        </g>
      ` : ''}

      ${isInItinerary && !isConquered ? `
        <g transform="translate(${cx + r - 2}, ${cy - r + 2})">
          <circle r="6.5" fill="#D4A24C" stroke="#FFF8E7" stroke-width="1.2"/>
          <polyline points="-3,0 -1,2.5 3,-2.5" fill="none" stroke="#1a1208" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      ` : ''}
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

  // Fan out missions that share identical coordinates (HQ, Dallas, etc.)
  // so every pin is actually visible on the map.
  const placedMissions = useMemo(() => {
    const groups = new Map<string, Mission[]>();
    allMissions.forEach(m => {
      const k = `${m.coordinates.lat.toFixed(4)}|${m.coordinates.lng.toFixed(4)}`;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k)!.push(m);
    });
    const out: Array<Mission & { _displayLng: number; _displayLat: number }> = [];
    groups.forEach(group => {
      if (group.length === 1) {
        const m = group[0];
        out.push({ ...m, _displayLng: m.coordinates.lng, _displayLat: m.coordinates.lat });
      } else {
        // Arrange siblings on a small circle (~0.12° radius ≈ 13km)
        const R = 0.13;
        group.forEach((m, i) => {
          const angle = (i / group.length) * Math.PI * 2 - Math.PI / 2;
          out.push({
            ...m,
            _displayLng: m.coordinates.lng + Math.cos(angle) * R,
            _displayLat: m.coordinates.lat + Math.sin(angle) * R * 0.75,
          });
        });
      }
    });
    return out;
  }, [allMissions]);

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

      placedMissions.forEach(mission => {
        const inItin = isInItinerary(mission.id);
        const isDimmed = hasActiveFilter && !isFiltered(mission.id);
        const isConq = conquered.has(mission.id);
        const colors = getDangerColor(mission.dangerLevel);
        const size = getDangerSize(mission.dangerLevel);
        const bookings = getBookingCount(mission.id);

        const el = document.createElement("div");
        el.className = "mapbox-mission-marker";
        el.style.width = `${size + 8}px`;
        el.style.height = `${size * 1.4 + 8}px`;
        el.style.cursor = "pointer";
        el.style.position = "relative";
        el.innerHTML = createMarkerSVG(mission, inItin, isDimmed, isConq);

        const starsSvg = Array.from({ length: 5 }).map((_, i) => {
          const filled = i < mission.broRating;
          return `<svg width="12" height="12" viewBox="0 0 24 24" fill="${filled ? 'hsl(40,72%,52%)' : 'none'}" stroke="${filled ? 'hsl(40,72%,52%)' : 'hsl(220,10%,30%)'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        }).join('');

        const popupHTML = `
          <div style="width:280px;overflow:hidden;border-radius:14px;">
            <div style="height:120px;background-size:cover;background-position:center;position:relative;background-image:url(${getMissionImage(mission.id)})">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,hsl(225,10%,13%) 0%,hsl(225,10%,13%,0.5) 40%,transparent 100%)"></div>
              <div style="position:absolute;top:8px;right:8px;padding:3px 10px;border-radius:20px;font-size:9px;font-weight:700;font-family:'Barlow Condensed',sans-serif;letter-spacing:1.5px;text-transform:uppercase;background:${colors.bg};color:white;box-shadow:0 0 14px ${colors.glow}">${colors.label}</div>
              ${isConq ? '<div style="position:absolute;top:8px;left:8px;padding:3px 10px;border-radius:20px;font-size:9px;font-weight:700;font-family:\'Barlow Condensed\',sans-serif;letter-spacing:1.5px;text-transform:uppercase;background:#D4A24C;color:#1a1a1a;">✓ CONQUERED</div>' : ''}
              <div style="position:absolute;bottom:10px;left:12px;right:12px;">
                <h4 style="font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:hsl(40,15%,92%);line-height:1.2;text-shadow:0 2px 10px hsl(0,0%,0%,0.6)">${mission.name}</h4>
              </div>
            </div>
            <div style="padding:14px;background:hsl(225,10%,13%);">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="hsl(40,72%,52%)" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style="font-size:12px;color:hsl(220,10%,62%);font-family:'Barlow Condensed',sans-serif">${mission.city}, ${mission.state}</span>
                <span style="font-size:10px;color:hsl(220,10%,50%);margin-left:auto;font-family:'Barlow Condensed',sans-serif;letter-spacing:0.5px">${mission.distanceFromOKC}h drive</span>
              </div>
              
              <div style="display:flex;align-items:center;gap:2px;margin-bottom:8px;">${starsSvg}</div>
              
              <div style="font-size:10px;color:hsl(40,72%,52%);margin-bottom:8px;font-weight:600;display:flex;align-items:center;gap:5px;font-family:'Barlow Condensed',sans-serif;">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Added ${bookings}x this month
              </div>
              
              <div style="height:1px;background:linear-gradient(90deg,transparent,hsl(225,8%,20%),transparent);margin-bottom:10px;"></div>
              
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                <span style="font-weight:700;font-size:16px;font-family:'Barlow Condensed',sans-serif;color:hsl(40,72%,52%);text-shadow:0 0 10px hsl(40,72%,52%,0.25)">${mission.priceEstimate}</span>
                <span style="font-size:11px;color:hsl(220,10%,62%);font-family:'Barlow Condensed',sans-serif;">${mission.duration}</span>
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
      <div className={`relative w-full overflow-hidden rounded-2xl saga-border ${isFullscreen ? "h-full rounded-none" : "h-[85vh] min-h-[500px] max-md:h-[500px]"}`}>
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(0,70%,18%,0.10) 0%, transparent 45%, hsl(0,55%,6%,0.6) 100%)" }} />
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "linear-gradient(180deg, hsl(0,55%,6%,0.45) 0%, transparent 18%, transparent 82%, hsl(0,55%,6%,0.55) 100%)" }} />
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
