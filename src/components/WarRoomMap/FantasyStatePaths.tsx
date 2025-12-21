// Hand-drawn style state boundaries with fantasy kingdom names and lore

export const fantasyStatePaths = {
  oklahoma: {
    // Organic, hand-drawn wobbly border
    path: `M 145 167 
           Q 150 164 180 166 Q 220 163 260 167 Q 300 164 340 166 
           Q 380 163 420 167 Q 460 164 505 165 
           L 507 170 
           Q 520 168 540 170 Q 555 169 560 170 
           Q 559 180 560 190 Q 558 195 560 200 
           L 506 201 Q 505 202 505 200 
           Q 507 220 505 240 Q 506 248 505 255 
           Q 450 257 400 255 Q 350 258 300 255 
           Q 250 257 200 255 Q 175 256 145 255 
           Q 147 220 145 185 Q 146 175 145 167 Z`,
    innerPath: `M 150 172 
                Q 155 169 185 171 Q 225 168 265 172 Q 305 169 345 171 
                Q 385 168 425 172 Q 465 169 500 170 
                L 502 175 
                Q 515 173 535 175 Q 550 174 555 175 
                Q 554 185 555 195 Q 553 199 555 203 
                L 502 204 Q 501 205 501 203 
                Q 503 223 501 243 Q 502 249 501 252 
                Q 448 254 398 252 Q 348 255 298 252 
                Q 248 254 198 252 Q 173 253 150 252 
                Q 152 218 150 188 Q 151 180 150 172 Z`,
    label: { x: 325, y: 212 },
    labelShort: "OK",
    fantasyName: "OKLAHOMA",
    fantasyTitle: "THE HEARTLANDS",
    fantasySubtitle: "Realm of the Red Earth Kings",
    motto: "Labor Omnia Vincit",
    sigil: "🦬",
    color: "hsl(38, 60%, 20%)",
  },
  texas: {
    path: `M 145 255 
           Q 175 254 200 256 Q 250 253 300 256 Q 350 254 400 256 
           Q 450 253 505 255 
           L 505 200 
           Q 520 198 540 200 Q 555 199 560 200 
           Q 559 230 560 260 Q 558 270 560 280 
           Q 555 279 545 280 Q 540 281 540 280 
           Q 542 300 540 320 Q 538 335 530 350 
           Q 515 365 495 380 Q 450 382 400 380 
           Q 370 378 340 380 Q 320 368 300 355 
           Q 280 352 260 355 Q 220 353 180 355 Q 160 354 145 355 
           Q 147 320 145 285 Q 146 270 145 255 Z`,
    label: { x: 380, y: 320 },
    labelShort: "TX",
    fantasyName: "TEXAS",
    fantasyTitle: "THE LONE STAR DOMINION",
    fantasySubtitle: "Where Dragons Once Roamed",
    motto: "Friendship",
    sigil: "⭐",
    color: "hsl(30, 45%, 18%)",
  },
  kansas: {
    path: `M 145 92 
           Q 175 90 200 93 Q 250 90 300 92 Q 350 89 400 92 Q 450 90 505 90 
           Q 504 110 505 130 Q 506 148 505 165 
           Q 450 167 400 165 Q 350 168 300 165 Q 250 167 200 165 Q 175 166 145 165 
           Q 146 145 145 125 Q 147 108 145 92 Z`,
    label: { x: 325, y: 130 },
    labelShort: "KS",
    fantasyName: "KANSAS",
    fantasyTitle: "THE GOLDEN WHEAT EXPANSE",
    fantasySubtitle: "Breadbasket of the Realm",
    motto: "Ad Astra per Aspera",
    sigil: "🌾",
    color: "hsl(45, 40%, 22%)",
  },
  arkansas: {
    path: `M 560 170 
           Q 590 168 620 170 Q 650 169 680 170 
           Q 678 200 680 230 Q 679 265 680 300 Q 678 305 680 310 
           Q 650 305 620 295 Q 590 285 560 280 
           Q 562 240 560 200 Q 561 185 560 170 Z`,
    label: { x: 618, y: 235 },
    labelShort: "AR",
    fantasyName: "ARKANSAS",
    fantasyTitle: "THE NATURAL FRONTIER",
    fantasySubtitle: "Land of Opportunity",
    motto: "Regnat Populus",
    sigil: "💎",
    color: "hsl(200, 30%, 18%)",
  },
  missouri: {
    path: `M 505 90 
           Q 550 88 590 90 Q 635 89 680 90 
           Q 679 110 680 130 Q 678 150 680 170 
           Q 650 168 620 170 Q 590 169 560 170 
           L 505 165 
           Q 504 145 505 125 Q 506 108 505 90 Z`,
    label: { x: 590, y: 130 },
    labelShort: "MO",
    fantasyName: "MISSOURI",
    fantasyTitle: "THE GATEWAY",
    fantasySubtitle: "Heart of the Continental Crossing",
    motto: "Salus Populi Suprema Lex Esto",
    sigil: "🐻",
    color: "hsl(220, 25%, 20%)",
  },
  colorado: {
    path: `M 40 72 
           Q 70 70 92 72 Q 118 71 145 70 
           Q 144 100 145 130 Q 146 155 145 180 
           Q 118 179 92 180 Q 66 179 40 180 
           Q 41 150 40 126 Q 42 99 40 72 Z`,
    label: { x: 92, y: 125 },
    labelShort: "CO",
    fantasyName: "COLORADO",
    fantasyTitle: "THE MOUNTAIN REALM",
    fantasySubtitle: "Peaks of the Ancient Giants",
    motto: "Nil Sine Numine",
    sigil: "🏔️",
    color: "hsl(210, 35%, 22%)",
  },
  newMexico: {
    path: `M 40 180 
           Q 70 178 92 180 Q 118 179 145 180 
           Q 144 230 145 270 Q 146 315 145 360 
           Q 118 359 92 360 Q 66 359 40 360 
           Q 41 315 40 270 Q 42 225 40 180 Z`,
    label: { x: 92, y: 270 },
    labelShort: "NM",
    fantasyName: "NEW MEXICO",
    fantasyTitle: "THE ENCHANTED LANDS",
    fantasySubtitle: "Desert of a Thousand Secrets",
    motto: "Crescit Eundo",
    sigil: "☀️",
    color: "hsl(25, 45%, 20%)",
  },
};

// Rivers with more organic, hand-drawn flowing paths
export const fantasyRivers = [
  { 
    name: "Red River", 
    fantasyName: "The Crimson Flow",
    path: "M 145 255 Q 160 258 180 256 Q 210 260 240 254 Q 280 250 320 256 Q 360 260 400 253 Q 440 248 480 255 Q 520 260 550 270 Q 555 275 560 280",
    tributaries: [
      "M 200 256 Q 210 270 225 280",
      "M 350 254 Q 360 268 380 275",
    ],
    width: 3.5,
    importance: "major"
  },
  { 
    name: "Arkansas River", 
    fantasyName: "The Serpent's Path",
    path: "M 680 220 Q 650 218 620 210 Q 580 200 540 192 Q 500 185 460 190 Q 420 195 380 200 Q 340 205 310 200 Q 280 195 250 198",
    tributaries: [
      "M 580 200 Q 590 185 595 170",
      "M 450 188 Q 445 175 440 160",
    ],
    width: 3,
    importance: "major"
  },
  { 
    name: "Canadian River", 
    fantasyName: "The Northern Passage",
    path: "M 145 220 Q 180 225 220 218 Q 270 212 320 220 Q 370 228 420 222 Q 470 216 500 225",
    tributaries: [
      "M 280 216 Q 290 200 295 185",
    ],
    width: 2.5,
    importance: "secondary"
  },
  { 
    name: "Cimarron River", 
    fantasyName: "The Wild Serpent",
    path: "M 145 188 Q 170 186 200 190 Q 240 195 280 188 Q 330 182 380 188 Q 420 193 450 186",
    width: 2,
    importance: "secondary"
  },
  {
    name: "Washita River",
    fantasyName: "The Whispering Waters",
    path: "M 200 245 Q 240 250 280 242 Q 320 235 360 248",
    width: 1.8,
    importance: "minor"
  },
  {
    name: "Brazos River",
    fantasyName: "The Arms of God",
    path: "M 350 270 Q 380 300 400 340 Q 420 370 440 390",
    width: 2.2,
    importance: "secondary"
  },
];

// Lakes with fantasy names
export const fantasyLakes = [
  {
    name: "Lake Texoma",
    fantasyName: "Texoma Sea",
    cx: 400,
    cy: 260,
    rx: 12,
    ry: 8,
  },
  {
    name: "Grand Lake",
    fantasyName: "The Grand Waters",
    cx: 540,
    cy: 175,
    rx: 8,
    ry: 6,
  },
  {
    name: "Lake Eufaula",
    fantasyName: "Eufaula Deep",
    cx: 480,
    cy: 220,
    rx: 7,
    ry: 5,
  },
  {
    name: "Lake Murray",
    fantasyName: "Murray's Rest",
    cx: 340,
    cy: 252,
    rx: 5,
    ry: 4,
  },
];

// Major cities with fantasy names and importance
export const fantasyCities = [
  { 
    name: "Tulsa", 
    fantasyName: "Tulsa", 
    fantasyTitle: "The Oil Capital",
    lat: 36.1540, 
    lng: -95.9928, 
    importance: "major", 
    symbol: "🏰",
    population: "large"
  },
  { 
    name: "Dallas", 
    fantasyName: "Dallas", 
    fantasyTitle: "The Southern Citadel",
    lat: 32.7767, 
    lng: -96.7970, 
    importance: "major", 
    symbol: "🏰",
    population: "metropolis"
  },
  { 
    name: "Wichita", 
    fantasyName: "Wichita", 
    fantasyTitle: "Air Capital of the World",
    lat: 37.6872, 
    lng: -97.3301, 
    importance: "major", 
    symbol: "🏰",
    population: "large"
  },
  { 
    name: "Austin", 
    fantasyName: "Austin", 
    fantasyTitle: "Keep It Weird Capital",
    lat: 30.2672, 
    lng: -97.7431, 
    importance: "major", 
    symbol: "🏛️",
    population: "metropolis"
  },
  { 
    name: "Fort Worth", 
    fantasyName: "Fort Worth", 
    fantasyTitle: "Where the West Begins",
    lat: 32.7555, 
    lng: -97.3308, 
    importance: "major", 
    symbol: "🏰",
    population: "large"
  },
  { 
    name: "Little Rock", 
    fantasyName: "Little Rock", 
    fantasyTitle: "The Rock of the Natural State",
    lat: 34.7465, 
    lng: -92.2896, 
    importance: "secondary", 
    symbol: "🏛️",
    population: "medium"
  },
  { 
    name: "Amarillo", 
    fantasyName: "Amarillo", 
    fantasyTitle: "Yellow Rose of Texas",
    lat: 35.2220, 
    lng: -101.8313, 
    importance: "secondary", 
    symbol: "⛺",
    population: "medium"
  },
  { 
    name: "Lubbock", 
    fantasyName: "Lubbock", 
    fantasyTitle: "Hub City",
    lat: 33.5779, 
    lng: -101.8552, 
    importance: "secondary", 
    symbol: "⛺",
    population: "medium"
  },
  { 
    name: "Lawton", 
    fantasyName: "Lawton", 
    fantasyTitle: "Fort Sill Outpost",
    lat: 34.6036, 
    lng: -98.3959, 
    importance: "minor", 
    symbol: "🏕️",
    population: "small"
  },
  { 
    name: "Norman", 
    fantasyName: "Norman", 
    fantasyTitle: "City of Learning",
    lat: 35.2226, 
    lng: -97.4395, 
    importance: "minor", 
    symbol: "📚",
    population: "medium"
  },
  {
    name: "Cushing",
    fantasyName: "Cushing",
    fantasyTitle: "Pipeline Crossroads",
    lat: 35.9851,
    lng: -96.7670,
    importance: "minor",
    symbol: "🛢️",
    population: "small"
  },
  {
    name: "Ennis",
    fantasyName: "Ennis",
    fantasyTitle: "Bluebonnet City",
    lat: 32.3293,
    lng: -96.6253,
    importance: "minor",
    symbol: "🌸",
    population: "small"
  },
];

// Ancient roads connecting major locations
export const fantasyRoads = [
  {
    name: "The King's Highway",
    path: "M 310 195 Q 350 195 400 200 Q 450 205 500 195",
    style: "major"
  },
  {
    name: "The Southern Trail",
    path: "M 310 210 Q 350 230 400 250 Q 450 280 500 320",
    style: "trade"
  },
  {
    name: "The Western Way",
    path: "M 310 200 Q 280 200 250 210 Q 200 220 150 230",
    style: "minor"
  },
];

// Landmarks and points of interest
export const fantasyLandmarks = [
  {
    name: "Wichita Mountains",
    fantasyName: "The Wichita Peaks",
    x: 220,
    y: 235,
    type: "mountains",
    description: "Ancient granite peaks rising from the prairie"
  },
  {
    name: "Arbuckle Mountains", 
    fantasyName: "The Arbuckle Highlands",
    x: 360,
    y: 248,
    type: "mountains",
    description: "Oldest mountains in North America"
  },
  {
    name: "Ouachita Mountains",
    fantasyName: "The Ouachita Range",
    x: 580,
    y: 210,
    type: "mountains",
    description: "Forested peaks of the eastern realm"
  },
  {
    name: "Ozark Plateau",
    fantasyName: "The Ozark Heights",
    x: 580,
    y: 140,
    type: "plateau",
    description: "Highland forests and crystal caves"
  },
  {
    name: "Palo Duro Canyon",
    fantasyName: "The Painted Abyss",
    x: 150,
    y: 290,
    type: "canyon",
    description: "Second largest canyon in America"
  },
  {
    name: "Cross Timbers",
    fantasyName: "The Twisted Woods",
    x: 300,
    y: 210,
    type: "forest",
    description: "Dense woodland belt of ancient oaks"
  },
];

// Danger zones for extreme missions
export const fantasyDangerZones = [
  {
    name: "Tornado Alley",
    fantasyName: "The Storm Corridor",
    cx: 350,
    cy: 200,
    rx: 100,
    ry: 60,
    dangerLevel: "EXTREME",
    description: "Where the sky demons dwell"
  },
  {
    name: "The Panhandle",
    fantasyName: "The Desolate Reach",
    cx: 170,
    cy: 195,
    rx: 40,
    ry: 30,
    dangerLevel: "HIGH",
    description: "Windswept frontier of the realm"
  },
];

export default {
  fantasyStatePaths,
  fantasyRivers,
  fantasyLakes,
  fantasyCities,
  fantasyRoads,
  fantasyLandmarks,
  fantasyDangerZones,
};