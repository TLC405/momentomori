export interface Realm {
  id: string;
  name: string;
  codename: string;
  description: string;
  icon: string;
  color: string;
  missionCount: number;
}

export const realms: Realm[] = [
  {
    id: "metal-gods",
    name: "Metal Gods",
    codename: "WRENCH",
    description: "Tanks, exotic cars, rally driving, heavy equipment mayhem",
    icon: "⚙️",
    color: "tactical-orange",
    missionCount: 8,
  },
  {
    id: "red-dirt-air-force",
    name: "Red Dirt Air Force",
    codename: "SKYFALL",
    description: "Helicopter hunts, skydiving, flight experiences",
    icon: "✈️",
    color: "tactical-blue",
    missionCount: 6,
  },
  {
    id: "armory",
    name: "The Armory",
    codename: "ARSENAL",
    description: "Full auto ranges, tactical shooting, explosive ordnance",
    icon: "💣",
    color: "tactical-red",
    missionCount: 7,
  },
  {
    id: "jurassic",
    name: "Jurassic Encounters",
    codename: "APEX",
    description: "Exotic animals, tiger safari, dangerous wildlife",
    icon: "🦖",
    color: "tactical-green",
    missionCount: 4,
  },
  {
    id: "storm-lords",
    name: "Storm Lords",
    codename: "TEMPEST",
    description: "Storm chasing tours, tornado alley adventures",
    icon: "⛈️",
    color: "tactical-blue",
    missionCount: 3,
  },
  {
    id: "nuclear-option",
    name: "Nuclear Option",
    codename: "FALLOUT",
    description: "Missile silo diving, underground exploration",
    icon: "☢️",
    color: "tactical-orange",
    missionCount: 2,
  },
  {
    id: "aquatic-assault",
    name: "Aquatic Assault",
    codename: "DEPTH",
    description: "Noodling, whitewater rafting, water combat",
    icon: "🌊",
    color: "tactical-blue",
    missionCount: 5,
  },
  {
    id: "velocity",
    name: "Velocity",
    codename: "REDLINE",
    description: "Supercar racing, track experiences, speed demons",
    icon: "🏎️",
    color: "tactical-red",
    missionCount: 6,
  },
];
