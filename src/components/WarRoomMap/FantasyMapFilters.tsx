const FantasyMapFilters = () => {
  return (
    <defs>
      {/* Parchment texture for fantasy map feel */}
      <filter id="parchmentTexture" x="0" y="0" width="100%" height="100%">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.04" 
          numOctaves="5" 
          seed="15"
          result="noise"
        />
        <feColorMatrix 
          type="matrix" 
          values="0 0 0 0 0.06
                  0 0 0 0 0.05
                  0 0 0 0 0.04
                  0 0 0 0.15 0"
          in="noise"
          result="coloredNoise"
        />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="overlay" />
      </filter>

      {/* Mountain shadow effect */}
      <filter id="mountainShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="hsl(0, 0%, 0%)" floodOpacity="0.5" />
      </filter>

      {/* Inner glow for territories */}
      <filter id="territoryGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(38, 92%, 50%)" floodOpacity="0.3" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Fantasy text shadow */}
      <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
        <feFlood floodColor="hsl(38, 70%, 40%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Danger level glows */}
      <filter id="glowLow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(142, 70%, 45%)" floodOpacity="0.8" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowMedium" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(48, 96%, 53%)" floodOpacity="0.8" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowHigh" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(25, 95%, 53%)" floodOpacity="0.8" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="glowExtreme" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(0, 72%, 51%)" floodOpacity="0.9" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* HQ premium glow */}
      <filter id="hqGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feFlood floodColor="hsl(38, 92%, 50%)" floodOpacity="0.9" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Inner shadow for depth */}
      <filter id="innerShadow">
        <feOffset dx="0" dy="2" />
        <feGaussianBlur stdDeviation="2" result="offset-blur" />
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
        <feFlood floodColor="black" floodOpacity="0.3" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>

      {/* Parchment/old map gradient */}
      <linearGradient id="parchmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(35, 30%, 12%)" />
        <stop offset="50%" stopColor="hsl(30, 25%, 9%)" />
        <stop offset="100%" stopColor="hsl(25, 20%, 7%)" />
      </linearGradient>

      {/* Oklahoma highlight gradient */}
      <linearGradient id="oklahomaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 60%, 20%)" stopOpacity="0.8" />
        <stop offset="50%" stopColor="hsl(35, 50%, 15%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(30, 40%, 12%)" stopOpacity="0.95" />
      </linearGradient>

      {/* State gradient */}
      <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(0, 0%, 15%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(0, 0%, 10%)" stopOpacity="0.8" />
      </linearGradient>

      {/* Mountain range gradient */}
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(30, 20%, 25%)" />
        <stop offset="100%" stopColor="hsl(25, 15%, 15%)" />
      </linearGradient>

      {/* Forest gradient */}
      <linearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(120, 30%, 20%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(120, 20%, 12%)" stopOpacity="0.8" />
      </linearGradient>

      {/* Water/river gradient */}
      <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(200, 50%, 30%)" stopOpacity="0.3" />
        <stop offset="50%" stopColor="hsl(210, 60%, 35%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(200, 50%, 30%)" stopOpacity="0.3" />
      </linearGradient>

      {/* Distance ring glow */}
      <radialGradient id="distanceRing" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
        <stop offset="80%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.05" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.15" />
      </radialGradient>

      {/* Vignette overlay */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="70%" stopColor="transparent" />
        <stop offset="100%" stopColor="hsl(0, 0%, 3%)" stopOpacity="0.8" />
      </radialGradient>

      {/* Radar sweep */}
      <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
      </linearGradient>

      {/* Atmosphere glow */}
      <radialGradient id="atmosphereGlow" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="hsl(38, 80%, 50%)" stopOpacity="0.03" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      {/* Hand-drawn pattern for borders */}
      <pattern id="handDrawnBorder" patternUnits="userSpaceOnUse" width="8" height="4">
        <path 
          d="M0,2 Q2,0 4,2 T8,2" 
          fill="none" 
          stroke="hsl(35, 50%, 35%)" 
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </pattern>

      {/* Decorative compass pattern */}
      <pattern id="compassRose" patternUnits="userSpaceOnUse" width="20" height="20">
        <circle cx="10" cy="10" r="1" fill="hsl(38, 70%, 40%)" opacity="0.3" />
      </pattern>

      {/* Tree symbols for forests */}
      <symbol id="treeSymbol" viewBox="0 0 10 15">
        <path d="M5,0 L8,5 L6,5 L9,10 L7,10 L10,15 L0,15 L3,10 L1,10 L4,5 L2,5 Z" fill="hsl(120, 25%, 25%)" />
      </symbol>

      {/* Mountain symbol */}
      <symbol id="mountainSymbol" viewBox="0 0 20 15">
        <path d="M0,15 L6,3 L10,8 L14,2 L20,15 Z" fill="hsl(30, 20%, 30%)" stroke="hsl(30, 25%, 40%)" strokeWidth="0.5" />
        <path d="M6,3 L8,6 L4,6 Z" fill="hsl(0, 0%, 90%)" opacity="0.3" />
        <path d="M14,2 L17,8 L11,8 Z" fill="hsl(0, 0%, 90%)" opacity="0.3" />
      </symbol>

      {/* Castle/fortress symbol */}
      <symbol id="fortressSymbol" viewBox="0 0 16 16">
        <rect x="2" y="8" width="12" height="8" fill="hsl(38, 40%, 30%)" />
        <rect x="0" y="6" width="4" height="2" fill="hsl(38, 50%, 35%)" />
        <rect x="6" y="6" width="4" height="2" fill="hsl(38, 50%, 35%)" />
        <rect x="12" y="6" width="4" height="2" fill="hsl(38, 50%, 35%)" />
        <rect x="6" y="10" width="4" height="6" fill="hsl(20, 30%, 20%)" />
      </symbol>

      {/* Skull symbol for danger zones */}
      <symbol id="skullSymbol" viewBox="0 0 16 16">
        <circle cx="8" cy="6" r="5" fill="hsl(0, 0%, 80%)" />
        <circle cx="6" cy="5" r="1.5" fill="hsl(0, 0%, 10%)" />
        <circle cx="10" cy="5" r="1.5" fill="hsl(0, 0%, 10%)" />
        <path d="M6,9 L10,9" stroke="hsl(0, 0%, 10%)" strokeWidth="0.5" />
        <rect x="5" y="11" width="6" height="5" fill="hsl(0, 0%, 80%)" />
        <line x1="6" y1="11" x2="6" y2="16" stroke="hsl(0, 0%, 10%)" strokeWidth="0.5" />
        <line x1="8" y1="11" x2="8" y2="16" stroke="hsl(0, 0%, 10%)" strokeWidth="0.5" />
        <line x1="10" y1="11" x2="10" y2="16" stroke="hsl(0, 0%, 10%)" strokeWidth="0.5" />
      </symbol>
    </defs>
  );
};

export default FantasyMapFilters;
