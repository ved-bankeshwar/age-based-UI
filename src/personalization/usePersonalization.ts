"use client";

import { createContext, useContext } from "react";
import type { AgeGroup, PersonalizationSource, SubmitAgeResult, UIProfile } from "./types";

export interface PersonalizationContextValue {
  enteredAge: number | null;
  ageGroup: AgeGroup | null;
  source: PersonalizationSource | null;
  profile: UIProfile | null;
  ready: boolean;
  cameraPromptOpen: boolean;
  submitAge: (age: number, source?: PersonalizationSource) => SubmitAgeResult;
  chooseGroup: (group: AgeGroup, source: PersonalizationSource) => void;
  clearPersonalization: () => void;
  openCameraPrompt: () => void;
  closeCameraPrompt: () => void;
}

export const PersonalizationContext = createContext<PersonalizationContextValue | null>(null);

export function usePersonalization() {
  const value = useContext(PersonalizationContext);
  if (!value) {
    throw new Error("usePersonalization must be used within PersonalizationProvider");
  }
  return value;
}
