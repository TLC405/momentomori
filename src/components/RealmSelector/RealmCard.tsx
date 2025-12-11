import { Realm } from "@/data/realms";
import { cn } from "@/lib/utils";

interface RealmCardProps {
  realm: Realm;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const RealmCard = ({ realm, isSelected, onClick, index }: RealmCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full aspect-[4/3] overflow-hidden transition-all duration-500",
        "border border-primary/20 hover:border-primary/60",
        "bg-gradient-to-br from-card to-background",
        isSelected && "border-primary ring-1 ring-primary/50 scale-[1.02]",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background glow effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          isSelected && "opacity-100"
        )}
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(var(--tactical-green) / 0.15), transparent 70%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
        {/* Icon */}
        <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {realm.icon}
        </span>
        
        {/* Codename */}
        <span className="font-mono-tactical text-[10px] text-muted-foreground tracking-widest mb-1">
          [ {realm.codename} ]
        </span>
        
        {/* Name */}
        <h3 className={cn(
          "font-orbitron text-sm sm:text-base font-bold tracking-wide",
          "text-foreground group-hover:text-primary transition-colors",
          isSelected && "text-primary tactical-glow"
        )}>
          {realm.name}
        </h3>
        
        {/* Description */}
        <p className="font-rajdhani text-xs text-muted-foreground mt-2 line-clamp-2 px-2">
          {realm.description}
        </p>
        
        {/* Mission count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          <span className="font-mono-tactical text-[10px] text-primary">
            {realm.missionCount}
          </span>
          <span className="font-mono-tactical text-[10px] text-muted-foreground">
            OPS
          </span>
        </div>
      </div>
      
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors" />
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 bg-primary rotate-45 animate-pulse" />
        </div>
      )}
    </button>
  );
};

export default RealmCard;
