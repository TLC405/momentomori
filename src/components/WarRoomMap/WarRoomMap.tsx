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
  const h = size * 1.4;
  const cx = size / 2;
  const cy = size * 0.42;
  const r = size * 0.32;
  const opacity = isDimmed ? 0.25 : 1;

  // Shield/badge shape path
  const shieldPath = `M${cx} 2 
    C${size * 0.18} 2, 2, ${size * 0.28}, 2, ${size * 0.5} 
    c0, ${h * 0.42}, ${cx - 2}, ${h * 0.55}, ${cx - 2}, ${h * 0.55} 
    s${cx - 2},-${h * 0.13}, ${cx - 2},-${h * 0.55} 
    C${size - 2}, ${size * 0.28}, ${size * 0.82}, 2, ${cx}, 2z`;

  // Icon paths by difficulty
  const iconSvg = mission.dangerLevel === "EXTREME"
    ? `<path d="M${cx - 4} ${cy + 3} L${cx} ${cy - 5} L${cx + 4} ${cy + 3} Z" fill="none" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linejoin="round"/>
       <line x1="${cx}" y1="${cy - 1}" x2="${cx}" y2="${cy + 1}" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linecap="round"/>
       <circle cx="${cx}" cy="${cy + 2.5}" r="0.5" fill="${isConquered ? '#1a1a1a' : 'white'}"/>`
    : mission.dangerLevel === "HIGH"
    ? `<path d="M${cx - 4} ${cy + 3} L${cx - 2} ${cy - 2} L${cx} ${cy + 1} L${cx + 2} ${cy - 4} L${cx + 4} ${cy + 3}" fill="none" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
    : mission.dangerLevel === "MEDIUM"
    ? `<circle cx="${cx}" cy="${cy}" r="3" fill="none" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5"/>
       <line x1="${cx}" y1="${cy - 1.5}" x2="${cx}" y2="${cy + 1.5}" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linecap="round"/>
       <line x1="${cx - 1.5}" y1="${cy}" x2="${cx + 1.5}" y2="${cy}" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linecap="round"/>`
    : `<path d="M${cx - 3} ${cy + 2} L${cx} ${cy - 3} L${cx + 3} ${cy + 2}" fill="none" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
       <line x1="${cx}" y1="${cy + 2}" x2="${cx}" y2="${cy - 1}" stroke="${isConquered ? '#1a1a1a' : 'white'}" stroke-width="1" stroke-linecap="round"/>`;

  return `
    <svg width="${size + 8}" height="${h + 8}" viewBox="-4 -4 ${size + 8} ${h + 8}" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity};overflow:visible;${isDimmed ? 'filter:grayscale(0.7) brightness(0.6);' : ''}">
      <defs>
        <linearGradient id="shield-${mission.id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${isConquered ? '#e8c252' : colors.bg}" stop-opacity="1"/>
          <stop offset="60%" stop-color="${isConquered ? '#B8860B' : colors.bg}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${isConquered ? '#8B6914' : colors.bg}" stop-opacity="0.7"/>
        </linearGradient>
        <linearGradient id="highlight-${mission.id}" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0.35"/>
          <stop offset="40%" stop-color="white" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
        <filter id="glow-${mission.id}">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="inner-shadow-${mission.id}">
          <feComponentTransfer in="SourceAlpha"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>
          <feGaussianBlur stdDeviation="2"/>
          <feOffset dx="0" dy="1" result="offsetblur"/>
          <feFlood flood-color="${isConquered ? '#B8860B' : colors.bg}" flood-opacity="0.4" result="color"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feComposite in2="SourceAlpha" operator="in"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge>
        </filter>
      </defs>
      
      <!-- Outer glow ring (animated via CSS) -->
      <ellipse cx="${cx}" cy="${cy}" rx="${r + 8}" ry="${r + 8}" fill="none" stroke="${isConquered ? '#D4A24C' : colors.bg}" stroke-width="1.5" opacity="0.3" class="pin-pulse-ring"/>
      
      <!-- Ground shadow -->
      <ellipse cx="${cx}" cy="${h + 1}" rx="${size * 0.28}" ry="3.5" fill="black" opacity="0.3" filter="url(#glow-${mission.id})"/>
      
      <!-- Shield body -->
      <path d="${shieldPath}" fill="url(#shield-${mission.id})" stroke="${isConquered ? '#D4A24C' : 'rgba(255,255,255,0.3)'}" stroke-width="1" filter="url(#glow-${mission.id})"/>
      
      <!-- Highlight bevel -->
      <path d="${shieldPath}" fill="url(#highlight-${mission.id})" stroke="none"/>
      
      <!-- Inner circle bg -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${isConquered ? '#D4A24C' : 'rgba(0,0,0,0.35)'}" stroke="${isConquered ? 'white' : 'rgba(255,255,255,0.2)'}" stroke-width="1"/>
      
      <!-- Icon -->
      ${iconSvg}
      
      ${isConquered ? `
        <!-- Crown for conquered -->
        <g transform="translate(${cx - 6}, ${cy - r - 10})">
          <path d="M0 8 L3 3 L6 6 L9 1 L12 8 Z" fill="#D4A24C" stroke="white" stroke-width="0.8"/>
        </g>
        <!-- Radial burst -->
        <circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="none" stroke="#D4A24C" stroke-width="0.8" opacity="0.2" stroke-dasharray="2 4"/>
      ` : ''}
      
      ${isInItinerary && !isConquered ? `
        <circle cx="${size - 2}" cy="4" r="7" fill="#D4A24C" stroke="white" stroke-width="1.5"/>
        <polyline points="${size - 5} 4 ${size - 3} 6 ${size} 2" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
