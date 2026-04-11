import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { Mission } from "@/data/missions";
import { getMissionImage } from "@/data/missionImages";
import { getSeasonalInfo } from "@/data/seasonalData";
import { MapPin, Clock, Star, Check, X, ChevronUp, Leaf, Sun, CloudLightning, Snowflake, Calendar, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeDeckProps {
  missions: Mission[];
  onAddToItinerary: (mission: Mission) => void;
  onViewDetail: (mission: Mission) => void;
  itineraryMissions: Mission[];
}

const SWIPE_THRESHOLD = 120;

const SeasonIcon = ({ icon }: { icon: string }) => {
  const props = { className: "w-3 h-3" };
  switch (icon) {
    case "leaf": return <Leaf {...props} />;
    case "sun": return <Sun {...props} />;
    case "cloud-lightning": return <CloudLightning {...props} />;
    case "snowflake": return <Snowflake {...props} />;
    case "calendar": return <Calendar {...props} />;
    default: return <Clock {...props} />;
  }
};

const getDangerConfig = (level: Mission["dangerLevel"]) => {
  switch (level) {
    case "LOW": return { class: "danger-bg-low text-black", label: "Easy" };
    case "MEDIUM": return { class: "danger-bg-medium text-black", label: "Moderate" };
    case "HIGH": return { class: "danger-bg-high text-black", label: "Intense" };
    case "EXTREME": return { class: "danger-bg-extreme text-white", label: "Extreme" };
  }
};

const triggerHaptic = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

const SwipeCard = ({
  mission,
  isTop,
  onSwipe,
  onViewDetail,
  isInItinerary,
}: {
  mission: Mission;
  isTop: boolean;
  onSwipe: (dir: "left" | "right") => void;
  onViewDetail: () => void;
  isInItinerary: boolean;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const addOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const imageUrl = getMissionImage(mission.id);
  const dangerConfig = getDangerConfig(mission.dangerLevel);
  const seasonal = getSeasonalInfo(mission.id);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      triggerHaptic([15, 50, 15]);
      animate(x, 500, { duration: 0.3 });
      setTimeout(() => onSwipe("right"), 300);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      triggerHaptic(8);
      animate(x, -500, { duration: 0.3 });
      setTimeout(() => onSwipe("left"), 300);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 touch-none"
      style={{ x, rotate, zIndex: isTop ? 10 : 5 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border border-border/30 shadow-2xl" role="article" aria-label={`${mission.name} — ${mission.city}, ${mission.state}`}>
        {/* Image */}
        <img
          src={imageUrl}
          alt={mission.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Swipe indicators */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-8 right-8 z-20 px-6 py-3 rounded-xl border-4 border-green-500 bg-green-500/20 backdrop-blur-sm"
              style={{ opacity: addOpacity }}
              aria-hidden="true"
            >
              <span className="text-green-400 font-display text-2xl font-black tracking-wider">ADD</span>
            </motion.div>
            <motion.div
              className="absolute top-8 left-8 z-20 px-6 py-3 rounded-xl border-4 border-red-400 bg-red-500/20 backdrop-blur-sm"
              style={{ opacity: skipOpacity }}
              aria-hidden="true"
            >
              <span className="text-red-400 font-display text-2xl font-black tracking-wider">SKIP</span>
            </motion.div>
          </>
        )}

        {/* Badges top */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1.5">
            <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", dangerConfig.class)}>
              {dangerConfig.label}
            </span>
            {seasonal && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-accent/90 text-accent-foreground backdrop-blur-sm">
                <SeasonIcon icon={seasonal.seasonIcon} />
                {seasonal.seasonBadge}
              </span>
            )}
          </div>
          {isInItinerary && (
            <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Saved
            </div>
          )}
        </div>

        {/* Content bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          {seasonal?.weatherWarning && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
              <p className="text-[11px] text-amber-200 font-medium">{seasonal.weatherWarning}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
            <MapPin className="w-3 h-3" />
            <span>{mission.city}, {mission.state}</span>
          </div>

          <h3 className="font-display text-2xl font-black text-white leading-tight mb-2">
            {mission.name}
          </h3>

          <p className="text-sm text-white/70 line-clamp-2 mb-3 leading-relaxed">
            {mission.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{mission.priceEstimate}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-white/50" />
              <span className="text-xs text-white/60">{mission.duration}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: mission.broRating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
              ))}
            </div>
          </div>

          {/* View detail button */}
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetail(); }}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm font-semibold hover:bg-white/20 transition-all"
            aria-label={`View details for ${mission.name}`}
          >
            <ChevronUp className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SwipeDeck = ({ missions: missionList, onAddToItinerary, onViewDetail, itineraryMissions }: SwipeDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<Array<{ index: number; dir: "left" | "right" }>>([]);

  const handleSwipe = useCallback((dir: "left" | "right") => {
    if (dir === "right") {
      onAddToItinerary(missionList[currentIndex]);
    }
    setSwipeHistory(prev => [...prev, { index: currentIndex, dir }]);
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, missionList, onAddToItinerary]);

  const handleUndo = useCallback(() => {
    if (swipeHistory.length === 0) return;
    const last = swipeHistory[swipeHistory.length - 1];
    triggerHaptic(5);
    // If the last swipe was "right", we need to remove from itinerary
    if (last.dir === "right") {
      onAddToItinerary(missionList[last.index]); // toggle off
    }
    setSwipeHistory(prev => prev.slice(0, -1));
    setCurrentIndex(last.index);
  }, [swipeHistory, missionList, onAddToItinerary]);

  const handleButtonSwipe = (dir: "left" | "right") => {
    triggerHaptic(dir === "right" ? [15, 50, 15] : 8);
    handleSwipe(dir);
  };

  if (currentIndex >= missionList.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-6" role="status">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">All Explored!</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          You've swiped through all {missionList.length} adventures.
        </p>
        <div className="flex gap-3">
          {swipeHistory.length > 0 && (
            <button
              onClick={handleUndo}
              className="px-5 py-2.5 border border-border/50 text-foreground rounded-xl font-semibold text-sm flex items-center gap-2"
              aria-label="Undo last swipe"
            >
              <Undo2 className="w-4 h-4" /> Undo
            </button>
          )}
          <button
            onClick={() => { setCurrentIndex(0); setSwipeHistory([]); }}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const visibleCards = missionList.slice(currentIndex, currentIndex + 3);

  return (
    <div className="space-y-4" id="adventures-section" role="region" aria-label="Swipe through adventures">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display text-lg font-bold text-foreground">Swipe to Explore</h2>
        <span className="text-xs text-muted-foreground">
          <span className="stat-value text-xs">{currentIndex + 1}</span> / {missionList.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemax={missionList.length}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / missionList.length) * 100}%` }}
        />
      </div>

      {/* Card stack */}
      <div className="relative h-[65vh] min-h-[480px] max-h-[640px]">
        {visibleCards.map((mission, i) => {
          const stackIndex = visibleCards.length - 1 - i;
          return (
            <div
              key={mission.id}
              className="absolute inset-0"
              style={{
                transform: `scale(${1 - stackIndex * 0.04}) translateY(${stackIndex * 12}px)`,
                opacity: stackIndex > 1 ? 0.5 : 1,
                zIndex: visibleCards.length - i,
              }}
            >
              <SwipeCard
                mission={mission}
                isTop={i === 0}
                onSwipe={handleSwipe}
                onViewDetail={() => onViewDetail(mission)}
                isInItinerary={itineraryMissions.some((m) => m.id === mission.id)}
              />
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          onClick={() => handleButtonSwipe("left")}
          className="w-16 h-16 rounded-full bg-card border-2 border-destructive/30 flex items-center justify-center shadow-lg hover:border-destructive/60 hover:scale-110 transition-all active:scale-95"
          aria-label="Skip this adventure"
        >
          <X className="w-7 h-7 text-destructive" />
        </button>

        {swipeHistory.length > 0 && (
          <button
            onClick={handleUndo}
            className="w-10 h-10 rounded-full bg-card border-2 border-muted-foreground/20 flex items-center justify-center shadow-lg hover:border-muted-foreground/50 hover:scale-110 transition-all active:scale-95"
            aria-label="Undo last swipe"
          >
            <Undo2 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        <button
          onClick={() => onViewDetail(missionList[currentIndex])}
          className="w-12 h-12 rounded-full bg-card border-2 border-accent/30 flex items-center justify-center shadow-lg hover:border-accent/60 hover:scale-110 transition-all active:scale-95"
          aria-label="View adventure details"
        >
          <ChevronUp className="w-6 h-6 text-accent" />
        </button>
        <button
          onClick={() => handleButtonSwipe("right")}
          className="w-16 h-16 rounded-full bg-card border-2 border-green-500/30 flex items-center justify-center shadow-lg hover:border-green-500/60 hover:scale-110 transition-all active:scale-95"
          aria-label="Add to itinerary"
        >
          <Check className="w-7 h-7 text-green-500" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-8 text-[10px] text-muted-foreground uppercase tracking-widest" aria-hidden="true">
        <span>← Skip</span>
        <span>Undo</span>
        <span>Details ↑</span>
        <span>Add →</span>
      </div>
    </div>
  );
};

export default SwipeDeck;
