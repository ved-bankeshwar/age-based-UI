"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { usePersonalization } from "@/personalization/usePersonalization";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

const AgeCamera = dynamic(() => import("@/components/onboard/AgeCamera").then((mod) => mod.AgeCamera), { ssr: false });

export function AgeForm() {
  const router = useRouter();
  const { submitAge, enteredAge } = usePersonalization();
  const [value, setValue] = useState(enteredAge ? String(enteredAge) : "");
  const [message, setMessage] = useState("");

  function applyAge(age: number, source: "manual" | "estimate") {
    const result = submitAge(age, source);
    if (!result.ok) {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    router.push("/");
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^\d+$/.test(value.trim())) {
      setMessage("Enter an age from 1 to 120.");
      return;
    }
    applyAge(Number(value.trim()), "manual");
  }

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <form className="bite-card card-body stack" onSubmit={onSubmit}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Let&apos;s personalize Bite for you</h1>
        <AgeCamera onAccept={(age) => applyAge(age, "estimate")} />
        <TextField label="Or enter your age" value={value} onChange={setValue} inputMode="numeric" />
        {message ? <p>{message}</p> : null}
        <Button variant="primary" type="submit">Continue</Button>
      </form>
    </div>
  );
}
