export interface SeasonalInfo {
  bestSeason: string;
  seasonBadge: string;
  weatherWarning?: string;
  seasonIcon: string;
}

const seasonalMap: Record<string, SeasonalInfo> = {
  "storm-chase": {
    bestSeason: "Spring",
    seasonBadge: "May–June Only",
    weatherWarning: "⚠️ Active tornado season. Book early — tours sell out.",
    seasonIcon: "cloud-lightning",
  },
  "storm-science": {
    bestSeason: "Spring",
    seasonBadge: "Peak: Apr–Jun",
    weatherWarning: "⚠️ Tornado Alley peak season. Incredible but intense.",
    seasonIcon: "cloud-lightning",
  },
  "full-auto-okc": {
    bestSeason: "Summer",
    seasonBadge: "June Event",
    weatherWarning: "Annual event — June 27-28, 2026. Plan ahead!",
    seasonIcon: "calendar",
  },
  "heli-hog-hunt": {
    bestSeason: "Year-round",
    seasonBadge: "Best in Winter",
    seasonIcon: "snowflake",
  },
  "thermal-hog-hunt": {
    bestSeason: "Year-round",
    seasonBadge: "Best in Winter",
    seasonIcon: "moon",
  },
  "skydive-okc": {
    bestSeason: "Spring–Fall",
    seasonBadge: "Best: Mar–Oct",
    weatherWarning: "Weather-dependent. Summer heat = early AM jumps.",
    seasonIcon: "sun",
  },
  "noodling": {
    bestSeason: "Summer",
    seasonBadge: "Summer Only",
    weatherWarning: "Season runs June–August when catfish are spawning.",
    seasonIcon: "sun",
  },
  "whitewater-okc": {
    bestSeason: "Spring–Fall",
    seasonBadge: "Best: Apr–Oct",
    seasonIcon: "droplets",
  },
  "bull-riding-school": {
    bestSeason: "Spring–Fall",
    seasonBadge: "Best in Fall",
    seasonIcon: "leaf",
  },
  "rugaru-zipline": {
    bestSeason: "Fall",
    seasonBadge: "Best in Fall",
    weatherWarning: "Fall foliage makes this absolutely stunning.",
    seasonIcon: "leaf",
  },
  "buffalo-river-canopy": {
    bestSeason: "Fall",
    seasonBadge: "Best in Fall",
    seasonIcon: "leaf",
  },
  "drive-tanks": {
    bestSeason: "Fall–Spring",
    seasonBadge: "Avoid Summer",
    weatherWarning: "Texas summer heat is brutal. Book Oct–Apr.",
    seasonIcon: "thermometer",
  },
  "valhalla-silo": {
    bestSeason: "Year-round",
    seasonBadge: "Year-Round",
    seasonIcon: "clock",
  },
  "zombie-larp": {
    bestSeason: "Spring–Fall",
    seasonBadge: "Monthly Events",
    seasonIcon: "calendar",
  },
};

export const getSeasonalInfo = (missionId: string): SeasonalInfo | null => {
  return seasonalMap[missionId] ?? null;
};

export const getCurrentSeason = (): string => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  return "Winter";
};

export const isInSeason = (missionId: string): boolean => {
  const info = getSeasonalInfo(missionId);
  if (!info) return true;
  const current = getCurrentSeason();
  return info.bestSeason.includes(current) || info.bestSeason === "Year-round";
};
