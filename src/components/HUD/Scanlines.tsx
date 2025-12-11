const Scanlines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--tactical-green) / 0.1) 2px,
            hsl(var(--tactical-green) / 0.1) 4px
          )`
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 60%,
            hsl(0 0% 0% / 0.4) 100%
          )`
        }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary/30">
          <path d="M0 20 L0 0 L20 0" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary/30">
          <path d="M44 0 L64 0 L64 20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary/30">
          <path d="M0 44 L0 64 L20 64" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary/30">
          <path d="M44 64 L64 64 L64 44" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default Scanlines;
