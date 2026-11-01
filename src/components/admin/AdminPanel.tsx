"use client";

import { useEffect, useState } from "react";
import { ageProfiles } from "@/personalization/ageProfiles";
import { usePersonalization } from "@/personalization/usePersonalization";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export function AdminPanel() {
  const { enteredAge, ageGroup, profile, submitAge, openCameraPrompt } = usePersonalization();
  const [value, setValue] = useState(enteredAge ? String(enteredAge) : "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (enteredAge !== null) setValue(String(enteredAge));
  }, [enteredAge]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^\d+$/.test(value.trim())) {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    const result = submitAge(Number(value.trim()), "manual");
    if (!result.ok) {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    setMessage(`Saved. This age uses the ${ageProfiles[result.ageGroup].label} layout.`);
  }

  return (
    <div className="page stack" style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Admin</h1>
      <p>Set an age by hand, or open the camera check. The camera picture is not stored.</p>
      <div className="bite-card card-body stack">
        <p>Current age: {enteredAge === null ? "Not set" : enteredAge}</p>
        <p>Layout: {profile ? profile.label : ageGroup ? ageProfiles[ageGroup].label : "Not set"}</p>
        <form className="stack" onSubmit={onSubmit}>
          <TextField label="Age" value={value} onChange={setValue} inputMode="numeric" />
          {message ? <p>{message}</p> : null}
          <div className="flex flex-wrap" style={{ gap: "var(--space-3)" }}>
            <Button variant="primary" type="submit">Save age</Button>
            <Button variant="secondary" onClick={openCameraPrompt}>Open camera check</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
