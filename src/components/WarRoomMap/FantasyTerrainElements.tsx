import { fantasyLandmarks, fantasyLakes, fantasyDangerZones } from "./FantasyStatePaths";

interface TerrainElementsProps {
  animate?: boolean;
}

const FantasyTerrainElements = ({ animate = true }: TerrainElementsProps) => {
  return (
    <g id="terrain-elements">
      {/* ========== TOPOGRAPHIC CONTOUR LINES ========== */}
      <g id="contour-lines" opacity="0.2">
        {/* Elevation contours across the map */}
        <path d="M 30 100 Q 80 85 130 95 Q 180 105 230 90 Q 280 75 330 88" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.5" />
        <path d="M 35 120 Q 85 108 135 115 Q 185 122 235 110 Q 285 98 335 108" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.4" />
        <path d="M 40 140 Q 90 130 140 135 Q 190 140 240 132 Q 290 124 340 130" fill="none" stroke="hsl(33, 25%, 58%)" strokeWidth="0.4" />
        
        {/* Oklahoma contours */}
        <path d="M 160 190 Q 220 185 280 192 Q 340 198 400 188 Q 460 178 500 185" fill="none" stroke="hsl(33, 22%, 60%)" strokeWidth="0.4" />
        <path d="M 170 210 Q 230 205 290 215 Q 350 225 410 212 Q 460 200 500 208" fill="none" stroke="hsl(33, 22%, 60%)" strokeWidth="0.35" />
        <path d="M 180 230 Q 240 228 300 235 Q 360 242 420 232 Q 470 222 500 230" fill="none" stroke="hsl(33, 22%, 62%)" strokeWidth="0.35" />
        
        {/* Texas contours */}
        <path d="M 160 280 Q 220 275 280 285 Q 340 295 400 282 Q 460 270 520 278" fill="none" stroke="hsl(33, 20%, 62%)" strokeWidth="0.35" />
        <path d="M 180 310 Q 240 305 300 315 Q 360 325 420 312 Q 470 300 510 308" fill="none" stroke="hsl(33, 20%, 64%)" strokeWidth="0.3" />
        <path d="M 200 340 Q 260 335 320 345 Q 380 355 430 342" fill="none" stroke="hsl(33, 20%, 64%)" strokeWidth="0.3" />
        
        {/* Mountain area contours (denser) */}
        <path d="M 15 85 Q 30 80 45 88 Q 55 92 65 85" fill="none" stroke="hsl(33, 25%, 52%)" strokeWidth="0.5" />
        <path d="M 15 95 Q 30 90 45 95 Q 55 100 65 93" fill="none" stroke="hsl(33, 25%, 52%)" strokeWidth="0.45" />
        <path d="M 12 105 Q 28 98 48 105 Q 60 110 68 102" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.4" />
        <path d="M 15 115 Q 35 108 50 115 Q 60 120 70 112" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.4" />
        <path d="M 18 150 Q 35 142 50 150 Q 60 158 68 148" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.4" />
        <path d="M 20 170 Q 35 165 50 172" fill="none" stroke="hsl(33, 25%, 58%)" strokeWidth="0.35" />
      </g>

      {/* ========== MOUNTAIN RANGES ========== */}
      
      {/* Western Mountains - Rocky Mountain foothills */}
      <g id="western-mountains" opacity="0.7">
        <use href="#mountainSymbol" x="15" y="75" width="28" height="22" />
        <use href="#mountainSymbol" x="32" y="90" width="32" height="26" />
        <use href="#mountainSymbol" x="10" y="110" width="30" height="24" />
        <use href="#mountainSymbol" x="28" y="130" width="35" height="28" />
        <use href="#mountainSymbol" x="15" y="155" width="28" height="22" />
        <use href="#mountainSymbol" x="30" y="175" width="32" height="25" />
        <use href="#mountainSymbol" x="18" y="200" width="30" height="23" />
        <use href="#mountainSymbol" x="25" y="225" width="28" height="21" />
        <use href="#mountainSymbol" x="12" y="250" width="26" height="20" />
        <use href="#mountainSymbol" x="28" y="275" width="30" height="23" />
        <use href="#mountainSymbol" x="15" y="300" width="28" height="22" />
        <use href="#mountainSymbol" x="32" y="325" width="26" height="20" />
      </g>

      {/* Wichita Mountains */}
      <g id="wichita-mountains" opacity="0.6">
        <use href="#mountainSymbol" x="195" y="228" width="22" height="16" />
        <use href="#mountainSymbol" x="212" y="222" width="26" height="19" />
        <use href="#mountainSymbol" x="232" y="230" width="20" height="15" />
        <use href="#mountainSymbol" x="248" y="225" width="18" height="14" />
        <use href="#mountainSymbol" x="218" y="215" width="24" height="18" opacity="0.8" />
      </g>

      {/* Arbuckle Mountains */}
      <g id="arbuckle-mountains" opacity="0.55">
        <use href="#mountainSymbol" x="335" y="246" width="18" height="13" />
        <use href="#mountainSymbol" x="350" y="242" width="20" height="15" />
        <use href="#mountainSymbol" x="368" y="248" width="16" height="12" />
        <use href="#mountainSymbol" x="382" y="244" width="18" height="14" />
      </g>

      {/* Ouachita Mountains */}
      <g id="ouachita-mountains" opacity="0.6">
        <use href="#mountainSymbol" x="545" y="195" width="24" height="18" />
        <use href="#mountainSymbol" x="565" y="188" width="28" height="20" />
        <use href="#mountainSymbol" x="590" y="198" width="22" height="16" />
        <use href="#mountainSymbol" x="612" y="205" width="24" height="18" />
        <use href="#mountainSymbol" x="575" y="180" width="26" height="19" opacity="0.7" />
      </g>

      {/* Ozark Plateau */}
      <g id="ozark-plateau" opacity="0.55">
        <use href="#mountainSymbol" x="525" y="135" width="20" height="14" />
        <use href="#mountainSymbol" x="545" y="125" width="22" height="16" />
        <use href="#mountainSymbol" x="568" y="120" width="24" height="18" />
        <use href="#mountainSymbol" x="592" y="128" width="20" height="15" />
        <use href="#mountainSymbol" x="615" y="138" width="22" height="16" />
      </g>

      {/* Texas Hill Country */}
      <g id="texas-hills" opacity="0.45">
        <use href="#mountainSymbol" x="300" y="340" width="16" height="12" />
        <use href="#mountainSymbol" x="320" y="345" width="14" height="10" />
        <use href="#mountainSymbol" x="340" y="338" width="18" height="13" />
      </g>

      {/* ========== FORESTS ========== */}

      {/* Cross Timbers */}
      <g id="cross-timbers-forest" opacity="0.45">
        <use href="#treeSymbol" x="275" y="195" width="7" height="11" />
        <use href="#treeSymbol" x="288" y="188" width="6" height="10" />
        <use href="#treeSymbol" x="302" y="198" width="7" height="11" />
        <use href="#treeSymbol" x="255" y="205" width="6" height="10" />
        <use href="#treeSymbol" x="268" y="215" width="7" height="11" />
        <use href="#treeSymbol" x="320" y="192" width="6" height="10" />
        <use href="#treeSymbol" x="335" y="200" width="7" height="11" />
        <use href="#treeSymbol" x="280" y="208" width="6" height="9" />
        <use href="#treeSymbol" x="295" y="218" width="7" height="10" />
        <use href="#treeSymbol" x="310" y="210" width="6" height="9" />
      </g>

      {/* Eastern forests */}
      <g id="eastern-forests" opacity="0.4">
        <use href="#treeSymbol" x="475" y="175" width="7" height="11" />
        <use href="#treeSymbol" x="490" y="168" width="6" height="10" />
        <use href="#treeSymbol" x="505" y="180" width="7" height="11" />
        <use href="#treeSymbol" x="520" y="172" width="6" height="10" />
        <use href="#treeSymbol" x="598" y="168" width="7" height="11" />
        <use href="#treeSymbol" x="618" y="175" width="6" height="10" />
        <use href="#treeSymbol" x="638" y="162" width="7" height="11" />
        <use href="#treeSymbol" x="655" y="178" width="6" height="10" />
      </g>

      {/* Piney Woods - East Texas */}
      <g id="piney-woods" opacity="0.35">
        <use href="#treeSymbol" x="528" y="285" width="6" height="10" />
        <use href="#treeSymbol" x="542" y="278" width="7" height="11" />
        <use href="#treeSymbol" x="518" y="295" width="6" height="10" />
        <use href="#treeSymbol" x="535" y="305" width="7" height="11" />
        <use href="#treeSymbol" x="550" y="290" width="6" height="9" />
      </g>

      {/* Arkansas forests */}
      <g id="arkansas-forests" opacity="0.4">
        <use href="#treeSymbol" x="595" y="240" width="6" height="10" />
        <use href="#treeSymbol" x="610" y="250" width="7" height="11" />
        <use href="#treeSymbol" x="625" y="235" width="6" height="10" />
        <use href="#treeSymbol" x="640" y="245" width="7" height="11" />
        <use href="#treeSymbol" x="655" y="255" width="6" height="9" />
      </g>

      {/* Prairie grassland indicators (stipple dots) */}
      <g id="grasslands" opacity="0.15">
        {[...Array(20)].map((_, i) => (
          <circle key={i} cx={180 + (i % 5) * 65} cy={185 + Math.floor(i / 5) * 18} r="0.8" fill="hsl(80, 30%, 45%)" />
        ))}
      </g>

      {/* ========== WATER FEATURES ========== */}

      <g id="lakes">
        {fantasyLakes.map((lake, i) => (
          <g key={i}>
            <ellipse cx={lake.cx} cy={lake.cy} rx={lake.rx} ry={lake.ry} fill="url(#lakeGradient)" stroke="hsl(210, 40%, 55%)" strokeWidth="0.5" opacity="0.75" />
            <ellipse cx={lake.cx} cy={lake.cy} rx={lake.rx * 0.7} ry={lake.ry * 0.7} fill="url(#wavePattern)" opacity="0.3" />
            <text x={lake.cx} y={lake.cy + lake.ry + 8} fill="hsl(210, 35%, 45%)" fontSize="4.5" fontFamily="'Playfair Display', serif" textAnchor="middle" fontStyle="italic" opacity="0.6">
              {lake.fantasyName}
            </text>
          </g>
        ))}
      </g>

      {/* Marshlands */}
      <g id="swamps" opacity="0.2">
        <ellipse cx="500" cy="235" rx="15" ry="10" fill="url(#swampGradient)" />
        <ellipse cx="500" cy="235" rx="12" ry="8" fill="url(#marshPattern)" opacity="0.5" />
        <ellipse cx="545" cy="315" rx="12" ry="8" fill="url(#swampGradient)" />
      </g>

      {/* ========== LANDMARKS ========== */}

      <g id="watchtowers" opacity="0.35">
        <use href="#watchtowerSymbol" x="500" y="165" width="10" height="16" />
        <use href="#watchtowerSymbol" x="145" y="200" width="10" height="16" />
        <use href="#watchtowerSymbol" x="555" y="195" width="10" height="16" />
      </g>

      {/* Historical sites */}
      <g id="ruins" opacity="0.3">
        <use href="#ruinsSymbol" x="420" y="180" width="16" height="12" />
        <use href="#ruinsSymbol" x="250" y="240" width="14" height="10" />
      </g>

      {/* Standing stones */}
      <g id="standing-stones" opacity="0.3">
        <use href="#standingStonesSymbol" x="380" y="205" width="20" height="14" />
        <use href="#standingStonesSymbol" x="180" y="180" width="18" height="12" />
      </g>

      {/* ========== CARTOGRAPHIC COMPASS ROSE ========== */}

      <g id="compass-rose" transform="translate(720, 345)" opacity="0.5">
        {/* Outer rings */}
        <circle r="30" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.8" />
        <circle r="26" fill="none" stroke="hsl(33, 28%, 52%)" strokeWidth="0.5" />
        <circle r="20" fill="none" stroke="hsl(33, 25%, 55%)" strokeWidth="0.4" strokeDasharray="1.5,1.5" />
        
        {/* 16-point star */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const length = i % 4 === 0 ? 22 : i % 2 === 0 ? 16 : 10;
          const width = i % 4 === 0 ? 1.2 : i % 2 === 0 ? 0.7 : 0.4;
          return (
            <line key={i} x1={0} y1={0} x2={Math.sin(angle) * length} y2={-Math.cos(angle) * length}
              stroke={i === 0 ? "hsl(0, 50%, 42%)" : "hsl(33, 35%, 48%)"} strokeWidth={width} />
          );
        })}
        
        {/* Cardinal labels */}
        <text y="-32" fill="hsl(33, 40%, 40%)" fontSize="9" fontFamily="'Playfair Display', serif" textAnchor="middle" fontWeight="700">N</text>
        <text x="32" fill="hsl(33, 30%, 45%)" fontSize="7" fontFamily="'Playfair Display', serif" textAnchor="middle" dominantBaseline="middle">E</text>
        <text y="36" fill="hsl(33, 30%, 45%)" fontSize="7" fontFamily="'Playfair Display', serif" textAnchor="middle">S</text>
        <text x="-32" fill="hsl(33, 30%, 45%)" fontSize="7" fontFamily="'Playfair Display', serif" textAnchor="middle" dominantBaseline="middle">W</text>
        
        {/* Center */}
        <circle r="3.5" fill="hsl(16, 50%, 45%)" />
        <circle r="1.5" fill="hsl(40, 40%, 70%)" />
        
        {/* Animated needle */}
        {animate && (
          <use href="#compassNeedle" x="-5" y="-15" width="10" height="30">
            <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="5s" repeatCount="indefinite" />
          </use>
        )}
      </g>

      {/* ========== SCALE BAR ========== */}

      <g id="scale-bar" transform="translate(50, 375)" opacity="0.45">
        <line x1="0" y1="0" x2="100" y2="0" stroke="hsl(33, 30%, 42%)" strokeWidth="1.5" />
        {[0, 25, 50, 75, 100].map((x, i) => (
          <line key={i} x1={x} y1={i === 0 || i === 4 ? -5 : -3} x2={x} y2={i === 0 || i === 4 ? 5 : 3} stroke="hsl(33, 30%, 42%)" strokeWidth={i === 0 || i === 4 ? 1.5 : 1} />
        ))}
        {/* Alternating fill bars */}
        <rect x="0" y="-2" width="25" height="4" fill="hsl(33, 30%, 42%)" />
        <rect x="50" y="-2" width="25" height="4" fill="hsl(33, 30%, 42%)" />
        
        <text x="50" y="14" textAnchor="middle" fill="hsl(33, 28%, 42%)" fontSize="7" fontFamily="'Playfair Display', serif" fontStyle="italic">
          100 miles
        </text>
        <text x="50" y="22" textAnchor="middle" fill="hsl(33, 22%, 48%)" fontSize="5" fontFamily="'Source Sans 3', sans-serif">
          approx. 160 km
        </text>
      </g>

      {/* ========== CORNER FLOURISHES ========== */}
      <g id="corner-flourishes" opacity="0.25">
        <g transform="translate(10, 10)">
          <path d="M 0 20 Q 0 0 20 0" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="1.5" />
          <path d="M 4 16 Q 4 4 16 4" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.8" />
        </g>
        <g transform="translate(790, 10)">
          <path d="M 0 0 Q 0 20 -20 20" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="1.5" />
          <path d="M -4 4 Q -4 16 -16 16" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.8" />
        </g>
        <g transform="translate(10, 390)">
          <path d="M 20 0 Q 0 0 0 -20" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="1.5" />
          <path d="M 16 -4 Q 4 -4 4 -16" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.8" />
        </g>
        <g transform="translate(790, 390)">
          <path d="M -20 0 Q 0 0 0 -20" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="1.5" />
          <path d="M -16 -4 Q -4 -4 -4 -16" fill="none" stroke="hsl(33, 30%, 50%)" strokeWidth="0.8" />
        </g>
      </g>

      {/* ========== GEOGRAPHIC ANNOTATIONS ========== */}
      <g id="annotations" opacity="0.3">
        <text x="170" y="240" fill="hsl(33, 30%, 42%)" fontSize="5.5" fontFamily="'Playfair Display', serif" fontStyle="italic" transform="rotate(-3, 170, 240)">
          Wichita Mts.
        </text>
        <text x="555" y="175" fill="hsl(33, 30%, 42%)" fontSize="5.5" fontFamily="'Playfair Display', serif" fontStyle="italic">
          Ouachita Mts.
        </text>
        <text x="555" y="115" fill="hsl(33, 30%, 42%)" fontSize="5.5" fontFamily="'Playfair Display', serif" fontStyle="italic">
          Ozark Plateau
        </text>
        <text x="275" y="205" fill="hsl(120, 20%, 40%)" fontSize="5" fontFamily="'Playfair Display', serif" fontStyle="italic" opacity="0.6">
          Cross Timbers
        </text>
        <text x="100" y="135" fill="hsl(33, 25%, 40%)" fontSize="5" fontFamily="'Playfair Display', serif" fontStyle="italic" transform="rotate(-80, 100, 135)">
          Rocky Mtns.
        </text>
      </g>

      {/* ========== SUBTLE AMBIENT EFFECTS ========== */}
      {animate && (
        <g id="ambient-effects">
          {/* Gentle floating particles (dust motes in sunlight) */}
          {[...Array(5)].map((_, i) => (
            <circle key={i} cx={200 + i * 100} cy={120 + (i % 3) * 90} r="0.6" fill="hsl(40, 40%, 65%)" opacity="0.15">
              <animate attributeName="cy" values={`${120 + (i % 3) * 90};${112 + (i % 3) * 90};${120 + (i % 3) * 90}`} dur={`${6 + i}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.08;0.2;0.08" dur={`${6 + i}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
    </g>
  );
};

export default FantasyTerrainElements;
