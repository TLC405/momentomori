import { missions } from "@/data/missions";
import { realms } from "@/data/realms";
import { MapPin, Flame, Users, Skull } from "lucide-react";

const StatsBar = () => {
  const totalMissions = missions.length;
  const totalRealms = realms.length;
  const extremeMissions = missions.filter(m => m.dangerLevel === "EXTREME").length;
  const newMissions = missions.filter(m => m.isNew).length;

  const stats = [
    { 
      icon: MapPin, 
      label: "Epic Quests", 
      value: totalMissions,
      color: "text-primary"
    },
    { 
      icon: Flame, 
      label: "Realms", 
      value: totalRealms,
      color: "text-tactical-orange"
    },
    { 
      icon: Skull, 
      label: "Extreme Danger", 
      value: extremeMissions,
      color: "text-danger-extreme"
    },
    { 
      icon: Users, 
      label: "New Adventures", 
      value: newMissions,
      color: "text-tactical-green"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="relative overflow-hidden bg-card border border-border/50 rounded-xl p-4 group hover:border-primary/50 transition-all"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-muted/50 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-orbitron text-xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
