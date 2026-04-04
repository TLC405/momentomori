import { useState, useEffect, useRef } from "react";
import { missions } from "@/data/missions";
import { realms } from "@/data/realms";
import { Compass, Mountain, Flame, Clock, DollarSign } from "lucide-react";

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

// Static decorative sparkline paths
const sparklines = [
  "M0 12 L4 10 L8 14 L12 8 L16 11 L20 6 L24 9 L28 4 L32 7",
  "M0 8 L5 12 L10 6 L15 10 L20 4 L25 9 L30 5",
  "M0 10 L6 4 L12 12 L18 6 L24 8 L30 3",
  "M0 6 L8 12 L16 4 L24 10 L32 2",
  "M0 14 L6 8 L12 12 L18 4 L24 10 L30 6",
];

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
              <div className="relative h-full bg-card/50 border border-border/30 rounded-xl px-5 py-4 group warm-glow-border hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-3 overflow-hidden">
                {/* Radial inner gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.06), transparent 70%)' }} />

                {/* Decorative sparkline */}
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity" width="32" height="16" viewBox="0 0 32 16">
                  <path d={sparklines[index]} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <div className="relative p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-all ring-1 ring-primary/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.25)]">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="relative">
                  <div className="stat-value text-xl font-bold leading-tight">
                    {stat.prefix || ""}{count}{stat.suffix}
                  </div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase">{stat.label}</div>
                </div>
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
