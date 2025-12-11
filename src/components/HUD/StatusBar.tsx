import { useState, useEffect } from "react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-primary/20">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Logo/Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
            <span className="font-orbitron text-primary text-sm tracking-widest">
              BRO-IMPOSSIBLE
            </span>
          </div>
          <div className="h-4 w-px bg-primary/30" />
          <span className="font-mono-tactical text-muted-foreground text-xs">
            MISSION CONTROL v2.0
          </span>
        </div>

        {/* Center - Status */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tactical-green animate-pulse" />
            <span className="font-mono-tactical text-xs text-muted-foreground">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tactical text-xs text-muted-foreground">
              MISSIONS LOADED:
            </span>
            <span className="font-mono-tactical text-xs text-primary">
              41
            </span>
          </div>
        </div>

        {/* Right - Time/Coordinates */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-mono-tactical text-xs text-muted-foreground">
              HQ: 35.4676°N 97.5164°W
            </span>
            <span className="font-mono-tactical text-xs text-primary">
              OKC, OKLAHOMA
            </span>
          </div>
          <div className="h-8 w-px bg-primary/30" />
          <div className="font-mono-tactical text-sm text-primary tabular-nums">
            {time.toLocaleTimeString("en-US", { 
              hour12: false, 
              hour: "2-digit", 
              minute: "2-digit", 
              second: "2-digit" 
            })}
          </div>
        </div>
      </div>
      
      {/* Progress line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  );
};

export default StatusBar;
