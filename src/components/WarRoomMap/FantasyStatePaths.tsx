// Hand-drawn style state boundaries for fantasy map aesthetic

export const fantasyStatePaths = {
  oklahoma: {
    // More organic, hand-drawn style path
    path: `M 145 167 
           Q 148 165 200 166 
           Q 300 164 400 165 
           Q 450 166 505 165 
           L 505 170 
           Q 530 169 560 170 
           Q 558 185 560 200 
           L 505 200 
           Q 506 230 505 255 
           Q 400 256 300 255 
           Q 200 254 145 255 
           Q 146 210 145 167 Z`,
    label: { x: 325, y: 212 },
    labelShort: "OK",
    fantasyName: "OKLAHOMA",
    fantasySubtitle: "The Red Lands",
  },
  texas: {
    path: `M 145 255 
           Q 200 254 300 255 
           Q 400 256 505 255 
           L 505 200 
           Q 530 199 560 200 
           Q 559 240 560 280 
           Q 550 279 540 280 
           Q 541 300 540 320 
           Q 510 350 480 380 
           Q 400 381 320 380 
           Q 300 365 280 350 
           Q 200 351 145 350 
           Q 146 300 145 255 Z`,
    label: { x: 380, y: 315 },
    labelShort: "TX",
    fantasyName: "TEXAS",
    fantasySubtitle: "The Lone Star Realm",
  },
  kansas: {
    path: `M 145 92 
           Q 200 91 300 90 
           Q 400 89 505 90 
           Q 504 125 505 165 
           Q 400 166 300 165 
           Q 200 164 145 165 
           Q 146 128 145 92 Z`,
    label: { x: 325, y: 130 },
    labelShort: "KS",
    fantasyName: "KANSAS",
    fantasySubtitle: "The Wheat Plains",
  },
  arkansas: {
    path: `M 560 170 
           Q 620 169 680 170 
           Q 679 240 680 310 
           Q 620 295 560 280 
           Q 561 225 560 170 Z`,
    label: { x: 620, y: 235 },
    labelShort: "AR",
    fantasyName: "ARKANSAS",
    fantasySubtitle: "The Natural State",
  },
  missouri: {
    path: `M 505 90 
           Q 590 89 680 90 
           Q 679 130 680 170 
           Q 620 169 560 170 
           L 505 165 
           Q 505 128 505 90 Z`,
    label: { x: 590, y: 130 },
    labelShort: "MO",
    fantasyName: "MISSOURI",
    fantasySubtitle: "The Gateway",
  },
  colorado: {
    path: `M 40 72 
           Q 92 71 145 70 
           Q 144 125 145 180 
           Q 92 179 40 180 
           Q 41 126 40 72 Z`,
    label: { x: 92, y: 125 },
    labelShort: "CO",
    fantasyName: "COLORADO",
    fantasySubtitle: "The Mountains",
  },
  newMexico: {
    path: `M 40 180 
           Q 92 179 145 180 
           Q 144 270 145 360 
           Q 92 359 40 360 
           Q 41 270 40 180 Z`,
    label: { x: 92, y: 270 },
    labelShort: "NM",
    fantasyName: "NEW MEXICO",
    fantasySubtitle: "The Enchanted Lands",
  },
};

// Rivers with more organic, hand-drawn paths
export const fantasyRivers = [
  { 
    name: "Red River", 
    path: "M 145 255 Q 180 258 220 256 Q 280 252 340 255 Q 400 258 450 253 Q 500 248 550 275 Q 555 278 560 280",
    width: 3
  },
  { 
    name: "Arkansas River", 
    path: "M 680 220 Q 640 215 600 205 Q 550 195 500 185 Q 450 180 400 188 Q 350 195 310 200",
    width: 2.5
  },
  { 
    name: "Canadian River", 
    path: "M 145 220 Q 200 225 260 218 Q 320 212 380 220 Q 440 228 500 225",
    width: 2
  },
  { 
    name: "Cimarron River", 
    path: "M 145 190 Q 180 188 220 192 Q 280 195 340 190 Q 400 185 450 188",
    width: 1.5
  },
];

// Major cities with fantasy names
export const fantasyCities = [
  { name: "Tulsa", fantasyName: "Tulsa", lat: 36.1540, lng: -95.9928, importance: "major", symbol: "🏰" },
  { name: "Dallas", fantasyName: "Dallas", lat: 32.7767, lng: -96.7970, importance: "major", symbol: "🏰" },
  { name: "Wichita", fantasyName: "Wichita", lat: 37.6872, lng: -97.3301, importance: "major", symbol: "🏰" },
  { name: "Austin", fantasyName: "Austin", lat: 30.2672, lng: -97.7431, importance: "secondary", symbol: "🏛️" },
  { name: "Fort Worth", fantasyName: "Fort Worth", lat: 32.7555, lng: -97.3308, importance: "major", symbol: "🏰" },
  { name: "Little Rock", fantasyName: "Little Rock", lat: 34.7465, lng: -92.2896, importance: "secondary", symbol: "🏛️" },
  { name: "Amarillo", fantasyName: "Amarillo", lat: 35.2220, lng: -101.8313, importance: "secondary", symbol: "⛺" },
  { name: "Lubbock", fantasyName: "Lubbock", lat: 33.5779, lng: -101.8552, importance: "secondary", symbol: "⛺" },
  { name: "Lawton", fantasyName: "Lawton", lat: 34.6036, lng: -98.3959, importance: "minor", symbol: "🏕️" },
  { name: "Norman", fantasyName: "Norman", lat: 35.2226, lng: -97.4395, importance: "minor", symbol: "🏕️" },
];
