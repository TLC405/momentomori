const FantasyMapFilters = () => {
  return (
    <defs>
      {/* ========== TOPOGRAPHIC TEXTURE ========== */}
      
      {/* Paper grain texture */}
      <filter id="parchmentTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.035" 
          numOctaves="5" 
          seed="42"
          result="noise"
        />
        <feColorMatrix 
          type="matrix" 
          values="0 0 0 0 0.92
                  0 0 0 0 0.88
                  0 0 0 0 0.80
                  0 0 0 0.08 0"
          in="noise"
          result="coloredNoise"
        />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
      </filter>

      {/* Topographic contour effect */}
      <filter id="topoContours" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" seed="99" result="terrain" />
        <feColorMatrix in="terrain" type="discrete" 
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" 
          result="contourLines" />
        <feColorMatrix in="contourLines" type="matrix"
          values="0 0 0 0 0.55
                  0 0 0 0 0.48
                  0 0 0 0 0.38
                  0 0 0 0.12 0"
          result="coloredContours" />
        <feBlend in="SourceGraphic" in2="coloredContours" mode="multiply" />
      </filter>

      {/* Subtle terrain elevation effect */}
      <filter id="terrainRelief" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="22" result="elevation" />
        <feDisplacementMap in="SourceGraphic" in2="elevation" scale="1.5" />
      </filter>

      {/* Soft shadow for territory borders */}
      <filter id="territoryGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(33, 40%, 35%)" floodOpacity="0.25" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Clean text shadow */}
      <filter id="textGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
        <feFlood floodColor="hsl(43, 30%, 90%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Mountain shadow */}
      <filter id="mountainShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="hsl(30, 20%, 25%)" floodOpacity="0.3" />
      </filter>

      {/* Inner shadow for depth */}
      <filter id="innerShadow">
        <feOffset dx="0" dy="2" />
        <feGaussianBlur stdDeviation="2" result="offset-blur" />
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
        <feFlood floodColor="hsl(30, 20%, 20%)" floodOpacity="0.3" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>

      {/* HQ glow */}
      <filter id="hqGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(16, 55%, 42%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ========== DANGER LEVEL GLOWS ========== */}
      
      <filter id="glowLow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(152, 45%, 38%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowMedium" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(38, 70%, 50%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowHigh" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(16, 70%, 45%)" floodOpacity="0.7" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowExtreme" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(0, 60%, 45%)" floodOpacity="0.8" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ========== GRADIENTS ========== */}

      {/* Warm cream/tan cartographic background */}
      <linearGradient id="parchmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(40, 35%, 88%)" />
        <stop offset="25%" stopColor="hsl(38, 30%, 85%)" />
        <stop offset="50%" stopColor="hsl(36, 28%, 82%)" />
        <stop offset="75%" stopColor="hsl(34, 25%, 80%)" />
        <stop offset="100%" stopColor="hsl(32, 22%, 78%)" />
      </linearGradient>

      {/* Oklahoma highlight - warm earth tone */}
      <linearGradient id="oklahomaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 45%, 72%)" stopOpacity="0.6" />
        <stop offset="50%" stopColor="hsl(35, 40%, 68%)" stopOpacity="0.65" />
        <stop offset="100%" stopColor="hsl(32, 35%, 65%)" stopOpacity="0.7" />
      </linearGradient>

      {/* Neighboring state gradient */}
      <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(40, 20%, 78%)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(35, 18%, 74%)" stopOpacity="0.5" />
      </linearGradient>

      {/* Mountain gradient - earthy brown peaks */}
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(30, 20%, 55%)" />
        <stop offset="40%" stopColor="hsl(28, 25%, 45%)" />
        <stop offset="100%" stopColor="hsl(25, 20%, 38%)" />
      </linearGradient>

      {/* Forest gradient - natural greens */}
      <linearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(135, 35%, 40%)" stopOpacity="0.8" />
        <stop offset="50%" stopColor="hsl(140, 30%, 32%)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="hsl(145, 25%, 25%)" stopOpacity="0.9" />
      </linearGradient>

      {/* River gradient - natural blue */}
      <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(205, 55%, 48%)" stopOpacity="0.4" />
        <stop offset="50%" stopColor="hsl(210, 60%, 52%)" stopOpacity="0.7" />
        <stop offset="100%" stopColor="hsl(205, 55%, 48%)" stopOpacity="0.4" />
      </linearGradient>

      {/* Lake gradient */}
      <radialGradient id="lakeGradient" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="hsl(210, 50%, 55%)" stopOpacity="0.7" />
        <stop offset="100%" stopColor="hsl(205, 45%, 48%)" stopOpacity="0.5" />
      </radialGradient>

      {/* Swamp gradient */}
      <radialGradient id="swampGradient" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="hsl(120, 20%, 45%)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="hsl(130, 15%, 38%)" stopOpacity="0.4" />
      </radialGradient>

      {/* Soft vignette */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="65%" stopColor="transparent" />
        <stop offset="90%" stopColor="hsl(33, 20%, 50%)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(30, 15%, 40%)" stopOpacity="0.25" />
      </radialGradient>

      {/* Atmosphere glow */}
      <radialGradient id="atmosphereGlow" cx="35%" cy="40%" r="70%">
        <stop offset="0%" stopColor="hsl(40, 40%, 70%)" stopOpacity="0.04" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      {/* Danger zone gradient */}
      <radialGradient id="dangerZone" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(16, 50%, 50%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      {/* ========== PATTERNS ========== */}

      {/* Topographic contour line pattern */}
      <pattern id="topoPattern" patternUnits="userSpaceOnUse" width="60" height="30">
        <path d="M0,15 Q15,5 30,15 T60,15" fill="none" stroke="hsl(33, 25%, 62%)" strokeWidth="0.4" opacity="0.5" />
        <path d="M0,25 Q15,18 30,25 T60,25" fill="none" stroke="hsl(33, 25%, 65%)" strokeWidth="0.3" opacity="0.35" />
        <path d="M0,8 Q15,0 30,8 T60,8" fill="none" stroke="hsl(33, 25%, 60%)" strokeWidth="0.3" opacity="0.3" />
      </pattern>

      {/* Stipple pattern for flatlands */}
      <pattern id="stipplePattern" patternUnits="userSpaceOnUse" width="10" height="10">
        <circle cx="2" cy="3" r="0.4" fill="hsl(33, 20%, 55%)" opacity="0.25" />
        <circle cx="7" cy="8" r="0.3" fill="hsl(33, 20%, 55%)" opacity="0.2" />
        <circle cx="5" cy="1" r="0.35" fill="hsl(33, 20%, 55%)" opacity="0.15" />
      </pattern>

      {/* Border hatching */}
      <pattern id="handDrawnBorder" patternUnits="userSpaceOnUse" width="12" height="6">
        <path d="M0,3 Q3,1 6,3 T12,3" fill="none" stroke="hsl(33, 30%, 55%)" strokeWidth="0.5" strokeLinecap="round" />
      </pattern>

      {/* Marsh pattern */}
      <pattern id="marshPattern" patternUnits="userSpaceOnUse" width="8" height="8">
        <path d="M2,6 L2,2 M4,7 L4,3 M6,6 L6,2" stroke="hsl(135, 25%, 45%)" strokeWidth="0.5" opacity="0.3" />
      </pattern>

      {/* Wave pattern for water */}
      <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="16" height="8">
        <path d="M0,4 Q4,1 8,4 T16,4" fill="none" stroke="hsl(210, 45%, 55%)" strokeWidth="0.4" opacity="0.25" />
      </pattern>

      {/* ========== SYMBOLS ========== */}

      {/* Naturalistic tree symbol */}
      <symbol id="treeSymbol" viewBox="0 0 12 18">
        <circle cx="6" cy="6" r="4.5" fill="url(#forestGradient)" />
        <circle cx="6" cy="5" r="3.5" fill="hsl(135, 30%, 42%)" opacity="0.6" />
        <rect x="5.2" y="10" width="1.6" height="4" fill="hsl(30, 25%, 40%)" rx="0.5" />
      </symbol>

      {/* Dead tree */}
      <symbol id="deadTreeSymbol" viewBox="0 0 12 18">
        <path d="M6,2 L6,14 M4,5 L6,8 M8,4 L6,7 M3,8 L6,11" fill="none" stroke="hsl(30, 15%, 50%)" strokeWidth="1" strokeLinecap="round" />
      </symbol>

      {/* Mountain symbol - NatGeo hachure style */}
      <symbol id="mountainSymbol" viewBox="0 0 24 18">
        <path d="M0,18 L8,4 L12,9 L16,3 L24,18 Z" fill="hsl(33, 22%, 58%)" stroke="hsl(30, 25%, 45%)" strokeWidth="0.6" />
        <path d="M8,4 L10,7 L6,7 Z" fill="hsl(33, 15%, 72%)" opacity="0.7" />
        <path d="M16,3 L19,8 L13,8 Z" fill="hsl(33, 15%, 75%)" opacity="0.8" />
        {/* Hachure shading lines */}
        <path d="M5,14 L8,8 M9,16 L12,10 M15,14 L16,8 M19,16 L20,12" fill="none" stroke="hsl(30, 20%, 42%)" strokeWidth="0.3" opacity="0.5" />
      </symbol>

      {/* Volcano */}
      <symbol id="volcanoSymbol" viewBox="0 0 24 20">
        <path d="M0,20 L9,5 L12,7 L15,5 L24,20 Z" fill="hsl(30, 22%, 50%)" stroke="hsl(25, 25%, 42%)" strokeWidth="0.5" />
        <ellipse cx="12" cy="6" rx="3" ry="1.5" fill="hsl(30, 18%, 45%)" opacity="0.6" />
      </symbol>

      {/* Watchtower / ranger station */}
      <symbol id="watchtowerSymbol" viewBox="0 0 12 20">
        <rect x="4.5" y="8" width="3" height="10" fill="hsl(30, 22%, 48%)" rx="0.5" />
        <polygon points="6,2 9,8 3,8" fill="hsl(33, 25%, 55%)" />
        <circle cx="6" cy="5" r="1" fill="hsl(16, 50%, 55%)" opacity="0.7" />
      </symbol>

      {/* Ruins */}
      <symbol id="ruinsSymbol" viewBox="0 0 20 16">
        <rect x="2" y="8" width="3" height="8" fill="hsl(30, 15%, 55%)" opacity="0.5" rx="0.5" />
        <rect x="8" y="5" width="2" height="11" fill="hsl(28, 12%, 52%)" opacity="0.4" rx="0.5" />
        <rect x="14" y="6" width="3.5" height="10" fill="hsl(32, 18%, 50%)" opacity="0.4" rx="0.5" />
      </symbol>

      {/* Standing stones */}
      <symbol id="standingStonesSymbol" viewBox="0 0 24 16">
        <ellipse cx="12" cy="14" rx="10" ry="2" fill="hsl(30, 12%, 55%)" opacity="0.2" />
        <rect x="3" y="4" width="3" height="12" rx="1" fill="hsl(30, 12%, 60%)" transform="rotate(-5, 4.5, 10)" />
        <rect x="10" y="2" width="4" height="14" rx="1" fill="hsl(28, 15%, 62%)" />
        <rect x="18" y="5" width="3" height="11" rx="1" fill="hsl(32, 10%, 58%)" transform="rotate(3, 19.5, 10.5)" />
      </symbol>

      {/* Compass needle */}
      <symbol id="compassNeedle" viewBox="0 0 10 30">
        <polygon points="5,0 7.5,15 5,13 2.5,15" fill="hsl(0, 55%, 42%)" />
        <polygon points="5,30 7.5,15 5,17 2.5,15" fill="hsl(33, 12%, 60%)" />
      </symbol>
    </defs>
  );
};

export default FantasyMapFilters;
