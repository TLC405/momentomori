import { missions } from "@/data/missions";
import { realms } from "@/data/realms";

const AppFooter = () => {
  return (
    <footer className="border-t border-border/30 mt-16 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-display text-xl font-bold text-foreground">Remember You Must Live</span>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Life's greatest adventures are waiting. Discover extraordinary experiences that create lasting memories.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4">By the Numbers</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: missions.length, label: "Adventures" },
                { value: realms.length, label: "Regions" },
                { value: "7", label: "States" },
                { value: "∞", label: "Memories" },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted/20 rounded-lg p-3 text-center border border-border/20 hover:border-primary/20 transition-all">
                  <div className="font-display text-2xl text-primary font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4">Our Mission</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Curating extraordinary outdoor adventures and unforgettable experiences across the American heartland.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-earth-forest" />
              <span>Based in Oklahoma City</span>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2024 Remember You Must Live · Memento Mori</p>
            <p className="text-xs text-muted-foreground">Adventure awaits those who seek it</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
