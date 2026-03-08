import { useState, useEffect, useRef } from "react";
import { missions } from "@/data/missions";
import { realms } from "@/data/realms";
import { MapPin, Compass, Mountain, Users } from "lucide-react";

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
  const extremeMissions = missions.filter(m => m.dangerLevel === "EXTREME").length;
  const newMissions = missions.filter(m => m.isNew).length;

  const stats = [
    { icon: Compass, label: "Adventures", value: totalMissions },
    { icon: Mountain, label: "Regions", value: totalRealms },
    { icon: MapPin, label: "Extreme", value: extremeMissions },
    { icon: Users, label: "New This Season", value: newMissions },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const { count, ref } = useCountUp(stat.value);
        return (
          <div ref={ref} key={stat.label}>
            <div
              className="relative bg-card border border-border/50 rounded-xl p-5 group hover:border-primary/40 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.15)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">{count}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
