// Accurate SVG paths for state boundaries
// Coordinates optimized for viewBox "0 0 800 400"

export const statePaths = {
  oklahoma: {
    path: `M 145 165 
           L 505 165 
           L 505 170 
           L 560 170 
           L 560 200 
           L 505 200 
           L 505 255 
           L 145 255 
           L 145 165 Z`,
    label: { x: 325, y: 215 },
    labelShort: "OK",
  },
  texas: {
    path: `M 145 255 
           L 505 255 
           L 505 200 
           L 560 200 
           L 560 280 
           L 540 280 
           L 540 320 
           L 480 380 
           L 320 380 
           L 280 350 
           L 145 350 
           L 145 255 Z`,
    label: { x: 380, y: 315 },
    labelShort: "TX",
  },
  kansas: {
    path: `M 145 90 
           L 505 90 
           L 505 165 
           L 145 165 
           L 145 90 Z`,
    label: { x: 325, y: 130 },
    labelShort: "KS",
  },
  arkansas: {
    path: `M 560 170 
           L 680 170 
           L 680 310 
           L 560 280 
           L 560 170 Z`,
    label: { x: 620, y: 235 },
    labelShort: "AR",
  },
  missouri: {
    path: `M 505 90 
           L 680 90 
           L 680 170 
           L 560 170 
           L 505 165 
           L 505 90 Z`,
    label: { x: 590, y: 130 },
    labelShort: "MO",
  },
  colorado: {
    path: `M 40 70 
           L 145 70 
           L 145 180 
           L 40 180 
           L 40 70 Z`,
    label: { x: 92, y: 125 },
    labelShort: "CO",
  },
  newMexico: {
    path: `M 40 180 
           L 145 180 
           L 145 360 
           L 40 360 
           L 40 180 Z`,
    label: { x: 92, y: 270 },
    labelShort: "NM",
  },
};

// Major cities with accurate positioning
export const majorCities = [
  { name: "Tulsa", lat: 36.1540, lng: -95.9928, importance: "major" },
  { name: "Dallas", lat: 32.7767, lng: -96.7970, importance: "major" },
  { name: "Wichita", lat: 37.6872, lng: -97.3301, importance: "major" },
  { name: "Austin", lat: 30.2672, lng: -97.7431, importance: "secondary" },
  { name: "Fort Worth", lat: 32.7555, lng: -97.3308, importance: "major" },
  { name: "Little Rock", lat: 34.7465, lng: -92.2896, importance: "secondary" },
  { name: "Amarillo", lat: 35.2220, lng: -101.8313, importance: "secondary" },
  { name: "Lubbock", lat: 33.5779, lng: -101.8552, importance: "secondary" },
  { name: "Lawton", lat: 34.6036, lng: -98.3959, importance: "minor" },
  { name: "Norman", lat: 35.2226, lng: -97.4395, importance: "minor" },
];

// Highways for tactical feel
export const highways = [
  { from: "OKC", to: "Dallas", path: "M 310 200 Q 320 280 400 315" },
  { from: "OKC", to: "Tulsa", path: "M 310 200 Q 400 180 450 175" },
  { from: "OKC", to: "Wichita", path: "M 310 200 Q 320 150 335 105" },
];

// Rivers for terrain detail
export const rivers = [
  { name: "Red River", path: "M 145 255 Q 280 260 400 255 Q 500 250 560 280" },
  { name: "Arkansas River", path: "M 680 220 Q 600 200 450 175 Q 350 185 310 200" },
];