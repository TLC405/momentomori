// Mission Hero Images
import tankDrive from "@/assets/missions/tank-drive.jpg";
import supercarRacing from "@/assets/missions/supercar-racing.jpg";
import rallyDriving from "@/assets/missions/rally-driving.jpg";
import heavyEquipment from "@/assets/missions/heavy-equipment.jpg";
import heliHunt from "@/assets/missions/heli-hunt.jpg";
import skydiving from "@/assets/missions/skydiving.jpg";
import flightTraining from "@/assets/missions/flight-training.jpg";
import fullAuto from "@/assets/missions/full-auto.jpg";
import dDayPaintball from "@/assets/missions/d-day-paintball.jpg";
import tigerSafari from "@/assets/missions/tiger-safari.jpg";
import tornadoChase from "@/assets/missions/tornado-chase.jpg";
import missileSiloDive from "@/assets/missions/missile-silo-dive.jpg";
import catfishNoodling from "@/assets/missions/catfish-noodling.jpg";
import whitewaterRafting from "@/assets/missions/whitewater-rafting.jpg";
import bungeeFreefall from "@/assets/missions/bungee-freefall.jpg";
import exoticSafari from "@/assets/missions/exotic-safari.jpg";
import goKartRacing from "@/assets/missions/go-kart-racing.jpg";
import tacticalTraining from "@/assets/missions/tactical-training.jpg";

export const missionImages: Record<string, string> = {
  // Metal Gods
  "drive-tanks": tankDrive,
  "hallett-supercar": supercarRacing,
  "rally-ready": rallyDriving,
  "dig-world": heavyEquipment,
  "zero-gravity": bungeeFreefall,
  
  // Red Dirt Air Force
  "heli-hog-hunt": heliHunt,
  "skydive-okc": skydiving,
  "flight-lesson": flightTraining,
  
  // The Armory
  "full-auto-okc": fullAuto,
  "d-day-adventure": dDayPaintball,
  "tactical-firearms": tacticalTraining,
  
  // Jurassic Encounters
  "tiger-safari": tigerSafari,
  "exotic-ranch": exoticSafari,
  
  // Storm Lords
  "storm-chase": tornadoChase,
  "storm-science": tornadoChase,
  
  // Nuclear Option
  "valhalla-silo": missileSiloDive,
  
  // Aquatic Assault
  "noodling": catfishNoodling,
  "whitewater-okc": whitewaterRafting,
  
  // Velocity
  "exotic-racing-dfw": supercarRacing,
  "go-kart-racing": goKartRacing,
  "motorsport-ranch": supercarRacing,
};

export const getMissionImage = (missionId: string): string => {
  return missionImages[missionId] || tankDrive; // Default fallback
};
