import { missions } from "@/data/missions";
import { realms } from "@/data/realms";

const AppFooter = () => {
  return (
    <footer className="border-t border-primary/20 mt-16 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-float-gentle">
                <span className="text-xl">💀</span>
              </div>
              <span className="font-orbitron text-lg font-bold shimmer-text">MEMENTO MORI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Remember you must die — so LIVE first.
              Discover extraordinary experiences that forge legends.
            </p>
          </div>
          <div>
            <h4 className="font-orbitron text-sm font-bold text-foreground mb-4">BY THE NUMBERS</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: missions.length, label: "Quests" },
                { value: realms.length, label: "Realms" },
                { value: "7", label: "States" },
                { value: "∞", label: "Memories" },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted/30 rounded-lg p-3 text-center group hover:border-primary/30 hover:translate-y-[-3px] border border-transparent transition-all duration-300 hover:shadow-[0_10px_25px_-8px_hsl(var(--tactical-amber)/0.2)]">
                  <div className="font-orbitron text-2xl text-primary font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-orbitron text-sm font-bold text-foreground mb-4">THE MISSION</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Every warrior needs a quest. Every brotherhood needs adventures.
              This is your tactical guide to experiences that forge legends.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Based in Oklahoma City</span>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/30">
          <div className="h-px animate-gradient-sweep mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 REMEMBER YOU MUST DIE • Memento Mori
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>💀 Live before you die</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
