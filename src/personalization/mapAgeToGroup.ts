import { ageBoundaries } from "./ageBoundaries";
import type { AgeGroup, SubmitAgeResult } from "./types";

const groupOrder: AgeGroup[] = ["young", "adult", "older"];

export function interpretAge(age: number): SubmitAgeResult {
  if (!Number.isInteger(age) || age < 1 || age > 120) {
    return { ok: false, reason: "invalid" };
  }

  for (const group of groupOrder) {
    const bounds = ageBoundaries[group];
    const max = bounds.max ?? Number.POSITIVE_INFINITY;
    if (age >= bounds.min && age <= max) {
      return { ok: true, ageGroup: group };
    }
  }

  if (age < ageBoundaries.young.min) {
    return { ok: false, reason: "underage" };
  }

  return { ok: false, reason: "invalid" };
}

export function mapAgeToGroup(age: number): AgeGroup | null {
  const result = interpretAge(age);
  return result.ok ? result.ageGroup : null;
}
