import { useState, useEffect, useRef } from "react";
import { missions } from "@/data/missions";
import { realms } from "@/data/realms";
import { MapPin, Flame, Users, Skull } from "lucide-react";

const useCountUp = (target: number, duration = 1200) => {
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
    { icon: MapPin, label: "Epic Quests", value: totalMissions, color: "text-primary" },
    { icon: Flame, label: "Realms", value: totalRealms, color: "text-primary" },
    { icon: Skull, label: "Extreme Danger", value: extremeMissions, color: "text-danger-extreme" },
    { icon: Users, label: "New Adventures", value: newMissions, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => {
        const { count, ref } = useCountUp(stat.value);
        return (
          <div 
            ref={ref}
            key={stat.label}
            className="card-3d"
          >
            <div
              className="relative overflow-hidden bg-card border border-border/50 rounded-xl p-4 group hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_15px_40px_-10px_hsl(var(--tactical-amber)/0.3)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center gap-3">
                <div className={`p-2.5 rounded-lg bg-muted/50 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
                </div>
                <div>
                  <div className="font-orbitron text-xl font-bold text-foreground">
                    {count}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
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
