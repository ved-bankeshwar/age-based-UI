"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ageGroupOrder, ageProfiles } from "@/personalization/ageProfiles";
import { usePersonalization } from "@/personalization/usePersonalization";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export function AgeForm() {
  const router = useRouter();
  const { submitAge, chooseGroup, enteredAge, ageGroup } = usePersonalization();
  const [value, setValue] = useState(enteredAge ? String(enteredAge) : "");
  const [message, setMessage] = useState("");
  const needsGroup = enteredAge !== null && ageGroup === null;

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^\d+$/.test(value.trim())) {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    const result = submitAge(Number(value.trim()));
    if (!result.ok && result.reason === "invalid") {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    if (!result.ok && result.reason === "underage") {
      setMessage("Bite's groups start at 18. Choose a group to continue.");
      return;
    }
    router.push("/");
  }

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <form className="bite-card card-body stack" onSubmit={onSubmit}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Let&apos;s personalize Bite for you</h1>
        <TextField label="What is your age?" value={value} onChange={setValue} inputMode="numeric" />
        {message ? <p>{message}</p> : null}
        <Button variant="primary" type="submit">Continue</Button>
        {needsGroup || message.includes("start at 18") ? (
          <fieldset className="stack">
            <legend>Bite&apos;s groups start at 18. Choose a group to continue.</legend>
            {ageGroupOrder.map((group) => (
              <button
                key={group}
                type="button"
                className="bite-button bite-button-secondary"
                onClick={() => {
                  chooseGroup(group, "manual");
                  router.push("/");
                }}
              >
                {ageProfiles[group].label}
              </button>
            ))}
          </fieldset>
        ) : null}
      </form>
    </div>
  );
}
