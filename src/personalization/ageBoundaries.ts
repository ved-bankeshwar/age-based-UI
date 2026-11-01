import type { AgeBounds, AgeGroup } from "./types";

export const ageBoundaries: Record<AgeGroup, AgeBounds> = {
  toddler: { min: 1, max: 4 },
  child: { min: 5, max: 12 },
  teen: { min: 13, max: 17 },
  young: { min: 18, max: 25 },
  adult: { min: 26, max: 59 },
  older: { min: 60, max: 79 },
  elder: { min: 80, max: 120 },
};

export const sampleAge: Record<AgeGroup, number> = {
  toddler: 3,
  child: 8,
  teen: 15,
  young: 22,
  adult: 40,
  older: 70,
  elder: 90,
};
