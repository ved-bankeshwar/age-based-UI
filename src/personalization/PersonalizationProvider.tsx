"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { PERSONALIZATION_STORAGE_KEY, readJson, removeKey, writeJson } from "@/lib/storage";
import { interpretAge } from "./mapAgeToGroup";
import { PersonalizationContext } from "./usePersonalization";
import { resolveProfile } from "./resolveProfile";
import type { AgeGroup, PersonalizationSource, StoredPersonalization } from "./types";

const empty: StoredPersonalization = {
  enteredAge: null,
  ageGroup: null,
  source: null,
};

function isGroup(value: unknown): value is AgeGroup {
  return value === "young" || value === "adult" || value === "older";
}

function readStored(): StoredPersonalization {
  const raw = readJson<Partial<StoredPersonalization>>(PERSONALIZATION_STORAGE_KEY);
  if (!raw) return empty;
  return {
    enteredAge: typeof raw.enteredAge === "number" && Number.isInteger(raw.enteredAge) ? raw.enteredAge : null,
    ageGroup: isGroup(raw.ageGroup) ? raw.ageGroup : null,
    source: raw.source === "manual" || raw.source === "switcher" ? raw.source : null,
  };
}

function applyGroupAttribute(group: AgeGroup | null) {
  if (group) document.documentElement.dataset.ageGroup = group;
  else delete document.documentElement.dataset.ageGroup;
}

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredPersonalization>(empty);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setStored(readStored());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    applyGroupAttribute(stored.ageGroup);
    if (!stored.ageGroup && stored.enteredAge === null) {
      removeKey(PERSONALIZATION_STORAGE_KEY);
      return;
    }
    writeJson(PERSONALIZATION_STORAGE_KEY, stored);
  }, [ready, stored]);

  const submitAge = useCallback((age: number) => {
    const result = interpretAge(age);
    if (!result.ok && result.reason === "invalid") return result;
    setStored((current) => {
      if (!result.ok) return { ...current, enteredAge: age };
      return { enteredAge: age, ageGroup: result.ageGroup, source: "manual" };
    });
    return result;
  }, []);

  const chooseGroup = useCallback((group: AgeGroup, source: PersonalizationSource) => {
    setStored((current) => ({ ...current, ageGroup: group, source }));
  }, []);

  const clearPersonalization = useCallback(() => setStored(empty), []);

  const value = useMemo(
    () => ({
      enteredAge: stored.enteredAge,
      ageGroup: stored.ageGroup,
      source: stored.source,
      profile: resolveProfile(stored.ageGroup),
      ready,
      submitAge,
      chooseGroup,
      clearPersonalization,
    }),
    [stored, ready, submitAge, chooseGroup, clearPersonalization],
  );

  return <PersonalizationContext.Provider value={value}>{children}</PersonalizationContext.Provider>;
}
