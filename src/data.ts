/**
 * Celestial Object Parameters (EOL)
 */

import type { Vector3 } from '@react-three/fiber';

type Locale = {
  enUS: string;
  zhHK?: string;
  zhCN?: string;
};

type Celestial = {
  name: Locale;
  description: Locale;

  mass: number; // ratio to earth mass
  radius: number; // mean radius (in km)
  rotationPeriod: number; // (sidereal) rotation period (in days)
  tilt: number; // tilt to the ecliptic
};

export type Sun = Celestial;
export type Planet = Celestial & {
  orbitalPeriod: number; // (sidereal) orbital period (in days)
  axis: number; // semi-major orbiting axis (in au)
  inclination: number; // to ecliptic (in radius)

  moons: Planet[];
  ring?: { innerRadius: number; outerRadius: number };

  scale: [number, number]; // scale up/down [radius, axis, ]

  // ! TODO: to be enabled
  // position: {
  //   date: Date;
  //   position: Vector3; // starting Location
  // };
};

export const EARTH_MASS = 5.973168e24;
export const ONE_AU = 149598023;
export const SUN_RADIUS = 332950;

const degreeToRadian = (degree: number) => (degree / 360) * 2 * Math.PI;

export const sun: Sun = {
  name: { enUS: 'Sun', zhHK: '太陽' },
  description: { enUS: 'more info of Sun' },

  mass: 332950, // number of earths
  radius: SUN_RADIUS,
  rotationPeriod: 25.05, // at equator (in days)
  tilt: degreeToRadian(7.25), // rotation axis in radius
};

export const mercury: Planet = {
  name: { enUS: 'Mercury', zhHK: '水星' },
  description: { enUS: 'more info of Mercury' },

  mass: 0.055,
  radius: 2439.7,
  rotationPeriod: 58.6466,
  tilt: degreeToRadian(2.04),

  orbitalPeriod: 87.9691,
  axis: 0.387098,
  inclination: degreeToRadian(7.005),

  moons: [],
  scale: [15, 100],
};

export const venus: Planet = {
  name: { enUS: 'Venus', zhHK: '金星' },
  description: { enUS: 'more info of Venus' },

  mass: 0.815,
  radius: 6051.8,
  rotationPeriod: -243.0226,
  tilt: degreeToRadian(2.64),

  orbitalPeriod: 224.701,
  axis: 0.723332,
  inclination: degreeToRadian(3.39458),

  moons: [],
  scale: [15, 100 * 1.2],
};

export const earth: Planet = {
  name: { enUS: 'Earth', zhHK: '地球' },
  description: { enUS: 'more info of Earth' },

  mass: 1,
  radius: 6371,
  rotationPeriod: 0.99726968,
  tilt: degreeToRadian(23.4392811),

  orbitalPeriod: 365.256363004,
  axis: 1,
  inclination: degreeToRadian(7.155),

  moons: [],
  scale: [15, 100 * 1.2],
};

export const mar: Planet = {
  name: { enUS: 'Mar', zhHK: '火星' },
  description: { enUS: 'more info of Mar' },

  mass: 0.107,
  radius: 3389.5,
  rotationPeriod: 1.02749125,
  tilt: degreeToRadian(25.19),

  orbitalPeriod: 686.98,
  axis: 1.52368055,
  inclination: degreeToRadian(1.85),

  moons: [],
  scale: [15, 100 * 1.5],
};

export const jupiter: Planet = {
  name: { enUS: 'Jupiter', zhHK: '木星' },
  description: { enUS: 'more info of Jupiter' },

  mass: 317.8,
  radius: 69911,
  rotationPeriod: 9.9258,
  tilt: degreeToRadian(3.13),

  orbitalPeriod: 4332.59,
  axis: 5.2038,
  inclination: degreeToRadian(1.303),

  moons: [],
  scale: [1.1, 100 * 3.5],
};

export const saturn: Planet = {
  name: { enUS: 'Saturn', zhHK: '土星' },
  description: { enUS: 'more info of Saturn' },

  mass: 95.159,
  radius: 58232,
  rotationPeriod: 10 + 33 / 60 + 38 / 3600,
  tilt: degreeToRadian(26.73),

  orbitalPeriod: 10759.22,
  axis: 9.5826,
  inclination: degreeToRadian(2.485),

  moons: [],
  scale: [1.3, 100 * 5.5],
};

export const uranus: Planet = {
  name: { enUS: 'Uranus', zhHK: '天王星' },
  description: { enUS: 'more info of Uranus' },

  mass: 15.536,
  radius: 25362,
  rotationPeriod: -17 + 14 / 60 + 24 / 2600,
  tilt: degreeToRadian(97.77),

  orbitalPeriod: 30688.5,
  axis: 19.19126,
  inclination: degreeToRadian(0.773),

  moons: [],
  scale: [1.3, 100 * 10],
};

export const neptune: Planet = {
  name: { enUS: 'Neptune', zhHK: '海王星' },
  description: { enUS: 'more info of Neptune' },

  mass: 17.147,
  radius: 24622,
  rotationPeriod: 16 + 6 / 60 + 36 / 3600,
  tilt: degreeToRadian(28.32),

  orbitalPeriod: 60195,
  axis: 30.07,
  inclination: degreeToRadian(1.77),

  moons: [],
  scale: [1.3, 100 * 15],
};
