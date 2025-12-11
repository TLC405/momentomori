interface TerrainElementsProps {
  animate?: boolean;
}

const FantasyTerrainElements = ({ animate = true }: TerrainElementsProps) => {
  return (
    <g id="terrain-elements" opacity="0.5">
      {/* Mountain ranges along western edge (Rockies representation) */}
      <g id="western-mountains">
        {/* Row 1 */}
        <use href="#mountainSymbol" x="20" y="80" width="25" height="20" opacity="0.7" />
        <use href="#mountainSymbol" x="35" y="95" width="30" height="22" opacity="0.8" />
        <use href="#mountainSymbol" x="15" y="115" width="28" height="21" opacity="0.6" />
        <use href="#mountainSymbol" x="30" y="140" width="32" height="24" opacity="0.75" />
        <use href="#mountainSymbol" x="20" y="165" width="26" height="19" opacity="0.65" />
        <use href="#mountainSymbol" x="35" y="190" width="30" height="22" opacity="0.7" />
        <use href="#mountainSymbol" x="25" y="220" width="28" height="21" opacity="0.6" />
        <use href="#mountainSymbol" x="15" y="250" width="24" height="18" opacity="0.55" />
        <use href="#mountainSymbol" x="30" y="280" width="30" height="22" opacity="0.65" />
        <use href="#mountainSymbol" x="20" y="310" width="26" height="19" opacity="0.6" />
      </g>

      {/* Wichita Mountains in SW Oklahoma */}
      <g id="wichita-mountains">
        <use href="#mountainSymbol" x="200" y="230" width="18" height="13" opacity="0.5" />
        <use href="#mountainSymbol" x="215" y="225" width="20" height="15" opacity="0.55" />
        <use href="#mountainSymbol" x="230" y="232" width="16" height="12" opacity="0.45" />
      </g>

      {/* Arbuckle Mountains in south-central Oklahoma */}
      <g id="arbuckle-mountains">
        <use href="#mountainSymbol" x="340" y="248" width="14" height="10" opacity="0.4" />
        <use href="#mountainSymbol" x="355" y="245" width="16" height="12" opacity="0.45" />
        <use href="#mountainSymbol" x="370" y="250" width="12" height="9" opacity="0.35" />
      </g>

      {/* Ouachita Mountains in eastern Oklahoma/Arkansas */}
      <g id="ouachita-mountains">
        <use href="#mountainSymbol" x="550" y="200" width="20" height="15" opacity="0.5" />
        <use href="#mountainSymbol" x="570" y="195" width="22" height="16" opacity="0.55" />
        <use href="#mountainSymbol" x="595" y="205" width="18" height="13" opacity="0.45" />
        <use href="#mountainSymbol" x="615" y="210" width="20" height="15" opacity="0.5" />
        <use href="#mountainSymbol" x="560" y="220" width="16" height="12" opacity="0.4" />
        <use href="#mountainSymbol" x="580" y="230" width="18" height="13" opacity="0.45" />
      </g>

      {/* Ozark Plateau in NE Oklahoma/Arkansas/Missouri */}
      <g id="ozark-plateau">
        <use href="#mountainSymbol" x="530" y="140" width="16" height="12" opacity="0.4" />
        <use href="#mountainSymbol" x="550" y="130" width="18" height="13" opacity="0.45" />
        <use href="#mountainSymbol" x="575" y="125" width="20" height="15" opacity="0.5" />
        <use href="#mountainSymbol" x="600" y="135" width="16" height="12" opacity="0.4" />
        <use href="#mountainSymbol" x="620" y="145" width="18" height="13" opacity="0.45" />
      </g>

      {/* Forest areas - Cross Timbers */}
      <g id="cross-timbers-forest" opacity="0.35">
        {/* Trees scattered across central Oklahoma */}
        <use href="#treeSymbol" x="280" y="200" width="6" height="9" />
        <use href="#treeSymbol" x="295" y="195" width="5" height="8" />
        <use href="#treeSymbol" x="310" y="205" width="6" height="9" />
        <use href="#treeSymbol" x="260" y="210" width="5" height="8" />
        <use href="#treeSymbol" x="275" y="220" width="6" height="9" />
        <use href="#treeSymbol" x="330" y="200" width="5" height="8" />
        <use href="#treeSymbol" x="345" y="195" width="6" height="9" />
        <use href="#treeSymbol" x="285" y="215" width="5" height="8" />
      </g>

      {/* Eastern forest belt */}
      <g id="eastern-forests" opacity="0.3">
        <use href="#treeSymbol" x="480" y="180" width="6" height="9" />
        <use href="#treeSymbol" x="495" y="175" width="5" height="8" />
        <use href="#treeSymbol" x="510" y="185" width="6" height="9" />
        <use href="#treeSymbol" x="525" y="180" width="5" height="8" />
        <use href="#treeSymbol" x="600" y="175" width="6" height="9" />
        <use href="#treeSymbol" x="620" y="180" width="5" height="8" />
        <use href="#treeSymbol" x="640" y="170" width="6" height="9" />
        <use href="#treeSymbol" x="655" y="185" width="5" height="8" />
      </g>

      {/* Piney Woods in East Texas */}
      <g id="piney-woods" opacity="0.25">
        <use href="#treeSymbol" x="530" y="290" width="5" height="8" />
        <use href="#treeSymbol" x="545" y="285" width="6" height="9" />
        <use href="#treeSymbol" x="520" y="300" width="5" height="8" />
        <use href="#treeSymbol" x="535" y="310" width="6" height="9" />
      </g>

      {/* Decorative elements - ancient style */}
      <g id="decorative-elements" opacity="0.15">
        {/* Compass rose in corner */}
        <g transform="translate(720, 340)">
          <circle r="25" fill="none" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" />
          <circle r="20" fill="none" stroke="hsl(38, 50%, 40%)" strokeWidth="0.3" />
          <line x1="0" y1="-25" x2="0" y2="-18" stroke="hsl(38, 60%, 50%)" strokeWidth="1" />
          <line x1="25" y1="0" x2="18" y2="0" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="0" y2="18" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" />
          <line x1="-25" y1="0" x2="-18" y2="0" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" />
          <text y="-28" textAnchor="middle" fill="hsl(38, 60%, 50%)" fontSize="8" fontFamily="serif">N</text>
          <polygon points="0,-15 3,-8 0,-10 -3,-8" fill="hsl(38, 60%, 50%)" />
        </g>

        {/* Scale bar decoration */}
        <g transform="translate(50, 380)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="hsl(38, 50%, 40%)" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="hsl(38, 50%, 40%)" strokeWidth="1" />
          <line x1="40" y1="-2" x2="40" y2="2" stroke="hsl(38, 50%, 40%)" strokeWidth="0.5" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="hsl(38, 50%, 40%)" strokeWidth="1" />
          <text x="40" y="12" textAnchor="middle" fill="hsl(38, 50%, 40%)" fontSize="7" fontFamily="serif">100 leagues</text>
        </g>

        {/* Decorative corner flourishes */}
        <path 
          d="M 15 15 Q 5 15 5 5 M 15 15 Q 15 5 5 5"
          fill="none"
          stroke="hsl(38, 50%, 40%)"
          strokeWidth="1"
        />
        <path 
          d="M 785 15 Q 795 15 795 5 M 785 15 Q 785 5 795 5"
          fill="none"
          stroke="hsl(38, 50%, 40%)"
          strokeWidth="1"
        />
        <path 
          d="M 15 385 Q 5 385 5 395 M 15 385 Q 15 395 5 395"
          fill="none"
          stroke="hsl(38, 50%, 40%)"
          strokeWidth="1"
        />
        <path 
          d="M 785 385 Q 795 385 795 395 M 785 385 Q 785 395 795 395"
          fill="none"
          stroke="hsl(38, 50%, 40%)"
          strokeWidth="1"
        />
      </g>

      {/* Animated elements */}
      {animate && (
        <g id="animated-elements">
          {/* Subtle glow points at key locations */}
          <circle cx="310" cy="195" r="2" fill="hsl(38, 92%, 50%)" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="175" r="1.5" fill="hsl(38, 80%, 50%)" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="300" r="1.5" fill="hsl(38, 80%, 50%)" opacity="0.2">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </g>
  );
};

export default FantasyTerrainElements;
