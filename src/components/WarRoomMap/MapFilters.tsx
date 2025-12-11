// Premium SVG filter definitions for terrain and effects

const MapFilters = () => {
  return (
    <defs>
      {/* Terrain noise texture */}
      <filter id="terrainNoise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.04" 
          numOctaves="4" 
          result="noise"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.1
                  0 0 0 0 0.1
                  0 0 0 0 0.1
                  0 0 0 0.15 0"
          result="monoNoise"
        />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="overlay" />
      </filter>

      {/* Topographic contour effect */}
      <filter id="topoEffect" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence 
          type="turbulence" 
          baseFrequency="0.008" 
          numOctaves="2" 
          result="warp"
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="warp" 
          scale="2" 
          xChannelSelector="R" 
          yChannelSelector="G"
        />
      </filter>

      {/* Premium glow for markers */}
      <filter id="premiumGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur1" />
        <feGaussianBlur stdDeviation="8" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Intense glow for HQ */}
      <filter id="hqGlow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="3" result="blur1" />
        <feGaussianBlur stdDeviation="6" result="blur2" />
        <feGaussianBlur stdDeviation="12" result="blur3" />
        <feMerge>
          <feMergeNode in="blur3" />
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Subtle inner shadow for depth */}
      <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="3" />
        <feOffset dx="0" dy="2" result="offsetblur" />
        <feFlood floodColor="hsl(0, 0%, 0%)" floodOpacity="0.5" result="color" />
        <feComposite in2="offsetblur" operator="in" />
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>

      {/* Gradient for Oklahoma highlight */}
      <linearGradient id="oklahomaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.15" />
        <stop offset="50%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.12" />
      </linearGradient>

      {/* Gradient for other states */}
      <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(0, 0%, 15%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(0, 0%, 10%)" stopOpacity="0.8" />
      </linearGradient>

      {/* Radar sweep gradient */}
      <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.4" />
        <stop offset="50%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
      </linearGradient>

      {/* Distance ring gradient */}
      <radialGradient id="distanceRing" cx="50%" cy="50%" r="50%">
        <stop offset="85%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.2" />
      </radialGradient>

      {/* Atmosphere gradient */}
      <radialGradient id="atmosphereGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
      </radialGradient>

      {/* Grid pattern - fine tactical grid */}
      <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="hsl(38, 92%, 50%)"
          strokeWidth="0.3"
          opacity="0.08"
        />
      </pattern>

      {/* Crosshatch pattern for terrain */}
      <pattern id="terrainHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" opacity="0.3" />
      </pattern>

      {/* Connection line gradient */}
      <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.1" />
      </linearGradient>

      {/* Vignette effect */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="hsl(0, 0%, 0%)" stopOpacity="0.4" />
      </radialGradient>

      {/* Marker glow by danger level */}
      <filter id="glowLow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(142, 70%, 45%)" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glowMedium" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(48, 96%, 53%)" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glowHigh" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(25, 95%, 53%)" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glowExtreme" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(0, 72%, 51%)" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
};

export default MapFilters;