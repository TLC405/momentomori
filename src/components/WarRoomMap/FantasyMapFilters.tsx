const FantasyMapFilters = () => {
  return (
    <defs>
      {/* ========== AGED PARCHMENT EFFECTS ========== */}
      
      {/* Multi-layer parchment texture with coffee stains */}
      <filter id="parchmentTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.02" 
          numOctaves="6" 
          seed="42"
          result="noise1"
        />
        <feTurbulence 
          type="turbulence" 
          baseFrequency="0.04" 
          numOctaves="4" 
          seed="13"
          result="noise2"
        />
        <feColorMatrix 
          type="matrix" 
          values="0 0 0 0 0.08
                  0 0 0 0 0.06
                  0 0 0 0 0.03
                  0 0 0 0.2 0"
          in="noise1"
          result="coloredNoise1"
        />
        <feColorMatrix 
          type="matrix" 
          values="0 0 0 0 0.04
                  0 0 0 0 0.03
                  0 0 0 0 0.01
                  0 0 0 0.1 0"
          in="noise2"
          result="coloredNoise2"
        />
        <feMerge result="combinedNoise">
          <feMergeNode in="coloredNoise1" />
          <feMergeNode in="coloredNoise2" />
        </feMerge>
        <feBlend in="SourceGraphic" in2="combinedNoise" mode="overlay" />
      </filter>

      {/* Burn/Charred edge effect */}
      <filter id="burnEdge" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        <feColorMatrix type="matrix" values="0.8 0.1 0 0 0.05  0.1 0.6 0 0 0.02  0 0 0.3 0 0  0 0 0 1 0" />
      </filter>

      {/* Ink bleed effect for old map feel */}
      <filter id="inkBleed" x="-5%" y="-5%" width="110%" height="110%">
        <feMorphology operator="dilate" radius="0.5" result="dilated" />
        <feGaussianBlur in="dilated" stdDeviation="0.8" result="blurred" />
        <feMerge>
          <feMergeNode in="blurred" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Water damage stain rings */}
      <filter id="waterDamage" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" result="turbulence" seed="77" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.95 0 0 0  0 0 0.85 0 0  0 0 0 0.7 0" />
      </filter>

      {/* Fold crease overlay */}
      <filter id="foldCrease" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.001 0.1" numOctaves="1" result="crease" />
        <feColorMatrix in="crease" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" result="creaseAlpha" />
        <feBlend in="SourceGraphic" in2="creaseAlpha" mode="multiply" />
      </filter>

      {/* Wax seal shadow - premium depth */}
      <filter id="waxSealShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        <feOffset dx="2" dy="3" result="offsetBlur" />
        <feFlood floodColor="hsl(0, 50%, 20%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Embossed/debossed text for gold leaf effect */}
      <filter id="embossedText" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.8" specularExponent="20" lightingColor="hsl(38, 92%, 70%)" result="specOut">
          <fePointLight x="-5000" y="-5000" z="8000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>

      {/* Fire/smoke glow for danger zones */}
      <filter id="fireGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
        <feFlood floodColor="hsl(25, 100%, 50%)" floodOpacity="0.8" result="color1" />
        <feFlood floodColor="hsl(0, 80%, 50%)" floodOpacity="0.4" result="color2" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feMerge>
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Smoke plume effect */}
      <filter id="smokePlume" x="-50%" y="-100%" width="200%" height="300%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="turbulence">
          <animate attributeName="baseFrequency" values="0.02;0.025;0.02" dur="8s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0.3 0 0 0 0.15  0.3 0 0 0 0.12  0.3 0 0 0 0.1  0 0 0 0.6 0" />
      </filter>

      {/* Mountain shadow effect - enhanced */}
      <filter id="mountainShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="3" dy="4" stdDeviation="3" floodColor="hsl(0, 0%, 0%)" floodOpacity="0.6" />
        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="hsl(25, 20%, 15%)" floodOpacity="0.3" />
      </filter>

      {/* Inner glow for territories - enhanced */}
      <filter id="territoryGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
        <feFlood floodColor="hsl(38, 92%, 50%)" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="innerBlur" />
        <feFlood floodColor="hsl(38, 100%, 60%)" floodOpacity="0.2" result="innerColor" />
        <feComposite in="innerColor" in2="innerBlur" operator="in" result="innerGlow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="innerGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Fantasy text shadow with golden shimmer */}
      <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feFlood floodColor="hsl(38, 70%, 40%)" floodOpacity="0.8" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="innerBlur" />
        <feFlood floodColor="hsl(45, 100%, 70%)" floodOpacity="0.3" result="shimmer" />
        <feComposite in="shimmer" in2="innerBlur" operator="in" result="shimmerGlow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="shimmerGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ========== DANGER LEVEL GLOWS ========== */}
      
      {/* LOW - Safe passage green with soft glow */}
      <filter id="glowLow" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="4" result="blur1" />
        <feGaussianBlur stdDeviation="8" result="blur2" />
        <feFlood floodColor="hsl(142, 76%, 42%)" floodOpacity="0.9" result="color1" />
        <feFlood floodColor="hsl(142, 60%, 30%)" floodOpacity="0.5" result="color2" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feMerge>
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* MEDIUM - Contested territory yellow/amber */}
      <filter id="glowMedium" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="4" result="blur1" />
        <feGaussianBlur stdDeviation="10" result="blur2" />
        <feFlood floodColor="hsl(48, 100%, 50%)" floodOpacity="0.9" result="color1" />
        <feFlood floodColor="hsl(38, 90%, 40%)" floodOpacity="0.5" result="color2" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feMerge>
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* HIGH - Perilous orange with fire effect */}
      <filter id="glowHigh" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="5" result="blur1" />
        <feGaussianBlur stdDeviation="12" result="blur2" />
        <feFlood floodColor="hsl(25, 100%, 50%)" floodOpacity="0.95" result="color1" />
        <feFlood floodColor="hsl(15, 90%, 35%)" floodOpacity="0.6" result="color2" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feMerge>
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* EXTREME - Dragon's domain crimson with pulsing fire */}
      <filter id="glowExtreme" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="6" result="blur1" />
        <feGaussianBlur stdDeviation="15" result="blur2" />
        <feGaussianBlur stdDeviation="25" result="blur3" />
        <feFlood floodColor="hsl(0, 80%, 50%)" floodOpacity="1" result="color1" />
        <feFlood floodColor="hsl(350, 90%, 40%)" floodOpacity="0.7" result="color2" />
        <feFlood floodColor="hsl(20, 100%, 30%)" floodOpacity="0.4" result="color3" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feComposite in="color3" in2="blur3" operator="in" result="glow3" />
        <feMerge>
          <feMergeNode in="glow3" />
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* HQ premium glow - royal golden radiance */}
      <filter id="hqGlow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="8" result="blur1" />
        <feGaussianBlur stdDeviation="16" result="blur2" />
        <feGaussianBlur stdDeviation="30" result="blur3" />
        <feFlood floodColor="hsl(38, 92%, 50%)" floodOpacity="1" result="color1" />
        <feFlood floodColor="hsl(45, 100%, 60%)" floodOpacity="0.6" result="color2" />
        <feFlood floodColor="hsl(30, 80%, 40%)" floodOpacity="0.3" result="color3" />
        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
        <feComposite in="color3" in2="blur3" operator="in" result="glow3" />
        <feMerge>
          <feMergeNode in="glow3" />
          <feMergeNode in="glow2" />
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Inner shadow for depth */}
      <filter id="innerShadow">
        <feOffset dx="0" dy="3" />
        <feGaussianBlur stdDeviation="3" result="offset-blur" />
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
        <feFlood floodColor="black" floodOpacity="0.4" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>

      {/* Storm lightning flash */}
      <filter id="stormFlash" x="-50%" y="-50%" width="200%" height="200%">
        <feFlood floodColor="hsl(220, 80%, 80%)" floodOpacity="0.8" result="flash" />
        <feComposite in="flash" in2="SourceGraphic" operator="in" result="flashShape" />
        <feGaussianBlur in="flashShape" stdDeviation="4" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ========== GRADIENTS ========== */}

      {/* Parchment/old map gradient - aged paper */}
      <linearGradient id="parchmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(35, 30%, 12%)" />
        <stop offset="25%" stopColor="hsl(32, 28%, 10%)" />
        <stop offset="50%" stopColor="hsl(30, 25%, 9%)" />
        <stop offset="75%" stopColor="hsl(28, 22%, 8%)" />
        <stop offset="100%" stopColor="hsl(25, 20%, 6%)" />
      </linearGradient>

      {/* Oklahoma highlight gradient - golden realm */}
      <linearGradient id="oklahomaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 60%, 22%)" stopOpacity="0.85" />
        <stop offset="30%" stopColor="hsl(35, 55%, 18%)" stopOpacity="0.9" />
        <stop offset="70%" stopColor="hsl(32, 50%, 14%)" stopOpacity="0.92" />
        <stop offset="100%" stopColor="hsl(30, 45%, 11%)" stopOpacity="0.95" />
      </linearGradient>

      {/* State gradient - neighboring realms */}
      <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(30, 15%, 16%)" stopOpacity="0.5" />
        <stop offset="50%" stopColor="hsl(25, 12%, 12%)" stopOpacity="0.65" />
        <stop offset="100%" stopColor="hsl(20, 10%, 9%)" stopOpacity="0.8" />
      </linearGradient>

      {/* Mountain range gradient - snow-capped peaks */}
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(0, 0%, 95%)" stopOpacity="0.8" />
        <stop offset="20%" stopColor="hsl(30, 15%, 40%)" />
        <stop offset="60%" stopColor="hsl(25, 20%, 28%)" />
        <stop offset="100%" stopColor="hsl(20, 15%, 18%)" />
      </linearGradient>

      {/* Forest gradient - deep woods */}
      <linearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(120, 40%, 25%)" stopOpacity="0.7" />
        <stop offset="50%" stopColor="hsl(130, 35%, 18%)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="hsl(140, 30%, 12%)" stopOpacity="0.9" />
      </linearGradient>

      {/* Dead forest gradient - haunted woods */}
      <linearGradient id="deadForestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(30, 10%, 35%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(25, 8%, 20%)" stopOpacity="0.8" />
      </linearGradient>

      {/* Water/river gradient - flowing streams */}
      <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(200, 60%, 35%)" stopOpacity="0.3" />
        <stop offset="30%" stopColor="hsl(210, 70%, 40%)" stopOpacity="0.6" />
        <stop offset="50%" stopColor="hsl(205, 65%, 45%)" stopOpacity="0.7" />
        <stop offset="70%" stopColor="hsl(210, 70%, 40%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(200, 60%, 35%)" stopOpacity="0.3" />
      </linearGradient>

      {/* Lake gradient - still waters */}
      <radialGradient id="lakeGradient" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="hsl(210, 60%, 40%)" stopOpacity="0.7" />
        <stop offset="70%" stopColor="hsl(200, 50%, 30%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(195, 40%, 25%)" stopOpacity="0.3" />
      </radialGradient>

      {/* Swamp gradient - murky waters */}
      <radialGradient id="swampGradient" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="hsl(90, 30%, 25%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(80, 20%, 15%)" stopOpacity="0.7" />
      </radialGradient>

      {/* Desert gradient - sandy dunes */}
      <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(40, 50%, 35%)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(35, 40%, 25%)" stopOpacity="0.6" />
      </linearGradient>

      {/* Distance ring glow */}
      <radialGradient id="distanceRing" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
        <stop offset="70%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.2" />
      </radialGradient>

      {/* Vignette overlay - dramatic edges */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="60%" stopColor="transparent" />
        <stop offset="85%" stopColor="hsl(0, 0%, 3%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(0, 0%, 2%)" stopOpacity="0.9" />
      </radialGradient>

      {/* Radar sweep */}
      <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.4" />
        <stop offset="50%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0" />
      </linearGradient>

      {/* Atmosphere glow - ambient light */}
      <radialGradient id="atmosphereGlow" cx="30%" cy="30%" r="80%">
        <stop offset="0%" stopColor="hsl(38, 80%, 50%)" stopOpacity="0.05" />
        <stop offset="50%" stopColor="hsl(38, 70%, 45%)" stopOpacity="0.02" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      {/* Danger zone gradient - for extreme areas */}
      <radialGradient id="dangerZone" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(0, 80%, 40%)" stopOpacity="0.3" />
        <stop offset="70%" stopColor="hsl(0, 70%, 30%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      {/* ========== PATTERNS ========== */}

      {/* Hand-drawn pattern for borders */}
      <pattern id="handDrawnBorder" patternUnits="userSpaceOnUse" width="12" height="6">
        <path 
          d="M0,3 Q3,0 6,3 T12,3" 
          fill="none" 
          stroke="hsl(35, 50%, 40%)" 
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </pattern>

      {/* Dotted border for territory edges */}
      <pattern id="dottedBorder" patternUnits="userSpaceOnUse" width="8" height="8">
        <circle cx="4" cy="4" r="1" fill="hsl(38, 60%, 45%)" opacity="0.5" />
      </pattern>

      {/* Compass rose pattern */}
      <pattern id="compassRose" patternUnits="userSpaceOnUse" width="30" height="30">
        <circle cx="15" cy="15" r="1.5" fill="hsl(38, 70%, 45%)" opacity="0.15" />
        <circle cx="15" cy="15" r="0.5" fill="hsl(38, 80%, 55%)" opacity="0.25" />
      </pattern>

      {/* Cross-hatch pattern for marshlands */}
      <pattern id="marshPattern" patternUnits="userSpaceOnUse" width="8" height="8">
        <path d="M0,0 L8,8 M8,0 L0,8" stroke="hsl(90, 30%, 30%)" strokeWidth="0.5" opacity="0.3" />
      </pattern>

      {/* Wave pattern for water */}
      <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="20" height="10">
        <path d="M0,5 Q5,0 10,5 T20,5" fill="none" stroke="hsl(200, 50%, 50%)" strokeWidth="0.5" opacity="0.2" />
      </pattern>

      {/* ========== SYMBOLS ========== */}

      {/* Tree symbol - Enhanced evergreen */}
      <symbol id="treeSymbol" viewBox="0 0 12 18">
        <path d="M6,0 L9,5 L7.5,5 L10,10 L8,10 L11,16 L1,16 L4,10 L2,10 L4.5,5 L3,5 Z" fill="url(#forestGradient)" />
        <rect x="5" y="15" width="2" height="3" fill="hsl(30, 30%, 25%)" />
      </symbol>

      {/* Dead tree symbol */}
      <symbol id="deadTreeSymbol" viewBox="0 0 12 18">
        <path d="M6,0 L7,4 L9,3 L7.5,7 L10,8 L6,16 L5,10 L2,12 L4,8 L1,7 L5,4 Z" fill="url(#deadForestGradient)" stroke="hsl(25, 15%, 30%)" strokeWidth="0.3" />
      </symbol>

      {/* Mountain symbol - Snow-capped */}
      <symbol id="mountainSymbol" viewBox="0 0 24 18">
        <path d="M0,18 L8,3 L12,8 L16,2 L24,18 Z" fill="hsl(30, 20%, 28%)" stroke="hsl(35, 25%, 35%)" strokeWidth="0.5" />
        <path d="M8,3 L10,6 L6,6 Z" fill="hsl(0, 0%, 90%)" opacity="0.6" />
        <path d="M16,2 L19,8 L13,8 Z" fill="hsl(0, 0%, 92%)" opacity="0.7" />
        <path d="M12,8 L14,11 L10,11 Z" fill="hsl(0, 0%, 85%)" opacity="0.4" />
      </symbol>

      {/* Volcanic mountain */}
      <symbol id="volcanoSymbol" viewBox="0 0 24 20">
        <path d="M0,20 L9,4 L12,6 L15,4 L24,20 Z" fill="hsl(20, 25%, 25%)" stroke="hsl(15, 30%, 30%)" strokeWidth="0.5" />
        <ellipse cx="12" cy="5" rx="3" ry="2" fill="hsl(15, 80%, 40%)" opacity="0.8" />
        <path d="M10,5 Q12,0 14,5" fill="none" stroke="hsl(25, 90%, 50%)" strokeWidth="1" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
        </path>
      </symbol>

      {/* Castle/fortress symbol - Enhanced */}
      <symbol id="fortressSymbol" viewBox="0 0 20 20">
        <rect x="3" y="10" width="14" height="10" fill="hsl(38, 40%, 28%)" />
        <rect x="1" y="8" width="4" height="3" fill="hsl(38, 50%, 32%)" />
        <rect x="8" y="8" width="4" height="3" fill="hsl(38, 50%, 32%)" />
        <rect x="15" y="8" width="4" height="3" fill="hsl(38, 50%, 32%)" />
        <rect x="8" y="13" width="4" height="7" fill="hsl(20, 30%, 18%)" />
        <path d="M10,13 L10,16" stroke="hsl(38, 60%, 40%)" strokeWidth="0.5" />
        <circle cx="10" cy="14.5" r="0.5" fill="hsl(38, 70%, 50%)" />
      </symbol>

      {/* Watchtower symbol */}
      <symbol id="watchtowerSymbol" viewBox="0 0 12 20">
        <rect x="4" y="8" width="4" height="12" fill="hsl(30, 25%, 30%)" />
        <polygon points="6,0 10,8 2,8" fill="hsl(35, 30%, 35%)" />
        <rect x="3" y="6" width="6" height="3" fill="hsl(32, 28%, 32%)" />
        <circle cx="6" cy="4" r="1" fill="hsl(38, 70%, 50%)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
      </symbol>

      {/* Ruins symbol */}
      <symbol id="ruinsSymbol" viewBox="0 0 20 16">
        <rect x="2" y="8" width="3" height="8" fill="hsl(30, 15%, 35%)" opacity="0.7" />
        <rect x="8" y="4" width="2" height="12" fill="hsl(28, 12%, 32%)" opacity="0.6" />
        <rect x="14" y="6" width="4" height="10" fill="hsl(32, 18%, 30%)" opacity="0.5" />
        <path d="M1,16 L5,12 M7,16 L11,10 M13,16 L18,11" stroke="hsl(25, 10%, 25%)" strokeWidth="0.5" opacity="0.4" />
      </symbol>

      {/* Standing stones symbol */}
      <symbol id="standingStonesSymbol" viewBox="0 0 24 16">
        <ellipse cx="12" cy="14" rx="10" ry="2" fill="hsl(30, 15%, 20%)" opacity="0.3" />
        <rect x="3" y="4" width="3" height="12" rx="1" fill="hsl(30, 12%, 40%)" transform="rotate(-5, 4.5, 10)" />
        <rect x="10" y="2" width="4" height="14" rx="1" fill="hsl(28, 15%, 45%)" />
        <rect x="18" y="5" width="3" height="11" rx="1" fill="hsl(32, 10%, 38%)" transform="rotate(3, 19.5, 10.5)" />
      </symbol>

      {/* Skull symbol for danger zones */}
      <symbol id="skullSymbol" viewBox="0 0 20 20">
        <ellipse cx="10" cy="8" rx="7" ry="6" fill="hsl(0, 5%, 85%)" />
        <ellipse cx="7" cy="7" rx="2" ry="2.5" fill="hsl(0, 0%, 8%)" />
        <ellipse cx="13" cy="7" rx="2" ry="2.5" fill="hsl(0, 0%, 8%)" />
        <path d="M8,12 Q10,14 12,12" fill="none" stroke="hsl(0, 0%, 10%)" strokeWidth="0.8" />
        <path d="M6,14 L6,20 M10,14 L10,20 M14,14 L14,20" stroke="hsl(0, 5%, 80%)" strokeWidth="2" />
      </symbol>

      {/* Dragon silhouette */}
      <symbol id="dragonSymbol" viewBox="0 0 40 20">
        <path 
          d="M5,15 Q0,12 2,8 Q4,4 10,6 L15,5 Q20,3 25,5 L30,4 Q35,3 38,8 Q40,12 35,15 L30,14 Q25,16 20,14 L15,15 Q10,17 5,15 Z"
          fill="hsl(0, 0%, 15%)"
          opacity="0.6"
        />
        <path d="M35,8 L38,5 M36,10 L40,8" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" opacity="0.5" />
      </symbol>

      {/* Ship symbol */}
      <symbol id="shipSymbol" viewBox="0 0 20 16">
        <path d="M2,12 L4,8 L16,8 L18,12 Q10,14 2,12 Z" fill="hsl(25, 40%, 30%)" />
        <rect x="9" y="2" width="2" height="10" fill="hsl(30, 30%, 35%)" />
        <path d="M11,3 L11,10 L16,10 Z" fill="hsl(0, 0%, 90%)" opacity="0.8" />
      </symbol>

      {/* Kraken/sea monster */}
      <symbol id="krakenSymbol" viewBox="0 0 30 24">
        <ellipse cx="15" cy="12" rx="8" ry="6" fill="hsl(280, 30%, 25%)" opacity="0.7" />
        <path d="M7,12 Q2,8 4,4" fill="none" stroke="hsl(280, 25%, 30%)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M23,12 Q28,8 26,4" fill="none" stroke="hsl(280, 25%, 30%)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M10,16 Q5,20 3,18" fill="none" stroke="hsl(280, 25%, 30%)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M20,16 Q25,20 27,18" fill="none" stroke="hsl(280, 25%, 30%)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <circle cx="12" cy="10" r="1.5" fill="hsl(60, 80%, 50%)" opacity="0.8" />
        <circle cx="18" cy="10" r="1.5" fill="hsl(60, 80%, 50%)" opacity="0.8" />
      </symbol>

      {/* Thunderbird symbol */}
      <symbol id="thunderbirdSymbol" viewBox="0 0 32 20">
        <path 
          d="M16,2 L20,8 L28,6 L24,10 L30,14 L22,12 L16,18 L10,12 L2,14 L8,10 L4,6 L12,8 Z"
          fill="hsl(200, 60%, 40%)"
          stroke="hsl(210, 70%, 50%)"
          strokeWidth="0.5"
          opacity="0.7"
        />
        <circle cx="16" cy="10" r="2" fill="hsl(50, 100%, 60%)" opacity="0.9" />
      </symbol>

      {/* Compass needle */}
      <symbol id="compassNeedle" viewBox="0 0 10 30">
        <polygon points="5,0 8,15 5,12 2,15" fill="hsl(0, 70%, 45%)" />
        <polygon points="5,30 8,15 5,18 2,15" fill="hsl(0, 0%, 85%)" />
      </symbol>
    </defs>
  );
};

export default FantasyMapFilters;