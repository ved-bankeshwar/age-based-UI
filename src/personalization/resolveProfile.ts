import { sampleAge } from "./ageBoundaries";
import { ageProfiles } from "./ageProfiles";
import { scaleForAge } from "./ageScale";
import { mapAgeToGroup } from "./mapAgeToGroup";
import type { AgeGroup, UIProfile } from "./types";

export function resolveProfile(age: number | null, ageGroup: AgeGroup | null = null): UIProfile | null {
  const group = age !== null ? mapAgeToGroup(age) : ageGroup;
  if (!group) return null;
  const years = age ?? sampleAge[group];
  const scale = scaleForAge(years);
  return {
    ...ageProfiles[group],
    typography: { basePx: scale.basePx, lineHeight: scale.lineHeight },
  };
}
