import { useState, useEffect, useRef } from "react";
import { missions } from "@/data/missions";
import { realms } from "@/data/realms";
import { MapPin, Compass, Mountain, Flame, Clock, DollarSign } from "lucide-react";

const useCountUp = (target: number, duration = 1000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const StatsBar = () => {
  const totalMissions = missions.length;
  const totalRealms = realms.length;
  const extremeCount = missions.filter(m => m.dangerLevel === "EXTREME").length;
  const totalDriveHours = Math.round(missions.reduce((a, m) => a + m.distanceFromOKC, 0));
  const avgCost = Math.round(missions.reduce((a, m) => {
    const match = m.priceEstimate.match(/\$?([\d,]+)/);
    return a + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0) / missions.length);

  const stats = [
    { icon: Compass, label: "Adventures", value: totalMissions, suffix: "" },
    { icon: Mountain, label: "Regions", value: totalRealms, suffix: "" },
    { icon: Flame, label: "Extreme", value: extremeCount, suffix: "" },
    { icon: Clock, label: "Drive Hours", value: totalDriveHours, suffix: "h" },
    { icon: DollarSign, label: "Avg Cost", value: avgCost, suffix: "", prefix: "$" },
  ];

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex items-stretch gap-3 min-w-max">
        {stats.map((stat, index) => {
          const { count, ref } = useCountUp(stat.value);
          return (
            <div ref={ref} key={stat.label} className="flex-1 min-w-[140px]">
              <div className="relative h-full bg-card/50 border border-border/30 rounded-xl px-5 py-4 group warm-glow-border hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors ring-1 ring-primary/10 group-hover:ring-primary/20 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="stat-value text-xl font-bold leading-tight">
                    {stat.prefix || ""}{count}{stat.suffix}
                  </div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase">{stat.label}</div>
                </div>
                {/* Divider between stats */}
                {index < stats.length - 1 && (
                  <div className="absolute right-0 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsBar;