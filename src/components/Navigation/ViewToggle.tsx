import { cn } from "@/lib/utils";

export type ViewMode = "loadout" | "deck" | "map";

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const views: { id: ViewMode; label: string; icon: string }[] = [
  { id: "loadout", label: "LOADOUT", icon: "◫" },
  { id: "deck", label: "INTEL DECK", icon: "▤" },
  { id: "map", label: "WAR ROOM", icon: "◎" },
];

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center border border-primary/30">
      {views.map((view, index) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 font-mono-tactical text-xs tracking-wider transition-all",
            currentView === view.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-primary hover:bg-primary/10",
            index !== views.length - 1 && "border-r border-primary/30"
          )}
        >
          <span className="text-sm">{view.icon}</span>
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
