import { useRef, useState, useEffect } from "react";
import { missions, Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { Star, MapPin } from "lucide-react";

interface LegendaryPicksProps {
  onMissionSelect: (mission: Mission) => void;
}

const LegendaryPicks = ({ onMissionSelect }: LegendaryPicksProps) => {
  const legendaryMissions = missions.filter((m) => m.broRating === 5);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    let animId: number;
    const speed = 0.5;

    const animate = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  const items = [...legendaryMissions, ...legendaryMissions];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-1">
        <h2 className="font-display text-lg font-bold text-foreground">Legendary Picks</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/40 to-transparent rounded-full" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 text-primary fill-primary" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">rated</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden cursor-grab"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((mission, i) => {
          const [imgLoaded, setImgLoaded] = useState(false);

          return (
            <div
              key={`${mission.id}-${i}`}
              onClick={() => onMissionSelect(mission)}
              className="flex-shrink-0 w-[340px] md:w-[420px] relative rounded-xl overflow-hidden group cursor-pointer border border-border/30 hover:border-primary/40 transition-all"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                {!imgLoaded && <div className="absolute inset-0 animate-shimmer bg-muted/40" />}
                <img
                  src={getMissionImage(mission.id)}
                  alt={mission.name}
                  onLoad={() => setImgLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 60px 10px hsl(var(--background) / 0.2)' }} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" />
                  ))}
                </div>
                <h3 className="font-display text-base font-bold text-foreground line-clamp-1">
                  {mission.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary/60" />
                  <span>{mission.city}, {mission.state}</span>
                  <span className="ml-auto text-primary font-semibold">{mission.priceEstimate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LegendaryPicks;
