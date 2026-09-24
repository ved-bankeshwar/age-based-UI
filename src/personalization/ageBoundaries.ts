import type { AgeBounds, AgeGroup } from "./types";

export const ageBoundaries: Record<AgeGroup, AgeBounds> = {
  young: { min: 18, max: 25 },
  adult: { min: 26, max: 59 },
  older: { min: 60, max: null },
};
