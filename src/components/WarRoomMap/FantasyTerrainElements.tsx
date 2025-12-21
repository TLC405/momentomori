import { fantasyLandmarks, fantasyLakes, fantasyDangerZones } from "./FantasyStatePaths";

interface TerrainElementsProps {
  animate?: boolean;
}

const FantasyTerrainElements = ({ animate = true }: TerrainElementsProps) => {
  return (
    <g id="terrain-elements">
      {/* ========== MOUNTAIN RANGES ========== */}
      
      {/* Western Mountains - Rocky Mountain foothills */}
      <g id="western-mountains" opacity="0.65">
        {/* Row 1 - Tall peaks */}
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
        
        {/* Volcanic peak indicator */}
        <use href="#volcanoSymbol" x="22" y="140" width="20" height="18" opacity="0.5" />
      </g>

      {/* Wichita Mountains - Southwest Oklahoma */}
      <g id="wichita-mountains" opacity="0.55">
        <use href="#mountainSymbol" x="195" y="228" width="22" height="16" />
        <use href="#mountainSymbol" x="212" y="222" width="26" height="19" />
        <use href="#mountainSymbol" x="232" y="230" width="20" height="15" />
        <use href="#mountainSymbol" x="248" y="225" width="18" height="14" />
        <use href="#mountainSymbol" x="205" y="238" width="16" height="12" />
        <use href="#mountainSymbol" x="225" y="240" width="18" height="13" />
        
        {/* Mount Scott prominence */}
        <use href="#mountainSymbol" x="218" y="215" width="24" height="18" opacity="0.7" />
      </g>

      {/* Arbuckle Mountains - South-central Oklahoma */}
      <g id="arbuckle-mountains" opacity="0.5">
        <use href="#mountainSymbol" x="335" y="246" width="18" height="13" />
        <use href="#mountainSymbol" x="350" y="242" width="20" height="15" />
        <use href="#mountainSymbol" x="368" y="248" width="16" height="12" />
        <use href="#mountainSymbol" x="382" y="244" width="18" height="14" />
        <use href="#mountainSymbol" x="345" y="252" width="14" height="10" />
        <use href="#mountainSymbol" x="365" y="254" width="16" height="11" />
      </g>

      {/* Ouachita Mountains - Eastern Oklahoma/Arkansas */}
      <g id="ouachita-mountains" opacity="0.55">
        <use href="#mountainSymbol" x="545" y="195" width="24" height="18" />
        <use href="#mountainSymbol" x="565" y="188" width="28" height="20" />
        <use href="#mountainSymbol" x="590" y="198" width="22" height="16" />
        <use href="#mountainSymbol" x="612" y="205" width="24" height="18" />
        <use href="#mountainSymbol" x="555" y="212" width="20" height="15" />
        <use href="#mountainSymbol" x="578" y="218" width="22" height="16" />
        <use href="#mountainSymbol" x="600" y="225" width="18" height="14" />
        <use href="#mountainSymbol" x="620" y="220" width="20" height="15" />
        
        {/* Rich Mountain peak */}
        <use href="#mountainSymbol" x="575" y="180" width="26" height="19" opacity="0.65" />
      </g>

      {/* Ozark Plateau - NE Oklahoma/Arkansas/Missouri */}
      <g id="ozark-plateau" opacity="0.5">
        <use href="#mountainSymbol" x="525" y="135" width="20" height="14" />
        <use href="#mountainSymbol" x="545" y="125" width="22" height="16" />
        <use href="#mountainSymbol" x="568" y="120" width="24" height="18" />
        <use href="#mountainSymbol" x="592" y="128" width="20" height="15" />
        <use href="#mountainSymbol" x="615" y="138" width="22" height="16" />
        <use href="#mountainSymbol" x="638" y="145" width="18" height="14" />
        <use href="#mountainSymbol" x="555" y="140" width="18" height="13" />
        <use href="#mountainSymbol" x="580" y="145" width="20" height="14" />
      </g>

      {/* Texas Hill Country */}
      <g id="texas-hills" opacity="0.4">
        <use href="#mountainSymbol" x="300" y="340" width="16" height="12" />
        <use href="#mountainSymbol" x="320" y="345" width="14" height="10" />
        <use href="#mountainSymbol" x="340" y="338" width="18" height="13" />
        <use href="#mountainSymbol" x="360" y="350" width="15" height="11" />
      </g>

      {/* ========== FORESTS ========== */}

      {/* Cross Timbers - Central Oklahoma dense woodland */}
      <g id="cross-timbers-forest" opacity="0.4">
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
        <use href="#treeSymbol" x="262" y="195" width="5" height="8" />
        <use href="#treeSymbol" x="345" y="195" width="6" height="9" />
      </g>

      {/* Eastern Oklahoma forests */}
      <g id="eastern-forests" opacity="0.35">
        <use href="#treeSymbol" x="475" y="175" width="7" height="11" />
        <use href="#treeSymbol" x="490" y="168" width="6" height="10" />
        <use href="#treeSymbol" x="505" y="180" width="7" height="11" />
        <use href="#treeSymbol" x="520" y="172" width="6" height="10" />
        <use href="#treeSymbol" x="598" y="168" width="7" height="11" />
        <use href="#treeSymbol" x="618" y="175" width="6" height="10" />
        <use href="#treeSymbol" x="638" y="162" width="7" height="11" />
        <use href="#treeSymbol" x="655" y="178" width="6" height="10" />
        <use href="#treeSymbol" x="485" y="185" width="5" height="9" />
        <use href="#treeSymbol" x="510" y="190" width="6" height="9" />
        <use href="#treeSymbol" x="625" y="165" width="5" height="9" />
      </g>

      {/* Piney Woods - East Texas */}
      <g id="piney-woods" opacity="0.3">
        <use href="#treeSymbol" x="528" y="285" width="6" height="10" />
        <use href="#treeSymbol" x="542" y="278" width="7" height="11" />
        <use href="#treeSymbol" x="518" y="295" width="6" height="10" />
        <use href="#treeSymbol" x="535" y="305" width="7" height="11" />
        <use href="#treeSymbol" x="550" y="290" width="6" height="9" />
        <use href="#treeSymbol" x="510" y="308" width="5" height="9" />
        <use href="#treeSymbol" x="555" y="298" width="6" height="10" />
      </g>

      {/* Arkansas forests */}
      <g id="arkansas-forests" opacity="0.35">
        <use href="#treeSymbol" x="595" y="240" width="6" height="10" />
        <use href="#treeSymbol" x="610" y="250" width="7" height="11" />
        <use href="#treeSymbol" x="625" y="235" width="6" height="10" />
        <use href="#treeSymbol" x="640" y="245" width="7" height="11" />
        <use href="#treeSymbol" x="655" y="255" width="6" height="9" />
        <use href="#treeSymbol" x="630" y="260" width="5" height="9" />
      </g>

      {/* Dead/Haunted forest patches */}
      <g id="haunted-woods" opacity="0.25">
        <use href="#deadTreeSymbol" x="180" y="205" width="8" height="12" />
        <use href="#deadTreeSymbol" x="195" y="215" width="7" height="11" />
        <use href="#deadTreeSymbol" x="165" y="220" width="8" height="12" />
      </g>

      {/* ========== WATER FEATURES ========== */}

      {/* Lakes */}
      <g id="lakes">
        {fantasyLakes.map((lake, i) => (
          <g key={i}>
            {/* Lake shadow */}
            <ellipse
              cx={lake.cx + 1}
              cy={lake.cy + 1}
              rx={lake.rx}
              ry={lake.ry}
              fill="hsl(0, 0%, 5%)"
              opacity="0.3"
            />
            {/* Lake body */}
            <ellipse
              cx={lake.cx}
              cy={lake.cy}
              rx={lake.rx}
              ry={lake.ry}
              fill="url(#lakeGradient)"
              stroke="hsl(200, 50%, 35%)"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Wave pattern overlay */}
            <ellipse
              cx={lake.cx}
              cy={lake.cy}
              rx={lake.rx * 0.8}
              ry={lake.ry * 0.8}
              fill="url(#wavePattern)"
              opacity="0.3"
            />
            {/* Lake name */}
            <text
              x={lake.cx}
              y={lake.cy + lake.ry + 8}
              fill="hsl(200, 50%, 50%)"
              fontSize="5"
              fontFamily="'Inter', serif"
              textAnchor="middle"
              fontStyle="italic"
              opacity="0.5"
            >
              {lake.fantasyName}
            </text>
          </g>
        ))}
      </g>

      {/* Swamp/Marsh areas */}
      <g id="swamps" opacity="0.25">
        <ellipse cx="500" cy="235" rx="15" ry="10" fill="url(#swampGradient)" />
        <ellipse cx="500" cy="235" rx="12" ry="8" fill="url(#marshPattern)" opacity="0.5" />
        
        <ellipse cx="545" cy="315" rx="12" ry="8" fill="url(#swampGradient)" />
        <ellipse cx="545" cy="315" rx="10" ry="6" fill="url(#marshPattern)" opacity="0.5" />
      </g>

      {/* ========== LANDMARKS ========== */}

      {/* Watchtowers along borders */}
      <g id="watchtowers" opacity="0.4">
        <use href="#watchtowerSymbol" x="500" y="165" width="10" height="16" />
        <use href="#watchtowerSymbol" x="145" y="200" width="10" height="16" />
        <use href="#watchtowerSymbol" x="555" y="195" width="10" height="16" />
        <use href="#watchtowerSymbol" x="400" y="250" width="10" height="16" />
      </g>

      {/* Ancient ruins */}
      <g id="ruins" opacity="0.35">
        <use href="#ruinsSymbol" x="420" y="180" width="16" height="12" />
        <use href="#ruinsSymbol" x="250" y="240" width="14" height="10" />
        <use href="#ruinsSymbol" x="580" y="160" width="16" height="12" />
      </g>

      {/* Standing stones - mystery locations */}
      <g id="standing-stones" opacity="0.35">
        <use href="#standingStonesSymbol" x="380" y="205" width="20" height="14" />
        <use href="#standingStonesSymbol" x="180" y="180" width="18" height="12" />
        <use href="#standingStonesSymbol" x="470" y="200" width="16" height="11" />
      </g>

      {/* ========== DANGER ZONES ========== */}

      {/* Storm corridor indicator */}
      {fantasyDangerZones.map((zone, i) => (
        <g key={i} id={`danger-zone-${i}`} opacity="0.15">
          <ellipse
            cx={zone.cx}
            cy={zone.cy}
            rx={zone.rx}
            ry={zone.ry}
            fill="url(#dangerZone)"
            className={animate ? "animate-pulse" : ""}
          />
          {zone.dangerLevel === "EXTREME" && animate && (
            <>
              <ellipse
                cx={zone.cx}
                cy={zone.cy}
                rx={zone.rx * 0.7}
                ry={zone.ry * 0.7}
                fill="none"
                stroke="hsl(0, 70%, 50%)"
                strokeWidth="0.5"
                strokeDasharray="4,4"
                opacity="0.3"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
              </ellipse>
            </>
          )}
        </g>
      ))}

      {/* ========== MYTHICAL CREATURES ========== */}

      {/* Dragon silhouette over Texas */}
      <g id="dragon-sighting" opacity="0.15" transform="translate(380, 310)">
        <use href="#dragonSymbol" width="50" height="25" />
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="380,310;385,308;380,310"
            dur="8s"
            repeatCount="indefinite"
            additive="sum"
          />
        )}
      </g>

      {/* Thunderbird over Storm Lords territory */}
      <g id="thunderbird" opacity="0.2" transform="translate(320, 175)">
        <use href="#thunderbirdSymbol" width="28" height="18" />
        {animate && (
          <>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="320,175;325,172;320,175"
              dur="6s"
              repeatCount="indefinite"
              additive="sum"
            />
            {/* Lightning flash */}
            <circle r="15" fill="hsl(220, 80%, 70%)" opacity="0">
              <animate attributeName="opacity" values="0;0.3;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </g>

      {/* Sea monster in Gulf area */}
      <g id="kraken" opacity="0.2" transform="translate(520, 370)">
        <use href="#krakenSymbol" width="35" height="28" />
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="520,370;518,372;520,370"
            dur="10s"
            repeatCount="indefinite"
            additive="sum"
          />
        )}
      </g>

      {/* Sailing ship on river */}
      <g id="ship" opacity="0.3" transform="translate(630, 220)">
        <use href="#shipSymbol" width="16" height="12" />
      </g>

      {/* ========== DECORATIVE ELEMENTS ========== */}

      {/* Premium 16-point Compass Rose */}
      <g id="compass-rose" transform="translate(720, 345)" opacity="0.4">
        {/* Outer decorative rings */}
        <circle r="32" fill="none" stroke="hsl(38, 50%, 35%)" strokeWidth="0.5" />
        <circle r="28" fill="none" stroke="hsl(38, 55%, 40%)" strokeWidth="0.8" />
        <circle r="22" fill="none" stroke="hsl(38, 50%, 35%)" strokeWidth="0.5" strokeDasharray="2,2" />
        
        {/* 16-point star */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const length = i % 4 === 0 ? 24 : i % 2 === 0 ? 18 : 12;
          const width = i % 4 === 0 ? 1.2 : i % 2 === 0 ? 0.8 : 0.5;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={Math.sin(angle) * length}
              y2={-Math.cos(angle) * length}
              stroke={i === 0 ? "hsl(0, 70%, 50%)" : "hsl(38, 60%, 50%)"}
              strokeWidth={width}
            />
          );
        })}
        
        {/* Cardinal direction labels */}
        <text y="-35" fill="hsl(38, 70%, 55%)" fontSize="10" fontFamily="'Orbitron', sans-serif" textAnchor="middle" fontWeight="700">N</text>
        <text x="35" fill="hsl(38, 50%, 45%)" fontSize="7" fontFamily="serif" textAnchor="middle" dominantBaseline="middle">E</text>
        <text y="38" fill="hsl(38, 50%, 45%)" fontSize="7" fontFamily="serif" textAnchor="middle">S</text>
        <text x="-35" fill="hsl(38, 50%, 45%)" fontSize="7" fontFamily="serif" textAnchor="middle" dominantBaseline="middle">W</text>
        
        {/* Center jewel */}
        <circle r="4" fill="hsl(38, 80%, 50%)" />
        <circle r="2" fill="hsl(45, 90%, 70%)" />
        
        {/* Animated needle */}
        {animate && (
          <use href="#compassNeedle" x="-5" y="-15" width="10" height="30">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-5;5;-5"
              dur="4s"
              repeatCount="indefinite"
            />
          </use>
        )}
      </g>

      {/* Ornate scale bar */}
      <g id="scale-bar" transform="translate(50, 375)" opacity="0.35">
        <line x1="0" y1="0" x2="100" y2="0" stroke="hsl(38, 50%, 45%)" strokeWidth="1.5" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="hsl(38, 50%, 45%)" strokeWidth="1.5" />
        <line x1="25" y1="-3" x2="25" y2="3" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
        <line x1="50" y1="-4" x2="50" y2="4" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
        <line x1="75" y1="-3" x2="75" y2="3" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
        <line x1="100" y1="-5" x2="100" y2="5" stroke="hsl(38, 50%, 45%)" strokeWidth="1.5" />
        
        {/* Decorative ends */}
        <circle cx="0" cy="0" r="2" fill="hsl(38, 60%, 50%)" />
        <circle cx="100" cy="0" r="2" fill="hsl(38, 60%, 50%)" />
        
        <text x="50" y="15" textAnchor="middle" fill="hsl(38, 50%, 45%)" fontSize="8" fontFamily="'Inter', serif" fontStyle="italic">
          100 Leagues
        </text>
        <text x="50" y="24" textAnchor="middle" fill="hsl(38, 40%, 35%)" fontSize="6" fontFamily="'Inter', serif">
          (~250 miles)
        </text>
      </g>

      {/* Celtic corner flourishes */}
      <g id="corner-flourishes" opacity="0.2">
        {/* Top-left */}
        <g transform="translate(10, 10)">
          <path d="M 0 25 Q 0 0 25 0" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="2" />
          <path d="M 5 20 Q 5 5 20 5" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
          <circle cx="0" cy="25" r="3" fill="hsl(38, 60%, 50%)" />
          <circle cx="25" cy="0" r="3" fill="hsl(38, 60%, 50%)" />
        </g>
        
        {/* Top-right */}
        <g transform="translate(790, 10)">
          <path d="M 0 0 Q 0 25 -25 25" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="2" />
          <path d="M -5 5 Q -5 20 -20 20" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="hsl(38, 60%, 50%)" />
          <circle cx="-25" cy="25" r="3" fill="hsl(38, 60%, 50%)" />
        </g>
        
        {/* Bottom-left */}
        <g transform="translate(10, 390)">
          <path d="M 25 0 Q 0 0 0 -25" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="2" />
          <path d="M 20 -5 Q 5 -5 5 -20" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
          <circle cx="25" cy="0" r="3" fill="hsl(38, 60%, 50%)" />
          <circle cx="0" cy="-25" r="3" fill="hsl(38, 60%, 50%)" />
        </g>
        
        {/* Bottom-right */}
        <g transform="translate(790, 390)">
          <path d="M -25 0 Q 0 0 0 -25" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="2" />
          <path d="M -20 -5 Q -5 -5 -5 -20" fill="none" stroke="hsl(38, 50%, 45%)" strokeWidth="1" />
          <circle cx="-25" cy="0" r="3" fill="hsl(38, 60%, 50%)" />
          <circle cx="0" cy="-25" r="3" fill="hsl(38, 60%, 50%)" />
        </g>
      </g>

      {/* "Here Be Dragons" annotation */}
      <g id="annotations" opacity="0.25">
        <text
          x="420"
          y="360"
          fill="hsl(0, 60%, 45%)"
          fontSize="8"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
          transform="rotate(-8, 420, 360)"
        >
          Here Be Dragons
        </text>
        
        <text
          x="580"
          y="350"
          fill="hsl(200, 50%, 40%)"
          fontSize="7"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
        >
          Mare Incognitum
        </text>
        
        <text
          x="100"
          y="140"
          fill="hsl(38, 50%, 40%)"
          fontSize="7"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
          transform="rotate(-15, 100, 140)"
        >
          Terra Alta
        </text>
      </g>

      {/* Animated ambient elements */}
      {animate && (
        <g id="ambient-effects">
          {/* Subtle glowing points */}
          {[
            { x: 310, y: 195, delay: 0 },
            { x: 450, y: 175, delay: 1 },
            { x: 400, y: 300, delay: 2 },
            { x: 250, y: 230, delay: 0.5 },
            { x: 550, y: 200, delay: 1.5 },
          ].map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="hsl(38, 92%, 50%)"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.5;0.1"
                dur={`${3 + point.delay}s`}
                begin={`${point.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1.5;2.5;1.5"
                dur={`${3 + point.delay}s`}
                begin={`${point.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Floating dust particles */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={`dust-${i}`}
              cx={150 + i * 80}
              cy={100 + (i % 3) * 100}
              r="0.8"
              fill="hsl(38, 70%, 60%)"
              opacity="0.2"
            >
              <animate
                attributeName="cy"
                values={`${100 + (i % 3) * 100};${90 + (i % 3) * 100};${100 + (i % 3) * 100}`}
                dur={`${5 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur={`${5 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Smoke plume from volcano */}
          <g opacity="0.15" filter="url(#smokePlume)">
            <ellipse cx="35" cy="145" rx="8" ry="4" fill="hsl(0, 0%, 50%)" />
          </g>
        </g>
      )}
    </g>
  );
};

export default FantasyTerrainElements;