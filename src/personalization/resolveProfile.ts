import { ageProfiles } from "./ageProfiles";
import type { AgeGroup, UIProfile } from "./types";

export function resolveProfile(ageGroup: AgeGroup | null): UIProfile | null {
  if (!ageGroup) return null;
  return ageProfiles[ageGroup];
}
