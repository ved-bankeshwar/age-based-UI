"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HARD_REFRESH_KEY } from "@/lib/storage";
import { usePersonalization } from "@/personalization/usePersonalization";
import { Button } from "@/components/ui/Button";

const AgeCamera = dynamic(() => import("@/components/onboard/AgeCamera").then((mod) => mod.AgeCamera), { ssr: false });

export function CameraPrompt() {
  const pathname = usePathname();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { ready, ageGroup, cameraPromptOpen, openCameraPrompt, closeCameraPrompt, submitAge } = usePersonalization();
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let hardRefresh = false;
    try {
      hardRefresh = sessionStorage.getItem(HARD_REFRESH_KEY) === "1";
      if (hardRefresh) sessionStorage.removeItem(HARD_REFRESH_KEY);
    } catch {
      hardRefresh = false;
    }
    if (hardRefresh) {
      openCameraPrompt();
      return;
    }
    if (!ageGroup && pathname !== "/admin") openCameraPrompt();
  }, [ready, ageGroup, pathname, openCameraPrompt]);

  useEffect(() => {
    if (cameraPromptOpen) void import("@/components/onboard/AgeCamera");
    if (!cameraPromptOpen) setLive(false);
  }, [cameraPromptOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!cameraPromptOpen || !dialog) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [cameraPromptOpen]);

  if (!cameraPromptOpen) return null;

  function accept(age: number) {
    const result = submitAge(age, "estimate");
    if (!result.ok) return;
    closeCameraPrompt();
    if (pathname === "/onboard") router.push("/");
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="camera-prompt-title"
      onCancel={(event) => {
        if (!ageGroup) event.preventDefault();
        else closeCameraPrompt();
      }}
    >
      <form method="dialog" className="stack" onSubmit={(event) => event.preventDefault()}>
        <h2 id="camera-prompt-title" style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>Camera check</h2>
        {live ? (
          <AgeCamera autoStart onAccept={accept} />
        ) : (
          <>
            <p>Bite will turn on your camera and ask the browser for permission.</p>
            <p>The picture stays on this device. It is not saved or uploaded. Bite only uses it to choose an age group.</p>
            <div className="flex flex-wrap" style={{ gap: "var(--space-3)" }}>
              <Button variant="primary" onClick={() => setLive(true)}>Allow camera</Button>
              {ageGroup ? <Button variant="secondary" onClick={closeCameraPrompt}>Not now</Button> : null}
            </div>
            <Link
              href="/admin"
              onClick={(event) => {
                event.preventDefault();
                closeCameraPrompt();
                router.push("/admin");
              }}
            >
              Set the age on the admin page
            </Link>
          </>
        )}
      </form>
    </dialog>
  );
}
