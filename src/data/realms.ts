export interface Realm {
  id: string;
  name: string;
  codename: string;
  description: string;
  lucideIcon: string;
  color: string;
  missionCount: number;
  isNew?: boolean;
}

export const realms: Realm[] = [
  {
    id: "metal-gods",
    name: "Metal Gods",
    codename: "WRENCH",
    description: "Tanks, exotic cars, rally driving, heavy equipment mayhem",
    lucideIcon: "Cog",
    color: "tactical-orange",
    missionCount: 5,
  },
  {
    id: "red-dirt-air-force",
    name: "Red Dirt Air Force",
    codename: "SKYFALL",
    description: "Helicopter hunts, skydiving, flight experiences",
    lucideIcon: "Plane",
    color: "tactical-blue",
    missionCount: 5,
  },
  {
    id: "armory",
    name: "The Armory",
    codename: "ARSENAL",
    description: "Full auto ranges, tactical shooting, explosive ordnance",
    lucideIcon: "Crosshair",
    color: "tactical-red",
    missionCount: 8,
  },
  {
    id: "jurassic",
    name: "Jurassic Encounters",
    codename: "APEX",
    description: "Exotic animals, tiger safari, dangerous wildlife",
    lucideIcon: "Bug",
    color: "tactical-green",
    missionCount: 2,
  },
  {
    id: "storm-lords",
    name: "Storm Lords",
    codename: "TEMPEST",
    description: "Storm chasing tours, tornado alley adventures",
    lucideIcon: "CloudLightning",
    color: "tactical-blue",
    missionCount: 2,
  },
  {
    id: "nuclear-option",
    name: "Nuclear Option",
    codename: "FALLOUT",
    description: "Missile silo diving, cave exploration, underground",
    lucideIcon: "Radiation",
    color: "tactical-orange",
    missionCount: 3,
  },
  {
    id: "aquatic-assault",
    name: "Aquatic Assault",
    codename: "DEPTH",
    description: "Noodling, whitewater rafting, ziplines, water combat",
    lucideIcon: "Waves",
    color: "tactical-blue",
    missionCount: 6,
  },
  {
    id: "velocity",
    name: "Velocity",
    codename: "REDLINE",
    description: "Supercar racing, drifting, track experiences",
    lucideIcon: "Gauge",
    color: "tactical-red",
    missionCount: 4,
  },
  {
    id: "wasteland-warriors",
    name: "Wasteland Warriors",
    codename: "SURVIVOR",
    description: "Zombie LARP, survival games, apocalypse simulations",
    lucideIcon: "Skull",
    color: "tactical-green",
    missionCount: 2,
    isNew: true,
  },
  {
    id: "rodeo-legends",
    name: "Rodeo Legends",
    codename: "BRONCO",
    description: "Bull riding schools, rodeo training, cowboy experiences",
    lucideIcon: "Crown",
    color: "tactical-orange",
    missionCount: 3,
    isNew: true,
  },
];
