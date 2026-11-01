"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { PERSONALIZATION_STORAGE_KEY, readJson, removeKey, writeJson } from "@/lib/storage";
import { sampleAge } from "./ageBoundaries";
import { applyAgeScale, clearAgeScale } from "./ageScale";
import { ageGroupOrder } from "./ageProfiles";
import { PersonalizationContext } from "./usePersonalization";
import { interpretAge, mapAgeToGroup } from "./mapAgeToGroup";
import { resolveProfile } from "./resolveProfile";
import type { AgeGroup, PersonalizationSource, StoredPersonalization } from "./types";

const empty: StoredPersonalization = {
  enteredAge: null,
  ageGroup: null,
  source: null,
};

function isGroup(value: unknown): value is AgeGroup {
  return ageGroupOrder.includes(value as AgeGroup);
}

function readStored(): StoredPersonalization {
  const raw = readJson<Partial<StoredPersonalization>>(PERSONALIZATION_STORAGE_KEY);
  if (!raw) return empty;
  const enteredAge = typeof raw.enteredAge === "number" && Number.isInteger(raw.enteredAge) ? raw.enteredAge : null;
  const mapped = enteredAge === null ? null : mapAgeToGroup(enteredAge);
  return {
    enteredAge,
    ageGroup: mapped ?? (isGroup(raw.ageGroup) ? raw.ageGroup : null),
    source: raw.source === "manual" || raw.source === "switcher" || raw.source === "estimate" ? raw.source : null,
  };
}

function applyGroupAttribute(group: AgeGroup | null) {
  if (group) document.documentElement.dataset.ageGroup = group;
  else delete document.documentElement.dataset.ageGroup;
}

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredPersonalization>(empty);
  const [ready, setReady] = useState(false);
  const [cameraPromptOpen, setCameraPromptOpen] = useState(false);

  useLayoutEffect(() => {
    setStored(readStored());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    applyGroupAttribute(stored.ageGroup);
    const years = stored.enteredAge ?? (stored.ageGroup ? sampleAge[stored.ageGroup] : null);
    if (stored.ageGroup && years !== null) applyAgeScale(years, stored.ageGroup);
    else clearAgeScale();
    const serialized = JSON.stringify(stored);
    const current = localStorage.getItem(PERSONALIZATION_STORAGE_KEY);
    if (!stored.ageGroup && stored.enteredAge === null) {
      if (current !== null) removeKey(PERSONALIZATION_STORAGE_KEY);
      return;
    }
    if (current !== serialized) writeJson(PERSONALIZATION_STORAGE_KEY, stored);
  }, [ready, stored]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== null && event.key !== PERSONALIZATION_STORAGE_KEY) return;
      setStored(readStored());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const submitAge = useCallback((age: number, source?: PersonalizationSource) => {
    const result = interpretAge(age);
    if (!result.ok && result.reason === "invalid") return result;
    const nextSource = source === "estimate" ? "estimate" : "manual";
    setStored((current) => {
      if (!result.ok) return { ...current, enteredAge: age };
      return { enteredAge: age, ageGroup: result.ageGroup, source: nextSource };
    });
    return result;
  }, []);

  const chooseGroup = useCallback((group: AgeGroup, source: PersonalizationSource) => {
    setStored((current) => ({ ...current, ageGroup: group, enteredAge: sampleAge[group], source }));
  }, []);

  const clearPersonalization = useCallback(() => setStored(empty), []);
  const openCameraPrompt = useCallback(() => setCameraPromptOpen(true), []);
  const closeCameraPrompt = useCallback(() => setCameraPromptOpen(false), []);

  const value = useMemo(
    () => ({
      enteredAge: stored.enteredAge,
      ageGroup: stored.ageGroup,
      source: stored.source,
      profile: resolveProfile(stored.enteredAge ?? (stored.ageGroup ? sampleAge[stored.ageGroup] : null), stored.ageGroup),
      ready,
      cameraPromptOpen,
      submitAge,
      chooseGroup,
      clearPersonalization,
      openCameraPrompt,
      closeCameraPrompt,
    }),
    [stored, ready, cameraPromptOpen, submitAge, chooseGroup, clearPersonalization, openCameraPrompt, closeCameraPrompt],
  );

  return <PersonalizationContext.Provider value={value}>{children}</PersonalizationContext.Provider>;
}
